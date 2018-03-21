import AuthenticatedRoute from 'main/utils/authenticated-route';

/**
 * @class Profile
 * @namespace Route
 * @extends Route.AuthenticatedRoute
 */
export default AuthenticatedRoute.extend({
  /**
   * @override
   */
  model(params) {
    return this.get('store').query('user', {
      filter(reference) {
        return reference.where('username', '==', params.user_id).limit(1);
      },
    }).then((records) => {
      if (records.get('length') === 0) {
        return this.get('store').findRecord('user', params.user_id);
      }

      return records.get('firstObject');
    });
  },
});
