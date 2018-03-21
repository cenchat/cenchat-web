import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | sites/index/-components/route-content/invite form', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function() {
    await setupBeforeEach(this);

    this.set('onInviteRequestFormSubmit', () => {
      // Prevents redirect when submitting form
      return false;
    });
  });

  hooks.afterEach(async function() {
    await setupAfterEach(this);
  });

  test('should fire an external action when clicking submit', async function(assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onInviteRequestFormSubmit');

    await render(hbs`
      {{sites/index/-components/route-content/invite-form
          --onInviteRequestFormSubmit=(action onInviteRequestFormSubmit)}}
    `);

    // Act
    await fillIn(
      '[data-test-invite-form="website-field"] input',
      'https://foobar.com',
    );
    await fillIn(
      '[data-test-invite-form="monthly-views-field"] select',
      '1m-5m',
    );
    await click('[data-test-invite-form="submit-button"]');

    // Assert
    assert.ok(spy.calledWith({
      website: 'https://foobar.com',
      monthlyViews: '1m-5m',
    }));
  });
});
