'use strict';

angular.module('surgir.search').factory('Facets', [function() {
  return {
    facets: [],

    frenchNames: {
     date: 'Dates',
     author: 'Auteurs',
     vendor_name: 'Bases de recherche',
     lang: 'Langues',
     material_type: 'Types de document',
     subject: 'Sujets'
    },

    reset: function() {
      this.facets.length = 0;
    },

    extract: function(results) {
      this.reset();
      this.facets.push.apply(this.facets, results.facette);
      this.facets.forEach(function(facet) {
        facet.frenchName = this.frenchNames[facet.name];
        facet.empty = facet.data.length == 0;
        facet.limit = 5;
        if (facet.name == 'vendor_name') {
          this._processVendorData(facet.data, results.totalhits);
        }
      }.bind(this));
      return this.facets;
    },

    _processVendorData: function(vendorData, totalHits) {
      var vendorName;
      vendorData.forEach(function(vendor) {
        vendorName = vendor[0];
        var vendorHits = totalHits.filter(function(hits) {
          return hits.target_name == vendorName;
        });
        if (vendorHits.length > 0) {
          vendor[1] = vendor[1] + '/' + vendorHits[0].total_hits;
          vendor.push(vendorHits[0].total_hits);
        } else {
          vendor.push(vendor[1]);
        }
      });
      vendorData.sort(function(a, b) {
        return b[2] - a[2];
      });
    }
  };
}]);
