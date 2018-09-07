<template lang="html">
    <div class="m-router-con">
    	<el-form class="" :rules="rules"  ref = "formData" :model = "formData" label-width = "90px">
            <div class="for-itemlis">
                <!-- {{formData}} -->
                <h4 class="tit-salesApply">基本信息</h4>
                <div>
                    <el-form-item label="车牌号" prop="carPlateNum" required>
                        <el-input class = "xe-input-col3" v-model="formData.carPlateNum" placeholder="请填写完整车牌号，如豫AXY123" :maxlength="7"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="车辆长度(米)" prop="carLength">
                        <el-input @blur="numberFix($event, 2, 1)" class = "xe-input-col3" v-model.number="formData.carLength" :maxlength="5"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="联系人" prop="contactPerson">
                        <el-input class = "xe-input-col3" v-model="formData.contactPerson" :maxlength="10"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="手机号" prop="mobilePhone" required>
                        <el-input class = "xe-input-col3" v-model="formData.mobilePhone" :maxlength="11"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" :rows="2" class = "xe-input-col3" v-model="formData.remark" :maxlength="200"></el-input>
                    </el-form-item>
                </div>
                <h4 class="tit-salesApply">承运线路</h4>
                <!-- listLineArr:{{listLineArr}} -->
                <div class="lineList">
                    <div v-for="(item, index) in listLineArr" class="lineItem">
                        <el-form-item label-width="0">
                            <span class="carLabel">
                                线路{{index + 1}}:
                            </span>
                            <areaselectTag :changeOnSelects="false" placeholder="省市区" v-model='item.fromArea' :width='170'></areaselectTag> <------>
                            <areaselectTag :changeOnSelects="false" placeholder="省市区" v-model='item.endArea' :width='170'></areaselectTag>
                            <a class="s-blue deletLine" @click="deletLine(index)" href="javascript:;">删除</a>
                            <a class="s-blue addLine" @click="addLine" href="javascript:;">新增</a>
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <div class="u-next" style="padding: 15px 0 150px;">
                        <el-button type="primary" class="xe-button-normal" @click="submitForm('formData')" :disabled="nextDisabled">保存</el-button>
                        <el-button class="xe-button-normal" @click="linkTolist">取消</el-button>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
import areaselectTag from '@/components/areaSelect/areaSelect';
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
        let checkPlateNum = (rule, value, callback) => { // 校验仓库名已存在
            var reg = /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{5}$/;
            var res = reg.test(value);
            if (!res) {
                callback(new Error('请输入正确的车牌号'));
            } else {
                let params = {};
                params.carPlateNum = value;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/logisticsCar/checkCarNum',
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
            formData: {
                carPlateNum: '',
                carLength: '',
                contactPerson: '',
                mobilePhone: '',
                remark: ''
            },
            nextDisabled: false,
            listLineArr: [
                {
                    fromArea: [],
                    endArea: []
                }
            ]
        };
    },
    methods: {
        addLine() {
            this.listLineArr.push({
                fromArea: [],
                endArea: []
            });
        },
        deletLine(index) {
            if (this.listLineArr.length === 1) {
                this.$xeMessage.warning('请至少选择1条承运线路');
                return false;
            }
            this.listLineArr.splice(index, 1);
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 1
                    let _this = this;
                    for (var i = 0; i < this.listLineArr.length; i++) {
                        let item = this.listLineArr[i];
                        if (!item.fromArea[2]) {
                            this.$xeMessage.warning('线路起始地/目的地请选择到区/县');
                            return false;
                        }
                        if (!item.endArea[2]) {
                            this.$xeMessage.warning('线路起始地/目的地请选择到区/县');
                            return false;
                        }
                        item.uniq = item.fromArea[2] + '-' + item.endArea[2];
                        item.uniqRevese = item.endArea[2] + '-' + item.fromArea[2];
                    }
                    for (var k = 0; k < this.listLineArr.length; k++) {
                        let itemK = this.listLineArr[k];
                        for (var j = k + 1; j < this.listLineArr.length; j++) {
                            if (this.listLineArr[j].uniq === itemK.uniq) {
                                this.$xeMessage.warning('请勿选择重复线路');
                                return false;
                            } else {
                                if (this.listLineArr[j].uniqRevese === itemK.uniq) {
                                    this.$xeMessage.warning('请勿选择重复线路');
                                    return false;
                                }
                            }
                        }
                    }
                    this.nextDisabled = true;
                    let param = this.formData;
                    param.listLineJSONStr = [];
                    this.listLineArr.forEach(function(item) {
                        param.listLineJSONStr.push({
                            startProvinceId: item.fromArea[0],
                            startCityId: item.fromArea[1],
                            startAreaId: item.fromArea[2],
                            endProvinceId: item.endArea[0],
                            endCityId: item.endArea[1],
                            endAreaId: item.endArea[2]
                        });
                    });
                    console.log('testparam', param);
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-mis/manager/logisticsCar/insertLogisticsCar',
                        data: param
                    }).then((res) => {
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.nextDisabled = false;
                            _this.linkTolist();
                        }, 300);
                        // this.picServer = res.data.picServer;
                    }).catch((error) => {
                        _this.nextDisabled = false;
                        console.log(error);
                    });
                    console.log('test');
                } else {
                    return false;
                }
            });
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
                this.formData.carLength = val;
            }
        },
        linkTolist() {
            this.$router.push({name: 'carListIndex'});
        }
    },
    components: {
        areaselectTag
    }
};
</script>

<style lang="scss">
</style>
