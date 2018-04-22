import { computed } from '@ember/object';
import Component from '@ember/component';

/**
 * @class GifPanelTenorItem
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {Object}
   */
  gif: computed('--gif', {
    get() {
      const gif = this.get('--gif');

      return {
        id: gif.id,
        description: gif.title,
        imageUrl: gif.media[0].tinygif.url,
        type: 'tenor_gif',
      };
    },
  }),
});
