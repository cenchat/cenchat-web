import { inject } from '@ember/service';
import Component from '@ember/component';

/**
 * @class SignInRouteContent
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  fastboot: inject(),

  /**
   * @override
   */
  tagName: '',
});
