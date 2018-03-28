import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent, stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | profile/follow-suggestions/-components/route-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const userB = run(async () => this.get('store').findRecord('user', 'user_b'));
    const currentUser = this.get('session.model');

    currentUser.set(
      'getUnfollowedFacebookFriends',
      sinon.stub().returns(stubPromise(true, [userB])),
    );

    this.set('user', currentUser);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show <InfiniteContent />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'infinite-content');

    // Act
    await render(hbs`
      {{profile/follow-suggestions/-components/route-content --user=user}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      query: 'array',
      selector: 'string',
      onLoadMoreRecords: 'function',
    });
  });

  test('should show <UserCollection />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'user-collection');

    // Act
    await render(hbs`
      {{profile/follow-suggestions/-components/route-content --user=user}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      users: 'array',
      type: 'string',
    });
  });
});
