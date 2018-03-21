import { bind } from '@ember/runloop';
import Component from '@ember/component';

import layout from './template';

/**
 * @class CeDropdownButton
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
  classNames: ['ce-dropdown-button'],

  /**
   * @override
   */
  attributeBindings: ['data-test', 'position'],

  /**
   * @type {string}
   */
  position: 'lr',

  /**
   * @type {string}
   */
  buttonId: null,

  /**
   * @type {string}
   */
  animation: null,

  /**
   * @type {boolean}
   */
  isExpanded: false,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('buttonId', Math.random().toString(32).slice(2).substr(0, 5));
  },

  /**
   * @override
   */
  click() {
    this.closeMenu(true);
  },

  /**
   * @override
   */
  keyDown(event) {
    const code = event.which;
    const listItems = this.element.querySelectorAll('li');

    if (code === 27) {
      this.closeMenu(true);
    } else if (code === 9 && event.shiftKey) {
      if (listItems[0].contains(document.activeElement)) {
        this.closeMenu();
      }
    } else if (code === 9 && !event.shiftKey) {
      if (listItems[listItems.length - 1].contains(document.activeElement)) {
        this.closeMenu();
      }
    }
  },

  /**
   * Handles the button's click event
   *
   * @param {Object} event
   */
  handleButtonClick(event) {
    event.stopPropagation();
    this.openMenu();

    if (this.get('--onClick')) {
      this.get('--onClick')();
    }
  },

  /**
   * Opens the dropdown menu
   */
  openMenu() {
    const menu = this.element.querySelector('.menu');
    const onAnimationEnd = bind(this, () => {
      this.element.querySelector('ul > li > *').focus();
      menu.removeEventListener('animationend', onAnimationEnd);
    });

    menu.addEventListener('animationend', onAnimationEnd);
    this.set('isExpanded', true);
    this.set('animation', 'expanded');
  },

  /**
   * Closes the dropdown menu
   *
   * @param {boolean} willFocusOnButton
   */
  closeMenu(willFocusOnButton) {
    const menu = this.element.querySelector('.menu');
    const onAnimationEnd = bind(this, () => {
      this.set('isExpanded', false);

      if (willFocusOnButton) {
        this.element.querySelector('button').focus();
      }

      menu.removeEventListener('animationend', onAnimationEnd);
    });

    menu.addEventListener('animationend', onAnimationEnd);
    this.set('animation', 'compressed');
  },
});
