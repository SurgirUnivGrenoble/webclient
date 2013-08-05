'use strict';

angular.module('surgir.search').factory('Results',
['Facets', function(Facets) {
  return {
    response: {
      hits: 0,
      results: []
    },

    pageIndex: 1,

    store: function(results) {
      angular.extend(this.response, results);
      Facets.extract(results);
      this.pageIndex = 1;
    },

    concat: function(results) {
      Array.prototype.push.apply(this.response.results, results.results);
      this.pageIndex += 1;
    }
  };
}]);
