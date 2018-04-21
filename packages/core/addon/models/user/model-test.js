import { A } from '@ember/array';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { settled } from '@ember/test-helpers';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { mockFirebase } from 'ember-cloud-firestore-adapter/test-support';
import sinon from 'sinon';

import { getFixtureData, stubPromise } from '@cenchat/core/test-support';

module('Unit | Model | user', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(function () {
    mockFirebase(this.owner, getFixtureData());
  });

  module('getter/setter: metaInfo', () => {
    test('should return meta info', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user_a',
      }));

      // Act
      run(() => model.get('metaInfo'));

      // Assert
      await settled();
      assert.equal(model.get('metaInfo.hasNewNotification'), true);
    });
  });

  module('getter/setter: urlKey', () => {
    test('should return the username when available', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => (
        this.owner.lookup('service:store').createRecord('user', { id: 'user_a', username: 'foo' })
      ));

      // Act
      const result = model.get('urlKey');

      // Assert
      assert.deepEqual(result, 'foo');
    });

    test('should return the ID when username is unavailable', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => (
        this.owner.lookup('service:store').createRecord('user', { id: 'user_a' })
      ));

      // Act
      const result = model.get('urlKey');

      // Assert
      assert.deepEqual(result, 'user_a');
    });
  });

  module('function: isFollowing', () => {
    test('should return true if user is a following', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user_a',
      }));

      // Act
      const result = await model.isFollowing('user_b');

      // Assert
      assert.equal(result, true);
    });

    test('should return false if user is not a following', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user_a',
      }));

      // Act
      const result = await model.isFollowing('user_100');

      // Assert
      assert.equal(result, false);
    });
  });

  module('function: hasFollower', () => {
    test('should return true when follower exists', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user_a',
      }));

      // Act
      const result = await model.hasFollower('user_b');

      // Assert
      assert.equal(result, true);
    });

    test('should return false when follower does not exists', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user_a',
      }));

      // Act
      const result = await model.hasFollower('user_100');

      // Assert
      assert.equal(result, false);
    });
  });

  module('function: isSiteAdmin', () => {
    test('should return true when site admin', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user_a',
      }));

      // Act
      const result = await model.isSiteAdmin('site_a');

      // Assert
      assert.equal(result, true);
    });

    test('should return false when not a site admin', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user_a',
      }));

      // Act
      const result = await model.isSiteAdmin('site_100');

      // Assert
      assert.equal(result, false);
    });
  });

  module('function: getMetaInfo', () => {
    test('should return the user\'s meta info', async function (assert) {
      assert.expect(2);

      // Arrange
      const model = run(() => this.owner.lookup('service:store').createRecord('user', {
        id: 'user_a',
      }));

      // Act
      const result = await run(() => model.getMetaInfo());

      // Assert
      assert.equal(result.get('id'), 'user_a');
      assert.equal(result.get('hasNewNotification'), true);
    });
  });

  module('function: getUnfollowedFacebookFriends', () => {
    hooks.beforeEach(function () {
      this.originalFetch = window.fetch;
      window.fetch = sinon.stub().returns(stubPromise(
        true,
        {
          json: sinon.stub().returns(stubPromise(
            true,
            {
              data: [{ id: 123 }, { id: 456 }, { id: 789 }],
            },
          )),
        },
      ));
    });

    hooks.afterEach(function () {
      window.fetch = this.originalFetch;
    });

    test('should return unfollowed facebook friends', async function (assert) {
      assert.expect(1);

      // Arrange
      const user123 = EmberObject.create({ id: 'user_123' });
      const user456 = EmberObject.create({ id: 'user_456' });
      const user789 = EmberObject.create({ id: 'user_789' });
      const queryStub = sinon.stub();

      queryStub.onCall(0).returns(stubPromise(true, new A([user123])));
      queryStub.onCall(1).returns(stubPromise(true, new A([user456])));
      queryStub.onCall(2).returns(stubPromise(true, new A([user789])));

      const isFollowingStub = sinon.stub();

      isFollowingStub.withArgs('user_123').returns(stubPromise(true, true));
      isFollowingStub.withArgs('user_456').returns(stubPromise(true, false));
      isFollowingStub.withArgs('user_789').returns(stubPromise(true, true));

      const model = run(() => this.owner.lookup('service:store').createRecord(
        'user',
        { id: 'user_a' },
      ));

      model.set('store', {
        findRecord: sinon.stub().returns(stubPromise(
          true,
          EmberObject.create({ facebookAccessToken: '123qweasd' }),
        )),
        query: queryStub,
      });
      model.set('isFollowing', isFollowingStub);

      // Act
      const result = await run(() => model.getUnfollowedFacebookFriends(2));

      // Assert
      assert.deepEqual(result, [user456]);
    });
  });
});
