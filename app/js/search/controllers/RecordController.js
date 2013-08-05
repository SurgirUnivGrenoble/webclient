'use strict';

angular.module('surgir.search').controller('RecordController',
  ['$scope', '$rootScope', '$routeParams', 'RecordRetriever',
  function($scope, $rootScope, $routeParams, RecordRetriever) {
    $rootScope.hideSearchBox = true;
    $scope.notice = RecordRetriever.getRecordNotice($routeParams.resultId);
  }]);
