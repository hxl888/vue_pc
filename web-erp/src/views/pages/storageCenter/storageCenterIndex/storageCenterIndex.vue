<template lang="html">
    <div class="m-router-con">
        <strong>仓储中心页导航</strong>
        <br>
        <br>
        <p>
            <router-link :to="{path: '/pages/storageCenter/storageManager/storageList'}">仓储一览表</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: 'storageCenter'
};
</script>

<style lang="scss">
</style>
