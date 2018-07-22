import { render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | comment-item/comment-item-content/content-tagged-entity-list/tagged-entity-list-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    const user = await this.store.findRecord('user', 'user_a');

    this.set('entity', user);
  });

  test('should show user photo', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-tagged-entity-list/tagged-entity-list-item 
          --entity=entity}}
    `);

    // Assert
    assert.dom('[data-test-tagged-entity-list-item="photo"]').exists();
  });
});
