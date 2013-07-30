'use strict';

angular.module('surgir.search').factory('RecordRetriever',
  ['$http', 'SearchParams', 'params', function($http, search, params) {
    return {
      _getRecords: function(stopSearch) {
        var self = this;
        var request = '/json/GetJobRecord?' + params.concat(this.jobIds, 'id')
                    + '&stop_search=' + stopSearch
                    + '&max=' + search.maxResults
                    + '&page_size=' + search.pageSize
                    + '&with_facette=' + search.displayFacettes
                    + '&notice_display=0&page=1&sort=relevance'
                    + '&log_action_txt=&log_cxt_txt=&log_cxt=search';
        $http.get(request).success(function(data) {
          if( stopSearch ) {
            console.log('Final results')
          } else {
            console.log('New results')
          }
          console.log(data.results);
          angular.extend(self.response, data.results);
          // self.results.length = 0;
          // self.results.push.apply(self.results, data.results.results)
        });
      },

      getRecordNotice: function(pageIndex) {
        var self = this;
        var request = '/json/GetJobRecord?' + params.concat(this.jobIds, 'id')
                    + '&page=' + pageIndex
                    + '&stop_search=0&max=&page_size=1&notice_display=1&with_facette=0'
                    + '&sort=relevance&log_action_txt=&log_cxt_txt=';
        return $http.get(request).then(function(answer) {
          console.log('Notice num ' + pageIndex)
          console.log(answer.data.results.current);
          return answer.data.results.current;
        });
      }
    };
  }]);
