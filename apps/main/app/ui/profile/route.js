import AuthenticatedRoute from 'main/utils/authenticated-route';
import RSVP from 'rsvp';

/**
 * @class Profile
 * @namespace Route
 * @extends Route.AuthenticatedRoute
 */
export default AuthenticatedRoute.extend({
  /**
   * @override
   */
  async model({ user_id: userId }) {
    const hash = {};
    const query = await this.get('store').query('user', {
      filter(reference) {
        return reference.where('username', '==', userId).limit(1);
      },
    });

    if (query.get('length') === 0) {
      hash.user = await this.get('store').findRecord('user', userId);
    } else {
      hash.user = query.get('firstObject');
    }

    if (hash.user) {
      hash.followings = hash.user.get('followings');

      if (hash.user.get('facebookId')) {
        hash.followingSuggestions = hash.user.getUnfollowedFacebookFriends(4);
      }
    }

    return RSVP.hash(hash);
  },
});
