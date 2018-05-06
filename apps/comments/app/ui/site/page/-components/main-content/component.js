import Component from '@ember/component';

/**
 * @class SitePageMainContent
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {Array.<Model.Comment>}
   */
  prioritizedComments: [],

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    if (this.get('--comment')) {
      this.set('prioritizedComments', [this.get('--comment')]);
    }
  },

  /**
   * @param {Model.Comment} newComment
   * @function
   */
  handleSendCommentSuccess(newComment) {
    this.set('prioritizedComments', [...this.get('prioritizedComments'), newComment]);
  },

  /**
   * @function
   */
  handleSignInClick() {
    this.set('isSignInVisible', true);
  },
});
