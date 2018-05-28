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
    this.set('handleScroll', () => debounce(this, 'loadMoreRecordsWhenAtBottom', 150));

    this.get('scrollerElement').addEventListener('scroll', this.get('handleScroll'));
  },

  /**
   * @override
   */
  willDestroyElement(...args) {
    this._super(...args);

    this.get('scrollerElement').removeEventListener('scroll', this.get('handleScroll'));
  },

  /**
   * @function
   */
  loadMoreRecordsWhenAtBottom() {
    requestAnimationFrame(bind(this, () => {
      let element = this.get('scrollerElement');

      if (this.get('scrollerElement') === window) {
        element = document.documentElement;
      }

      const { scrollHeight, scrollTop, clientHeight } = element;
      const threshold = scrollHeight / 4;

      if (
        scrollHeight - scrollTop - clientHeight <= threshold
        && !this.get('isDestroyed')
      ) {
        this.loadMoreRecords();
      }
    }));
  },

  /**
   * @function
   * @private
   */
  async loadMoreRecords() {
    const query = this.get('--query');

    if (query.length >= this.get('numOfRecordsLimit')) {
      const newLimit = this.get('numOfRecordsLimit') + 8;

      this.set('numOfRecordsLimit', newLimit);

      if (this.get('--onLoadMoreRecords')) {
        this.get('--onLoadMoreRecords')(newLimit);
      } else if (query.reload) {
        query.relationship.relationshipMeta.options.limit = newLimit;

        query.reload();
      } else {
        query.set('query.limit', newLimit);

        query.update();
      }
    }
  },
});
