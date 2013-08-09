'use strict';

angular.module('surgir.search').controller('RecordController',
  ['$scope', '$routeParams', 'RecordRetriever',
  function($scope, $routeParams, RecordRetriever) {
    $scope.notice = RecordRetriever.getRecordNotice($routeParams.resultId);
  }]);
