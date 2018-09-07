<style>
    .xe-pageHeader{
        height:34px;
        font-size:14px;
        margin:10px 0;
        border-bottom:1px solid #cacaca;
    }
    .xe-input-col2{
        width:252px;
    }
    .iconNone .el-input__icon{
        display:none;
    }
</style>
<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamRoleListPage' }">角色管理</el-breadcrumb-item>
                <el-breadcrumb-item>查看角色</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="roleForm"  ref="roleForm" label-width="100px">
            <div class="xe-page-header">
                <p>
                    查看角色
                </p>
            </div>
            <div>
                <el-form-item label="角色名称">
                    <el-input v-model="roleForm.roleName" class="xe-input-col3" :disabled = 'true'></el-input>
                </el-form-item>
                <el-form-item label="角色编码">
                    <el-input v-model="roleForm.roleCode" class="xe-input-col3" :disabled = 'true'></el-input>
                </el-form-item>
                <el-form-item label="角色说明">
                    <el-input v-model="roleForm.remark" class="xe-input-col3"  :disabled = 'true'></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="roleForm.systemId" filterable placeholder="请选择" :disabled = 'true' class="xe-input-col3 iconNone">
                        <el-option
                            v-for="item in roleTypeOption"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <!--<el-input v-model="roleForm.systemId" class="xe-input-col3" :disabled = 'true'></el-input>-->
                </el-form-item>
                <el-form-item>
                    <el-button @click="returnBefore">返 回</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                roleForm: this.$route.query,
                roleTypeOption: [{
                    value: '2000',
                    label: '伙伴'
                }, {
                    value: '3000',
                    label: '客户'
                }, {
                    value: '1000',
                    label: '运营'
                }]
            };
        },
        methods: {
            returnBefore() {
                this.$router.go(-1);
            }
        }
    };
</script>
