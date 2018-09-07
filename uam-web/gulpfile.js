/**
 * Created by zhangwen on 2017/4/10.
 */
var gulp = require('gulp');
var sftp = require('gulp-sftp');
var config = require('./config');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var copy = require('gulp-copy');
var clean = require('gulp-clean');
var del = require('del');
var vinylPaths = require('vinyl-paths');

var runProFlag = true;
var imageAssetPath = '';
var ftpAuth = {};
var ftpAuthImg = {};

if (process.env.NODE_ENV === 'production') {
    runProFlag = true;
    imageAssetPath = './dist/' + process.env.ProVersionTime + '/';
} else if(process.env.NODE_ENV === 'devend') {
    runProFlag = false;
    imageAssetPath = config.devend.assetsRoot;
    // 开发服务器地址
    ftpAuth = {
        host: '192.168.28.85',
        user: 'root',
        pass: 'rootroot',
        remotePath: '/website/paas-web/uam/'
    };
} else if(process.env.NODE_ENV === 'test') {
    runProFlag = false;
    imageAssetPath = config.test.assetsRoot;
    // 开发服务器地址
    ftpAuth = {
        host: '47.93.39.92',
        user: 'xescm',
        pass: 'xescm#1005',
        remotePath: '/website/paas-web/uam/'
    };
} else if(process.env.NODE_ENV === 'beta') {
    runProFlag = false;
    imageAssetPath = config.beta.assetsRoot;
    // 开发服务器地址
    ftpAuth = {
        host: '59.110.238.163',
        user: 'xescm',
        pass: 'xescm#1005',
        remotePath: '/website/paas-web/uam/'
    };
};

if (!runProFlag) {
    // 压缩img内未经压缩的图片,存至imagemins文件夹内
    gulp.task('imagemin', function () {
        return gulp.src(imageAssetPath+'/static/img/**/*.{png,jpg,gif,svg}')
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
                use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
            }))
            .pipe(gulp.dest(imageAssetPath+'/static/imagemins'));
    });

    // 删除img内未经压缩处理的图片
    gulp.task('clean-img', ['imagemin'], function () {
        return gulp.src(imageAssetPath + '/static/img/**/*', {read: false})
               .pipe(clean())
    });

    // 复制压缩后的图片到img文件夹
    gulp.task('copy-img', ['clean-img'], function () {
       return gulp.src(imageAssetPath + '/static/imagemins/**/*')
           .pipe(gulp.dest(imageAssetPath + '/static/img/'))
    });

    // 删除复制完压缩图后的imagemins文件夹
    gulp.task('clean-imagemins', ['copy-img'], function () {
        return gulp.src(imageAssetPath + '/static/imagemins', {read: false})
            .pipe(clean({force: true}))
    });

    gulp.task('deploy', ['clean-imagemins'], function () {
        return gulp.src(imageAssetPath + '/**/*')
            .pipe(sftp(ftpAuth));
    });
}
