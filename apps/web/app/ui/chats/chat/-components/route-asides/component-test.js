import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/utils/test-support';

module('Integration | Component | chats/chat/-components/route-asides', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chat', await this.store.get('chat', 'site_c__page_a__user_a'));
    this.set('isPrivacyFormVisible', false);
    this.set('onPrivacyFormSubmit', () => {});
  });

  test('should show privacy form when isPrivacyFormVisible is true', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chats/chat/-components/route-asides/privacy-form');

    this.set('isPrivacyFormVisible', true);

    // Act
    await render(hbs`
      {{chats/chat/-components/route-asides
        --chat=chat
        --isPrivacyFormVisible=isPrivacyFormVisible
        --onPrivacyFormSubmit=(action onPrivacyFormSubmit)
      }}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { chat: 'object', onPrivacyFormSubmit: 'function' });
  });

  test('should hide privacy form when isPrivacyFormVisible is false', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chats/chat/-components/route-asides/privacy-form');

    // Act
    await render(hbs`
      {{chats/chat/-components/route-asides
        --chat=chat
        --isPrivacyFormVisible=isPrivacyFormVisible
        --onPrivacyFormSubmit=(action onPrivacyFormSubmit)
      }}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show page link', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chats/chat/-components/route-asides
        --chat=chat
        --isPrivacyFormVisible=isPrivacyFormVisible
        --onPrivacyFormSubmit=(action onPrivacyFormSubmit)
      }}
    `);

    // Assert
    assert.dom('[data-test-route-asides="page-link"]').hasText('Page A Title');
  });

  test('should hide page link when clicking hide page link', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{chats/chat/-components/route-asides
        --chat=chat
        --isPrivacyFormVisible=isPrivacyFormVisible
        --onPrivacyFormSubmit=(action onPrivacyFormSubmit)
      }}
    `);

    // Act
    await click('[data-test-route-asides="hide-page-link-button"]');

    // Assert
    assert.dom('[data-test-route-asides="page-link"]').doesNotExist();
  });
});
