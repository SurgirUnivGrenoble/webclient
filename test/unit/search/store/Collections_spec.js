describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('Collections', function() {
    var collections, $httpBackend;

    beforeEach(
      inject(function($injector, _$httpBackend_) {
        collections = $injector.get('Collections');
        $httpBackend = _$httpBackend_;
        $httpBackend.
          whenGET('/json/GetGroupMembers?name=Bibliotheques_de_Grenoble').
          respond({'results': {'member_ids': ['c1', 'c31']}});
      })
    );

    describe('#fetch', function() {
      it('should retrieve and update the ids of group collections', function() {
        collections.fetch('Bibliotheques_de_Grenoble');
        $httpBackend.flush();
        expect(collections.ids).toEqual(['1', '31']);
      });
    });

    describe('#asParamString', function() {
      it('returns collection ids as a parameter string', function() {
        collections.ids = ['1', '31'];
        expect(collections.asParamString()).toEqual('cols[]=1&cols[]=31');
        expect(collections.asParamString(true)).toEqual('&cols[]=1&cols[]=31');
      });
    });
  });

});
