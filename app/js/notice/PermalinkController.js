'use strict';

angular.module('surgir.notice').controller('PermalinkController',
  ['$scope', '$routeParams', 'Permalink', 'NoticeProcessor',
  function($scope, $routeParams, Permalink, Notice) {
    $scope.notice = Permalink.getNotice($routeParams.permalink).
      then(function(notice) {
        return Notice.filter(notice);
      });
  }]);
