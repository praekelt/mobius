var Webpack = require('webpack'),
    // Autoprefixer = require('autoprefixer'),
    // CssNano = require('cssnano'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    BundleTracker = require('webpack-bundle-tracker'),
    // SassJsonImporter = require('node-sass-json-importer'),
    SassLintPlugin = require('sasslint-webpack-plugin');

var paths = {
    'src': __dirname + '/staticsrc/',
    'dist': __dirname + '/static/bundles/'
}

var path = require('path');

var modulesDirectories = ['./node_modules/', './staticsrc/'];
var excludes = /node_modules/;

module.exports = {
    'devtool': 'source-map',
    'target': 'web',
    'context': __dirname,
    'externals': {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },
    'resolve': {
        'modulesDirectories': modulesDirectories,
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
    'entry': [
        paths.src + 'radmin.js',
    ],
    'output': {
        'path': paths.dist,
        'filename': '[name]-[hash].js',
        'chunkFilename': 'chunk-[name]-[chunkhash].js',
        'publicPath': '/static/bundles/'
    },
    'module': {
        'preLoaders': [
            {
                'test': /\.js$/,
                'loader': 'eslint',
                'exclude': excludes
            }
        ],
        'loaders': [
            {
                'test': /\.css$/,
                'loader': 'style?singleton!css?sourceMap!postcss-loader',
                'exclude': excludes
            },
            {
                'test': /\.s[a|c]ss$/,
                'loader': 'style!css!sass',
                'exclude': excludes
            },
            {
                'test': /\.js$/,
                'loader': 'babel-loader',
                'exclude': excludes
            }
        ]
    },
    'plugins': [
        // Cleans Dist folder before compile.
        new CleanWebpackPlugin([paths.dist], {
            'root': __dirname,
            'verbose': true,
            'dry': false
        }),
        new Webpack.DefinePlugin({
            '__DEV__': JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
            '__PRERELEASE__': JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'true'))
        }),
        new SassLintPlugin({
            'configFile': './.sass-lint.yml',
            'context': paths.src,
            'failOnError': false,
            'failOnWarning': false
        }),

        new BundleTracker({path: __dirname, filename: './webpack-map.json'}),
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new Webpack.NoErrorsPlugin()
    ],
    // 'postcss': function() {
    //     return [Autoprefixer({
    //         'browsers': ['> 1%', 'IE 7', 'IE 8', 'IE 9']
    //     }), CssNano];
    // },
    // 'sassLoader': {
    //     'precision': 3,
    //     'indentWidth': 4,
    //     'includePaths': modulesDirectories,
    //     'importer': SassJsonImporter
    // },
    'uglify-loader': {
        'mangle': true
    },
    'babel-loader': {
        'cacheDirectory': true,
        'plugins': ['transform-runtime']
    }
}
