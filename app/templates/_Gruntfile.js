module.exports = function(grunt) {

  var requirejsOptions = require('./config');

  requirejsOptions.optimize = 'none';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js', 'tests/*.js']
    },
    karma: {
      options: {
        configFile: 'tests/karma.conf.js',
        runnerPort: 9999,
        browsers: ['Chrome']
      },
      dev: {
        autoWatch: true
      },
      ci: {
        singleRun: true,
        reporters: ['dots', 'junit', 'coverage'],
        junitReporter: {
          outputFile: 'test-results.xml'
        },
        coverageReporter: {
          type : 'cobertura',
          dir : 'coverage/'
        }
        // SauceLabs stuff comes here
      }
    },
    requirejs: {
      options: requirejsOptions,
      bundle: {
        options: {
          name: 'node_modules/almond/almond.js',
          include: '<%= _.slugify(packageName) %>-bundle',
          insertRequire: ['<%= _.slugify(packageName) %>-bundle'],
          out: 'build/bundle.js',
          excludeShallow: ['jquery']
        }
      }
    },
    uglify: {
      bundle: {
        files: {
          'build/bundle.min.js': ['build/bundle.js']
        }
      }
    },
    less: {
      bundle: {
        options: {
          paths: ['less']
        },
        files: {
          'build/bundle.css': 'less/bundle.less'
        }
      }
    },
    cssmin: {
      bundle: {
        expand: true,
        cwd: 'build/',
        src: ['bundle.css'],
        dest: 'build/',
        ext: '.min.css',
        report: 'min'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', [
      'requirejs:bundle',
      'uglify:bundle',
      'less:bundle',
      'cssmin:bundle'
      ]);

};
