<template lang="html">
    <div class="buyerInformation resetForm">
         <el-form :inline="true" :model="buyerInfor"  ref="buyerInfor" label-width="85px">
                <div>
                    <el-form-item label="客户名称：" prop="">
                        <div class="list-infor">
                            <span  v-if="buyerInfor">{{buyerInfor.loginAccount}}</span>
                            <span v-else>无</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="客户账号：" prop="">
                        <div class="list-infor">
                            <span  v-if="buyerInfor">{{buyerInfor.loginAccount}}</span>
                            <span v-else>无</span>
                        </div>
                    </el-form-item>
               </div>
               <div>
                    <el-form-item label="收货人姓名：" prop="">
                        <div class="list-infor">
                            <span  v-if="buyerInfor">{{buyerInfor.caConsignee}}</span>
                            <span v-else>无</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="收货人手机：" prop="">
                        <div class="list-infor">
                            <span  v-if="buyerInfor">{{buyerInfor.caPhone}}</span>
                            <span v-else>无</span>
                        </div>
                    </el-form-item>
               </div>
               <div>
                    <el-form-item label="收货地址：" prop="receiptAddress">
                        <div class="list-infor">
                            <span  v-if="buyerInfor">{{buyerInfor.receiptAddress}}</span>
                            <span v-else>无</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="收货店铺：" prop="caStoreName">
                        <div class="list-infor">
                            <span  v-if="buyerInfor">{{buyerInfor.caStoreName}}{{buyerInfor.caStreet}}</span>
                            <span v-else>无</span>
                        </div>
                    </el-form-item>
               </div>
               <div>
                    <el-form-item label="配送方式：" prop="">
                        <div class="list-infor">
                            <span  v-if="buyerInfor">{{buyerInfor.shipType | shipTypeToText}}</span>
                            <span v-else>无</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="委托车辆：" prop="">
                        <div class="list-infor">
                            <span  v-if="buyerInfor">{{buyerInfor.shipCarDes}}</span>
                            <span v-else>无</span>
                        </div>
                    </el-form-item>
               </div>
               <div>
                    <!-- <el-form-item label="业务员姓名：" prop="">
                        <div class="list-infor">
                            <span  v-if="buyerInfor">{{buyerInfor.salesmanName | noneToText}}</span>
                        </div>
                    </el-form-item> -->
                    <el-form-item label="业务员手机：" prop="">
                        <div class="list-infor">
                            <span  v-if="buyerInfor">{{buyerInfor.salesmanPhone | noneToText}}</span>
                        </div>
                    </el-form-item>
                </div>
         </el-form>
    </div>
</template>

<script>
    export default {
        props: ['buyerInfor'],
        data() {
            return {};
        }
    };
</script>

<style lang="scss">
    .el-cascader.is-disabled .el-cascader__label {
        color: #687281;
    }
</style>
