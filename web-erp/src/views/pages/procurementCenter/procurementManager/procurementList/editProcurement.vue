<template lang="html">
    <div class="m-router-con">
    <!-- {{formData}} -->
        <el-form class="resetForm" :rules="rules" ref="formData" :model="formData" label-width="92px" :inline="true">
            <!--基础信息-->
            <div class="for-itemlis">
                <h4 class="tit-salesApply"><span class="tips-right">
                    单据编号：<span class="s-blue">{{formData.purchOrder}}</span>
                </span></h4>
                <div>
                    <el-form-item label="供货商" prop="supplierName" >
                        <el-input size="small" style="width: 210px;" readonly v-model="formData.supplierName" placeholder="供货商" :maxlength="50" icon="search" @click.native="loadsupplier"></el-input>
                    </el-form-item>
                    <el-form-item prop="storeId" label="仓库">
                        <el-select size="small" style="width: 210px;" v-model="formData.storeId" placeholder="选择仓库" :filterable="true" :disabled="purchTypeFlag">
                            <template v-for="item in actionStoreList">
                                <el-option :label="item.storeName" :value="item.storeId" :key="item.storeId"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="定金" prop="frontMoney" >
                        <el-input size="small" style="width: 210px;" v-model.number="formData.frontMoney" @blur="numberFix($event, 2, 1)" placeholder="0.00" :maxlength="8"></el-input>
                    </el-form-item>
                    <el-form-item label="单据日期" prop="signDate" >
                        <el-date-picker
                            id="signDate"
                            :disabled="lcBtnDisable"
                            size="small"
                            style="width: 210px;"
                            v-model="formData.signDate"
                            type="date"
                            placeholder="选择日期"
                            @change="getSignDate"
                            :picker-options="pickerOptions0">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="预计到货日期" prop="expectedArrivalDate" >
                        <el-date-picker
                            id="expectedArrivalDate"
                            size="small"
                            style="width: 210px;"
                            v-model="formData.expectedArrivalDate"
                            type="date"
                            placeholder="选择日期"
                            @change="getArrivalDate"
                            :picker-options="pickerOptions1">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="供货商电话" prop="supplierPhone" >
                        <el-input size="small" disabled style="width: 210px;" v-model="formData.supplierPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="供货商手机" prop="supplierMobile" >
                        <el-input size="small" disabled style="width: 210px;" v-model="formData.supplierMobile" :maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="结算方式" prop="settlementMethod" >
                        <el-input size="small" disabled style="width: 210px;" v-model="formData.settlementMethodName"></el-input>
                    </el-form-item>
                    <el-form-item label="采购类型" prop="purchType" >
                        <el-input size="small" disabled style="width: 210px;" v-model="formData.purchTypeName"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人" prop="createUser" >
                        <el-input size="small" disabled style="width: 210px;" v-model="formData.createUser"></el-input>
                    </el-form-item>
                </div>
                <div class="u-opera-btnBox" style="margin-top: 20px" v-if="lcShowFlag">
                    <el-button class="xe-button-normal" @click="getGoodlist"><i class="iconfont icon-xinzeng"></i> 添加商品</el-button>
                </div>
                <!-- {{receiptDetailList}} -->
                <div class="goodsTable">
                    <!-- receiptDetailList: {{receiptDetailList}} -->
                    <!-- @selection-change="handleUpdataSelectionChange" -->
                    <el-table
                        :data="receiptDetailList"
                        border
                        show-summary
                        :summary-method="getSummaries"
                        style="width: 100%">
                        <el-table-column
                            label=""
                            class-name="td-index"
                            width="50">
                            <template scope="props">
                                <span>{{props.$index + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品图片" width="100">
                            <template scope="props">
                                <div class="z-imgbox">
                                    <img :src="picServer + picDir + props.row.picUrl" alt="商品图片" width="60" height="60">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="proName" label="商品名称" min-width="135"></el-table-column>
                        <el-table-column prop="proSku" label="SKU编码" min-width="135"></el-table-column>
                        <el-table-column prop="specValue" label="规格" min-width="95"></el-table-column>
                        <el-table-column prop="proUnit" label="单位" width="65"></el-table-column>
                        <!-- (1:按重量计算2:按数量计算)   -->
                        <el-table-column prop="priceType" label="计量方式" width="85">
                            <template scope="props">
                                {{props.row.priceType | pricingTypeToText}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="proNum" label="采购数量" min-width="95"></el-table-column>
                        <el-table-column prop="buyPrice" label="进货价" min-width="95"></el-table-column>
                        <el-table-column prop="proAmount" label="采购费用" min-width="95">
                            <template scope="props">
                                {{props.row.proAmount | priceToText}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="商品备注" min-width="95"></el-table-column>
                        <el-table-column
                            label="操作"
                            width="110">
                            <template scope="props">
                                <div class="btn-in-table">
                                    <a href="javascript:;" class="s-blue" @click="editBtn(props)">修改</a>
                                    <a href="javascript:;" class="s-blue" @click="deletSingle(props)" v-if="lcShowFlag">删除</a>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="table-below-tips">
                        <el-form-item label="" prop="remark" label-width="50px">
                            &nbsp;&nbsp;&nbsp;&nbsp;备注：<el-input size="small" style="width: 500px;" v-model="formData.remark" placeholder="请输入备注" :maxlength="50"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <div class="u-next" style="padding: 15px 0 150px;">
                        <el-button type="primary" class="xe-button-normal" v-if="formData.checkStatus === 1" @click="submitForm('formData', 1, 1)" :disabled="nextDisabled">保存</el-button>
                        <el-button type="primary" class="xe-button-normal" @click="submitForm('formData', 2, 2)" :disabled="nextDisabled">保存并提交</el-button>
                        <el-button class="xe-button-normal" @click="linkTolist">取消</el-button>
                    </div>
                </div>
            </div>
        </el-form>
        <!-- 选择供货商 -->
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="选择供货商" :visible.sync="dialogVisible" size="small" @close="dialogClosesup('dialogData')">
                <div class="clearfix supplier-userList">
                    <div class="u-top-search">
                        <!-- {{dialogData}} -->
                        <el-form :inline="true" :model="dialogData" ref="dialogData" class="demo-form-inline">
                            <el-form-item prop="searchType">
                                <el-select size="small" class="xe-input-w110" v-model="dialogData.searchType" placeholder="查询条件">
                                    <el-option
                                        v-for="item in searchSupplierList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="searchText" class="z-mr30">
                                <el-input size="small" v-model="dialogData.searchText"></el-input>
                            </el-form-item><el-form-item>
                                <el-button type="primary" @click="onSubmit(1)" class="xe-button-normal">
                                    查询
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="clearfix">
                        <!-- {{shopInfo}} -->
                        <div class="">
                            <el-radio-group v-model="shopInfo">
                                <el-table
                                    :data="supplierList"
                                    border
                                    style="width: 100%"
                                    ref = "supplierList">
                                    <el-table-column 
                                        width="34"
                                        class-name="selectionTd fontSizeHide">
                                        <template scope="props">
                                            <el-radio class="radio" :label='props.row'></el-radio>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="supplierCode" label="供货商ID" min-width="110"></el-table-column>
                                    <el-table-column prop="supplierName" label="供货商名称" min-width="110"></el-table-column>
                                </el-table>
                            </el-radio-group>
                            <div class="page-showbox">
                                <div class="xe-pagination-panel">
                                    <el-pagination
                                        @size-change="handleSizeChange01"
                                        @current-change="handleCurrentChange01"
                                        :current-page="xePageInfo01.pageNum"
                                        :page-sizes="[10, 20]"
                                        :page-size="xePageInfo01.pageSize"
                                        layout="total, prev, pager, next, sizes, jumper"
                                        :total="xePageInfo01.total">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" @click="saveSupplierName()">确定</el-button>
                    <el-button class="xe-button-normal" @click="dialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 选择商品 -->
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="选择商品" :visible.sync="dialogVisible02" size="">
                <div class="clearfix changeCate">
                    <div class="u-top-search">
                        <!-- {{formGData}} -->
                        <el-form :inline="true" :model="formGData" ref="formGData" class="demo-form-inline">
                            <el-form-item prop="proName">
                                <el-input size="small" placeholder="商品名称" v-model="formGData.proName"></el-input>
                            </el-form-item><el-form-item prop="proNum">
                                <el-input size="small" placeholder="货号" v-model="formGData.proNum"></el-input>
                            </el-form-item><el-form-item prop="proSku" class="z-mr30">
                                <el-input size="small" placeholder="SKU" v-model="formGData.proSku"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="xe-button-normal" type="primary" @click="onSubmit(2)">
                                    查询
                                </el-button><el-button class="xe-button-normal"  @click="resetForm('formData')">
                                    重置
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="clearfix">
                        <div class="">
                            <el-table
                                :data="proSkuList"
                                border
                                style="width: 100%"
                                ref = "proListCoupon"
                                @selection-change="handleSelectionChange">
                                <el-table-column 
                                    type="selection" 
                                    width="34"
                                    class-name="selectionTd">
                                </el-table-column>
                                <el-table-column label="商品图片" width="100">
                                    <template scope="props">
                                        <div class="z-imgbox">
                                            <img :src="picServer + picDir + props.row.picUrl" alt="商品图片" width="60" height="60">
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="proNo" label="商品货号" min-width="110"></el-table-column>
                                <el-table-column prop="proName" label="商品名称" min-width="110"></el-table-column>
                                <el-table-column prop="categoryName" label="商品分类" min-width="130"></el-table-column>
                                <el-table-column prop="priceType" label="计量方式" min-width="85">
                                    <template scope="props">
                                        {{props.row.priceType | pricingTypeToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="sellPrice" label="市场售价" min-width="130"></el-table-column>
                            </el-table>
                            <div class="page-showbox">
                                <div class="xe-pagination-panel">
                                    <el-pagination
                                        @size-change="handleSizeChange02"
                                        @current-change="handleCurrentChange02"
                                        :current-page="xePageInfo02.pageNum"
                                        :page-sizes="[10, 20, 50, 100]"
                                        :page-size="xePageInfo02.pageSize"
                                        layout="total, prev, pager, next, sizes, jumper"
                                        :total="xePageInfo02.total">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" @click="saveChoosed()">选中</el-button>
                    <el-button class="xe-button-normal" type="primary" @click="saveChoosed(0)">选中并关闭</el-button>
                    <el-button class="xe-button-normal" @click="dialogVisible02 = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 设置商品信息 -->
        <div class="add-fromKu reset-dialog">
            <el-dialog title="设置商品信息" :visible.sync="dialogVisible03">
                <!-- {{formDataNum}} -->
                <el-form :model="formDataNum">
                    <el-form-item label="SKU编码" :label-width="xeLabelWidth80">
                        <p class="txt-formItem__content">{{formDataNum.proSku}}</p>
                    </el-form-item>
                    <el-form-item label="采购数量" :label-width="xeLabelWidth80">
                        <el-input :disabled="lcBtnDisable" @blur="numberFix($event, 0, 2)" v-model.number="formDataNum.proNum" placeholder="请输入数字" class="zy-input-normal" :maxlength='6' auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="进货价" :label-width="xeLabelWidth80">
                        <el-input @blur="numberFix($event, 2, 3)" v-model.number="formDataNum.buyPrice" placeholder="请输入数字" class="zy-input-normal" :maxlength='6' auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="采购费用" :label-width="xeLabelWidth80">
                        <p class="txt-formItem__content">{{parseFloat(formDataNum.proNum * formDataNum.buyPrice).toFixed(2)}}元</p>
                    </el-form-item>
                    <el-form-item label="备注" :label-width="xeLabelWidth80">
                        <el-input :maxlength='50' type="textarea" :rows="3" v-model="formDataNum.remark" placeholder="请输入商品备注" class="zy-input-normal" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" @click="saveCost()">保存</el-button>
                    <el-button class="xe-button-normal" @click="dialogVisible03 = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import areaselectTag from '@/components/areaSelect/areaSelect';
import {supplierType, payType, invoiceType, settlementTimeUnit, settlementWay, searchSupplier} from '@/dataControl.js';
import {deepCopy} from 'utils';
import {getNowCookie} from 'utils/commonBase';
export default {
    data() {
        let checkstoreId = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请选择仓库'));
            } else {
                callback();
            }
        };
        let checksupplierName = (rule, value, callback) => {
            if (!value) {
                console.log('testchecksupplierName');
                callback(new Error('请选择供货商'));
            } else {
                callback();
            }
        };
        let checksignDate = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请选择单据日期'));
            } else {
                callback();
            }
        };
        let checkexpectedArrivalDate = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请选择到货日期'));
            } else {
                callback();
            }
        };
        let checkfrontMoney = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入定金'));
            } else {
                callback();
            }
        };
        return {
            rules: {
                supplierName: [
                    {validator: checksupplierName, trigger: 'change'}
                ],
                storeId: [
                    {validator: checkstoreId, trigger: 'change'}
                ],
                signDate: [
                    {validator: checksignDate, trigger: 'change'}
                ],
                expectedArrivalDate: [
                    {validator: checkexpectedArrivalDate, trigger: 'change'}
                ],
                frontMoney: [
                    {validator: checkfrontMoney, trigger: 'blur'}
                ]
            },
            disRecord: false,
            disNegative: false,
            nextDisabled: false,
            dialogVisible: false,
            dialogVisible02: false,
            dialogVisible03: false,
            lcBtnDisable: false,
            lcShowFlag: true,
            actionStoreList: [], // 仓库的基本信息
            tpmChoose: [], // 提交选中商品
            dialogType: '',
            picServer: '',
            picDir: 'product/80/80/',
            formDataNum: { // 设置商品信息
                proSku: '',
                proNum: '',
                buyPrice: '',
                proAmount: 0,
                remark: '',
                index: ''
            },
            formData: {
                supplierName: null,
                supplierCode: '',
                storeId: null,
                frontMoney: 0.00,
                signDate: '',
                expectedArrivalDate: '',
                supplierPhone: '',
                supplierMobile: '',
                settlementMethodName: '',
                settlementMethod: '',
                purchTypeName: '',
                purchType: '',
                createUser: getNowCookie().userInfo.shopName,
                remark: '',
                purchProductList: [],
                purchAmount: 0 // 总价
            },
            proSkuList: [],
            formGData: {
                proName: '',
                cateIds: [],
                storeId: '',
                proNum: '',
                proSku: ''
            },
            supplierList: [], // 供货商list
            dialogData: { // 供货商搜索
                searchType: 1,
                searchText: ''
            },
            xePageInfo01: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            receiptDetailList: [], // 商品的基本信息
            shopInfo: {},
            shopList: [],
            xePageInfo02: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            coverFlag: true,
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 24 * 3600 * 1000;
                }
            },
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 24 * 3600 * 1000;
                }
            }
        };
    },
    created() {
        // this.loadqueryStore();
        this.loadInf();
    },
    methods: {
        onSubmit(type) {
            if (type === 1) {
                this.creatInf(1, this.dialogData);
            } else if (type === 2) {
                this.creatGInf(1, this.formGData);
            }
        },
        getArrivalDate(val) {
            this.formData.expectedArrivalDate = val;
        },
        editBtn(props) {
            console.log('testprops', props);
            this.formDataNum.proSku = props.row.proSku;
            this.formDataNum.proNum = props.row.proNum;
            this.formDataNum.buyPrice = props.row.buyPrice;
            this.formDataNum.remark = props.row.remark;
            this.formDataNum.index = props.$index;
            this.dialogVisible03 = true;
        },
        deletSingle(prop) {
            this.$confirm('确定删除选中的采购单商品', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.receiptDetailList.splice(prop.$index, 1);
                this.$xeMessage.success('删除成功');
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        getSignDate(val) {
            this.formData.signDate = val;
        },
        getGoodlist() {
            this.creatGInf(1, this.formGData);
            this.dialogVisible02 = true;
        },
        dialogClosesup(formName) {
            this.shopInfo = {};
            this.resetForm(formName);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        saveChoosed(type) {
            console.log('testChoose', 'testChoose');
            let saveChoose = this.tpmChoose;
            if (saveChoose.length === 0) {
                this.$xeMessage.warning('请先勾选需要初始化的商品');
                return;
            }
            let uniqObj = {};
            this.receiptDetailList.forEach(item => {
                uniqObj[item.proSku] = 1;
            });
            for (let i = 0; i < saveChoose.length; i++) {
                if (!uniqObj[saveChoose[i].proSku]) {
                    this.$set(saveChoose[i], 'proNum', '');
                    this.$set(saveChoose[i], 'buyPrice', '');
                    this.$set(saveChoose[i], 'proAmount', '');
                    this.$set(saveChoose[i], 'remark', '');
                    this.receiptDetailList.push(saveChoose[i]);
                }
            };
            if (this.receiptDetailList.length > 20) {
                this.$xeMessage.warning('采购单的商品最大上限为20条，请删除多余商品，否则将无法保存');
            }
            this.$refs.proListCoupon.clearSelection();
            if (type === 0) {
                this.dialogVisible02 = false;
            }
        },
        saveCost() {
            let proNumval = this.formDataNum.proNum;
            let buyPriceval = this.formDataNum.buyPrice;
            let proSkuval = this.formDataNum.proSku;
            if (!(proNumval > 0) || !(buyPriceval > 0)) {
                this.$xeMessage.warning('请认真核对填写内容！');
                return false;
            }
            console.log(this.formDataNum);
            this.$xeMessage.success('修改成功');
            this.dialogVisible03 = false;
            for (var i = 0; i < this.receiptDetailList.length; i++) {
                if (this.receiptDetailList[i].proSku === proSkuval) {
                    this.receiptDetailList[i].proNum = this.formDataNum.proNum;
                    this.receiptDetailList[i].buyPrice = this.formDataNum.buyPrice;
                    this.receiptDetailList[i].proAmount = this.proAmount;
                    this.receiptDetailList[i].remark = this.formDataNum.remark;
                    break;
                }
            }
        },
        getSummaries(param) { // 合计
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                if (index === 9) { // 需要第几行加第几行
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return (prev * 1000 + curr * 1000) / 1000;
                            } else {
                                return prev;
                            }
                        }, 0);
                    } else {
                        sums[index] = '';
                    }
                }
            });
            console.log('sums', sums);
            this.formData.purchAmount = sums[9];
            sums[9] = parseFloat(sums[9]).toFixed(2);
            return sums;
        },
        saveSupplierName() {
            console.log('test', this.shopInfo.supplierName);
            if (!this.shopInfo.supplierName) {
                this.$xeMessage.warning('请选择一个供货商');
                return;
            }
            this.formData.supplierName = this.shopInfo.supplierName;
            this.formData.supplierCode = this.shopInfo.supplierCode;
            this.formData.supplierPhone = this.shopInfo.supplierPhone;
            this.formData.supplierMobile = this.shopInfo.supplierMobile;
            this.formData.settlementMethod = this.shopInfo.settlementWay;
            this.formData.settlementMethodName = this.settlementMethodToText(this.shopInfo.settlementWay);
            this.dialogVisible = false;
        },
        settlementMethodToText(type) {
            let obj = {
                1: '账期结算',
                2: '预付款',
                3: '现结'
            };
            return obj[type];
        },
        purchTypeToText(type) {
            let obj = {
                1: '零采',
                2: '集采',
                3: '分拨'
            };
            return obj[type];
        },
        handleSelectionChange(val) {
            this.tpmChoose = deepCopy(val);
        },
        submitForm(formName, checkStatus, purchStatus) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('lastsavetest');
                    if (this.receiptDetailList.length === 0) {
                        this.$xeMessage.warning('采购单商品列表不能为空');
                        return;
                    }
                    if (this.receiptDetailList.length > 20) {
                        this.$xeMessage.warning('采购单的商品最大上限为20条，无法保存');
                        return;
                    }
                    for (var i = 0; i < this.receiptDetailList.length; i++) {
                        if (!(this.receiptDetailList[i].proAmount > 0)) {
                            this.$xeMessage.warning('请完善商品信息，请编辑修改后提交');
                            return false;
                        }
                    };
                    let param = {};
                    param = this.formData;
                    param.purchProductList = this.receiptDetailList;
                    param.purchProductList.forEach(item => { // 将采购单号赋值到查到的商品列表。。。
                        item.purchOrder = this.$route.query.purchOrder;
                    });
                    param.checkStatus = checkStatus;
                    param.purchStatus = purchStatus;
                    console.log('param', param);
                    _this.nextDisabled = true;
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-erp/purch/updatePurch',
                        data: param
                    }).then((res) => {
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.nextDisabled = false;
                            _this.linkTolist();
                        }, 300);
                    }).catch((error) => {
                        _this.nextDisabled = false;
                        console.log(error);
                    });
                }
            });
        },
        linkTolist() {
            this.$router.push({name: 'procurementListIndex'});
        },
        loadsupplier() {
            this.creatInf(1, this.dialogData);
            this.dialogVisible = true;
        },
        handleSizeChange01(val) {
            this.xePageInfo01.pageSize = val;
            this.creatInf(this.xePageInfo01.pageNum, this.dialogData);
        },
        handleCurrentChange01(val) {
            this.xePageInfo01.pageNum = val;
            this.creatInf(this.xePageInfo01.pageNum, this.dialogData);
        },
        handleSizeChange02(val) {
            this.xePageInfo02.pageSize = val;
            this.creatGInf(this.xePageInfo02.pageNum, this.formGData);
        },
        handleCurrentChange02(val) {
            this.xePageInfo02.pageNum = val;
            this.creatGInf(this.xePageInfo02.pageNum, this.formGData);
        },
        loadqueryStore(type) {
            let params = {};
            if (type) {
                params.lcfbFlag = 1;
            }
            this.$http({ // 查询仓库名称列表
                method: 'post',
                url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                data: params
            }).then((res) => {
                this.actionStoreList = res.data.actionList;
                console.log('actionStoreList', this.actionStoreList);
            }).catch((error) => {
                console.log(error);
            });
        },
        numberFix(event, number, type) {
            let val = parseFloat(event.target.value);
            if (!(val > 0)) {
                val = '';
                if (type === 1) {
                    val = 0;
                }
            } else {
                val = val.toFixed(number);
            }
            event.target.value = val;
            if (type === 1) {
                this.formData.frontMoney = val;
            };
            if (type === 2) {
                this.formDataNum.proNum = val;
            };
            if (type === 3) {
                this.formDataNum.buyPrice = val;
            }
        },
        creatInf(pageNum, formData) { // 查询运营平台供货商列表
            let data = {};
            data = formData;
            data.pageNum = pageNum;
            data.pageSize = this.xePageInfo01.pageSize;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/supplier/searchSupplierList',
                data: data
            }).then((res) => {
                if (res.data) {
                    this.supplierList = res.data.supplierList;
                    this.xePageInfo01 = res.data.xePageInfo;
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        loadInf() { // 查询运营平台供货商列表
            let data = {
                purchOrder: this.$route.query.purchOrder,
                version: this.$route.query.version
            };
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/purch/queryPurchDetail',
                data: data
            }).then((res) => {
                this.picServer = res.data.picServer;
                this.formData = res.data.purch;
                this.receiptDetailList = res.data.purch.purchProductList;
                this.formData.purchTypeName = this.purchTypeToText(this.formData.purchType);
                console.log('test', this.formData.settlementMethod);
                this.$set(this.formData, 'settlementMethodName', this.settlementMethodToText(this.formData.settlementMethod));
                if (this.formData.purchType === 2) { // 集采
                    this.loadqueryStore(true);
                } else { // 集采显示和可操作
                    this.lcShowFlag = false;
                    this.lcBtnDisable = true;
                    this.loadqueryStore();
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        creatGInf(pageNum, formData) {
            let data = {};
            data = formData;
            data.cateId = '';
            data.pageNum = pageNum;
            data.pageSize = this.xePageInfo02.pageSize;
            console.log(data);
            this.$http({ // 查询仓库列表
                method: 'post',
                url: '/xe-route/xe-erp/xeVenProSku/queryXeVenProList',
                data: data
            }).then((res) => {
                if (res.data) {
                    console.log('res=======', res);
                    this.proSkuList = res.data.proSkuList;
                    this.xePageInfo02 = res.data.xePageInfo;
                    this.picServer = res.data.picServer;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    computed: {
        searchSupplierList() {
            return searchSupplier;
        },
        purchTypeFlag() {
            if (this.formData.purchType === 1) {
                return true;
            } else {
                return false;
            }
        },
        supplierTypeList() {
            return supplierType;
        },
        proAmount() {
            return this.formDataNum.buyPrice * this.formDataNum.proNum;
        },
        payTypeList() {
            return payType;
        },
        invoiceTypeList() {
            return invoiceType;
        },
        settlementTimeUnitList() {
            return settlementTimeUnit;
        },
        settlementWayList() {
            return settlementWay;
        }
    },
    watch: {
        'userList.saleAreaIds'(val) {
            console.log('saleAreaIds', this.userList.saleAreaIds);
            this.userList.provinceId = val[0];
            this.userList.cityId = val[1];
            this.userList.areaId = val[2];
        }
    },
    filters: {
        skuPriceFn(val) {
            return val;
        }
    },
    components: {
        areaselectTag
    }
};
</script>
<style lang="scss">
.changeCate{
    padding: 0 20px;
    margin: 20px 0;
}
.table-below-tips{
    border: 1px solid #ced5de;
    padding: 5px 0;
    margin-top: -1px;
    .el-form-item{
        margin-bottom: 0;
        .el-input__inner{
            border: none;
            padding-left: 0;
        }
    }
}
</style>
