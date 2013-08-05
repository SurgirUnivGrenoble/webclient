'use strict';

angular.module('surgir.search').factory('Results',
['Facets', function(Facets) {
  return {
    response: {
      hits: 0,
      results: []
    },

    store: function(results) {
      angular.extend(this.response, results);
      Facets.extract(results);
    }
  };
}]);
