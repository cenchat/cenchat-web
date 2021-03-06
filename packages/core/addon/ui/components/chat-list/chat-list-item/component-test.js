import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';

module('Integration | Component | chat-list/chat-list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('chat', await this.store.get('chat', 'site_c__page_a__user_a'));
    this.set('isPageVisible', false);
    this.set('chatRouteName', 'foo.bar');
  });

  test('should show chat', async function (assert) {
    assert.expect(4);

    // Act
    await render(hbs`
      {{chat-list/chat-list-item
        --session=(lookup 'service:session')
        --chat=chat
        --isPageVisible=isPageVisible
        --chatRouteName=chatRouteName
      }}
    `);

    // Assert
    assert.dom('[data-test-chat-list-item="avatar"]').hasAttribute('src', 'site_c.jpg');
    assert.dom('[data-test-chat-list-item="title"]').hasText('Site C');
    assert.dom('[data-test-chat-list-item="description"]').hasText('User C: Message C');
    assert.dom('[data-test-chat-list-item="timestamp"]').exists();
  });

  test('should mark chat as unread when current user has not read it yet', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.content.model.metaInfo.unreadChats', ['site_c__page_a__user_a']);

    // Act
    await render(hbs`
      {{chat-list/chat-list-item
        --session=(lookup 'service:session')
        --chat=chat
        --isPageVisible=isPageVisible
        --chatRouteName=chatRouteName
      }}
    `);

    // Assert
    assert.dom('[data-test-chat-list-item="site_c__page_a__user_a"]').hasClass('chat-list-item--unread');
  });

  test('should mark chat as read when current user has read it', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-list/chat-list-item
        --session=(lookup 'service:session')
        --chat=chat
        --isPageVisible=isPageVisible
        --chatRouteName=chatRouteName
      }}
    `);

    // Assert
    assert.dom('[data-test-chat-list-item="site_c__page_a__user_a"]').hasNoClass('chat-list-item--unread');
  });

  test('should use creator as avatar when current user is not the creator', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.content.model.id', 'user_c');

    // Act
    await render(hbs`
      {{chat-list/chat-list-item
        --session=(lookup 'service:session')
        --chat=chat
        --isPageVisible=isPageVisible
        --chatRouteName=chatRouteName
      }}
    `);

    // Assert
    assert.dom('[data-test-chat-list-item="avatar"]').hasAttribute('src', 'user_a.jpg');
  });

  test('should use creator display name as title when current user is not the creator', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('session.content.model.id', 'user_c');

    // Act
    await render(hbs`
      {{chat-list/chat-list-item
        --session=(lookup 'service:session')
        --chat=chat
        --isPageVisible=isPageVisible
        --chatRouteName=chatRouteName
      }}
    `);

    // Assert
    assert.dom('[data-test-chat-list-item="title"]').hasText('User A');
  });
});
