<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
        	<el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                <el-form-item prop="proName">
                    <el-input size="small" v-model="formInline.proName" placeholder="输入商品名称 / 货号查询"></el-input>
                </el-form-item>
                <el-form-item prop="cateIdArray">
                    <categoryTag v-model='cateIdArray' :width='170' :changeOnSelect="true" :filterable="true"></categoryTag>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit('formInline')">
                        查询
                    </el-button>
                    <el-button class="xe-button-normal"  @click="resetForm('formInline')">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button @click="addNewpro">
                <span class="iconfont icon-xinzeng"></span> 新增系统商品
            </el-button>
            <el-button @click="allDelete">
                <span class="iconfont icon-shanchu"></span> 删除
            </el-button>
            <!--<el-button>-->
                <!--<span class="iconfont icon-daochu"></span> 导出-->
            <!--</el-button>-->
        </div>
        <div class="goodsTable">
            <el-table
                :data="tableData"
                border
                v-loading="tableDataLoading"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40" class-name="selectionTd" fixed="left">
                </el-table-column>
                <el-table-column label="商品图片" min-width="40">
                    <template scope="props">
                        <div class="z-imgbox">
                            <img :src='props.row.proMainImg' alt="" width="60" height="60">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" min-width="120" prop="proName">
                </el-table-column>
                <el-table-column label="商品分类" min-width="120" prop="cateName">
                </el-table-column>
                <el-table-column label="属性类型" min-width="120" prop="typeName" >
                </el-table-column>
                <el-table-column label="操作" min-width="60" fixed="right">
                    <template scope="props">
                        <div class="btn-in-table">
                            <a href="javascript:;" class="s-blue" @click="editBtn(props.row)">修改</a>
                            <a href="javascript:;" class="s-blue" @click="deletBtn(props.row)">删除</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="xe-pagination-panel">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagelist.currPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pagelist.pageSize"
                layout="total, prev, pager, next, sizes, jumper"
                :total="pagelist.total">
            </el-pagination>
        </div>
        <!--新增弹框-->
        <div class="reset-dialog reset-dialog01">
            <el-dialog title="新增系统商品" :visible.sync="dialogVisible">
                <sys-addnew @selectGo="selectGo" :dialogVisible = 'dialogVisible'></sys-addnew>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import sysAddnew from './sysAddnew';
    import categoryTag from '@/components/category/category';
    export default {
        data() {
            return {
                dialogVisible: false,
                cateIdArray: null,
                formInline: {
                    proName: null,
                    cateId: ''
                },
                tableDataLoading: false,
                tableData: [],
                pagelist: {
                    currPage: 1,
                    pageSize: 10,
                    total: 0
                },
                addlist: 0,
                selectcontent: []
            };
        },
        created() {
            this.enquiryForm();
        },
        methods: {
            selectGo() {
                this.enquiryForm();
                this.dialogVisible = false;
            },
            handleSelectionChange(val) {
                this.selectcontent = val;
                console.log('---->>>', val);
            },
            addNewpro() {
                this.dialogVisible = true;
            },
            enquiryForm() {
                let params = {};
                this.tableDataLoading = true;
                params = this.formInline;
                if (this.cateIdArray) {
                    let cateId = this.cateIdArray;
                    params.cateId = cateId.slice(cateId.length - 1, cateId.length).join(',');
                }
                params.pageNum = this.pagelist.currPage;
                params.pageSize = this.pagelist.pageSize;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/sysprospu/getSysProSpuList',
                    data: params
                }).then((res) => {
                    console.log('--6666--!!>', res);
                    this.pagelist.total = res.data.pageInfo.total;
                    this.tableData = res.data.sysProSpuList;
                    if (res.data.picServer) {
                        let picServer = res.data.picServer;
                        for (let i in this.tableData) {
                            this.tableData[i].proMainImg = picServer + this.tableData[i].proMainImg;
                        }
                    }
                    this.tableDataLoading = false;
                }).catch((error) => {
                    console.log(error);
                    this.tableDataLoading = false;
                });
            },
            onSubmit() {
                this.enquiryForm();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.cateIdArray = [];
                this.enquiryForm();
            },
            editBtn(row) {
                this.$router.push({name: 'editorsys', params: {type: 'edit', proSpu: row.proSpu}});
            },
            deletBtn(row) {
                this.$confirm(`确定要删除${row.proName}商品么？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deletPro(row.proSpu);
                }).catch(() => {
                });
            },
            allDelete() { // 多选添加
                if (this.selectcontent.length > 0) {
                    this.$confirm(`确定要批量删除商品么？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deletPro();
                    }).catch(() => {
                    });
                } else {
                    this.$alert('请勾选需要批量删除的商品', {
                        type: 'info'
                    });
                }
            },
            deletPro(proSpu) {
                let _this = this;
                let params = {};
                let selectArray = [];
                for (let i in this.selectcontent) {
                    selectArray.push(this.selectcontent[i].proSpu);
                }
                if (proSpu) {
                    let array = [];
                    array.push(proSpu);
                    params.proSpus = array;
                } else {
                    params.proSpus = selectArray;
                }
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/sysprospu/deleteByPrimaryKey',
                    data: params
                }).then((res) => {
                    console.log('--删除商品--!!>', res);
                    window.$wxeMessage({
                        type: 'success',
                        message: '删除商品成功!'
                    });
                    this.tableData = [];
                    setTimeout(function() {
                        _this.enquiryForm();
                    }, 300);
                    this.selectcontent = [];
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSizeChange(val) {
                this.pagelist.pageSize = val;
                this.enquiryForm();
            },
            handleCurrentChange(val) {
                if (val > 0) {
                    this.pagelist.currPage = val;
                    this.enquiryForm();
                }
            }
        },
        components: {
            sysAddnew,
            categoryTag
        }
    };
</script>
