'use strict';

angular.module('surgir', ['surgir.search']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {templateUrl: 'views/home.html'}).
      when('/results', {templateUrl: 'views/results.html', controller: 'ResultsController'}).
      when('/results/:resultId', {templateUrl: 'views/notice.html'}).
      when('/notice/:permalink', {templateUrl: 'views/notice.html'}).
      otherwise({redirectTo: '/'});
  }]).
  run(['Collections', 'CollectionGroupConfig',
  function(Collections, CollectionGroup) {
    Collections.fetch(CollectionGroup);
  }]);
