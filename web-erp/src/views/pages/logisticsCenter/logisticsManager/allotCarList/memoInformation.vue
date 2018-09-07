<template lang="html">
    <div class="buyerInformation resetForm orderListSup">
         <el-form :model="memoInfor" ref="memoInfor" label-width="72px">
                <el-form-item label="买家备注：" prop="">
                    <div class="list-infor">
                        <span v-if="memoInfor">
                            {{memoInfor.orderRemark | noneToText}}
                        </span>
                        <span v-else>
                            无
                        </span>   
                    </div>
                </el-form-item>
                <el-form-item label="卖家备注：" prop="">
                    <div class="list-infor">
                        <span v-if="memoInfor">
                            {{memoInfor.vendorRemark | noneToText}}
                        </span>
                        <span v-else>
                            无
                        </span>   
                    </div>
                </el-form-item>
                <el-form-item label="系统备注：" prop="">
                    <div class="list-infor">
                        <span v-if="memoInfor">
                            {{memoInfor.systemRemark | noneToText}}
                        </span>
                        <span v-else>
                            无
                        </span>   
                    </div>
                </el-form-item>
                <el-form-item label="物流备注：" prop="" class="no-marbot">
                    <div class="list-infor">
                        <span v-if="memoInfor">
                            {{memoInfor.remark | noneToText}}
                        </span>
                        <span v-else>
                            无
                        </span>   
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
            };
        }
    };
</script>
<style lang="scss">
    .orderListSup .list-infor{
        line-height: 32px;
    }
</style>
