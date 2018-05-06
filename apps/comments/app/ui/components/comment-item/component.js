import { inject } from '@ember/service';
import Component from '@ember/component';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class CommentItem
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
   * @type {boolean}
   */
  isEditingComment: false,

  /**
   * @type {boolean}
   */
  isQuoteVisible: false,

  /**
   * @type {boolean}
   */
  isReplySectionVisible: false,

  /**
   * @function
   */
  async handleDeleteCommentClick() {
    const comment = this.get('--comment');

    comment.set('isAskMeAnything', false);
    comment.set('parsedAttachments', null);
    comment.set('taggedEntities', null);
    comment.set('text', null);
    comment.set('isDeleted', true);

    await comment.save();
    toast('Comment deleted');
  },

  /**
   * @function
   */
  async handleShareCommentClick() {
    if (navigator.share) {
      const comment = this.get('--comment');
      const author = await comment.get('author');

      navigator.share({
        title: `${author.get('displayName')} on Cenchat`,
        text: comment.get('message'),
        url: `https://cenchat.com/comments/${comment.get('id')}`,
      });
    }

    this.set('isShareCommentLinkVisible', true);
  },

  /**
   * @function
   */
  handleToggleQuoteClick() {
    if (this.get('isQuoteVisible')) {
      this.set('isQuoteVisible', false);
    } else {
      this.set('isQuoteVisible', true);
    }
  },

  /**
   * @function
   */
  handleCancelEditClick() {
    this.get('--comment').rollbackAttributes();
    this.set('isEditingComment', false);
  },

  /**
   * @param {Element} element
   * @function
   */
  selectShareCommentLinkValue(element) {
    element.select();
  },
});
