describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('FiltersController', function() {
    var scope, mockFacets, mockFilters, mockRetriever;

    mockFacets = {
      facets: []
    };

    mockFilters = {
      selection: [],
      hasSelection: function() {},
      add: function() {},
      remove: function() {},
      reset: function() {}
    };

    mockRetriever = {
      filterResults: function() {}
    };

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      $controller('FiltersController', {
        $scope: scope,
        Facets: mockFacets,
        Filters: mockFilters,
        RecordRetriever: mockRetriever
      });
    }));

    it('should bind to Facets', function() {
      expect(scope.facets).toBe(mockFacets.facets);
    });

    it('should bind to Filters selection', function() {
      expect(scope.selectedFilters).toBe(mockFilters.selection);
    });

    describe('#addFilterAndRefresh', function() {
      it('should register the filter value', function() {
        spyOn(mockFilters, 'add');
        scope.addFilterAndRefresh('date', '2013');
        expect(mockFilters.add).toHaveBeenCalledWith('date', '2013');
      });

      it('should call the RecordRetriever service', function() {
        spyOn(mockRetriever, 'filterResults');
        scope.addFilterAndRefresh('date', '2013');
        expect(mockRetriever.filterResults).toHaveBeenCalled();
      });

      it('should send a "cancelPoll" event', function() {
        spyOn(scope, '$emit');
        scope.addFilterAndRefresh('date', '2013');
        expect(scope.$emit).toHaveBeenCalledWith('cancelPoll');
      });
    });

    describe('#setFilter', function() {
      it('should register the facet filter if value set', function() {
        spyOn(mockFilters, 'add');
        scope.selectedFilters['date'] = '2013';
        scope.setFilter('date');
        expect(mockFilters.add).toHaveBeenCalledWith('date', '2013');
      });

      it('should remove the facet filter if not set', function() {
        spyOn(mockFilters, 'remove');
        scope.selectedFilters['date'] = '';
        scope.setFilter('date');
        expect(mockFilters.remove).toHaveBeenCalledWith('date');
      });
    });

    describe('#applyFilters', function() {
      it('should call the RecordRetriever service', function() {
        spyOn(mockRetriever, 'filterResults');
        scope.applyFilters();
        expect(mockRetriever.filterResults).toHaveBeenCalled();
      });

      it('should send a "cancelPoll" event', function() {
        spyOn(scope, '$emit');
        scope.applyFilters();
        expect(scope.$emit).toHaveBeenCalledWith('cancelPoll');
      });
    });

    describe('#resetFilters', function() {
      it('should register the filter value', function() {
        spyOn(mockFilters, 'reset');
        scope.resetFilters();
        expect(mockFilters.reset).toHaveBeenCalled();
      });

      it('should call the RecordRetriever service', function() {
        spyOn(mockRetriever, 'filterResults');
        scope.resetFilters();
        expect(mockRetriever.filterResults).toHaveBeenCalled();
      });
    });

    describe('#moreFilterValues', function() {
      it('increments the filter values to display by step of 5', function() {
        var facet = {
          limit: 1,
          data: [1, 2, 3, 4, 5, 6, 7]
        };
        scope.moreFilterValues(facet);
        expect(facet.limit).toEqual(6);
      });

      it('does not increment the limit above the number of values', function() {
        var facet = {
          limit: 1,
          data: [1, 2, 3, 4]
        };
        scope.moreFilterValues(facet);
        expect(facet.limit).toEqual(4);
      });
    });

  });
});
