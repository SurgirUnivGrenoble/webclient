'use strict';

angular.module('surgir', ['ui.event', 'surgir.search']);

if (window.matchMedia('only screen and (max-device-width:480px)').matches) {
  angular.module('surgir').config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {templateUrl: 'views/mobile/home.html',
                 controller: 'HomeController'}).
      when('/results', {templateUrl: 'views/mobile/results.html',
                        controller: 'ResultsController'}).
      when('/filters', {templateUrl: 'views/mobile/filters.html',
                        controller: 'FiltersController'}).
      when('/results/:resultId', {templateUrl: 'views/mobile/notice.html',
                        controller: 'RecordController'}).
      when('/notice/:permalink', {templateUrl: 'views/mobile/notice.html'}).
      otherwise({redirectTo: '/'});
  }]);
} else {
  angular.module('surgir').config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {templateUrl: 'views/classic/home.html',
                 controller: 'HomeController'}).
      when('/results', {templateUrl: 'views/classic/results.html',
                        controller: 'ResultsController'}).
      when('/results/:resultId', {templateUrl: 'views/classic/notice.html',
                        controller: 'RecordController'}).
      when('/notice/:permalink', {templateUrl: 'views/classic/notice.html'}).
      otherwise({redirectTo: '/'});
  }]);
}

angular.module('surgir').run(['Collections', 'CollectionGroupConfig',
  function(Collections, CollectionGroup) {
    Collections.fetch(CollectionGroup);
  }]);
