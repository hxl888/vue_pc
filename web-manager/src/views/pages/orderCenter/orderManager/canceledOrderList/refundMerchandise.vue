<template lang="html">
    <div>
         <div class="for-itemlis">
            <div class="item-head clearfix">
                <div class="fl item-tit">订单详情</div>
            </div>
            <div class="item-main-box martop10">
                <ul class="clearfix">
                    <li class="list-show list-show1 fl">
                    <p class="lis_p ellipsis">标记：
                     <span class="signSp yelow" v-if="refundMer.orderMark && refundMer.orderMark.indexOf('2') !== -1">拆</span>
                     <span class="signSp lightGreen" v-if="refundMer.orderMark && refundMer.orderMark.indexOf('3') !== -1">特</span>
                     <span class="signSp lightpur" v-if="refundMer.orderMark && refundMer.orderMark.indexOf('4') !== -1">运</span>
                     <span class="signSp lightGrey" v-if="refundMer.orderMark && refundMer.orderMark.indexOf('1') !== -1">锁</span>
                     <span class="signSp lightred" v-if="refundMer.orderMark && refundMer.orderMark.indexOf('5') !== -1">缺</span>
                    </p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">订单编号：{{refundMer.orderId}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">关联订单：{{refundMer.parentOrderid}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">订单状态：{{refundMer.orderStatus | orderStatusfilter}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">订单生成方式：{{refundMer.orderAutoFlag | orderAutoFlagfilter}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">报价方式：{{refundMer.orderType | orderTypefiter}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">订单来源：{{refundMer.orderSource | orderSourcefilter}}</p></li>
                     <li class="list-show list-show1 fl"    v-if="refundMer.sourceId && refundMer.sourceId.length <= 30"><p class="lis_p ellipsis">唯一标识：{{refundMer.sourceId}}</p></li>
                    <el-tooltip class="item" effect="dark" placement="top"   v-if="refundMer.sourceId && refundMer.sourceId.length > 30">
                        <div slot="content">{{refundMer.sourceId}}</div>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">唯一标识：{{refundMer.sourceId}}</p></li>
                     </el-tooltip>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">下单IP：{{refundMer.ipAddr}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">下单时间：{{refundMer.createDate}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">取消时间：{{refundMer.cancelTime}}</p></li>
                     <!--<el-tooltip class="item" effect="dark" placement="top"   v-if="auditetailsData.venInfo.venSatatus == 3">-->
                        <!--<div slot="content">{{auditetailsData.venInfo.venRejectReason.substr(0, 50)}}<br/>{{auditetailsData.venInfo.venRejectReason.substr(50, 50)}}<br/>{{auditetailsData.venInfo.venRejectReason.substr(100, 50)}}<br/>{{auditetailsData.venInfo.venRejectReason.substr(150, 50)}}</div>-->
                        <!--<li class="list-show list-show1 fl"><p class="lis_p ellipsis">驳回理由：{{auditetailsData.venInfo.venRejectReason}}</p></li>-->
                     <!--</el-tooltip>-->
                </ul>
            </div>
        </div>
         <!--客户信息-->
        <div class="for-itemlis">
             <div class="item-head clearfix">
                <div class="fl item-tit">客户信息</div>
             </div>
             <div class="item-main-box">
                    <div class="detial-lis"><span class="labels"> 客户名称：</span>{{refundMer.userName}}</div>
                    <div class="detial-lis"><span class="labels"> 客户账号：</span>{{refundMer.loginAccount}}</div>
                    <div class="detial-lis"><span class="labels"> 收货人姓名：</span>{{refundMer.caConsignee}}</div>
                    <div class="detial-lis"><span class="labels"> 收货人手机：</span>{{refundMer.caPhone}}</div>
                    <div class="detial-lis"><span class="labels"> 收货地址：</span>{{refundMer.addrDetail}}</div>
                    <div class="detial-lis"><span class="labels"> 收货店铺：</span>{{refundMer.storeName}}</div>
                     <div class="detial-lis"><span class="labels">下单业务员：</span>{{refundMer.orderSalesmanName}}</div>
                    <div class="detial-lis"><span class="labels"> 下单业务员手机：</span>{{refundMer.phone}}</div>
                    <div class="detial-lis"><span class="labels"> 客户经理：</span>{{refundMer.salesmanName}}</div>
                    <div class="detial-lis"><span class="labels"> 客户经理电话：</span>{{refundMer.salesmanPhone}}</div>
             </div>
        </div>
         <!--发票信息-->
        <div class="for-itemlis">
             <div class="item-head clearfix">
                <div class="fl item-tit">发票信息</div>
             </div>
             <div class="item-main-box">
                    <div class="detial-lis"><span class="labels"> 发票抬头：</span>{{refundMer.taxCompany}}</div>
                    <div class="detial-lis"><span class="labels"> 税号：</span>{{refundMer.taxNum}}</div>
                    <div class="detial-lis"><span class="labels"> 开户银行：</span>{{refundMer.taxBankName}}</div>
                    <div class="detial-lis"><span class="labels"> 开户帐号：</span>{{refundMer.taxBankCardNum}}</div>
                    <div class="detial-lis"><span class="labels"> 公司地址：</span>{{refundMer.taxComAddr}}</div>
                    <div class="detial-lis"><span class="labels"> 公司电话：</span>{{refundMer.taxComPhone}}</div>
                    <div class="detial-lis"><span class="labels"> 发票内容：</span>{{refundMer.taxContent | taxContentfiter}}</div>
             </div>
        </div>
        <!--支付信息-->
        <div class="for-itemlis">
            <div class="item-head clearfix">
                <div class="fl item-tit">支付信息</div>
            </div>
            <div class="item-main-box martop10">
                <ul class="clearfix">
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">支付单号：{{refundMer.payNumber}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">支付状态：{{refundMer.payStatus | payStatusfilter}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">支付类型：{{refundMer.payType | payTypeOrderfiter}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">支付时间：{{refundMer.payTime}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">订单金额：<span v-if="refundMer.totalAmount">{{parseFloat(refundMer.totalAmount).toFixed(2)}}</span><span v-else>0</span></p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">商品总额：<span v-if="refundMer.goodsAmount">{{parseFloat(refundMer.goodsAmount).toFixed(2)}}</span><span v-else>0</span></p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">运费总额：<span v-if="refundMer.freAmount">{{parseFloat(refundMer.freAmount).toFixed(2)}}</span><span v-else>0</span></p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">优惠总额：<span v-if="refundMer.pmtAmount">{{parseFloat(refundMer.pmtAmount).toFixed(2)}}</span><span v-else>0</span></p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">特批优惠：<span v-if="refundMer.specialDisamount">{{parseFloat(refundMer.specialDisamount).toFixed(2)}}</span><span v-else>0</span></p></li>
                    <!--<li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">应付金额：<span v-if="refundMer.payable">{{parseFloat(refundMer.payable).toFixed(2)}}</span></p></li>-->
                    <!--<li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">应收金额：<span v-if="refundMer.receivable">{{parseFloat(refundMer.receivable).toFixed(2)}}</span></p></li>-->
                    <!--<li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">实付金额：<span v-if="refundMer.realPay">{{parseFloat(refundMer.realPay).toFixed(2)}}</span></p></li>-->
                    <!--<li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">实收金额：<span v-if="refundMer.realReceiv">{{parseFloat(refundMer.realReceiv).toFixed(2)}}</span></p></li>-->
                </ul>
            </div>
        </div>
        <!--买家备注-->
        <div class="for-itemlis">
             <div class="item-head clearfix">
                <div class="fl item-tit">买家备注</div>
             </div>
             <div class="item-main-box">
                    <div class="detial-lis"><span class="labels"> 买家备注：{{refundMer.orderRemark}}</span></div>
             </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['refundMer'],
        data() {
            return {
            };
        }
    };
</script>
