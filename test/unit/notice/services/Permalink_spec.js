describe('surgir.notice', function() {
  beforeEach(module('surgir.notice'));

  describe('Permalink', function() {
    var service, $httpBackend;

    beforeEach(inject(function($injector, _$httpBackend_) {
        service = $injector.get('Permalink');
        $httpBackend = _$httpBackend_;
      })
    );

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('#getNotice', function() {
      it('send a notice request to the server', function() {
        $httpBackend.expectGET(
          '/json/GetId?log_action=consult&log_cxt=notice' +
          '&idDoc=oai:quod.lib.umich.edu:MIU01-010308521' +
          '&idCollection=53&idSearch=19453').
          respond({results: {}});
        service.getNotice('oai:quod.lib.umich.edu:MIU01-010308521;53;19453');
        $httpBackend.flush();
      });
    });
  });

});
