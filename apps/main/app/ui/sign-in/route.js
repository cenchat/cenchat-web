import { inject } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class SignIn
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
    if (this.get('session.model')) {
      this.transitionTo('home');
    }
  },

  /**
   * @override
   */
  async afterModel() {
    this.set('headData.title', 'Cenchat');
    this.set('headData.description', 'Sign in');
    this.set('headData.image', 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fcenchat%2Fcenchat_white_1200.png?alt=media&token=c1aef38d-82d5-4bcf-a4e5-980e02b73bc1');
    this.set('headData.url', 'https://cenchat.com/sign-in');
    this.set('headData.type', 'website');
  },
});
