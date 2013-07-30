describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('Collections', function() {
    var collections, $httpBackend;

    beforeEach(
      inject(function($injector, _$httpBackend_) {
        _$httpBackend_.
          whenGET('/json/GetGroupMembers?name=Bibliotheques_de_Grenoble').
          respond({'results': {'member_ids': ['c1', 'c31']}});
        collections = $injector.get('Collections');
        _$httpBackend_.flush();
      })
    );

    describe('#ids', function() {
      it('should contain the number ids of the group collections', function() {
        expect(collections.ids).toEqual(['1', '31']);
      });
    });
  });

});
