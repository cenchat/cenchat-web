import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | profile/followings/-components/route-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const followings = await this.get('session.model.followings');

    this.set('followings', followings);
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
      {{profile/followings/-components/route-content --followings=followings}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { query: 'instance', selector: 'string' });
  });

  test('should show <UserCollection />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'user-collection');

    // Act
    await render(hbs`
      {{profile/followings/-components/route-content --followings=followings}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { users: 'instance' });
  });
});
