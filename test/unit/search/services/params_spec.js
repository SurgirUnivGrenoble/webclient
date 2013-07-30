describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('params', function() {
    var subject;

    beforeEach(
      inject(function($injector) {
        subject = $injector.get('params');
      })
    );

    describe("#concat", function() {
      it('returns an empty string given an empty collection', function() {
        expect(subject.concat([])).toEqual('');
      });

      it('returns a concatenation of formal parameters and arguments', function() {
        expect(subject.concat([1,2,3], 'id')).toEqual('id[]=1&id[]=2&id[]=3');
      });

      it('takes an optional parameter to keep the first ampersand', function() {
        expect(subject.concat(['a','b','c'], 'col', true)).
        toEqual('&col[]=a&col[]=b&col[]=c');
      });
    });
  });

});
