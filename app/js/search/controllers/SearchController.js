'use strict';

angular.module('surgir.search').controller('SearchController',
  ['$scope', '$location', 'SearchDirector', 'AutoComplete', 'limitToFilter',
  function($scope, $location, Search, AutoComplete, limitToFilter) {
    $scope.searchInput = Search.queryInput;

    $scope.submitSearch = function() {
      if ($scope.searchInput) {
        Search.search($scope.searchInput);
      }
      $location.path('/results');
    };

    $scope.suggestions = function(queryInput) {
      return AutoComplete.lookup(queryInput).then(function(results) {
        return limitToFilter(results, 10);
      });
    };

  }]);
