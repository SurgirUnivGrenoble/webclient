'use strict';

angular.module('surgir.search').factory('Jobs',
  ['params', function(params) {
    return {
      ids: [],
      done: 0,

      reset: function(jobIds) {
        this.ids = jobIds;
        this.done = 0;
      },

      asParamString: function(keepAmpersand) {
        return params.concat(this.ids, 'id', keepAmpersand);
      },

      checkDone: function(jobStatus) {
        var newlyDone = this._checkDoneStatus(jobStatus);
        if (newlyDone > this.done) {
          this.done = newlyDone;
          return true;
        } else {
          return false;
        }
      },

      allDone: function() {
        return this.done == this.ids.length;
      },

      _checkDoneStatus: function(jobStatus) {
        var done = 0;
        for (var i = 0; i < jobStatus.length; i++) {
          if (! jobStatus[i].status) { done++; }
        }
        return done;
      }
    };
  }]);
