<template lang="html">
    <div class="m-router-con">
        <strong>营销中心</strong>
        <br>
        <br>
        <p>
            <router-link :to="{path: '/pages/salesCenter/salesManager/salesApply'}">促销申请</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: 'salesCenterIndex'
};
</script>

<style lang="scss">
</style>
