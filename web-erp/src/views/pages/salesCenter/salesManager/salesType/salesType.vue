<template lang="html">
    <div class="m-router-con">
        <div class="sub-favorable clearfix">
            <!--促销方式-->
            <div v-if="listDisData.length" v-for="(item, index) in listDisData" class="favorable" :class="[ColorClassFn(item.disType)]">
                <h3 class="null-head"></h3>
                <div class="discount">
                    <i class="iconfont icon-applyfor" :class="[iconClassfn(item.disType)]"></i>
                    <p class="coupon">{{item.disType | disTypeToText}}</p>
                    <p>{{item.disType | disTypeToDesText}}</p>
                </div>
                <div class="dredge">
                    <p>已创建{{templetCount}}个</p>
                    <template v-if="item.disSatatus === 1">
                        <span type="primary" class="chief">申请审核中</span>
                    </template>
                    <template v-else-if="item.disSatatus === 2">
                        <el-button type="primary" @click.prevent="applyCreateFn" class="chief">立即创建</el-button>
                        <p style="line-height: 24px;">
                            <router-link class="a-link" :to="{name: 'couponList'}">查看</router-link>
                        </p>
                    </template>
                    <template v-else-if="item.disSatatus === 3">
                        <el-button type="primary" @click.prevent="applyOpenFn(item.disType, item)" class="chief">申请开通</el-button>
                    </template>
                </div>
                <div class="lenull"></div>
                <div class="renull"></div>
            </div>
            <!--未上线功能-->
            <div class="favorable gray-favorable">
                <h3 class="null-head null-head03"></h3>
                <div class="discount discount03">
                    <i class="iconfont icon-manjian1 icon-applyfor"></i>
                    <p class="coupon">订单满减</p>
                    <p>客户购买您的商品满足一定总价后按照优惠的金额减去相应的金额</p>
                </div>
                <div class="dredge dredge03">
                    <span type="primary" class="chief chief03">敬请期待</span>
                </div>
                <div class="lenull"></div>
                <div class="renull"></div>
            </div>
            <div class="favorable gray-favorable">
                <h3 class="null-head null-head03"></h3>
                <div class="discount discount03">
                    <i class="iconfont icon-zuidizhekou1 icon-applyfor"></i>
                    <p class="coupon">订单满折</p>
                    <p>客户购买您的商品满足一定的总价后按照优惠券规则享受相应折扣</p>
                </div>
                <div class="dredge dredge03">
                    <span type="primary" class="chief chief03">敬请期待</span>
                </div>
                <div class="lenull"></div>
                <div class="renull"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'salesType',
    beforeRouteEnter(to, from, next) {
        window.$axios({
            method: 'post',
            url: '/xe-route/xe-pro/coupon/coupTemplet/listDisInfo',
            data: {}
        }).then(res => {
            console.log(res);
            next(vm => {
                vm.listDisData = res.data.listDisInfo;
                vm.templetCount = res.data.templetCount;
            });
        }).catch(error => {
            console.log(error);
        });
    },
    data() {
        return {
            listDisData: [], // 优惠券列表数据
            templetCount: 0 // 已创建优惠券数量
        };
    },
    created() {},
    methods: {
        applyOpenFn(type, subItem) {
            // 申请开通
            const h = this.$createElement;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/coupon/coupTemplet/addApply',
                data: {
                    disType: type
                }
            }).then(res => {
                console.log(res);
                this.$xeMessageBox({
                    message: h('div', {class: 'confirm-con'}, [
                        h('div', {class: 'confirm-tips'}, [
                            h('span', {class: 'el-icon el-icon-circle-check'}),
                            h('em', null, '提交成功')
                        ]),
                        h('div', {class: 'confirm-des'}, '工作人员将在1个工作日内审核')
                    ]),
                    showCancelButton: false,
                    closeOnClickModal: false,
                    closeOnPressEscape: false,
                    customClass: 'confirm-style-tip',
                    confirmButtonText: '确定',
//                    cancelButtonText: '取消',
                    type: 'success'
                });
                subItem.disSatatus = 1;
            }).catch(error => {
                console.log(error);
            });
        },
        applyCreateFn() {
            // 立即创建
            this.$router.push({name: 'salesApply'});
        },
        iconClassfn(type) {
            // 优惠类型 1 优惠券 2 订单满减 3 订单满折
            let obj = {
                1: 'icon-youhuiquan1',
                2: 'icon-manjian1',
                3: 'icon-zuidizhekou1'
            };
            return obj[type];
        },
        ColorClassFn(type) {
            // 优惠类型 1 优惠券 2 订单满减 3 订单满折
            let obj = {
                1: '',
                2: 'blue-favorable',
                3: 'orange-favorable'
            };
            return obj[type];
        }
    },
    filters: {
        disTypeToDesText(type) {
            // 优惠类型 1 优惠券 2 订单满减 3 订单满折
            let obj = {
                1: '客户购买您的商品满足一定的总价后凭券抵扣现金',
                2: '客户购买您的商品满足一定的总价后按照优惠券规则减去相应金额',
                3: '客户购买您的商品满足一定的总价后按照优惠券规则享受相应折扣'
            };
            return obj[type];
        }
    }
};
</script>

<style lang="scss"></style>
