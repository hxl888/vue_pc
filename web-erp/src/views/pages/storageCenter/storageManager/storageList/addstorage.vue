<template lang="html">
    <div class="m-router-con" style="padding-top: 40px;">
    <!-- {{formData}} -->
        <el-form class="resetForm" :rules="rules"  ref="formData" :model = "formData" :label-width = "xeLabelWidth">
            <!--基础信息-->
            <div class="for-itemlis">
                <div>
                    <el-form-item label="仓库名称" prop="storeName" required>
                        <el-input size="small" class = "xe-input-col3" v-model="formData.storeName" placeholder="仓库名称" :maxlength="15"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="仓库状态" prop="storeStatus" required>
                        <el-select class = "xe-input-col3 xe-button-normal" v-model="formData.storeStatus" filterable placeholder="仓库状态">
                            <el-option
                                v-for="item in storeStatusList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div v-if="pageType === 'edit'">
                    <el-form-item label="仓库编码" prop="storeId">
                        <el-input class="xe-input-col3" disabled v-model="formData.storeId" placeholder="请输入仓库编码"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="仓库联系人" prop="contactPerson" required>
                        <el-input size="small" class = "xe-input-col3" v-model="formData.contactPerson" placeholder="请输入仓库联系人" :maxlength="15"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="联系电话" prop="storeTel" required>
                        <el-input size="small" class = "xe-input-col3" v-model="formData.storeTel" placeholder="请输入联系电话" :maxlength="11"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="仓库所在地" prop="saleAreaIds">
                        <areaselectTag size="small" v-model='formData.saleAreaIds' :width='400' :changeOnSelects="false"></areaselectTag>
                        <!-- <el-input class = "xe-input-col3" v-model="formData.areaIds" placeholder="请输入仓库所在地"></el-input> -->
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="详细地址" prop="storeAddress" required>
                        <el-input size="small" class = "xe-input-col3" v-model="formData.storeAddress" :maxlength="100" placeholder="请输入详细地址"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="仓库类型" prop="storeType" required>
                        <el-radio-group v-model="formData.storeType" @change="storeTypeFn">
                            <template v-for="item in storeTypeList">
                                <el-radio  :disabled="pageType === 'edit'" :label="item.value" :key="item.value">{{item.name}}</el-radio>
                            </template>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="是否记录库存" prop="recordInventoryFlag" required>
                        <el-radio-group class="xe-button-normal" v-model="formData.recordInventoryFlag">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2" :disabled="disRecord">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="是否允许负库存" prop="negativeFlag" required v-if="formData.recordInventoryFlag === 1">
                        <el-radio-group class="xe-button-normal" v-model="formData.negativeFlag">
                            <el-radio :label="1" :disabled="disNegative">是</el-radio>
                            <el-radio :label="2" :disabled="disNegative02">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="库温类型" prop="storeWarms" required>
                        <el-checkbox-group class="xe-button-normal" v-model="formData.storeWarms">
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
                        <el-input size="small" :maxlength="9" class = "xe-input-col3" @blur="numberFix($event, 2, 'storeAcreage')" v-model.number="formData.storeAcreage" placeholder=""></el-input><span class="unit-tips">
                            平米
                        </span>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="使用面积" prop="storeUseAcreage" required>
                        <el-input size="small" :maxlength="9" class = "xe-input-col3" @blur="numberFix($event, 2, 'storeUseAcreage')" v-model.number="formData.storeUseAcreage" placeholder=""></el-input><span class="unit-tips">
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
                        <el-select size="small" class = "xe-input-col3" v-model="formData.tmsStatus" filterable placeholder="请选择">
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
                        <el-form-item label="覆盖区域" prop="coverAreaArray">
                            <el-input size="small" class="xe-input-col3" readonly="readonly" placeholder="请选择覆盖区域" @focus="dialogfgVisible = true"></el-input>
                            <div v-if="areaTags.length" style="max-height: 120px; overflow: auto; margin-top: 5px;">
                                <el-tag
                                    class="el-tag-reset"
                                    v-for="(tag, index) in areaTags"
                                    :key="tag.areaId"
                                    @close="areaTagsClose(tag.areaId, index)"
                                    :closable="true">
                                    {{tag.areaName}}
                                </el-tag>
                            </div>
                        </el-form-item>
                    </div>
                    <div>

                    </div>
                </div>
                <div>
                    <el-form-item  label=" ">
                        <div class="u-next">
                            <el-button :loading="nextDisabled" class="xe-button-normal" type="primary" @click="submitForm('formData')">保存</el-button>
                            <el-button class="xe-button-normal" @click="linkTolist">取消</el-button>
                        </div>
                    </el-form-item>
                </div>
            </div>
        </el-form>

        <!--覆盖区域选择-->
        <el-dialog class="el-tree-dialog" title="覆盖区域选择" :visible.sync="dialogfgVisible" ref="useAreaDialog" @open="useAreaOpen">
            <useAreaList ref="fgAreaList" :defaultData="coverAreaList"></useAreaList>
            <div style="margin-top: 20px; text-align: center;">
                <el-button @click="fgSureBtn" type="primary">确定</el-button>
                <el-button @click="dialogfgVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import areaselectTag from '@/components/areaSelect/areaSelect';
