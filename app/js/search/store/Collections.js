'use strict';

angular.module('surgir.search').factory('Collections',
  ['$http', 'params', function($http, params) {
    return {
      ids: [],

      fetch: function(groupName) {
        this.ids.length = 0;
        $http.get('/json/GetGroupMembers?name=' + groupName).
          success(function(data) {
            var rawIds = data.results.member_ids;
            for (var i = 0; i < rawIds.length; i++) {
              this.ids.push(rawIds[i].substr(1));
            }
          }.bind(this));
      },

      asParamString: function(keepAmpersand) {
        return params.concat(this.ids, 'cols', keepAmpersand);
      }
    };
  }]);
