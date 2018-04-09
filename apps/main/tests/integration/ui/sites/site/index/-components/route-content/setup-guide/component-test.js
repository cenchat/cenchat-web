import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import sinon from 'sinon';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | sites/site/index/-components/route-content/setup guide', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const site = await run(() => this.get('store').findRecord('site', 'site_a'));

    this.set('site', site);
    this.set('onVerifySiteClick', () => {});
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should use site ID for the code snippet', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/index/-components/route-content/setup-guide
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
    `);

    // Assert
    assert.dom('[data-test-setup-guide="code-snippet"]').includesText('site_a');
  });

  test('should fire an external action when clicking verify', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onVerifySiteClick');

    await render(hbs`
      {{sites/site/index/-components/route-content/setup-guide
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
    `);

    // Act
    await click('[data-test-setup-guide="verify-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
