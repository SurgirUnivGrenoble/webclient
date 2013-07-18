'use strict';

/* Controllers */

angular.module('surgir.controllers', ['surgir.libraryfind']).
  controller('StepsController', function($scope, $http) {
    $scope.status = 'Ready';

    $scope.searchInput = 'oregon';
    $scope.jobs_status = {};
    $scope.jobs_record = {};

    // var libraryFindHost = 'http://130.190.250.179';
    var libraryFindHost = '';

    $scope.getCollections = function() {
      var request = libraryFindHost + '/json/GetGroupMembers?name=Partout'
      $http.get(request).success(function(data) {
        var names = data.results.member_names;
        var ids = data.results.member_ids;
        $scope.collections = [];
        $scope.collectionNotices = {};
        for (var i=0; i<ids.length; i++) {
          $scope.collections.push({id: ids[i].substr(1), name: names[i]});
        }
      });
    }

    $scope.getCollectionNotice = function(id) {
      var request = libraryFindHost + '/account_json/GetCollectionDescription?col_id=' + id;
      $http.get(request).success(function(data) {
        $scope.collectionNotices[id] = data.results[0].collection;
      });
    }

    $scope.submitSearch = function() {
      if($scope.searchInput) {
        var queryTerm = escape($scope.searchInput);
        var request = libraryFindHost + '/json/Search?query[field_filter1]=keyword&query[string1]=' + queryTerm + '&query[start]=None&query[max]=25&filter=&sort_value=None&query[mod]=new_search&tab_template=ALL&search_group=17&cols[]=1&cols[]=31&listCG_selected=None&log_cxt=search';
        $http.get(request).success(function(data) {
          if(! data.error) {
            $scope.jobs = data.results.jobs_id
          }
        });
      }
    };

    $scope.checkJob = function(jobId) {
      // http://130.190.250.179/json/CheckJobStatus?id[]=1321154&id[]=1321155
      var request = libraryFindHost + '/json/CheckJobStatus?id[]=' + jobId
      $http.get(request).success(function(data) {
        $scope.jobs_status[jobId] = data;
      });
    };

    $scope.getRecord = function(jobId) {
      // http://130.190.250.179/json/GetJobRecord?id[]=1321154&id[]=1321155&stop_search=1&max=25&page=1&sort=relevance&page_size=10&notice_display=0&with_facette=1&log_action_txt=&log_cxt_txt=&log_cxt=search
      var request = libraryFindHost + '/json/GetJobRecord?id[]=' + jobId + '&stop_search=1&max=25&page=1&sort=relevance&page_size=10&notice_display=0&with_facette=1&log_action_txt=&log_cxt_txt=&log_cxt=search'
      $http.get(request).success(function(data) {
        $scope.jobs_record[jobId] = data;
      });
    };

    var concatJobIds = function(request) {
      $scope.jobs.forEach(function(job) {
        request = request + 'id[]=' + job + '&';
      });
      return request.slice(0, request.length - 1);
    }

    $scope.checkAllJobs = function() {
      var jobReq = concatJobIds(libraryFindHost + '/json/CheckJobStatus?')
      $http.get(jobReq).success(function(data) {
        $scope.all_jobs_status = data;
      });
    };

    $scope.getAllRecords = function() {
      var jobReq = concatJobIds(libraryFindHost + '/json/GetJobRecord?')
      jobReq = jobReq + '&stop_search=1&max=25&page=1&sort=relevance&page_size=10&notice_display=0&with_facette=1&log_action_txt=&log_cxt_txt=&log_cxt=search'
      $http.get(jobReq).success(function(data) {
        $scope.all_jobs_records = data;
      });
    }

    $scope.notice = {
      permalink: '8596551373558225',
      colId: '19',
      searchId: '20046'
    };

    $scope.getNotice = function () {
      // http://130.190.250.179/json/GetId?&log_action=consult&log_cxt=notice&idDoc=6265381373528771&idCollection=14&idSearch=20050
      // http://130.190.250.179/json/GetId?&log_action=consult&log_cxt=notice&idDoc=oai:cairn.info:SPI_043_0156&idCollection=17&idSearch=20046
      // http://130.190.250.179/json/GetId?&log_action=consult&log_cxt=notice&idDoc=8596551373558225&idCollection=19&idSearch=20046
      var idDoc = escape($scope.notice.permalink);
      var idCollection = escape($scope.notice.colId);
      var idSearch = escape($scope.notice.searchId);
      var request = libraryFindHost + '/json/GetId?&log_action=consult&log_cxt=notice&idDoc=' + idDoc + '&idCollection=' + idCollection + '&idSearch=' + idSearch
      $http.get(request).success(function(data) {
        $scope.notice.details = data.results;
      });
    }

  }).

  controller('SearchController', function($scope, Collections, LibraryFind) {
    $scope.status = 'Ready';
    $scope.searchInput = 'oregon';

    $scope.ids = Collections.ids;

    $scope.submitSearch = function() {
      if( $scope.searchInput ){
        $scope.nbJobs = LibraryFind.search($scope.searchInput);
      }
    };
  });
