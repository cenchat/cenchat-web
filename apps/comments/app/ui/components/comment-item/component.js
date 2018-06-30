import { inject } from '@ember/service';
import { typeOf } from '@ember/utils';
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
    const { comment } = this.args;

    comment.set('attachments', null);
    comment.set('isLetMeKnow', false);
    comment.set('taggedEntities', null);
    comment.set('text', null);
    comment.set('isDeleted', true);

    toast('Comment deleted', 10000, {
      text: 'Undo',

      action: () => {
        comment.rollbackAttributes();
      },

      scheduledAction: async () => {
        comment.save();
      },
    });
  },

  /**
   * @function
   */
  async handleShareCommentClick() {
    if (navigator.share) {
      const { comment } = this.args;
      const author = await comment.get('authorOrAnonymous');

      if (typeOf(author) === 'instance') {
        navigator.share({
          title: `${author.get('displayName')} on Cenchat`,
          text: comment.get('message'),
          url: `https://cenchat.com/comments/${comment.get('id')}`,
        });
      } else {
        navigator.share({
          title: `${author.displayName} on Cenchat`,
          text: comment.get('message'),
          url: `https://cenchat.com/comments/${comment.get('id')}`,
        });
      }
    }

    this.set('isShareCommentLinkVisible', true);
  },

  /**
   * @function
   */
  handleToggleQuoteClick() {
    if (this.isQuoteVisible) {
      this.set('isQuoteVisible', false);
    } else {
      this.set('isQuoteVisible', true);
    }
  },

  /**
   * @function
   */
  handleCancelEditClick() {
    this.args.comment.rollbackAttributes();
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
