'use strict';

angular.module('surgir.search').factory('Facets', ['Params', function(params) {
  return {
    filters: [],

    selectedFilters: [],

    frenchNames: {
     date: 'Dates',
     author: 'Auteurs',
     vendor_name: 'Bases de recherche',
     lang: 'Langues',
     material_type: 'Types de document',
     subject: 'Sujets'
    },

    extract: function(results) {
      this.filters.length = 0;
      this.filters.push.apply(this.filters, results.facette);
      this.filters.forEach(function(filter) {
        filter.frenchName = this.frenchNames[filter.name];
        filter.empty = filter.data.length == 0;
      }.bind(this));
      return this.filters;
    },

    addFilter: function(facet, value) {
      this.selectedFilters.push(facet + '--' + escape(value));
    },

    filtersSelected: function() {
      return this.selectedFilters.length > 0;
    },

    resetFilters: function() {
      this.selectedFilters.length = 0;
    },

    asParamString: function() {
      if (this.filtersSelected()) {
        return params.concat(this.selectedFilters, 'filter', true) +
              '&log_action=facette';
      } else {
        return '';
      }
    }
  };
}]);
