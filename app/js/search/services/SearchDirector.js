'use strict';

angular.module('surgir.search').factory('SearchDirector',
['$http', '$timeout', 'SearchParams', 'Collections', 'Jobs', 'RecordRetriever',
function($http, $timeout, search, Collections, Jobs, Records) {
  return {
    queryInput: '',

    search: function(queryInput) {
      this.queryInput = queryInput;
      var queryTerm = encodeURIComponent(queryInput);
      var request = '/json/Search?query[string1]=' +
                    queryTerm +
                    Collections.asParamString(true) +
                    '&query[max]=' + search.maxResults +
                    '&query[field_filter1]=keyword&query[start]=None' +
                    '&filter=&sort_value=None&query[mod]=new_search&' +
                    'tab_template=ALL&search_group=12&listCG_selected=None' +
                    '&log_cxt=search';
      Records.startNewSearch();
      $http.get(request).success(function(data) {
        Jobs.reset(data.results.jobs_id);
        var request = '/json/CheckJobStatus?' + Jobs.asParamString();
        this._pollJobs(request, 0, 0);
      }.bind(this));
    },

    _pollJobs: function(request, pollNb, delay) {
      this.timeoutPromise = $timeout(function() {
          $http.get(request).success(function(data) {
            var newlyDoneJobs = Jobs.checkDone(data.results || []);
            if (this._stopPolling(pollNb + 1)) {
              Records.fetchFinalResults();
            } else {
              this._pollJobs(request, pollNb + 1, search.pollingInterval);
              if (newlyDoneJobs) {
                Records.fetchPartialResults();
              }
            }
          }.bind(this));
        }.bind(this),
        delay);
    },

    _stopPolling: function(pollNb) {
      return pollNb == search.maxNbPolls || Jobs.allDone();
    },

    reset: function() {
      this.queryInput = '';
      Records.reset();
    },

    cancel: function() {
      if (this.timeoutPromise) {
        $timeout.cancel(this.timeoutPromise);
      }
    }
  };
}]);
