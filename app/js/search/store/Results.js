'use strict';

angular.module('surgir.search').factory('Results',
  [function() {
    return {

      response: {
        hits: 0,
        results: []
      },

    };
  }]);
