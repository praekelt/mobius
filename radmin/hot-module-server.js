var Webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
var excludes = /node_modules/;

config.entry.push('webpack-dev-server/client?http://localhost:3000')
config.entry.push('webpack/hot/only-dev-server')

config.output.publicPath = 'http://localhost:3000/static/bundles/';

var babelLoader = config.module.loaders.pop();

// babelLoader["query"] = {
//     'presets': ['es2015', 'react', 'stage-0', 'react-hmre']
// }

config.module.loaders.push(babelLoader);

config.module.loaders.unshift(
{
    'test': /\.js$/,
    'loaders': ['react-hot'],
    'exclude': excludes
})

var webpackPlugin = new Webpack.HotModuleReplacementPlugin();
config.plugins.push(webpackPlugin);

new WebpackDevServer(Webpack(config), {
    'contentBase': 'staticsrc/',
    'publicPath': '/static/bundles/',
    'hot': true,
    'inline': true,
    'historyApiFallback': true,
    'quiet': false,
    'noInfo': true,
    //'lazy': true,
    'filename': 'radmin.js',
    'watchOptions': {
        'aggregateTimeout': 300,
        'poll': 1000
    },
    'headers': { 'X-Custom-Header': 'yes' },
    'stats': { 'colors': true }
}).listen(3000, '0.0.0.0', function(err, result){
    if (err) {
        console.log(err)
    }

    console.log('Listening at 0.0.0.0:3000')
})