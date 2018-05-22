import { module, test } from 'qunit';

import fixedEncodeUriComponent from 'comments/utils/fixed-encode-uri-component';

module('Unit | Utility | fixed-encode-uri-component', () => {
  module('fixedEncodeUriComponent', () => {
    test('should encode URI component', (assert) => {
      assert.expect(1);

      // Act
      const result = fixedEncodeUriComponent('foo.bar$yeah');

      // Assert
      assert.equal(result, 'foo%2ebar%24yeah');
    });
  });
});
