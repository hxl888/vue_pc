<template lang="html">
    <div class="m-router-con">
        <strong>设置中心</strong>
        <br>
        <br>
        <p>
            <router-link :to="{path: '/pages/setingCenter/sysParamManager/stockSyncSet'}">设置中心一览表</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: 'setingCenter'
};
</script>

<style lang="scss">
</style>
