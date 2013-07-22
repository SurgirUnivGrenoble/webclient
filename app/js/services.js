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

      results: [],

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

      search: function(queryInput, params) {
        var self = this;
        this.results = [];
        this.startTimestamp = new Date().getTime();
        angular.extend(this, params);

        var queryTerm = escape(queryInput);
        var queryCols = this._concatParams(Collections.ids, 'cols', true);
        var request = '/json/Search?query[string1]=' + queryTerm + queryCols + '&query[field_filter1]=keyword&query[start]=None&query[max]=' + this.maxResults + '&filter=&sort_value=None&query[mod]=new_search&tab_template=ALL&search_group=12&listCG_selected=None&log_cxt=search';
        return $http.get(request).success(function(data) {
          self.jobIds = data.results.jobs_id;
          console.log('Request done - Starting jobs polling');
          self._checkJobs(self.jobIds, 0, 1);
        }).then(function(answer) {
          return self.results;
        });
      },

      _checkJobs: function(jobIds, pollNb, delay) {
        var self = this;
        var reqDelay = delay || this.pollInterval;
        $timeout(function() {
            var request = '/json/CheckJobStatus?' + self._concatParams(jobIds, 'id');
            $http.get(request).success(function(data) {
              pollNb += 1;
              self._displayJobResults(data.results, pollNb);
              if( pollNb < self.nbPolls ){
                self._checkJobs(jobIds, pollNb);
                self._getRecords(0);
              } else {
                self._getRecords(1);
              }
            });
          },
          reqDelay);
      },

      _displayJobResults: function(results, pollNb) {
        var done = 0;
        results.forEach(function(result) {
          // if( !this.results.hasOwnProperty(result.job_id) ){
          //   this.results[result.job_id] = {
          //     name: result.target_name,
          //     hits: []
          //   }
          // }
          // this.results[result.job_id].hits.push(result)
          if( ! result.status ) {
            done = done + 1;
          }
        }.bind(this));
        console.log(pollNb + ': '
                    + done + '/' + this.jobIds.length
                    + ' (' + (new Date().getTime() - this.startTimestamp) + 'ms)');
      },

      _getRecords: function(stopSearch) {
        var self = this;
        var request = '/json/GetJobRecord?' + this._concatParams(this.jobIds, 'id')
                      + '&stop_search=' + stopSearch
                      + '&max=' + this.maxResults
                      + '&page_size=' + this.pageSize
                      + '&notice_display=' + this.displayNotices
                      + '&with_facette=' + this.displayFacettes
                      + '&page=1&sort=relevance&log_action_txt=&log_cxt_txt=&log_cxt=search';
        $http.get(request).success(function(data) {
          console.log(data.results)
          self.results.length = 0;
          self.results.push.apply(self.results, data.results.results)
        });
      }
    }
  });
