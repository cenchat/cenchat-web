/* eslint no-undef: off */

import { test } from 'qunit';
import moduleForAcceptance from 'main/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | sites/index/new');

test('should create site', async (assert) => {
  assert.expect(1);

  // Arrange
  await visit('/');
  await click('[data-test-application="sites-link"]');
  await click('[data-test-sites-index="new-link"]');

  // Act
  await fillIn('[data-test-site-form="hostname-field"] input', 'foo.com');
  await fillIn('[data-test-site-form="name-field"] input', 'Foo');
  await click('[data-test-site-form="submit-button"]');

  // Assert
  assert.dom('[data-test-application="toast"]').hasText('Site added');
});
