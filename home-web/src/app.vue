<template>
    <div id="app">
        <xcms-header v-if='routerShow'></xcms-header>
        <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
    import xcmsHeader from 'components/xcmsHeader/header';
    export default {
        data() {
            return {
                routerShow: false
            };
        },
        components: {
            xcmsHeader
        },
        watch: {
            '$route': 'rs'
        },
        methods: {
            rs() {
                if (this.$route.meta.hideMainheader) {
                    this.routerShow = false;
                } else {
                    this.routerShow = true;
                };
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    @import './assets/styles/index.scss';
</style>
