import Route from '@ember/routing/route';

/**
 * @class Search
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @override
   */
  queryParams: {
    query: { refreshModel: true, as: 'q' },
  },

  /**
   * @override
   */
  model(params) {
    let { query } = params;

    if (query) {
      query = query.toLowerCase();

      return this.get('store').query('user', {
        limit: 8,

        filter(reference) {
          return reference
            .orderBy('username')
            .startAt(query)
            .endAt(`${query}\uf8ff`);
        },
      });
    }

    return null;
  },
});
