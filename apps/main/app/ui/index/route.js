import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

/**
 * @class Index
 * @namespace Route
 * @extends Ember.Route
 */
export default Route.extend({
  /**
   * @type {Ember.Service}
   */
  headData: service('headData'),

  /**
   * @override
   */
  async afterModel() {
    this.set('headData.title', 'Cenchat - messaging for websites');
    this.set('headData.description', 'Chat based solution for websites that don\'t want to bother moderating their comment section');
    this.set('headData.image', 'https://firebasestorage.googleapis.com/v0/b/cenchat-app.appspot.com/o/assets%2Fimages%2Flogos%2Fcenchat-wordmark-wob-1200.png?alt=media&token=60d29c99-660c-43a2-a643-ec45eacd9876');
    this.set('headData.type', 'website');
    this.set('headData.url', 'https://cenchat.com');
  },
});
