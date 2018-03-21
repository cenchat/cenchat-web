import Component from '@ember/component';

import layout from './template';

/**
 * @class CeToast
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  classNames: ['ce-toast'],

  /**
   * @override
   */
  attributeBindings: ['data-test', 'duration', 'opened'],

  /**
   * @override
   */
  ariaRole: 'alert',
});
