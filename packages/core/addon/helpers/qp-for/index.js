import { getOwner } from '@ember/application';
import { underscore } from '@ember/string';
import Helper from '@ember/component/helper';

/**
 * @class QpFor
 * @namespace Helper
 * @extends Ember.Helper
 */
export default Helper.extend({
  /**
   * @override
   */
  compute([name]) {
    const route = getOwner(this).lookup(`route:${name}`);

    if (route.routeName) {
      const params = route.paramsFor(name);
      const values = {};

      Object.keys(params).forEach((key) => {
        values[underscore(key)] = params[key];
      });

      return { values, isQueryParams: true };
    }

    return null;
  },
});
