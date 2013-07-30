'use strict';

angular.module('surgir.search').controller('SearchController',
  ['$scope', '$location', function($scope, $location) {
    $scope.submitSearch = function() {
      $location.path('/results');
    };
  }]);
