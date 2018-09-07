<template lang="html">
    <div class="wrap">
        <div class="zh-breadcrumb">
            <el-breadcrumb separator="/" class="zq-smallnav">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>用户认证</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="zq-contern">
            <p>尊敬的用户</p>
            <p>对不起，您还未进行认证，暂无操作权限</p>
            <button @click="navToInital" class="zq-once">即刻认证，开启全新体验</button>
        </div>
    </div>
</template>
<script>
    import approve from 'mixins/approve';
    export default {
        mixins: [approve],
        methods: {
            navToInital() {
                this.$router.replace({
                    name: 'perfectMessage'
                });
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
.wrap{
    width: 100%;
    .zq-contern{
        margin: 10% 0;
        p{
            width: 100%;
            line-height: 50px;
            font-size: 16px;
            text-align: center;
            display:block;
        }
    }
    .zq-once{
        background-color: #dddddd;
        font-size: 16px;
        display: block;
        width: 300px;
        height: 50px;
        line-height: 30px;
        text-align: center;
        margin:0 auto;
        border: 0;
    }
}
</style>
