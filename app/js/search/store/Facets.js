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
      }.bind(this));
      return this.filters;
    },

    addFilter: function(facet, value) {
      this.selectedFilters.push(facet + '--' + escape(value));
    },

    resetFilters: function() {
      this.selectedFilters.length = 0;
    },

    asParamString: function() {
      if (this.selectedFilters.length == 0) {
        return '';
      } else {
        return params.concat(this.selectedFilters, 'filter', true) +
              '&log_action=facette';
      }
    }
  };
}]);
