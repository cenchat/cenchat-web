import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | profile', (hooks) => {
  setupTest(hooks);

  module('hook: model', () => {
    test('should return record that matches a username', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({
        id: 'user_b',
        metaInfo: EmberObject.create({ facebookAccessToken: 'foobar' }),
        followings: 'followings_foo',

        getUnfollowedFacebookFriends() {
          return stubPromise(true, 'followSuggestions_foo');
        },
      });
      const route = this.owner.lookup('route:profile');

      route.set('session', {
        model: { id: 'user_a' },
      });

      route.set('store', {
        query: sinon.stub().returns(stubPromise(true, new A([user]))),
      });

      // Act
      const result = await route.model({ user_id: 'user_b' });

      // Assert
      assert.deepEqual(result, { user });
    });

    test('should return record that matches an ID when querying for a username returns nothing', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({
        id: 'user_b',
        metaInfo: EmberObject.create({ facebookAccessToken: 'foobar' }),
        followings: 'followings_foo',

        getUnfollowedFacebookFriends() {
          return stubPromise(true, 'followSuggestions_foo');
        },
      });
      const route = this.owner.lookup('route:profile');

      route.set('session', {
        model: { id: 'user_a' },
      });
      route.set('store', {
        findRecord: sinon.stub().withArgs('user', 'user_a').returns(stubPromise(true, user)),
        query: sinon.stub().returns(stubPromise(true, new A([]))),
      });

      // Act
      const result = await route.model({ user_id: 'user_a' });

      // Assert
      assert.deepEqual(result, { user });
    });

    test('should return an additional followings when record is the current user', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({
        id: 'user_b',
        metaInfo: EmberObject.create({ facebookAccessToken: null }),
        followings: 'followings_foo',
      });
      const route = this.owner.lookup('route:profile');

      route.set('session', {
        model: { id: 'user_b' },
      });

      route.set('store', {
        query: sinon.stub().returns(stubPromise(true, new A([user]))),
      });

      // Act
      const result = await route.model({ user_id: 'user_b' });

      // Assert
      assert.deepEqual(result, { user, followings: 'followings_foo' });
    });

    test('should return an additional followSuggestions when record is the current user and has a facebook access token', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({
        id: 'user_b',
        metaInfo: EmberObject.create({ facebookAccessToken: '12345' }),
        followings: 'followings_foo',

        getUnfollowedFacebookFriends() {
          return stubPromise(true, 'followSuggestions_foo');
        },
      });
      const route = this.owner.lookup('route:profile');

      route.set('session', {
        model: { id: 'user_b' },
      });

      route.set('store', {
        query: sinon.stub().returns(stubPromise(true, new A([user]))),
      });

      // Act
      const result = await route.model({ user_id: 'user_b' });

      // Assert
      assert.deepEqual(result, {
        user,
        followings: 'followings_foo',
        followSuggestions: 'followSuggestions_foo',
      });
    });
  });
});
