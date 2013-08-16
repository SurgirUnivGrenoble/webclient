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
      var firstFacet;

      beforeEach(function() {
        service.extract({
          facette: [{
            name: 'lang',
            data: [['English', 27], ['Francais', 8], ['Non determinee', 4]]
          }, {
            name: 'subject',
            data: []
          }, {
            name: 'vendor_name',
            data: [['Odyssée', 18], ['Rugbis', 5]]
          }],
          totalhits: [{
            target_name: 'Odyssée',
            total_hits: 20
          }, {
            target_name: 'Rugbis',
            total_hits: 55
          }]
        });
        firstFacet = service.facets[0];
      });

      it('extracts facets from results', function() {
        expect(service.facets.length).toEqual(3);
        expect(firstFacet.name).toEqual('lang');
        expect(firstFacet.data).
          toEqual([['English', 27], ['Francais', 8], ['Non determinee', 4]]);
      });

      it('sets french names for each facet', function() {
        expect(firstFacet.frenchName).toEqual('Langues');
      });

      it('sets empty flag for each facet', function() {
        var emptyFacet = service.facets[1];
        expect(emptyFacet.empty).toBeTruthy();
        expect(firstFacet.empty).toBeFalsy();
      });

      it('sets the initial limit to 5 values per facet', function() {
        expect(firstFacet.limit).toBe(5);
      });

      describe('on the vendor facet,', function() {
        it('orders vendors by descending number of total hits', function() {
          var vendorFacet = service.facets[2];
          expect(vendorFacet.name).toEqual('vendor_name');
          expect(vendorFacet.data).toEqual([
            ['Rugbis', '5/55', 55],
            ['Odyssée', '18/20', 20]
          ]);
        });

        it('appends total hits to each vendor hits',
        function() {
          var vendorFacet = service.facets[2];
          expect(vendorFacet.data[0][1]).toEqual('5/55');
          expect(vendorFacet.data[1][1]).toEqual('18/20');
        });

      });
    });

    describe('#reset', function() {
      it('resets facets', function() {
        service.extract({
          facette: [{
            name: 'lang',
            data: [['English', 27], ['Francais', 8], ['Non determinee', 4]]
          }]
        });
        service.reset();
        expect(service.facets.length).toBe(0);
      });
    });
  });

});
