import { module, test } from 'qunit';
import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState, spyComponent } from '@cenchat/core/test-support';

module('Integration | Component | docs/installation/-components/main-content', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should show <MainContentBloggerGuide /> when platform is for Blogger', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('platform', { id: 'blogger' });

    const spy = spyComponent(this, 'docs/installation/-components/main-content/main-content-blogger-guide');

    // Act
    await render(hbs`
      {{docs/installation/-components/main-content --platform=platform}}
    `);

    // Assert
    assert.ok(spy.calledOnce);
  });

  test('should show <MainContentWordpressGuide /> when platform is for WordPress', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('platform', { id: 'wordpress' });

    const spy = spyComponent(this, 'docs/installation/-components/main-content/main-content-wordpress-guide');

    // Act
    await render(hbs`
      {{docs/installation/-components/main-content --platform=platform}}
    `);

    // Assert
    assert.ok(spy.calledOnce);
  });

  test('should show <MainContentUniversalGuide /> when platform is for Universal', async function (assert) {
    assert.expect(1);

    // Arrange
    this.set('platform', { id: 'universal' });

    const spy = spyComponent(this, 'docs/installation/-components/main-content/main-content-universal-guide');

    // Act
    await render(hbs`
      {{docs/installation/-components/main-content --platform=platform}}
    `);

    // Assert
    assert.ok(spy.calledOnce);
  });
});
