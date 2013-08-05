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
      it('should update the response property', function() {
        results.store(response);
        expect(results.response).toEqual(response);
      });

      it('should run facets extraction', function() {
        spyOn(mockFacets, 'extract');
        results.store(response);
        expect(mockFacets.extract).toHaveBeenCalledWith(response);
      });
    });
  });

});
