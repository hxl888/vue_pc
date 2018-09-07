<template lang="html">
    <div class="m-router-con homepage">
        <countItem></countItem>
        <homeCharts></homeCharts>
        <linkItem></linkItem>
    </div>
</template>

<script>
import countItem from './countItem';
import homeCharts from './homeCharts';
import linkItem from './linkItem';
export default {
    name: 'homepage',
    components: {
        countItem,
        homeCharts,
        linkItem
    }
};
</script>

<style lang="scss">
    @import "../../../assets/styles/views/homepage.scss";
</style>
