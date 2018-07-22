import Component from '@ember/component';

import layout from './template';

/**
 * @class CeImage
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
   * @override
   */
  classNames: ['ce-image'],

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.trackImageSuccessLoad();
  },

  /**
   * @override
   */
  didRender(...args) {
    this._super(...args);

    if (this.width && this.height) {
      this.element.style.width = `${this.width}px`;
      this.element.style.height = `${this.height}px`;
    }
  },

  /**
   * @function
   */
  trackImageSuccessLoad() {
    const imageElement = document.createElement('img');

    imageElement.src = this.src;
    imageElement.className = 'ce-image__actual-image ce-fade-in';

    imageElement.setAttribute('alt', this.alt);

    imageElement.onload = () => {
      if (!this.isDestroyed) {
        this.element.style.backgroundColor = 'transparent';

        this.element.appendChild(imageElement);
      }
    };
  },
});
