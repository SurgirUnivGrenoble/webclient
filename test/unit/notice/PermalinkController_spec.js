describe('surgir.notice', function() {
  beforeEach(module('surgir.notice'));

  describe('PermalinkController', function() {
    var scope, mockRoute, mockPermalink, mockNotice;

    beforeEach(inject(function($rootScope, $controller, $q) {
      scope = $rootScope.$new();

      mockRoute = {
        permalink: 'j.motcer.2012.03.002;43;21568'
      };

      mockPermalink = {
        getNotice: function() {
          deferred = $q.defer();
          return deferred.promise;
        }
      };
      spyOn(mockPermalink, 'getNotice').andCallThrough();

      mockNotice = {
        filter: function() {}
      };

      $controller('PermalinkController', {
        $scope: scope,
        $routeParams: mockRoute,
        Permalink: mockPermalink,
        NoticeProcessor: mockNotice
      });
    }));

    it('should call Permalink service to retrieve the notice', function() {
      expect(mockPermalink.getNotice).
        toHaveBeenCalledWith('j.motcer.2012.03.002;43;21568');
    });

    it('should filter the answer through the notice processor ', function() {
      spyOn(mockNotice, 'filter');
      deferred.resolve('notice');
      scope.$apply();
      expect(mockNotice.filter).toHaveBeenCalledWith('notice');
    });

    describe('with some encoded permalink', function() {
      beforeEach(inject(function($controller) {
        mockRoute.permalink = '10.1016|||j.motcer.2012.03.002;43;21568';
        $controller('PermalinkController', {
          $scope: scope,
          $routeParams: mockRoute,
          Permalink: mockPermalink,
          NoticeProcessor: mockNotice
        });
      }));

      it('should tranform the permalink before the service call', function() {
        expect(mockPermalink.getNotice).
          toHaveBeenCalledWith('10.1016/j.motcer.2012.03.002;43;21568');
      });
    });

  });
});
