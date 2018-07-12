import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import Route from '@ember/routing/route';

import fixedEncodeURIComponent from 'comments/utils/fixed-encode-uri-component';

/**
 * @class SitePage
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  session: service(),

  /**
   * @override
   */
  queryParams: {
    comment: { as: 'comment' },
    slug: { as: 'slug' },
  },

  /**
   * @override
   */
  model(params) {
    const hash = { page: this.findOrCreatePage(params.page_id) };

    if (params.comment) {
      hash.comment = this.store.findRecord('comment', params.comment).catch(() => null);
    }

    return RSVP.hash(hash);
  },

  redirect(model, transition) {
    if (transition.targetName === 'site.page.index') {
      const filter = this.session.get('isAuthenticated') ? 'relevance' : null;

      this.transitionTo('site.page.comments', {
        queryParams: { filter },
      });
    }
  },

  /**
   * @param {string} pageIdPostfix
   * @return {Promise} Page
   * @function
   * @private
   */
  async findOrCreatePage(pageIdPostfix) {
    const site = this.modelFor('site');
    const pageId = `${site.get('id')}__${pageIdPostfix}`;

    try {
      const page = await this.store.findRecord('page', pageId);

      return page;
    } catch (e) {
      const { slug } = this.paramsFor(this.routeName);

      if (slug) {
        const page = this.store.createRecord('page', {
          site,
          id: pageId,
          slug: fixedEncodeURIComponent(slug),
        });

        return page.save({
          adapterOptions: { onServer: true },
        });
      }
    }

    return null;
  },
});
