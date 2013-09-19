'use strict';

angular.module('surgir.search').
  filter('facetLabel', function() {
    return function(facetValue) {
      return facetValue[0] + ' (' + facetValue[1] + ')';
    }
  }).

  filter('option', function() {
    return function(numOptions) {
      return numOptions > 1 ? numOptions + ' options' : numOptions + ' option';
    }
  });
