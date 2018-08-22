import { getOwner } from '@ember/application';
import Component from '@ember/component';

/**
 * @class ChatContentTimeGroupListItemAuthorListItemMessageListItem
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.buildMedia();
  },

  /**
   * @function
   */
  handleMessageClick() {
    if (this.isCreatedOnVisible) {
      this.set('isCreatedOnVisible', false);
    } else {
      this.set('isCreatedOnVisible', true);
    }
  },

  /**
   * @function
   */
  async buildMedia() {
    const { media } = this.args.message;

    if (media) {
      if (media.type === 'sticker') {
        this.set('media', await this.fetchSticker(media.id));
      } else {
        this.set('media', await this.fetchTenorGif(media.id));
      }
    }
  },

  /**
   * @param {string} id
   * @return {Object} Sticker
   * @function
   * @private
   */
  async fetchSticker(id) {
    return this.args.store.get('sticker', id, {
      fetch: () => this.args.firebase.firestore().doc(`stickers/${id}`).get(),
    });
  },

  /**
   * @param {string} id
   * @return {Object} Tenor GIF
   * @function
   */
  async fetchTenorGif(id) {
    const { tenorApiKey } = getOwner(this).resolveRegistration('config:environment');
    const response = await fetch(`https://api.tenor.com/v1/gifs?ids=${id}&key=${tenorApiKey}&media_filter=minimal`);
    const data = await response.json();
    const gif = data.results[0];

    return {
      id: gif.id,
      description: gif.title,
      height: gif.media[0].tinygif.dims[1],
      imageUrl: gif.media[0].tinygif.url,
      type: 'tenor_gif',
      width: gif.media[0].tinygif.dims[0],
    };
  },
});
