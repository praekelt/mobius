// Karma configuration
// Generated on Wed Aug 17 2016 16:04:47 GMT+0200 (SAST)

var path = require('path');

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
        {pattern: 'tests/js/*_test.js', watched: false}
    ],

    // list of files to exclude
    exclude: [
        'node_modules'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'tests/js/*_test.js': ['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


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
    browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari', 'Opera', 'IE'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    plugins: [
        require('karma-mocha'),
        require('karma-chrome-launcher'),
        require('karma-webpack')
    ],

    webpack: { //kind of a copy of your webpack config
        devtool: 'inline-source-map', //just do inline source maps instead of the default
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: '/node_modules/',
                    loader: 'babel-loader',
                    query: {
                      presets: ['es2015']
                    }
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                },
            ]
        },
         resolve: {
          'modulesDirectories': ['node_modules'],
          'extensions': [
              '',
              '.js',
              '.css',
              '.scss'
          ],
          'root': [
                path.resolve('./staticsrc/')
          ]
      },
    },
  })
}
