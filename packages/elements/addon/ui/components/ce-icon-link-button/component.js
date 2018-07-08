import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

import layout from './template';

/**
 * @class CeIconLinkButton
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  router: service(),

  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  tagName: 'a',

  /**
   * @override
   */
  classNames: ['ce-icon-link-button'],

  /**
   * @override
   */
  attributeBindings: [
    'data-test',
    'title',
    'href',
    'aria-label',
    'aria-pressed',
    'target',
    'rel',
    'disabled',
    'badged',
    'icon',
    'square',
    'size',
    'mdi-ext',
    'onclick',
    'isRouteActive:active',
  ],

  /**
   * @type {boolean}
   */
  isRouteActive: computed('router.currentURL', {
    get() {
      if (this.router.currentURL) {
        if (this.href !== '/') {
          return this.router.currentURL.includes(this.href);
        }

        return this.router.currentURL === this.href;
      }

      return false;
    },
  }),
});
