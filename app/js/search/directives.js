'use strict';

angular.module('surgir.search').
directive('searchBox', function() {
  return {
    template:
      '<input type="search" placeholder="Rechercher" autocomplete="off"' +
      ' ng-model="search.input"' +
      ' typeahead="item for item in suggestions($viewValue)"' +
      ' typeahead-min-length="3" typeahead-wait-ms="300"' +
      ' typeahead-on-select="submitSearch()">',
    replace: true
  };
}).

directive('linkable', function() {
  return {
    scope: {
      link: '=linkable'
    },
    template:
      '<a href="{{link}}" target="_blank" ng-transclude ng-show="link">' +
      '</a><span ng-transclude ng-hide="link"></span>',
    transclude: true
  };
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

directive('ngTap', ['IEMobile', function(ie) {
  return function(scope, element, attrs) {
    if (!ie) {
      var tapping = false;
      element.bind('touchstart', function() { tapping = true });
      element.bind('touchmove', function() { tapping = false });
      element.bind('touchend', function() {
        if (tapping) { scope.$apply(attrs['ngTap']); }
      });
    } else {
      element.bind('click', function() { scope.$apply(attrs['ngTap']); });
    }
  };
}]);
