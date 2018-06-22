import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesIndexNew
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  session: service(),

  /**
   * @param {Object} siteData
   * @param {Event} event
   * @function
   */
  async handleSiteFormSubmit(siteData, event) {
    event.preventDefault();

    const site = this.store.createRecord('site', {
      ...siteData,
      name: siteData.displayName.toLowerCase(),
    });
    const currentUser = this.get('session.model');

    await site.save({
      adapterOptions: {
        include(batch, db) {
          const currentUserDocRef = db.collection('users').doc(currentUser.get('id'));
          const siteDocRef = db.collection('sites').doc(site.get('id'));

          batch.set(siteDocRef.collection('admins').doc(currentUser.get('id')), {
            cloudFirestoreReference: currentUserDocRef,
            name: currentUser.get('name'),
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
