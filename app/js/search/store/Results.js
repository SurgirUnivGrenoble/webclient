'use strict';

angular.module('surgir.search').factory('Results', ['Facets', 'NoticeProcessor',
function(Facets, Notice) {
  var Results = {
    response: {},
    pageIndex: 1,

    reset: function() {
      this.response.hits = 0;
      this.response.results = [];
      this.response.page = [];
      Facets.reset();
    },

    store: function(results) {
      this._postFilter(results);
      angular.extend(this.response, results);
      Facets.extract(results);
      this.pageIndex = 1;
    },

    concat: function(results) {
      this._postFilter(results);
      Array.prototype.push.apply(this.response.results, results.results);
      this.pageIndex += 1;
    },

    noMoreResults: function() {
      var pages = this.response.page || [];
      return pages.length == 0 || this.pageIndex == pages[pages.length - 1];
    },

    _postFilter: function(results) {
      if (results.results === null) {
        results.results = [];
      }
      results.results.forEach(function(result) {
        Notice.filter(result);
      });
    }
  };
  Results.reset();
  return Results;
}]);
