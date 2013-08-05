'use strict';

describe('surgir.search#filters', function() {
  beforeEach(module('surgir.search'));

  describe('replace', function() {
    it('should replace all semi-colons by a dash',
      inject(function(replaceFilter) {
        expect(replaceFilter('John;Paul;Smith')).toEqual('John - Paul - Smith');
    }));
  });

  describe('lfYear', function() {
    it('should format the year from LibraryFind custom timestamp',
    inject(function(lfYearFilter) {
      expect(lfYearFilter('19990000')).toEqual('1999');
    }));
  });

});