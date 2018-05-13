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
    return this.get('store').findRecord('comment', params.comment_id);
  },

  /**
   * @override
   */
  async afterModel(model) {
    const author = await model.get('author');

    this.set('headData.title', `${author.get('displayName')} on Cenchat`);
    this.set('headData.description', model.get('text') || '&nbsp;');
    this.set('headData.image', author.get('largePhotoUrl'));
    this.set('headData.url', `https://cenchat.com/comments/${model.get('id')}`);
    this.set('headData.type', 'article');
    this.set('headData.author', author.get('displayName'));

    // Preload relationships
    const page = await model.get('page');

    return Promise.all([model.get('parsedAttachments'), page.get('site')]);
  },
});
