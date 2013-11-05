'use strict';

angular.module('surgir.notice').
  filter('replace', function() {
    return function(text) {
      if (text) {
        return text.replace(/&apos;/g, "'")
                   .replace(/;/g, ' - ')
                   .replace(/Ã©/g, 'é');
      } else {
        return '';
      }
    }
  }).

  filter('iconize', function() {
    return function(material_type) {
      switch (material_type) {
        case 'Article': return 'icon-article';
        case 'Revue': return 'icon-article';
        case 'Livre': return 'icon-book';
        case 'Thèse / Mémoire': return 'icon-essay';
        case 'Acte de conférences': return 'icon-speaker';
        case 'Site Web': return 'icon-website';
        case 'Image': return 'icon-image';
        case 'Carte': return 'icon-map';
        case 'Multisupport': return 'icon-multi-support';
        case 'Partition': return 'icon-sheet-music';
        default: return 'icon-default';
      }
    }
  }).

  filter('lfYear', function() {
    return function(timestamp) {
      if (timestamp) {
        return timestamp.slice(0, 4);
      } else {
        return '';
      }
    }
  }).

  filter('yearPublisher', ['lfYearFilter', function(lfYear) {
    return function(publisher, timestamp) {
      if (timestamp) {
        return publisher + ', ' + lfYear(timestamp);
      } else {
        return publisher;
      }
    }
  }]);
