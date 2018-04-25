import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Controller from '@ember/controller';

import toast from '@cenchat/elements/utils/toast';

/**
 * @class SitesSiteIndexRoles
 * @namespace Controller
 * @extends Ember.Controller
 */
export default Controller.extend({
  /**
   * @type {Ember.Service}
   */
  firebase: inject(),

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
      const users = await this.get('store').query('user', {
        filter(reference) {
          return reference.orderBy('username').startAt(query).endAt(`${query}\uf8ff`).limit(8);
        },
      });
      const isAdminChecks = [];

      users.forEach(user => isAdminChecks.push(user.isSiteAdmin(this.get('model.site.id'))));

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
    const db = this.get('firebase').firestore();
    const batch = db.batch();
    const siteId = this.get('model.site.id');
    const siteDocRef = db.collection('sites').doc(siteId);
    const roleChange = this.get('roleChange');

    for (const role of Object.keys(roleChange)) {
      for (const user of roleChange[role].additions) {
        const userId = user.get('id');
        const userDocRef = db.collection('users').doc(userId);

        batch.set(siteDocRef.collection('admins').doc(userId), {
          cloudFirestoreReference: userDocRef,
        });
        batch.set(userDocRef.collection('sitesAsAdmin').doc(siteId), {
          cloudFirestoreReference: siteDocRef,
        });
      }

      for (const user of roleChange[role].removals) {
        const userId = user.get('id');
        const userDocRef = db.collection('users').doc(userId);

        batch.delete(siteDocRef.collection('admins').doc(userId));
        batch.delete(userDocRef.collection('sitesAsAdmin').doc(siteId));
      }
    }

    await batch.commit();
    this.set('roleChange', {
      admin: {
        additions: [],
        removals: [],
      },
    });
    toast('Roles saved');
  },
});
