describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('Facets', function() {
    var facets;

    beforeEach(inject(function($injector) {
      facets = $injector.get('Facets');
    }));

    describe('@frenchNames', function() {
      it('give the french translation for a facet name', function() {
        expect(facets.frenchNames['date']).toEqual('Dates');
        expect(facets.frenchNames['author']).toEqual('Auteurs');
        expect(facets.frenchNames['vendor_name']).toEqual('Bases de recherche');
        expect(facets.frenchNames['lang']).toEqual('Langues');
        expect(facets.frenchNames['material_type']).
          toEqual('Types de document');
        expect(facets.frenchNames['subject']).toEqual('Sujets');
      });
    });

    describe('#addFilter', function() {
      it('registers the given facet and value as a filter', function() {
        facets.addFilter('vendor_name', 'Science Direct');
        facets.addFilter('date', '2013');
        expect(facets.selectedFilters).
          toEqual(['vendor_name--Science%20Direct', 'date--2013']);
      });
    });

    describe('#resetFilters', function() {
      it('resets all filters', function() {
        facets.addFilter('vendor_name', 'Science Direct');
        facets.addFilter('date', '2013');
        facets.resetFilters();
        expect(facets.selectedFilters).toEqual([]);
      });
    });

    describe('#asParamString', function() {
      it('returns selected filters encoded as a parameter string', function() {
        facets.addFilter('vendor_name', 'Science Direct');
        facets.addFilter('date', '2013');
        expect(facets.asParamString()).toEqual(
          '&filter[]=vendor_name--Science%20Direct&filter[]=date--2013' +
          '&log_action=facette');
      });

      it('returns an empty string when no filters are set', function() {
        expect(facets.asParamString()).toEqual('');
      });
    });

  });

});
