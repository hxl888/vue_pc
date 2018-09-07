<template lang="html">
    <div class="m-router-con recycleBin">
        <div class="u-top-search">
            <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                <el-form-item prop="nameNum">
                    <el-input size="small" v-model="formInline.nameNum" placeholder="输入商品名称／货号查询"></el-input>
                </el-form-item><el-form-item prop="cateIds" class="z-mr30">
                    <categoryTag v-model='formInline.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
                </el-form-item><el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('formInline')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="deleteLot"><i class="iconfont icon-shanchu"></i> 删除</el-button>
        </div>
        <el-table
                ref="multipleTable"
                :data="list"
                border tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="34" class-name="selectionTd"></el-table-column>
            <el-table-column label="商品图片" width="100">
                 <template scope="scope" class="imgs">
                      <div class="q-img">
                          <img :src="picServer + scope.row.skuList[0].proMainImg" alt="商品图片" width="60" height="60" class="imgs">
                       </div>
                 </template>
            </el-table-column>
            <el-table-column prop="proName" label="商品名称" width="360"></el-table-column>
            <el-table-column prop="categoryName" label="商品分类" width=""></el-table-column>
            <el-table-column prop="frozenFlag" label="是否冻品" width="85">
                <template scope="scope">
                    {{scope.row.frozenFlag | frozenFn}}
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作">
                <template scope="scope">
                    <el-button class="xe-button-normal" type="text" @click="editSpu(scope.row)">编辑</el-button>
                    <!--<el-button class="xe-button-normal" type="text" @click="delete">删除</el-button>-->
                    <el-button class="xe-button-normal" type="text" @click="deleteBtn(scope.row)">删除</el-button>
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
import {frozenFlag} from '@/dataControl.js';
import categoryTag from 'components/category/category';
export default {
    data() {
        return {
            multipleSelection: [],
            picServer: '',
            pageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            formInline: {
                nameNum: '',
                cateId: '',
                cateIds: []
            },
            list: [],
            table: {
                image: '',
                name: '',
                classify: '',
                brand: '',
                operation: ''
            }
        };
    },
    created() {
        this.creatInf(1, this.formInline);
    },
    methods: {
        onSubmit() {
            console.log('submit!');
            this.creatInf(1, this.formInline);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) { // 分页
            this.pageInfo.pageSize = val;
            this.creatInf(this.pageInfo.pageNum, this.formInline);
        },
        handleCurrentChange(val) { // 分页
            this.pageInfo.pageNum = val;
            this.creatInf(this.pageInfo.pageNum, this.formInline);
        },
        deleteLot() {
            const _this = this;
            if (this.multipleSelection.length === 0) {
                this.$xeMessage.warning('请选择');
                return;
            }
            const proSpusArr = [];
            for (var i = 0; i < _this.multipleSelection.length; i++) {
                let value = _this.multipleSelection[i];
                proSpusArr.push({proSpu: value.proSpu});
            };
            this.$confirm('确定删除选中的商品信息？是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proList/deleteVenProBatchFromDraft',
                    data: {
                        spuArray: proSpusArr
                    }
                }).then((res) => {
                    console.log(res);
                    setTimeout(function () {
                        _this.creatInf(_this.pageInfo.pageNum, _this.formInline);
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        },
        deleteBtn(val) {
            let _this = this;
            let deleteArr = [];
            console.log(val);
            deleteArr.push({proSpu: val.proSpu});
            console.log(deleteArr);
            this.$confirm('确定要对该信息进行删除操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proList/deleteVenProBatchFromDraft',
                    data: {
                        spuArray: deleteArr
                    }
                }).then((res) => {
                    console.log(res);
                    setTimeout(function () {
                        _this.creatInf(_this.pageInfo.pageNum, _this.formInline);
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((error) => {
                console.log(error);
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        creatInf(pageNum, formData) {
            let data = {};
            data = formData;
            data.pageNum = pageNum;
            data.pageSize = this.pageInfo.pageSize;
            data.cateId = this.cateId;
            this.$http({ // 查询草稿箱商品
                method: 'post',
                url: '/xe-route/xe-pro/ven/proList/listDraftPro',
                data: data
            }).then((res) => {
                this.list = res.data.list;
                this.pageInfo = res.data.pageInfo;
                this.picServer = res.data.picServer;
            }).catch((error) => {
                console.log('====>', error);
            });
        },
        editSpu(row) {
            console.log(row);
            this.$router.push({name: 'proReleaseEditor', params: {'type': 'draft', 'proSpu': row.proSpu}});
        }
    },
    filters: {
        frozenFn(val) {
            for (var i = 0; i < frozenFlag.length; i++) {
                if (frozenFlag[i].value === val) {
                    return frozenFlag[i].name;
                }
            }
        }
    },
    computed: {
        cateId() {
            if (this.formInline.cateIds.length > 0) {
                return this.formInline.cateIds[this.formInline.cateIds.length - 1];
            } else {
                return '';
            }
        }
    },
    components: {
        categoryTag
    }
};
</script>
<style lang="scss">
</style>
