<template lang="html">
    <div class="m-router-con">
        <el-form class="resetForm" ref="formData" :model = "formData" label-width = "110px">
            <!--基础信息-->
            <!-- {{formData}} -->
            <div class="for-itemlis">
                <div>
                    <el-form-item label="是否开启库存同步" prop="ckValue">
                        <el-radio-group v-model="formData.ckValue">
                            <template v-for="item in searchFlagList">
                                <el-radio disabled :label="item.value" :key="item.value">{{item.name}}</el-radio>
                            </template>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="是否开启自动分仓" prop="autoFcValue">
                        <el-radio-group v-model="formData.autoFcValue">
                            <template v-for="item in searchFlagList">
                                <el-radio :label="item.value" :key="item.value">{{item.name}}</el-radio>
                            </template>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="是否启用维护时间" prop="timeSave">
                        <el-radio-group v-model="formData.timeSave">
                            <template v-for="item in searchFlagList">
                                <el-radio :label="item.value" :key="item.value">{{item.name}}</el-radio>
                            </template>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label=" " v-if="formData.timeSave === 2">
                        <el-time-picker
                            placeholder="起始时间"
                            v-model="formData.startTime"
                        >
                        </el-time-picker>
                        <el-time-picker
                            placeholder="结束时间"
                            v-model="formData.endTime"
                        >
                        </el-time-picker>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item  label="">
                        <div class="u-next">
                            <el-button :loading="nextDisabled" class="xe-button-normal" type="primary" @click="submitForm">保存</el-button>
                        </div>
                    </el-form-item>
                </div>
           	</div>
        </el-form>
    </div>
    </div>
</template>

<script>
import {searchFlag02} from '@/dataControl.js';
export default {
    data() {
        return {
            nextDisabled: false,
            formData: {
                ckValue: 1,
                autoFcValue: 2,
                timeSave: 1,
                startTime: new Date(2016, 9, 10, 0, 0),
                endTime: new Date(2016, 9, 10, 0, 30)
            }
        };
    },
    created() {
        this.loadInf();
    },
    methods: {
        submitForm() {
            if (!(this.formData.startTime && this.formData.endTime)) {
                this.$xeMessage.warning('请完善维护时间后保存');
                return false;
            }
            this.nextDisabled = true;
            console.log('testthis.formData.startTime', this.formData.startTime);
            let param = {
                list: [
                    {
                        sysFlag: this.formData.ckValue,
                        sysType: 1
                    },
                    {
                        sysFlag: this.formData.autoFcValue,
                        sysType: 2
                    },
                    {
                        sysFlag: this.formData.timeSave,
                        sysType: 3,
                        startTime: this.timeGet(this.formData.startTime),
                        endTime: this.timeGet(this.formData.endTime)
                    }
                ]
            };
            console.log('test', param);
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/venSysParam/updateSysFlagBySysType',
                data: param
            }).then((res) => {
                this.nextDisabled = false;
                this.$xeMessage.success(res.msg);
                // this.$router.push({name: 'sysParamSet'});
            }).catch((error) => {
                this.nextDisabled = false;
                console.log(error);
            });
        },
        timeGet(time) {
            let obj = {};
            obj.h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
            obj.m = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
            obj.s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
            return obj.h + ':' + obj.m + ':' + obj.s;
        },
        changeStart(val) {
            console.log('testchangeStart', val);
            this.formData.startTime = val;
        },
        changeEnd(val) {
            this.formData.endTime = val;
        },
        loadInf() {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/venSysParam/querySysParam',
                data: {}
            }).then((res) => {
                console.log('test', res);
                res.data.sysParamList.forEach((item) => {
                    if (item.sysType === 1) {
                        if (parseInt(item.sysFlag) === 1) {
                            this.formData.ckValue = 1;
                        } else {
                            this.formData.ckValue = 2;
                        }
                    }
                    if (item.sysType === 2) {
                        if (parseInt(item.sysFlag) === 1) {
                            this.formData.autoFcValue = 1;
                        } else {
                            this.formData.autoFcValue = 2;
                        }
                    }
                    if (item.sysType === 3) {
                        if (parseInt(item.sysFlag) === 1) {
                            this.formData.timeSave = 1;
                        } else {
                            this.formData.timeSave = 2;
                            this.$set(this.formData, 'startTime', new Date(2016, 9, 10, this.timeSet(item.startTime).h, this.timeSet(item.startTime).m, this.timeSet(item.startTime).s));
                                // this.timeSet(item.startTime));
                            this.$set(this.formData, 'endTime', new Date(2016, 9, 10, this.timeSet(item.endTime).h, this.timeSet(item.endTime).m, this.timeSet(item.endTime).s));
                            // this.formData.startTime = this.timeSet(item.startTime);
                            // this.formData.endTime = this.timeSet(item.endTime);
                        }
                    }
                });
            }).catch((error) => {
                console.log(error);
            });
        },
        timeSet(time) {
            let obj = {};
            let timeArr = time.split(':');
            obj.h = timeArr[0] ? timeArr[0] : 0;
            obj.m = timeArr[1] ? timeArr[1] : 0;
            obj.s = timeArr[2] ? timeArr[2] : 0;
            return obj;
        }
    },
    computed: {
        searchFlagList() {
            return searchFlag02;
        }
    }
};
</script>

<style lang="scss">
</style>
