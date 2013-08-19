describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('AutoComplete', function() {
    var service, $httpBackend;

    beforeEach(inject(function($injector, _$httpBackend_) {
        service = $injector.get('AutoComplete');
        $httpBackend = _$httpBackend_;
      })
    );

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('#lookup', function() {
      it('send an autocomplete request to the server', function() {
        $httpBackend.expectGET('/json/AutoComplete?word=russ&field=keyword').
          respond({results: []});
        service.lookup('russ');
        $httpBackend.flush();
      });
    });
  });

});
