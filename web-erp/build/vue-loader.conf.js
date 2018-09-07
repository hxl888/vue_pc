var utils = require('./utils')
var config = require('../config')

var sourceMap = null;
var extract = false;
var spritePath = null;
switch (process.env.NODE_ENV) {
    case 'production':
        sourceMap = config.build.productionSourceMap;
        spritePath = config.build.assetsRoot;
        extract = true;
        break;
    case 'qa':
        sourceMap = config.qa.productionSourceMap;
        spritePath = config.qa.assetsRoot;
        extract = true;
        break;
    default:
        sourceMap = config.dev.cssSourceMap;
};

if (!spritePath) {
    module.exports = {
        loaders: utils.cssLoaders({
            sourceMap: sourceMap,
            extract: extract
        })
    }
} else {
    module.exports = {
        loaders: utils.cssLoaders({
            sourceMap: sourceMap,
            extract: extract
        }),
        postcss: [
            require('postcss-easysprites')(
                {
                    spritePath: spritePath + '/static/img/'
                }
            )
        ]
    }
}
