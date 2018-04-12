import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent, stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | profile/-components/route-content/follow-suggestion-collection', (hooks) => {
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

  test('should show <UserCollection />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'user-collection');

    // Act
    await render(hbs`{{profile/-components/route-content/follow-suggestion-collection --user=user}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, { users: 'array' });
  });

  test('should show empty state when there are no follow suggestions :(', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('user.getUnfollowedFacebookFriends', sinon.stub().returns(stubPromise(true, [])));

    // Act
    await render(hbs`{{profile/-components/route-content/follow-suggestion-collection --user=user}}`);

    // Assert
    assert.dom('[data-test-follow-suggestion-collection="empty-state"]').exists();
  });
});
