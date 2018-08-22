import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

import fetch from 'fetch';

import fixedEncodeURIComponent from 'widget/utils/fixed-encode-uri-component';

/**
 * @class SitesSiteIndex
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
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
   * @override
   */
  queryParams: {
    slug: { as: 'slug' },
  },

  /**
   * @type {string}
   */
  slug: computed({
    get() {
      const { slug } = this.paramsFor(this.routeName);

      return slug ? fixedEncodeURIComponent(slug) : null;
    },
  }),

  /**
   * @override
   */
  async beforeModel() {
    if (this.slug) {
      const pages = await this.queryPage();
      let page;

      if (pages.length === 0) {
        page = await this.createPage();
      } else {
        [page] = pages;
      }

      this.transitionTo('sites.site.pages.page', page.id.split('__')[1]);
    }
  },

  /**
   * @return {Promise} Resolves to an array matching the query
   * @function
   * @private
   */
  queryPage() {
    return this.store.query('page', {
      fetch: () => {
        const siteId = this.modelFor('sites.site').id;
        const db = this.firebase.firestore();

        return db
          .collection('pages')
          .where('site', '==', db.doc(`sites/${siteId}`))
          .where('slug', '==', this.slug)
          .get()
          .then(querySnapshot => querySnapshot.docs);
      },
    });
  },

  /**
   * @return {Promise} Resolves to the transition object
   * @function
   * @private
   */
  async createPage() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const authorizationToken = await this.get('session.currentUser').getIdToken();
    const siteId = this.modelFor('sites.site').id;
    const db = this.firebase.firestore();
    const postfixId = db.collection('pages').doc().id;
    const page = { id: `${siteId}__${postfixId}`, site: siteId, slug: this.slug };

    await fetch(`${config.apiHost}/pages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authorizationToken}` },
      body: JSON.stringify({ ...page, site: `sites/${siteId}` }),
    });

    this.store.set('page', page);

    return this.store.get('page', page.id);
  },
});
