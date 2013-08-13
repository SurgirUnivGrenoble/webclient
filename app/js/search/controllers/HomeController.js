'use strict';

angular.module('surgir.search').controller('HomeController',
  ['$scope', '$location', function($scope, $location) {
    $scope.goToSearch = function() {
      $location.path('/results');
    };

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