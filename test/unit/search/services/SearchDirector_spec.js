describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('SearchDirector', function() {
    var service, $httpBackend, $timeout,
        mockParams, mockJobs, mockRecordRetriever;

    mockParams = {
      maxNbPolls: 2,
      pollingInterval: 0,
      maxResults: 25
    };

    mockJobs = {
      reset: function() {},
      asParamString: function() { return 'id[]=123&id[]=456'; },
      checkDone: function() { return false; },
      allDone: function() { return false; }
    };

    mockRecordRetriever = {
      fetchFinalResults: function() {},
      fetchPartialResults: function() {}
    };

    beforeEach(module(function($provide) {
      $provide.value('SearchParams', mockParams);
      $provide.value('Collections', {
        asParamString: function() { return '&cols[]=1&cols[]=31'; }
      });
      $provide.value('Jobs', mockJobs);
      $provide.value('RecordRetriever', mockRecordRetriever);
      $provide.value('InProgress', { start: function() {} });
    }));

    beforeEach(inject(function($injector, _$httpBackend_, _$timeout_) {
        service = $injector.get('SearchDirector');
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;
      })
    );

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      // should trow no "No deferred tasks to be flushed"
      // if not there are some pending tasks in tests
      expect(function() {$timeout.flush();}).toThrow();
      // In angular 1.1.*, use $timeout.verifyNoPendingTasks();
    });

    describe('#search', function() {
      it('send a search request to the server', function() {
        $httpBackend.expectGET(
            '/json/Search?query[string1]=something&cols[]=1&cols[]=31' +
            '&query[max]=25&query[field_filter1]=keyword&query[start]=None' +
            '&filter=&sort_value=None&query[mod]=new_search&tab_template=ALL' +
            '&search_group=12&listCG_selected=None&log_cxt=search').
          respond({results: {jobs_id: []}});
        service.search('something');
        $httpBackend.flush();
      });

      describe('when a search request is launched,', function() {
        beforeEach(function() {
          $httpBackend.whenGET(
            '/json/Search?query[string1]=something&cols[]=1&cols[]=31' +
            '&query[max]=25&query[field_filter1]=keyword&query[start]=None' +
            '&filter=&sort_value=None&query[mod]=new_search&tab_template=ALL' +
            '&search_group=12&listCG_selected=None&log_cxt=search').
          respond({results: {jobs_id: []}});

          $httpBackend.whenGET('/json/CheckJobStatus?id[]=123&id[]=456').
            respond({results: []});
        });

        var flushPolls = function(times) {
          for (var i = 0; i < times; i++) {
            $timeout.flush();
            $httpBackend.flush();
          }
        };

        it('poll the server for done jobs', function() {
          service.search('something');
          $httpBackend.flush();
          $httpBackend.expectGET('/json/CheckJobStatus?id[]=123&id[]=456').
            respond({});
          flushPolls(2);
        });

        it('stop polling when all jobs are done', function() {
          spyOn(mockJobs, 'allDone').andReturn(true);
          spyOn(mockJobs, 'checkDone');

          service.search('something');
          $httpBackend.flush();
          flushPolls(1);

          expect(mockJobs.checkDone.callCount).toEqual(1);
        });

        it('should stop polling when the max number of polls is reached',
        function() {
          mockParams.maxNbPolls = 3;
          spyOn(mockJobs, 'checkDone');

          service.search('something');
          $httpBackend.flush();
          flushPolls(3);

          expect(mockJobs.checkDone.callCount).toEqual(3);
          mockParams.maxNbPolls = 2;
        });

        it('should request partial results when new jobs are done', function() {
          spyOn(mockRecordRetriever, 'fetchPartialResults');
          spyOn(mockJobs, 'checkDone').andReturn(true);

          service.search('something');
          $httpBackend.flush();
          flushPolls(2);

          expect(mockRecordRetriever.fetchPartialResults).toHaveBeenCalled();
        });

        it('should request final results when polling stops', function() {
          spyOn(mockRecordRetriever, 'fetchFinalResults');

          service.search('something');
          $httpBackend.flush();
          flushPolls(2);

          expect(mockRecordRetriever.fetchFinalResults.callCount).toEqual(1);
        });
      });
    });
  });

});
