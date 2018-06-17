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
      const { id, media, title: description } = this.args.gif;

      return {
        id,
        description,
        imageUrl: media[0].tinygif.url,
        type: 'tenor_gif',
      };
    },
  }),
});
