import Component from '@ember/component';

/**
 * @class ProfileFollowSuggestionsRouteContent
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

    this.loadFollowSuggestions(8);
  },

  /**
   * Handles the loading of more follow suggestions
   *
   * @param {number} newLimit
   */
  handleLoadMoreRecords(newLimit) {
    this.loadFollowSuggestions(newLimit);
  },

  /**
   * Loads follow suggestions
   *
   * @param {number} limit
   */
  async loadFollowSuggestions(limit) {
    const followSuggestions = await this.get('--user').getUnfollowedFacebookFriends(limit);

    this.set('followSuggestions', followSuggestions);
  },
});
