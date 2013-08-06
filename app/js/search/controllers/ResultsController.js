'use strict';

angular.module('surgir.search').controller('ResultsController',
  ['$scope', '$rootScope', 'RecordRetriever', 'Results',
  function($scope, $rootScope, RecordRetriever, Results) {
    $rootScope.hideSearchBox = false;
    $scope.response = Results.response;

    $scope.showMoreResults =
      RecordRetriever.fetchMoreResults.bind(RecordRetriever);

    $scope.noMoreResults = Results.noMoreResults.bind(Results);

  }]);
