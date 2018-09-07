<template lang="html">
    <div class="m-router-con con-salesApply">
    <!-- {{formData}} -->
        <el-form class="resetForm" :rules="rules"  ref = "formData" :model = "formData" label-width = "90px">
            <!--基础信息-->
            <div class="for-itemlis">
                <h4 class="tit-salesApply">基本信息</h4>
                <div>
                    <el-form-item label="供货商名称" prop="supplierName" required>
                        <el-input class = "xe-input-col3" v-model="formData.supplierName" placeholder="供货商名称" :maxlength="50" icon="search" :on-icon-click="handleIconClick"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="供货商类型" prop="supplierType" required>
                        <el-select class = "xe-input-col3" v-model="formData.supplierType" placeholder="供货商类型">
                            <el-option
                                v-for="item in supplierTypeList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="账期（天）" prop="paymentDays">
                        <el-input class = "xe-input-col3" @input.native="numberFix($event, 0, 1)" v-model.number="formData.paymentDays" placeholder="账期（天）" :maxlength="3"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="支付方式" prop="payType">
                        <el-select class = "xe-input-col3" v-model="formData.payType" placeholder="支付方式">
                            <el-option label="支付方式" value=""></el-option>
                            <el-option
                                v-for="item in payTypeList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="发票类型" prop="invoiceType">
                        <el-select class = "xe-input-col3" v-model="formData.invoiceType" placeholder="发票类型">
                            <el-option label="发票类型" value=""></el-option>
                            <el-option
                                v-for="item in invoiceTypeList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="发票费率" prop="invoiceRate">
                        <el-input class = "xe-input-col3" v-model="formData.invoiceRate" @blur="numberFix($event, 0, 2)" placeholder="发票费率" :maxlength="3"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="结算周期" prop="settlementCycle" required>
                        <el-input style="width:260px;margin-right: 8px;" @input.native="numberFix($event, 0, 3)" v-model="formData.settlementCycle" placeholder="结算周期" :maxlength="3"></el-input>
                        <el-select style="width: 130px;" v-model="formData.settlementTimeUnit" :maxlength="4" placeholder="天">
                            <el-option
                                v-for="item in settlementTimeUnitList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="结算方式" prop="settlementWay" required>
                        <el-select class = "xe-input-col3" v-model="formData.settlementWay" placeholder="结算方式">
                            <el-option
                                v-for="item in settlementWayList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="开户银行" prop="accBank">
                        <el-input class = "xe-input-col3" v-model="formData.accBank" placeholder="开户银行" :maxlength="50"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="银行账号" prop="bankAccCard">
                        <el-input class = "xe-input-col3" v-model="formData.bankAccCard" placeholder="银行账号" :maxlength="21"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="账户名称" prop="bankAccName">
                        <el-input class = "xe-input-col3" v-model="formData.bankAccName" placeholder="账户名称" :maxlength="50"></el-input>
                    </el-form-item>
                </div>
                <h4 class="tit-salesApply tit-ruleTickets">联系人信息<span>（最多可添加10个联系人）</span></h4>
                <div class="addBtn">
                    <el-button  class="xe-button-normal" @click="addLinkman"><i class="iconfont icon-xinzeng"></i> 添加联系人</el-button>
                </div>
                <div class="sup-connector">
                <!-- {{formData.linkmanList}} -->
                    <ul>
                        <li v-for="(item, $index) in formData.linkmanList">
                            <span class="con-name">{{item.linkName}}</span><span class="sup-areaName ellipsis">{{item.provinceName}}{{item.cityName}}{{item.areaName}}{{item.street}}</span><span class="sup-phone">{{item.linkPhone}}</span><span class="sup-phone">{{item.linkMobile}}</span><span class="tips-importantName">首要联系人</span>
                            <div class="sup-opera">
                                <a class="s-blue" href="javascript:;" @click="editLinkman(item, $index)">编辑</a>
                                <a class="s-blue" href="javascript:;" @click="deletLinkman(item, $index)">删除</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <h4 class="tit-salesApply tit-ruleTickets">供货商资质</h4>
                <div class="item-uploadImg_box2 clearfix supplier-imgUpdata">
                    <ol class="fl up-active">
                        <li class="up-imgLI">
                            <img v-if="formData.businessPic" :src="picServer + formData.businessPic" alt="营业执照">
                        </li>
                        <li class="up-slotTips"><span class="s-red">*</span> 营业执照</li>
                        <li class="uploadImg-btn">
                            <div :class="['tipsCover', {'opacity0': uploadBtnFlag1}]">
                                <span class="iconfont icon-upload2"></span>
                                <p>上传文件</p>
                            </div>
                            <form name='form1' id='formFile1'>
                                <input type="file" title="点击添加或修改图片" multiple name='imgFiles' class='inputFile2' @change='inputFile2Fn("formFile1", 1)' accept="image/gif,image/jpeg,image/jpg,image/png">
                                <span v-if="uploadBtnFlag1" class="img-delet" @click.prevent='removeImg("formFile1", 1)'>删除</span>
                            </form>
                        </li>
                    </ol>
                    <ol class="fl up-active">
                        <li class="up-imgLI">
                            <img v-if="formData.idcardPic" :src="picServer + formData.idcardPic" alt="法人身份证正面">
                        </li>
                        <li class="up-slotTips">法人身份证正面</li>
                        <li class="uploadImg-btn">
                            <div :class="['tipsCover', {'opacity0': uploadBtnFlag2}]">
                                <span class="iconfont icon-upload2"></span>
                                <p>上传文件</p>
                            </div>
                            <form name='form2' id='formFile2'>
                                <input type="file" title="点击添加或修改图片" multiple name='imgFiles' class='inputFile2' @change='inputFile2Fn("formFile2", 2)' accept="image/gif,image/jpeg,image/jpg,image/png">
                                <span v-if="uploadBtnFlag2" class="img-delet" @click.prevent='removeImg("formFile2", 2)'>删除</span>
                            </form>
                        </li>
                    </ol>
                    <ol class="fl up-active">
                        <!-- {{formData.idcardBackPic}} -->
                        <li class="up-imgLI">
                            <img v-if="formData.idcardBackPic" :src="picServer + formData.idcardBackPic" alt="法人身份证反面">
                        </li>
                        <li class="up-slotTips">法人身份证反面</li>
                        <li class="uploadImg-btn">
                            <div :class="['tipsCover', {'opacity0': uploadBtnFlag3}]">
                                <span class="iconfont icon-upload2"></span>
                                <p>上传文件</p>
                            </div>
                            <form name='form3' id='formFile3'>
                                <input type="file" title="点击添加或修改图片" multiple name='imgFiles' class='inputFile2' @change='inputFile2Fn("formFile3", 3)' accept="image/gif,image/jpeg,image/jpg,image/png">
                                <span v-if="uploadBtnFlag3" class="img-delet" @click.prevent='removeImg("formFile3", 3)'>删除</span>
                            </form>
                        </li>
                    </ol>
                    <ol class="fl up-active">
                        <li class="up-imgLI">
                            <img v-if="formData.foodLicensePic" :src="picServer + formData.foodLicensePic" alt="食品流通证">
                        </li>
                        <li class="up-slotTips">食品流通证</li>
                        <li class="uploadImg-btn">
                            <div :class="['tipsCover', {'opacity0': uploadBtnFlag4}]">
                                <span class="iconfont icon-upload2"></span>
                                <p>上传文件</p>
                            </div>
                            <form name='form4' id='formFile4'>
                                <input type="file" title="点击添加或修改图片" multiple name='imgFiles' class='inputFile2' @change='inputFile2Fn("formFile4", 4)' accept="image/gif,image/jpeg,image/jpg,image/png">
                                <span v-if="uploadBtnFlag4" class="img-delet" @click.prevent='removeImg("formFile4", 4)'>删除</span>
                            </form>
                        </li>
                    </ol>
                    <ol class="fl up-active">
                        <li class="up-imgLI">
                            <img v-if="formData.productLicensePic" :src="picServer + formData.productLicensePic" alt="生产许可证">
                        </li>
                        <li class="up-slotTips">生产许可证</li>
                        <li class="uploadImg-btn">
                            <div :class="['tipsCover', {'opacity0': uploadBtnFlag5}]">
                                <span class="iconfont icon-upload2"></span>
                                <p>上传文件</p>
                            </div>
                            <form name='form5' id='formFile5'>
                                <input type="file" title="点击添加或修改图片" multiple name='imgFiles' class='inputFile2' @change='inputFile2Fn("formFile5", 5)' accept="image/gif,image/jpeg,image/jpg,image/png">
                                <span v-if="uploadBtnFlag5" class="img-delet" @click.prevent='removeImg("formFile4", 5)'>删除</span>
                            </form>
                        </li>
                    </ol>
                </div>
                <div>
                    <div class="u-next" style="padding: 15px 0 150px;">
                        <el-button type="primary" class="xe-button-normal" @click="submitForm('formData', 1, 1)" :disabled="nextDisabled">保存</el-button>
                        <el-button type="primary" class="xe-button-normal" @click="submitForm('formData', 2, 2)" :disabled="nextDisabled">保存并提交</el-button>
                        <el-button class="xe-button-normal" @click="linkTolist">取消</el-button>
                    </div>
                </div>
            </div>
        </el-form>
        <!-- 选择平台商户 -->
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="选择平台商户" :visible.sync="dialogVisible" size="small">
                <div class="clearfix supplier-userList">
                    <div class="u-top-search">
                        <!-- {{dialogData}} -->
                        <el-form :inline="true" :model="dialogData" ref="dialogData" class="demo-form-inline">
                            <el-form-item prop="proName" class="z-mr30">
                                <el-input placeholder="请输入商户平台名称ID" size="small" v-model="dialogData.searchText"></el-input>
                            </el-form-item><el-form-item>
                                <el-button type="primary" @click="onSubmit" class="xe-button-normal">
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
                                    :data="shopList"
                                    border
                                    style="width: 100%"
                                    ref = "proListCoupon">
                                    <el-table-column 
                                        width="34"
                                        class-name="selectionTd fontSizeHide">
                                        <template scope="props">
                                            <el-radio class="radio" :label='props.row'></el-radio>
                                        </template>
                                    </el-table-column>
                                    <el-table-column prop="shopCode" label="商户ID" min-width="110"></el-table-column>
                                    <el-table-column prop="supplierName" label="商户名称" min-width="110"></el-table-column>
                                </el-table>
                            </el-radio-group>
                            <div class="page-showbox">
                                <div class="xe-pagination-panel">
                                    <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="xePageInfo.pageNum"
                                        :page-sizes="[10, 20]"
                                        :page-size="xePageInfo.pageSize"
                                        layout="total, prev, pager, next, sizes, jumper"
                                        :total="xePageInfo.total">
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
        <!-- 添加联系人 -->
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="添加联系人" :visible.sync="dialogVisible02" size="small" @close="dialogClose">
                <div class="clearfix supplier-userList">
                <!-- {{userList}} -->
                    <el-form :inline="true" :model="userList" :rules="rules" ref="userList" label-width="84px">
                        <div class="floor-salesApply">
                            <el-form-item label="联系人" prop="linkName" required>
                                <el-input size="small" v-model="userList.linkName" :maxlength="8" class="xe-input-col3" placeholder="请填写联系人"></el-input>
                            </el-form-item>
                        </div>
                        <div class="floor-salesApply">
                            <el-form-item label="联系电话" prop="linkPhone">
                                <el-input size="small" v-model="userList.linkPhone" :maxlength="18" class="xe-input-col3" placeholder="请填写联系电话"></el-input>
                            </el-form-item>
                        </div>
                        <div class="floor-salesApply">
                            <el-form-item label="联系手机" prop="linkMobile" required>
                                <el-input size="small" v-model="userList.linkMobile" :maxlength="11" class="xe-input-col3" placeholder="请填写联系手机"></el-input>
                            </el-form-item>
                        </div>
                        <div class="floor-salesApply">
                            <el-form-item label="联系地址" prop="saleAreaIds" required>
                                <areaselectTag v-model='userList.saleAreaIds' :width='400' @areaName="loadName" :getName="true" :changeOnSelects="false"></areaselectTag>
                            </el-form-item>
                        </div>
                        <div class="floor-salesApply">
                            <el-form-item label="详细地址" prop="street" required>
                                <el-input size="small" v-model="userList.street" :maxlength="100" class="xe-input-col3" placeholder="请填写详细地址"></el-input>
                            </el-form-item>
                        </div>
                        <div class="floor-salesApply">
                            <el-form-item label="首要联系人" prop="firstLinkMan" required>
                                <el-select v-model="userList.firstLinkMan" placeholder="请选择是否为首要联系人" style="width:400px">
                                    <el-option
                                        v-for="item in firstLinkManList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" @click="saveLinkman('userList')">确定</el-button>
                    <el-button class="xe-button-normal" @click="dialogVisible02 = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import areaselectTag from '@/components/areaSelect/areaSelect';
