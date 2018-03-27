import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'comments/tests/helpers/integration-test-setup';

module('Integration | Component | site/page/-components/route content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const page = await run(() => this.get('store').findRecord('page', 'site_a__page_a'));

    this.set('page', page);
    this.set('filterCommentsBy', 'all');
    this.set('onFilterCommentsClick', () => {});
  });

  hooks.afterEach(async function () {
    await setupAfterEach(this);
  });

  test('should show <ProfileBar /> when signed in', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'profile-bar');

    // Act
    await render(hbs`
      {{site/page/-components/route-content
          --session=session
          --page=page
          --filterCommentsBy=filterCommentsBy
          --onFilterCommentsClick=(action onFilterCommentsClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      page: 'instance',
      isCommentComposerVisible: 'boolean',
      headerText: 'string',
      onSendCommentSuccess: 'function',
    });
  });

  test('should hide <ProfileBar /> when signed out', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'profile-bar');

    this.set('session.model', null);

    // Act
    await render(hbs`
      {{site/page/-components/route-content
          --session=session
          --page=page
          --filterCommentsBy=filterCommentsBy
          --onFilterCommentsClick=(action onFilterCommentsClick)}}
    `);

    // Assert
    assert.ok(spy.notCalled);
  });

  test('should show <PageComments />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'site/page/-components/route-content/page-comments');

    // Act
    await render(hbs`
      {{site/page/-components/route-content
          --session=session
          --page=page
          --filterCommentsBy=filterCommentsBy
          --onFilterCommentsClick=(action onFilterCommentsClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      session: 'instance',
      comments: 'instance',
      prioritizedComments: 'array',
      filterCommentsBy: 'string',
      onFilterCommentsClick: 'function',
    });
  });
});
