import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | profile', (hooks) => {
  setupTest(hooks);

  module('hook: model', () => {
    test('should return record that matches a username alongside its followings and following suggestions', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({
        metaInfo: EmberObject.create({ facebookAccessToken: 'foobar' }),
        followings: 'followings_foo',

        getUnfollowedFacebookFriends() {
          return stubPromise(true, 'followSuggestions_foo');
        },
      });
      const route = this.owner.lookup('route:profile');

      route.set('store', {
        query: sinon.stub().returns(stubPromise(true, new A([user]))),
      });

      // Act
      const result = await route.model({ user_id: 'user_b' });

      // Assert
      assert.deepEqual(result, {
        user,
        followings: 'followings_foo',
        followingSuggestions: 'followSuggestions_foo',
      });
    });

    test('should return record that matches an ID alongside its followings and following suggestions if querying for a username returns nothing', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({
        metaInfo: EmberObject.create({ facebookAccessToken: 'foobar' }),
        followings: 'followings_foo',

        getUnfollowedFacebookFriends() {
          return stubPromise(true, 'followSuggestions_foo');
        },
      });
      const route = this.owner.lookup('route:profile');

      route.set('store', {
        findRecord: sinon.stub().withArgs('user', 'user_a').returns(stubPromise(true, user)),
        query: sinon.stub().returns(stubPromise(true, new A([]))),
      });

      // Act
      const result = await route.model({ user_id: 'user_a' });

      // Assert
      assert.deepEqual(result, {
        user,
        followings: 'followings_foo',
        followingSuggestions: 'followSuggestions_foo',
      });
    });

    test('should return record that matches a username alongside its followings and an empty following suggestions if user has a facebook access token', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({
        metaInfo: EmberObject.create({ facebookAccessToken: null }),
        followings: 'followings_foo',
      });
      const route = this.owner.lookup('route:profile');

      route.set('store', {
        query: sinon.stub().returns(stubPromise(true, new A([user]))),
      });

      // Act
      const result = await route.model({ user_id: 'user_b' });

      // Assert
      assert.deepEqual(result, { user, followings: 'followings_foo' });
    });

    test('should return record that matches an ID alongside its followings and following suggestions if querying for a username returns nothing and user has a facebook access token', async function (assert) {
      assert.expect(1);

      // Arrange
      const user = EmberObject.create({
        metaInfo: EmberObject.create({ facebookAccessToken: null }),
        followings: 'followings_foo',
      });
      const route = this.owner.lookup('route:profile');

      route.set('store', {
        findRecord: sinon.stub().withArgs('user', 'user_a').returns(stubPromise(true, user)),
        query: sinon.stub().returns(stubPromise(true, new A([]))),
      });

      // Act
      const result = await route.model({ user_id: 'user_a' });

      // Assert
      assert.deepEqual(result, {
        user,
        followings: 'followings_foo',
      });
    });
  });
});
