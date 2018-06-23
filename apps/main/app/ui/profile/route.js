import { inject } from '@ember/service';
import AuthenticatedRoute from 'main/utils/authenticated-route';
import RSVP from 'rsvp';

/**
 * @class Profile
 * @namespace Route
 * @extends Route.AuthenticatedRoute
 */
export default AuthenticatedRoute.extend({
  /**
   * @type {Ember.Service}
   */
  session: inject(),

  /**
   * @override
   */
  async model({ user_id: userId }) {
    const hash = {};
    const query = await this.store.query('user', {
      limit: 1,

      filter(reference) {
        return reference.where('username', '==', userId);
      },
    });

    if (query.get('length') === 0) {
      hash.user = await this.store.findRecord('user', userId);
    } else {
      hash.user = query.get('firstObject');
    }

    if (
      hash.user
      && this.get('session.model')
      && this.get('session.model.id') === hash.user.get('id')
    ) {
      hash.followings = hash.user.get('followings');

      const metaInfo = await hash.user.get('metaInfo');

      if (metaInfo.get('facebookAccessToken')) {
        hash.followSuggestions = hash.user.getUnfollowedFacebookFriends(4);
      }
    }

    return RSVP.hash(hash);
  },
});
