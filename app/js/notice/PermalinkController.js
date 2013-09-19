'use strict';

angular.module('surgir.notice').controller('PermalinkController',
  ['$scope', '$routeParams', 'Permalink', 'NoticeProcessor',
  function($scope, $routeParams, Permalink, Notice) {
    var permalink = $routeParams.permalink.replace('|||', '/');
    $scope.notice = Permalink.getNotice(permalink).
      then(function(notice) {
        return Notice.filter(notice);
      });
  }]);
