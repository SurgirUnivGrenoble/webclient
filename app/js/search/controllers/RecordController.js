'use strict';

angular.module('surgir.search').controller('RecordController',
  ['$scope', '$routeParams', 'RecordRetriever',
  function($scope, $routeParams, RecordRetriever) {
    $scope.notice = RecordRetriever.getRecordNotice($routeParams.resultId).
      then(function(notice) {
        notice.direct_urls = notice.direct_url.split('-_-');
        return notice;
      });
  }]);
