import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/pages/page/account/-components/route-content/account-upgrade', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should show <EmailLinkAuth />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'email-link-auth');

    // Act
    await render(hbs`{{sites/site/pages/page/account/-components/route-content/account-upgrade}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      firebase: 'instance',
      router: 'instance',
      session: 'instance',
      redirectUrl: 'string',
    });
  });
});
