import Component from '@ember/component';

/**
 * @class ProfileFollowSuggestionsMainContent
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
   * @param {number} newLimit
   * @function
   */
  handleLoadMoreRecords(newLimit) {
    this.loadFollowSuggestions(newLimit);
  },

  /**
   * @param {number} limit
   * @function
   */
  async loadFollowSuggestions(limit) {
    const followSuggestions = await this.get('--user').getUnfollowedFacebookFriends(limit);

    this.set('followSuggestions', followSuggestions);
  },
});
