import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/firebase/test-support';
import { spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | chat-content/chat-content-time-group-list/time-group-list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('group', {
      authors: [
        {
          id: 'user_a',
          displayName: 'User A',
          messages: [
            {
              createdOn: new Date('2017-01-01'),
              text: 'Message A',
            },
            {
              createdOn: new Date('2017-01-01'),
              text: 'Message B',
            },
          ],
          photoUrl: 'user_a.jpg',
        },
        {
          id: 'user_b',
          displayName: 'User B',
          messages: [
            {
              createdOn: new Date('2017-01-01'),
              text: 'Message C',
            },
            {
              createdOn: new Date('2017-01-01'),
              text: 'Message D',
            },
          ],
          photoUrl: 'user_b.jpg',
        },
      ],
      timestamp: new Date('2017-01-01'),
    });
  });

  test('should show time heading', async function (assert) {
    assert.expect(1);

    // Act
    await render(hbs`
      {{chat-content/chat-content-time-group-list/time-group-list-item --group=group}}
    `);

    // Assert
    assert.dom('[data-test-time-group-list-item="heading"]').hasText('Jan 01 2017');
  });

  test('should show <ItemAuthorList />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'chat-content/chat-content-time-group-list/time-group-list-item/item-author-list');

    // Act
    await render(hbs`
      {{chat-content/chat-content-time-group-list/time-group-list-item --group=group}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { authors: 'array' });
  });
});
