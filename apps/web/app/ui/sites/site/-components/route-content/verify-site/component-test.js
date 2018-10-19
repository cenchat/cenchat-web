import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site-components/route-content/verify-site', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('site', await this.store.get('site', 'site_a'));
    this.set('onVerifySiteClick', () => false);
  });

  test('should fire an external action when clicking verify', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onVerifySiteClick');

    await render(hbs`
      {{sites/site/-components/route-content/verify-site
        --site=site
        --onVerifySiteClick=(action onVerifySiteClick)
      }}
    `);

    // Act
    await click('[data-test-verify-site="verify-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
