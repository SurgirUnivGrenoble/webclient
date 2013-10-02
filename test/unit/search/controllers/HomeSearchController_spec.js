describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('HomeSearchController', function() {
    var scope, $rootScope, mockLocation, mockSearch;

    mockLocation = {
      path: function() {}
    };

    mockSearch = {};

    beforeEach(inject(function($rootScope, $controller) {
      rootScope = $rootScope;
      scope = $rootScope.$new();
      scope.search = {};
      $controller('HomeSearchController', {
        $scope: scope,
        $rootScope: $rootScope,
        $location: mockLocation,
        SearchDirector: mockSearch,
        iOSMobile: false
      });
    }));

    describe('Only on non-iOS device', function() {
      describe('when search input changes', function() {
        it('should register the input in the Search service', function() {
          scope.search.input = 'test input';
          scope.$digest();
          expect(mockSearch.queryInput).toEqual('test input');
        });

        it('should set the autofocusSearch flag in root scope', function() {
          scope.search.input = 'test input';
          scope.$digest();
          expect(rootScope.autofocusSearch).toBe(true);
        });

        it('should call the $location service to redirect to results view', function() {
          spyOn(mockLocation, 'path');
          scope.search.input = 'test input';
          scope.$digest();
          expect(mockLocation.path).toHaveBeenCalledWith('/results');
        });
      });
    });
  });
});
