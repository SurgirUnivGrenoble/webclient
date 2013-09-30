'use strict';

angular.module('surgir.search').controller('HomeController',
['$scope', '$rootScope', '$location', 'SearchDirector',
function($scope, $rootScope, $location, Search) {

  $scope.goToSearch = function() {
    $rootScope.autofocusSearch = true;
    $location.path('/results');
  };

  $scope.$watch('searchInput', function() {
    if ($scope.searchInput) {
      Search.queryInput = $scope.searchInput;
      $scope.goToSearch();
    }
  });

  var twitterInit = function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
      js = d.createElement(s);
      js.id = id;
      js.src = p + '://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  };
  twitterInit(document, 'script', 'twitter-wjs');

}]);
