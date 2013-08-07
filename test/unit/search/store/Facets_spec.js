describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('Facets', function() {
    var service;

    beforeEach(inject(function($injector) {
      service = $injector.get('Facets');
    }));

    describe('@frenchNames', function() {
      it('give the french translation for a facet name', function() {
        expect(service.frenchNames['date']).toEqual('Dates');
        expect(service.frenchNames['author']).toEqual('Auteurs');
        expect(service.frenchNames['vendor_name']).
          toEqual('Bases de recherche');
        expect(service.frenchNames['lang']).toEqual('Langues');
        expect(service.frenchNames['material_type']).
          toEqual('Types de document');
        expect(service.frenchNames['subject']).toEqual('Sujets');
      });
    });

    describe('#extract', function() {
      var firstFacet, emptyFacet;

      beforeEach(function() {
        service.extract({facette: [{
          'name': 'lang',
          'data': [['English', 27], ['Francais', 8], ['Non determinee', 4]]
        }, {
          'name': 'subject',
          'data': []
        }]});
        firstFacet = service.facets[0];
        emptyFacet = service.facets[1];
      });

      it('extracts facets from results', function() {
        expect(service.facets.length).toEqual(2);
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

      it('sets the initial limit to 5 values per facet', function() {
        expect(firstFacet.limit).toBe(5);
      });
    });

    describe('#addFilter', function() {
      it('registers the given facet and value as a filter', function() {
        service.addFilter('vendor_name', 'Science Direct');
        service.addFilter('date', '2013');
        expect(service.selectedFilters).
          toEqual({vendor_name: 'Science Direct', date: '2013'});
      });
    });

    describe('#removeFilter', function() {
      it('removes the given facet as filter', function() {
        service.addFilter('vendor_name', 'Science Direct');
        service.addFilter('date', '2013');
        service.removeFilter('date');
        expect(service.selectedFilters).
          toEqual({vendor_name: 'Science Direct'});
      });
    });

    describe('#filtersSelected', function() {
      it('is true when some filters are selected', function() {
        service.addFilter('date', '2013');
        expect(service.filtersSelected()).toBe(true);
      });
      it('is false otherwise', function() {
        expect(service.filtersSelected()).toBe(false);
      });
    });

    describe('#filterKeys', function() {
      it('returns the collection of currently set filters', function() {
        service.addFilter('vendor_name', 'Science Direct');
        service.addFilter('date', '2013');
        expect(service.filterKeys()).toEqual(['vendor_name', 'date']);
      });
    });

    describe('#resetFilters', function() {
      it('resets all filters', function() {
        service.addFilter('vendor_name', 'Science Direct');
        service.addFilter('date', '2013');
        service.resetFilters();
        expect(service.selectedFilters).toEqual({});
      });
    });

    describe('#asParamString', function() {
      it('returns selected filters encoded as a parameter string', function() {
        service.addFilter('vendor_name', 'Science Direct');
        service.addFilter('date', '2013');
        expect(service.asParamString()).toEqual(
          '&filter[]=vendor_name--Science%20Direct&filter[]=date--2013' +
          '&log_action=facette');
      });

      it('returns an empty string when no filters are set', function() {
        expect(service.asParamString()).toEqual('');
      });
    });

  });

});
