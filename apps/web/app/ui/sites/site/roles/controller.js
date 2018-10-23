import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';

import fetch from 'fetch';
import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesSiteRoles
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: service('firebase'),

  /**
   * @type {Ember.Service}
   */
  store: service('store'),

  /**
   * @type {boolean}
   */
  areThereAnyRoleChanges: computed('roleChange', {
    get() {
      return (
        this.roleChange.admin.additions.length > 0
        || this.roleChange.admin.removals.length > 0
      );
    },
  }),

  /**
   * @type {Object}
   */
  formattedRoleChange: computed('roleChange', {
    get() {
      const formattedRoleChange = {};

      Object.keys(this.roleChange).forEach((role) => {
        formattedRoleChange[role] = {};

        Object.keys(this.roleChange[role]).forEach((method) => {
          const userIds = this.roleChange[role][method].map(user => user.id);

          formattedRoleChange[role][method] = userIds;
        });
      });

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
    let usersWithRole = [...this.model.admins];

    if (query && query.trim()) {
      const lowerCasedQuery = query.toLowerCase();

      usersWithRole = [];

      if (lowerCasedQuery.startsWith('@')) {
        const users = await this.searchUser(lowerCasedQuery.substr(1));

        await Promise.all(
          users.map(async (user) => {
            if (await this.checkIfUserIsSiteAdmin(user)) {
              usersWithRole.push(user);
            } else {
              usersWithoutRole.push(user);
            }
          }),
        );
      } else {
        usersWithRole = await this.searchSiteAdmin(lowerCasedQuery);
      }
    }

    this.set('usersWithRole', usersWithRole);
    this.set('usersWithoutRole', usersWithoutRole);
  },

  /**
   * @param {Model.User} user
   */
  handleAddRoleClick(user) {
    const { additions, removals } = this.roleChange.admin;

    if (!additions.find(addition => addition.id === user.id)) {
      const newAdditions = [...additions, user];
      const newAdmin = { removals, additions: newAdditions };

      this.set('roleChange', { ...this.roleChange, admin: newAdmin });
    }
  },

  /**
   * @param {Model.User} user
   */
  handleRemoveRoleClick(user) {
    const { additions, removals } = this.roleChange.admin;

    if (!removals.find(removal => removal.id === user.id)) {
      const newRemovals = [...removals, user];
      const newAdmin = { additions, removals: newRemovals };

      this.set('roleChange', { ...this.roleChange, admin: newAdmin });
    }
  },

  /**
   * @param {Model.User} user
   */
  handleRemoveRoleChangeClick(user) {
    const { additions, removals } = this.roleChange.admin;

    if (additions.find(addedUser => addedUser.id === user.id)) {
      const newAdditions = additions.filter(addition => addition.id !== user.id);
      const newAdmin = { additions: newAdditions, removals };

      this.set('roleChange', { ...this.roleChange, admin: newAdmin });
    } else {
      const newRemovals = removals.filter(removal => removal.id !== user.id);
      const newAdmin = { additions, removals: newRemovals };

      this.set('roleChange', { ...this.roleChange, admin: newAdmin });
    }
  },

  /**
   * Saves pending role changes
   */
  async handleSaveRolesClick() {
    const config = getOwner(this).resolveRegistration('config:environment');
    const token = await this.get('session.currentUser').getIdToken();
    const response = await fetch(`${config.apiHost}/utils/update-site-roles`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        siteId: this.model.id,
        roleChange: this.formattedRoleChange,
      }),
    });

    if (response.ok) {
      this.updateSiteAdminState();
      this.set('usersWithoutRole', []);
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

  /**
   * @param {Model.User} user
   * @return {boolean} True if site admin. Otherwise, false.
   * @function
   */
  async checkIfUserIsSiteAdmin(user) {
    const db = this.firebase.firestore();
    const adminDocSnapshot = await db.doc(`sites/${this.model.id}/admins/${user.id}`).get();

    return adminDocSnapshot.exists;
  },

  /**
   * @param {string} username
   * @return {Array.<Model.User>} Users
   * @function
   */
  searchUser(username) {
    const db = this.firebase.firestore();

    return this.store.query('user', {
      fetch: async () => {
        const userQuerySnapshot = await db
          .collection('users')
          .orderBy('username')
          .startAt(username)
          .endAt(`${username}\uf8ff`)
          .limit(8)
          .get();

        return userQuerySnapshot.docs;
      },
    });
  },

  /**
   * @param {string} name
   * @return {Array.<Model.User>} Admins
   * @function
   */
  async searchSiteAdmin(name) {
    const db = this.firebase.firestore();

    return this.store.query('user', {
      fetch: async () => {
        const adminQuerySnapshot = await db
          .collection(`sites/${this.model.id}/admins`)
          .orderBy('name')
          .startAt(name)
          .endAt(`${name}\uf8ff`)
          .limit(8)
          .get();
        const adminDocSnapshots = await Promise.all(
          adminQuerySnapshot.docs.map(doc => doc.get('cloudFirestoreReference').get()),
        );

        return adminDocSnapshots;
      },
    });
  },

  /**
   * @function
   */
  updateSiteAdminState() {
    const { additions, removals } = this.formattedRoleChange.admin;
    let newAdmins = [...this.model.admins.map(admin => admin.id), ...additions];

    newAdmins = newAdmins.filter(admin => !removals.includes(admin));

    this.store.update('site', this.model.id, { admins: newAdmins });
  },
});
