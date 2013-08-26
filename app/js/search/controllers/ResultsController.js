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

    $scope.showMoreResults = function() {
      $scope.$emit('cancelPoll');
      RecordRetriever.fetchMoreResults();
    };

    $scope.noMoreResults = Results.noMoreResults.bind(Results);

  }]);
