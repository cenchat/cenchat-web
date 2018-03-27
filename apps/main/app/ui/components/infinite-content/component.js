import { bind, debounce } from '@ember/runloop';
import Component from '@ember/component';

/**
 * @class InfiniteContent
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: 'div',

  /**
   * @type {number}
   */
  numOfRecordsLimit: 8,

  /**
   * @type {Element}
   */
  scrollerElement: null,

  /**
   * @override
   */
  didInsertElement(...args) {
    this._super(...args);

    const selector = this.get('--selector');
    const element = selector ? document.querySelector(selector) : window;

    this.set('scrollerElement', element);

    this.get('scrollerElement').addEventListener('scroll', bind(this, () => {
      debounce(this, this.handleScroll, 150);
    }));
  },

  /**
   * Loads more next set of --query
   */
  async loadMoreRecords() {
    const query = this.get('--query');

    if (query.get('length') >= this.get('numOfRecordsLimit')) {
      const newLimit = this.get('numOfRecordsLimit') + 8;

      this.set('numOfRecordsLimit', newLimit);

      if (this.get('--onLoadMoreRecords')) {
        this.get('--onLoadMoreRecords')(newLimit);
      } else {
        query.relationship.relationshipMeta.options.filter = reference => reference.limit(newLimit);

        query.reload();
      }
    }
  },

  /**
   * Handles an element's on scroll event
   */
  handleScroll() {
    requestAnimationFrame(bind(this, () => {
      let element;

      if (this.get('scrollerElement') === window) {
        element = document.documentElement;
      }

      const { scrollHeight, scrollTop, clientHeight } = element;
      const threshold = scrollHeight / 4;

      if (scrollHeight - scrollTop - clientHeight <= threshold) {
        this.loadMoreRecords();
      }
    }));
  },
});
