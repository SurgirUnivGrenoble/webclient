'use strict';

angular.module('surgir.search').controller('HomeController',
['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
    $scope.goToSearch = function() {
      $rootScope.autofocusSearch = true;
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
