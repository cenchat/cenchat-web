import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

import fetch from 'fetch';

import fixedEncodeURIComponent from 'widget/utils/fixed-encode-uri-component';

/**
 * @class SitesSitePagesPage
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
   * @override
   */
  model(params) {
    return this.findOrCreatePage(params);
  },

  /**
   * @override
   */
  redirect(model, transition) {
    if (model && transition.targetName === 'sites.site.pages.page.index') {
      this.transitionTo('sites.site.pages.page.my-chat');
    }
  },

  /**
   * @param {Object} params
   * @return {Promise} Resolves to the page
   * @function
   */
  async findOrCreatePage(params) {
    let page = await this.getPage(params);

    if (!page) {
      page = await this.createPage(params);
    }

    return page;
  },

  /**
   * @param {Object} params
   * @return {Promise} Resolves to the fetched page
   * @function
   */
  async getPage(params) {
    const site = this.modelFor('sites.site');
    const pageId = `${site.id}__${params.page_postfix_id}`;

    return this.store.get('page', pageId, {
      fetch: () => this.firebase.firestore().doc(`pages/${pageId}`).get(),
    });
  },

  /**
   * @param {Object} params
   * @return {Promise} Resolves to the created page
   * @function
   */
  async createPage(params) {
    const { slug } = this.paramsFor(this.routeName);

    if (slug) {
      const config = getOwner(this).resolveRegistration('config:environment');
      const authorizationToken = await this.get('session.currentUser').getIdToken();
      const siteId = this.modelFor('sites.site').id;
      const page = {
        id: `${siteId}__${params.page_postfix_id}`,
        site: siteId,
        slug: fixedEncodeURIComponent(slug),
      };

      await fetch(`${config.apiHost}/pages`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authorizationToken}` },
        body: JSON.stringify({ ...page, site: `sites/${siteId}` }),
      });

      this.store.set('page', page);

      return this.store.get('page', page.id);
    }

    return null;
  },
});
