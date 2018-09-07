<template lang="html">
    <div class="m-router-con">
        <strong>物流中心</strong>
        <br>
        <br>
        <p>
            <router-link :to="{name: 'freightTemplateIndex'}">运费管理</router-link>
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
