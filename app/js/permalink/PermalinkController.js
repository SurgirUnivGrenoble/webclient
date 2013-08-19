'use strict';

angular.module('surgir.permalink').controller('NoticeController',
  ['$scope', '$routeParams', 'Permalink',
  function($scope, $routeParams, Permalink) {
    $scope.notice = Permalink.getNotice($routeParams.permalink).
      then(function(notice) {
        notice.direct_urls = notice.direct_url.split('-_-');
        return notice;
      });
  }]);
