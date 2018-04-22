import { module, test } from 'qunit';
import { settled } from '@ember/test-helpers';
import { setupTest } from 'ember-qunit';
import EmberObject from '@ember/object';

import { promiseArray, promiseObject } from '@cenchat/core/utils/computed-promise';
import { stubPromise } from '@cenchat/core/test-support';

module('Unit | Util | computed-promise', (hooks) => {
  setupTest(hooks);

  module('function: promiseArray', () => {
    test('should return a computed promise array', async (assert) => {
      assert.expect(1);

      // Arrange
      const objClass = EmberObject.extend({
        foo: promiseArray(() => stubPromise(true, ['foobar'])),
      });
      const obj = objClass.create();

      // Act
      const prop = obj.get('foo');

      // Assert
      await settled();

      const result = prop.get('content');

      assert.deepEqual(result, ['foobar']);
    });
  });

  module('function: promiseObject', () => {
    test('should return a computed promise object', async (assert) => {
      assert.expect(1);

      // Arrange
      const objClass = EmberObject.extend({
        foo: promiseObject(() => stubPromise(true, { id: 'foobar' })),
      });
      const obj = objClass.create();

      // Act
      const prop = obj.get('foo');

      // Assert
      await settled();

      const result = prop.get('content');

      assert.deepEqual(result, { id: 'foobar' });
    });
  });
});
