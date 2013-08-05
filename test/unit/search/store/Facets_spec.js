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
  });

});
