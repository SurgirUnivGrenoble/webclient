'use strict';

angular.module('surgir.search').factory('RecordRetriever',
  ['$http', 'SearchParams', 'Jobs', 'Results', 'Facets',
  function($http, search, Jobs, Results, Facets) {
    return {
      fetchPartialResults: function() {
        this._fetchRecords(0, '');
      },

      fetchFinalResults: function() {
        this._fetchRecords(1, '');
      },

      filterResults: function() {
        this._fetchRecords(0, Facets.asParamString());
      },

      _fetchRecords: function(stopSearch, facetsParam) {
        var request = '/json/GetJobRecord?' + Jobs.asParamString() +
                      '&stop_search=' + stopSearch +
                      '&max=' + search.maxResults +
                      '&page_size=' + search.pageSize +
                      facetsParam +
                      '&with_facette=' + search.retrieveFacettes +
                      '&notice_display=0&page=1&sort=relevance' +
                      '&log_action_txt=&log_cxt_txt=&log_cxt=search';
        $http.get(request).success(function(data) {
          Results.store(data.results);
        });
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
