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
   * Handles invite request form's submit event
   *
   * @param {Object} inviteRequest
   * @param {Event} event
   */
  async handleInviteRequestFormSubmit(inviteRequest, event) {
    event.preventDefault();

    await this.get('store').createRecord('beta-tester', {
      ...inviteRequest,
      id: this.get('model.id'),
      status: 'pending',
    }).save();

    this.set('model.betaTesterStatus', 'pending');
  },
});
