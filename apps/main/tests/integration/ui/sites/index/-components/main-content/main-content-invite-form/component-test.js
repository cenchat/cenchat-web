import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/index/-components/main-content/main-content-invite-form', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onInviteRequestFormSubmit', () => false);
  });

  test('should fire an external action when clicking submit', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onInviteRequestFormSubmit');

    await render(hbs`
      {{sites/index/-components/main-content/main-content-invite-form
          --onInviteRequestFormSubmit=(action onInviteRequestFormSubmit)}}
    `);

    // Act
    await fillIn(
      '[data-test-main-content-invite-form="website-field"] input',
      'https://foobar.com',
    );
    await fillIn('[data-test-main-content-invite-form="monthly-views-field"] select', '1m-5m');
    await click('[data-test-main-content-invite-form="submit-button"]');

    // Assert
    assert.ok(spy.calledWith({ website: 'https://foobar.com', monthlyViews: '1m-5m' }));
  });
});
