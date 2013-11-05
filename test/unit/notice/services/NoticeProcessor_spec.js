describe('surgir.notice', function() {
  beforeEach(module('surgir.notice'));

  describe('NoticeProcessor', function() {
    var service, notice;

    beforeEach(inject(function($injector) {
        service = $injector.get('NoticeProcessor');
      })
    );

    notice = {
      'ptitle': 'L&apos;ère industrielle',
      'author': 'A. Dumas;C. Dumas',
      'source': 'Le Monde;Mediapart;Figaro',
      'subject': 'industrie;révolution;l&apos;etat',
      'date': '20130000',
      'material_type': 'Livre',
      'direct_url': 'http://handle.net/35-_-http://handle.net/36',
      'id': '10.1016/j.motcer.2012.03.002;43;21568'
    };

    describe('#filter', function() {
      it('returns the argument', function() {
        expect(service.filter(notice)).toBe(notice);
      });

      it('splits direct_url field into direct_urls array field', function() {
        service.filter(notice);
        expect(notice.direct_urls).toEqual(
          ['http://handle.net/35', 'http://handle.net/36']);
      });

      it('cancels 00000000 date', function() {
        service.filter(notice);
        expect(notice.date).toEqual('20130000');
        notice.date = '00000000';
        service.filter(notice);
        expect(notice.date).toEqual('');
      });

      it('calls the replace filter on ptitle, author, source, and subject',
      function() {
        service.filter(notice);
        expect(notice.ptitle).toEqual("L'ère industrielle");
        expect(notice.author).toEqual('A. Dumas - C. Dumas');
        expect(notice.source).toEqual('Le Monde - Mediapart - Figaro');
        expect(notice.subject).toEqual("industrie - révolution - l'etat");
      });

      it('adds a custom icon image depending on the material type', function() {
        service.filter(notice);
        expect(notice.material_icon).toEqual('assets/img/icon-book.svg');
      });

      it("encodes special char '/' in permalink", function() {
        service.filter(notice);
        expect(notice.id).toEqual('10.1016|||j.motcer.2012.03.002;43;21568');
      });

      it('replaces a wrong encoding in Acte de conférences', function() {
        var notice = {
          'material_type': 'Acte de conf\u00c3\u00a9rences',
          'direct_url': '',
          'id': ''
        };
        service.filter(notice);
        expect(notice.material_type).toEqual('Acte de conférences');
      });
    });
  });

});
