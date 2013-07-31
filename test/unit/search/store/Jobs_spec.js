describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('Jobs', function() {
    var subject;

    beforeEach(
      inject(function($injector) {
        subject = $injector.get('Jobs');
      })
    );

    describe('At first', function() {
      it('has no stored ids', function() {
        expect(subject.ids).toEqual([]);
      });
      it('has no done jobs', function() {
        expect(subject.done).toEqual(0);
      });
    });

    describe('#reset', function() {
      it('sets the job ids', function() {
        subject.reset([123, 456, 789]);
        expect(subject.ids).toEqual([123, 456, 789]);
      });

      it('resets job ids', function() {
        subject.reset([123, 456, 789]);
        subject.reset([1, 2, 3]);
        expect(subject.ids).toEqual([1, 2, 3]);
      });

      it('resets done jobs', function() {
        subject.reset([123, 456, 789]);
        subject.checkDone([{status: 0}]);
        expect(subject.done).toEqual(1);

        subject.reset([1, 2, 3]);
        expect(subject.done).toEqual(0);
      });
    });

    describe('given some job ids', function() {
      beforeEach(function() {
        subject.reset([123, 456, 789]);
      });

      describe('#asParamString', function() {
        it('returns job ids as a parameter string', function() {
          expect(subject.asParamString()).toEqual('id[]=123&id[]=456&id[]=789');
          expect(subject.asParamString(true)).
            toEqual('&id[]=123&id[]=456&id[]=789');
        });
      });

      describe('#checkDone', function() {
        it('is false when no job are done', function() {
          expect(subject.checkDone([{status: 1}])).toBe(false);
        });

        it('is true if more jobs are done since previous call',
        function() {
          var newlyDone =
                subject.checkDone([{status: 0}, {status: 1}, {status: 0}]);
          expect(newlyDone).toBe(true);
        });

        it('is false otherwise', function() {
          subject.checkDone([{status: 0}, {status: 1}, {status: 0}]);
          var newlyDone =
                subject.checkDone([{status: 0}, {status: 1}, {status: 0}]);
          expect(newlyDone).toBe(false);
        });
      });

      describe('#allDone', function() {
        it('is true when done jobs equal the number of jobs', function() {
          subject.checkDone([{status: 0}, {status: 0}, {status: 0}]);
          expect(subject.allDone()).toBe(true);
        });

        it('is false otherwise', function() {
          subject.checkDone([{status: 0}, {status: 1}, {status: 0}]);
          expect(subject.allDone()).toBe(false);
        });
      });
    });

  });

});
