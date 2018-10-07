import Component from '@ember/component';

import layout from './template';

/**
 * @class ChatComposerSubToolbarSticker
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  layout,

  /**
   * @override
   */
  tagName: '',

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.loadStickerPacks();
  },

  /**
   * @param {Object} stickerPack
   * @function
   */
  async handleStickerPackClick(stickerPack) {
    await this.loadStickers(stickerPack);

    this.set('selectedStickerPack', await this.args.store.get('stickerPack', stickerPack.id));
  },

  /**
   * @function
   */
  async loadStickerPacks() {
    const sessionId = this.args.session.get('model.id');
    const stickerPacks = await this.args.store.query('stickerPack', {
      fetch: async () => {
        const db = this.args.firebase.firestore();
        const userStickerPacksQuerySnapshot = await db
          .collection(`users/${sessionId}/stickerPacks`)
          .get();
        const stickerPackRequests = userStickerPacksQuerySnapshot.docs.map(docSnapshot => (
          docSnapshot.get('cloudFirestoreReference').get()
        ));

        return Promise.all(stickerPackRequests);
      },

      include: {
        stickers: record => this.loadStickers(record),
      },
    });

    if (stickerPacks.length > 0) {
      this.args.store.update('user', sessionId, { stickerPacks });

      this.set('selectedStickerPack', await this.args.store.get('stickerPack', stickerPacks[0].id));
    }
  },

  /**
   * @param {Object} stickerPack
   * @return {Array.<firebase.firestore.DocumentSnapshot>} Stickers
   * @function
   */
  async loadStickers(stickerPack) {
    const db = this.args.firebase.firestore();
    const stickerPackDocRef = db.doc(`stickerPacks/${stickerPack.id}`);
    const stickerQuerySnapshot = await db
      .collection('stickers')
      .where('pack', '==', stickerPackDocRef)
      .limit(20)
      .get();

    return stickerQuerySnapshot.docs;
  },
});
