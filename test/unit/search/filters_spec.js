'use strict';

describe('surgir.search#filters', function() {
  beforeEach(module('surgir.search'));

  describe('facetLabel', function() {
    it('should return a label for a facet value',
    inject(function(facetLabelFilter) {
      expect(facetLabelFilter(['John Doe', '3'])).toEqual('John Doe (3)');
    }));
  });

  describe('option', function() {
    it('should return a pluralized option label for a facet',
    inject(function(optionFilter) {
      expect(optionFilter(1)).toEqual('1 option');
      expect(optionFilter(2)).toEqual('2 options');
    }));
  });

});
