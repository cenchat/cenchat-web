import { module, test } from 'qunit';

import fixedEncodeUriComponent from 'widget/utils/fixed-encode-uri-component';

module('Unit | Utility | fixed-encode-uri-component', () => {
  module('function: fixedEncodeUriComponent', function () {
    test('should encode URI component', function (assert) {
      assert.expect(1);

      // Act
      const result = fixedEncodeUriComponent('foo.bar$yeah');

      // Assert
      assert.equal(result, 'foo%2ebar%24yeah');
    });
  });
});
