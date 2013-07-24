'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Surgir Client', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  it('should display the main title', function() {
    expect(element('h1').text()).toEqual('Surgir');
  });

  describe('Home', function() {
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
      browser().navigateTo('#/results');
    });

    describe('Results List', function() {
      describe('when selecting a result', function() {
        it('should go to the detailed notice', function() {
          element("[href$='results/1']").click();
          expect(browser().location().url()).toBe('/results/1');
        });
      });
    });

    describe('Notice', function() {
      describe('when selecting the permalink', function() {
        it('should follow the permalink to the detailed notice', function() {
          element("[href$='results/1']").click();
          element("[href$='notice/oai:quod.lib.umich.edu:MIU01-010308521;53;19453']").click();
          expect(browser().location().url()).toBe('/notice/oai:quod.lib.umich.edu:MIU01-010308521' + encodeURIComponent(';53;19453'));
        });
      });
    });
  });

});
