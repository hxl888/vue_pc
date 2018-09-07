// see http://vuejs-templates.github.io/webpack for documentation.
let path = require('path');
const versionDate = new Date();
const version = `${versionDate.getFullYear()}${(versionDate.getMonth()+1) >= 10 ? versionDate.getMonth()+1 : '0' + (versionDate.getMonth()+1)}${versionDate.getDate() >= 10 ? versionDate.getDate() : '0' + versionDate.getDate()}${versionDate.getHours() >= 10 ? versionDate.getHours() : '0' + versionDate.getHours()}${versionDate.getMinutes() >= 10 ? versionDate.getMinutes() : '0' + versionDate.getMinutes()}`;
process.env.ProVersionTime = version;
module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, `../dist/${version}/index.html`),
        assetsRoot: path.resolve(__dirname, `../dist/${version}/`),
        assetsSubDirectory: 'static',
        assetsPublicPath: 'http://paas-web.xianyiscm.com/uam/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compressiovn-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    beta: {
        env: require('./beta.env'),
        index: path.resolve(__dirname, `../beta/index.html`),
        assetsRoot: path.resolve(__dirname, `../beta/`),
        assetsSubDirectory: 'static',
        assetsPublicPath: 'http://paas-web-beta.xianyiscm.com/uam/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compressiovn-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    test: {
        env: require('./test.env'),
        index: path.resolve(__dirname, `../test/index.html`),
        assetsRoot: path.resolve(__dirname, `../test/`),
        assetsSubDirectory: 'static',
        assetsPublicPath: 'http://paas-web-test.xianyiscm.com/uam/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compressiovn-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    devend: {
        env: require('./devend.env'),
        index: path.resolve(__dirname, `../devend/index.html`),
        assetsRoot: path.resolve(__dirname, `../devend/`),
        assetsSubDirectory: 'static',
        assetsPublicPath: 'http://paas-web-dev.xianyiscm.com/uam/',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compressiovn-webpack-plugin
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
        port: 8001, // 用户中心
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/page': {
                // target: 'http://192.168.32.196:7001/',
                target: 'http://192.168.28.81/',
                // target: 'http://192.168.32.191:8001/',
                // target: 'http://192.168.32.228:7001/',
                changeOrigin: true,
                pathRewrite: {
                    '^/page': '/page'
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
};
