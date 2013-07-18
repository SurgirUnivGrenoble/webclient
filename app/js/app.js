'use strict';

angular.module('surgir', ['surgir.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/steps', {templateUrl: 'views/steps.html', controller: 'StepsController'});
    $routeProvider.when('/integrated', {templateUrl: 'views/integrated.html', controller: 'SearchController'});
    $routeProvider.otherwise({redirectTo: '/steps'});
  }]);
