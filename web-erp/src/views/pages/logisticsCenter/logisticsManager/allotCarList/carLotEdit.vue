<template lang="html">
    <div class="m-router-con">
        <el-form class="detailsCar"  ref = "formData" :model = "formData" label-width = "95px">
            <div class="for-itemlis">
                <h4 class="tit-salesApply">确认物流单信息</h4>
                <!-- {{formData}} -->
                <div class="tab-toBathSendCar">
                	<el-table
                        :data="sendCarLogisticsList"
                        border
                        style="width: 100%"
                        ref = "sendCarLogisticsList">
                        <el-table-column
	                        label=""
	                        fixed="left"
	                        class-name="td-index"
	                        width="30">
	                        <template scope="props">
	                            <span>{{props.$index + 1}}</span>
	                        </template>
	                    </el-table-column>
                        <el-table-column prop="logtsCode" label="物流单号" min-width="125"></el-table-column>
                        <el-table-column prop="caConsignee" label="收货人" min-width="110"></el-table-column>
                        <el-table-column prop="caPhone" label="收货人电话" min-width="124"></el-table-column>
                        <el-table-column prop="receiptAddress" label="收货地址" min-width="170"></el-table-column>
                        <el-table-column prop="caStoreName" label="店铺名称" min-width="110"></el-table-column>
                        <el-table-column prop="shipType" label="配送方式" min-width="85">
                        	<template scope="props">
                        		{{props.row.shipType | shipTypeToText}}
                        	</template>
                        </el-table-column>
                        <el-table-column prop="mobilePhone" label="委托车辆" min-width="110">
                        	<template scope="props">
                        		{{props.row.shipCarDes | noneToText}}
                        	</template>
                        </el-table-column>
                    </el-table>
                </div>
                <h4 class="tit-salesApply">承运信息</h4>
                <div class="info-carInfo">
                    <div class="floorGap">
                        <el-form-item label="承运车辆:">
                            <span v-if="shopInfoTmp.carPlateNum">
                                {{shopInfoTmp.carPlateNum}}，{{shopInfoTmp.mobilePhone}}，{{shopInfoTmp.contactPerson}} 
                            </span>
                            &nbsp;&nbsp;<a class="s-blue" href="javascript:;" @click="chooseCar">选择</a>
                        </el-form-item>
                    </div>
                    <div class="floorGap">
                        <el-form-item label="装车点:">
                            <el-input :maxlength="50" size="small" placeholder="请输入装车点" class = "xe-input-col3" v-model="loadAddr"></el-input>
                        </el-form-item>
                    </div>
                    <div class="floorGap">
                        <el-form-item label="预计装车时间:">
                            <el-date-picker
                                ref="startCreateDate"
                                class = "xe-input-col3" 
                                v-model="value1"
                                type="datetime"
                                size="small"
                                @change="startCreateDateFn"
                                :picker-options="pickerOptionStart"
                                placeholder="预计装车时间"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="floorGap">
                        <el-form-item label="卸货点:">
                            <el-input :maxlength="50" size="small" class = "xe-input-col3" placeholder="请输入卸货点" v-model="unloadAddr"></el-input>
                        </el-form-item>
                    </div>
                    <div class="floorGap">
                        <el-form-item label="预计送达时间:">
                            <el-date-picker
                                ref="startCreateDate02"
                                v-model="value2"
                                class = "xe-input-col3" 
                                type="datetime"
                                size="small"
                                @change="startCreateDate02Fn"
                                :picker-options="pickerOptionStart"
                                placeholder="预计送达时间"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="floorGap">
                        <el-form-item label="物流备注:">
                            <el-input
                              type="textarea"
                              :rows="2"
                              class = "xe-input-col3" 
                              placeholder="请输入内容"
                              :maxlength="200"
                              v-model="remark">
                            </el-input>
                        </el-form-item>
                    </div>
                    <div class="floorGap">
                        <el-form-item label="">
                            <div class="u-next" style="padding: 15px 0 150px;" >
                                <el-button class="xe-button-normal" type="primary" @click="saveCarSend">保存</el-button>
                                <el-button class="xe-button-normal" @click="linkTolist">返回</el-button>
                            </div>
                        </el-form-item>
                    </div>
                </div>
                <!-- listLineArr:{{listLineArr}} -->
            </div>
        </el-form>
        <!-- xinzeng选择承运车辆 -->
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="新增车辆" :visible.sync="dialogClosesAdd" size="small" @close="dialogClosesAddDio">
                <div class="clearfix supplier-userList">
                    <div class="clearfix">
                        <el-form :inline="true" :model="formAddCar" :rules="rules" ref="formAddCar" class="demo-form-inline" label-width="94px">
                            <div class="clearfix">
                                <el-form-item prop="carPlateNum" label="车牌号" required>
                                    <el-input style="width: 380px;" :maxlength="7" size="small" v-model="formAddCar.carPlateNum"></el-input>
                                </el-form-item>
                            </div>
                            <div class="clearfix">
                                <el-form-item prop="carLength" label="车辆长度(米)">
                                    <el-input style="width: 380px;" @blur="numberFix($event, 2, 1)" :maxlength="5"  size="small" v-model.number="formAddCar.carLength"></el-input>
                                </el-form-item>
                            </div>
                            <div class="clearfix">
                                <el-form-item prop="contactPerson" label="联系人">
                                    <el-input :maxlength="10" style="width: 380px;" size="small" v-model="formAddCar.contactPerson"></el-input>
                                </el-form-item>
                            </div>
                            <div class="clearfix">
                                <el-form-item prop="mobilePhone" label="手机号" required>
                                    <el-input :maxlength="11" style="width: 380px;" size="small" v-model="formAddCar.mobilePhone"></el-input>
                                </el-form-item>
                            </div>
                            <div class="clearfix">
                                <el-form-item label=" ">
                                    <el-button class="xe-button-normal" type="primary" @click="saveNewCar">保存</el-button>
                                    <el-button class="xe-button-normal" @click="dialogClosesAddDio">取 消</el-button>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div class="reset-dialog reset-dialog02 smallMore-dialog">
            <el-dialog title="选择承运车辆（如车辆信息有误，欢迎您拨打400-662-6366纠错）" :visible.sync="dialogVisible" size="small" @close="dialogClosesup">
                <div class="clearfix supplier-userList">
                    <!-- {{dialogData}} -->
                    <div class="u-top-search">
                        <el-form :inline="true" :model="dialogData" ref="dialogData" class="demo-form-inline">
                            <el-form-item prop="searchText">
                                <el-input placeholder="请选择车牌号" size="small" v-model="dialogData.carPlateNum"></el-input>
                            </el-form-item>
                            <el-form-item prop="searchText">
                                <el-input placeholder="请选择联系人" size="small" v-model="dialogData.contactPerson"></el-input>
                            </el-form-item>
                            <el-form-item prop="searchText" class="z-mr30">
                                <el-input placeholder="请选择联系人手机号" size="small" v-model="dialogData.mobilePhone"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit" class="xe-button-normal">
                                    查询
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="clearfix">
                        <div class="z-posra" style="
                            max-height: 400px;
                            overflow: auto;
                            border-top: 1px solid #ced5de;
                            border-bottom: 1px solid #ced5de;
                        ">
                            <p class="pretendNoneData" v-if="this.supplierList.length === 0">
                                未找到符合条件的车辆。<a href="javascript:;" class="s-blue" @click="addNewCar">点击新增</a>
                            </p>
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
                                    <el-table-column prop="carPlateNum" label="车牌号" min-width="110"></el-table-column>
                                    <el-table-column prop="contactPerson" label="联系人" min-width="110"></el-table-column>
                                    <el-table-column prop="mobilePhone" label="手机号" min-width="110"></el-table-column>
                                    <el-table-column prop="carLength" label="车辆长度(米)" min-width="110"></el-table-column>
                                    <el-table-column prop="address" label="承运线路" min-width="210"></el-table-column>
                                </el-table>
                            </el-radio-group>
                            <!-- <div class="page-showbox">
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
                            </div> -->
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" @click="saveSupplierName">确定</el-button>
                    <el-button class="xe-button-normal" @click="dialogClosesup">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import areaselectTag from '@/components/areaSelect/areaSelect';
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
        let checkCarLength = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                if (!(value >= 100) && !(value <= 0)) {
                    callback();
                } else {
                    callback(new Error('请输入正确的车辆长度'));
                }
            }
        };
        let checkPlateNum = (rule, value, callback) => { // 校验che
            var reg = /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{5}$/;
            var res = reg.test(value);
            if (!res) {
                callback(new Error('请输入正确的车牌号'));
            } else {
                let params = {};
                params.carPlateNum = value;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/erp/logisticsCar/checkCarNum',
                    data: params
                }).then((res) => {
                    if (res.data.remote && res.data.remote.status !== '0000') {
                        callback(new Error(res.data.remote.msg));
                    } else {
                        callback();
                    }
                }).catch((error) => {
                    callback();
                    console.log(error);
                });
            }
        };
        return {
            rules: {
                carPlateNum: [
                    {validator: checkPlateNum, trigger: 'blur'}
                ],
                carLength: [
                    {validator: checkCarLength, trigger: 'blur'}
                ],
                mobilePhone: [
                    {validator: checkPhone, trigger: 'blur'}
                ]
            },
            formData: {},
            formAddCar: {
                carPlateNum: '',
                carLength: '',
                mobilePhone: '',
                contactPerson: ''
            },
            value1: '',
            value2: '',
            loadAddr: '',
            unloadAddr: '',
            remark: '',
            dialogVisible: false,
            dialogClosesAdd: false,
            dialogData: {
                carPlateNum: '',
                contactPerson: '',
                mobilePhone: ''
            },
            sendCarLogisticsList: [],
            xePageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            supplierList: [],
            shopInfo: {},
            shopInfoTmp: {},
            tabCard_val: 'first',
            listLineArr: [],
            venCarList: [],
            pickerOptionStart: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }
        };
    },
    created() {
        this.loadInfo();
        // this.loadVenDetail(1);
        this.GetNextDate();
    },
    methods: {
        linkTolist() {
            this.$router.push({name: 'allotCarListIndex'});
        },
        addNewCar() {
            this.dialogClosesAdd = true;
        },
        numberFix(event, number, type) {
            let val = 0;
            if (!(event.target.value > 0)) {
                val = '';
            } else {
                val = parseFloat(event.target.value).toFixed(number);
            }
            event.target.value = val;
            if (type === 1) { // type是blur是event 钱没加上双向绑定的bug修复
                this.formAddCar.carLength = val;
            }
        },
        dialogClosesAddDio() {
            this.dialogClosesAdd = false;
            this.formAddCar = {
                carPlateNum: '',
                carLength: '',
                mobilePhone: '',
                contactPerson: ''
            };
        },
        saveNewCar() {
            this.$refs.formAddCar.validate((valid) => {
                if (valid) {
                    let param = this.formAddCar;
                    param.caAreaId = this.sendCarLogisticsList[0].caAreaId;
                    param.caCityId = this.sendCarLogisticsList[0].caCityId;
                    param.caProvinceId = this.sendCarLogisticsList[0].caProvinceId;
                    param.cityId = this.sendCarLogisticsList[0].cityId;
                    param.provinceId = this.sendCarLogisticsList[0].provinceId;
                    param.areaId = this.sendCarLogisticsList[0].areaId;
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-erp/logistics/saveCarInfo',
                        data: param
                    }).then((res) => {
                        this.$xeMessage.success(res.data.info);
                        this.dialogClosesAdd = false;
                        this.shopInfoTmp.carId = res.data.carId;
                        this.shopInfoTmp.carPlateNum = this.formAddCar.carPlateNum;
                        this.shopInfoTmp.contactPerson = this.formAddCar.contactPerson;
                        this.shopInfoTmp.carLength = this.formAddCar.carLength;
                        this.shopInfoTmp.mobilePhone = this.formAddCar.mobilePhone;
                        // this.shopInfoTmp = {
                        //     carPlateNum: this.formAddCar.carPlateNum,
                        //     contactPerson: this.formAddCar.contactPerson,
                        //     carLength: this.formAddCar.carLength,
                        //     mobilePhone: this.formAddCar.mobilePhone
                        // };
                        this.dialogVisible = false;
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    return false;
                }
            });
        },
        dialogClosesup() {
            this.resetForm('dialogData');
            this.dialogVisible = false;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.shopInfo = {};
        },
        GetNextDate() {
            if (!this.value1) {
                this.value1 = this.setTime('08');
            }
            if (!this.value2) {
                this.value2 = this.setTime('10');
            }
        },
        chooseCar() {
            this.loadLineInfo(1);
            this.dialogVisible = true;
        },
        onSubmit() {
            this.loadLineInfo(1);
        },
        loadLineInfo(pageNum) {
            let param = this.dialogData;
            param.pageNum = pageNum;
            param.pageSize = this.xePageInfo.pageSize;
            param.caAreaId = this.sendCarLogisticsList[0].caAreaId;
            param.caCityId = this.sendCarLogisticsList[0].caCityId;
            param.caProvinceId = this.sendCarLogisticsList[0].caProvinceId;
            param.cityId = this.sendCarLogisticsList[0].cityId;
            param.provinceId = this.sendCarLogisticsList[0].provinceId;
            param.areaId = this.sendCarLogisticsList[0].areaId;
            param.logtsCodeArr = this.$route.query.logtsCodeArr.split(',');
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/logistics/queryBathCarList',
                data: param
            }).then((res) => {
                // this.$set(this, 'formData', res.data);
                this.supplierList = res.data.carList;
                // this.listLineArr = this.formData.listLine;
            }).catch((error) => {
                console.log(error);
            });
        },
        saveSupplierName() {
            if (!this.shopInfo.carId) {
                this.$xeMessage.warning('请选择一个承运车辆');
                return;
            }
            this.shopInfoTmp = deepCopy(this.shopInfo);
            this.dialogClosesup();
        },
        setTime(h) {
            let time = new Date();
            // 获取日期加一时间年月日
            var y = time.getFullYear();
            var m = time.getMonth();
            var d = time.getDate() + 1;
            var tDate = new Date(y, m, d);
            var ys = tDate.getFullYear();
            var ms = tDate.getMonth() + 1;
            var ds = tDate.getDate();
            var dateString = ys + '-' + ms + '-' + ds + ' ' + h + ':00:00';
            // console.log('dateString', dateString);
            return dateString;
        },
        startCreateDateFn(val) {
            this.value1 = val;
        },
        startCreateDate02Fn(val) {
            this.value2 = val;
        },
        saveCarSend() {
            let param = {
                carPlateNum: this.shopInfoTmp.carPlateNum,
                contactPerson: this.shopInfoTmp.contactPerson,
                mobilePhone: this.shopInfoTmp.mobilePhone,
                upFlag: 1,
                carId: this.shopInfoTmp.carId,
                logtCodeArr: this.$route.query.logtsCodeArr.split(','),
                caAreaId: this.sendCarLogisticsList[0].caAreaId,
                caCityId: this.sendCarLogisticsList[0].caCityId,
                caProvinceId: this.sendCarLogisticsList[0].caProvinceId,
                cityId: this.sendCarLogisticsList[0].cityId,
                provinceId: this.sendCarLogisticsList[0].provinceId,
                areaId: this.sendCarLogisticsList[0].areaId,
                loadAddr: this.loadAddr,
                loadTime: this.value1,
                unloadAddr: this.unloadAddr,
                unloadTime: this.value2,
                remark: this.remark
            };
            if (!this.shopInfoTmp.carId) {
                this.$xeMessage.warning('请选择承运车辆');
                return;
            }
            if (!this.loadAddr) {
                this.$xeMessage.warning('请填写装车点');
                return;
            }
            if (!this.unloadAddr) {
                this.$xeMessage.warning('请填写卸货点');
                return;
            }
            console.log('test', param);
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/logistics/saveBathSendCarInfo',
                data: param
            }).then((res) => {
                let _this = this;
                this.$xeMessage.success(res.msg);
                setTimeout(function () {
                    _this.linkTolist();
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        },
        loadInfo() {
            console.log('test', this.$route.query.logtsCodeArr.split(','));
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/logistics/toBathSendCarPage',
                data: {
                    logtsCodeArr: this.$route.query.logtsCodeArr.split(',')
                }
            }).then((res) => {
                this.sendCarLogisticsList = res.data.sendCarLogisticsList;
                // console.log('test', this.shopInfoTmp);
                // if (res.data.latelySendCar) {
                //     this.shopInfoTmp = res.data.latelySendCar;
                // }
            }).catch((error) => {
                console.log(error);
            });
        },
        handleSizeChange(val) {
            this.xePageInfo.pageSize = val;
            this.loadLineInfo(1);
        },
        handleCurrentChange(val) {
            this.xePageInfo.pageNum = val;
            this.loadLineInfo(val);
        }
    },
    components: {
        areaselectTag
    }
};
</script>

<style lang="scss">
    .detailsCar{
        .el-form-item__label{
            text-align: left;
        }
        .el-form-item__content{
            line-height: 30px;
        }
        .el-form-item{
            margin-bottom: 2px;
        }
    }
    .floorGap{
        margin-bottom: 12px;
    }
    .smallMore-dialog .el-dialog--small{
        width: 60%;
    }
    .detailsCar .info-carInfo .el-form-item__label{
        text-align: right;
    }
</style>
