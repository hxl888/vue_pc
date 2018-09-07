<template>
    <div class="zm-con">
        <div class="zm-tips">您还没有添加常用功能,请<a href="#" @click="noneShows">添加</a></div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        methods: {
            noneShows() {
                this.$emit('noneShows');
            }
        }
    };
</script>
