import { later } from '@ember/runloop';
import Component from '@ember/component';

import layout from './template';

/**
 * @class AniEach
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
  tagName: 'div',

  /**
   * @type {number}
   */
  numOfItems: 0,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    if (this.isItemsIteratable()) {
      this.set('numOfItems', this.items.length);
    }
  },

  /**
   * @override
   */
  didRender(...args) {
    this._super(...args);

    if (this.isItemsIteratable()) {
      if (this.items.length < this.numOfItems) {
        this.staggerAnimateAllChildElements();
      } else {
        this.staggerAnimateNewChildElements();
      }

      this.set('numOfItems', this.items.length);
    }
  },

  /**
   * @return {boolean} True if iteratable
   * @function
   */
  isItemsIteratable() {
    return typeof this.items === 'object' && this.items !== null && this.items.forEach;
  },

  /**
   * @function
   */
  staggerAnimateAllChildElements() {
    let numOfAnimations = 0;

    for (let i = 0; i < this.element.children.length; i += 1) {
      const child = this.element.children[i];

      child.style.visibility = 'hidden';

      child.classList.remove('ce-fade-in');

      numOfAnimations += 1;

      later(() => {
        child.style.visibility = 'visible';

        child.classList.add('ce-fade-in');
      }, 50 * numOfAnimations);
    }
  },

  /**
   * @function
   */
  staggerAnimateNewChildElements() {
    let numOfAnimations = 0;

    for (let i = 0; i < this.element.children.length; i += 1) {
      const child = this.element.children[i];

      if (!child.classList.contains('ce-fade-in')) {
        child.style.visibility = 'hidden';

        numOfAnimations += 1;

        later(() => {
          child.style.visibility = 'visible';

          child.classList.add('ce-fade-in');
        }, 50 * numOfAnimations);
      }
    }
  },
}).reopenClass({
  /**
   * @override
   */
  positionalParams: ['items'],
});
