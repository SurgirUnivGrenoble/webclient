'use strict';

angular.module('surgir.notice').factory('NoticeProcessor', [function() {
  return {
    filter: function(notice) {
      notice.direct_urls = notice.direct_url.split('-_-');
      return notice;
    }
  };
}]);
