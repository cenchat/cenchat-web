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
    return this.get('store').findRecord('site', params.site_id);
  },

  /**
   * @override
   */
  afterModel(model) {
    document.body.classList.remove('ce-theme-dark');
    document.body.classList.add(`ce-theme-${model.get('theme')}`);
  },
});
