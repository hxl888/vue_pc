<template lang="html">
    <div class="m-router-con">
        <strong>订单中心页导航</strong>
        <br>
        <br>
        <p>
            <router-link :to="{path: '/pages/orderCenter/orderManager/orderQueryList'}">订单一览表</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: 'orderCenter'
};
</script>

<style lang="scss">
</style>
