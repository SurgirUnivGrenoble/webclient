'use strict';

angular.module('surgir.search').controller('SearchController',
  ['$scope', '$location', 'SearchDirector',
  function($scope, $location, Search) {
    $scope.submitSearch = function() {
      if($scope.searchInput) {
        Search.search($scope.searchInput);
      }
      $location.path('/results');
    };
  }]);
