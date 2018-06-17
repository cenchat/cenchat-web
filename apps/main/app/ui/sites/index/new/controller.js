import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesIndexNew
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @param {Object} siteData
   * @param {Event} event
   * @function
   */
  async handleSiteFormSubmit(siteData, event) {
    event.preventDefault();

    const site = this.get('store').createRecord('site', {
      ...siteData,
      name: siteData.displayName.toLowerCase(),
    });
    const currentUserId = this.get('session.model.id');

    await site.save({
      adapterOptions: {
        include(batch, db) {
          const currentUserDocRef = db.collection('users').doc(currentUserId);
          const siteDocRef = db.collection('sites').doc(site.get('id'));

          batch.set(siteDocRef.collection('admins').doc(currentUserId), {
            cloudFirestoreReference: currentUserDocRef,
          });
          batch.set(currentUserDocRef.collection('sitesAsAdmin').doc(site.get('id')), {
            cloudFirestoreReference: siteDocRef,
          });
        },
      },
    });
    this.transitionToRoute('sites.index');
    toast('Site added');
  },
});
