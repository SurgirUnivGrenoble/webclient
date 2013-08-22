describe('surgir.notice', function() {
  beforeEach(module('surgir.notice'));

  describe('NoticeProcessor', function() {
    var service, notice;

    beforeEach(inject(function($injector) {
        service = $injector.get('NoticeProcessor');
      })
    );

    notice = {
      'direct_url': 'http://handle.net/35-_-http://handle.net/36'
    };

    describe('#filter', function() {
      it('returns the argument', function() {
        expect(service.filter(notice)).toBe(notice);
      });

      it('splits direct_url field into direct_urls array field', function() {
        service.filter(notice);
        expect(notice).toEqual({
          'direct_url': 'http://handle.net/35-_-http://handle.net/36',
          'direct_urls': ['http://handle.net/35', 'http://handle.net/36']
        });
      });
    });
  });

});
