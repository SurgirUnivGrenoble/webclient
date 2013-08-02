'use strict';

angular.module('surgir.search').
  filter('replace', function() {
    return function(text) {
      if (text) {
        return text.replace(/;/g, ' - ');
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
  });
