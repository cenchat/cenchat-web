import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | search/-components/search-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const users = await run(() => this.get('store').findAll('user'));

    this.set('users', users);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show <UserCollection />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'user-collection');

    // Act
    await render(hbs`{{search/-components/search-content --users=users}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, { users: 'instance' });
  });
});
