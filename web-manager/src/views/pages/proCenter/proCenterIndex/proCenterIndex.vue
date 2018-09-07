<template lang="html">
    <div class="m-router-con">
        <strong>商品中心页导航</strong>
        <br>
        <br>
        <p>
            <router-link :to="{path: '/pages/proCenter/proManager/table-look-up'}">商品一览表</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: 'proCenterIndex'
};
</script>

<style lang="scss">
</style>
