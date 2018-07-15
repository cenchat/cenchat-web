import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import Controller from '@ember/controller';

import fetch from 'fetch';
import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesSiteManageRoles
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {boolean}
   */
  areThereAnyRoleChanges: computed('roleChange', {
    get() {
      const roleChange = this.get('roleChange');

      return roleChange.admin.additions.length > 0 || roleChange.admin.removals.length > 0;
    },
  }),

  /**
   * @type {Object}
   */
  formattedRoleChange: computed('roleChange', {
    get() {
      const formattedRoleChange = {};
      const roleChange = this.get('roleChange');

      for (const role of Object.keys(roleChange)) {
        formattedRoleChange[role] = {};

        for (const method of Object.keys(roleChange[role])) {
          const userIds = roleChange[role][method].map(user => user.get('id'));

          formattedRoleChange[role][method] = userIds;
        }
      }

      return formattedRoleChange;
    },
  }),

  /**
   * @override
   */
  init(...args) {
    this._super(...args);

    this.set('roleChange', {
      admin: {
        additions: [],
        removals: [],
      },
    });
  },

  /**
   * @param {string} query
   */
  async handleSearchUserInput(query) {
    const usersWithoutRole = [];
    let usersWithRole = [];

    if (query && query.trim()) {
      const lowerCasedQuery = query.toLowerCase();
      const siteId = this.get('model.site.id');
      const users = await this.store.query('user', {
        limit: 8,

        buildReference(db) {
          if (lowerCasedQuery.startsWith('@')) {
            return db.collection('users');
          }

          return db.collection(`sites/${siteId}/admins`);
        },

        filter(reference) {
          if (lowerCasedQuery.startsWith('@')) {
            const username = lowerCasedQuery.substr(1);

            return reference.orderBy('username').startAt(username).endAt(`${username}\uf8ff`);
          }

          return reference
            .orderBy('name')
            .startAt(lowerCasedQuery)
            .endAt(`${lowerCasedQuery}\uf8ff`);
        },
      });
      const isAdminChecks = [];

      users.forEach(user => isAdminChecks.push(user.isSiteAdmin(siteId)));

      const isAdminCheckResult = await Promise.all(isAdminChecks);

      isAdminCheckResult.forEach((isAdmin, index) => {
        if (isAdmin) {
          usersWithRole.push(users.objectAt(index));
        } else {
          usersWithoutRole.push(users.objectAt(index));
        }
      });
    } else {
      usersWithRole = this.get('model.admins');
    }

    this.set('usersWithRole', usersWithRole);
    this.set('usersWithoutRole', usersWithoutRole);
  },

  /**
   * @param {Model.User} user
   */
  handleAddRoleClick(user) {
    const roleChange = this.get('roleChange');
    const { additions, removals } = roleChange.admin;

    if (!additions.findBy('id', user.get('id'))) {
      const newAdditions = [...additions, user];
      const newAdmin = { removals, additions: newAdditions };

      this.set('roleChange', { ...roleChange, admin: newAdmin });
    }
  },

  /**
   * @param {Model.User} user
   */
  handleRemoveRoleClick(user) {
    const roleChange = this.get('roleChange');
    const { additions, removals } = roleChange.admin;

    if (!removals.findBy('id', user.get('id'))) {
      const newRemovals = [...removals, user];
      const newAdmin = { additions, removals: newRemovals };

      this.set('roleChange', { ...roleChange, admin: newAdmin });
    }
  },

  /**
   * @param {Model.User} user
   */
  handleRemoveRoleChangeClick(user) {
    const roleChange = this.get('roleChange');
    const { additions, removals } = roleChange.admin;

    if (additions.findBy('id', user.get('id'))) {
      const newAdditions = additions.filter(addition => addition !== user);
      const newAdmin = { additions: newAdditions, removals };

      this.set('roleChange', { ...roleChange, admin: newAdmin });
    } else {
      const newRemovals = removals.filter(removal => removal !== user);
      const newAdmin = { additions, removals: newRemovals };

      this.set('roleChange', { ...roleChange, admin: newAdmin });
    }
  },

  /**
   * Saves pending role changes
   */
  async handleSaveRolesClick() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const token = await this.get('session.currentUser').getIdToken();
    const response = await fetch(`${config.apiHost}/api/utils/update-site-roles`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: this.get('model.site.id'),
        roleChange: this.get('formattedRoleChange'),
      }),
    });

    if (response.ok) {
      this.set('roleChange', {
        admin: {
          additions: [],
          removals: [],
        },
      });
      toast('Roles saved');
    } else {
      const data = await response.text();

      toast(data);
    }
  },
});
