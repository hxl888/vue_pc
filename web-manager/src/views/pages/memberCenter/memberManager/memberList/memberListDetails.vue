<template lang="html">
    <div class="m-router-con rseGds-content">
        <el-form :inline="true" class="resetForm" :label-width = "xeLabelWidth">
            <!--基本信息-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">会员信息</div>
                </div>
                <div class="item-main-box martop10">
                    <ul class="clearfix">
                        <li class="list-show list-show1 fl" >
                            <p class="lis_p ellipsisp">
                                用户名：{{auditetailsData.XeUserInfoEntity.mobile ? auditetailsData.XeUserInfoEntity.mobile : auditetailsData.XeUserInfoEntity.email}}
                            </p>
                        </li>
                        <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">{{auditetailsData.XeUserInfoEntity.email}}</div>
                            <li class="list-show list-show1 fl">
                                <p class="lis_p ellipsis">
                                    绑定邮箱：{{auditetailsData.XeUserInfoEntity.email}}
                                </p>
                            </li>
                        </el-tooltip>
                        <li class="list-show list-show1 fl">
                            <p class="lis_p ellipsis">
                                绑定手机号：{{auditetailsData.XeUserInfoEntity.mobile}}
                            </p>
                        </li>
                        <li class="list-show list-show1 fl">
                            <p class="lis_p ellipsis">
                                真实姓名：{{auditetailsData.XeUserInfoEntity.userName}}
                            </p>
                        </li>
                        <li class="list-show list-show1 fl">
                            <p class="lis_p ellipsis">
                                注册来源：{{auditetailsData.XeUserInfoEntity.regSource | regSourcefiter}}
                            </p>
                        </li>
                        <li class="list-show list-show1 fl">
                            <p class="lis_p ellipsis">
                                用户类型：{{auditetailsData.XeUserInfoEntity.userTypeName}}
                            </p>
                        </li>
                        <li class="list-show list-show1 fl">
                            <p class="lis_p ellipsis">
                                状态：{{auditetailsData.XeUserInfoEntity.venFreezeStatus | freezeStatusfilter}}
                            </p>
                        </li>
                        <li class="list-show list-show1 fl">
                            <p class="lis_p ellipsis">
                                业务员手机号：{{auditetailsData.XeUserInfoEntity.saleManNameAndPhone}}
                            </p>
                        </li>
                        <li class="list-show list-show1 fl">
                            <p class="lis_p ellipsis">店铺地址：
                                <span>{{auditetailsData.XeUserInfoEntity.provinceName}}</span>
                                <span>{{auditetailsData.XeUserInfoEntity.cityName}}</span>
                                <span>{{auditetailsData.XeUserInfoEntity.areaName}}</span>
                            </p>
                        </li>
                        <el-tooltip class="item" effect="dark" placement="top">
                            <div slot="content">{{auditetailsData.XeUserInfoEntity.address}}</div>
                            <li class="list-show list-show1 fl">
                                <p class="lis_p ellipsis">
                                    详细地址：{{auditetailsData.XeUserInfoEntity.address}}
                                </p>
                            </li>
                         </el-tooltip>
                        <li class="list-show list-show1 fl">
                            <p class="lis_p ellipsis">
                                店铺名称：{{auditetailsData.XeUserInfoEntity.shopName}}
                            </p>
                        </li>
                        <li class="list-show list-show1 fl">
                        <p class="lis_p ellipsis">
                        验证状态：{{auditetailsData.XeUserInfoEntity.verifyFlag | verifyFlagfiter}}
                        </p>
                        </li>
                        <li class="list-show list-show1 fl">
                            <p class="lis_p ellipsis">
                                验证时间：{{auditetailsData.XeUserInfoEntity.verifyTime, 'ms' | millisecondFormat}}
                            </p>
                        </li>
                        <li class="list-show list-show1 fl">
                            <p class="lis_p ellipsis">
                                验证人：{{auditetailsData.XeUserInfoEntity.verifyUser}}
                            </p>
                        </li>
                        <li class="list-show list-show1 fl" >
                            <p class="lis_p ellipsis">
                                注册时间：{{auditetailsData.XeUserInfoEntity.createDate, 'ms' | millisecondFormat}}
                        </p>
                        </li>
                    </ul>
                </div>
            </div>
            <!--收货地址-->
			<div class="for-itemlis">
			  <div class="item-head clearfix">
			      <div class="fl item-tit">收货地址</div>
			  </div>
			  <div class="item-main-box">
			        <div class="detial-lis" v-for="(item, index) in auditetailsData.XeUserInfoEntity.xeUserAddressEntityList">
			        	<span>{{item.proviceName}}</span>
			        	<span>{{item.cityName}}</span>
			        	<span>{{item.areaName}}</span>
			        	<span>{{item.caStreet}}</span>
			        	<span class="s-blue" v-if="item.defAddr === 1">【默认】</span>
		        	</div>
                    <div v-show="length === 0">暂无数据</div>
			  </div>
			</div>
            <!--button提交按钮-->
            <div class="form_sub_btn1">
                <el-button class="xe-button-normal" type="primary" @click="goBack">返回</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import permission from 'mixins/permission.js';
export default {
    mixins: [permission],
    data() {
        return {
            permissionObj: {},
            auditetailsData: {
                XeUserInfoEntity: {}
            },
            length: 0
        };
    },
    created() {
        this.auditDetailsCk();
    },
    methods: {
        auditDetailsCk() {
            let userId = this.$route.query.userId;
            if (userId) {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/userinfo/userInfoDetail',
                    data: {
                        userId: userId
                    }
                }).then((res) => {
                    console.log('res---->', res);
                    if (res.data) {
                        this.auditetailsData = res.data;
                        this.length = res.data.XeUserInfoEntity.xeUserAddressEntityList.length;
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
