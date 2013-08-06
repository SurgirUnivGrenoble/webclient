'use strict';

angular.module('surgir.search').controller('FiltersController',
  ['$scope', '$rootScope', '$location', 'RecordRetriever', 'Facets',
  function($scope, $rootScope, $location, RecordRetriever, Facets) {
    $rootScope.hideSearchBox = false;
    $scope.facets = Facets.filters;
    $scope.filtered = Facets.filtersSelected.bind(Facets);

    $scope.applyFilters = function() {
      RecordRetriever.filterResults();
      $location.path('/results');
    };

    $scope.addFilterAndRefresh = function(facet, value) {
      Facets.addFilter(facet, value);
      RecordRetriever.filterResults();
    };

    $scope.addFilter = function(facet, value) {
      Facets.addFilter(facet, value);
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
