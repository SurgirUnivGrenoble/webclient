'use strict';

angular.module('surgir.search').controller('RecordController',
  ['$scope', '$routeParams', 'RecordRetriever', 'NoticeProcessor',
  function($scope, $routeParams, RecordRetriever, Notice) {
    $scope.backToResults = true;
    $scope.notice = RecordRetriever.getRecordNotice($routeParams.resultId).
      then(function(notice) {
        return Notice.filter(notice);
      });
  }]);
