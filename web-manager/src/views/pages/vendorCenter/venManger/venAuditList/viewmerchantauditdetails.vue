<template lang="html">
    <div class="m-router-con rseGds-content">
        <!--基本信息-->
        <div class="for-itemlis">
            <div class="item-head clearfix">
                <div class="fl item-tit">基本信息</div>
            </div>
            <div class="item-main-box martop10">
                <ul class="clearfix">
                    <el-tooltip class="item" effect="dark"  placement="top">
                        <div slot="content">{{auditetailsData.venInfo.venName}}</div>
                        <li class="list-show list-show1 fl" ><p class="lis_p ellipsisp">商户/企业名称：{{auditetailsData.venInfo.venName}}</p></li>
                    </el-tooltip>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">企业类型：{{auditetailsData.venInfo.comType | comTypefiter}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">企业性质：{{auditetailsData.venInfo.venProperties | venPropertiesfiter}}</p></li>
                     <li class="list-show list-show1 fl"><p class="lis_p ellipsis">主营类型：{{auditetailsData.venInfo.businessTypeName}}</p></li>
                     <el-tooltip class="item" effect="dark"  placement="top">
                         <div slot="content">{{auditetailsData.venInfo.detailAddr}}</div>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">企业注册地：{{auditetailsData.venInfo.detailAddr}}</p></li>
                     </el-tooltip>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">入驻状态：{{auditetailsData.venInfo.venSatatus | venSatatusfiter}}</p></li>
                     <el-tooltip class="item" effect="dark"  placement="top">
                         <div slot="content">{{auditetailsData.venInfo.shopName}}</div>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">店铺名称：{{auditetailsData.venInfo.shopName}}</p></li>
                     </el-tooltip>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">入驻时间：{{auditetailsData.venInfo.createDate, 'ms' | millisecondFormat}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">店铺简码：&nbsp;&nbsp;{{auditetailsData.venInfo.venSimpleCode}}</p></li>
                    <li class="list-show list-show1 fl" v-if="auditetailsData.venInfo.venSatatus == 2"><p class="lis_p ellipsis">审核时间：{{auditetailsData.venInfo.auditDate, 'ms' | millisecondFormat}}</p></li>
                     <el-tooltip class="item" effect="dark"  placement="top" v-if="auditetailsData.areaInfo">
                        <div slot="content">{{auditetailsData.areaInfo}}</div>
                         <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商品销售区域：{{auditetailsData.areaInfo}}</p></li>
                     </el-tooltip>
                     <li class="list-show list-show1 fl" v-if="auditetailsData.venInfo.venSatatus == 3"><p class="lis_p ellipsis">驳回时间：{{auditetailsData.venInfo.auditDate, 'ms'  | millisecondFormat}}</p></li>
                     <el-tooltip class="item" effect="dark" placement="top" v-if="auditetailsData.venInfo.venSatatus == 3">
                        <div slot="content">{{auditetailsData.venInfo.venRejectReason.substr(0, 50)}}<br/>{{auditetailsData.venInfo.venRejectReason.substr(50, 50)}}<br/>{{auditetailsData.venInfo.venRejectReason.substr(100, 50)}}<br/>{{auditetailsData.venInfo.venRejectReason.substr(150, 50)}}</div>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">驳回理由：{{auditetailsData.venInfo.venRejectReason}}</p></li>
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
                    {{auditetailsData.venInfo.venType | venTypefiter}}
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
                    {{auditetailsData.venInfo.payType | payTypefiter}}
                </div>
            </div>
        </div>
        <!--配送方式-->
        <div class="for-itemlis">
            <div class="item-head clearfix">
                <div class="fl item-tit">配送方式 <span class="detal"></span></div>
            </div>
            <div class="item-main-box">
                <ul class="detial-lis clearfix">
                    <li v-for="item in shipType" class="fl" style="margin-right: 10px">{{item.name}}</li>
                </ul>
            </div>
        </div>
            <!--button提交按钮-->
        <div class="form_sub_btn1">
            <el-button type="primary" @click="goBack">返回</el-button>
        </div>
    </div>
</template>

<script>
import permission from 'mixins/permission.js';
import allmethods from '@/filters';
export default {
    mixins: [permission],
    data() {
        return {
            permissionObj: {},
            picServer: '',
            shipType: [],
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
                    console.log('res---->', res);
                    if (res.data) {
                        this.picServer = res.data.picServer;
                        this.auditetailsData = res.data;
                        if (this.auditetailsData.venInfo.shipType) {
                            if (this.auditetailsData.venInfo.shipType.indexOf(1) !== -1) {
                                if (this.auditetailsData.venInfo.appointCarFlag) {
                                    this.shipType.push({name: `配送 ( ${allmethods.appointCarFlagfilter(this.auditetailsData.venInfo.appointCarFlag)} )`});
                                }
                            }
                            if (this.auditetailsData.venInfo.shipType.indexOf(2) !== -1) {
                                this.shipType.push({name: '委托自提'});
                            }
                            if (this.auditetailsData.venInfo.shipType.indexOf(3) !== -1) {
                                this.shipType.push({name: '到店自提'});
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
        }
    }
};
</script>
