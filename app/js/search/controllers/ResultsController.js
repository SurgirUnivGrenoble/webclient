'use strict';

angular.module('surgir.search').controller('ResultsController',
  ['$scope', '$rootScope', '$location', 'RecordRetriever', 'Results', 'Facets',
  function($scope, $rootScope, $location, RecordRetriever, Results, Facets) {
    $rootScope.hideSearchBox = false;
    $scope.response = Results.response;
    $scope.facets = Facets.filters;

    $scope.filtered = Facets.filtersSelected.bind(Facets);

    $scope.addFilter = function(facet, value) {
      Facets.addFilter(facet, value);
      RecordRetriever.filterResults();
    };

    $scope.resetFilters = function() {
      Facets.resetFilters();
      RecordRetriever.filterResults();
    };
  }]);
