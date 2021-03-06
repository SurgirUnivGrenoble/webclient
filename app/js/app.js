'use strict';

angular.module('surgir', ['ui.bootstrap',
  'surgir.search', 'surgir.notice', 'surgir.templates']);

var testMobileDevice = function() {
  return /(Android.+Mobile)|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.
    test(navigator.userAgent);
};

if (testMobileDevice()) {
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
      when('/notice/:permalink', {templateUrl: 'views/mobile/notice.html',
                                  controller: 'PermalinkController'}).
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
      when('/notice/:permalink', {templateUrl: 'views/classic/notice.html',
                                  controller: 'PermalinkController'}).
      when('/a-propos', {templateUrl: 'views/classic/apropos.html'}).
      when('/aide', {templateUrl: 'views/classic/aide.html'}).
      when('/mentions-legales',
                        {templateUrl: 'views/classic/mentions-legales.html'}).
      when('/bases-surgir', {templateUrl: 'views/classic/bases-surgir.html'}).
      when('/bases-exclues', {templateUrl: 'views/classic/bases-exclues.html'}).
      otherwise({redirectTo: '/'});
  }]);
}

angular.module('surgir').run(['Collections', 'CollectionGroupConfig',
function(Collections, CollectionGroup) {
  var queryParams = window.location.search.slice(1).split('=');
  var group = (queryParams[0] === 'group') ? queryParams[1] : CollectionGroup;
  Collections.fetch(group);
}]);

angular.module('surgir').controller('FooterController',
['$scope', '$location', function($scope, $location) {
  $scope.$on('$locationChangeSuccess', function() {
    if ($location.path() === '/') {
      $scope.onHome = true;
    } else {
      $scope.onHome = false;
    }
  });
}]);
