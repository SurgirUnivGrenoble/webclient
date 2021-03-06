describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('Params', function() {
    var subject;

    beforeEach(
      inject(function($injector) {
        subject = $injector.get('Params');
      })
    );

    describe('#concat', function() {
      it('returns an empty string given an empty collection', function() {
        expect(subject.concat([])).toEqual('');
      });

      it('returns a concatenation of formal and actual parameters', function() {
        expect(subject.concat([1, 2, 3], 'id')).toEqual('id[]=1&id[]=2&id[]=3');
      });

      it('takes an optional parameter to keep the first ampersand', function() {
        expect(subject.concat(['a', 'b', 'c'], 'col', true)).
        toEqual('&col[]=a&col[]=b&col[]=c');
      });
    });
  });

});
