'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Surgir Client', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  describe('Home', function() {
    describe('initially', function() {
      it('should display the main title', function() {
        expect(element('h1').text()).toEqual('Surgir');
      });
    });

    describe('when querying some terms', function() {
      it('should go the results list', function() {
        input('searchInput').enter('some terms');
        element('[type=submit]').click();
        expect(browser().location().url()).toBe('/results');
      });
    });
  });

  describe('Results Workflow', function() {
    beforeEach(function() {
      input('searchInput').enter('some terms');
      element('[type=submit]').click();
    });

    describe('Results List', function() {
      describe('when selecting a result', function() {
        it('should go to the detailed notice', function() {
          element("[href$='results/1']").click();
          expect(browser().location().url()).toBe('/results/1');
        });
      });

      describe('when selecting a facet', function() {
        it('should update results and facets with the selected facet value ',
        function() {
          element(".facet a:contains('Rugbis')").click();
          expect(repeater('.facet').count()).toBe(6);
          expect(element(".facet a:contains('Science Direct')").text()).
            toEqual('Science Direct');
        });
      });

      it('should display the initial number of results', function() {
        expect(repeater('.result').count()).toBe(10);
      });

      it('should display facets for filtering results', function() {
        expect(repeater('.facet').count()).toBe(6);
      });
    });

    describe('Notice', function() {
      describe('when selecting the permalink', function() {
        var uid = 'notice/oai:quod.lib.umich.edu:MIU01-010308521';
        it('should follow the permalink to the detailed notice', function() {
          element("[href$='results/1']").click();
          element("[href$='" + uid + ";53;19453']").click();
          expect(browser().location().url()).toBe('/' + uid +
                                              encodeURIComponent(';53;19453'));
        });
      });
    });
  });

});
