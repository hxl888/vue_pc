<template lang="html">
    <div class="m-router-con">
        <div>
            <!-- {{sysReceivingTime}} -->
           <ul class="details-content">
                <li class="clearfix">
                    <div class="fl">范围：</div><div class="fl mobelcontent">{{sysReceivingTime.receivingTimePlat | receivingTimePlatToText}}</div>
                </li>
                <li class="clearfix">
                    <div class="fl">确认收货时间：</div><div class="fl mobelcontent" v-if="sysReceivingTime.receivingTime">{{sysReceivingTime.receivingTime}}天</div>
                </li>
                <li class="clearfix">
                    <div class="fl">备注：</div><div class="fl mobelcontent">{{sysReceivingTime.remark}}</div>
                </li>
           </ul>
           <footer style="margin-top: 20px">
                <el-button class="xe-button-normal" type="primary"  @click="editor" >编辑</el-button>
            </footer>
        </div>
        <!--弹框(编辑新增)-->
        <div class="reset-dialog reset-dialog04 addNew-box">
            <el-dialog class="error-tishi" title="编辑" :visible.sync="edialogVisible">
                <!-- {{formArray}} -->
                <el-form ref="formArray" :model="formArray" label-width="105px">
                    <el-form-item label="确认收货时间" prop="receivingTime">
                        <el-input size="small" class = "xe-input-60" @input.native="parseInNumber($event)" :maxlength="2" v-model.number="formArray.receivingTime" placeholder="请输入"></el-input>&nbsp;&nbsp;天
                    </el-form-item>
                     <el-form-item label="备注" prop="remark" class="textare_resethei_80">
                        <el-input size="small" class = "xe-input-210" type="textarea" style="margin-bottom: 15px;"  :maxlength="200" v-model="formArray.remark" placeholder="请输入备注"></el-input>
                    </el-form-item>
                    <div class="dialog-footer-bor">
                        <el-button class="xe-button-normal" type="primary" :loading="loading" @click="preservation('formArray')">确认</el-button>
                        <el-button class="xe-button-normal" @click="cancel">取消</el-button>
                    </div>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            htmlloading: false,
            edialogVisible: false,
            loading: false,
            sysReceivingTime: {},
            formArray: {
                receivingTimePlat: 1,
                receivingTime: '',
                remark: ''
            },
            productUrl: '/xe-route/xe-mis'
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        parseInNumber(event) {
            let val = 0;
            if (!(event.target.value > 0)) {
                val = '';
            } else {
                val = parseInt(event.target.value);
            }
            event.target.value = val;
            this.formArray.receivingTime = val;
        },
        editor() {
            this.edialogVisible = true;
        },
        enquiryForm() {
            let params = {};
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/sysReceivingTime/queryReceivingTime',
                data: params
            }).then((res) => {
                this.htmlloading = true;
                this.sysReceivingTime = res.data.sysReceivingTime;
                if (!this.sysReceivingTime) {
                    this.sysReceivingTime = {
                        receivingTimePlat: 1,
                        receivingTime: '',
                        remark: ''
                    };
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        preservation() {
            let params = {
                receivingTimePlat: this.formArray.receivingTimePlat,
                receivingTime: this.formArray.receivingTime,
                remark: this.formArray.remark
            };
            if (!this.formArray.receivingTime) {
                this.$xeMessage.warning('确认收货时间不能为空');
                return false;
            };
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/sysReceivingTime/setReceivingTime',
                data: params
            }).then((res) => {
                this.htmlloading = true;
                this.$xeMessage.success(res.msg);
                this.sysReceivingTime = params;
                this.cancel();
            }).catch((error) => {
                console.log(error);
            });
        },
        cancel() {
            this.edialogVisible = false;
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="scss" scoped>
    .details-content {
        margin-top: -10px;
        li {
            line-height: 32px;
            font-size: 12px;
            color: #687281;
        }
        .mobelcontent {
            max-width: 960px;
            overflow: hidden;
        }
    }
    .error-tishi .el-form-item {
        margin-bottom: 0!important;
        padding-bottom: 5px;
    }
    .pad0 {
        padding:0!important;
    }
</style>
