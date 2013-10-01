'use strict';

angular.module('surgir.search').controller('SearchController', ['$scope',
'$rootScope', '$location', 'SearchDirector', 'AutoComplete', 'limitToFilter',
function($scope, $rootScope, $location, Search, AutoComplete, limitToFilter) {
  $scope.searchInput = Search.queryInput;

  $scope.$watch('searchInput', function() {
    if ($scope.searchInput.length === 0) {
      Search.reset();
    }
  });

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

  $rootScope.$on('cancelPoll', function(event) {
    Search.cancel();
  });

}]);
