'use strict';

angular.module('surgir.notice').factory('NoticeProcessor',
['replaceFilter', 'iconizeFilter', function(replace, iconize) {
  return {
    filter: function(notice) {
      notice.direct_urls = notice.direct_url.split('-_-');
      if (notice.date === '00000000') {
        notice.date = '';
      }
      var fields = ['ptitle', 'author', 'source', 'subject'];
      fields.forEach(function(field) {
        notice[field] = replace(notice[field]);
      });
      notice.material_icon = 'assets/img/' +
                             iconize(notice.material_type) +
                             '.svg';
      return notice;
    }
  };
}]);
