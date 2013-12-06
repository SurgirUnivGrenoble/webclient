'use strict';

angular.module('surgir.search').factory('Facets', [function() {
  var facetsMap = {
    date: {
      name: 'date',
      frenchName: 'Dates',
      data: []
    },
    author: {
      name: 'author',
      frenchName: 'Auteurs',
      data: []
    },
    vendor_name: {
      name: 'vendor_name',
      frenchName: 'Bases de recherche',
      data: []
    },
    lang: {
      name: 'lang',
      frenchName: 'Langues',
      data: []
    },
    material_type: {
      name: 'material_type',
      frenchName: 'Types de document',
      data: []
    },
    subject: {
      name: 'subject',
      frenchName: 'Sujets',
      data: []
    }
  };

  function processVendorData(vendorData, totalHits) {
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

  return {
    facets: [
      facetsMap.date,
      facetsMap.author,
      facetsMap.vendor_name,
      facetsMap.lang,
      facetsMap.material_type,
      facetsMap.subject
    ],

    reset: function() {
      this.facets.forEach(function(facet) {
        facet.data.length = 0;
        facet.limit = 5;
      });
    },

    valueReset: function() {
      this.facets.forEach(function(facet) {
        facet.data.length = 0;
      });
    },

    extract: function(results) {
      this.valueReset();
      results.facette.forEach(function(rawFacet) {
        var facet = facetsMap[rawFacet.name];
        var values = rawFacet.data.filter(function(val) {
          return ! (/^\s*$/).test(val[0]);
        });
        Array.prototype.push.apply(facet.data, values);
        facet.more = facet.data.length > facet.limit;

        if (facet.name === 'vendor_name') {
          processVendorData(facet.data, results.totalhits);
        }
      }.bind(this));
      return this.facets;
    }
  };
}]);
