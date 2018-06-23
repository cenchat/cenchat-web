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
   * @param {Element} target
   * @function
   */
  handleInviteRequestFormDataChange(target) {
    this.set('inviteRequest', { ...this.inviteRequest, [target.name]: target.value });
  },
});
