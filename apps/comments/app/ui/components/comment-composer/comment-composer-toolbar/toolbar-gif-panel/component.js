import { getOwner } from '@ember/application';
import { inject } from '@ember/service';
import Component from '@ember/component';

import fetch from 'fetch';

/**
 * @class ToolbarGifPanel
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  session: inject(),

  /**
   * @override
   */
  tagName: '',

  /**
   * @param {Element} target
   * @function
   */
  async searchGifs(target) {
    const query = target.value.toLowerCase();
    let gifs = [];

    if (query) {
      const { tenorApiKey } = getOwner(this).resolveRegistration('config:environment');
      const response = await fetch(`https://api.tenor.com/v1/search?key=${tenorApiKey}&q=${query}&safesearch=moderate&media_filter=minimal&limit=8&anon_id=${this.get('session.model.id')}`);
      const data = await response.json();

      gifs = data.results;
    }

    this.set('searchResults', gifs);
  },
});
