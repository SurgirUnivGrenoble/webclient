'use strict';

angular.module('surgir.search').factory('Facets', ['Params', function(params) {
  return {
    facets: [],

    selectedFilters: {},

    frenchNames: {
     date: 'Dates',
     author: 'Auteurs',
     vendor_name: 'Bases de recherche',
     lang: 'Langues',
     material_type: 'Types de document',
     subject: 'Sujets'
    },

    extract: function(results) {
      this.facets.length = 0;
      this.facets.push.apply(this.facets, results.facette);
      this.facets.forEach(function(facet) {
        facet.frenchName = this.frenchNames[facet.name];
        facet.empty = facet.data.length == 0;
        facet.limit = 5;
      }.bind(this));
      return this.facets;
    },

    addFilter: function(facet, value) {
      this.selectedFilters[facet] = value;
    },

    removeFilter: function(facet) {
      delete this.selectedFilters[facet];
    },

    filterKeys: function() {
      return Object.keys(this.selectedFilters);
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
          filterParams.push(filter + '--' +
                            escape(this.selectedFilters[filter]));
        }.bind(this));
        return params.concat(filterParams, 'filter', true) +
              '&log_action=facette';
      } else {
        return '';
      }
    }
  };
}]);
