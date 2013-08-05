'use strict';

angular.module('surgir.search').controller('ResultsController',
  ['$scope', '$location', 'Results', 'Facets',
  function($scope, $location, Results, Facets) {
    $scope.response = Results.response;
    $scope.facets = Facets.filters;
  }]);
