import { getOwner } from '@ember/application';
import { inject } from '@ember/service';

import CloudFirestoreAdapter from 'ember-cloud-firestore-adapter/adapters/cloud-firestore';

/**
 * @class CloudFirestoreAdapter
 * @namespace Adapter
 * @extends DS.Adapter
 */
export default CloudFirestoreAdapter.extend({
  /**
   * @type {Ember.Service}
   */
  session: inject(),

  /**
   * TODO: Remove this once https://github.com/rmmmp/ember-cloud-firestore-adapter/issues/60
   *       is resolved
   * @type {null}
   */
  firestoreSettings: null,

  /**
   * @type {string}
   */
  namespace: 'api',

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    const config = getOwner(this).resolveRegistration('config:environment');

    this.set('host', config.apiHost);
  },

  /**
   * @override
   */
  createRecord(store, type, snapshot, ...args) {
    if (this.isOnServer(snapshot)) {
      const original = this._super;

      return this.setHeaderAuthorization().then(() => (
        original.call(this, store, type, snapshot, ...args)
      ));
    }

    return this._super(store, type, snapshot, ...args);
  },

  /**
   * @override
   */
  updateRecord(store, type, snapshot, ...args) {
    if (this.isOnServer(snapshot)) {
      const original = this._super;

      return this.setHeaderAuthorization().then(() => (
        original.call(this, store, type, snapshot, ...args)
      ));
    }

    return this._super(store, type, snapshot, ...args);
  },

  /**
   * @override
   */
  deleteRecord(store, type, snapshot, ...args) {
    if (this.isOnServer(snapshot)) {
      const original = this._super;

      return this.setHeaderAuthorization().then(() => (
        original.call(this, store, type, snapshot, ...args)
      ));
    }

    return this._super(store, type, snapshot, ...args);
  },

  /**
   * @param {Object} snapshot
   * @return {boolean} True if for a server. Otherwise, false.
   * @function
   * @private
   */
  isOnServer(snapshot) {
    if (snapshot.adapterOptions && snapshot.adapterOptions.onServer) {
      return true;
    }

    return false;
  },

  /**
   * @return {Promise} Resolves after setting header authorization when signed in. Otherwise, just resolves.
   * @function
   * @private
   */
  setHeaderAuthorization() {
    if (this.session.get('isAuthenticated')) {
      return this.session.get('currentUser').getIdToken().then(token => (
        this.set('headers.Authorization', `Bearer ${token}`)
      ));
    }

    return Promise.resolve();
  },
});
