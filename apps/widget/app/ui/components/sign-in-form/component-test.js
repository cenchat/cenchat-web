import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sign-in-form', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should render <EmailLinkAuth />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'email-link-auth');

    this.set('page', await this.store.get('page', 'site_a__page_a'));

    // Act
    await render(hbs`{{sign-in-form --page=page --isAnonymousAllowed=true}}`);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      firebase: 'instance',
      router: 'instance',
      session: 'instance',
      redirectUrl: 'string',
      isAnonymousAllowed: 'boolean',
    });
  });
});
