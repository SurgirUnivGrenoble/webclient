'use strict';

/* Services */

angular.module('surgir.libraryfind', []).

  factory('Collections', function($http) {
    var collections = {
      ids: [],
      fetch: function(groupName) {
        var self = this;
        self.ids.length = 0;
        $http.get('/json/GetGroupMembers?name=' + groupName).success(function(data) {
          var rawIds = data.results.member_ids;
          for (var i=0; i<rawIds.length; i++) {
            self.ids.push(rawIds[i].substr(1));
          }
        });
        return this;
      }
    };
    return collections;
  }).

  factory('LibraryFind', function($http, $timeout, Collections) {
    return {
      jobIds: [],

      pastDoneJobs: 0,

      response: {
        hits: 0,
        results: []
      },

      startTimestamp: 0,

      _concatParams: function(collection, formalParam, keepFirstAmpersand) {
        var firstAmpersand = keepFirstAmpersand || false;
        var paramString = '';
        collection.forEach(function(item) {
          paramString = paramString.concat('&', formalParam, '[]=', item)
        });
        if( firstAmpersand ) {
          return paramString;
        } else {
          return paramString.slice(1, paramString.length);
        }
      },

      _elaspedTime: function() {
        return new Date().getTime() - this.startTimestamp;
      },

      search: function(queryInput, params) {
        var self = this;
        this.pastDoneJobs = 0;
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
              if( pollNb < self.nbPolls ){
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

      _getDoneJobs: function(results) {
        var done = 0;
        for( var i=0 ; i < results.length ; i++) {
          if( ! results[i].status ) { done += 1 }
        }
        return done;
      },

      _logPoll: function(done, pollNb) {
        console.log('Poll ' + pollNb + ' - done: '
                    + done + '/' + this.jobIds.length
                    + ' (' + this._elaspedTime() + 'ms)');
      },

      _getRecords: function(stopSearch) {
        var self = this;
        var request = '/json/GetJobRecord?' + this._concatParams(this.jobIds, 'id')
                      + '&stop_search=' + stopSearch
                      + '&max=' + this.maxResults
                      + '&page_size=' + this.pageSize
                      + '&notice_display=0'
                      + '&with_facette=' + this.displayFacettes
                      + '&page=1&sort=relevance&log_action_txt=&log_cxt_txt=&log_cxt=search';
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
        var request = '/json/GetJobRecord?' + this._concatParams(this.jobIds, 'id')
                      + '&stop_search=0&max=&page_size=1&notice_display=1&with_facette=0'
                      + '&page=' + pageIndex
                      + '&sort=relevance&log_action_txt=&log_cxt_txt=';
        return $http.get(request).then(function(answer) {
          console.log('Notice num ' + pageIndex)
          console.log(answer.data.results.current);
          return answer.data.results.current;
        });
      },

      getPermalinkNotice: function(noticeId) {
        var ids = noticeId.split(';');
        var request = '/json/GetId?&log_action=consult&log_cxt=notice&idDoc='
                      + ids[0] + '&idCollection=' + ids[1] + '&idSearch=' + ids[2];
        return $http.get(request).then(function(answer) {
          console.log('Notice id ' + noticeId)
          console.log(answer.data.results);
          return answer.data.results;
        });
      }
    }
  });
