'use strict';

angular.module('surgir.permalink', []).factory('Permalink',
  ['$http', function($http) {
    return {
      getNotice: function(noticeId) {
        var ids = noticeId.split(';');
        var request = '/json/GetId?log_action=consult&log_cxt=notice&idDoc=' +
                    ids[0] + '&idCollection=' + ids[1] + '&idSearch=' + ids[2];
        return $http.get(request).then(function(answer) {
          return answer.data.results;
        });
      }
    };
  }]);
