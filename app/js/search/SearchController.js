'use strict';

angular.module('surgir.search').
  controller('SearchController', function($scope, $location) {
    $scope.submitSearch = function() {
      $location.path('/results');
    };
  });
