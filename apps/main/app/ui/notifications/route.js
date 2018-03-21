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
    return this.get('session.model');
  },

  /**
   * @override
   */
  async afterModel() {
    const userMetaInfo = await this.get('store').findRecord(
      'userMetaInfo',
      this.get('session.model.id'),
    );

    userMetaInfo.set('hasNewNotification', false);
    userMetaInfo.save();
  },
});
