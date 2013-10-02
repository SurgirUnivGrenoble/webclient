'use strict';

angular.module('surgir.search').
directive('searchBox', function() {
  return {
    template: '<input type="search" placeholder="Rechercher" autocomplete="off" ng-model="search.input" typeahead="item for item in suggestions($viewValue)" typeahead-min-length="3" typeahead-wait-ms="300" typeahead-on-select="submitSearch()">',
    replace: true
  }
}).

directive('oneoffAutofocus', ['$rootScope', function($rootScope) {
  return {
    link: function(scope, elem, attrs, ctrl) {
      if ($rootScope.autofocusSearch) {
        $rootScope.autofocusSearch = false;
        elem[0].focus();
      }
    }
  };
}]).

directive('ngTap', [function() {
  return function(scope, element, attrs) {
    var tapping = false;
    element.bind('touchstart', function() { tapping = true });
    element.bind('touchmove', function() { tapping = false });
    element.bind('touchend', function() {
      if (tapping) { scope.$apply(attrs['ngTap']); }
    });
  };
}]);
