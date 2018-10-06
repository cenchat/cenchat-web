import { click, fillIn, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/firebase/test-support';

module('Acceptance | profile/edit', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should update profile', async function (assert) {
    assert.expect(3);

    // Arrange
    await visit('/profile/edit');

    // Act
    await fillIn('[data-test-route-content="display-name-field"] input', 'Display Name');
    await fillIn('[data-test-route-content="short-bio-field"] input', 'Short Bio');
    await fillIn('[data-test-route-content="username-field"] input', 'Username');
    await click('[data-test-route-content="submit-button"]');

    // Assert
    assert.dom('[data-test-route-header="name"]').hasText('Display Name');
    assert.dom('[data-test-user-info="short-bio"]').hasText('Short Bio');
    assert.dom('[data-test-user-info="username"]').hasText('@Username');
  });
});
