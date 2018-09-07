<template lang="html">
    <div style="padding: 10px 20px 0">
        <div class="reset-dialog order-split-dialog">
            <div class="order-split">
                <div class="sup-tab">
                    <div class="clearfix">
                        <p>订单编号：{{rowTitlist.orderId}}</p>
                        <p>订单金额：<span v-if="rowTitlist.payAbleAmount">{{rowTitlist.payAbleAmount.toFixed(2)}}</span><span v-else>0</span></p>
                        <p>优惠总额：<span v-if="rowTitlist.pmtAmount">{{rowTitlist.pmtAmount.toFixed(2)}}</span><span v-else>0</span></p>
                        <p>运费总额：<span v-if="rowTitlist.freAmount">{{rowTitlist.freAmount.toFixed(2)}}</span><span v-else>0</span></p>
                        <p>仓库名称：{{rowTitlist.storeName}}</p>
                        <p>收货地址：{{rowTitlist.caArea}} {{rowTitlist.caStreet}}</p>
                    </div>
                    <el-table
                        :data="rowtableDataList"
                        border
                        style="width: 100%">
                        <el-table-column
                            label=""
                            fixed="left"
                            width="55">
                            <template scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="商品图"
                            min-width="95">
                            <template scope="scope">
                                <div class="detail_picbox z-imgbox">
                                    <img :src="picServer + scope.row.proPicture" alt=""  width="60" height="60">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="proName"
                            label="商品名称"
                            min-width="120">
                        </el-table-column>
                        <el-table-column
                            prop="proNum"
                            label="商品货号"
                            min-width="120">
                        </el-table-column>
                        <el-table-column
                            prop="proOrgCodeName"
                            label="商品分类"
                            min-width="120">
                        </el-table-column>
                        <el-table-column
                            prop="specValue"
                            label="规格"
                            min-width="120">
                        </el-table-column>
                        <el-table-column
                            prop="proPrice"
                            label="商品单价"
                            min-width="120">
                            <template scope="scope">
                                <div v-if="scope.row.proPrice">
                                    {{scope.row.proPrice.toFixed(2)}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="purchaseNum"
                            label="购买数量"
                            min-width="120">
                            <template scope="scope">
                                <div v-if="scope.row.purchaseNum">
                                    {{scope.row.purchaseNum.toFixed(2)}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="proPayAmount"
                            label="商品金额"
                            min-width="120">
                            <template scope="scope">
                                <div v-if="scope.row.proPayAmount">
                                    {{scope.row.proPayAmount.toFixed(2)}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="pmtAmount"
                            label="优惠金额"
                            min-width="120">
                            <template scope="scope">
                                <div v-if="scope.row.pmtAmount">
                                    {{scope.row.pmtAmount.toFixed(2)}}
                                </div>
                                <div v-else>0</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="specialDisamount"
                            label="特批优惠金额"
                            min-width="120">
                            <template scope="scope">
                                <div v-if="scope.row.specialDisamount">
                                    {{scope.row.specialDisamount.toFixed(2)}}
                                </div>
                                <div v-else>0</div>
                            </template>
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--prop="freAmount"-->
                            <!--label="运费金额"-->
                            <!--min-width="120">-->
                            <!--<template scope="scope">-->
                                <!--<div v-if="scope.row.freAmount">-->
                                    <!--{{scope.row.freAmount.toFixed(2)}}-->
                                <!--</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <el-table-column
                            prop=""
                            label="剩余数量"
                            min-width="120">
                            <template scope="scope">
                                <div v-if="scope.row.proSplitSurplusNum">
                                    {{parseFloat(scope.row.proSplitSurplusNum).toFixed(2)}}
                                </div>
                                <div v-else>
                                    <span v-if="scope.row.purchaseNum">
                                        {{parseFloat(scope.row.purchaseNum).toFixed(2)}}
                                    </span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            label="拆分数量"
                            fixed="right"
                            min-width="120">
                            <template scope="scope">
                                <div>
                                    <el-input class="xe-input-smal90" @blur="parseFloatNum(scope.$index, scope.row.pricingType)"  @input.native="parseIntNum($event, scope.$index, scope.row.purchaseNum, scope.row.proSplitSurplusNum, scope.row.pricingType)" v-model.trim="scope.row.proSplitNum" :maxlength="scope.row.purchaseNum.toString().length + 3"  placeholder="请输入"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin: 10px 0 20px">
                        <el-select size="small" class="xe-input-w160" style="margin-right: 10px" v-model="puboderSerData.orderStoreId" placeholder="请选择">
                            <el-option
                                v-for="item in orderStoreIdListother"
                                :label="item.storeName"
                                :key="item.storeId"
                                :value="item.storeId">
                            </el-option>
                        </el-select>
                        <el-button @click="splitOrderForWebCk"  class="xe-button-normal" :loading="loading" type="primary">拆出新订单</el-button>
                    </div>
                    <!--拆分子订单展示-->
                    <div class="sup-tab" v-for="(item, index) in orderFormList" v-if="orderFormList.length && !item.orderId && item.splitOrderDetailList.length > 0">
                        <div class="clearfix">
                            <p>子订单编号：系统分配</p>
                            <p>订单金额：<span v-if="item.payAmount">{{item.payAmount.toFixed(2)}}</span></p>
                            <p>优惠总额：<span v-if="item.pmtAmount">{{item.pmtAmount.toFixed(2)}}</span><span v-else>0</span></p>
                            <p>运费总额：<span v-if="item.freAmount">{{item.freAmount.toFixed(2)}}</span><span v-else>0</span></p>
                            <p>仓库名称：{{item.storeName}}</p>
                            <p>收货地址：{{rowTitlist.caArea}} {{rowTitlist.caStreet}}</p>
                        </div>
                        <el-table
                            :data="item.splitOrderDetailList"
                            border
                            style="width: 100%">
                            <el-table-column
                                label=""
                                class-name="td-index"
                                width="30">
                                <template scope="scope">
                                    {{scope.$index + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="商品图"
                                min-width="95">
                                <template scope="scope">
                                    <div class="detail_picbox z-imgbox">
                                        <img :src="picServer + scope.row.proPicture" alt=""  width="60" height="60">
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="proName"
                                label="商品名称"
                                min-width="120">
                            </el-table-column>
                            <el-table-column
                                prop="proNum"
                                label="商品货号"
                                min-width="120">
                            </el-table-column>
                            <el-table-column
                                prop="proOrgCodeName"
                                label="商品分类"
                                min-width="120">
                            </el-table-column>
                            <el-table-column
                                prop="specValue"
                                label="规格"
                                min-width="90">
                            </el-table-column>
                            <el-table-column
                                prop="id"
                                label="商品单价"
                                min-width="90">
                                <template scope="scope">
                                    <div v-if="scope.row.proPrice">
                                        {{scope.row.proPrice.toFixed(2)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="purchaseNum"
                                label="购买数量"
                                min-width="120">
                                <template scope="scope">
                                    <div v-if="scope.row.purchaseNum">
                                        {{scope.row.purchaseNum.toFixed(2)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="proPayAmount"
                                label="商品金额"
                                min-width="120">
                                <template scope="scope">
                                    <div v-if="scope.row.proTotalPrice">
                                        {{scope.row.proTotalPrice.toFixed(2)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="pmtAmount"
                                label="优惠金额"
                                min-width="120">
                                <template scope="scope">
                                    <div v-if="scope.row.pmtAmount">
                                        {{scope.row.pmtAmount.toFixed(2)}}
                                    </div>
                                    <div v-else>0</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="specialDisamount"
                                label="特批优惠金额"
                                min-width="120">
                                <template scope="scope">
                                    <div v-if="scope.row.specialDisamount">
                                        {{scope.row.specialDisamount.toFixed(2)}}
                                    </div>
                                    <div v-else>0</div>
                                </template>
                            </el-table-column>
                            <!--<el-table-column-->
                                <!--prop="freAmount"-->
                                <!--label="运费金额"-->
                                <!--min-width="120">-->
                                <!--<template scope="scope">-->
                                    <!--<div v-if="scope.row.freAmount">-->
                                        <!--{{scope.row.freAmount.toFixed(2)}}-->
                                    <!--</div>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <el-table-column
                                label="操作"
                                min-width="75"
                                :render-header='renderHeader'
                                fixed="right">
                                <template scope="scope">
                                    <div>
                                        <a href="javascript:;" class="alinkblu" @click="deleteRow(orderFormList, index)">删除</a>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['rowtableData', 'rowTitlist', 'orderStoreIdListother', 'splitOrderdialog', 'orderSavebut'],
        data() {
            return {
                dialogVisible: true,
                puboderSerData: {
                    orderStoreId: ''
                },
                loading: false, // 防止多次提交
                flagInput: false, // 验证拆减法数量是否符合规则开关
                selectIndex: '',
                postIndex: 0, // 拆单请求次数
                orderFormList: [],
                productUrl: '/xe-route/xe-erp'
//                productUrl: ''
            };
        },
        methods: {
            parseIntNum(event, index, purchaseNum, proSplitSurplusNum, pricingType) {
                let value = '';
                if (value >= 0) {
                    if (pricingType === 1) { // 重量 -》(支持)填写小数
                        value = parseFloat(event.target.value);
                        if (proSplitSurplusNum) {
                            if (parseFloat(value) <= parseFloat(proSplitSurplusNum)) {
                                if (value) {
                                    event.target.value = parseInt(value);
                                } else {
                                    event.target.value = '';
                                    this.rowtableDataList[index].proSplitNum = '';
                                }
                                this.flagInput = true;
                            } else {
                                event.target.value = '';
                                this.flagInput = false;
                                this.rowtableDataList[index].proSplitNum = '';
                                this.$xeMessage.warning('拆分数量不能大于剩余数量');
                            }
                        } else {
                            if (parseFloat(value) <= parseFloat(purchaseNum)) {
//                                var reg = /^[0-9]{0,7}([.]{1}[0-9]{1,2})?$/;
                                event.target.value = value;
                                this.flagInput = true;
                            } else {
                                event.target.value = '';
                                this.flagInput = false;
                                this.rowtableDataList[index].proSplitNum = '';
                                this.$xeMessage.warning('拆分数量不能大于剩余数量');
                            }
                        }
                    } else if (pricingType === 2) {  // 数量=》(不支持)小数
                        value = event.target.value;
                        if (proSplitSurplusNum) {
                            if (parseFloat(value) <= parseFloat(proSplitSurplusNum)) {
                                if (value) {
                                    event.target.value = parseInt(value);
                                } else {
                                    event.target.value = '';
                                    this.rowtableDataList[index].proSplitNum = '';
                                }
                                this.flagInput = true;
                            } else {
                                event.target.value = '';
                                this.flagInput = false;
                                this.rowtableDataList[index].proSplitNum = '';
                                this.$xeMessage.warning('拆分数量不能大于剩余数量');
                            }
                        } else {
                            if (parseFloat(value) <= parseFloat(purchaseNum)) {
                                if (value.toString().split('.') && value.toString().split('.').length === 1) {
                                    event.target.value = value;
                                    this.flagInput = true;
                                } else if (value.toString().split('.') && value.toString().split('.').length > 1) {
                                    event.target.value = '';
                                    this.flagInput = false;
                                    this.rowtableDataList[index].proSplitNum = '';
                                    this.$xeMessage.warning('计量方式为数量的商品拆分数量不能为小数');
                                }
                            } else {
                                event.target.value = '';
                                this.flagInput = false;
                                this.rowtableDataList[index].proSplitNum = '';
                                this.$xeMessage.warning('拆分数量不能大于剩余数量');
                            }
                        }
                    }
                } else {
                    this.rowtableDataList[index].proSplitNum = '';
                }
            },
            parseFloatNum(index, pricingType) {
                if (pricingType === 1) {
//                    console.log(index);
                    if (this.rowtableDataList[index].proSplitNum) {
                        this.rowtableDataList[index].proSplitNum = parseFloat(this.rowtableDataList[index].proSplitNum).toFixed(2);
                    } else {
                        this.rowtableDataList[index].proSplitNum = '';
                    }
                }
            },
            splitOrderForWebCk(flag) { // 拆单
                let arr = [];
                this.rowtableDataList.forEach(item => {
                    if (item.proSplitNum) {
                        arr.push(item.proSplitNum);
                    }
                });
                let flag2 = this.rowtableDataList.some(item => {
                    let proSplitCk = '';
                    if (item.proSplitSurplusNum) {
                        proSplitCk = item.proSplitSurplusNum;
                    } else {
                        proSplitCk = item.purchaseNum;
                    }
                    return proSplitCk > 0;
                });
                let flag3 = this.rowtableDataList.some(item => {
                    return item.proSplitNum > 0;
                });
                if (arr.length > 0 || flag === true) {
                    if (flag2) {
                        if (flag3 || flag === true) {
                            if (this.puboderSerData.orderStoreId) {
                                if (this.flagInput) {
                                    // 拆分订单数量
                                    let flag = this.rowtableDataList.every(item => {
                                        if (item.proSplitSurplusNum) {
                                            return (parseFloat(item.proSplitSurplusNum ? item.proSplitSurplusNum : 0) >= parseFloat(item.proSplitNum ? item.proSplitNum : 0));
                                        } else {
                                            return (parseFloat(item.purchaseNum ? item.purchaseNum : 0) >= parseFloat(item.proSplitNum ? item.proSplitNum : 0));
                                        }
                                    });
                                    this.rowtableDataList.forEach(item => {
                                        if (item.proSplitSurplusNum) {
                                            if (parseFloat(item.proSplitSurplusNum) >= parseFloat(item.proSplitNum)) {
                                                if (parseFloat(item.proSplitSurplusNum) - parseFloat(item.proSplitNum ? item.proSplitNum : 0) >= 0) {
                                                    item.proSplitSurplusNum = (parseFloat(item.proSplitSurplusNum) - parseFloat(item.proSplitNum ? item.proSplitNum : 0)).toFixed(2);
                                                    console.log('item.proSplitSurplusNum1111', item.proSplitSurplusNum);
                                                    if (item.proSplitSurplusNum <= 0) {
//                                                item.proSplitNum = '';
                                                    }
                                                } else if (parseFloat(item.proSplitSurplusNum) - parseFloat(item.proSplitNum) < 0) {
//                                            item.proSplitNum = '';
                                                }
                                            } else {
                                                if (!flag) {
                                                    this.$xeMessage.warning('拆分数量不能大于剩余数量');
                                                    item.proSplitNum = '';
                                                }
                                            }
                                        } else {
                                            if ((parseFloat(item.purchaseNum) - parseFloat(item.proSplitNum ? item.proSplitNum : 0)) >= 0) {
                                                item.proSplitSurplusNum = (parseFloat(item.purchaseNum) - parseFloat(item.proSplitNum ? item.proSplitNum : 0)).toFixed(2);
                                                console.log('item.proSplitSurplusNum22222', item.proSplitSurplusNum);
//                                        item.proSplitNum = '';
                                            }
                                        }
                                    });
                                    if (flag) {
                                        this.splitOrderForWeb();
                                    }
                                }
                            } else {
                                this.$xeMessage.warning('请选择拆分仓库');
                            }
                        } else {
                            this.rowtableDataList.forEach(item => {
                                item.proSplitNum = '';
                            });
                            this.$xeMessage.warning('拆分数量要大于0');
                        }
                    } else {
                        this.$xeMessage.warning('剩余数量为零的不能进行');
                        this.rowtableDataList.forEach(item => {
                            item.proSplitNum = '';
                        });
                    }
                } else {
                    this.$xeMessage.warning('请填入拆分数量');
                }
            },
            splitOrderForWeb() { // 拆单接口调取
                let storeName = '';
                this.loading = true;
                this.orderStoreIdListother.forEach(item => {
                    if (item.storeId === this.puboderSerData.orderStoreId) {
                        storeName = item.storeName;
                    }
                });
                let obj = {
                    freAmount: this.rowTitlist.freAmount,
                    orderId: this.rowTitlist.orderId,
                    pmtAmount: this.rowTitlist.pmtAmount,
                    storeId: this.rowTitlist.storeId,
                    storeName: this.rowTitlist.storeName,
                    lockStatus: this.rowTitlist.lockStatus,
                    totalAmount: this.rowTitlist.totalAmount,
                    cpnsPmtAomount: this.rowTitlist.cpnsPmtAomount
                };
                this.rowtableDataList.forEach(item => {
                    item.storeId = this.puboderSerData.orderStoreId;
                    item.storeName = storeName;
                });
                let params = Object.assign(obj);
                params.splitOrderDetailList = this.rowtableDataList;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/split/splitOrderForWeb`,
                    data: params
                }).then((res) => {
                    this.postIndex += 1;
                    this.loading = false;
                    this.$xeMessage.success(`${res.msg}`);
                    this.rowtableDataList.forEach(item => {
                        item.proSplitNum = '';
                    });
                    let arr = [];
                    let resFormList = res.data.orderFormList;
                    console.log('postIndex', this.postIndex);
                    if (this.orderFormList.length > 0) {
                        for (let i in this.orderFormList) {
                            if (this.orderFormList[i].orderId === null) {
                                arr.push(this.orderFormList[i]);
                            }
                        }
                    }
                    for (let j in resFormList) { // 对应拆分订单追加一条索引单号
                        if (resFormList[j].orderId === null) {
                            this.$set(resFormList[j], 'postIndex', this.postIndex);
                        }
                    }
                    this.orderFormList = arr.concat(...resFormList);
                    console.log('this.orderFormList', this.orderFormList);
                }).catch((error) => {
                    this.loading = false;
                    console.log(error);
                });
            },
            renderHeader(h, {column, $index}) {
//                console.log('h', h);
//                console.log('column', column);
//                console.log('$index', $index);
//                return (<div><span style={{position:'absoult'}}>删除</span></div>);
            },
            deleteRow(sku, index) { // 删除拆分子订单
                this.$confirm('您确认删除当前拆出的子订单吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRowmethod(sku, index);
                }).catch(() => {
                });
            },
            deleteRowmethod(sku, index) {
                let _this = this;
                let skuList = [];
                console.log('sku', sku);
                let deletaFormList = [];
                let lastdelete = [];
                let postIndex = sku[index].postIndex;
                console.log('postIndex', postIndex);
                for (let i in sku) {
                    if (sku[i].orderId === null) {
                        if (sku[i].postIndex !== postIndex) {
                            deletaFormList.push(sku[i]);
                        } else {
                            lastdelete.push(sku[i]);
                        }
                    }
                }
                this.orderFormList = deletaFormList;
                sku[index].splitOrderDetailList.forEach(item => {
                    skuList.push(item.proSku);
                });
                console.log('skuList', skuList);
                // 删除分单信息回跳到主单
                let rowtableDataList = this.rowtableDataList;
                console.log('lastdelete', lastdelete);
                for (let i = 0, len = rowtableDataList.length; i < len; i++) {
                    for (let j = 0, lens = lastdelete[0].splitOrderDetailList.length; j < lens; j++) {
                        if (rowtableDataList[i].proSku === lastdelete[0].splitOrderDetailList[j].proSku) {
                            if (lastdelete[0].splitOrderDetailList[j].purchaseNum) {
                                rowtableDataList[i].proSplitSurplusNum = parseFloat(rowtableDataList[i].proSplitSurplusNum ? rowtableDataList[i].proSplitSurplusNum : 0) + parseFloat(lastdelete[0].splitOrderDetailList[j].purchaseNum);
                            }
                        }
                    }
                }
                setTimeout(() => {
                    _this.splitOrderForWebCk(true);
                }, 300);
            },
            splitOrderSave() {
                console.log('9999');
            },
            splitOrderSavepost() {
                if (this.orderFormList.length > 0) {
                    this.$confirm('若拆分仓库库存不足，拆出子订单将会流转至异常订单，您确认拆分当前订单吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let params = {};
                        this.$emit('startChaifen');
                        params.orderId = this.rowTitlist.orderId;
                        params.splitOrderList = this.orderFormList;
                        console.log('params--->', params);
                        this.$http({
                            method: 'post',
                            url: `${this.productUrl}/split/splitOrder`,
                            data: params
                        }).then((res) => {
                            this.$emit('startChaifensuces');
                            this.$emit('startChaifenErr');
                            this.$xeMessage.success(`${res.msg}`);
                        }).catch((error) => {
                            this.$emit('startChaifenErr');
                            console.log(error);
                        });
                    }).catch(() => {
                        this.$emit('startChaifenErr');
                    });
                } else {
                    this.$xeMessage.warning('当前订单未拆分，请先拆分订单再保存');
                    this.$emit('startChaifenErr');
                }
            }
        },
        computed: {
            picServer() {
                return this.rowtableData.picServer;
            },
            rowtableDataList() {
                if (this.rowtableData.orderInfoDetail) {
                    let tableData = this.rowtableData.orderInfoDetail;
                    tableData.forEach(item => {
                        this.$set(item, 'proSplitSurplusNum', '');
                        this.$set(item, 'proSplitNum', '');
                    });
                    return tableData;
                }
            }
        },
        watch: {
            splitOrderdialog(n) {
                let _this = this;
                if (n === false) {
                    setTimeout(() => {
                        _this.puboderSerData.orderStoreId = '';
                        _this.orderFormList = [];
                        _this.rowtableDataList.forEach(item => {
                            item.proSplitNum = '';
                        });
                    }, 300);
                }
            },
            orderSavebut(n) {
//                console.log('orderSavebut', n);
                if (n === true) {
                    this.splitOrderSavepost();
                }
            }
        }
    };
</script>

<style lang="scss">
    .order-split-dialog .sup-tab p, .order-split-dialog .sub-tab p {
        float: left;
        line-height: 32px;
        margin-right: 30px;
    }
</style>