import {tmsStatus, storeStatus, storeType} from '@/dataControl.js';
import useAreaList from 'components/useAreaList/useAreaList';
export default {
    beforeRouteEnter(to, from, next) {
        if (to.query.storeId) {
            console.log(to.query.storeId);
            window.$axios({
                method: 'post',
                url: '/xe-route/xe-erp/storeManager/getStoreInfo',
                data: {
                    storeId: to.query.storeId
                }
            }).then(res => {
                console.log(res);
                next(vm => {
                    vm.pageType = 'edit';
                    vm.formData = res.data.storeInfo;
                    vm.$set(vm.formData, 'saleAreaIds', [res.data.storeInfo.provinceId, res.data.storeInfo.cityId, res.data.storeInfo.areaId]);
                    vm.$set(vm.formData, 'storeWarms', vm.arrClassifyNum(res.data.storeInfo.storeWarm));
                    vm.$set(vm.formData, 'storeUses', vm.arrClassifyNum(res.data.storeInfo.storeUse));
                    vm.coverAreaList = res.data.storeInfo.coverAreaList;
                    let coverAreaList = res.data.storeInfo.coverAreaList;
                    if (coverAreaList !== '' && coverAreaList.length > 0) {
                        // 覆盖区域选择组件回显
                        let result = {
                            resultIds: [],
                            resultTexts: []
                        };
                        coverAreaList.forEach(item => {
                            if (item.areaCheckBoxFlag === 1) {
                                result.resultIds.push(item.areaId);
                                let obj = {
                                    areaId: `${item.areaId}`,
                                    areaName: `${item.areaName}`
                                };
                                result.resultTexts.push(obj);
                            } else {
                                item.areaList.forEach(citem => {
                                    if (citem.areaCheckBoxFlag === 1) {
                                        result.resultIds.push(citem.areaId);
                                        let obj = {
                                            areaId: `${item.areaId}-${citem.areaId}`,
                                            areaName: `${item.areaName}-${citem.areaName}`
                                        };
                                        result.resultTexts.push(obj);
                                    } else {
                                        if (citem.areaCheckBoxFlag === 2 && citem.areaList && citem.areaList.length > 0) {
                                            citem.areaList.forEach(aitem => {
                                                if (aitem.areaCheckBoxFlag === 1) {
                                                    result.resultIds.push(aitem.areaId);
                                                    let obj = {
                                                        areaId: `${item.areaId}-${citem.areaId}-${aitem.areaId}`,
                                                        areaName: `${item.areaName}-${citem.areaName}-${aitem.areaName}`
                                                    };
                                                    result.resultTexts.push(obj);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                        vm.areaTags = result.resultTexts;
                        vm.formData.coverAreaArray = result.resultIds;
                        console.log(coverAreaList);
                    }
                });
            }).catch(error => {
                console.log(error);
                next(false);
            });
        } else {
            next();
        }
    },
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
            if (this.pageType === 'edit') {
                params.storeId = this.$route.query.storeId;
            }
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
        // 表单校验覆盖区域
        // let checkCoverAreaArray = (rule, value, callback) => {
        //     console.log(value);
        //     if (!value.length) {
        //         return callback(new Error('请选择使用区域'));
        //     } else {
        //         callback();
        //     }
        // };
        return {
            pageType: '',
            dialogfgVisible: false,
            xeLabelWidth: '115px',
            disRecord: false,
            disNegative: false,
            disNegative02: false,
            provinceList: [],
            nextDisabled: false,
            areaTags: '',
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
                negativeFlag: 2,           // 是否允许负库存
                coverAreaArray: [] // 仓库的覆盖区域
            },
            coverAreaList: [],
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
                // coverAreaArray: [
                //     {validator: checkCoverAreaArray, trigger: 'checkUseArea'}
                // ]
            }
        };
    },
    created() {
        if (this.formData.storeUseAcreage !== '') {
            this.formData.storeUseAcreage = this.formData.storeUseAcreage.toFixed(2);
        }
        if (this.formData.storeAcreage !== '') {
            this.formData.storeAcreage = this.formData.storeAcreage.toFixed(2);
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.coverAreaList !== '' && this.coverAreaList.length > 0) {
                this.$refs.useAreaDialog.$data.rendered = true;
            }
        });
    },
    methods: {
        arrClassifyNum(data) {
            let infor = data.split(',');
            let tmpArr = [];
            for (var i = 0; i < infor.length; i++) {
                tmpArr.push(parseInt(infor[i]));
            }
            return tmpArr;
        },
        fgSureBtn() {
            let resultData = this.$refs.fgAreaList.getDataResult();
            console.log(resultData);
            this.areaTags = resultData.resultTexts;
            this.formData.coverAreaArray = resultData.resultIds;
            // this.$refs.formData.validateField('coverAreaArray');
            this.dialogfgVisible = false;
        },
        useAreaOpen() {
            if (this.$refs.fgAreaList && this.areaTags.length) {
                this.$refs.fgAreaList.resetData(this.areaTags);
            }
        },
        areaTagsClose(areaId, index) {
            this.$refs.fgAreaList.removeData(areaId, () => {
                this.areaTags.splice(index, 1);
                let areaIds = areaId.split('-');
                let sindex = this.formData.coverAreaArray.indexOf(areaIds[areaIds.length - 1]);
                this.formData.coverAreaArray.splice(sindex, 1);
                if (this.areaTags.length <= 0) {
                    this.formData.coverAreaArray = [];
                }
            });
        },
        submitForm(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('test', 'success');
                    this.nextDisabled = true;
                    if (this.formData.storeType >= 3) {
                        this.formData.coverAreaArray = [];
                    }
                    let url = '';
                    if (this.pageType === 'edit') {
                        url = '/xe-route/xe-erp/storeManager/editStore';
                    } else {
                        url = '/xe-route/xe-erp/storeManager/saveStore';
                    }
                    this.$http({
                        method: 'post',
                        url: url,
                        data: this.formData
                    }).then((res) => {
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.linkTolist();
                        }, 300);
                        // this.$router.push({name: 'storageListIndex'});
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
            this.$router.push({name: 'storageListIndex'});
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
                    break;
                }
                case 'storeAcreage': {
                    this.formData.storeAcreage = val;
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
        areaselectTag,
        useAreaList
    }
};
</script>
<style lang="scss">
</style>
