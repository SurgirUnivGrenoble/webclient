'use strict';

angular.module('surgir', ['surgir.search']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {templateUrl: 'views/home.html'}).
      when('/results', {templateUrl: 'views/results.html'}).
      otherwise({redirectTo: '/'})
  }]);
