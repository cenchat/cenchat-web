import ProfileOwnerRoute from 'main/utils/profile-owner-route';

/**
 * @class ProfileFollowSuggestions
 * @namespace Route
 * @extends Route.ProfileOwnerRoute
 */
export default ProfileOwnerRoute.extend({
  /**
   * @override
   */
  model() {
    return this.modelFor('profile').user.getUnfollowedFacebookFriends(8);
  },
});
