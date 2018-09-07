<template lang="html">
    <div class="m-router-con">
        <strong>财务中心页导航</strong>
        <br>
        <br>
        <p>
            <router-link :to="{name: 'supplierCheckList'}">xxx一览表</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: 'financeCenter'
};
</script>

<style lang="scss">
</style>
