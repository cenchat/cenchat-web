import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/index/-components/main-content/main-content-verify-site', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('site', await this.store.findRecord('site', 'site_a'));
    this.set('onVerifySiteClick', () => {});
  });

  test('should use site ID for the code snippet', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{sites/site/index/-components/main-content/main-content-verify-site
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
    `);

    // Assert
    assert.dom('[data-test-main-content-verify-site="code-snippet"]').includesText('site_a');
  });

  test('should fire an external action when clicking verify', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onVerifySiteClick');

    await render(hbs`
      {{sites/site/index/-components/main-content/main-content-verify-site
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
    `);

    // Act
    await click('[data-test-main-content-verify-site="verify-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
