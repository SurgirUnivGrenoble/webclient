'use strict';

angular.module('surgir.search').
  filter('replace', function() {
    return function(text) {
      return text.replace(/;/g, ' - ');
    }
  }).

  filter('lfYear', function() {
    return function(timestamp) {
      return timestamp.slice(0, 4);
    }
  });
