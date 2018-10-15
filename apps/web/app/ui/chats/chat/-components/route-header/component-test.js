import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import sinon from 'sinon';

module('Integration | Component | chats/chat/-components/route-header', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chat', await this.store.get('chat', 'site_c__page_a__user_a'));
    this.set('isPrivacyFormVisible', false);
    this.set('onPrivacyClick', () => {});
  });

  test('should use creator display name as heading when current user is not the creator', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.content.model.id', 'user_c');

    // Act
    await render(hbs`
      {{chats/chat/-components/route-header
        --session=(lookup "service:session")
        --chat=chat
        --isPrivacyFormVisible=isPrivacyFormVisible
        --onPrivacyClick=(action onPrivacyClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-route-header="heading"]').hasText('User A');
  });

  test('should use site display name as heading when current user is the creator', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chats/chat/-components/route-header
        --session=(lookup "service:session")
        --chat=chat
        --isPrivacyFormVisible=isPrivacyFormVisible
        --onPrivacyClick=(action onPrivacyClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-route-header="heading"]').hasText('Site C');
  });

  test('should mark privacy button as pressed when privacy form is visible', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('isPrivacyFormVisible', true);

    // Act
    await render(hbs`
      {{chats/chat/-components/route-header
        --session=(lookup "service:session")
        --chat=chat
        --isPrivacyFormVisible=isPrivacyFormVisible
        --onPrivacyClick=(action onPrivacyClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-route-header="privacy-button"]').hasAttribute('aria-pressed', 'true');
  });

  test('should not mark privacy button as pressed when privacy form is visible', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chats/chat/-components/route-header
        --session=(lookup "service:session")
        --chat=chat
        --isPrivacyFormVisible=isPrivacyFormVisible
        --onPrivacyClick=(action onPrivacyClick)
      }}
    `);

    // Assert
    assert.dom('[data-test-route-header="privacy-button"]').hasAttribute('aria-pressed', 'false');
  });

  test('should fire an external action when clicking privacy button', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onPrivacyClick');

    await render(hbs`
      {{chats/chat/-components/route-header
        --session=(lookup "service:session")
        --chat=chat
        --isPrivacyFormVisible=isPrivacyFormVisible
        --onPrivacyClick=(action onPrivacyClick)
      }}
    `);

    // Act
    await click('[data-test-route-header="privacy-button"]');

    // Assert
    assert.ok(spy.calledOnce);
  });
});
