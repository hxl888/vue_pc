<template lang="html">
    <div class="m-router-con">
        <strong>采购中心页导航</strong>
        <br>
        <br>
        <p>
            <router-link :to="{name: 'supplierListIndex'}">采购中心列表</router-link>
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
