<template>
    <div class="login-header clearfix">
        <div class="login-logo fl">
            <div class="login-pic fl">
                <router-link :to="{name: 'login'}">
                    <img src="../../assets/images/erp-logo.png" width="164" height="30">
                </router-link>
            </div>
            <div class="login-des fl"><slot name="destext"></slot></div>
        </div>
        <div class="login-tel fr">
            <p><span class="iconfont icon-kefu"></span>客服电话 400-662-6366</p>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {};
</script>
