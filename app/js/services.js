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

      firstTime: true,

      _concatParams: function(collection, formalParam) {
        var paramString = '';
        collection.forEach(function(item) {
          paramString = paramString.concat('&', formalParam, '[]=', item)
        });
        return paramString;
      },

      search: function(queryInput) {
        var self = this;
        var queryTerm = escape(queryInput);
        var queryCols = this._concatParams(Collections.ids, 'cols');
        var request = '/json/Search?query[string1]=' + queryTerm + queryCols + '&query[field_filter1]=keyword&query[start]=None&query[max]=25&filter=&sort_value=None&query[mod]=new_search&tab_template=ALL&search_group=12&listCG_selected=None&log_cxt=search';
        return $http.get(request).success(function(data) {
          self.jobIds = data.results.jobs_id;
          self._checkJobs(self.jobIds, 0);
        }).then(function(answer) {
          return answer.data.results.jobs_id;
        });
      },

      _checkJobs: function(jobIds, delay) {
        var self = this;
        var reqDelay = delay | 5000;
        var done = 0;
        $timeout(function() {
            var reqJobs = self._concatParams(jobIds, 'id');
            var request = '/json/CheckJobStatus?' + reqJobs;
            $http.get(request).success(function(data) {
              data.results.forEach(function(result) {
                if( ! result.status ) {
                  done = done + 1;
                }
                // console.log(result.target_name + ' ' + result.status + ' ' + result.total_hits);
              });
              console.log(done + '/' + self.jobIds.length);
              console.log('######################');
            });
            if( self.firstTime ){
              self.firstTime = false;
              self._checkJobs(jobIds);
            }
          },
          reqDelay);
      }
    }
  });
