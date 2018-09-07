<template lang="html">
    <div class="recycleBin m-router-con">
    <!-- {{formData}} -->
        <div class="u-top-search">
            <el-form ref="formData" :model="formData" :inline="true" class="demo-form-inline">
                <el-form-item prop='typeName' class="z-mr30">
                    <el-input
                        placeholder="输入属性类型查询"
                        :maxlength="20"
                        v-model="formData.typeName">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="search">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('formData')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="linktoAdd"><i class="iconfont icon-xinzeng"></i> 新增扩展类型</el-button>
            <el-button class="xe-button-normal" @click="deletlot"><i class="iconfont icon-shanchu"></i> 批量删除</el-button>
        </div>
        <el-table
            ref="multipleTable"
            :data="listProType"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="34" class-name="selectionTd"></el-table-column>
            <el-table-column prop="typeName" label="属性类型" width="214"></el-table-column>
            <el-table-column prop="propertyNameValue" label="属性名称" width="">
                <template scope="scope">
                      <div>
                            {{scope.row.propertyNameValue ? scope.row.propertyNameValue : '无'}}
                       </div>
                 </template>
            </el-table-column>
            <el-table-column prop="specNameValue" label="规格名称" width="200">
                <template scope="scope">
                    <div>
                        {{scope.row.specNameValue ? scope.row.specNameValue : '无'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="150">
                <template scope="scope">
                    <el-button class="xe-button-normal" type="text" @click="linktoEdit(scope.row)">编辑</el-button>
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
export default {
    name: 'extendedAttrsIndex',
    data() {
        return {
            multipleSelection: [],
            listProType: [],
            dialogVisible: false,
            formData: {
                typeName: ''
            },
            pageInfo: {
                pageNum: 1,
                total: 0,
                pageSize: 10
            }
        };
    },
    created() {
        this.creatInf(this.pageInfo.pageNum, this.formData);
    },
    methods: {
        search() {
            this.creatInf(1, this.formData);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.creatInf(this.pageInfo.pageNum, this.formData);
        },
        handleCurrentChange(val) {
            this.pageInfo.pageNum = val;
            this.creatInf(this.pageInfo.pageNum, this.formData);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        linktoEdit(val) {
            this.$router.push({name: 'basesettingseditproperties', query: {typeId: val.typeId}});
        },
        linktoAdd(val) {
            this.$router.push({name: 'basesettingsnewproperties'});
        },
        delet(param) {
            var _this = this;
            this.$http({ // 删除商品属性 xe-route/xe-pro/
                method: 'post',
                url: '/xe-route/xe-pro/product/type/deleteType',
                data: {
                    typeIds: param
                }
            }).then((res) => {
                if (res.status === '0000') {
                    this.$xeMessage.success(res.msg);
                    setTimeout(function () {
                        _this.creatInf(_this.pageInfo.pageNum, _this.formData);
                    }, 300);
                }
            }).catch((error) => {
                if (error.status === '0001') {
                    this.$xeMessage.warning(error.msg);
                }
            });
        },
        deletSingle(row) {
            this.$confirm('确定删除该条商品属性, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delet([row.typeId]);
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        deletlot() {
            const _this = this;
            if (this.multipleSelection.length === 0) {
                this.$xeMessage.warning('请选择');
                return;
            }
            const typeIdsArr = [];
            _this.multipleSelection.forEach(function(value) {
                typeIdsArr.push(value.typeId);
            });
            this.$confirm('确定删除选中的商品属性, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delet(typeIdsArr);
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        creatInf(pageNum, formData) {
            let data = {};
            data = formData;
            data.pageNum = pageNum;
            data.pageSize = this.pageInfo.pageSize;
            console.log(data);
            this.$http({ // 查询列表
                method: 'post',
                url: '/xe-route/xe-pro/product/type/listProType',
                data: data
            }).then((res) => {
                if (res.data) {
                    console.log(res.data);
                    this.listProType = res.data.listProType;
                    this.pageInfo = res.data.pageInfo;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }
};
</script>
