<template lang="html">
    <div class="wrap">
        <div class="zh-breadcrumb">
            <el-breadcrumb separator="/" class="zq-smallnav">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>用户认证审核结果</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="zq-contern">
            <p>尊敬的用户 {{userName}}</p>
            <p>您的认证信息尚在审核中，请注意查收认证通过短信。</p>
            <button class="zq-once" @click="navToIndex">先回首页看一看</button>
        </div>
    </div>
</template>
<script>
    import {getNowCookie} from 'xcms-common-plugins/src/utils/';
    export default {
        data() {
            return {
                userName: ''
            };
        },
        beforeRouteEnter (to, from, next) {
            let nowCookie = getNowCookie();
            switch (nowCookie.userInfo.userStatus) {
                case '100' :
                case '300' :
                    // 未认证
                    next({
                        path: '/home/userinitial'
                    });
                    break;
                case '200' :
                    // 认证中
                    next();
                    break;
                case '400' :
                    // 已认证
                    next({
                        path: '/'
                    });
                    break;
                default :
                    next({
                        path: '/'
                    });
            }
        },
        created() {
            let nowCookie = getNowCookie();
            console.log(nowCookie.userInfo);
            if (nowCookie.userInfo) {
                this.userName = nowCookie.userInfo.username;
            } else {
                this.checkstatus();
            }
        },
        methods: {
            navToIndex() {
                window.location.href = 'http://www.xianyiscm.com/';
            },
            checkstatus() {
                let _this = this;
                _this.$http({
                    method: 'post',
                    url: '/page/uam/approve/queryUamUserStatus'
                }).then(function (res) {
                    console.log('9999---', res);
                    if (res.code === 200) {
                        _this.userName = res.result.userName;
                    }
                }).catch(function (error) {
                    console.log('error---', error);
                });
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
        cursor: pointer;
    }
    .zq-warp{
        text-align:center;
        margim:auto;
        position: relative;
        top:100px;
        p{
            line-height:30px;
        }
        button {
            margin-top:30px;
        }
    }
}
</style>
