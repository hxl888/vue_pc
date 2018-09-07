// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  qa: {
    env: require('./qa.env'),
    index: path.resolve(__dirname, '../qa/index.html'),
    assetsRoot: path.resolve(__dirname, '../qa'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8001,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/xe-zuul': {
            target: 'http://192.168.28.21/',
            changeOrigin: true,
            pathRewrite: {
                '^/xe-zuul': '/xe-zuul'
            }
        },
        '/xe-route': {
            target: 'http://192.168.28.21/',
            // target: 'http://192.168.25.203/',
            // target: 'http://192.168.25.53:8022/',
            changeOrigin: true,
            pathRewrite: {
              '^/xe-route': '/xe-route'
            }
        },
        '/xe-ueditor': {
            target: 'http://qa-yunerp.xebest.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/xe-ueditor': '/xe-ueditor'
            }
        },
        '/manager': {
            // target: 'http://192.168.33.35:8022/',
            // target: 'http://192.168.24.111:80/',
            // target: 'http://192.168.24.116:8022/',
            // target: 'http://192.168.25.179:80/',
            // target: 'http://192.168.25.204:8082/',
            // target: 'http://192.168.25.206:8022/',
            target: 'http://192.168.32.55:80/',
            // target: 'http://192.168.25.202:8081/',
            changeOrigin: true,
            pathRewrite: {
                '^/manager': '/manager'
            }
        }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
