<template lang="html">
    <div class="m-router-con">
        <strong>客户中心</strong>
        <br>
        <br>
        <p>
            <router-link :to="{path: '/pages/customerCenter/customerManager/customerGoup'}">客户分组</router-link>
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
