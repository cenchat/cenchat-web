import { click, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | docs/-components/installation-item', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('item', {
      id: 'universal',
      name: 'Universal',
      description: 'For platforms not listed',
      logoUrl: 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fhtml5%2Fhtml5-logo_512.png?alt=media&token=0a329fa8-7691-41a0-b764-6ea6845443ea',
    });
    this.set('onInstallationItemClick', () => {});
    this.set('onInstallationItemKeydown', () => {});
  });

  test('should show item', async function (assert) {
    assert.expect(4);

    // Act
    await render(hbs`
      {{docs/-components/installation-item
          --item=item
          --onInstallationItemClick=(action onInstallationItemClick)
          --onInstallationItemKeydown=(action onInstallationItemKeydown)}}
    `);

    // Assert
    assert.dom('[data-test-installation-item="name"]').hasText('Universal');
    assert.dom('[data-test-installation-item="description"]').hasText('For platforms not listed');
    assert.dom('[data-test-installation-item="logo"]').hasAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/cenchat-prod.appspot.com/o/assets%2Fimages%2Flogos%2Fhtml5%2Fhtml5-logo_512.png?alt=media&token=0a329fa8-7691-41a0-b764-6ea6845443ea');
    assert.dom('[data-test-installation-item="logo"]').hasAttribute('alt', 'Universal');
  });

  test('should fire an external action when clicking item', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onInstallationItemClick');

    await render(hbs`
      {{docs/-components/installation-item
          --item=item
          --onInstallationItemClick=(action onInstallationItemClick)
          --onInstallationItemKeydown=(action onInstallationItemKeydown)}}
    `);

    // Act
    await click('[data-test-installation-item="host"]');

    // Assert
    assert.ok(spy.calledWith('universal'));
  });
});
