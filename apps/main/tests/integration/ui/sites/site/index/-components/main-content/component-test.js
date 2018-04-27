import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | sites/site/index/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('router', this.router);
    this.set('site', await this.store.findRecord('site', 'site_a'));
    this.set('onVerifySiteClick', () => {});
  });

  test('should show yield', async (assert) => {
    assert.expect(1);

    // Act
    await render(hbs`
      {{#sites/site/index/-components/main-content
          --router=router
          --session=session
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
        <div data-test="yield"></div>
      {{/sites/site/index/-components/main-content}}
    `);

    // Assert
    assert.dom('[data-test="yield"]').exists();
  });

  test('should show <MainContentPageCollection /> when site is verified', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/index/-components/main-content/main-content-page-collection');

    // Act
    await render(hbs`
      {{sites/site/index/-components/main-content
          --router=router
          --session=session
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { router: 'instance', pages: 'instance' });
  });

  test('should show <MainContentSetupGuide /> when site is not verified', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.isVerified', false);

    const spy = spyComponent(this, 'sites/site/index/-components/main-content/main-content-setup-guide');

    // Act
    await render(hbs`
      {{sites/site/index/-components/main-content
          --router=router
          --session=session
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { site: 'instance', onVerifySiteClick: 'function' });
  });
});
