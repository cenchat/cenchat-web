import { module, test } from 'qunit';
import { click, fillIn, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | sites/index/new', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should create site', async (assert) => {
    assert.expect(1);

    // Arrange
    await visit('/sites/new');

    // // Act
    await fillIn('[data-test-site-form="hostname-field"] input', 'foo.com');
    await fillIn('[data-test-site-form="name-field"] input', 'Foo');
    await click('[data-test-site-form="submit-button"]');

    // Assert
    assert.dom('[data-test-application="toast"]').hasText('Site added');
  });
});
