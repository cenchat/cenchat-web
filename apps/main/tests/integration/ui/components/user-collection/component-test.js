import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | user-collection', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const users = await run(() => this.store.query('user', {
      filter(reference) {
        return reference.limit(2);
      },
    }));

    this.set('users', users);
    this.set('type', 'follow');
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show <UserCollectionItem /> for each user', async function (assert) {
    assert.expect(2);

    // Arrange
    const spy = spyComponent(this, 'user-collection/user-collection-item');

    // Act
    await render(hbs`{{user-collection --users=users --type=type}}`);

    // Assert
    assert.ok(spy.calledTwice);
    assert.deepEqual(spy.componentArgsType, {
      user: 'instance',
      type: 'string',
    });
  });
});
