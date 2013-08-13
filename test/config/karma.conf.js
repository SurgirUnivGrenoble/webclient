basePath = '../../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/vendor/angular/angular.js',
  'app/vendor/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  'app/lib/**/*.js',
  'app/js/**/*.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
