<template lang="html">
    <div class="m-router-con m-router-con-top0">
        <h2 class="u-title">商品名称：{{proName}}</h2>
        <div class="select-Pricetype">
            <el-form ref="form">
                <el-form-item>
                    <div class="main-select">
                        <el-radio class="radio" v-model="radioValue" :label="2">一口价</el-radio><span class="txt-tips">一口价指定商品，请为商品配置运费模板</span>
                    </div>
                    <div v-show='radioValue === 2' class="table-translate">
                        <div>
                            <span class="txt-label"><!--i class="s-red">*</i--> 运费模板&nbsp;</span>
                            <el-select size="small" :disabled="!fareBaseList.length" placeholder="请选择运费模板" v-model="temfreight">
                                <el-option
                                    v-for='item in fareBaseList'
                                    :key='item.tempNum'
                                    :label='item.fareName'
                                    :value='item.tempNum'
                                >
                                </el-option>
                            </el-select>
                            <span style="padding-left: 10px;">未选择运费模板，则商品默认为包邮，运费价格为'0'。 </span>
                        </div>
                        <div class="tab-box">
                            <el-table
                                :data="tableData3"
                                border
                                style="width: 100%">
                                <el-table-column v-if='formThead.length' v-for='(spec,sIndex) in formThead' :key='sIndex' :label="spec">
                                    <template scope="scope">
                                        {{scope.row.proSkuSpecList && scope.row.proSkuSpecList[sIndex].specValue}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="proNum"
                                    label="货号"
                                >
                                </el-table-column>

                                <el-table-column
                                    prop="skuPrice"
                                    label="建议销售价(元)"
                                >
                                    <template scope="scope">
                                        {{scope.row.skuPrice | numberToFixed2}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="saleQuantity"
                                    label="销售库存"
                                >
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template scope="scope">
                                        <div class="btn-in-table" @click.prevent='setJtBox(scope.row)'>
                                            <a href="javascript:;" class="s-blue">设置区域价格</a>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="main-select">
                        <el-radio class="radio" v-model="radioValue" :label="1">询报价</el-radio><span class="txt-tips">询报价指议价商品，客户可以选择配送价或自提价，作为询价的参考。</span>
                    </div>
                    <div v-show='radioValue === 1' class="sub-check-box">
                        <p class="sub-check">
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="1">配送价</el-checkbox>
                                <el-checkbox label="2">自提价</el-checkbox>
                            </el-checkbox-group>
                        </p>
                        <div>
                            报价过期时间&nbsp;&nbsp;
                            <el-select size="small" placeholder="请选择报价过期时间" v-model="overtime">
                                <el-option
                                    v-for="(item, index) in failureTimeList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="main-select">
                        <el-radio class="radio" v-model="radioValue" :label="3">面议</el-radio><span class="txt-tips">面议商品也是询报价商品，价格区域展示为“面议”，客户可进行询价操作。</span>
                    </div>
                    <div v-show='radioValue === 3' class="sub-check-box">
                        <p class="sub-check">
                            <el-checkbox-group v-model="facecheckList">
                                <el-checkbox label="1">配送价</el-checkbox>
                                <el-checkbox label="2">自提价</el-checkbox>
                            </el-checkbox-group>
                        </p>
                        <div>
                            报价过期时间&nbsp;&nbsp;
                            <el-select size="small" placeholder="请选择报价过期时间" v-model="faceovertime">
                                <el-option
                                    v-for="(item, index) in failureTimeList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" v-if="auditFlag === 2" type="primary" @click.prevent='submitFn'>提交审核</el-button>
                    <el-button class="xe-button-normal" v-else type="primary" @click.prevent='submitFn'>提交</el-button>
                    <el-button class="xe-button-normal" @click.prevent="goBack">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 设置区域价弹窗 -->
        <setAreaPrice :dialogVisible.sync='setAreaPriceVisible' :itemData.sync='skuItemData'></setAreaPrice>
        <!-- 自动上架提示弹窗 -->
        <el-dialog class='el-dialog-tiny'
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :show-close='false'
            :visible.sync="autoUpVisible" size="tiny">
          <div class="title">{{auditFlag === 1 ? '确认提交？' : '确认提交审核？'}}</div>
          <div class="cz">
              <el-checkbox :true-label='1' :false-label='2' v-model='parmas.autoUpFlag'>{{auditFlag === 1 ? '提交后自动上架' : '审核通过后自动上架'}}</el-checkbox>
          </div>
          <span slot="footer" class="dialog-footer">
                <el-button class="xe-button-normal" type="primary" @click='sendVenPro' :loading="submitBtnLoading">确 定</el-button>
                <el-button class="xe-button-normal" @click="autoUpVisible = false">取 消</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
import setAreaPrice from './setAreaPrice';
import {failureTime} from '@/dataControl';
export default {
    name: 'methodOfPrice',
    data() {
        return {
            firstIn: true,
            radioValue: 2, // 价格方式
            fareBaseList: [], // 运费模板
            temfreight: '', // 运费模板
            overtime: '', // 报价过期时间
            faceovertime: '', // 面议报价过期时间
            setAreaPriceVisible: false,
            options: [],
            tableData3: [],
            proName: '',
            proReleaseMsg: null,
            skuItemData: null,
            auditFlag: '',
            checkList: [], // 询报价配送方式(前台展示）
            facecheckList: [], // 面议配送方式(前台展示）
            autoUpVisible: false, // 是否自动上架提示弹窗
            parmas: {
                'methodType': 1, // 操作类型 1.新增 2.修改
                'proSpu': this.$route.query.proSpu, // 商品spu
                'priceMethod': 2, // 定价方式 1 询报价 2 一口价 3 面议
                'autoUpFlag': 1, // 审核通过后是否自动上架 1 自动上架 2 不自动上架
                'deliveryType': 3, // 询报价配送方式(前台展示） 1配送价 2自提价 3都支持
                'failureTime': '', // 报价失效时间
                'tempNum': ''  // 运费模板编号
            },
            submitBtnLoading: false
        };
    },
    created() {
        // 当默认是一口价时取运费模板
        if (this.radioValue === 2) {
            this.queryFareBaseList();
        }
        if (window.localStorage.getItem('proreleasemsg')) {
            this.proReleaseMsg = JSON.parse(window.localStorage.getItem('proreleasemsg'));
            this.tableData3 = JSON.parse(this.proReleaseMsg.proSkuList);
            this.proName = this.proReleaseMsg.proName;
            this.auditFlag = parseInt(this.$route.query.auditFlag);
            if (this.proReleaseMsg.priceMethod) {
                this.radioValue = this.proReleaseMsg.priceMethod;
            };
            if (this.proReleaseMsg.priceMethod === 1 && this.proReleaseMsg.deliveryTypeFlag) {
                // 询报价
                this.deliveryType = this.proReleaseMsg.deliveryTypeFlag;
                this.overtime = this.proReleaseMsg.failureTimeFlag;
            }
            if (this.proReleaseMsg.priceMethod === 3 && this.proReleaseMsg.deliveryTypeFlag) {
                // 询报价
                this.facedeliveryType = this.proReleaseMsg.deliveryTypeFlag;
                this.faceovertime = this.proReleaseMsg.failureTimeFlag;
            }
        }
    },
    activated() {
        // 当默认是一口价时取运费模板
        if (!this.firstIn) {
            if (this.radioValue === 2) {
                this.queryFareBaseList();
            }
            if (window.localStorage.getItem('proreleasemsg')) {
                this.proReleaseMsg = JSON.parse(window.localStorage.getItem('proreleasemsg'));
                this.tableData3 = JSON.parse(this.proReleaseMsg.proSkuList);
                this.proName = this.proReleaseMsg.proName;
                this.auditFlag = parseInt(this.$route.query.auditFlag);
                if (this.proReleaseMsg.priceMethod) {
                    this.radioValue = this.proReleaseMsg.priceMethod;
                };
                if (this.proReleaseMsg.priceMethod === 1 && this.proReleaseMsg.deliveryTypeFlag) {
                    // 询报价
                    this.deliveryType = this.proReleaseMsg.deliveryTypeFlag;
                    this.overtime = this.proReleaseMsg.failureTimeFlag;
                }
                if (this.proReleaseMsg.priceMethod === 3 && this.proReleaseMsg.deliveryTypeFlag) {
                    // 询报价
                    this.facedeliveryType = this.proReleaseMsg.deliveryTypeFlag;
                    this.faceovertime = this.proReleaseMsg.failureTimeFlag;
                }
            }
        }
    },
    deactivated() {
        this.firstIn = false;
    },
    methods: {
        queryFareBaseList() {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/ven/proSpu/queryFareBaseList',
                data: {
                    proSpu: this.$route.query.proSpu
                }
            }).then(res => {
                console.log(res);
                this.fareBaseList = res.data.venFareBaseList;
                if (this.fareBaseList.length) {
                    if (!this.$route.query.tempNum) {
                        this.temfreight = this.fareBaseList[0].tempNum;
                    } else {
                        this.temfreight = parseInt(this.$route.query.tempNum);
                    }
                }
            }).catch(error => {
                console.log(error);
            });
        },
        setJtBox(item) {
            console.log('====itemdata====');
            console.log(item);
            console.log('====itemdata====');
            this.skuItemData = item;
            this.setAreaPriceVisible = true;
        },
//        queryVenProAreaListBySku(item) {
//            this.$http({
//                method: 'post',
//                url: '/xe-route/xe-pro/ven/proSpu/queryVenProAreaListBySku',
//                data: {
//                    proSku: item.proSku
//                }
//            }).then(res => {
//                console.log('一口价区域价信息回显');
//
//                this.skuItemData = item;
//                this.setAreaPriceVisible = true;
//                console.log(this.skuItemData);
//                console.log(res);
//                console.log('一口价区域价信息回显');
//            }).catch(error => {
//                console.log(error);
//            });
//        },
        submitFn() {
            this.parmas.methodType = this.$route.query.methodType; // 操作类型
            this.parmas.proSpu = this.$route.query.proSpu; // 商品SPU
            this.parmas.priceMethod = this.radioValue; // 定价方式 1 询报价 2 一口价 3 面议
            if (this.parmas.priceMethod === 1) {
                // 询报价
                if (!this.deliveryType || !this.overtime) {
                    this.$xeMessage.error('请选择询报价配送方式和报价过期时间');
                    return;
                }
                this.parmas.deliveryType = this.deliveryType; // 询报价配送方式
                this.parmas.failureTime = this.overtime;
            } else if (this.parmas.priceMethod === 2) {
                // 一口价
                this.parmas.tempNum = this.temfreight;
                let reflag = [];
                console.log('tabledata3');
                console.log(this.tableData3);
                console.log('tabledata3');
                this.tableData3.forEach((item, index) => {
                    console.log(item);
                    if ((!item.proAreaList || !item.proAreaList.length) && !item.proSku) {
                        reflag.push(index + 1);
                    }
                });
                if (reflag.length > 0) {
                    this.$xeMessage.error('第' + reflag.join(',') + '个SKU没有设置区域价格');
                    return;
                } else {
                    let proSkuAreaList = [];
                    this.tableData3.forEach(item => {
                        let obj = {
                            proSku: item.proSku ? item.proSku : '' // 商品SKU
                        };
                        let areaData = [];
                        if (item.proAreaList && item.proAreaList.length > 0) {
                            item.proAreaList.forEach(area => {
                                let areaObj = {
                                    tyPriceFlag: area.tyPriceFlag,
                                    priceType: area.priceType,
                                    saleAreaId: area.areaId,
                                    areaPrice: area.areaPrice,
                                    stepFlag: area.stepFlag,
                                    areaStepList: area.areaStepList
                                };
                                areaData.push(areaObj);
                            });
                            obj.proAreaList = areaData;
                            proSkuAreaList.push(obj);
                        }
                    });
                    if (proSkuAreaList.length > 0) {
                        this.parmas.proSkuAreaList = JSON.stringify(proSkuAreaList);
                    }
                }
            } else {
                // 面议
                if (!this.facedeliveryType || !this.faceovertime) {
                    this.$xeMessage.error('请选择面议配送方式和报价过期时间');
                    return;
                }
                this.parmas.deliveryType = this.facedeliveryType; // 询报价配送方式
                this.parmas.failureTime = this.faceovertime;
            }
            this.autoUpVisible = true;
        },
        sendVenPro() {
            this.submitBtnLoading = true;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/ven/proSpu/sendVenPro',
                data: this.parmas
            }).then(res => {
                console.log(res);
                this.submitBtnLoading = false;
                this.autoUpVisible = false;
                this.$notify({
                    title: this.parmas.methodType === 1 ? '发布商品成功' : '修改商品成功',
                    message: this.parmas.methodType === 1 ? '发布商品成功' : '修改商品成功',
                    type: 'success'
                });
                // 发布商品成功后跳转至商品预览表
                this.$router.replace({
                    name: 'proOverviewIndex'
                });
            }).catch(error => {
                console.log(error);
                this.submitBtnLoading = false;
            });
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    computed: {
        formThead() {
            return this.tableData3[0].proSkuSpecList && this.tableData3[0].proSkuSpecList.map(v => { return v.specName; });
        },
        failureTimeList() {
            return failureTime;
        },
        deliveryType: {
            get() {
                if (!this.checkList.length) {
                    return '';
                } else if (this.checkList.length === 1) {
                    return this.checkList.join('');
                } else {
                    return 3;
                }
            },
            set(val) {
                if (val === 3) {
                    this.checkList = ['1', '2'];
                } else {
                    this.checkList = [val + ''];
                }
            }
        },
        facedeliveryType: {
            get() {
                if (!this.facecheckList.length) {
                    return '';
                } else if (this.facecheckList.length === 1) {
                    return this.facecheckList.join('');
                } else {
                    return 3;
                }
            },
            set(val) {
                console.log('val====' + typeof val);
                if (val === 3) {
                    this.facecheckList = ['1', '2'];
                } else {
                    this.facecheckList = [val + ''];
                }
            }
        }
    },
    watch: {
        radioValue(value) {
            if (value === 2) {
                this.queryFareBaseList();
            }
        }
    },
    components: {
        setAreaPrice
    }
};
</script>

<style lang="scss">
</style>
