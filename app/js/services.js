'use strict';

/* Services */

angular.module('surgir.libraryfind', []).

  factory('Collections', function($http) {
    var collections = {
      ids: [],
      fetch: function() {
        var self = this;
        $http.get('/json/GetGroupMembers?name=Partout').success(function(data) {
          var rawIds = data.results.member_ids;
          for (var i=0; i<rawIds.length; i++) {
            self.ids.push(rawIds[i].substr(1));
          }
        });
        return this;
      }
    };
    return collections.fetch();
  }).

  factory('LibraryFind', function($http, $timeout, Collections) {
    return {
      jobIds: [],

      polls: 0,

      results: [],

      startTimestamp: 0,

      _concatParams: function(collection, formalParam, includeFirstAmpersand) {
        var firstAmpersand = includeFirstAmpersand || false;
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

      search: function(queryInput, maxResults, nbPolls, pollInterval) {
        var self = this;
        this.results = {};
        this.polls = 0;
        this.startTimestamp = new Date().getTime();

        this.nbPolls = nbPolls;
        this.pollInterval = pollInterval;

        var queryTerm = escape(queryInput);
        var queryCols = this._concatParams(Collections.ids, 'cols', true);
        var request = '/json/Search?query[string1]=' + queryTerm + queryCols + '&query[field_filter1]=keyword&query[start]=None&query[max]=' + maxResults + '&filter=&sort_value=None&query[mod]=new_search&tab_template=ALL&search_group=12&listCG_selected=None&log_cxt=search';
        return $http.get(request).success(function(data) {
          self.jobIds = data.results.jobs_id;
          console.log('Request done - Starting jobs polling');
          self._checkJobs(self.jobIds, 1);
        }).then(function(answer) {
          return self.results;
        });
      },

      _checkJobs: function(jobIds, delay) {
        var self = this;
        var reqDelay = delay || this.pollInterval;
        $timeout(function() {
            var request = '/json/CheckJobStatus?' + self._concatParams(jobIds, 'id');
            $http.get(request).success(function(data) {
              self._displayJobResults(data.results);
            });
            if( self.polls < self.nbPolls ){
              self.polls += 1;
              self._checkJobs(jobIds);
            }
          },
          reqDelay);
      },

      _displayJobResults: function(results) {
        var done = 0;
        results.forEach(function(result) {
          if( !this.results.hasOwnProperty(result.job_id) ){
            this.results[result.job_id] = {
              name: result.target_name,
              hits: []
            }
          }
          this.results[result.job_id].hits.push(result)
          if( ! result.status ) {
            done = done + 1;
          }
        }.bind(this));
        console.log(this.polls + ': '
                    + done + '/' + this.jobIds.length
                    + ' (' + (new Date().getTime() - this.startTimestamp) + 'ms)');
      }
    }
  });
