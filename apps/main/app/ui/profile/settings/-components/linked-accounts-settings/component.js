import Component from '@ember/component';

import firebase from 'firebase';

/**
 * @class ProfileSettingsLinkedAccountsSettings
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {boolean}
   */
  isFacebookAccountLinked: false,

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    if (this.getFacebookProvider(this.args.session.get('currentUser'))) {
      this.set('isFacebookAccountLinked', true);
    }
  },

  /**
   * @param {firebase.User} user
   * @return {firebase.UserInfo} Additional Facebook-specific information about the user
   * @function
   */
  getFacebookProvider(user) {
    for (const provider of user.providerData) {
      if (provider.providerId.includes('facebook')) {
        return provider;
      }
    }

    return null;
  },

  /**
   * @function
   */
  async linkFacebookAccount() {
    const provider = new firebase.auth.FacebookAuthProvider();

    provider.addScope('user_friends');

    const currentUser = this.args.session.get('currentUser');
    const result = await currentUser.linkWithPopup(provider);
    const currentUserModel = this.args.session.get('model');
    const { photoURL, uid: facebookId } = this.getFacebookProvider(result.user);

    currentUserModel.set('photoUrl', photoURL);
    currentUserModel.set('provider', { facebook: facebookId });

    currentUserModel.save({
      adapterOptions: {
        include(batch, db) {
          batch.set(db.collection('facebookIds').doc(facebookId), {
            cloudFirestoreReference: db.collection('users').doc(currentUserModel.get('id')),
          });
          batch.update(db.collection('userMetaInfos').doc(currentUserModel.get('id')), {
            accessToken: { facebook: result.credential.accessToken },
          });
        },
      },
    });

    this.set('isFacebookAccountLinked', true);
  },

  /**
   * @function
   */
  async unlinkFacebookAccount() {
    const currentUser = this.args.session.get('currentUser');
    const { uid: facebookId } = this.getFacebookProvider(currentUser);
    const promises = [currentUser.unlink('facebook.com')];
    const currentUserModel = this.args.session.get('model');

    currentUserModel.set('photoUrl', null);
    currentUserModel.set('provider', null);

    promises.push(currentUserModel.save({
      adapterOptions: {
        include(batch, db) {
          batch.delete(db.collection('facebookIds').doc(facebookId));
          batch.update(db.collection('userMetaInfos').doc(currentUserModel.get('id')), {
            accessToken: null,
          });
        },
      },
    }));

    await Promise.all(promises);

    this.set('isFacebookAccountLinked', false);
  },
});
