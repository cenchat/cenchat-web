import { bind, debounce, scheduleOnce } from '@ember/runloop';
import { computed } from '@ember/object';
import Component from '@ember/component';

import layout from './template';

/**
 * @class MasonryGrid
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
  classNames: ['masonry-grid'],

  /**
   * @type {number}
   */
  numOfColumns: 1,

  /**
   * @type {Array}
   */
  columnGroupedItems: computed('--items.[]', 'numOfColumns', {
    get() {
      const columnGroupedItems = [];
      const numOfColumns = this.get('numOfColumns');
      let currentColumn = 0;

      this.get('--items').forEach((item) => {
        if (columnGroupedItems.length < numOfColumns) {
          columnGroupedItems.push([]);
        }

        columnGroupedItems[currentColumn].push(item);

        if (currentColumn + 1 < numOfColumns) {
          currentColumn += 1;
        } else {
          currentColumn = 0;
        }
      });

      return columnGroupedItems;
    },
  }),

  /**
   * @override
   */
  didInsertElement(...args) {
    this._super(...args);

    this.set('handleResize', bind(this, () => debounce(this, this.setNumOfColumns, 100)));

    scheduleOnce('afterRender', () => this.setNumOfColumns());
    window.addEventListener('resize', this.handleResize);
  },

  /**
   * @override
   */
  willDestroyElement(...args) {
    this._super(...args);

    window.removeEventListener('resize', this.handleResize);
  },

  /**
   * @function
   * @private
   */
  setNumOfColumns() {
    // 864 = max width of 2 cards including the margin
    this.set('numOfColumns', this.element.parentElement.clientWidth >= 864 ? 2 : 1);
  },
});
