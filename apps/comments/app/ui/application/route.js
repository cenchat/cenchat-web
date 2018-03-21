import { inject } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class Application
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   * @readonly
   */
  session: inject(),

  /**
   * @override
   */
  beforeModel() {
    const session = this.get('session');

    return session.fetch().catch(() => {});
  },

  /**
   * @override
   */
  afterModel() {
    const session = this.get('session');
    const store = this.get('store');

    if (session.get('isAuthenticated')) {
      return store.findRecord(
        'user',
        session.get('currentUser.uid'),
      ).then((model) => {
        session.set('content.model', model);
      }).catch((e) => {
        const currentUser = session.get('currentUser');
        const record = store.createRecord('user', {
          id: currentUser.uid,
          displayName: currentUser.displayName,
          photoUrl: currentUser.photoURL,
        });

        return record.save({ adapterOptions: { onServer: true } }).then(() => {
          session.set('content.model', record);
        });
      });
    }
  },
});
