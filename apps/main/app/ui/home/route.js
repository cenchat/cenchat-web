import { inject } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class Home
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  headData: inject(),

  /**
   * @override
   */
  beforeModel() {
    const user = this.get('session.model');

    if (user) {
      const id = user.get('username') ? user.get('username') : user.get('id');

      this.transitionTo('profile', id);
    }
  },

  /**
   * @override
   */
  async afterModel() {
    this.set('headData.title', 'Cenchat');
    this.set('headData.description', 'Conversations at your site in a unique but familiar way');
    this.set('headData.image', 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fcenchat%2Fcenchat-wordmark-bow-1200.png?alt=media&token=bf1daeb8-3f41-4cfc-8e00-19f6e11aad9e');
    this.set('headData.url', 'https://cenchat.com');
    this.set('headData.type', 'website');
  },
});
