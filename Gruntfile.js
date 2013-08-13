module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      assets: ['dist/assets/'],
      all: ['dist/'],
    },

    copy: {
      index: { src: 'app/index.prod.html', dest: 'dist/index.html' },
      assets: {
        files: [{expand: true, cwd: 'app/', src: ['assets/**'], dest: 'dist/'}]
      },
      views: {
        files: [{expand: true, cwd: 'app/', src: ['views/**'], dest: 'dist/'}]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'min'
      },
      build: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['app/lib/**/*.js', 'app/js/**/*.js']
        }
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'dist/assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/assets/css/',
        ext: '.min.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['copy', 'uglify']);
  grunt.registerTask('release', ['clean', 'copy', 'uglify']);

};
