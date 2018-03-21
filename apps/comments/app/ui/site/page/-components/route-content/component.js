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
  newComments: [],

  /**
   * Handles the send comment success event
   *
   * @param {Model.Comment} newComment
   */
  handleSendCommentSuccess(newComment) {
    this.set('newComments', [...this.get('newComments'), newComment]);
  },
});
