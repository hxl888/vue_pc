<template lang="html">
    <div class="buyerInformation resetForm">
         <el-form :model="memoInfor" v-if="memoInfor" ref="memoInfor" label-width="100px">
                <el-form-item label="卖家备注：" prop="">
                    <div class="list-infor">
                        {{memoInfor.vendorRemark}}
                    </div>
                </el-form-item>
                <el-form-item label="系统备注：" prop="">
                    <div class="list-infor">
                        {{memoInfor.systemRemark}}
                    </div>
                </el-form-item>
                <el-form-item label="其他备注：" prop="" class="no-marbot">
                    <div class="list-infor">
                        {{memoInfor.lockRemark}}
                    </div>
                </el-form-item>
                <el-form-item label="后台订单状态：" prop="">
                    <div class="list-infor">
                        {{memoInfor.erpOrderStatus | orderStatusfilter}}
                    </div>
                </el-form-item>
         </el-form>
    </div>
</template>

<script>
    export default {
        props: ['memoInfor'],
        data() {
            return {
                flag: true
            };
        }
    };
</script>
