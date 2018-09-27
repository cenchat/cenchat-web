import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class SitesSitePagesPageMyChat
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
    const site = this.modelFor('sites.site');

    if (site.admins.find(admin => admin.id === this.get('session.model.id'))) {
      this.transitionTo('sites.site.pages.page.chats');
    } else {
      this.store.subscribe(() => this.refresh(), this.routeName);
    }
  },

  /**
   * @override
   */
  async model() {
    const page = this.modelFor('sites.site.pages.page');

    if (this.get('session.isAuthenticated')) {
      const chatId = `${page.id}__${this.get('session.model.id')}`;
      const chat = await this.store.get('chat', chatId, {
        fetch: () => this.firebase.firestore().doc(`chats/${chatId}`).get(),
      });

      if (chat) {
        return chat;
      }
    }

    return {
      page,
      creator: null,
      isPublicized: false,
      lastActivityTimestamp: null,
      lastMessage: null,
      publicizedTitle: null,
      site: page.site,
    };
  },

  /**
   * @override
   */
  redirect(model) {
    if (model.id) {
      this.transitionTo('sites.site.pages.page.my-chat.messages');
    }
  },
});
