'use strict';

angular.module('surgir.search').
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
