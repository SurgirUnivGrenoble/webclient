'use strict';

angular.module('surgir.notice').controller('PermalinkController',
  ['$scope', '$routeParams', 'Permalink',
  function($scope, $routeParams, Permalink) {
    $scope.notice = Permalink.getNotice($routeParams.permalink).
      then(function(notice) {
        notice.direct_urls = notice.direct_url.split('-_-');
        return notice;
      });
  }]);
