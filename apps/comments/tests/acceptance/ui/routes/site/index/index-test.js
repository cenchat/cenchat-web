import { currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

import { setupApplicationTestState } from '@cenchat/core/test-support';

module('Acceptance | site/index', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(async function () {
    await setupApplicationTestState(this);
  });

  test('should create page and redirect to it when page does not exist', async (assert) => {
    assert.expect(1);

    // Act
    await visit('/sites/site_a?slug=foobar');

    // Assert
    assert.notEqual(currentURL(), '/sites/site_a?slug=foobar');
  });
});
