import Component from '@ember/component';

/**
 * @class SideNav
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: 'section',

  /**
   * @override
   */
  classNames: ['side-nav'],

  /**
   * @override
   */
  didInsertElement(...args) {
    this._super(...args);

    document.documentElement.style.setProperty('overflow', 'hidden');
  },

  /**
   * @override
   */
  willDestroyElement(...args) {
    this._super(...args);

    document.documentElement.style.removeProperty('overflow');
  },
});
