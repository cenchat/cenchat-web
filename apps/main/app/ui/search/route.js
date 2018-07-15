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

      return this.store.query('user', {
        limit: 8,

        filter(reference) {
          if (query.startsWith('@')) {
            const username = query.substr(1);

            return reference.orderBy('username').startAt(username).endAt(`${username}\uf8ff`);
          }

          return reference.orderBy('name').startAt(query).endAt(`${query}\uf8ff`);
        },
      });
    }

    return null;
  },
});
