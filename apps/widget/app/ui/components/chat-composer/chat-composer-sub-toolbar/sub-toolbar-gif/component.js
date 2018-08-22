import { getOwner } from '@ember/application';
import Component from '@ember/component';

import fetch from 'fetch';

/**
 * @class ChatComposerSubToolbarGif
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @param {Element} target
   * @function
   */
  async handleSearchGifInput(target) {
    const query = target.value.toLowerCase();
    let gifs = [];

    if (query) {
      const { tenorApiKey } = getOwner(this).resolveRegistration('config:environment');
      const sessionId = this.args.session.get('model.id');
      const response = await fetch(`https://api.tenor.com/v1/search?key=${tenorApiKey}&q=${query}&safesearch=moderate&media_filter=minimal&limit=8&anon_id=${sessionId}`);
      const data = await response.json();

      gifs = data.results.map(gif => (
        {
          id: gif.id,
          description: gif.title,
          imageUrl: gif.media[0].tinygif.url,
        }
      ));
    }

    this.set('searchGifResults', gifs);
  },
});
