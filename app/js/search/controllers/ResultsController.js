'use strict';

angular.module('surgir.search').controller('ResultsController',
  ['$scope', '$location', 'Results',
  function($scope, $location, Results) {
    $scope.response = Results.response;
  }]);
