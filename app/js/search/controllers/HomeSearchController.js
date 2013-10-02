'use strict';

angular.module('surgir.search').controller('HomeSearchController', [
'$scope', '$rootScope', '$location', 'SearchDirector', 'iOSMobile',
function($scope, $rootScope, $location, Search, ios) {
  if (! ios) {
    $scope.$watch('search.input', function() {
      if ($scope.search.input) {
        Search.queryInput = $scope.search.input;
        $rootScope.autofocusSearch = true;
        $location.path('/results');
      }
    });
  }
}]);
