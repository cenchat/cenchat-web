import { capitalize } from '@ember/string';
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
  model(params) {
    return capitalize(params.platform);
  },
});
