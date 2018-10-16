import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Integration | Component | chats/chat/-components/route-content/privacy-form', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chat', await this.store.get('chat', 'site_c__page_a__user_a'));
    this.set('onPrivacyFormSubmit', () => false);
  });

  test('should should enable submit button when publicized title is valid', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{chats/chat/-components/route-content/privacy-form
        --chat=chat
        --onPrivacyFormSubmit=(action onPrivacyFormSubmit)
      }}
    `);

    // Act
    await fillIn('[data-test-privacy-form="publicized-title-field"] input', 'Foo Bar');

    // Assert
    assert.dom('[data-test-privacy-form="submit-button"]').doesNotHaveAttribute('disabled');
  });

  test('should fire an external action when clicking submit', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onPrivacyFormSubmit');

    await render(hbs`
      {{chats/chat/-components/route-content/privacy-form
        --chat=chat
        --onPrivacyFormSubmit=(action onPrivacyFormSubmit)
      }}
    `);

    // Act
    await fillIn('[data-test-privacy-form="publicized-title-field"] input', 'Foo');
    await fillIn('[data-test-privacy-form="visible-to-field"] select', 'false');
    await click('[data-test-privacy-form="submit-button"]');

    // Assert
    assert.ok(spy.calledWith({ isPublicized: false, publicizedTitle: 'Foo' }));
  });
});
