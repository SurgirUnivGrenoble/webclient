'use strict';

angular.module('surgir.search').controller('ResultsController',
  ['$scope', '$rootScope', '$location', 'RecordRetriever', 'Results', 'Facets',
  function($scope, $rootScope, $location, RecordRetriever, Results, Facets) {
    $rootScope.hideSearchBox = false;
    $scope.response = Results.response;
    $scope.facets = Facets.filters;

    $scope.showMoreResults = function() {
      RecordRetriever.fetchMoreResults();
    };

    $scope.noMoreResults = Results.noMoreResults.bind(Results);

    $scope.filtered = Facets.filtersSelected.bind(Facets);

    $scope.addFilter = function(facet, value) {
      Facets.addFilter(facet, value);
      RecordRetriever.filterResults();
    };

    $scope.resetFilters = function() {
      Facets.resetFilters();
      RecordRetriever.filterResults();
    };

    $scope.moreFilterValues = function(facet) {
      facet.limit = Math.min(facet.limit + 5, facet.data.length);
    };

    $scope.lessFilterValues = function(facet) {
      facet.limit = Math.max(facet.limit - 5, 0);
    };
  }]);
