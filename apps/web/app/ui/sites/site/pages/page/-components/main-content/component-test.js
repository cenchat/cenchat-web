import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/site/pages/page/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('page', await this.store.findRecord('page', 'site_a__page_a'));
    this.set('onSavePageClick', () => {});
  });

  test('should disable save button when slug is empty', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{sites/site/pages/page/-components/main-content
          --page=page
          --onSavePageClick=(action onSavePageClick)}}
    `);

    // Assert
    assert.dom('[data-test-main-content="save-button"]').isDisabled();
  });


  test('should disable save button when URL does not contain site hostname', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{sites/site/pages/page/-components/main-content
          --page=page
          --onSavePageClick=(action onSavePageClick)}}
    `);

    // Act
    await fillIn('[data-test-main-content="url-field"] input', 'https://google.com/foo/bar');

    // Assert
    assert.dom('[data-test-main-content="save-button"]').isDisabled();
  });

  test('should fire an external action when clicking save', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSavePageClick');

    await render(hbs`
      {{sites/site/pages/page/-components/main-content
          --page=page
          --onSavePageClick=(action onSavePageClick)}}
    `);

    // Act
    await fillIn('[data-test-main-content="url-field"] input', 'https://site-a.com/foo/bar');
    await click('[data-test-main-content="save-button"]');

    // Assert
    assert.ok(spy.calledWith('%2Ffoo%2Fbar'));
  });
});
