'use strict';

angular.module('surgir.search').controller('FiltersController',
  ['$scope', '$location', 'RecordRetriever', 'Facets', 'Filters',
  function($scope, $location, RecordRetriever, Facets, Filters) {
    $scope.facets = Facets.facets;
    $scope.selectedFilters = Filters.selection;

    $scope.filtered = Filters.hasSelection.bind(Filters);

    $scope.addFilterAndRefresh = function(facet, value) {
      Filters.add(facet, value);
      RecordRetriever.filterResults();
    };

    $scope.setFilter = function(facet) {
      var value = $scope.selectedFilters[facet];
      if (value) {
        Filters.add(facet, value);
      } else {
        Filters.remove(facet);
      }
    };

    $scope.applyFilters = function() {
      RecordRetriever.filterResults();
      $location.path('/results');
    };

    $scope.resetFilters = function() {
      Filters.reset();
      RecordRetriever.filterResults();
    };

    $scope.moreFilterValues = function(facet) {
      facet.limit = Math.min(facet.limit + 5, facet.data.length);
    };

    $scope.lessFilterValues = function(facet) {
      facet.limit = Math.max(facet.limit - 5, 0);
    };
  }]);
