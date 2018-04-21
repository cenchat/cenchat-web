import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';

module('Integration | Component | masonry-grid', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('items', [1, 2, 3, 4, 5]);
    this.set('numOfColumns', 3);
  });

  test('should group items by columns', async (assert) => {
    assert.expect(2);

    // Act
    await render(hbs`
      {{#masonry-grid --items=items as |item|}}
        <p data-test="item">{{item}}</p>
      {{/masonry-grid}}
    `);

    // Assert
    assert.dom('[data-test-masonry-grid="column"]:nth-child(1)').hasText('1 3 5');
    assert.dom('[data-test-masonry-grid="column"]:nth-child(2)').hasText('2 4');
  });
});
