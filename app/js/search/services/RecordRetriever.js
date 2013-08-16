'use strict';

angular.module('surgir.search').factory('RecordRetriever',
['$http', 'SearchParams', 'Jobs', 'Results', 'Filters', 'InProgress',
  function($http, search, Jobs, Results, Filters, InProgress) {
    return {
      startNewSearch: function() {
        InProgress.start();
      },

      fetchPartialResults: function() {
        this._fetchNewRecords(false, 0);
      },

      fetchFinalResults: function() {
        this._fetchNewRecords(true, 1);
      },

      filterResults: function() {
        this._fetchNewRecords(true, 0, Filters.asParamString());
      },

      _fetchNewRecords: function(done, stopSearch, filtersParam, pageIndex) {
        this._fetchRecords(stopSearch, filtersParam, pageIndex).
          success(function(data) {
            if (done) { InProgress.done(); }
            Results.store(data.results);
          });
      },

      fetchMoreResults: function() {
        this._fetchRecords(0, Filters.asParamString(), Results.pageIndex + 1).
          success(function(data) {
            InProgress.done();
            Results.concat(data.results);
          });
      },

      _fetchRecords: function(stopSearch, filtersParam, pageIndex) {
        InProgress.start();
        var request = '/json/GetJobRecord?' + Jobs.asParamString() +
                      '&stop_search=' + stopSearch +
                      '&max=' + search.maxResults +
                      '&page=' + (pageIndex || 1) +
                      '&page_size=' + search.pageSize +
                      (filtersParam || '') +
                      '&with_facette=' + search.retrieveFacettes +
                      '&notice_display=0&sort=relevance' +
                      '&log_action_txt=&log_cxt_txt=&log_cxt=search';
        return $http.get(request);
      },

      getRecordNotice: function(pageIndex) {
        var request = '/json/GetJobRecord?' + Jobs.asParamString() +
                      '&notice_display=1&page=' + pageIndex +
                      '&stop_search=0&max=&page_size=1&with_facette=0' +
                      '&sort=relevance&log_action_txt=&log_cxt_txt=';
        return $http.get(request).then(function(answer) {
          return answer.data.results.current;
        });
      }
    };
  }]);
