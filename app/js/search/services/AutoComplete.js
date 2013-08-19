'use strict';

angular.module('surgir.search').factory('AutoComplete',
['$http', function($http) {
  return {
    lookup: function(queryInput) {
      var request = '/json/AutoComplete?word=' + escape(queryInput) +
                    '&field=keyword';
      return $http.get(request).then(function(answer) {
        return answer.data.results;
      });
    }
  };
}]);
