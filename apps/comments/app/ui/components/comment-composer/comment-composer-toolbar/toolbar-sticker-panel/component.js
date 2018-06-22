import Component from '@ember/component';

/**
 * @class CommentComposerToolbarStickerPanel
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

    this.set('selectedStickerPack', this.args.stickerPacks.get('firstObject'));
  },
});
