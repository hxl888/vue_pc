<template lang="html">
    <div class="wrap">
        <div class="zh-breadcrumb">
            <el-breadcrumb separator="/" class="zq-smallnav">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>用户认证状态</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="zq-warp">
            <p>尊敬的用户 <span>{{loginName}}</span></p>
            <p>对不起，您的驳回原因: <span></span>{{messaglis}}</p>
            <button class="zq-once" @click="goperfect">点击重新提交认证信息</button>
        </div>
    </div>
</template>
<script>
import {getNowCookie} from 'xcms-common-plugins/src/utils/';
export default {
    data() {
        return {
            messaglis: null,
            loginName: ''
        };
    },
    beforeRouteEnter (to, from, next) {
        let nowCookie = getNowCookie();
        switch (nowCookie.userInfo.userStatus) {
            case '100' :
                // 未认证
                next({
                    path: '/home/userinitial'
                });
                break;
            case '200' :
                // 认证中
                next({
                    path: '/home/userauthentication'
                });
                break;
            case '300' :
                // 驳回
                next(vm => {
                    vm.loginName = nowCookie.userInfo.loginName;
                });
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
        this.checkstatus();
    },
    methods: {
        checkstatus() {
            let _this = this;
            _this.$http({
                method: 'post',
                url: '/page/uam/approve/queryUamUserStatus'
            }).then(function (res) {
                console.log(res);
                if (res.code === 200) {
                    _this.messaglis = res.result.remark;
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        goperfect() {
            this.$router.push({name: 'perfectMessage'});
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" >
    .zq-warp{
        min-width:500px;
        margin:auto;
        text-align:center;
        position: relative;
        top:150px;
        p{
            line-height:30px;
        }
        button {
            margin-top:30px;
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
</style>
