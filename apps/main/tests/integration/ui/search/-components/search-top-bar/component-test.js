import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | search/-components/search-top-bar', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('query', null);
    this.set('onSearchInput', () => {});
  });

  test('should fire an external action when typing in the search field', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSearchInput');

    await render(hbs`
      {{search/-components/search-top-bar --query=query --onSearchInput=(action onSearchInput)}}
    `);

    // Act
    await fillIn('[data-test-search-top-bar="field"] input', 'foo');

    // Assert
    assert.ok(spy.calledWith('foo'));
  });
});
