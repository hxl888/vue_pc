<template lang="html">
    <div>
         <div class="for-itemlis" v-if="buyerInfor">
            <div class="item-main-box martop10">
                <ul class="clearfix">
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商户名称：{{buyerInfor.venName}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商户状态：{{buyerInfor.freezeStatus | freezeStatusfilter}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">店铺名称：{{buyerInfor.shopName}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">企业类型：{{buyerInfor.venProperties | venPropertiesfiter}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">销售区域：{{buyerInfor.areaName}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">主营类型：{{buyerInfor.businessTypeName}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">运营模式：{{buyerInfor.autoOperationFlag | autoOperationFlagfiter}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商户性质：{{buyerInfor.venType | venTypefiter}}</p></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['buyerInfor'],
        data() {
            return {
            };
        }
    };
</script>
