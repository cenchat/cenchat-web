import { inject } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class Comments
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  headData: inject(),

  /**
   * @override
   */
  model(params) {
    return this.store.findRecord('comment', params.comment_id);
  },

  /**
   * @override
   */
  async afterModel(model) {
    const author = await model.authorOrAnonymous;

    this.set('headData.title', `${author.displayName} on Cenchat`);
    this.set('headData.description', model.text || '&nbsp;');
    this.set('headData.image', author.avatarUrl);
    this.set('headData.url', `https://cenchat.com/comments/${model.id}`);
    this.set('headData.type', 'article');
    this.set('headData.author', author.displayName);

    // Preload relationships
    const page = await model.page;

    return Promise.all([model.parsedAttachments, page.get('site')]);
  },
});
