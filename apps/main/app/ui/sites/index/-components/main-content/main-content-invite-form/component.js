import Component from '@ember/component';

/**
 * @class SitesIndexMainContentInviteForm
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {Object}
   */
  inviteRequest: { website: null, monthlyViews: 'lt-1m' },

  /**
   * Handles the invite request form's data change event
   *
   * @param {Element} target
   */
  handleInviteRequestFormDataChange(target) {
    this.set('inviteRequest', {
      ...this.get('inviteRequest'),
      [target.name]: target.value,
    });
  },
});
