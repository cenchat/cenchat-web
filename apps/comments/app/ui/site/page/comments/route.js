import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class SitePageComments
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  session: service(),

  /**
   * @override
   */
  queryParams: {
    filter: { refreshModel: true, as: 'filter' },
  },

  /**
   * @override
   */
  model({ filter }) {
    if (filter === 'relevance') {
      return this.fetchApprovedRelevantComments();
    }

    return this.fetchApprovedComments();
  },

  /**
   * @override
   */
  redirect(model) {
    if (this.isFirstVisit === undefined) {
      this.set('isFirstVisit', true);
    }

    if (this.isFirstVisit && this.paramsFor(this.routeName).filter && model.get('length') === 0) {
      this.transitionTo('site.page.comments', {
        queryParams: { filter: null },
      });
    }

    if (this.isFirstVisit) {
      this.set('isFirstVisit', false);
    }
  },

  /**
   * @return {Array.<Model.Comment>} Comments
   * @function
   * @private
   */
  fetchApprovedComments() {
    const pageId = this.modelFor('site.page').page.get('id');

    return this.store.query('comment', {
      queryId: `${pageId}_all_comments`,
      limit: 2,

      filter(reference) {
        const db = reference.firestore;

        return reference
          .where('page', '==', db.doc(`pages/${pageId}`))
          .where('status', '==', 'approved')
          .orderBy('createdOn');
      },
    });
  },

  /**
   * @return {Array.<Model.Comment>} Comments
   * @function
   * @private
   */
  fetchApprovedRelevantComments() {
    const pageId = this.modelFor('site.page').page.get('id');
    const currentUserId = this.session.get('model.id');

    return this.store.query('comment', {
      queryId: `${pageId}_${currentUserId}_relevant_comments`,
      limit: 2,

      buildReference(db) {
        return db.collection(`users/${currentUserId}/followingComments`);
      },

      filter(reference) {
        const db = reference.firestore;

        return reference
          .where('page', '==', db.doc(`pages/${pageId}`))
          .where('status', '==', 'approved')
          .orderBy('createdOn');
      },
    });
  },
});
