import { inject } from '@ember/service';
import { typeOf } from '@ember/utils';
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
   * @function
   */
  async handleSendCommentClick() {
    const { comment } = this;

    await comment.save();
    toast('Comment sent');

    if (!this.args.comment) {
      const newComment = await this.createComment();

      this.set('comment', newComment);
    }

    if (this.args.onSendCommentSuccess) {
      this.args.onSendCommentSuccess(comment);
    }
  },

  /**
   * @param {Model.Emoji|Model.Sticker|Object} item
   * @function
   */
  handleAddAttachmentClick(item) {
    const { comment } = this;
    let attachments = comment.get('attachments');

    if (!Array.isArray(attachments)) {
      attachments = [];
    }

    if (attachments.length < 4) {
      if (typeOf(item) === 'instance') {
        comment.set('attachments', [
          ...attachments,
          { id: item.get('id'), type: item.get('constructor.modelName') },
        ]);
      } else {
        comment.set('attachments', [
          ...attachments,
          { id: item.id, type: item.type },
        ]);
      }
    }
  },

  /**
   * @function
   */
  handleLetMeKnowClick() {
    if (this.comment.isLetMeKnow) {
      this.set('comment.isLetMeKnow', false);
    } else {
      this.set('comment.isLetMeKnow', true);
    }
  },

  /**
   * @param {number} indexToRemove
   * @function
   */
  handleRemoveAttachmentClick(indexToRemove) {
    const { comment } = this;

    comment.set(
      'attachments',
      comment.get('attachments').filter((attachment, index) => index !== indexToRemove),
    );
  },

  /**
   * @param {Model} entity
   * @function
   */
  handleTagEntityClick(entity) {
    const { taggedEntities } = this.comment;

    if (
      entity.get('id') !== this.comment.get('author.id')
      && (!taggedEntities || Object.keys(taggedEntities).length < 20)
    ) {
      this.set('comment.taggedEntities', {
        ...taggedEntities,
        [entity.get('id')]: entity.get('constructor.modelName'),
      });
    }
  },

  /**
   * @param {Model} entity
   * @function
   */
  handleUntagEntityClick(entity) {
    const taggedEntities = { ...this.comment.taggedEntities };

    delete taggedEntities[entity.get('id')];

    if (Object.keys(taggedEntities).length > 0) {
      this.set('comment.taggedEntities', taggedEntities);
    } else {
      this.set('comment.taggedEntities', null);
    }
  },

  /**
   * @param {string} value
   * @function
   */
  handleTextBoxInput(value) {
    this.set('comment.text', value);
  },

  /**
   * @function
   * @private
   */
  async setupComment() {
    const { comment } = this.args;

    if (comment) {
      this.set('comment', comment);
    } else {
      this.set('comment', await this.createComment());
    }
  },

  /**
   * @return {Promise.<Model.Comment>} Resolves with the created comment
   * @function
   * @private
   */
  async createComment() {
    const { page, replyTo } = this.args;
    let root = replyTo;

    if (replyTo && replyTo.belongsTo('root').id()) {
      root = await replyTo.get('root');
    }

    return this.store.createRecord('comment', {
      page,
      replyTo,
      root,
      attachments: null,
      author: this.get('session.model'),
      isLetMeKnow: false,
      isDeleted: false,
      site: page.get('site'),
      status: 'approved',
      taggedEntities: null,
      text: null,
    });
  },
});
