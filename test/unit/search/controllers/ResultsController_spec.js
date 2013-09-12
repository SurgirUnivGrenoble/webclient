describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('ResultsController', function() {
    var scope, mockResults, mockRetriever, mockLocation;

    var mockResponse = { hits: 100 };

    mockResults = {
      response: mockResponse,
      noMoreResults: function() {}
    };

    mockRetriever = {
      fetchMoreResults: function() {}
    };

    mockLocation = {
      path: function() {}
    }

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      $controller('ResultsController', {
        $scope: scope,
        $location: mockLocation,
        Results: mockResults,
        RecordRetriever: mockRetriever
      });
    }));

    it('should bind to Results content', function() {
      expect(scope.response).toBe(mockResponse);
    });

    describe('#goToNotice', function() {
      it('should change the location to go the detailed result', function() {
        spyOn(mockLocation, 'path');
        scope.goToNotice(2);
        expect(mockLocation.path).toHaveBeenCalledWith('/results/2');
      });
    });

    describe('#hasResults', function() {
      it('should be true when there are some results', function() {
        expect(scope.hasResults()).toBeTruthy();
      });

      it('should be false otherwise', function() {
        mockResponse.hits = 0;
        expect(scope.hasResults()).toBeFalsy();
      });
    });

    describe('#showMoreResults', function() {
      it('should call the RecordRetriever service', function() {
        spyOn(mockRetriever, 'fetchMoreResults');
        scope.showMoreResults();
        expect(mockRetriever.fetchMoreResults).toHaveBeenCalled();
      });

      it('should send a "cancelPoll" event', function() {
        spyOn(scope, '$emit');
        scope.showMoreResults();
        expect(scope.$emit).toHaveBeenCalledWith('cancelPoll');
      });
    });

  });
});
