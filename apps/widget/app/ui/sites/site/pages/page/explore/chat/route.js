import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class SitesSitePagesPageExploreChat
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
  store: service('store'),

  /**
   * @override
   */
  model(params) {
    return this.store.get('chat', params.chat_id, {
      fetch: () => this.firebase.firestore().doc(`chats/${params.chat_id}`).get(),
    });
  },

  /**
   * @override
   */
  redirect(model, transition) {
    if (transition.targetName === 'sites.site.pages.page.explore.chat.index') {
      this.transitionTo('sites.site.pages.page.explore.chat.messages');
    }
  },
});
