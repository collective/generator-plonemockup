module.exports = function(grunt) {

  require('karma-mocha');
  var requirejsOptions = require('./config'),
      karmaConfig = require('./node_modules/karma/lib/config'),
      karma_files = [];

  for (var key in requirejsOptions.paths) {
    karma_files.push({
      pattern: requirejsOptions.paths[key] + '.js',
      included: false
    });
  }

  karma_files.push({pattern: 'tests/*-test.js', included: false});
  karma_files.push({pattern: 'js/patterns/*.js', included: false});

  karma_files.push('config.js');
  karma_files.push('tests/config.js');
  
  requirejsOptions.optimize = 'none';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js', 'tests/*.js']
    },
    karma: {
      options: {

        // base path, that will be used to resolve files and exclude
        basePath: './',

        // frameworks to use
        frameworks: ['mocha', 'requirejs'],

        // list of files / patterns to load in the browser
        files: karma_files,

        // list of files to exclude
        exclude: [ ],

        preprocessors: {
          'js/patterns/*.js': 'coverage'
        },

        // test results reporter to use
        // possible values: dots || progress || growl
        reporters: ['dots', 'progress', 'coverage'],

        coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: karmaConfig.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        plugins: [
          'karma-mocha',
          'karma-coverage',
          'karma-requirejs',
          'karma-sauce-launcher',
          'karma-chrome-launcher',
          'karma-phantomjs-launcher',
          'karma-junit-reporter'
        ]
      },
      dev: {
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS']
      },
      dev_chrome: {
        browsers: ['Chrome'],
        preprocessors: {},
        reporters: ['dots', 'progress'],
        plugins: [
          'karma-mocha',
          'karma-requirejs',
          'karma-sauce-launcher',
          'karma-chrome-launcher',
          'karma-phantomjs-launcher',
          'karma-junit-reporter'
        ]
      },
      ci: {
        singleRun: true,
        browsers: ['sauce_chrome'],

        reporters: ['junit', 'coverage'],
        junitReporter: {
          outputFile: 'test-results.xml'
        },
        coverageReporter: {
          type : 'lcovonly',
          dir : 'coverage/'
        },

        sauceLabs: {
          testName: 'packageName',
          startConnect: true
        },
        customLaunchers: {
          'sauce_chrome': {
             base: 'SauceLabs',
             platform: 'Windows 8',
             browserName: 'chrome'
           },
          'sauce_firefox': {
             base: 'SauceLabs',
             platform: 'Windows 8',
             browserName: 'firefox'
           },
           'sauce_ie': {
             base: 'SauceLabs',
             platform: 'Windows 8',
             browserName: 'internet explorer'
           }
        }
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

  grunt.registerTask('test', [
      'karma:dev'
      ]);

  grunt.registerTask('default', [
      'requirejs:bundle',
      'uglify:bundle',
      'less:bundle',
      'cssmin:bundle'
      ]);

};
