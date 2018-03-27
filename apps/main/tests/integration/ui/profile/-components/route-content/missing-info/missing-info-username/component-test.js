import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

module('Integration | Component | profile/-components/route-content/missing-info/missing info username', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('onUsernameSubmit', () => false);
  });

  test('should fire an external action when submitting form', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onUsernameSubmit');

    await render(hbs`
      {{profile/-components/route-content/missing-info/missing-info-username
          --onUsernameSubmit=(action onUsernameSubmit)}}
    `);
    await fillIn(
      '[data-test-missing-info-username="field"] input',
      'Foo',
    );

    // Act
    await click('[data-test-missing-info-username="save-button"]');

    // Assert
    assert.ok(spy.calledWith('Foo'));
  });
});
