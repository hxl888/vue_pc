<template lang="html">
    <div class="recycleBin m-router-con">
        <div class="u-top-search">
            <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
                <el-form-item prop="brandName" class="z-mr30">
                    <el-input size="small" v-model="form.brandName" placeholder="请输入品牌名称" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="search">查询</el-button>
                    </el-button><el-button class="xe-button-normal"  @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click.prevent='addNewBrand'><i class="iconfont icon-xinzeng"></i> 新增品牌</el-button>
            <el-button class="xe-button-normal" @click="deletlot"><i class="el-icon-delete2 el-icon-right"></i> 批量删除</el-button>
        </div>
        <el-table
                ref="multipleTable"
                :data="brandListData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="34" class-name="selectionTd"></el-table-column>
            <el-table-column prop="brandName" label="品牌名称" width="160"></el-table-column>
            <el-table-column label="品牌图片" width="100">
                <template scope="scope" class="imgs">
                    <div class="q-img">
                        <template v-if="!scope.row.brandLogo">无</template>
                        <img v-else :src="picServer + scope.row.brandLogo" alt="品牌logo" width="60" height="60" class="imgs">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="brandDesc" label="品牌描述"></el-table-column>
            <el-table-column prop="operation" width="150" label="操作">
                <template scope="scope">
                    <el-button class="xe-button-normal" type="text" @click="editSpu(scope.row)">编辑</el-button>
                    <el-button class="xe-button-normal" type="text" @click="deletSingle(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    <!--分页=======start-->
        <div class="page-showbox">
            <div class="xe-pagination-panel">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.pageNum"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageInfo.pageSize"
                    layout="total, prev, pager, next, sizes, jumper"
                    :total="pageInfo.total">
                </el-pagination>
            </div>
        </div>
      <!--分页=======end-->
    </div>
</template>
<script>
import brandListTable from './brandListTable';
export default {
    data() {
        return {
            multipleSelection: [],
            brandListData: [],
            brandListPageInfo: [],
            form: {
                brandName: ''
            },
            pageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            table: {
                image: '',
                name: '',
                classify: '',
                brand: '',
                operation: ''
            },
            picServer: ''
        };
    },
    created() {
        this.creatInf(1, this.form);
    },
    methods: {
        search() {
            this.creatInf(1, this.form);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.creatInf(this.pageInfo.pageNum, this.form);
        },
        handleCurrentChange(val) {
            this.pageInfo.pageNum = val;
            this.creatInf(this.pageInfo.pageNum, this.form);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        creatInf(pageNum, form) {
            let data = {};
            data = form;
            data.pageNum = pageNum;
            data.pageSize = this.pageInfo.pageSize;
            console.log(data);
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/product/brand/listProBrand',
                data: data
            }).then(res => {
                console.log(res);
                this.brandListData = res.data.listProBrand;
                this.brandListPageInfo = res.data.pageInfo;
                this.pageInfo = res.data.pageInfo;
                this.picServer = res.data.picServer;
            }).catch(error => {
                console.log(error);
            });
        },
        editSpu(row) {
            console.log(row);
            this.$router.push({name: 'editBrand', query: {brandId: row.brandId}});
        },
        delet(param) {
            var _this = this;
            this.$http({ // 删除品牌 xe-route/xe-pro/
                method: 'post',
                url: '/xe-route/xe-pro/product/brand/deleteProBrand',
                data: {
                    proBrands: param
                }
            }).then((res) => {
                if (res.status === '0000') {
                    this.$xeMessage.success(res.msg);
                    setTimeout(function () {
                        _this.creatInf(_this.pageInfo.pageNum, _this.form);
                    }, 300);
                }
            }).catch((error) => {
                if (error.status === '0001') {
                    this.$xeMessage.warning(error.msg);
                }
            });
        },
        deletSingle(row) { // 逐条删除
            this.$confirm('确认删除该品牌, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delet([row.brandId]);
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        deletlot() { // 批量删除
            const _this = this;
            if (this.multipleSelection.length === 0) {
                this.$xeMessage.warning('请选择');
                return;
            }
            const typeIdsArr = [];
            _this.multipleSelection.forEach(function(value) {
                typeIdsArr.push(value.brandId);
            });
            this.$confirm('确认删除多条品牌, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delet(typeIdsArr);
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        addNewBrand() {
            this.$router.push({
                name: 'addNewBrand'
            });
        }
    },
    components: {
        brandListTable
    }
};
</script>
