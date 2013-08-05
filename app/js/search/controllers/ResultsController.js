'use strict';

angular.module('surgir.search').controller('ResultsController',
  ['$scope', '$location', 'RecordRetriever', 'Results', 'Facets',
  function($scope, $location, RecordRetriever, Results, Facets) {
    $scope.response = Results.response;
    $scope.facets = Facets.filters;

    $scope.addFilter = function(facet, value) {
      Facets.addFilter(facet, value);
      RecordRetriever.filterResults();
    };

    $scope.resetFilters = function() {
      Facets.resetFilters();
      RecordRetriever.filterResults();
    };
  }]);
