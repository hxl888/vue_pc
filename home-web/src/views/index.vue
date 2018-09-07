<template lang="html">
    <div class="main-contanier">
        <xmcsMainmenu></xmcsMainmenu>
        <div class='page-con'>
            <div class="main-01-router">
                <router-view></router-view>
            </div>
            <div class="zh-copyrights">
                <p>2014-2020 河南鲜易供应链有限公司版权所有  豫ICP备16033710号-1  服务热线:400-693-7978</p>
            </div>
        </div>
    </div>
</template>

<script>
    import xmcsMainmenu from 'components/xcmsMainmenu/index';
    export default {
        components: {
            xmcsMainmenu
        }
    };
</script>

<style lang="scss">
</style>
