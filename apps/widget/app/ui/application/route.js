import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class Application
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @override
   */
  beforeModel() {
    return this.get('session').fetch().catch(() => {});
  },

  /**
   * @override
   */
  async afterModel() {
    if (this.get('session.isAuthenticated')) {
      const db = this.firebase.firestore();
      const sessionId = this.get('session.currentUser.uid');
      const currentUserModel = await this.store.get('user', sessionId, {
        fetch: () => db.doc(`users/${sessionId}`).get(),

        include: {
          metaInfo: user => (
            new Promise((resolve) => {
              db.doc(`userMetaInfos/${user.id}`).onSnapshot((docSnapshot) => {
                if (this.get('session.model')) {
                  this.store.update('userMetaInfo', user.id, docSnapshot.data());
                } else {
                  resolve(docSnapshot);
                }
              });
            })
          ),
        },
      });

      if (currentUserModel) {
        this.set('session.content.model', currentUserModel);
      } else {
        await this.get('session').close();
      }
    }

    this.store.subscribe(async () => {
      const user = await this.store.get('user', this.get('session.currentUser.uid'));

      this.set('session.content.model', user);
    });
  },
});
