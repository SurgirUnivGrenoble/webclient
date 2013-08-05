describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('RecordRetriever', function() {
    var service, $httpBackend, mockParams, mockFacets;

    mockParams = {
      maxResults: 25,
      pageSize: 10,
      retrieveFacettes: 1
    };

    mockFacets = {
      asParamString: function() { return ''; }
    };

    beforeEach(module(function($provide) {
      $provide.value('SearchParams', mockParams);
      $provide.value('Jobs', {
        asParamString: function() { return 'id[]=123&id[]=456'; }
      });
      $provide.value('Results', { store: function() {} });
      $provide.value('Facets', mockFacets);
    }));

    beforeEach(inject(function($injector, _$httpBackend_) {
        service = $injector.get('RecordRetriever');
        $httpBackend = _$httpBackend_;
      })
    );

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    describe('#fetchPartialResults', function() {
      it('send a search request to the server', function() {
        $httpBackend.expectGET(
          '/json/GetJobRecord?id[]=123&id[]=456&stop_search=0' +
          '&max=25&page_size=10&with_facette=1&notice_display=0&page=1' +
          '&sort=relevance&log_action_txt=&log_cxt_txt=&log_cxt=search').
          respond({});
        service.fetchPartialResults();
        $httpBackend.flush();
      });
    });

    describe('#fetchFinalResults', function() {
      it('send a search request to the server', function() {
        $httpBackend.expectGET(
          '/json/GetJobRecord?id[]=123&id[]=456&stop_search=1' +
          '&max=25&page_size=10&with_facette=1&notice_display=0&page=1' +
          '&sort=relevance&log_action_txt=&log_cxt_txt=&log_cxt=search').
          respond({});
        service.fetchFinalResults();
        $httpBackend.flush();
      });
    });

    describe('#filterResults', function() {
      it('send a search request with defined filters to the server',
      function() {
        spyOn(mockFacets, 'asParamString').
          andReturn('&filter[]=date--2013&log_action=facette');
        $httpBackend.expectGET(
          '/json/GetJobRecord?id[]=123&id[]=456&stop_search=0' +
          '&max=25&page_size=10&filter[]=date--2013&log_action=facette' +
          '&with_facette=1&notice_display=0&page=1' +
          '&sort=relevance&log_action_txt=&log_cxt_txt=&log_cxt=search').
          respond({});
        service.filterResults();
        $httpBackend.flush();
      });
    });

    describe('#getRecordNotice', function() {
      it('send a search request to the server', function() {
        $httpBackend.expectGET(
          '/json/GetJobRecord?id[]=123&id[]=456&notice_display=1' +
          '&page=5&stop_search=0&max=&page_size=1&with_facette=0' +
          '&sort=relevance&log_action_txt=&log_cxt_txt=').
          respond({results: {current: {}}});
        service.getRecordNotice(5);
        $httpBackend.flush();
      });
    });
  });

});
