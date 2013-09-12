module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      assets: ['build/assets/', 'dist/assets/'],
      all: ['build/', 'dist/'],
    },

    copy: {
      index: { src: 'app/index.prod.html', dest: 'dist/index.html' },
      assets: {
        expand: true,
        cwd: 'app/',
        src: ['assets/font/**', 'assets/img/**'],
        dest: 'dist/'
      }
    },

    cssmin: {
      options: { report: 'min' },
      minify: {
        expand: true,
        cwd: 'app/assets/css/',
        src: ['styles.css'],
        dest: 'build/assets/css/',
        ext: '.min.css'
      },
      concat: {
        src: ['app/assets/css/normalize-2.0.1.min.css', 'app/assets/css/bootstrap.min.css', 'app/assets/css/foundation.min.css', 'app/assets/css/font-awesome.min.css', 'build/assets/css/styles.min.css'],
        dest: 'dist/assets/css/<%= pkg.name %>.min.css'
      }
    },

    html2js: {
      options: {
        base: 'app/',
        module: 'surgir.templates'
      },
      classic: {
        src: ['app/views/classic/**/*.html'],
        dest: 'build/js/classic_templates.js'
      },
      mobile: {
        src: ['app/views/mobile/**/*.html'],
        dest: 'build/js/mobile_templates.js'
      },
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        report: 'min'
      },
      build: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['app/lib/**/*.js', 'app/js/**/*.js'],
          'dist/js/classic_templates.min.js': ['build/js/classic_templates.js'],
          'dist/js/mobile_templates.min.js': ['build/js/mobile_templates.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('assets',  ['clean:assets', 'copy', 'cssmin']);
  grunt.registerTask('default', ['cssmin', 'html2js', 'uglify']);
  grunt.registerTask('build',   ['copy', 'default']);
  grunt.registerTask('release', ['clean', 'build']);

};
