import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | notifications/-components/route content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const user = await this.get('session.model');

    this.set('user', user);
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show <NotificationList />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'notification-list');

    // Act
    await render(hbs`{{notifications/-components/route-content --user=user}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, { notifications: 'instance' });
  });
});
