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
      const currentUser = await this.store.get('user', sessionId, {
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

      if (currentUser) {
        this.set('session.content.model', currentUser);
        this.setupPushNotification();
      } else {
        await this.get('session').close();
      }
    }

    this.store.subscribe(async () => {
      const user = await this.store.get('user', this.get('session.currentUser.uid'));

      this.set('session.content.model', user);
    });
  },

  /**
   * @override
   */
  redirect(model, transition) {
    if (this.get('session.isAuthenticated')) {
      if (transition.targetName === 'index') {
        this.transitionTo('chats');
      }
    } else {
      this.transitionTo('sign-in');
    }
  },

  /**
   * @param {Model.User} profile
   * @function
   */
  async setupPushNotification() {
    if ('serviceWorker' in navigator) {
      try {
        const messaging = this.firebase.messaging();

        await messaging.requestPermission();

        const db = this.firebase.firestore();
        const metaDocRef = db.doc(`userMetaInfos/${this.get('session.model.id')}`);

        messaging.onTokenRefresh(async () => {
          const token = await messaging.getToken();
          const metaDocSnapshot = await metaDocRef.get();
          const meta = metaDocSnapshot.data();
          const { notificationTokens } = meta;

          if (!Array.isArray(notificationTokens)) {
            await metaDocRef.update({ notificationTokens: [token] });
          } else if (!notificationTokens.includes(token)) {
            await metaDocRef.update({ notificationTokens: [...notificationTokens, token] });
          }
        });

        const token = await messaging.getToken();
        const metaDocSnapshot = await metaDocRef.get();
        const meta = metaDocSnapshot.data();
        const { notificationTokens } = meta;

        if (!Array.isArray(notificationTokens)) {
          await metaDocRef.update({ notificationTokens: [token] });
        } else if (!notificationTokens.includes(token)) {
          await metaDocRef.update({ notificationTokens: [...notificationTokens, token] });
        }
      } catch (error) {
        // Do nothing
      }
    }
  },
});
