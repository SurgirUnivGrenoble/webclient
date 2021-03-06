'use strict';

angular.module('surgir.search').factory('Filters', ['Params', function(params) {
  return {
    selection: {},

    add: function(facet, value) {
      this.selection[facet] = value;
    },

    remove: function(facet) {
      delete this.selection[facet];
    },

    filterKeys: function() {
      return Object.keys(this.selection);
    },

    hasSelection: function() {
      return this.filterKeys().length > 0;
    },

    reset: function() {
      this.filterKeys().forEach(function(filter) {
        this.remove(filter);
      }.bind(this));
    },

    asParamString: function(excludeLogAction) {
      if (this.hasSelection()) {
        var filterParams = [];
        this.filterKeys().forEach(function(filter) {
          filterParams.push(filter + '--' +
                            encodeURIComponent(this.selection[filter]));
        }.bind(this));
        var filterString = params.concat(filterParams, 'filter', true);
        return excludeLogAction ? filterString :
                                  filterString + '&log_action=facette';
      } else {
        return '';
      }
    }
  };
}]);
