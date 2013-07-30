'use strict';

angular.module('surgir.search').factory('SearchDirector',
  ['$http', '$timeout', 'Collections', function($http, $timeout, Collections) {
    return {
      startTimestamp: 0,

      _elaspedTime: function() {
        return new Date().getTime() - this.startTimestamp;
      },

      search: function(queryInput, params) {
        var self = this;
        this.startTimestamp = new Date().getTime();
        angular.extend(this, params);

        var queryTerm = escape(queryInput);
        var queryCols = this._concatParams(Collections.ids, 'cols', true);
        var request = '/json/Search?query[string1]=' + queryTerm + queryCols + '&query[max]=' + this.maxResults + '&query[field_filter1]=keyword&query[start]=None&filter=&sort_value=None&query[mod]=new_search&tab_template=ALL&search_group=12&listCG_selected=None&log_cxt=search';
        return $http.get(request).success(function(data) {
          self.jobIds = data.results.jobs_id;
          console.log('Request done - Starting jobs polling ' + self._elaspedTime() + 'ms');
          self._checkJobs(self.jobIds, 0, 1);
        }).then(function(answer) {
          return self.response;
        });
      },

      _checkJobs: function(jobIds, pollNb, delay) {
        var self = this;
        var reqDelay = delay || this.pollInterval;
        $timeout(function() {
            var request = '/json/CheckJobStatus?' + self._concatParams(jobIds, 'id');
            $http.get(request).success(function(data) {
              pollNb += 1;
              var doneJobs = self._getDoneJobs(data.results);
              self._logPoll(doneJobs, pollNb);
              if( pollNb < self.nbPolls && doneJobs < jobIds.length ){
                self._checkJobs(jobIds, pollNb);
                if( self.pastDoneJobs < doneJobs ){
                  self.pastDoneJobs = doneJobs;
                  self._getRecords(0);
                }
              } else {
                self._getRecords(1);
              }
            });
          },
          reqDelay);
      },

      _logPoll: function(done, pollNb) {
        console.log('Poll ' + pollNb + ' - done: '
                    + done + '/' + this.jobIds.length
                    + ' (' + this._elaspedTime() + 'ms)');
      }
    }
  }]);