import {supplierType, payType, invoiceType, settlementTimeUnit, settlementWay, firstLinkMan} from '@/dataControl.js';
import {deepCopy} from 'utils';
export default {
    data() {
        let checkPhone = (rule, value, callback) => {
            var reg = /^1[3,4,5,7,8]\d{9}$/;
            var res = reg.test(value);
            if (!res) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        };
        let checkTel = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                var reg = /^[0-9\-()（）]{7,18}$/;
                var res = reg.test(value);
                if (!res) {
                    callback(new Error('请输入正确的电话号码'));
                } else {
                    callback();
                }
            }
        };
        let checksaleAreaIds = (rule, value, callback) => {
            if (!value[2] || value[2] === null) {
                callback(new Error('请选择完善联系地址'));
            } else {
                callback();
            }
        };
        // {type: 'array', required: true, message: '', trigger: 'change'}
        let checkfirstLinkMan = (rule, value, callback) => {
            console.log(value);
            if (value === '') {
                callback(new Error('请选择是否为首要联系人'));
            } else {
                callback();
            }
        };
        let checkaccBank = (rule, value, callback) => {
            let values = $.trim(value);
            if (!values) {
                callback();
            } else {
                var reg = /^[\u4E00-\u9FA5]{1,50}$/;
                var res = reg.test(values);
                if (!res) {
                    callback(new Error('请输入正确的开户银行'));
                } else {
                    callback();
                }
            }
        };
        let checkNumber = (rule, value, callback) => {
            let values = $.trim(value);
            if (!values) {
                callback();
            } else {
                if (isNaN(values)) {
                    callback(new Error('请输入正确的银行账号'));
                } else {
                    if (values.length < 16 || values.length > 21) {
                        callback(new Error('银行账号在16位～21位之间'));
                    } else {
                        callback();
                    }
                }
            }
        };
        return {
            xeLabelWidth: '115px',
            disRecord: false,
            disNegative: false,
            nextDisabled: false,
            dialogVisible: false,
            dialogVisible02: false,
            dialogType: '',
            picServer: '',
            formData: {
                supplierName: '',
                accBank: '',
                bankAccCard: '',
                bankAccName: '',
                bank: {
                    accBank: '',
                    bankAccCard: '',
                    bankAccName: ''
                },
                becomeVendor: 2,
                businessPic: '', // 营业执照图片url
                idcardPic: '', // 身份证正面图片url
                idcardBackPic: '', // 身份证反面图片url
                foodLicensePic: '', // 食品许可证图片url
                productLicensePic: '', // 生产许可证
                linkmanList: [],
                supplierType: 1,
                paymentDays: '',
                invoiceType: '',
                invoiceRate: '',
                payType: '',
                settlementCycle: '',
                settlementTimeUnit: 1,
                settlementWay: 1,
                shopCode: ''
            },
            dialogData: {
                searchText: ''
            },
            shopInfo: {},
            shopList: [],
            userList: {
                linkName: '',
                linkPhone: '',
                linkMobile: '',
                saleAreaIds: [],
                areaId: '',
                cityId: '',
                provinceId: '',
                street: '',
                provinceName: '',
                cityName: '',
                areaName: '',
                firstLinkMan: ''
            },
            xePageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            coverFlag: true,
            rules: {
                // 添加联系人规则
                linkName: [
                    {required: true, message: '请输入联系人', trigger: 'blur'}
                ],
                linkPhone: [
                    {validator: checkTel, trigger: 'blur'}
                ],
                linkMobile: [
                    {required: true, message: '请输入联系手机号', trigger: 'blur'},
                    {validator: checkPhone, trigger: 'blur'}
                ],
                saleAreaIds: [
                    {validator: checksaleAreaIds, trigger: 'change'}
                ],
                street: [
                    {required: true, message: '请输入详细地址', trigger: 'blur'}
                ],
                settlementCycle: [
                    {required: true, message: '请输入结算周期', trigger: 'blur'}
                ],
                firstLinkMan: [
                    {required: true, validator: checkfirstLinkMan, trigger: 'change'}
                ],
                // 添加联系人规则
                // 基本信息
                supplierName: [
                    {required: true, message: '请输入供货商名称', trigger: 'blur'}
                ],
                // supplierType: [
                //     {required: true, validator: checkfirstLinkMan, message: '请选择供货商类型', trigger: 'change'}
                // ],
                bankAccName: [
                    {validator: checkaccBank, message: '请输入正确的账户名称', trigger: 'blur'}
                ],
                accBank: [
                    {validator: checkaccBank, trigger: 'blur'}
                ],
                bankAccCard: [
                    {validator: checkNumber, trigger: 'blur'}
                ]
                // 基本信息
            }
        };
    },
    created() {
        // 11
    },
    methods: {
        onSubmit() {
            this.creatInf(1, this.dialogData);
        },
        loadName(name) {
            this.userList.provinceName = name[0];
            this.userList.cityName = name[1];
            this.userList.areaName = name[2];
        },
        saveSupplierName(row) {
            if (this.shopInfo.supplierName === '') {
                this.$xeMessage.warning('请选择一个商户');
                return;
            }
            this.formData.supplierName = this.shopInfo.supplierName;
            this.formData.shopCode = this.shopInfo.shopCode;
            this.formData.bank = this.shopInfo.bank;
            this.formData.becomeVendor = 1;
            this.formData.linkmanList = this.shopInfo.linkmanList;
            this.formData.aptitudeList = this.shopInfo.aptitudeList;
            for (var i = 0; i < this.formData.linkmanList.length; i++) { // 手动修改是否是首要联系人
                if (this.formData.linkmanList[i].areaId === null) {
                    this.$xeMessage.warning('联系人信息联系地址信息不全，请完善后提交。');
                }
                this.formData.linkmanList[i].saleAreaIds = [this.formData.linkmanList[i].provinceId, this.formData.linkmanList[i].cityId, this.formData.linkmanList[i].areaId];
            }
            this.formData.aptitudeList.some(item => {
                if (item.apFlag === 3) {
                    if (item.idcardBack) {
                        this.formData.idcardBackPic = item.idcardBack;
                    }
                    this.formData.idcardPic = item.apUrl;
                } else if (item.apFlag === 22) {
                    this.formData.businessPic = item.apUrl;
                } else if (item.apFlag === 7) {
                    this.formData.foodLicensePic = item.apUrl;
                } else if (item.apFlag === 5) {
                    this.formData.productLicensePic = item.apUrl;
                }
            });
            this.dialogVisible = false;
            this.$refs.formData.validateField('supplierName');
        },
        addLinkman(item) {
            if (this.formData.linkmanList.length === 10) {
                this.$xeMessage.info('最多可添加10个联系人');
                return;
            }
            this.dialogVisible02 = true;
            this.dialogType = 1;
        },
        editLinkman(item, index) {
            this.dialogVisible02 = true;
            this.dialogType = 2;
            this.userList = deepCopy(item);
            this.userList.index = index;
        },
        deletLinkman(item, index) {
            if (this.formData.linkmanList.length === 1) {
                this.$xeMessage.warning('目前只有一位联系人，不支持删除操作');
                return;
            }
            this.$confirm('确定要对该联系人信息进行删除操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.formData.linkmanList.splice(index, 1);
                this.$xeMessage.success('删除成功');
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        dialogClose() {
            console.log('dialogClose');
            this.userList.firstLinkMan = '';
            this.userList.linkName = '';
            this.userList.linkMobile = '';
            this.userList.linkPhone = '';
            this.userList.street = '';
            this.userList.saleAreaIds = ['', '', ''];
            this.$refs['userList'].resetFields();
        },
        saveLinkman(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let pushObj = deepCopy(this.userList);
                    if (this.dialogType === 1) {
                        if (this.userList.firstLinkMan === 1) { // 首要联系人
                            this.formData.linkmanList.splice(0, 0, pushObj);
                        } else {
                            this.formData.linkmanList.push(pushObj);
                        }
                    } else if (this.dialogType === 2) {
                        if (this.userList.firstLinkMan === 1) { // 首要联系人 删除添加
                            this.formData.linkmanList.splice(this.userList.index, 1);
                            this.formData.linkmanList.splice(0, 0, pushObj);
                        } else {
                            this.formData.linkmanList.splice(this.userList.index, 1, pushObj);
                        }
                    }
                    this.dialogVisible02 = false;
                } else {
                    return false;
                }
            });
        },
        submitForm(formName, checkstatus, supplierStatus) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('test', 'success');
                    if (this.formData.linkmanList.length === 0) {
                        this.$xeMessage.warning('请设置联系人信息');
                        return false;
                    }
                    for (var i = 0; i < this.formData.linkmanList.length; i++) { // 手动修改是否是首要联系人
                        console.log('this.formData.linkmanList[i].areaId', this.formData.linkmanList[i].areaId);
                        if (this.formData.linkmanList[i].areaId === null) {
                            this.$xeMessage.warning('联系人信息联系地址信息不全，请完善后提交。');
                            return false;
                        }
                        this.formData.linkmanList[i].firstLinkMan = 1;
                        if (i !== 0) {
                            this.formData.linkmanList[i].firstLinkMan = 2;
                        }
                    }
                    if (this.formData.businessPic === '') {
                        this.$xeMessage.warning('请上传营业执照');
                        return false;
                    }
                    let param = {};
                    param = this.formData;
                    param.checkStatus = checkstatus;
                    param.supplierStatus = supplierStatus;
                    param.bank = {
                        accBank: this.formData.accBank,
                        bankAccCard: this.formData.bankAccCard,
                        bankAccName: this.formData.bankAccName
                    };
                    param.aptitudeList = [{
                        apName: '',
                        apUrl: this.formData.businessPic,
                        apFlag: 22
                    }];
                    if (this.formData.idcardPic !== '') {
                        if (this.formData.idcardBackPic !== '') {
                            param.aptitudeList.push({
                                apName: '',
                                apUrl: this.formData.idcardPic,
                                apFlag: 3,
                                idcardBack: this.formData.idcardBackPic
                            });
                        } else {
                            param.aptitudeList.push({
                                apName: '',
                                apUrl: this.formData.idcardPic,
                                apFlag: 3
                            });
                        }
                    }
                    if (this.formData.foodLicensePic !== '') {
                        param.aptitudeList.push({
                            apName: '',
                            apUrl: this.formData.foodLicensePic,
                            apFlag: 7
                        });
                    }
                    if (this.formData.productLicensePic !== '') {
                        param.aptitudeList.push({
                            apName: '',
                            apUrl: this.formData.productLicensePic,
                            apFlag: 5
                        });
                    }
                    this.nextDisabled = true;
                    this.$http({ // submit
                        method: 'post',
                        url: '/xe-route/xe-erp/supplier/insertSupplier',
                        data: param
                    }).then((res) => {
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.nextDisabled = false;
                            _this.linkTolist();
                        }, 300);
                    }).catch((error) => {
                        console.log(error);
                        this.nextDisabled = false;
                    });
                } else {
                    return false;
                }
            });
        },
        linkTolist() {
            this.$router.push({name: 'supplierListIndex'});
        },
        handleIconClick() {
            this.creatInf(1, this.dialogData);
            this.dialogVisible = true;
        },
        removeImg(id, imgType) {
            switch (imgType) {
                case 1: {
                    this.formData.businessPic = '';
                    break;
                }
                case 2: {
                    this.formData.idcardPic = '';
                    break;
                }
                case 3: {
                    this.formData.idcardBackPic = '';
                    break;
                }
                case 4: {
                    this.formData.foodLicensePic = '';
                    break;
                }
                case 5: {
                    this.formData.productLicensePic = '';
                    break;
                }
            }
            $('#' + id).find('.inputFile2').val('');
        },
        inputFile2Fn(id, imgType) {
            var formDatas = new FormData(document.getElementById(id));
            formDatas.append('fileType', 3);
            this.$http({
                method: 'post',
                url: '/xe-zuul/xe-route/xe-mis/manager/uploadImg/manImgUpload',
                data: formDatas
            }).then(res => {
                console.log(res);
                this.picServer = res.data.picServer;
                switch (imgType) {
                    case 1: {
                        this.formData.businessPic = res.data.imgInfoList[0].imgName;
                        break;
                    }
                    case 2: {
                        this.formData.idcardPic = res.data.imgInfoList[0].imgName;
                        break;
                    }
                    case 3: {
                        this.formData.idcardBackPic = res.data.imgInfoList[0].imgName;
                        break;
                    }
                    case 4: {
                        this.formData.foodLicensePic = res.data.imgInfoList[0].imgName;
                        break;
                    }
                    case 5: {
                        this.formData.productLicensePic = res.data.imgInfoList[0].imgName;
                        break;
                    }
                }
            }).catch(error => {
                console.log(error);
            });
        },
        handleSizeChange(val) {
            this.xePageInfo.pageSize = val;
            this.creatInf(this.xePageInfo.pageNum, this.dialogData);
        },
        handleCurrentChange(val) {
            this.xePageInfo.pageNum = val;
            this.creatInf(this.xePageInfo.pageNum, this.dialogData);
        },
        numberFix(event, number, type) {
            let val = parseFloat(event.target.value);
            if (!(val > 0)) {
                val = '';
            } else {
                val = val.toFixed(number);
            }
            event.target.value = val;
            if (type === 1) {
                this.formData.paymentDays = val;
            } else if (type === 2) {
                this.formData.invoiceRate = val;
            } else if (type === 3) {
                this.formData.settlementCycle = val;
            }
        },
        creatInf(pageNum, formData) {
            let data = {};
            data = formData;
            data.pageNum = pageNum;
            data.pageSize = this.xePageInfo.pageSize;
            this.$http({ // 查询运营平台商户列表
                method: 'post',
                url: '/xe-route/xe-erp/supplier/queryShops',
                data: data
            }).then((res) => {
                if (res.data) {
                    this.shopList = res.data.shops;
                    this.xePageInfo = res.data.xePageInfo;
                    this.picServer = res.data.picServer;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    computed: {
        supplierTypeList() {
            return supplierType;
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
        },
        firstLinkManList() {
            return firstLinkMan;
        },
        uploadBtnFlag1() {
            let businessPicFlag = true;
            if (this.formData.businessPic !== '') {
                businessPicFlag = true;
            } else {
                businessPicFlag = false;
            }
            return businessPicFlag;
        },
        uploadBtnFlag2() {
            let idcardFlag = true;
            if (this.formData.idcardPic !== '') {
                idcardFlag = true;
            } else {
                idcardFlag = false;
            }
            return idcardFlag;
        },
        uploadBtnFlag3() {
            let dcardBackPicFlag = true;
            if (this.formData.idcardBackPic !== '') {
                dcardBackPicFlag = true;
            } else {
                dcardBackPicFlag = false;
            }
            return dcardBackPicFlag;
        },
        uploadBtnFlag4() {
            let foodLicensePicFlag = true;
            if (this.formData.foodLicensePic !== '') {
                foodLicensePicFlag = true;
            } else {
                foodLicensePicFlag = false;
            }
            return foodLicensePicFlag;
        },
        uploadBtnFlag5() {
            let productLicensePicFlag = true;
            if (this.formData.productLicensePic !== '') {
                productLicensePicFlag = true;
            } else {
                productLicensePicFlag = false;
            }
            return productLicensePicFlag;
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
    components: {
        areaselectTag
    }
};
</script>
<style lang="scss">
</style>
