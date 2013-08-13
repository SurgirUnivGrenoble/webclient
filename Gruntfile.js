module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      assets: ['dist/assets/'],
      all: ['dist/'],
    },

    copy: {
      index: { src: 'app/index.prod.html', dest: 'dist/index.html' },
      assets: {expand: true, cwd: 'app/', src: ['assets/**'], dest: 'dist/'}
    },

    cssmin: {
      options: { report: 'min' },
      minify: {
        expand: true,
        cwd: 'app/assets/css/',
        src: ['styles.css'],
        dest: 'dist/assets/css/',
        ext: '.min.css'
      },
      concat: {
        src: ['dist/assets/css/normalize-2.0.1.min.css', 'dist/assets/css/bootstrap.min.css', 'dist/assets/css/foundation.min.css', 'dist/assets/css/font-awesome.min.css', 'dist/assets/css/styles.min.css'],
        dest: 'dist/assets/css/<%= pkg.name %>.min.css'
      }
    },

    html2js: {
      options: {
        base: 'app/',
        module: 'surgir.templates'
      },
      surgir: {
        src: ['app/views/**/*.html'],
        dest: 'dist/templates/templates.js'
      },
      classic: {
        src: ['app/views/classic/*.html', 'app/views/partials/*.html'],
        dest: 'dist/templates/classic.js'
      },
      mobile: {
        src: ['app/views/mobile/*.html', 'app/views/partials/*.html'],
        dest: 'dist/templates/mobile.js'
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'min'
      },
      build: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['app/lib/**/*.js', 'app/js/**/*.js', 'dist/templates/templates.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['copy', 'cssmin', 'html2js', 'uglify']);
  grunt.registerTask('release', ['clean', 'copy', 'cssmin', 'html2js', 'uglify']);

};
