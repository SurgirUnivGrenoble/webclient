'use strict';

angular.module('surgir.search').factory('Filters', ['Params', function(params) {
  return {
    selection: {},

    addFilter: function(facet, value) {
      this.selection[facet] = value;
    },

    removeFilter: function(facet) {
      delete this.selection[facet];
    },

    filterKeys: function() {
      return Object.keys(this.selection);
    },

    filtersSelected: function() {
      return this.filterKeys().length > 0;
    },

    resetFilters: function() {
      this.filterKeys().forEach(function(filter) {
        this.removeFilter(filter);
      }.bind(this));
    },

    asParamString: function() {
      if (this.filtersSelected()) {
        var filterParams = [];
        this.filterKeys().forEach(function(filter) {
          filterParams.push(filter + '--' + escape(this.selection[filter]));
        }.bind(this));
        return params.concat(filterParams, 'filter', true) +
              '&log_action=facette';
      } else {
        return '';
      }
    }
  };
}]);
