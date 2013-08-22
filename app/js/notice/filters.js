'use strict';

angular.module('surgir.notice').
  filter('replace', function() {
    return function(text) {
      if (text) {
        return text.replace(/&apos;/g, "'").replace(/;/g, ' - ');
      } else {
        return '';
      }
    }
  }).

  filter('lfYear', function() {
    return function(timestamp) {
      if (timestamp) {
        return timestamp.slice(0, 4);
      } else {
        return '';
      }
    }
  }).

  filter('yearPublisher', ['lfYearFilter', function(lfYear) {
    return function(publisher, timestamp) {
      if (timestamp) {
        return publisher + ', ' + lfYear(timestamp);
      } else {
        return publisher;
      }
    }
  }]);
