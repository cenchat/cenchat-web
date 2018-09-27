import { getOwner } from '@ember/application';
import Helper from '@ember/component/helper';

/**
 * @class Lookup
 * @namespace Helper
 * @extends Ember.Helper
 */
export default Helper.extend({
  /**
   * @override
   */
  compute([name]) {
    return getOwner(this).lookup(name);
  },
});
