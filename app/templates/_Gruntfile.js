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
      widgets: {
        files: {
          'build/bundle.min.js': ['build/bundle.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['requirejs:bundle']);

};
