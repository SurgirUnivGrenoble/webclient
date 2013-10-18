'use strict';

angular.module('surgir.search').controller('FiltersController',
  ['$scope', '$location', 'RecordRetriever', 'Facets', 'Filters',
  function($scope, $location, RecordRetriever, Facets, Filters) {
    $scope.facets = Facets.facets;
    $scope.selectedFilters = Filters.selection;

    $scope.filtered = Filters.hasSelection.bind(Filters);

    $scope.addFilterAndRefresh = function(facet, value) {
      $scope.$emit('cancelPoll');
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
      $scope.$emit('cancelPoll');
      RecordRetriever.filterResults();
      $location.path('/results');
    };

    $scope.resetFilters = function() {
      Filters.reset();
      RecordRetriever.filterResults();
    };

    $scope.moreFilterValues = function(facet) {
      facet.limit = Math.min(facet.limit + 5, facet.data.length);
      facet.more = facet.limit < facet.data.length;
    };
  }]);
