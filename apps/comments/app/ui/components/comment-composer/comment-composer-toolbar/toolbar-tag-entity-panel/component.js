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
  session: inject(),

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
      const currentUserId = this.session.get('model.id');

      users = await this.store.query('user', {
        limit: 4,

        buildReference(db) {
          if (query.startsWith('@')) {
            return db.collection('users');
          }

          return db.collection(`users/${currentUserId}/followings`);
        },

        filter(reference) {
          if (query.startsWith('@')) {
            const username = query.substr(1);

            return reference.orderBy('username').startAt(username).endAt(`${username}\uf8ff`);
          }

          return reference.orderBy('name').startAt(query).endAt(`${query}\uf8ff`);
        },
      });
    }

    this.set('searchResults', users);
  },
});
