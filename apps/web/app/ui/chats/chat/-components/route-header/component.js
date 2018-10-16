import { computed } from '@ember/object';
import Component from '@ember/component';

/**
 * @class ChatsChatRouteHeader
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @override
   */
  tagName: '',

  /**
   * @type {boolean}
   */
  isSiteAdmin: computed('args', {
    get() {
      return this.args.chat.site.admins.find(admin => (
        admin.id === this.args.session.get('model.id')
      ));
    },
  }),
});
