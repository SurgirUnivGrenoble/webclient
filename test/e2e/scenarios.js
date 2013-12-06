'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Surgir Client', function() {

  describe('Home', function() {
    beforeEach(function() {
      browser().navigateTo('/');
    });

    describe('initially', function() {
      it('should display the home page', function() {
        expect(element('[role=banner]').text()).toMatch('Surgir');
      });
    });

    describe('when starting to type some search input', function() {
      it('should redirect to the results page', function() {
        input('search.input').enter('something');
        expect(browser().location().url()).toBe('/results');
      });
    });
  });

  describe('Results Workflow', function() {
    beforeEach(function() {
      browser().navigateTo('/#/results');
      input('search.input').enter('some terms');
      element('[type=submit]').click();
    });

    describe('after querying some terms', function() {
      it('should display the initial number of results', function() {
        expect(repeater('.result').count()).toBe(10);
      });

      it('should display facets for filtering results', function() {
        expect(repeater('.facet').count()).toBe(6);
      });
    });

    describe('when deleting the search query', function() {
      it('should reset results', function() {
        input('search.input').enter('');
        expect(repeater('.result').count()).toBe(0);
      });
    });

    describe('Results List', function() {
      describe('when selecting a result', function() {
        it('should go to the detailed notice', function() {
          element("[href$='results/1']").click();
          expect(browser().location().url()).toBe('/results/1');
        });
      });

      describe('when asking for more results', function() {
        it('should fetch and display more results after the previous ones',
        function() {
          element('.ts_more_results').click();
          expect(repeater('.result').count()).toBe(20);
        });
      });

      describe('when selecting a facet', function() {
        it('should update results and facets with the selected facet value ',
        function() {
          element(".facet a:contains('Rugbis')").click();
          expect(element(".facet a:contains('Science Direct')").text()).
            toEqual('Science Direct');
        });
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
