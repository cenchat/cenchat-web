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
    assert.expect(3);

    // Act
    await render(hbs`
      {{comment-item/comment-item-content/content-tagged-entity-list/tagged-entity-list-item 
          --entity=entity}}
    `);

    // Assert
    assert.dom('[data-test-tagged-entity-list-item="photo"]').hasAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Fothers%2Fno_photo_1.png?alt=media&token=550d7675-a2fc-4148-8a02-dd77ac3ea114');
    assert.dom('[data-test-tagged-entity-list-item="photo"]').hasAttribute('title', 'User A');
    assert.dom('[data-test-tagged-entity-list-item="photo"]').hasAttribute('alt', 'User A');
  });
});
