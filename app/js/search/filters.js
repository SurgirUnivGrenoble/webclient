'use strict';

angular.module('surgir.search').
  filter('facetLabel', function() {
    return function(facetValue) {
      return facetValue[0] + ' (' + facetValue[1] + ')';
    }
  });
