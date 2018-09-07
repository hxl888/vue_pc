var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
var publicPaths = null;
var paths = null;
switch (process.env.NODE_ENV) {
    case 'production':
        publicPaths = config.build.assetsPublicPath;
        paths = config.build.assetsRoot;
        break;
    case 'qa':
        publicPaths = config.qa.assetsPublicPath;
        paths = config.qa.assetsRoot;
        break;
    default:
        publicPaths = config.dev.assetsPublicPath;
        paths = config.build.assetsRoot;
};
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: paths,
    filename: '[name].js',
    publicPath: publicPaths
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'static': resolve('static'),
        '@': resolve('src'),
        'components': resolve('src/components'),
        'views': resolve('src/views'),
        'mixins': resolve('src/mixins'),
        'utils': resolve('src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/vue-ueditor/src')]
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
