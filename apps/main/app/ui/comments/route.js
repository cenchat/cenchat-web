import Route from '@ember/routing/route';

/**
 * @class Comments
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  model(params) {
    return this.get('store').findRecord('comment', params.comment_id);
  },
});
