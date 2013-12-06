describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('Facets', function() {
    var service;

    beforeEach(inject(function($injector) {
      service = $injector.get('Facets');
    }));

    describe('@facets', function() {
      it('returns 6 facets in a specific order', function() {
        expect(service.facets[0].name).toEqual('date');
        expect(service.facets[1].name).toEqual('author');
        expect(service.facets[2].name).toEqual('vendor_name');
        expect(service.facets[3].name).toEqual('lang');
        expect(service.facets[4].name).toEqual('material_type');
        expect(service.facets[5].name).toEqual('subject');
      });

      it('has a french name for each facet', function() {
        expect(service.facets[0].frenchName).toEqual('Dates');
        expect(service.facets[1].frenchName).toEqual('Auteurs');
        expect(service.facets[2].frenchName).toEqual('Bases de recherche');
        expect(service.facets[3].frenchName).toEqual('Langues');
        expect(service.facets[4].frenchName).toEqual('Types de document');
        expect(service.facets[5].frenchName).toEqual('Sujets');
      });
    });

    describe('#extract', function() {
      var langFacet, vendorFacet, lang;
      lang = [['en', 27], ['fr', 8], ['na', 4],
              ['de', 1], ['es', 1], ['it', 1]];

      beforeEach(function() {
        service.reset();
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
        vendorFacet = service.facets[2];
        langFacet = service.facets[3];
      });

      it('updates each facet with given values', function() {
        expect(service.facets.length).toEqual(6);
        expect(langFacet.data).toEqual(lang);
        expect(vendorFacet.data.length).toBe(2);
        expect(service.facets[0].data.length).toBe(0);
      });

      it("sets the 'more' flag for facets with more than 5 values", function() {
        expect(langFacet.more).toBeTruthy();
        expect(vendorFacet.more).toBeFalsy();
      });

      describe('on the vendor facet,', function() {
        it('orders vendors by descending number of total hits', function() {
          expect(vendorFacet.name).toEqual('vendor_name');
          expect(vendorFacet.data).toEqual([
            ['Rugbis', '5/55', 55],
            ['Odyssée', '18/20', 20]
          ]);
        });

        it('appends total hits to each vendor hits',
        function() {
          expect(vendorFacet.data[0][1]).toEqual('5/55');
          expect(vendorFacet.data[1][1]).toEqual('18/20');
        });

      });
    });

    describe('#reset', function() {
      it('resets facets value', function() {
        service.extract({
          facette: [{
            name: 'lang',
            data: [['English', 27], ['Francais', 8], ['Non determinee', 4]]
          }]
        });
        service.reset();
        expect(service.facets[3].data.length).toBe(0);
      });

      it('resets facets limit to 5', function() {
        service.reset();
        expect(service.facets[3].limit).toEqual(5);
      });
    });
  });

});
