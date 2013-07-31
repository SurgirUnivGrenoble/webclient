'use strict';

angular.module('surgir.search').factory('Params',
  [function() {
    return {
      concat: function(collection, formalParam, keepFirstAmpersand) {
        var firstAmpersand = keepFirstAmpersand || false;
        var paramString = '';
        collection.forEach(function(item) {
          paramString = paramString.concat('&', formalParam, '[]=', item);
        });
        if (firstAmpersand) {
          return paramString;
        } else {
          return paramString.slice(1, paramString.length);
        }
      }
    };
  }]);
