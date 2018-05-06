import { inject } from '@ember/service';
import Component from '@ember/component';

/**
 * @class ToolbarTagEntityPanel
 * @namespace Component
 * @extends Ember.Component
 */
export default Component.extend({
  /**
   * @type {Ember.Service}
   */
  store: inject(),

  /**
   * @override
   */
  tagName: '',

  /**
   * @param {Element} target
   * @function
   */
  async searchEntities(target) {
    const query = target.value.toLowerCase();
    let users = [];

    if (query) {
      users = await this.get('store').query('user', {
        filter(reference) {
          return reference
            .orderBy('username')
            .startAt(query)
            .endAt(`${query}\uf8ff`)
            .limit(4);
        },
      });
    }

    this.set('searchResults', users);
  },
});
