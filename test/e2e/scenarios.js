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
      it('should go the results view', function() {
        input('searchInput').enter('some terms');
        element('[type=submit]').click()
        expect(browser().location().url()).toBe('/results');
      });
    });
  });

});
