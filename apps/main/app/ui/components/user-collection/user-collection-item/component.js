import { inject } from '@ember/service';
import Component from '@ember/component';

/**
 * @class UserCollectionItem
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  router: inject(),

  /**
   * @override
   */
  tagName: '',

  /**
   * Handles the user's click event
   */
  handleUserClick() {
    const user = this.get('--user');

    this.get('router').transitionTo('profile', user.get('username') || user.get('id'));
  },
});
