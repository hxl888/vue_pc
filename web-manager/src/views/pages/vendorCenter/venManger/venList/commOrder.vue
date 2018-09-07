<template lang="html">
    <div class="m-router-con recycleBin">
        <div class="u-top-search">
            <el-form ref="form" :model="form" :inline='true'>
                <el-form-item>
                    <el-input size="small" placeholder="订单编号" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input size="small" placeholder="请输入商品名称" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="">查询</el-button>
                    <el-button class="xe-button-normal">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="zq-order">
            <p>
                <span>订单总数：10单</span>
                <span>订单总金额：¥13874902.00</span>
                <span>客单价：¥138.00</span>
                <span>平均单金额：¥138.00</span>
            </p>
        </div>
        <el-table class="" ref="multipleTable" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <!--<el-table-column type="selection" width="55"></el-table-column>-->
            <el-table-column prop="name" label="商户名称" style="text-align:center"></el-table-column>
            <el-table-column prop="name" label="订单编号"></el-table-column>
            <el-table-column prop="classify" label="订单状态" width="136"></el-table-column>
            <el-table-column prop="classify" label="下单时间"></el-table-column>
            <el-table-column prop="classify" label="商品名称" width="310"></el-table-column>
            <el-table-column prop="brand" label="订单总金额" width="156"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData3: [{
                image: 'http://www.aidongwu.net/wp-content/uploads/2015/06/25-.jpg',
                name: '测试商品1',
                classify: '生鲜肉类',
                brand: '六合',
                operation: ''
            }, {
                image: 'http://www.aidongwu.net/wp-content/uploads/2015/06/25-.jpg',
                name: '测试商品1',
                classify: '生鲜肉类',
                brand: '六合',
                operation: ''
            }, {
                image: 'http://www.aidongwu.net/wp-content/uploads/2015/06/25-.jpg',
                name: '测试商品1',
                classify: '生鲜肉类',
                brand: '六合',
                operation: ''
            }],
            form: {
                input: ''
            },
            table: {
                image: '',
                name: '',
                classify: '',
                brand: '',
                operation: ''
            }
        };
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
};
</script>
