import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { settled } from '@ember/test-helpers';
import { setupTest } from 'ember-qunit';

import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';

import { getFixtureData } from '@cenchat/core/test-support';

module('Unit | Model | user', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    mockFirebase(this.owner, getFixtureData());
  });

  module('getter/setter: missingInfo', function() {
    test('should return an array containing "username" when username is unavailable', async function(assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => {
        return this.owner.lookup('service:store').createRecord('user', {
          id: 'user_a',
        });
      });

      // Act
      const result = model.get('missingInfo');

      // Assert
      assert.deepEqual(result, ['username']);
    });

    test('should return an empty array there are no missing info', async function(assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => {
        return this.owner.lookup('service:store').createRecord('user', {
          id: 'user_a',
          username: 'user_a',
        });
      });

      // Act
      const result = model.get('missingInfo');

      // Arrange
      assert.deepEqual(result, []);
    });
  });

  module('getter/setter: metaInfo', function() {
    test('should return meta info', async function(assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => {
        return this.owner.lookup('service:store').createRecord('user', {
          id: 'user_a',
        });
      });

      // Act
      run(() => {
        return model.get('metaInfo');
      });

      // Assert
      await settled();
      assert.equal(model.get('metaInfo.hasNewNotification'), true);
    });
  });

  module('function: isFollowing', function() {
    test('should return true if user is a following', async function(assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => {
        return this.owner.lookup('service:store').createRecord('user', {
          id: 'user_a',
        });
      });

      // Act
      const result = await model.isFollowing('user_b');

      // Assert
      assert.equal(result, true);
    });

    test('should return false if user is not a following', async function(assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => {
        return this.owner.lookup('service:store').createRecord('user', {
          id: 'user_a',
        });
      });

      // Act
      const result = await model.isFollowing('user_100');

      // Assert
      assert.equal(result, false);
    });
  });

  module('function: hasFollower', function() {
    test('should return true when follower exists', async function(assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => {
        return this.owner.lookup('service:store').createRecord('user', {
          id: 'user_a',
        });
      });

      // Act
      const result = await model.hasFollower('user_b');

      // Assert
      assert.equal(result, true);
    });

    test('should return false when follower does not exists', async function(assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => {
        return this.owner.lookup('service:store').createRecord('user', {
          id: 'user_a',
        });
      });

      // Act
      const result = await model.hasFollower('user_100');

      // Assert
      assert.equal(result, false);
    });
  });

  module('function: isSiteAdmin', function() {
    test('should return true when site admin', async function(assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => {
        return this.owner.lookup('service:store').createRecord('user', {
          id: 'user_a',
        });
      });

      // Act
      const result = await model.isSiteAdmin('site_a');

      // Assert
      assert.equal(result, true);
    });

    test('should return false when not a site admin', async function(assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => {
        return this.owner.lookup('service:store').createRecord('user', {
          id: 'user_a',
        });
      });

      // Act
      const result = await model.isSiteAdmin('site_100');

      // Assert
      assert.equal(result, false);
    });
  });
});
