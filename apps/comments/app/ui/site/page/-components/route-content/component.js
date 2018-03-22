import Component from '@ember/component';

/**
 * @class SitePageRouteContent
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
   * Handles the send comment success event
   *
   * @param {Model.Comment} newComment
   */
  handleSendCommentSuccess(newComment) {
    this.set('prioritizedComments', [
      ...this.get('prioritizedComments'),
      newComment,
    ]);
  },
});
