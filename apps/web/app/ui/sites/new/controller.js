import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesNew
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @type {Ember.Service}
   */
  session: service('session'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @param {Object} siteData
   * @param {Event} event
   * @function
   */
  async handleSiteFormSubmit(siteData, event) {
    event.preventDefault();

    const db = this.firebase.firestore();
    const batch = db.batch();
    const siteDocRef = db.collection('sites').doc();
    const processedSiteData = {
      ...siteData,
      imageUrl: null,
      isVerified: false,
      name: siteData.displayName.toLowerCase(),
    };

    batch.set(siteDocRef, processedSiteData);

    const currentUserId = this.get('session.model.id');

    batch.set(siteDocRef.collection('admins').doc(currentUserId), {
      cloudFirestoreReference: db.doc(`users/${currentUserId}`),
      name: this.get('session.model.name'),
    });
    batch.set(db.doc(`users/${currentUserId}/sitesAsAdmin/${siteDocRef.id}`), {
      cloudFirestoreReference: db.doc(`sites/${siteDocRef.id}`),
      name: processedSiteData.name,
    });
    await batch.commit();
    this.store.set('site', {
      ...processedSiteData,
      id: siteDocRef.id,
      admins: [currentUserId],
    });
    toast('Site created');
    this.transitionToRoute('sites.site', siteDocRef.id);
  },
});
