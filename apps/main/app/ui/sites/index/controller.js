import { inject } from '@ember/service';
import Controller from '@ember/controller';

/**
 * @class SitesIndex
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  router: inject(),

  /**
   * @type {Ember.Service}
   */
  session: inject(),

  /**
   * @param {Object} inviteRequest
   * @param {Event} event
   * @function
   */
  async handleInviteRequestFormSubmit(inviteRequest, event) {
    event.preventDefault();

    await this.store.createRecord('beta-tester', {
      ...inviteRequest,
      id: this.get('session.model.id'),
      status: 'pending',
    }).save();

    this.set('session.model.betaTester.status', 'pending');
  },
});
