import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { setupTestState } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Route | sites/site/pages/page/chats', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(async function () {
    await setupTestState(this);
  });

  test('should return chats as the model', async function (assert) {
    assert.expect(4);

    // Arrange
    const route = this.owner.lookup('route:sites/site/pages/page/chats');
    const modelForStub = sinon.stub(route, 'modelFor');

    modelForStub.withArgs('sites.site').returns({ admins: [] });
    modelForStub.withArgs('sites.site.pages.page').returns({ id: 'site_a__page_a' });
    sinon.stub(route, 'paramsFor').withArgs('sites.site.pages.page.chats').returns({
      chatLimit: null,
    });

    route.set('routeName', 'sites.site.pages.page.chats');

    // Act
    const result = await route.model({ isPublicized: true, chatLimit: null });

    // Assert
    assert.equal(result.length, 3);
    assert.equal(result[0].id, 'site_a__page_a__user_b');
    assert.equal(result[1].id, 'site_a__page_a__user_d');
    assert.equal(result[2].id, 'site_a__page_a__user_e');
  });
});
