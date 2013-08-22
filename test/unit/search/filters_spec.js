'use strict';

describe('surgir.search#filters', function() {
  beforeEach(module('surgir.search'));

  describe('facetLabel', function() {
    it('should return a label for a facet value',
    inject(function(facetLabelFilter) {
      expect(facetLabelFilter(['John Doe', '3'])).toEqual('John Doe (3)');
    }));
  });

});
