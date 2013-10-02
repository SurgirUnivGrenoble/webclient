'use strict';

angular.module('surgir.search').controller('SearchController', ['$scope',
'$rootScope', '$location', 'SearchDirector', 'AutoComplete', 'limitToFilter',
function($scope, $rootScope, $location, Search, AutoComplete, limitToFilter) {
  $scope.search = {
    input: Search.queryInput
  };

  $scope.$watch('search.input', function() {
    if ($scope.search.input.length === 0) {
      Search.reset();
    }
  });

  $scope.submitSearch = function() {
    if ($scope.search.input) {
      Search.search($scope.search.input);
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
