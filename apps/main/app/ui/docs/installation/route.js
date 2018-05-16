import Route from '@ember/routing/route';

/**
 * @class DocsInstallation
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  model({ platform }) {
    return platform;
  },
});
