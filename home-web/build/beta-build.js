/**
 * Created by zhangwen on 2017/3/28.
 */
// https://github.com/shelljs/shelljs
require('./check-versions')();

process.env.NODE_ENV = 'beta';

var ora = require('ora');
var path = require('path');
var chalk = require('chalk');
var shell = require('shelljs');
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.beta.conf');

var spinner = ora('building for beta...');
spinner.start();

var assetsPath = path.join(config.beta.assetsRoot, config.beta.assetsSubDirectory);
shell.rm('-rf', assetsPath);
shell.mkdir('-p', assetsPath);
shell.config.silent = true;
shell.cp('-R', 'static/*', assetsPath);
shell.config.silent = false;

webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) {
        throw err;
    } else {
        process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n');
        
        console.log(chalk.cyan('  beta Build complete.\n'));
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ));
        
        console.log(chalk.cyan('  开始上传到预生产(beta)务器.\n'));
        shell.exec('gulp deploy');
    };
})
