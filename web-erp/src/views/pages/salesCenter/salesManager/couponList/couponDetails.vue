<template lang="html">
    <div class="m-router-con">
        <!--优惠券基本信息-->
        <div class="contentDetails-Box" v-if="renderFlag" v-loading="loading" element-loading-text="拼命加载中...">
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">优惠券基本信息</div>
                </div>
                <div class="details-content">
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">优惠券名称：</div>
                        <div class="fl detai_list ellipsis">{{templet.couName}}</div>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">使用位置：</div>
                        <div class="fl detai_list ellipsis">{{templet.usePlat | usePlatToText}}</div>
                    </div>
                    <div class="detalls_flr clearfix detalls_flr_spec">
                        <div class="fl detai_label">使用区域：</div>
                        <ul class="fl addres_lis">
                            <li class="lis_flr" v-for="item in templet.useAreaName.split(' ')">{{item}}</li>
                        </ul>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">商品范围：</div>
                        <div class="fl detai_list ellipsis">{{templet.useRange | useRangeToText}}</div>
                        <div style="margin-left: 108px; margin-bottom: 5px;" v-if="templet.useRange === 3 && templet.couponProList.length">
                            <el-table
                                ref="multipleTable"
                                :data="templet.couponProList"
                                border
                                tooltip-effect="dark"
                                style="width: 100%">
                                <el-table-column
                                    class-name="td-index"
                                    label=""
                                    fixed
                                    width="35">
                                    <template scope="props">
                                        <span>{{props.$index + 1}}</span>
                                    </template>
                                </el-table-column>
                                <!--<el-table-column label="商品图" width="116">-->
                                <!--<template scope="scope">-->
                                <!--<img :src="picServer + scope.row.proMainImg" style="width: 80px; height: 80px; vertical-align: top;" alt="">-->
                                <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column prop="proSku" label="SKU编码" width="140"></el-table-column>-->
                                <el-table-column prop="proName" label="商品名称" min-width="130"></el-table-column>
                                <el-table-column prop="proNum" label="商品货号" width="120"></el-table-column>
                                <el-table-column prop="cateName" label="商品分类" min-width="130"></el-table-column>
                                <el-table-column label="计量方式" width="90">
                                    <template scope="scope">
                                        {{scope.row.pricingType | pricingTypeToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="proUnit" label="单位" width="85"></el-table-column>
                                <el-table-column label="规格" width="120">
                                    <template scope="scope">
                                        {{scope.row.proSpec ? scope.row.proSpec : '无'}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="成本价" width="85">
                                    <template scope="scope">
                                        <template v-if="scope.row.costPrice">
                                            {{scope.row.costPrice | numberToFixed2}}
                                        </template>
                                        <template v-else>无</template>
                                    </template>
                                </el-table-column>
                                <el-table-column label="销售价格" width="85">
                                    <template scope="scope">
                                        {{scope.row.skuPrice | numberToFixed2}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="clearfix" style="clear: both; margin-left: 108px; margin-bottom: 5px;">
                            <ul class="fl addres_lis" v-if="templet.useRange === 2">
                                <li class="lis_flr" v-for="item in templet.userCateName.split(' ')">{{item}}</li>
                            </ul>
                        </div>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">优惠券有效时间：</div>
                        <div class="fl detai_list ellipsis">
                            <template v-if="templet.useTimeType === 1">
                                固定时间段 {{templet.activeTimeStart}} 至 {{templet.activeTimeEnd}} 内有效
                            </template>
                            <template v-else>
                                固定天数 优惠券到账后 {{templet.activeDay}} 天内有效
                            </template>
                        </div>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">优惠规则：</div>
                        <div class="fl detai_list ellipsis">
                            <template v-if="templet.useRuleType === 1">
                                订单商品金额满 {{templet.useOrderAmount | numberToFixed2}} 减 {{templet.useDisAmount | numberToFixed2}} 元
                            </template>
                            <template v-else>
                                无门槛优惠减免 {{templet.useDisAmount | numberToFixed2}} 元
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">优惠券发放规则</div>
                </div>
                <div class="details-content">
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">发放方式：</div>
                        <div class="fl detai_list ellipsis">{{templet.sendType | sendTypeToText}}</div>
                    </div>
                    <div class="detalls_flr clearfix" v-if="templet.sendType !== 3">
                        <div class="fl detai_label">发放时间：</div>
                        <div class="fl detai_list ellipsis">
                            {{templet.sendTimeStart}} 至
                            <template v-if="$route.params.type !== 'edit'">
                                {{templet.sendTimeEnd}}
                            </template>
                            <template v-else>
                                <el-date-picker
                                    size="small"
                                    v-model="value1"
                                    type="datetime"
                                    :picker-options="pickerOptions"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </template>
                        </div>
                    </div>
                    <div class="detalls_flr clearfix" v-if="templet.sendType !== 3">
                        <div class="fl detai_label">发行数量：</div>
                        <div class="fl detai_list ellipsis">
                            <template v-if="$route.params.type !== 'edit'">
                                {{templet.sendNum}} 张
                            </template>
                            <template v-else>
                                <el-input size="small" v-model.number="sendNum" @input.native="sendNum = parseInt($event.target.value) > 0 ? sendNum = parseInt($event.target.value) : ''" :maxlength='4' style="width: 80px;"></el-input> 张
                            </template>
                        </div>
                    </div>
                    <div class="detalls_flr clearfix" v-if="templet.sendType === 1">
                        <div class="fl detai_label">每人限领：</div>
                        <div class="fl detai_list ellipsis">{{templet.sendLimitNum}}张</div>
                    </div>
                    <div class="detalls_flr clearfix" v-if="templet.sendType === 2">
                        <div class="fl detai_label">发放条件：</div>
                        <div class="fl detai_list ellipsis">客户在店铺内购物满 {{templet.sendOrderAmount | numberToFixed2}} 元发放优惠券</div>
                    </div>
                    <div class="detalls_flr clearfix" v-if="templet.sendType === 3">
                        <div class="fl detai_label">向每位用户发放：</div>
                        <div class="fl detai_list ellipsis">{{templet.sendEveryNum}} 张优惠券</div>
                        <div class="detalTabl_user">
                            <el-table :data="templet.loginAccountList" border v-if="templet.loginAccountList.length">
                                <el-table-column class="serial" width="50">
                                    <template scope="scope">
                                        {{scope.$index+1}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="" label="手机号">
                                    <template scope="scope">
                                        <div class="">{{scope.row}}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <el-button  v-if="templet.sendType !== 3 && couTempType === 'edit'" @click="updateTemplt()" type="primary" v-loading="saveloading">保存修改</el-button>
                <el-button  @click="back()" class="back">返回</el-button>
            </footer>
        </div>
    </div>
</template>

<script>
    import {millisecondFormat} from 'utils';
    let sendTimeEnd = null;
    export default {
        data() {
            return {
                loading: false,
                saveloading: false,
                renderFlag: false,
                templet: {},
                value1: '',
                sendNum: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < new Date(sendTimeEnd).getTime();
                    }
                }
            };
        },
        created() {
            this.getCoupTempletById();
        },
        methods: {
            getCoupTempletById() {
                this.loading = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/coupon/coupTemplet/getCoupTempletById',
                    data: {
                        couTempId: this.couTempId
                    }
                }).then(res => {
                    console.log(res);
                    this.loading = false;
                    this.templet = res.data.templet;
                    this.renderFlag = true;
                    this.value1 = this.timeValue;
                    sendTimeEnd = this.templet.sendTimeEnd;
                    this.sendNum = this.templet.sendNum;
                }).catch(error => {
                    this.loading = false;
                    console.log(error);
                });
            },
            updateTemplt() {
                this.saveLoading = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/coupon/coupTemplet/updateTempltById',
                    data: {
                        couTempId: this.couTempId,
                        sendTimeEnd: millisecondFormat(new Date(this.value1).getTime(), 'ms'),
                        sendNum: this.sendNum
                    }
                }).then(res => {
                    console.log(res);
                    this.loading = false;
                    this.$xeMessage.success('优惠券修改成功！');
                    this.back();
                }).catch(error => {
                    console.log(error);
                    this.loading = false;
                });
            },
            back() {
                this.$router.go(-1);
            }
        },
        computed: {
            couTempId() {
                return this.$route.params.couTempId;
            },
            couTempType() {
                return this.$route.params.type;
            },
            timeValue() {
                return new Date(this.templet.sendTimeEnd);
            }
        }
    };
</script>

<style lang="scss">
</style>
