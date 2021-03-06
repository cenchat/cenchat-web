import Route from '@ember/routing/route';

/**
 * @class Site
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  model(params) {
    return this.store.findRecord('site', params.site_id);
  },

  /**
   * @override
   */
  afterModel(model) {
    document.body.classList.remove('light-theme');
    document.body.classList.add(`${model.get('theme')}-theme`);
  },
});
