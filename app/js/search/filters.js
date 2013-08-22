'use strict';

angular.module('surgir.search').
  filter('replace', function() {
    return function(text) {
      if (text) {
        return text.replace(/&apos;/g, "'").replace(/;/g, ' - ');
      } else {
        return '';
      }
    }
  }).

  filter('lfYear', function() {
    return function(timestamp) {
      if (timestamp) {
        return timestamp.slice(0, 4);
      } else {
        return '';
      }
    }
  }).

  filter('yearPublisher', ['lfYearFilter', function(lfYear) {
    return function(publisher, timestamp) {
      if (timestamp) {
        return publisher + ', ' + lfYear(timestamp);
      } else {
        return publisher;
      }
    }
  }]).

  filter('facetLabel', function() {
    return function(facetValue) {
      return facetValue[0] + ' (' + facetValue[1] + ')';
    }
  });
