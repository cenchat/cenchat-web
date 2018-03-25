import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | profile/-components/route-content/following collection', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const user = this.get('session.model');

    this.set('user', user);
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show <UserCollection />', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'user-collection');

    // Act
    await render(hbs`{{profile/-components/route-content/following-collection --user=user}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      users: 'instance',
      type: 'string',
    });
  });

  test('should show empty state when there are no followings :(', async function(assert) {
    assert.expect(1);

    // Arrange
    this.set('user', {
      followings: Promise.resolve([]),
    });

    // Act
    await render(hbs`{{profile/-components/route-content/following-collection --user=user}}`);

    // Assert
    assert.dom('[data-test-following-collection="empty-state"]').exists();
  });
});
