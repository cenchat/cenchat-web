import { click, fillIn, render } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Integration | Component | sites/index/new/-components/site-form', (hooks) => {
  setupRenderingTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);

    this.set('onSiteFormSubmit', () => false);
  });

  test('should should enable submit button when hostname and name is valid', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{sites/index/new/-components/site-form --onSiteFormSubmit=(action onSiteFormSubmit)}}
    `);

    // Act
    await fillIn('[data-test-site-form="hostname-field"] input', 'foo.com');
    await fillIn('[data-test-site-form="name-field"] input', 'Foo');

    // Assert
    assert.dom('[data-test-site-form="submit-button"]').doesNotHaveAttribute('disabled');
  });

  test('should disable submit button when hostname is invalid', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{sites/index/new/-components/site-form --onSiteFormSubmit=(action onSiteFormSubmit)}}
    `);

    await fillIn('[data-test-site-form="name-field"] input', 'Foo');

    // Act
    await fillIn('[data-test-site-form="hostname-field"] input', 'foo.com/bar');

    // Assert
    assert.dom('[data-test-site-form="submit-button"]').hasAttribute('disabled');
  });

  test('should disable submit button when name is empty', async function (assert) {
    assert.expect(1);

    // Arrange
    await render(hbs`
      {{sites/index/new/-components/site-form --onSiteFormSubmit=(action onSiteFormSubmit)}}
    `);

    // Act
    await fillIn('[data-test-site-form="hostname-field"] input', 'foo.com');

    // Assert
    assert.dom('[data-test-site-form="submit-button"]').hasAttribute('disabled');
  });

  test('should fire an external action when clicking submit', async function (assert) {
    assert.expect(1);

    // Arrange
    const spy = sinon.spy(this, 'onSiteFormSubmit');

    await render(hbs`
      {{sites/index/new/-components/site-form --onSiteFormSubmit=(action onSiteFormSubmit)}}
    `);

    // Act
    await fillIn('[data-test-site-form="hostname-field"] input', 'foo.com');
    await fillIn('[data-test-site-form="name-field"] input', 'Foo');
    await fillIn('[data-test-site-form="theme-field"] select', 'dark');
    await click('[data-test-site-form="submit-button"]');

    // Assert
    assert.ok(spy.calledWith({
      displayName: 'Foo',
      hostname: 'foo.com',
      theme: 'dark',
    }));
  });
});
