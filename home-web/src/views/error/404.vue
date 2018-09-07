<template lang="html">
  <div class="error-container">
    <div class="breadcrumb-con">
            <el-breadcrumb separator="/" class="zq-smallnav">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/uam' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item>更新记录</el-breadcrumb-item>
            </el-breadcrumb>
    </div>
    <div class="error-image">
        <img src="../../assets/image/404.gif">
        <div class="pre_box">
            <h1>抱歉，服务器找不到请求的网页</h1>
            <p>可能原因：网址有错误 > 请检查地址是否完整或存在多余字符</p>
            <p style="padding-left:55px">网址已失效 > 可能页面已删除，物流页面已下线</p>
        </div>
    </div>
    <div class="but_form">
        <a class="back_go">
            <i class="ace-icon"></i>
            返回
        </a>
        <a class="back_go">
            <i class="ace-icon"></i>
            控制台
        </a>
    </div>
    <div class="zh-copyrights">
            <p>2014-2020 河南鲜易供应链有限公司版权所有  豫ICP备16033710号-1  服务热线:400-693-7978</p>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {};
</script>

<style rel="stylesheet/scss" lang="scss">
    .breadcrumb-con {
        border-bottom: 1px solid #E5E5E5;
        background-color: #F5F5F5;
        min-height: 41px;
        line-height: 40px;
        padding: 0 12px 0 0;
        z-index: 1;
        .zq-smallnav{
            line-height:40px;
            padding-left: 20px;
        }
    }
    .error-container {
        padding: 0;
        background: #FFF;
        .error-image {
            text-align: center;
            width: 100%;
            .pre_box {
                h1 {
                    font-size: 32px;
                    font-weight: 600;
                    padding: 10px;
                }
                p{
                    font-size: 14px;
                    line-height: 21px;
                    color: #393939;
                }
            }
        }

    }
    .but_form {
        margin: 20px 0 50px;
        text-align: center;
        .back_go {
            line-height: 34px;
            padding: 0 12px;
            border:1px solid  #70a0c1;
            border-bottom: 2px solid #70a0c1;
            color: #70a0c1;
            background: #FFF;
            margin-right: 10px;
            display: inline-block;
            .ace-icon {
                margin-right: 4px;
                text-align: center;
                display: inline-block;
            }
        }
    }
</style>
