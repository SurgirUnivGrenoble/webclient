'use strict';

angular.module('surgir.search').controller('FiltersController',
  ['$scope', '$location', 'RecordRetriever', 'Facets', 'Filters',
  function($scope, $location, RecordRetriever, Facets, Filters) {
    $scope.facets = Facets.facets;
    $scope.selectedFilters = Filters.selection;

    $scope.filtered = Filters.filtersSelected.bind(Filters);

    $scope.addFilterAndRefresh = function(facet, value) {
      Filters.addFilter(facet, value);
      RecordRetriever.filterResults();
    };

    $scope.setFilter = function(facet) {
      var value = $scope.selectedFilters[facet];
      if (value) {
        Filters.addFilter(facet, value);
      } else {
        Filters.removeFilter(facet);
      }
    };

    $scope.applyFilters = function() {
      RecordRetriever.filterResults();
      $location.path('/results');
    };

    $scope.resetFilters = function() {
      Filters.resetFilters();
      RecordRetriever.filterResults();
    };

    $scope.moreFilterValues = function(facet) {
      facet.limit = Math.min(facet.limit + 5, facet.data.length);
    };

    $scope.lessFilterValues = function(facet) {
      facet.limit = Math.max(facet.limit - 5, 0);
    };
  }]);
