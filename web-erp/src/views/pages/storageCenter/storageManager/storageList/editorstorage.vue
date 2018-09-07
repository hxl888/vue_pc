<template lang="html">
    <div class="m-router-con rseGds-content" style="padding-top: 40px;">
    <!-- {{formData}} -->
        <el-form class="resetForm" :rules="rules"  ref = "formData" :model = "formData" :label-width = "xeLabelWidth">
            <!--基础信息-->
            <div class="for-itemlis">
                <div>
                    <el-form-item label="仓库名称" prop="storeName" required>
                        <el-input class = "xe-input-col3" v-model="formData.storeName" placeholder="仓库名称" :maxlength="15"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="仓库状态" prop="storeStatus" required>
                        <el-select class = "xe-input-col3" v-model="formData.storeStatus" filterable placeholder="仓库状态">
                            <el-option
                                v-for="item in storeStatusList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="仓库编码" prop="storeId">
                        <el-input class = "xe-input-col3" disabled v-model="formData.storeId" placeholder="请输入仓库编码"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="仓库联系人" prop="contactPerson" required>
                        <el-input class = "xe-input-col3" v-model="formData.contactPerson" placeholder="请输入仓库联系人" :maxlength="15"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="联系电话" prop="storeTel" required>
                        <el-input class = "xe-input-col3" v-model="formData.storeTel" placeholder="请输入联系电话" :maxlength="11"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="仓库所在地" prop="saleAreaIds">
                        <areaselectTag v-model='formData.saleAreaIds' :width='400' :changeOnSelects="false"></areaselectTag>
                        <!-- <el-input class = "xe-input-col3" v-model="formData.areaIds" placeholder="请输入仓库所在地"></el-input> -->
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="详细地址" prop="storeAddress" required>
                        <el-input class = "xe-input-col3" v-model="formData.storeAddress" :maxlength="100" placeholder="请输入详细地址"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="仓库类型" prop="storeType" required>
                        <el-radio-group v-model="formData.storeType" @change="storeTypeFn">
                            <template v-for="item in storeTypeList">
                                <el-radio :label="item.value" :key="item.value">{{item.name}}</el-radio>
                            </template>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="是否记录库存" prop="recordInventoryFlag" required>
                        <el-radio-group v-model="formData.recordInventoryFlag">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2" :disabled="disRecord">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="是否允许负库存" prop="negativeFlag" required v-if="formData.recordInventoryFlag === 1">
                        <el-radio-group v-model="formData.negativeFlag">
                            <el-radio :label="1" :disabled="disNegative">是</el-radio>
                            <el-radio :label="2" :disabled="disNegative02">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="库温类型" prop="storeWarms" required>
                        <el-checkbox-group v-model="formData.storeWarms">
                            <el-checkbox :label="1">冷冻</el-checkbox>
                            <el-checkbox :label="2">冷藏</el-checkbox>
                            <el-checkbox :label="3">常温</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="仓库用途" prop="storeUses" required>
                        <el-checkbox-group v-model="formData.storeUses">
                            <el-checkbox :label="1">批发仓库</el-checkbox>
                            <el-checkbox :label="2">采购供应仓库</el-checkbox>
                            <el-checkbox :label="3">加工仓库</el-checkbox>
                            <el-checkbox :label="4">中转仓</el-checkbox>
                            <el-checkbox :label="5">零售仓</el-checkbox>
                            <el-checkbox :label="6">储备仓</el-checkbox>
                            <el-checkbox :label="7">保税仓</el-checkbox>
                            <el-checkbox :label="8">退货仓</el-checkbox>
                            <el-checkbox :label="9">残次品仓库</el-checkbox>
                            <el-checkbox :label="10">零采仓</el-checkbox>
                            <el-checkbox :label="11">分拨仓</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="建筑面积" prop="storeAcreage" required>
                        <el-input :maxlength="9" class = "xe-input-col3" @blur="numberFix($event, 2, 'storeAcreage')" v-model.number="formData.storeAcreage" placeholder=""></el-input><span class="unit-tips">
                            平米
                        </span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="使用面积" prop="storeUseAcreage" required>
                        <el-input :maxlength="9" class = "xe-input-col3" @blur="numberFix($event, 2, 'storeUseAcreage')" v-model.number="formData.storeUseAcreage" placeholder=""></el-input><span class="unit-tips">
                            平米
                        </span>
                    </el-form-item>
                </div>
                <!-- <div>
                    <el-form-item label="WMS接入状态" prop="" required>
                        <el-select class = "xe-input-col3" v-model="formData.rad" filterable placeholder="请选择">
                            <el-option
                                v-for="item in storeStatus"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div> -->
                <div>
                    <el-form-item label="TMS接入状态" prop="tmsStatus" required>
                        <el-select class = "xe-input-col3" v-model="formData.tmsStatus" filterable placeholder="请选择">
                            <el-option
                                v-for="item in tmsStatusList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div  v-if="coverFlag === true">
                    <div>
                        <!-- <el-form-item label="覆盖区域" prop="coverAreaList" required>
                            <el-select v-model="formData.coverAreaList" multiple placeholder="请选择销售区域" class="multip-select">
                                <el-option
                                    v-for="item in provinceList"
                                    :label="item.areaName"
                                    :key="item.areaId"
                                    :value="item.areaId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label=" ">
                            <div class="clearfix">
                                <span class="area-tips">河南/郑州 <i class="i-close">&times;</i></span>
                            </div>
                        </el-form-item> -->
                    </div>
                </div>
                <div>
                    <el-form-item  label=" ">
                        <div class="u-next">
                            <el-button type="primary" @click="submitForm('formData')">保存</el-button>
                            <el-button @click="linkTolist">取消</el-button>
                        </div>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
