'use strict';

angular.module('surgir.config', []).
  value('CollectionGroupConfig', 'Partout').
  value('SearchParams', {
    /* max number of polls for results */
    maxNbPolls: 10,
    /* delay in milliseconds between two polls */
    pollingInterval: 2000,
    /* max results requested per collection */
    maxResults: 25,
    /* max results retrieved per page */
    pageSize: 10
  }).
  factory('iOSMobile', function() {
    return /(iPad|iPhone|iPod)/i.test(navigator.userAgent);
  });
