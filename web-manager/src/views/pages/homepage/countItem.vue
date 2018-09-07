<template lang="html">
    <div class="m-home-item countitem">
        <ul v-if="getData">
            <li v-for="(item, index) in getData" v-loading="loading">
                <div class="item">
                    <div class="count-num" @click="homeGoto(index)">{{item}}</div>
                    <div class="count-text"  @click="homeGoto(index)">{{index | homepageDatafiter}}</div>
                    <div @click="reload(index)" class="count-reload iconfont icon-shouyeshuaxin"></div>
                    <!--<div class="count-remove el-icon-circle-close"></div>-->
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'countitem',
    data() {
        return {
            getData: {},
            loading: false,
            productUrl: '/xe-route/xe-mis'
//                productUrl: ''
        };
    },
    created() {
        this.homegetData();
    },
    methods: {
        homegetData(typeId) {
            let params = {};
            if (typeId) {
                params.typeId = typeId;
            } else {
                params.typeId = 0;
                this.loading = true;
            }
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/homepage/getData`,
                data: params
            }).then((res) => {
                if (typeId === 'waitProNum') {
                    this.getData.waitProNum = res.data.dataInfo.waitProNum;
                } else if (typeId === 'waitVenNum') {
                    this.getData.waitVenNum = res.data.dataInfo.waitVenNum;
                } else if (typeId === 'waitSignVenNum') {
                    this.getData.waitSignVenNum = res.data.dataInfo.waitSignVenNum;
                } else if (typeId === 'waitSalesNum') {
                    this.getData.waitSalesNum = res.data.dataInfo.waitSalesNum;
                } else if (typeId === 'orderNum') {
                    this.getData.orderNum = res.data.dataInfo.orderNum;
                } else if (typeId === 'userNum') {
                    this.getData.userNum = res.data.dataInfo.userNum;
                } else if (typeId === 'signVenNum') {
                    this.getData.signVenNum = res.data.dataInfo.signVenNum;
                } else if (typeId === 'applyVenNum') {
                    this.getData.applyVenNum = res.data.dataInfo.applyVenNum;
                } else if (!typeId) {
                    this.loading = false;
                    this.getData = res.data.dataInfo;
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        reload(typeId) {
            let typeIds = '';
            if (typeId === 'waitProNum') {
                typeIds = 1;
            } else if (typeId === 'waitVenNum') {
                typeIds = 2;
            } else if (typeId === 'waitSignVenNum') {
                typeIds = 3;
            } else if (typeId === 'waitSalesNum') {
                typeIds = 4;
            } else if (typeId === 'orderNum') {
                typeIds = 5;
            } else if (typeId === 'userNum') {
                typeIds = 6;
            } else if (typeId === 'signVenNum') {
                typeIds = 7;
            } else if (typeId === 'applyVenNum') {
                typeIds = 7;
            }
            this.homegetData(typeIds);
        },
        homeGoto(to) {
            if (to === 'userNum') { // 本月新增用户
                this.$router.push({name: 'memberList_s'});
            } else if (to === 'waitProNum') { // 待审核商品
                this.$router.push({name: 'checkPendingLists'});
            } else if (to === 'waitSalesNum') { // 待审核促销
                this.$router.push({name: 'promotionAuditList'});
            } else if (to === 'applyVenNum') { // 本月商户试用申请
                this.$router.push({name: ''});
            } else if (to === 'orderNum') { // 本月订单数
                this.$router.push({name: 'orderList_s'});
            } else if (to === 'signVenNum') { // 本月签订商户
                this.$router.push({name: 'merchantlist'});
            } else if (to === 'waitVenNum') { // 待审核商户
                this.$router.push({name: 'merchantaudit'});
            } else if (to === 'waitSignVenNum') { // 待签订商户
                this.$router.push({name: 'merchantaudit'});
            }
        }
    }
};
</script>
