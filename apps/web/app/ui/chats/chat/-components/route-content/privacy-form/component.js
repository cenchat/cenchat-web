import Component from '@ember/component';

/**
 * @class ChatsChatRouteContentPrivacyForm
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    const { isPublicized, publicizedTitle } = this.args.chat;

    this.set('chat', { isPublicized, publicizedTitle });
  },

  /**
   * @param {Element} target
   * @function
   */
  handlePrivacyFormDataChange(target) {
    let { value } = target;

    if (target.name === 'isPublicized') {
      value = target.value === 'true';
    }

    this.set('chat', { ...this.chat, [target.name]: value });
  },
});
