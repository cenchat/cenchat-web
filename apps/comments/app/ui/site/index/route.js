import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Route from '@ember/routing/route';

import fixedEncodeURIComponent from 'comments/utils/fixed-encode-uri-component';

/**
 * @class SiteIndex
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: inject(),

  /**
   * @override
   */
  queryParams: { slug: { as: 'slug' } },

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

      if (pages.get('length') === 0) {
        return this.createAndTransitionToPage();
      }

      return this.transitionTo('site.page', pages.get('firstObject.id').split('__')[1]);
    }

    return null;
  },

  /**
   * @return {Promise} Resolves to an array matching the query
   * @function
   * @private
   */
  queryPage() {
    const siteId = this.modelFor('site').get('id');

    return this.store.query('page', {
      filter(reference) {
        const db = reference.firestore;

        return reference
          .where('site', '==', db.collection('sites').doc(siteId))
          .where('slug', '==', this.slug);
      },
    });
  },

  /**
   * @return {Promise} Resolves to the transition object
   * @function
   * @private
   */
  async createAndTransitionToPage() {
    const site = this.modelFor('site');
    const postfixId = this.firebase.firestore().collection('pages').doc().id;
    const pageId = `${site.get('id')}__${postfixId}`;
    const page = await this.store.createRecord('page', {
      site,
      id: pageId,
      slug: this.slug,
    }).save({
      adapterOptions: { onServer: true },
    });

    this.transitionTo('site.page', page.get('id').split('__')[1]);
  },
});
