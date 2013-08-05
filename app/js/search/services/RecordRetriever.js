'use strict';

angular.module('surgir.search').factory('RecordRetriever',
  ['$http', 'SearchParams', 'Jobs', 'Results', 'Facets',
  function($http, search, Jobs, Results, Facets) {
    return {
      fetchPartialResults: function() {
        this._fetchNewRecords(0);
      },

      fetchFinalResults: function() {
        this._fetchNewRecords(1);
      },

      filterResults: function() {
        this._fetchNewRecords(0, Facets.asParamString());
      },

      _fetchNewRecords: function(stopSearch, facetsParam, pageIndex) {
        this._fetchRecords(stopSearch, facetsParam, pageIndex).
          success(function(data) {
            Results.store(data.results);
          });
      },

      fetchMoreResults: function() {
        this._fetchRecords(0, Facets.asParamString(), Results.pageIndex + 1).
          success(function(data) {
            Results.concat(data.results);
          });
      },

      _fetchRecords: function(stopSearch, facetsParam, pageIndex) {
        var request = '/json/GetJobRecord?' + Jobs.asParamString() +
                      '&stop_search=' + stopSearch +
                      '&max=' + search.maxResults +
                      '&page=' + (pageIndex || 1) +
                      '&page_size=' + search.pageSize +
                      (facetsParam || '') +
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
