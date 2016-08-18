var Webpack = require('webpack'),
    Autoprefixer = require('autoprefixer'),
    CssNano = require('cssnano'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    BundleTracker = require('webpack-bundle-tracker'),
    SassJsonImporter = require('node-sass-json-importer'),
    SassLintPlugin = require('sasslint-webpack-plugin');

var paths = {
    'src': __dirname + '/app/',
    'dist': __dirname + '/static/quizzical/bundles/'
}

var modulesDirectories = ['./node_modules/'];
var excludes = /node_modules/;

module.exports = {
    'devtool': 'source-map',
    'target': 'web',
    'context': __dirname,
    'resolve': {
        'modulesDirectories': modulesDirectories,
        'extensions': [
            '',
            '.js',
            '.css',
            '.scss'
        ]
    },
    'entry': [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        paths.src + 'quizzical.js',
    ],
    'output': {
        'path': paths.dist,
        'filename': '[name]-[hash].js',
        'chunkFilename': 'chunk-[name]-[chunkhash].js',
        //'publicPath': '/static/web/bundles/',
        'publicPath': 'http://localhost:3000/static/bundles/',
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
                'test': /\.js$/,
                'loaders': ['react-hot'],
                'exclude': excludes
            },
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
                'loader': 'babel',
                'exclude': excludes,
                'query': {
                    'presets': ['es2015', 'react', 'stage-0', 'react-hmre']
                }
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
            '__DEV__': JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
            '__PRERELEASE__': JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
        }),
        new SassLintPlugin({
            'configFile': './.sass-lint.yml',
            'context': paths.src,
            'failOnError': false,
            'failOnWarning': false
        }),
        new BundleTracker({path: __dirname, filename: '../webpack-quizzical-map.json'}),
        new Webpack.optimize.OccurrenceOrderPlugin(),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoErrorsPlugin()
    ],
    'postcss': function() {
        return [Autoprefixer({
            'browsers': ['> 1%', 'IE 7', 'IE 8', 'IE 9']
        }), CssNano];
    },
    'sassLoader': {
        'precision': 3,
        'indentWidth': 4,
        'includePaths': modulesDirectories,
        'importer': SassJsonImporter
    },
    'uglify-loader': {
        'mangle': false
    },
    'babel-loader': {
        'cacheDirectory': true,
        'plugins': ['transform-runtime']
    }
}
