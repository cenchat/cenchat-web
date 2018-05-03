import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/index/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('site', await this.store.findRecord('site', 'site_a'));
    this.set('onVerifySiteClick', () => {});
  });

  test('should show yield when site is verified', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{#sites/site/index/-components/main-content
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
        <div data-test="yield"></div>
      {{/sites/site/index/-components/main-content}}
    `);

    assert.dom('[data-test="yield"]').exists();
  });

  test('should hide yield when site is not verified', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.isVerified', false);

    // Act
    await render(hbs`
      {{#sites/site/index/-components/main-content
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
        <div data-test="yield"></div>
      {{/sites/site/index/-components/main-content}}
    `);

    assert.dom('[data-test="yield"]').doesNotExist();
  });

  test('should show <MainContentVerifySite /> when site is not verified', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.isVerified', false);

    const spy = spyComponent(this, 'sites/site/index/-components/main-content/main-content-verify-site');

    // Act
    await render(hbs`
      {{#sites/site/index/-components/main-content
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
        <div data-test="yield"></div>
      {{/sites/site/index/-components/main-content}}
    `);

    assert.deepEqual(spy.componentArgsType, {
      site: 'instance',
      onVerifySiteClick: 'function',
    });
  });

  test('should hide <MainContentVerifySite /> when site is verified', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/index/-components/main-content/main-content-verify-site');

    // Act
    await render(hbs`
      {{#sites/site/index/-components/main-content
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
        <div data-test="yield"></div>
      {{/sites/site/index/-components/main-content}}
    `);

    assert.ok(spy.notCalled);
  });
});
