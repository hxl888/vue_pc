<template lang="html">
    <div class="buyerInformation resetForm">
         <el-form :inline="true" :model="buyerInformations" ref="buyerInformations">
                <div>
                    <el-form-item label="客户名称" prop="">
                        <el-input placeholder="请输入客户名称" class="xe-input-smal300_hei30"></el-input>
                    </el-form-item>
                    <el-form-item label="客户账号" prop="">
                        <el-input placeholder="请输入客户账号" class="xe-input-smal300_hei30"></el-input>
                    </el-form-item>
               </div>
               <div>
                    <el-form-item label="收货人姓名" prop="">
                        <el-input placeholder="请输入收货人姓名" class="xe-input-smal300_hei30"></el-input>
                    </el-form-item>
                    <el-form-item label="收货人手机" prop="">
                        <el-input placeholder="请输入收货人手机" class="xe-input-smal300_hei30"></el-input>
                    </el-form-item>
               </div>
               <div>
                    <el-form-item label="邮政编码" prop="">
                        <el-input placeholder="请输入邮政编码" class="xe-input-smal300_hei30"></el-input>
                    </el-form-item>
                    <el-form-item label="发票抬头" prop="">
                        <el-input placeholder="请输入发票抬头" class="xe-input-smal300_hei30"></el-input>
                    </el-form-item>
               </div>
               <div>
                    <el-form-item label="业务员姓名" prop="">
                        <el-input placeholder="请输入业务员姓名" class="xe-input-smal300_hei30"></el-input>
                    </el-form-item>
                    <el-form-item label="业务员手机" prop="">
                        <el-input placeholder="请输入业务员手机" class="xe-input-smal300_hei30"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="收货店铺" prop="">
                        <el-input placeholder="请输入商户开户支行名称" class="xe-input-smal300_hei30"></el-input>
                    </el-form-item>
                    <el-form-item label="收货地址" prop="">
                        <el-cascader class="xe-input-smal300_hei30"
                            :options="options"
                            v-model="buyerInformations.selectedOptions"
                            @change="handleChange">
                        </el-cascader>
                    </el-form-item>
               </div>
               <div>
                    <el-form-item label="" prop=""  class="special_item">
                        <el-input placeholder="请输入详细地址" class="xe-input-smal300_hei30"></el-input>
                    </el-form-item>
               </div>
         </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                buyerInformations: {},
                options: [
                    {
                        value: 'zhinan',
                        label: '指南',
                        children: [{
                            value: 'shejiyuanze',
                            label: '设计原则',
                            children: [{
                                value: 'yizhi',
                                label: '一致'
                            }, {
                                value: 'fankui',
                                label: '反馈'
                            }, {
                                value: 'xiaolv',
                                label: '效率'
                            }, {
                                value: 'kekong',
                                label: '可控'
                            }]
                        },
                        {
                            value: 'daohang',
                            label: '导航',
                            children: [{
                                value: 'cexiangdaohang',
                                label: '侧向导航'
                            }, {
                                value: 'dingbudaohang',
                                label: '顶部导航'
                            }]
                        }]
                    }
                ]
            };
        },
        methods: {
            handleChange() {}
        }
    };
</script>

<style lang="scss">
</style>
