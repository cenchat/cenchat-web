import { inject } from '@ember/service';
import Component from '@ember/component';

/**
 * @class ProfileFollowSuggestionsMainContent
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
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('followSuggestions', this.args.followSuggestions);
  },

  /**
   * @param {number} limit
   * @function
   */
  async handleLoadMoreRecords(limit) {
    const followSuggestions = await this.get('session.model').getUnfollowedFacebookFriends(limit);

    this.set('followSuggestions', followSuggestions);
  },
});
