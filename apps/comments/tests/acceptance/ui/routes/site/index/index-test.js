/* eslint no-undef: off */

import { test } from 'qunit';
import moduleForAcceptance from 'comments/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | ui/routes/site/index');

test('should create page and redirect to it when page does not exist', async (assert) => {
  assert.expect(1);

  // Act
  await visit('/sites/site_a?slug=foobar');

  // Assert
  assert.notEqual(currentURL(), '/sites/site_a?slug=foobar');
});
