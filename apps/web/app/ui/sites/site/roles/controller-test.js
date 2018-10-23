import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Unit | Controller | sites/site/roles', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('getter/setter: areThereAnyRoleChanges', function () {
    test('should return true when there are role changes', function (assert) {
      assert.expect(1);

      // Arrange
      const controller = this.owner.lookup('controller:sites/site/roles');

      controller.set('roleChange.admin.additions', [{ id: 'user_b' }]);

      // Act
      const result = controller.get('areThereAnyRoleChanges');

      // Assert
      assert.equal(result, true);
    });

    test('should return false when there are no role changes', function (assert) {
      assert.expect(1);

      // Arrange
      const controller = this.owner.lookup('controller:sites/site/roles');

      // Act
      const result = controller.get('areThereAnyRoleChanges');

      // Assert
      assert.equal(result, false);
    });
  });

  module('function: handleSearchUserInput', function () {
    test('should categorize users with and without roles when username query is provided', async function (assert) {
      assert.expect(2);

      // Arrange
      const controller = this.owner.lookup('controller:sites/site/roles');

      controller.set('model', await this.store.get('site', 'site_a'));

      // Act
      await controller.handleSearchUserInput('@user_');

      // Assert
      assert.equal(controller.get('usersWithRole.length'), 2);
      assert.equal(controller.get('usersWithoutRole.length'), 3);
    });

    test('should categorize users with and without roles when name query is provided', async function (assert) {
      assert.expect(2);

      // Arrange
      const controller = this.owner.lookup('controller:sites/site/roles');

      controller.set('model', await this.store.get('site', 'site_a'));

      // Act
      await controller.handleSearchUserInput('user');

      // Assert
      assert.equal(controller.get('usersWithRole.length'), 2);
      assert.equal(controller.get('usersWithoutRole.length'), 0);
    });

    test('should empty users with and without roles when query is not provided', async function (assert) {
      assert.expect(2);

      // Arrange
      const controller = this.owner.lookup('controller:sites/site/roles');

      controller.set('model', EmberObject.create({
        admins: ['foo'],
      }));

      // Act
      await controller.handleSearchUserInput();

      // Assert
      assert.deepEqual(controller.get('usersWithRole'), ['foo']);
      assert.deepEqual(controller.get('usersWithoutRole'), []);
    });
  });

  module('function: handleAddRoleClick', function () {
    test('should track user for add role changes', async function (assert) {
      assert.expect(1);

      // Arrange
      const controller = this.owner.lookup('controller:sites/site/roles');
      const user = await this.store.get('user', 'user_b');

      // Act
      controller.handleAddRoleClick(user);

      // Assert
      assert.deepEqual(controller.get('roleChange'), {
        admin: {
          additions: [user],
          removals: [],
        },
      });
    });
  });

  module('function: handleRemoveRoleClick', function () {
    test('should track user for remove role changes', async function (assert) {
      assert.expect(1);

      // Arrange
      const controller = this.owner.lookup('controller:sites/site/roles');
      const user = await this.store.get('user', 'user_b');

      // Act
      controller.handleRemoveRoleClick(user);

      // Assert
      assert.deepEqual(controller.get('roleChange'), {
        admin: {
          additions: [],
          removals: [user],
        },
      });
    });
  });

  module('function: handleRemoveRoleChangeClick', function () {
    test('should remove user from being tracked for addition when tracked', async function (assert) {
      assert.expect(1);

      // Arrange
      const controller = this.owner.lookup('controller:sites/site/roles');
      const user = await this.store.get('user', 'user_b');

      controller.handleAddRoleClick(user);

      // Act
      controller.handleRemoveRoleChangeClick(user);

      // Assert
      assert.deepEqual(controller.get('roleChange'), {
        admin: {
          additions: [],
          removals: [],
        },
      });
    });

    test('should remove user from being tracked for removal when tracked', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({ id: 'user_b' });
      const controller = this.owner.lookup('controller:sites/site/roles');

      controller.handleRemoveRoleClick(user);

      // Act
      controller.handleRemoveRoleChangeClick(user);

      // Assert
      assert.deepEqual(controller.get('roleChange'), {
        admin: {
          additions: [],
          removals: [],
        },
      });
    });
  });

  module('function: handleSaveRolesClick', function () {
    test('should reset role change when successfully saves', async function (assert) {
      assert.expect(1);

      // Arrange
      const server = sinon.fakeServer.create();

      server.autoRespond = true;
      server.autoRespondAfter = 0;

      server.respondWith(
        'POST',
        'https://us-central1-cenchat-app-staging.cloudfunctions.net/app/api/utils/update-site-roles',
        [204, {}, ''],
      );

      const userToAdd = await this.store.get('user', 'user_b');
      const userToRemove = await this.store.get('user', 'user_c');
      const controller = this.owner.lookup('controller:sites/site/roles');

      controller.set('model', await this.store.get('site', 'site_a'));
      controller.handleAddRoleClick(userToAdd);
      controller.handleRemoveRoleClick(userToRemove);

      // Act
      await controller.handleSaveRolesClick();

      // Assert
      assert.deepEqual(controller.roleChange, {
        admin: {
          additions: [],
          removals: [],
        },
      });
    });
  });
});
