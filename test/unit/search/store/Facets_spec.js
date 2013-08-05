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

    describe('#extract', function() {
      var firstFacet, emptyFacet;

      beforeEach(function() {
        facets.extract({facette: [{
          'name': 'lang',
          'data': [['English', 27], ['Francais', 8], ['Non determinee', 4]]
        }, {
          'name': 'subject',
          'data': []
        }]});
        firstFacet = facets.filters[0];
        emptyFacet = facets.filters[1];
      });

      it('extracts filters from results', function() {
        expect(facets.filters.length).toEqual(2);
        expect(firstFacet.name).toEqual('lang');
        expect(firstFacet.data).
          toEqual([['English', 27], ['Francais', 8], ['Non determinee', 4]]);
      });

      it('sets french names for each facet', function() {
        expect(firstFacet.frenchName).toEqual('Langues');
      });

      it('sets empty flag for each facet', function() {
        expect(firstFacet.empty).toBeFalsy();
        expect(emptyFacet.empty).toBeTruthy();
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

    describe('#filtersSelected', function() {
      it('is true when some filters are selected', function() {
        facets.addFilter('date', '2013');
        expect(facets.filtersSelected()).toBe(true);
      });
      it('is false otherwise', function() {
        expect(facets.filtersSelected()).toBe(false);
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
