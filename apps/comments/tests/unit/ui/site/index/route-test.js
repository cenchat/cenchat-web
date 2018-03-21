import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { A } from '@ember/array';
import EmberObject from '@ember/object';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | site/index', function(hooks) {
  setupTest(hooks);

  module('hook: beforeModel', function() {
    test('should redirect to site.page with the page ID when querying for page is successful', async function(assert) {
      assert.expect(2);

      // Arrange
      const page = EmberObject.create({ id: 'site_a__page_a' });
      const queryStub = sinon.stub().returns(
        stubPromise(true, (new A([page]))),
      );
      const site = EmberObject.create({ id: 'site_a' });
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:site/index');

      route.set('store', { query: queryStub });
      route.set('modelFor', sinon.stub().returns(site));
      route.set('paramsFor', sinon.stub().returns({ slug: '/slug' }));
      route.set('transitionTo', transitionToStub);

      // Act
      await route.beforeModel();

      // Assert
      assert.ok(queryStub.calledWith('page'));
      assert.ok(transitionToStub.calledWithExactly('site.page', 'page_a'));
    });

    test('should redirect to site.page with the new page ID when creating a new page succeeds', async function(assert) {
      assert.expect(3);

      // Arrange
      const page = EmberObject.create({
        id: 'site_a__page_a',

        save() {
          return stubPromise(true, this);
        },
      });
      const createRecordStub = sinon.stub().returns(page);
      const saveSpy = sinon.spy(page, 'save');
      const queryStub = sinon.stub().returns(stubPromise(true, (new A([]))));
      const transitionToStub = sinon.stub();
      const site = EmberObject.create({ id: 'site_a' });
      const route = this.owner.lookup('route:site/index');

      route.set('firebase', {
        firestore: sinon.stub().returns({
          collection: sinon.stub().returns({
            doc: sinon.stub().returns({ id: 'page_a' }),
          }),
        }),
      });
      route.set('store', { createRecord: createRecordStub, query: queryStub });
      route.set('modelFor', sinon.stub().returns(site));
      route.set('paramsFor', sinon.stub().returns({ slug: '/slug' }));
      route.set('transitionTo', transitionToStub);

      // Act
      await route.beforeModel();

      // Assert
      assert.ok(createRecordStub.calledWithExactly('page', {
        site,
        id: 'site_a__page_a',
        slug: '%2Fslug',
      }));
      assert.ok(saveSpy.calledWithExactly({
        adapterOptions: { onServer: true },
      }));
      assert.ok(transitionToStub.calledWithExactly('site.page', 'page_a'));
    });

    test('should not redirect to site.page when slug is unavailable', async function(assert) {
      assert.expect(2);

      // Arrange
      const page = EmberObject.create({ id: 'site_a__page_a' });
      const queryStub = sinon.stub().returns(
        stubPromise(true, (new A([page]))),
      );
      const site = EmberObject.create({ site: 'site_a' });
      const transitionToStub = sinon.stub();
      const route = this.owner.lookup('route:site/index');

      route.set('store', { query: queryStub });
      route.set('modelFor', sinon.stub().returns(site));
      route.set('paramsFor', sinon.stub().returns({ slug: null }));
      route.set('transitionTo', transitionToStub);

      // Act
      await route.beforeModel();

      // Assert
      assert.ok(queryStub.notCalled);
      assert.ok(transitionToStub.notCalled);
    });
  });
});
