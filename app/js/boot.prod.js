'use strict';

function loadScript(filepath) {
  var fileref = document.createElement('script');
  fileref.setAttribute('type', 'text/javascript');
  fileref.setAttribute('src', filepath);
  fileref.setAttribute('onload', 'runAngular()');
  document.getElementsByTagName('body')[0].appendChild(fileref);
}

function runAngular() {
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['surgir']);
  });
}

if (window.matchMedia('only screen and (max-device-width:480px)').matches) {
  loadScript('js/mobile_templates.min.js');
} else {
  loadScript('js/classic_templates.min.js');
}
