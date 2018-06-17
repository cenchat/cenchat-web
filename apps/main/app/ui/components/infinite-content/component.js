import { debounce, run } from '@ember/runloop';
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

    this.loadMoreRecordsWhenNotEnough();

    this.set('handleResize', () => debounce(this, 'loadMoreRecordsWhenNotEnough', 100));

    window.addEventListener('resize', this.get('handleResize'));

    const { selector } = this.args;
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

    window.removeEventListener('resize', this.get('handleResize'));
    this.get('scrollerElement').removeEventListener('scroll', this.get('handleScroll'));
  },

  /**
   * @function
   */
  loadMoreRecordsWhenNotEnough() {
    requestAnimationFrame(() => {
      run(() => {
        if (document.body.scrollWidth >= 960 && this.get('numOfRecordsLimit') <= 8) {
          this.loadMoreRecords();
        }
      });
    });
  },

  /**
   * @function
   */
  loadMoreRecordsWhenAtBottom() {
    requestAnimationFrame(() => {
      run(() => {
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
      });
    });
  },

  /**
   * @function
   * @private
   */
  async loadMoreRecords() {
    const { query } = this.args;

    if (query.length >= this.get('numOfRecordsLimit')) {
      const newLimit = this.get('numOfRecordsLimit') + 8;

      this.set('numOfRecordsLimit', newLimit);

      const { onLoadMoreRecords } = this.args;

      if (onLoadMoreRecords) {
        onLoadMoreRecords(newLimit);
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
