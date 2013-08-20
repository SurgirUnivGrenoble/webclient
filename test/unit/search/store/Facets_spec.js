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
      var firstFacet, secondFacet, lang;
      lang = [['en', 27], ['fr', 8], ['na', 4],
              ['de', 1], ['es', 1], ['it', 1]];

      beforeEach(function() {
        service.extract({
          facette: [{
            name: 'lang',
            data: lang
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
        secondFacet = service.facets[1];
      });

      it('extracts non-empty facets from results', function() {
        expect(service.facets.length).toEqual(2);
        expect(firstFacet.name).toEqual('lang');
        expect(secondFacet.name).toEqual('vendor_name');
        expect(firstFacet.data).
          toEqual(lang);
      });

      it('sets french names for each facet', function() {
        expect(firstFacet.frenchName).toEqual('Langues');
      });

      it("sets the 'more' flag for facets with more than 5 values", function() {
        expect(firstFacet.more).toBeTruthy();
        expect(secondFacet.more).toBeFalsy();
      });

      it('sets the initial limit to 5 values per facet', function() {
        expect(firstFacet.limit).toBe(5);
      });

      describe('on the vendor facet,', function() {
        it('orders vendors by descending number of total hits', function() {
          expect(secondFacet.name).toEqual('vendor_name');
          expect(secondFacet.data).toEqual([
            ['Rugbis', '5/55', 55],
            ['Odyssée', '18/20', 20]
          ]);
        });

        it('appends total hits to each vendor hits',
        function() {
          expect(secondFacet.data[0][1]).toEqual('5/55');
          expect(secondFacet.data[1][1]).toEqual('18/20');
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
