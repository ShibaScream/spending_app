const webpack = require('./webpack.config.js')
delete webpack.entry

// Karma configuration
// Generated on Sun Feb 19 2017 09:52:09 GMT-0800 (PST)

module.exports = function(config) {
  config.set({
    webpack,

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      'frontend/app/entry.js',
      'frontend/test/**/*-test.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/babel-polyfill/browser.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'frontend/test/**/*-test.js': ['webpack'],
      'frontend/app/entry.js': ['webpack'],
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // https://github.com/karma-runner/karma-chrome-launcher
    customLaunchers: {
      Chrome_without_security: {
        base: 'Chrome',
        flags: ['__disable-web-security']
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
