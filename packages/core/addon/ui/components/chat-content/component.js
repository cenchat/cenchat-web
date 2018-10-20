import { debounce } from '@ember/runloop';
import Component from '@ember/component';

import layout from './template';

/**
 * @class ChatContent
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
  classNames: ['chat-content'],

  /**
   * @type {boolean}
   */
  isScrolledToBottom: true,

  /**
   * @override
   */
  didInsertElement(...args) {
    this._super(...args);

    this.setupScrollListener();
  },

  /**
   * @override
   */
  didRender(...args) {
    this._super(...args);

    this.scrollBackToPreviousView();
  },

  /**
   * @override
   */
  willDestroyElement(...args) {
    this._super(...args);

    this.scrollerElement.removeEventListener('scroll', this.handleScroll);
  },

  /**
   * @function
   */
  setupScrollListener() {
    this.set('handleScroll', () => debounce(this, 'processScroll', 150));

    const { scroller } = this.args;
    const scrollerElement = scroller === 'window' ? window : document.querySelector(scroller);

    this.set('scrollerElement', scrollerElement);
    this.scrollerElement.addEventListener('scroll', this.handleScroll);
  },

  /**
   * @function
   */
  processScroll() {
    let element = this.scrollerElement;

    if (element === window) {
      element = document.documentElement;
    }

    this.set(
      'isScrolledToBottom',
      element.scrollHeight - element.scrollTop - element.clientHeight <= 10,
    );
    this.set('lastMessageId', null);

    if (element.scrollTop === 0) {
      this.set('lastMessageId', this.args.messages[0].id);
      this.args.onScrollToTop();
    }
  },

  /**
   * @function
   */
  scrollBackToPreviousView() {
    let element = this.scrollerElement;

    if (element === window) {
      element = document.documentElement;
    }

    if (this.isScrolledToBottom) {
      element.scrollTop = element.scrollHeight;
    }

    if (this.lastMessageId) {
      const lastMessage = this.element.querySelector(`#message-list-item-${this.lastMessageId}`);

      lastMessage.scrollIntoView();

      const adjustment = element === document.documentElement ? 120 : 84;

      element.scrollTop -= adjustment;
    }
  },
});
