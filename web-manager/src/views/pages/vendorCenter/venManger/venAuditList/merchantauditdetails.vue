<template lang="html">
    <div class="m-router-con rseGds-content">
        <!--基本信息-->
        <div class="for-itemlis">
            <div class="item-head clearfix">
                <div class="fl item-tit">基本信息</div>
            </div>
            <div class="item-main-box martop10">
                <ul class="clearfix">
                    <el-tooltip class="item" effect="dark" placement="top">
                        <div slot="content">{{auditetailsData.venInfo.venName}}</div>
                        <li class="list-show list-show1 fl" ><p class="lis_p ellipsisp">商户/企业名称：{{auditetailsData.venInfo.venName}}</p></li>
                    </el-tooltip>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">企业类型：{{auditetailsData.venInfo.comType | comTypefiter}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">企业性质：{{auditetailsData.venInfo.venProperties | venPropertiesfiter}}</p></li>
                     <li class="list-show list-show1 fl"><p class="lis_p ellipsis">主营类型：{{auditetailsData.venInfo.businessTypeName}}</p></li>
                     <el-tooltip class="item" effect="dark" placement="top">
                        <div slot="content">{{auditetailsData.venInfo.detailAddr}}</div>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">企业注册地：{{auditetailsData.venInfo.detailAddr}}</p></li>
                     </el-tooltip>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">入驻状态：{{auditetailsData.venInfo.venSatatus | venSatatusfiter}}</p></li>
                     <el-tooltip class="item" effect="dark" placement="top">
                        <div slot="content">{{auditetailsData.venInfo.shopName}}</div>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">店铺名称：{{auditetailsData.venInfo.shopName}}</p></li>
                     </el-tooltip>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">入驻时间：{{auditetailsData.venInfo.createDate, 'ms' | millisecondFormat}}</p></li>
                    <li class="list-show list-show1 fl" ><p class="lis_p ellipsis"><i class="col_red2d">*</i>店铺简码：&nbsp;&nbsp;<el-input @blur="ckReaptSimple" v-model="venSimpleCode" placeholder="请输入四位小写字母" :maxlength="4" class="xe-input-smal30_hei20"></el-input></p></li>
                    <li class="list-show list-show1 fl" v-if="auditetailsData.venInfo.venSimpleCode"><p class="lis_p ellipsis">店铺简码：&nbsp;&nbsp;{{auditetailsData.venInfo.venSimpleCode}}</p></li>
                    <li class="list-show list-show1 fl" v-if="auditetailsData.venInfo.venSatatus == 2"><p class="lis_p ellipsis">审核时间：{{auditetailsData.venInfo.auditDate, 'ms' | millisecondFormat}}</p></li>
                     <el-tooltip class="item" effect="dark"  placement="top">
                         <div slot="content">{{auditetailsData.areaInfo}}</div>
                         <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商品销售区域：{{auditetailsData.areaInfo}}</p></li>
                     </el-tooltip>
                     <li class="list-show list-show1 fl" v-if="auditetailsData.venInfo.venSatatus == 3"><p class="lis_p ellipsis">驳回时间：{{auditetailsData.venInfo.auditDate, 'ms' | millisecondFormat}}</p></li>
                     <el-tooltip class="item " effect="dark" placement="top" v-if="auditetailsData.venInfo.venSatatus == 3">
                        <div slot="content">{{auditetailsData.venInfo.venRejectReason.substr(0, 50)}}<br/>{{auditetailsData.venInfo.venRejectReason.substr(50, 50)}}<br/>{{auditetailsData.venInfo.venRejectReason.substr(100, 50)}}<br/>{{auditetailsData.venInfo.venRejectReason.substr(150, 50)}}</div>
                        <li class="list-show list-show1 fl"  ><p class="lis_p ellipsis">驳回理由：{{auditetailsData.venInfo.venRejectReason}}</p></li>
                     </el-tooltip>
                </ul>
            </div>
        </div>
        <!--资质信息-->
        <div class="for-itemlis">
            <div class="item-head clearfix">
                <div class="fl item-tit">资质信息</div>
            </div>
            <div class="item-main-box martop10 clearfix">
                <div class="ulBox">
                    <div class="list-show infor-list fl clearfix" v-for="(item, index) in auditetailsData.infoAptitudeList">
                        <div class="fl infor-picshow" v-if="!item.idcardBack">
                            <a :href="picServer + item.apUrl" target="_blank">
                                <img :src="picServer + item.apUrl"  alt="" >
                            </a>
                        </div>
                        <div class="fl infor-picshow" v-else>
                            <a :href="picServer + item.apUrl" target="_blank">
                                <img :src="picServer + item.apUrl"  alt="" style="height: 50px">
                            </a>
                            <a v-if="item.idcardBack" :href="picServer + item.idcardBack" target="_blank">
                                <img :src="picServer + item.idcardBack"  alt=""  style="height: 50px">
                            </a>
                        </div>
                        <div class="fl infor-content">
                            <p class="ellipsis" v-if="item.apName">证件名称：{{item.apName}}</p>
                            <p class="ellipsis" v-if="item.apNum">证件号码：{{item.apNum}}</p>
                            <p class="ellipsis" v-if="item.endDate">过期日期：{{item.endDate == 1 ? '长期有效' : item.endDate }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          <!--商户性质-->
        <div class="for-itemlis">
            <div class="item-head clearfix">
                <div class="fl item-tit">商户性质 <span class="detal"> (审核需要对商户性质做出选择）</span></div>
            </div>
            <div class="item-main-box">
                <div class="detial-lis">
                        <el-radio-group v-model="venType">
                            <el-radio :label="item.value" :value="item.value" :key="item.value"   v-for="item in venTypeDatalist">{{item.name}}</el-radio>
                        </el-radio-group>
                </div>
            </div>
        </div>
        <!--联系人信息-->
        <div class="for-itemlis">
             <div class="item-head clearfix">
                <div class="fl item-tit">联系人信息</div>
             </div>
             <div class="item-main-box">
                    <div class="detial-lis"><span class="labels"> 名称：</span>{{auditetailsData.venInfo.userName}}</div>
                    <div class="detial-lis"><span class="labels">手机号：</span>{{auditetailsData.venInfo.userPhone}}</div>
                    <div class="detial-lis"><span class="labels">联系人邮箱：</span>{{auditetailsData.venInfo.userEmail}}</div>
             </div>
        </div>
        <!--支付方式-->
        <div class="for-itemlis">
            <div class="item-head clearfix">
                <div class="fl item-tit">支付方式 <span class="detal"> (审核时可对商户支付方式做修改维护）</span></div>
            </div>
            <div class="item-main-box">
                <div class="detial-lis">
                    <el-checkbox-group v-model="payType">
                        <el-checkbox :label="item.value" :key="item.value"   v-for="(item, index) in payTypeSelec">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
        </div>
        <!--配送方式-->
        <div class="for-itemlis">
            <div class="item-head clearfix">
                <div class="fl item-tit">配送方式 <span class="detal"> (审核时可对商户配送方式做修改维护）</span></div>
            </div>
            <div class="item-main-box">
                <div class="detial-lis">
                    <el-checkbox-group v-model="shipType">
                        <el-checkbox :label="item.value" :key="item.value"  v-for="(item, index) in shipTypeList">{{item.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                     <el-radio-group v-model="appointCarFlag" v-if="shipType.indexOf(1) !== -1">
                        <el-radio :label="item.value" :value="item.value" :key="item.value"   v-for="item in appointCarFlagList">{{item.name}}</el-radio>
                    </el-radio-group>
                </div>
            </div>
        </div>
        <!--button提交按钮-->
        <div class="form_sub_btn1">
            <el-button type="primary" :loading="loadingSub" @click="AuditedMethod(2)">审核通过</el-button>
            <el-button @click.stop="rejectdailog = true">驳回</el-button>
            <el-button @click="goBack">返回</el-button>
        </div>
        <!--驳回弹框-->
        <div  class="reset-dialog dialog_wid340 textare_reset300" >
            <el-dialog title="驳回理由" :visible.sync="rejectdailog">
                <textarea class="" maxlength="200" v-model="rejectext"></textarea>
                <span class="last-num">{{rejectextNum}}/200</span>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="rejectSubmit">确定</el-button>
                    <el-button @click="cancelReject">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import permission from 'mixins/permission.js';
import {venTypeData, payTypeData, shipType, appointCarFlag} from '@/dataControl.js';
export default {
    mixins: [permission],
    data() {
        return {
            permissionObj: {},
            rejectdailog: false,
            picServer: '',
            loadingSub: false, // 提交button开关
            venType: '',
            shipType: [], // 配送方式
            appointCarFlag: 1,
            payType: [],
            version: '',
            ckReaptSimp: false, // 校验店铺简码
            payTypeSelec: [],
            venSimpleCode: '',
            rejectext: '',
            auditetailsData: {
                areaInfo: '',
                contractList: {},
                infoAptitudeList: {},
                venInfo: {}
            }
        };
    },
    created() {
        this.auditDetailsCk();
    },
    methods: {
        ckReaptSimpleFun() {  // 单独校验店铺简码不能重复
            let params = {};
            params.userCode = this.$route.query.userCode;
            params.venSimpleCode = this.venSimpleCode;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/venmanager/validateVenSimpleCode',
                data: params
            }).then((res) => {
                if (res.data.remote && res.data.remote.status !== '0000') {
                    window.$wxeMessage.warning(`${res.data.remote.msg}`);
                    this.ckReaptSimp = false;
                    this.venSimpleCode = '';
                } else {
                    this.ckReaptSimp = true;
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        ckReaptSimple() {
            this.checkSimpleCode(() => {
                this.ckReaptSimpleFun();
            });
        },
        checkpaymentMethod() {  // 支付方式检测
            if (this.payType.length < 1) {
                this.$alert('支付方式至少需要勾选一项', '提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
                return false;
            } else {
                return true;
            }
        },
        checkshipTypeMethod() {  // 配送方式检测
            if (this.shipType.length < 1) {
                this.$alert('请选择至少一种配送方式', '提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
                return false;
            } else {
                return true;
            }
        },
        checkmerchantNature() { // 商户性质检测
            if (!this.venType) {
                this.$alert('商户性质需要勾选一项', '提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
                return false;
            } else {
                console.log('this.venType', this.venType);
                return true;
            }
        },
        checkSimpleCode(call) { // 店铺简码检测
            let reg = '';
            if (this.auditetailsData.venInfo.venSimpleCode) {
                reg = /^[a-z_]{5}$/;
            } else {
                reg = /^[a-z]{4}$/;
            }
            if (!this.venSimpleCode) {
//                this.$alert('请输入店铺简码', '提示', {
//                    confirmButtonText: '确定',
//                    type: 'info'
//                });
                return false;
            } else {
                if (reg.test(this.venSimpleCode)) {
                    call && call();
                    return true;
                } else {
                    this.$alert('店铺简码为四位小写字母', '提示', {
                        confirmButtonText: '确定',
                        type: 'info'
                    });
                }
            }
        },
        AuditedMethod(status, call) {
            if (status === 2) {
                if (this.checkSimpleCode() && this.checkmerchantNature() && this.checkpaymentMethod() && this.checkshipTypeMethod()) {
                    if (this.auditetailsData.venInfo.venSimpleCode) {
                        this.auditedSuccess(status, call);
                    } else {
                        if (this.ckReaptSimp) {
                            this.auditedSuccess(status, call);
                        } else {
                            this.$alert('店铺简码已占用，请重新输入', '提示', {
                                confirmButtonText: '确定',
                                type: 'info'
                            });
                        }
                    }
                }
            } else if (status === 3) {
                this.auditedSuccess(status, call);
            }
        },
        auditedSuccess(Satatus, call) { // 审核通过提交数据
            let _this = this;
            let params = {};
            params.venType = this.venType;
            if (this.payType.length >= 2) {
                params.payType = 3;
            } else {
                params.payType = this.payType.join(',');
            }
            if (this.shipType.indexOf(1) !== -1) {
                params.appointCarFlag = this.appointCarFlag;
            }
            params.shipType = this.shipType.join(',');
            params.auditor = this.auditetailsData.venInfo.auditor;
            params.version = this.auditetailsData.venInfo.version;
            params.venRejectReason = this.rejectext;
            params.venSatatus = Satatus;
            params.type = 2;
            params.userCode = this.$route.query.userCode;
            params.venSimpleCode = this.venSimpleCode;
            if (Satatus === 2) {
                this.loadingSub = true;
            }
            console.log('params-->', params);
            _this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/venmanager/updateVenApproval',
                data: params
            }).then((res) => {
                console.log(res);
                if (res.data.remote.status !== '0000') {
                    window.$wxeMessage.error(res.data.remote.msg);
                } else {
                    call && call();
                    this.goBack();
                    window.$wxeMessage.success('操作成功');
                }
            }).catch((error) => {
                this.loadingSub = false;
                console.log(error);
            });
        },
        auditDetailsCk() {
            let userCode = this.$route.query.userCode;
            if (userCode) {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/venmanager/queryVenDetail',
                    data: {
                        userCode: userCode
                    }
                }).then((res) => {
                    if (res.data) {
                        this.auditetailsData = res.data;
                        this.shipType = [];
                        let payTypes = this.auditetailsData.venInfo.payType;
                        let venType = this.auditetailsData.venInfo.venType;
                        if (this.auditetailsData.venInfo.shipType) {
                            let shipType = this.auditetailsData.venInfo.shipType.split(',');
                            if (shipType.length > 0) {
                                for (let i in shipType) {
                                    this.shipType.push(parseInt(shipType[i]));
                                }
                            }
                        } else {
                            this.shipType = [1, 2, 3];
                        }
                        this.appointCarFlag = res.data.venInfo.appointCarFlag;
                        this.picServer = res.data.picServer;
                        this.payTypeSelec = this.payTypeDatalist;
                        if (this.auditetailsData.venInfo.venSimpleCode) {
                            this.venSimpleCode = this.auditetailsData.venInfo.venSimpleCode;
                        }
                        if (this.auditetailsData.venInfo.appointCarFlag) {
                            this.appointCarFlag = parseInt(this.auditetailsData.venInfo.appointCarFlag);
                        } else {
                            this.appointCarFlag = 1;
                        }
                        this.venType = venType;
//                        if (venType === 1) {
//                            this.venType = '自营';
//                        } else if (venType === 2) {
//                            this.venType = '三方';
//                        }
                        if (payTypes) {
                            if (payTypes === 1) {
                                this.payType[0] = 1;
                            } else if (payTypes === 2) {
                                this.payType[0] = 2;
                            } else if (payTypes === 3) {
                                this.payType[0] = 1;
                                this.payType[1] = 2;
                            }
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.$router.go(-1);
            }
        },
        rejectSubmit() {
            if (this.rejectext) {
                if (this.rejectext.length <= 200) {
                    this.AuditedMethod(3, () => {
                        this.rejectdailog = false;
                        this.rejectext = '';
                    });
                } else {
                    this.$alert('驳回原因过长200字以内', '提示', {
                        confirmButtonText: '确定',
                        type: 'info'
                    });
                }
            } else {
                this.$alert('请填写驳回原因', '提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
            }
        },
        cancelReject() {
            this.rejectdailog = false;
            this.rejectext = '';
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    computed: {
        permissionFilter: {
            get() {
                return this.permissionDataList;
            },
            set(val) {
                console.log('按钮级别权限keys:' + JSON.stringify(val));
                if (val !== null) {
                    for (var key in val) {
                        this.$set(this.permissionObj, key, val[key].auth);
                    }
                }
            }
        },
        rejectextNum: function() {
            return this.rejectext.length;
        },
        venTypeDatalist() {
            return venTypeData;
        },
        payTypeDatalist() {
            return payTypeData;
        },
        shipTypeList() {
            return shipType;
        },
        appointCarFlagList() {
            return appointCarFlag;
        }
    }
};
</script>
