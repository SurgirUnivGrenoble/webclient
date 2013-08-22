'use strict';

describe('surgir.notice#filters', function() {
  beforeEach(module('surgir.notice'));

  describe('replace', function() {
    it('should replace all semi-colons by a dash',
      inject(function(replaceFilter) {
        expect(replaceFilter('John;Paul;Smith')).toEqual('John - Paul - Smith');
    }));

    it('should replace the "&apos;" special char by a true apostrophe',
      inject(function(replaceFilter) {
        expect(replaceFilter('l&apos;envie')).toEqual("l'envie");
    }));
  });

  describe('lfYear', function() {
    it('should format the year from LibraryFind custom timestamp',
    inject(function(lfYearFilter) {
      expect(lfYearFilter('19990000')).toEqual('1999');
    }));
  });

  describe('yearPublisher', function() {
    it('should format the publisher and the year when both are available',
    inject(function(yearPublisherFilter) {
      expect(yearPublisherFilter('Springer', '19990000')).
        toEqual('Springer, 1999');
    }));

    it('should only format the publisher when year is unavailable',
    inject(function(yearPublisherFilter) {
      expect(yearPublisherFilter('Springer', '')).toEqual('Springer');
    }));
  });

});
