'use strict';

angular.module('surgir.search').controller('SearchController',
  ['$scope', '$location', 'SearchDirector',
  function($scope, $location, Search) {
    $scope.submitSearch = function() {
      if ($scope.searchInput) {
        Search.search($scope.searchInput);
      }
      $location.path('/results');
    };

    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

  }]);
