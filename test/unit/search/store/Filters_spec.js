describe('surgir.search', function() {
  beforeEach(module('surgir.search'));

  describe('Filters', function() {
    var service;

    beforeEach(inject(function($injector) {
      service = $injector.get('Filters');
    }));

    describe('#add', function() {
      it('registers the given facet and value as a filter', function() {
        service.add('vendor_name', 'Science Direct');
        service.add('date', '2013');
        expect(service.selection).toEqual({vendor_name: 'Science Direct',
                                           date: '2013'});
      });
    });

    describe('#remove', function() {
      it('removes the given facet as filter', function() {
        service.add('vendor_name', 'Science Direct');
        service.add('date', '2013');
        service.remove('date');
        expect(service.selection).toEqual({vendor_name: 'Science Direct'});
      });
    });

    describe('#hasSelection', function() {
      it('is true when some filters are selected', function() {
        service.add('date', '2013');
        expect(service.hasSelection()).toBe(true);
      });
      it('is false otherwise', function() {
        expect(service.hasSelection()).toBe(false);
      });
    });

    describe('#filterKeys', function() {
      it('returns the collection of currently set filters', function() {
        service.add('vendor_name', 'Science Direct');
        service.add('date', '2013');
        expect(service.filterKeys()).toEqual(['vendor_name', 'date']);
      });
    });

    describe('#reset', function() {
      it('resets all filters', function() {
        service.add('vendor_name', 'Science Direct');
        service.add('date', '2013');
        service.reset();
        expect(service.selection).toEqual({});
      });
    });

    describe('#asParamString', function() {
      it('returns selected filters encoded as a parameter string', function() {
        service.add('vendor_name', 'Science Direct');
        service.add('date', '2013');
        expect(service.asParamString()).toEqual(
          '&filter[]=vendor_name--Science%20Direct&filter[]=date--2013' +
          '&log_action=facette');
      });

      it('returns an empty string when no filters are set', function() {
        expect(service.asParamString()).toEqual('');
      });
    });

  });

});
