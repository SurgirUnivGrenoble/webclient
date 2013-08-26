'use strict';

angular.module('surgir.search').factory('RecordRetriever',
['$http', 'SearchParams', 'Jobs', 'Results', 'Filters', 'InProgress',
  function($http, search, Jobs, Results, Filters, InProgress) {
    return {
      startNewSearch: function() {
        InProgress.start();
        Results.reset();
        Filters.reset();
      },

      fetchPartialResults: function() {
        this._fetchNewRecords(false, 0);
      },

      fetchFinalResults: function() {
        this._fetchNewRecords(true, 1);
      },

      filterResults: function() {
        Results.reset();
        this._fetchNewRecords(true, 0, Filters.asParamString());
      },

      _fetchNewRecords: function(done, stopSearch, filtersParam) {
        this._fetchRecords(stopSearch, filtersParam, 1).
          success(function(data) {
            if (done) { InProgress.done(); }
            Results.store(data.results);
          });
      },

      fetchMoreResults: function() {
        this._fetchRecords(0,
                           Filters.asParamString(),
                           0,
                           Results.pageIndex + 1).
          success(function(data) {
            InProgress.done();
            Results.concat(data.results);
          });
      },

      _fetchRecords: function(stopSearch, filtersParam, withFacets, pageIndex) {
        InProgress.start();
        var request = '/json/GetJobRecord?' + Jobs.asParamString() +
                      '&stop_search=' + stopSearch +
                      '&max=' + search.maxResults +
                      '&page=' + (pageIndex || 1) +
                      '&page_size=' + search.pageSize +
                      (filtersParam || '') +
                      '&with_facette=' + withFacets +
                      '&notice_display=0&sort=relevance' +
                      '&log_action_txt=&log_cxt_txt=&log_cxt=search';
        return $http.get(request);
      },

      getRecordNotice: function(pageIndex) {
        var request = '/json/GetJobRecord?' + Jobs.asParamString() +
                      '&notice_display=1&page=' + pageIndex +
                      Filters.asParamString(true) +
                      '&stop_search=0&max=&page_size=1&with_facette=0' +
                      '&sort=relevance&log_action_txt=&log_cxt_txt=';
        return $http.get(request).then(function(answer) {
          return answer.data.results.current;
        });
      }
    };
  }]);
