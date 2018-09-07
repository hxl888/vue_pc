<template lang="html">
    <div class="m-router-con index-content">
        <div class="prepageIndex">
            <!-- <h2 class='menuSub_cons_h2'>{{menuData.acName}}</h2> -->
            <div class="prepageIndex-item" v-for="(secItem, secIndex) in menuData.subList" :key='secItem.acId'>
                <h3>{{secItem.acName}}</h3>
                <ul class="clearfix">
                    <router-link tag="li" class='prepageItemLi' v-for='(thirdItem, thirdIndex) in secItem.subList' :key='thirdItem.acId' :to="{path: '/pages' + thirdItem.url}">{{thirdItem.acName}}</router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// import 'static/js/lib/jquery.menu-aim.js';
export default {
    name: 'proCenterIndex',
    data() {
        return {
            menuData: {}
        };
    },
    created() {
        let menuObj = {
            storeCenter: 'storeCenter',
            proCenter: 'proCenter',
            orderCenter: 'orderCenter',
            procurementCenter: 'procurementCenter',
            customerCenter: 'customerCenter',
            callCenter: 'callCenter',
            salesCenter: 'salesCenter',
            setingCenter: 'setingCenter',
            storageCenter: 'storageCenter',
            financeCenter: 'financeCenter',
            logisticsCenter: 'logisticsCenter'
            // storeCenter: 'storeCenter',
        };
        console.log('testrouter', this.$route.meta.acKey);
        this.getMenuData(menuObj[this.$route.meta.acKey]);
    },
    methods: {
        getMenuData(menuCenter) {
            let menuList = this.$getLocalStorage('menuList');
            if (menuList) {
                menuList = JSON.parse(menuList);
            };
            console.log('menuList', menuList);
            for (var i = 0; i < menuList.length; i++) {
                let item = menuList[i];
                console.log('item', item);
                if (item.acKey === menuCenter) {
                    this.menuData = item;
                }
            }
            // menuList.forEach(item => {
            //     console.log('item', item.acKey);
            //     if (item.acKey === menuCenter) {
            //         this.menuData = item;
            //     }
            // });
            // if (menuList) {
            //     this.menuData = JSON.parse(menuList);
            // };
        }
    }
};
</script>

<style lang="scss">
    .index-content{
        padding-top: 15px;
        .prepageIndex-item{
            ul{
                padding-bottom: 20px;
            }
            h3{
                line-height: 40px;
                font-size: 12px;
                color: #48576a;
                border-bottom: 1px solid #e4e4e4;
            }
            .prepageItemLi{
                line-height: 40px;
                width: 120px;
                background: #fff;
                border: 1px solid #d6dde3;
                float: left;
                margin: 20px 20px 20px 0;
                text-align: center;
                color: #9198a2;
                cursor: pointer;
                &:hover{
                    background: #f5f6fa;
                }
            }
        }
    }
</style>
