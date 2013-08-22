'use strict';

angular.module('surgir.notice').factory('NoticeProcessor', [function() {
  return {
    filter: function(notice) {
      notice.direct_urls = notice.direct_url.split('-_-');
      if (notice.date === '00000000') {
        notice.date = '';
      }
      return notice;
    }
  };
}]);
