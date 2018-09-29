import AuthenticatedRoute from 'main/utils/authenticated-route';

/**
 * @class Sites
 * @namespace Route
 * @extends Route.AuthenticatedRoute
 */
export default AuthenticatedRoute.extend({
  /**
   * @override
   */
  model() {
    return this.get('session.model.sitesAsAdmin');
  },
});
