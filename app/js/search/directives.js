'use strict';

angular.module('surgir.search').directive('oneoffAutofocus',
['$rootScope', function($rootScope) {
  return {
    link: function(scope, elem, attrs, ctrl) {
      if ($rootScope.autofocusSearch) {
        $rootScope.autofocusSearch = false;
        elem[0].focus();
      }
    }
  };
}]);
