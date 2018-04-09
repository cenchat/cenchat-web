import { inject } from '@ember/service';
import Component from '@ember/component';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class CommentComposer
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  session: inject(),

  /**
   * @type {Ember.Service}
   */
  store: inject(),

  /**
   * @override
   */
  tagName: '',

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.setupComment();
  },

  /**
   * Handles send comment click event
   */
  async handleSendCommentClick() {
    const comment = this.get('comment');

    await comment.save();
    toast('Comment sent');

    if (!this.get('--comment')) {
      const newComment = await this.createComment();

      this.set('comment', newComment);
    }

    if (this.get('--onSendCommentSuccess')) {
      this.get('--onSendCommentSuccess')(comment);
    }
  },

  /**
   * Handles attachment item click event
   *
   * @param {Model.Emoji|Model.Sticker} item
   */
  handleAddAttachmentClick(item) {
    const comment = this.get('comment');

    if (comment.get('parsedAttachments').length < 4) {
      comment.set('parsedAttachments', [
        ...comment.get('parsedAttachments'),
        item,
      ]);
    }
  },

  /**
   * Handles ask me anything click event
   */
  handleAskMeAnythingClick() {
    if (this.get('comment.isAskMeAnything')) {
      this.set('comment.isAskMeAnything', false);
    } else {
      this.set('comment.isAskMeAnything', true);
    }
  },

  /**
   * Handles remove attachment click event
   *
   * @param {number} indexToRemove
   */
  handleRemoveAttachmentClick(indexToRemove) {
    const comment = this.get('comment');
    const attachments = comment.get('parsedAttachments');

    comment.set(
      'parsedAttachments',
      attachments.filter((attachment, index) => index !== indexToRemove),
    );
  },

  /**
   * Handles tag entity's click event
   *
   * @param {Model} entity
   */
  handleTagEntityClick(entity) {
    if (entity.get('id') !== this.get('comment.author.id')) {
      this.set('comment.taggedEntities', {
        ...this.get('comment.taggedEntities'),
        [entity.get('id')]: entity.get('constructor.modelName'),
      });
    }
  },

  /**
   * Handles untag entity's click event
   *
   * @param {Model} entity
   */
  handleUntagEntityClick(entity) {
    const taggedEntities = { ...this.get('comment.taggedEntities') };

    delete taggedEntities[entity.get('id')];

    if (Object.keys(taggedEntities).length > 0) {
      this.set('comment.taggedEntities', taggedEntities);
    } else {
      this.set('comment.taggedEntities', null);
    }
  },

  /**
   * Handles textbox input event
   *
   * @param {string} value
   */
  handleTextBoxInput(value) {
    this.set('comment.text', value);
  },

  /**
   * Setup comment
   */
  async setupComment() {
    if (this.get('--comment')) {
      this.set('comment', this.get('--comment'));
    } else {
      const comment = await this.createComment();

      this.set('comment', comment);
    }
  },

  /**
   * Creates a new comment
   *
   * @return {Promise.<Model.Comment>} Resolves with the created comment
   */
  async createComment() {
    const replyTo = this.get('--replyTo');
    let root = replyTo;

    if (replyTo && replyTo.belongsTo('root').id()) {
      root = await replyTo.get('root');
    }

    return this.get('store').createRecord('comment', {
      replyTo,
      root,
      author: this.get('session.model'),
      isAskMeAnything: false,
      isDeleted: false,
      page: this.get('--page'),
    });
  },
});
