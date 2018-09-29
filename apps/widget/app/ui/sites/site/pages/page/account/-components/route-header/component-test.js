import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/pages/page/account/-components/route-header', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should sign out when clicking sign out', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub(this.session, 'close');

    sinon.stub(this.router, 'transitionTo');

    await render(hbs`
      {{sites/site/pages/page/account/-components/route-header --router=(lookup "service:router") --session=(lookup "service:session")}}
    `);

    // Act
    await click('[data-test-route-header="sign-out-button"]');

    // Assert
    assert.ok(stub.calledOnce);
  });

  test('should transition to sites.site.pages.page when clicking sign out', async function (assert) {
    assert.expect(1);

    // Arrange
    const stub = sinon.stub(this.router, 'transitionTo');

    sinon.stub(this.session, 'close');

    await render(hbs`
      {{sites/site/pages/page/account/-components/route-header --router=(lookup "service:router") --session=(lookup "service:session")}}
    `);

    // Act
    await click('[data-test-route-header="sign-out-button"]');

    // Assert
    assert.ok(stub.calledWithExactly('sites.site.pages.page.my-chat'));
  });
});
