describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('SearchController', function() {
    var scope, mockSearch, mockComplete;

    mockSearch = {
      queryInput: 'sample input',
      search: function(input) {},
      cancel: function() {}
    };

    mockComplete = {
      lookup: function(input) {}
    };

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      $controller('SearchController', {
        $scope: scope,
        SearchDirector: mockSearch,
        AutoComplete: mockComplete
      });
    }));

    it('should bind to SearchDirector input', function() {
      expect(scope.search.input).toBe('sample input');
    });

    it('should react to "cancelPoll" event', function() {
      spyOn(mockSearch, 'cancel');
      scope.$emit('cancelPoll');
      expect(mockSearch.cancel).toHaveBeenCalled();
    });

    describe('#submitSearch', function() {
      it('should call the Search service with search input', function() {
        spyOn(mockSearch, 'search');
        scope.search.input = 'test test';
        scope.submitSearch();
        expect(mockSearch.search).toHaveBeenCalledWith('test test');
      });
    });

    describe('#suggestions', function() {
      it('should request the AutoComplete service', function() {
        spyOn(mockComplete, 'lookup').andReturn({ then: function() {} });
        scope.suggestions('prefix');
        expect(mockComplete.lookup).toHaveBeenCalledWith('prefix');
      });
    });

  });
});
