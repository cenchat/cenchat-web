import AuthenticatedRoute from 'main/utils/authenticated-route';

/**
 * @class Home
 * @namespace Route
 * @extends Route.AuthenticatedRoute
 */
export default AuthenticatedRoute.extend({
  /**
   * @override
   */
  model() {
    return this.get('session.model.notifications');
  },

  /**
   * @override
   */
  async afterModel() {
    const userMetaInfo = await this.get('session.model.metaInfo');

    userMetaInfo.set('hasNewNotification', false);
    userMetaInfo.save();
  },
});
