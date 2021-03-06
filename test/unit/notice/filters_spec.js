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

    it('should replace the wrongly encoded "\u00c3\u00a9" by é',
      inject(function(replaceFilter) {
        expect(replaceFilter('conf\u00c3\u00a9rences')).toEqual('conférences');
    }));
  });

  describe('iconize', function() {
    it('should return an icon name corresponding to the given material type',
      inject(function(iconizeFilter) {
        expect(iconizeFilter('Article')).toEqual('icon-article');
        expect(iconizeFilter('Revue')).toEqual('icon-article');
        expect(iconizeFilter('Livre')).toEqual('icon-book');
        expect(iconizeFilter('Thèse / Mémoire')).toEqual('icon-essay');
        expect(iconizeFilter('Acte de conférences')).toEqual('icon-speaker');
        expect(iconizeFilter('Site Web')).toEqual('icon-website');
        expect(iconizeFilter('Image')).toEqual('icon-image');
        expect(iconizeFilter('Carte')).toEqual('icon-map');
        expect(iconizeFilter('Multisupport')).toEqual('icon-multi-support');
        expect(iconizeFilter('Partition')).toEqual('icon-sheet-music');
      }));

    it('should return icon-default by default',
      inject(function(iconizeFilter) {
        expect(iconizeFilter('unknown')).toEqual('icon-default');
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
