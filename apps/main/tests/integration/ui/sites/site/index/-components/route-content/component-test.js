import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { run } from '@ember/runloop';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { spyComponent, stubService } from '@cenchat/core/test-support';

import {
  setupBeforeEach,
  setupAfterEach,
} from 'main/tests/helpers/integration-test-setup';

module('Integration | Component | sites/site/index/-components/route content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupBeforeEach(this);

    const site = await run(() => this.get('store').findRecord('site', 'site_a'));

    this.set('router', stubService(this, 'router'));
    this.set('site', site);
    this.set('onVerifySiteClick', () => {});
  });

  hooks.afterEach(function () {
    setupAfterEach(this);
  });

  test('should show <TopBar />', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/index/-components/route-content/top-bar');

    // Act
    await render(hbs`
      {{sites/site/index/-components/route-content
          --router=router
          --session=session
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, { site: 'instance', session: 'instance' });
  });

  test('should show <PageCollection /> when site is verified', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = spyComponent(this, 'sites/site/index/-components/route-content/page-collection');

    // Act
    await render(hbs`
      {{sites/site/index/-components/route-content
          --router=router
          --session=session
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      router: 'instance',
      pages: 'instance',
    });
  });

  test('should show <SetupGuide /> when site is not verified', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('site.isVerified', false);

    const spy = spyComponent(this, 'sites/site/index/-components/route-content/setup-guide');

    // Act
    await render(hbs`
      {{sites/site/index/-components/route-content
          --router=router
          --session=session
          --site=site
          --onVerifySiteClick=(action onVerifySiteClick)}}
    `);

    // Assert
    assert.deepEqual(spy.componentArgsType, {
      site: 'instance',
      onVerifySiteClick: 'function',
    });
  });
});
