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
   * Handles delete comment click event
   */
  async handleDeleteCommentClick() {
    const comment = this.get('--comment');

    comment.set('isAskMeAnything', false);
    comment.set('parsedAttachments', null);
    comment.set('text', null);
    comment.set('isDeleted', true);

    await comment.save({ adapterOptions: { onServer: true } });
    toast('Comment deleted');
  },

  /**
   * Handles share comment's click event
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
   * Handles toggle quote click event
   */
  handleToggleQuoteClick() {
    if (this.get('isQuoteVisible')) {
      this.set('isQuoteVisible', false);
    } else {
      this.set('isQuoteVisible', true);
    }
  },

  /**
   * Handles cancel edit click event
   */
  handleCancelEditClick() {
    this.get('--comment').rollbackAttributes();
    this.set('isEditingComment', false);
  },

  /**
   * Selects the share comment link value
   *
   * @param {Element} element
   */
  selectShareCommentLinkValue(element) {
    element.select();
  },
});
