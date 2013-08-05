describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('Results', function() {
    var results, response;

    var mockFacets = {
      extract: function(response) {}
    };

    beforeEach(module(function($provide) {
      $provide.value('Facets', mockFacets);
    }));

    beforeEach(inject(function($injector) {
      results = $injector.get('Results');
      response = {
        'totalhits': [],
        'hits': 15,
        'results': [],
        'facette': []
      };
    }));

    describe('#store', function() {
      it('updates the response property', function() {
        results.store(response);
        expect(results.response).toEqual(response);
      });

      it('runs facets extraction', function() {
        spyOn(mockFacets, 'extract');
        results.store(response);
        expect(mockFacets.extract).toHaveBeenCalledWith(response);
      });

      it('(re)sets the current page index to 1', function() {
        results.pageIndex = 3;
        results.store(response);
        expect(results.pageIndex).toBe(1);
      });
    });

    describe('#concat', function() {
      beforeEach(function() {
        results.store({results: [1, 2, 3]});
      });

      it('adds new results to the current ones', function() {
        results.concat({results: [4, 5, 6]});
        expect(results.response.results).toEqual([1, 2, 3, 4, 5, 6]);
      });

      it('increments the page index by one', function() {
        results.concat({results: [4, 5, 6]});
        results.concat({results: [7, 8, 9]});
        expect(results.pageIndex).toBe(3);
      });
    });
  });

});
