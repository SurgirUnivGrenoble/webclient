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
      element('form').query(function(elem, done) {
        elem[0].dispatchEvent(new Event('submit'));
        done();
      });
    });

    describe('after querying some terms', function() {
      it('should display the initial number of results', function() {
        expect(repeater('.result').count()).toBe(10);
      });
    });

    describe('Results List', function() {
      describe('when selecting a result', function() {
        it('should go to the detailed notice', function() {
          browserTap(element('.result:first'));
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

    });

    describe('Filters', function() {
      describe('when going to the filters page', function() {
        it('should display facets for filtering results', function() {
          element("[href$='filters']").click();
          expect(repeater('.facet').count()).toBe(6);
        });
      });
    });

    describe('Notice', function() {
      describe('when selecting the permalink', function() {
        var uid = 'notice/oai:quod.lib.umich.edu:MIU01-010308521';
        it('should follow the permalink to the detailed notice', function() {
          browserTap(element('.result:first'));
          element("[href$='" + uid + ";53;19453']").click();
          expect(browser().location().url()).toBe('/' + uid +
                                              encodeURIComponent(';53;19453'));
        });
      });
    });
  });

  var browserTrigger = function(element, eventName) {
    element.query(function(el, done) {
      var evt = document.createEvent('Event');
      evt.initEvent(eventName, false, true);
      el[0].dispatchEvent(evt);
      done();
    });
  };

  var browserTap = function(element) {
    browserTrigger(element, 'touchstart');
    browserTrigger(element, 'touchend');
  };

});