import areaselectTag from '@/components/areaSelect/areaSelect';
import {tmsStatus, storeStatus, storeType} from '@/dataControl.js';
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
        let validateName = (rule, value, callback) => { // 校验仓库名已存在
            if (value === '') {
                callback(new Error('请输入仓库名称'));
                return;
            };
            let params = {};
            params.storeName = value;
            params.storeId = this.$route.query.storeId;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/storeManager/checkStoreName',
                data: params
            }).then((res) => {
                if (res.data.remote && res.data.remote.status !== '0000') {
                    callback(new Error(res.data.remote.msg));
                } else {
                    callback();
                }
            }).catch((error) => {
                console.log(error);
            });
        };
        let checkStoreStatus = (rule, value, callback) => {
            console.log(value);
            if (value === '') {
                callback(new Error('请选择仓库状态'));
            } else {
                callback();
            }
        };
        let checkTmsStatus = (rule, value, callback) => {
            console.log(value);
            if (value === '') {
                callback(new Error('请选择TMS接入状态'));
            } else {
                callback();
            }
        };
        let checkSquare = (rule, value, callback) => {
            let values = parseFloat(value);
            if (values >= 1000000) {
                callback(new Error('最大不能超过1000000平米'));
                console.log('checkSquare', value);
            } else {
                callback();
            }
        };
        return {
            xeLabelWidth: '115px',
            disRecord: false,
            disNegative: false,
            disNegative02: false,
            provinceList: [],
            nextDisabled: false,
            formData: {
                storeName: '',          // 仓库名称  必填
                storeStatus: '',            // 仓库状态
                storeTel: '',    // 仓库电话
                contactPerson: '',       // 仓库联系人
                provinceId: '',           // 仓库所在的省
                cityId: '',                // 仓库所在的市
                areaId: '',                // 仓库所在的区
                saleAreaIds: [],
                storeAddress: '',     // 仓库的具体地址
                storeWarms: [],      // 库温
                storeWarm: '',
                storeType: 1,            // 仓库类型 必填 仓库类型：1自有仓库，2三方仓库，3零采仓库，4分拨仓库，5退货仓库
                storeUses: [],     // 仓库用途
                storeUse: '',     // 仓库用途
                storeAcreage: '',  // 仓库建筑面积
                storeUseAcreage: '',    // 仓库使用面积
                wmsStatus: 1,          // wms接入状态
                tmsStatus: '',          // tms接入状态
                recordInventoryFlag: 1,               // 记录库存
                negativeFlag: 2           // 是否允许负库存
                // coverAreaList: [         // 仓库的覆盖区域
                //     {
                //         provinceId: 998,       // 覆盖区域的省编码
                //         cityId: 999,
                //         areaId: 1005
                //     }
                // ]
            },
            areaIds: [],
            coverFlag: true,
            rules: {
                storeName: [
                    {required: true, validator: validateName, trigger: 'blur'}
                    // {required: true, message: '请输入仓库名称', trigger: 'blur'}
                ],
                storeStatus: [
                    // {required: true, message: '请选择仓库状态', trigger: 'change'} ？
                    {validator: checkStoreStatus, trigger: 'change'}
                ],
                tmsStatus: [
                    {validator: checkTmsStatus, trigger: 'change'}
                ],
                storeTel: [
                    {required: true, message: '请输入仓库电话', trigger: 'blur'},
                    {validator: checkPhone, trigger: 'blur'}
                ],
                contactPerson: [
                    {required: true, message: '请输入仓库联系人', trigger: 'blur'}
                ],
                saleAreaIds: [
                    {type: 'array', required: true, message: '请选择仓库所在地', trigger: 'change'}
                ],
                storeAddress: [
                    {required: true, message: '请输入仓库的具体地址', trigger: 'blur'}
                ],
                // storeStatus: [
                //     {required: true, message: '请选择仓库状态', trigger: 'change'}
                // ],
                // storeStatus: [
                //     {required: true, message: '请选择仓库状态', trigger: 'change'}
                // ],
                storeWarms: [
                    {type: 'array', required: true, message: '请选择仓库库温类型', trigger: 'change'}
                ],
                storeUses: [
                    {type: 'array', required: true, message: '请选择仓库用途', trigger: 'change'}
                ],
                storeAcreage: [
                    {required: true, message: '建筑面积不能为空'},
                    {validator: checkSquare, trigger: 'blur'}
                ],
                storeUseAcreage: [
                    {required: true, message: '使用面积不能为空'},
                    {validator: checkSquare, trigger: 'blur'}
                ]
                // coverAreaList: [
                //     {required: true, message: '请填写覆盖区域', trigger: 'blur'}
                // ]
            }
        };
    },
    created() {
        this.loadStorage();
        if (this.formData.storeUseAcreage !== '') {
            this.formData.storeUseAcreage = this.formData.storeUseAcreage.toFixed(2);
        }
        if (this.formData.storeAcreage !== '') {
            this.formData.storeAcreage = this.formData.storeAcreage.toFixed(2);
        }
    },
    methods: {
        submitForm(formName) {
            let _this = this;
            console.log('test', 12313);
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('test', 'success');
                    let data = this.formData;
                    data.storeId = this.$route.query.storeId;
                    console.log(data);
                    this.nextDisabled = true;
                    this.$http({ // submit
                        method: 'post',
                        url: '/xe-route/xe-erp/storeManager/editStore',
                        data: data
                    }).then((res) => {
                        if (res.status === '0000') {
                            this.$xeMessage.success(res.msg);
                            setTimeout(function () {
                                _this.linkTolist();
                            }, 300);
                        } else {
                            this.$xeMessage.error(res.msg);
                            this.nextDisabled = false;
                        }
                    }).catch((error) => {
                        console.log(error);
                        this.$xeMessage.error(error.msg);
                        this.nextDisabled = false;
                    });
                } else {
                    return false;
                }
            });
        },
        linkTolist() {
            this.$router.push({name: 'storageListIndex'});
        },
        loadStorage(id) {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/storeManager/getStoreInfo',
                data: {
                    storeId: this.$route.query.storeId
                }
            }).then(res => {
                console.log(res);
                this.formData = res.data.storeInfo;
                this.$set(this.formData, 'saleAreaIds', [this.formData.provinceId, this.formData.cityId, this.formData.areaId]);
                this.$set(this.formData, 'storeWarms', this.arrClassifyNum(this.formData.storeWarm));
                this.$set(this.formData, 'storeUses', this.arrClassifyNum(this.formData.storeUse));
            }).catch(error => {
                console.log(error);
            });
        },
        arrClassifyNum(data) {
            let infor = data.split(',');
            let tmpArr = [];
            for (var i = 0; i < infor.length; i++) {
                tmpArr.push(parseInt(infor[i]));
            }
            return tmpArr;
        },
        numberFix(event, number, type) {
            let val = parseFloat(event.target.value);
            if (!(val > 0)) {
                val = '';
            } else {
                val = val.toFixed(number);
            }
            event.target.value = val;
            switch (type) {
                case 'storeUseAcreage': {
                    this.formData.storeUseAcreage = val;
                    // this.$refs.formData.validateField('storeUseAcreage');
                    break;
                }
                case 'storeAcreage': {
                    this.formData.storeAcreage = val;
                    // this.$refs.formData.validateField('storeAcreage');
                    break;
                }
            }
        },
        storeTypeFn(val) {
            // disNegative disRecord
            console.log('test', val);
            if (val >= 3) {
                this.formData.recordInventoryFlag = 1;
                this.disRecord = true;
                this.coverFlag = false;
                if (val === 5) {
                    this.formData.negativeFlag = 2;
                    this.disNegative = true;
                    this.disNegative02 = false;
                } else {
                    this.formData.negativeFlag = 1;
                    this.disNegative02 = true;
                    this.disNegative = false;
                }
            } else {
                this.coverFlag = true;
                this.disRecord = false;
                this.disNegative = false;
                this.disNegative02 = false;
            }
        }
    },
    computed: {
        tmsStatusList() {
            return tmsStatus;
        },
        storeStatusList() {
            return storeStatus;
        },
        storeTypeList() {
            return storeType;
        }
    },
    watch: {
        'formData.saleAreaIds'(val) {
            this.formData.provinceId = val[0];
            this.formData.cityId = val[1];
            this.formData.areaId = val[2];
        },
        'formData.storeWarms'(val) {
            this.formData.storeWarm = val.join(',');
        },
        'formData.storeUses'(val) {
            if (val.length > 3) {
                this.$xeMessage.warning('仓库用途最多选择3项');
                val = val.slice(0, 3);
                this.formData.storeUses = val.slice(0, 3);
                return false;
            }
            this.formData.storeUse = val.join(',');
        }
    },
    components: {
        areaselectTag
    }
};
</script>
<style lang="scss">
    @import "../../../../../assets/styles/views/releaseGoods.scss";
</style>
