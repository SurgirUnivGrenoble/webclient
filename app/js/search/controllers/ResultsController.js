'use strict';

angular.module('surgir.search').controller('ResultsController',
  ['$scope', 'RecordRetriever', 'Results', 'InProgress',
  function($scope, RecordRetriever, Results, InProgress) {
    $scope.response = Results.response;

    $scope.loading = function() {
      return InProgress.running;
    };

    $scope.hasResults = function() {
      return $scope.response.hits > 0;
    };

    $scope.showMoreResults =
      RecordRetriever.fetchMoreResults.bind(RecordRetriever);

    $scope.noMoreResults = Results.noMoreResults.bind(Results);

  }]);
