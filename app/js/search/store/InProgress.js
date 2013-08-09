'use strict';

angular.module('surgir.search').factory('InProgress', [function() {
  return {
    running: false,

    start: function() {
      this.running = true;
    },

    done: function() {
      this.running = false;
    }
  };
}]);
