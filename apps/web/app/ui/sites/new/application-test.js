import {
  click,
  currentURL,
  fillIn,
  visit,
} from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/firebase/test-support';

module('Acceptance | sites/new', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should create site', async function (assert) {
    assert.expect(1);

    // Arrange
    await visit('/sites/new');

    // Act
    await fillIn('[data-test-site-form="brand-color-field"] input', '#000');
    await fillIn('[data-test-site-form="name-field"] input', 'Foo');
    await fillIn('[data-test-site-form="hostname-field"] input', 'foo.com');
    await click('[data-test-site-form="submit-button"]');

    // Assert
    assert.notEqual(currentURL(), '/sites/new');
  });
});
