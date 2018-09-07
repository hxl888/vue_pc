<template lang="html">
    <div class="pages-con">
        <headerView></headerView>
        <div class="m-contanier">
            <mainMenu></mainMenu>
            <div class="m-router">
                <breadcrumb></breadcrumb>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import headerView from '@/components/header/header';
import mainMenu from '@/components/mainMenu/mainMenu';
import breadcrumb from '@/components/breadCrumb/breadCrumb';
export default {
    name: 'pageIndex',
    components: {
        headerView,
        mainMenu,
        breadcrumb
    },
    data() {
        return {
            bar: 1
        };
    },
    watch: {
        $route() {
            this.$nextTick(() => {
                $('.m-router').scrollTop(0);
                // 判断是不是到一级菜单主页
                if (this.$route.meta.pageFlag === 1) {
                    $('#menuSub_cons').hide();
                };
            });
        }
    }
};
</script>

<style lang="scss">
    .main-tab-nav {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        overflow: hidden;
        li {
            float: left;
            padding: 0 20px;
        }
        .router-link-active {
            color: red;
            background: #d1d1d1;
        }
    }
</style>
