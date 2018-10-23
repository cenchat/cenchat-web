import { fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/roles/-components/route-content/search-form', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onSearchUserInput', () => {});
  });

  test('should fire an external action when inputting search field', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSearchUserInput');

    await render(hbs`
      {{sites/site/roles/-components/route-content/search-form
        --onSearchUserInput=(action onSearchUserInput)
      }}
    `);

    // Act
    await fillIn('[data-test-search-form="search-field"] input', 'user_');

    // Assert
    assert.ok(spy.calledWith('user_'));
  });
});
