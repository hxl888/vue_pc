<template lang="html">
    <div class="login_mainBox">
        <home-header></home-header>
        <router-view></router-view>
        <hcms-foot></hcms-foot>
    </div>
</template>

<script type="text/ecmascript-6">
    import homeHeader from 'components/xcmeLoginHeaandfoot/LoginHeader';
    import hcmsFoot from 'components/xcmeLoginHeaandfoot/LoginFoot';
    export default {
        components: {
            homeHeader,
            hcmsFoot
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
