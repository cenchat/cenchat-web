import { A } from '@ember/array';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import sinon from 'sinon';

import { setupTestState, stubPromise } from '@cenchat/core/test-support';

module('Unit | Model | user', (hooks) => {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  module('getter/setter: avatarUrl', () => {
    test('should return facebook photo when account is linked to facebook', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('user', {
        id: 'user_100',
        provider: { facebook: 'fb_100' },
      });

      // Act
      const result = await model.get('avatarUrl');

      // Assert
      assert.equal(result, `https://graph.facebook.com/${model.provider.facebook}/picture?type=large`);
    });

    test('should return anonymous photo when facebook account is not linked', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('user', { id: 'user_100', provider: {} });

      // Act
      const result = await model.get('avatarUrl');

      // Assert
      assert.equal(result, 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114');
    });
  });

  module('getter/setter: metaInfo', () => {
    test('should return meta info', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('user', { id: 'user_100' });

      sinon
        .stub(model.store, 'findRecord')
        .withArgs('userMetaInfo', 'user_100')
        .returns(stubPromise(true, 'foo'));

      // Act
      const result = await model.get('metaInfo');

      // Assert
      assert.equal(result, 'foo');
    });
  });

  module('getter/setter: urlKey', () => {
    test('should return the username when available', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('user', { id: 'user_100', username: 'foo' });

      // Act
      const result = model.urlKey;

      // Assert
      assert.deepEqual(result, 'foo');
    });

    test('should return the ID when username is unavailable', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('user', { id: 'user_100' });

      // Act
      const result = model.urlKey;

      // Assert
      assert.deepEqual(result, 'user_100');
    });
  });

  module('function: isFollowing', () => {
    test('should return true if user is a following', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = await this.store.findRecord('user', 'user_a');

      // Act
      const result = await model.isFollowing('user_b');

      // Assert
      assert.equal(result, true);
    });

    test('should return false if user is not a following', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('user', { id: 'user_100' });

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
      const model = await this.store.findRecord('user', 'user_a');

      // Act
      const result = await model.hasFollower('user_b');

      // Assert
      assert.equal(result, true);
    });

    test('should return false when follower does not exists', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('user', { id: 'user_100' });

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
      const model = await this.store.findRecord('user', 'user_a');

      // Act
      const result = await model.isSiteAdmin('site_a');

      // Assert
      assert.equal(result, true);
    });

    test('should return false when not a site admin', async function (assert) {
      assert.expect(1);

      // Arrange
      const model = this.store.createRecord('user', { id: 'user_100' });

      // Act
      const result = await model.isSiteAdmin('site_100');

      // Assert
      assert.equal(result, false);
    });
  });

  module('function: getUnfollowedFacebookFriends', () => {
    hooks.beforeEach(function () {
      const server = sinon.fakeServer.create();

      server.autoRespond = true;
      server.autoRespondAfter = 0;

      server.respondWith(
        'GET',
        'https://graph.facebook.com/v2.12/fb_user_100/friends?access_token=123qweasd&limit=5000',
        [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({
            data: [{ id: 123 }, { id: 456 }, { id: 789 }],
          }),
        ],
      );
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

      const model = this.store.createRecord('user', {
        id: 'user_100',
        facebookId: 'fb_user_100',
      });

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
