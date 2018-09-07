<template lang="html">
    <div class='m-breadcrumb'>
        <el-breadcrumb separator=">">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key='item.index' :to="{name: item.name}">{{item.meta.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'breadcrumb',
    created() {
        this.getBreadcrumb();
    },
    data() {
        return {
            levelList: null
        };
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.meta.name);
            this.levelList = matched;
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    }
};
</script>
