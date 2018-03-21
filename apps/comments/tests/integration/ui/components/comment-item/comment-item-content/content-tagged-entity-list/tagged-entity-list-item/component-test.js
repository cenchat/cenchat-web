import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'comments/tests/helpers/integration-test-setup';

module('Integration | Component | comment-item/comment-item-content/content-tagged-entity-list/tagged entity list item', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    const user = await run(() => {
      return this.get('store').findRecord('user', 'user_a');
    });

    this.set('entity', user);
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should show user photo', async function(assert) {
    assert.expect(3);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-tagged-entity-list/tagged-entity-list-item 
          --entity=entity}}
    `);

    // Assert
    assert.dom('[data-test-tagged-entity-list-item="photo"]').hasAttribute(
      'src',
      'user_a.jpg',
    );
    assert.dom('[data-test-tagged-entity-list-item="photo"]').hasAttribute(
      'title',
      'User A',
    );
    assert.dom('[data-test-tagged-entity-list-item="photo"]').hasAttribute(
      'alt',
      'User A',
    );
  });
});
