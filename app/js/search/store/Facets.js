'use strict';

angular.module('surgir.search').factory('Facets', [function() {
  return {
    filters: [],


    frenchNames: {
     date: 'Dates',
     author: 'Auteurs',
     vendor_name: 'Bases de recherche',
     lang: 'Langues',
     material_type: 'Types de document',
     subject: 'Sujets'
    },

    extract: function(results) {
      this.filters.push.apply(this.filters, results.facette);
      this.filters.forEach(function(filter) {
        filter.frenchName = this.frenchNames[filter.name];
      }.bind(this));
      return this.filters;
    }
  };
}]);
