// Karma configuration
// Generated on Wed Aug 17 2016 16:04:47 GMT+0200 (SAST)

var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'sinon-chai', 'detectBrowsers'],


        // list of files / patterns to load in the browser
        files: [
            'staticsrc/radmin.js',
            'tests/**/*.spec.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'staticsrc/radmin.js': ['webpack'],
            'tests/**/*.spec.js': ['babel']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'mocha'],


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
        // browsers: ['PhantomJS', 'Chrome', 'Firefox', 'Safari'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true
        },

        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            }
        },

        detectBrowsers: {
            enabled: true,
            usePhantomJS: true,
            postDetection: function(availableBrowser) {
                //Add IE Emulation
                var result = availableBrowser;

                if (availableBrowser.indexOf('IE') > -1) {
                    result.push('IE9');
                }

                //Remove PhantomJS if another browser has been detected
                if (availableBrowser.length > 1 && availableBrowser.indexOf('PhantomJS') > -1) {
                    var i = result.indexOf('PhantomJS');

                    if (i !== -1) {
                        result.splice(i, 1);
                    }
                }

                return result;
            }
        }
    })
}
