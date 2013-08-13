'use strict';

angular.module('surgir.search').factory('Results',
['Facets', function(Facets) {
  return {
    response: {
      hits: 0,
      results: [],
      page: []
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
    },

    noMoreResults: function() {
      var pages = this.response.page || [];
      return pages.length == 0 || this.pageIndex == pages[pages.length - 1];
    }
  };
}]);
