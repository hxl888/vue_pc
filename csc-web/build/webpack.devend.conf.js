/**
 * Created by zhangwen on 2017/4/6.
 */
/**
 * Created by zhangwen on 2017/3/28.
 */
var path = require('path');
var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var env = config.devend.env;

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.devend.productionSourceMap,
            extract: true
        })
    },
    devtool: config.devend.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.devend.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        }),
        
        new optimizeCssAssetsWebpackPlugin(),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        // new SpritesmithPlugin({
        //     src: {
        //         cwd: path.resolve(__dirname, '../src/assets/image/sprites/'),
        //         glob: '*.png'
        //     },
        //     target: {
        //         // image: path.resolve(__dirname, 'build/images/sprite.png'),
        //         image: utils.assetsPath('img/sprites/sprite.png'),
        //         // css: path.resolve(__dirname, 'build/css/sprite.css')
        //         css: utils.assetsPath('css/sprite.css')
        //     },
        //     apiOptions: {
        //         cssImageRef: '../img/sprites/sprite.png'
        //     },
        //     spritesmithOptions: {
        //         algorithm: 'top-down'
        //     }
        // }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.devend.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        }),
        // split vendor js into its own file
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        })
    ]
})

if (config.beta.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')
    
    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.beta.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.devend.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
