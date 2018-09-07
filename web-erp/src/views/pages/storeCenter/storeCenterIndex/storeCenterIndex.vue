<template lang="html">
    <div class="m-router-con">
        <strong>店铺中心页导航</strong>
        <br>
        <br>
        <p>
            <router-link :to="{path: '/pages/storeCenter/storeManager/storeOverview'}">店铺一览表</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: 'storeCenter'
};
</script>

<style lang="scss">
</style>
