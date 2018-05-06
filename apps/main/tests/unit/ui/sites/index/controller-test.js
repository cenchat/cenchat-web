import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { stubPromise } from '@cenchat/core/test-support';
import sinon from 'sinon';

module('Unit | Controller | sites/index', (hooks) => {
  setupTest(hooks);

  module('function: handleInviteRequestFormSubmit', () => {
    test('should save beta tester invite request', async function (assert) {
      assert.expect(2);

      // Arrange
      const model = { id: 'user_a', betaTester: {} };
      const saveStub = sinon.stub().returns(stubPromise(true));
      const createRecordStub = sinon.stub().returns({ save: saveStub });
      const controller = this.owner.lookup('controller:sites/index');

      controller.set('store', { createRecord: createRecordStub });
      controller.set('model', model);

      // Act
      await controller.handleInviteRequestFormSubmit({
        monthlyViews: 'lt-1m',
        website: 'http://foobar.com',
      }, { preventDefault: sinon.stub() });

      // Assert
      assert.ok(createRecordStub.calledWithExactly(
        'beta-tester',
        {
          id: 'user_a',
          monthlyViews: 'lt-1m',
          status: 'pending',
          website: 'http://foobar.com',
        },
      ));
      assert.ok(saveStub.calledOnce);
    });
  });
});
