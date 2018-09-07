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
            });
        }
    }
};
</script>
