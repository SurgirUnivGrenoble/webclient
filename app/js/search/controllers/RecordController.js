'use strict';

angular.module('surgir.search').controller('RecordController',
  ['$scope', '$routeParams', 'RecordRetriever', 'NoticeProcessor',
  function($scope, $routeParams, RecordRetriever, Notice) {
    $scope.backToResults = true;
    $scope.loading = true;
    $scope.notice = RecordRetriever.getRecordNotice($routeParams.resultId).
      then(function(notice) {
        $scope.loading = false;
        return Notice.filter(notice);
      });
  }]);
