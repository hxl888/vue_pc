<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form ref="formsearch" :model="formsearch" :inline=true>
                <el-form-item prop="typeName">
                    <el-input size="small" v-model="formsearch.typeName" placeholder="输入属性类型查询" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item class="z-marL20">
                    <el-button class="xe-button-normal" type="primary" @click="queryTable">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('formsearch')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
                <el-button class="xe-button-normal" @click="addnewpro"><i class="iconfont icon-xinzeng"></i> 新增扩展类型</el-button>
                <el-button class="xe-button-normal" @click="batchDelete"><i class="iconfont icon-shanchu"></i> 批量删除</el-button>
        </div>
         <el-radio-group  v-model="radio" @change="radioChange" style="width: 100%">
             <el-table  :data="tableDatas" v-loading="tableDataLoading" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" min-width="45"></el-table-column>
                <el-table-column prop="typeName" label="属性类型" min-width="150"></el-table-column>
                <el-table-column prop="propertyNameValue" label="属性名称" min-width="150">
                     <template scope="scope">
                          <div>
                                {{scope.row.propertyNameValue ? scope.row.propertyNameValue : '无'}}
                           </div>
                     </template>
                </el-table-column>
                <el-table-column prop="specNameValue" label="规格名称" min-width="150">
                    <template scope="scope">
                        <div>
                            {{scope.row.specNameValue ? scope.row.specNameValue : '无'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="设为标准扩展属性" min-width="80">
                    <template scope="scope">
                        <div class="">
                             <el-radio class="radio label_nameOpa" :label="scope.$index" :key="scope.$index"></el-radio>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="100">
                    <template scope="scope">
                        <div  class="editor">
                            <el-button type="text" @click="modify(scope.row.typeId)" >修改</el-button>
                            <el-button type="text" v-if="scope.row.normalFlag !==1" @click="deleline(scope.row)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-radio-group>
    <!--分页=======start-->
        <div class="page-showbox">
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
        </div>
      <!--分页=======end-->
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableDatas: [],
            formsearch: {
                typeName: '',
                propertyName: '',
                specName: ''
            },
            tableDataLoading: false,
            pagelist: {
                currPage: 1,
                pageSize: 10,
                total: 0
            },
            radio: '',
            oldradio: '',
            postIdex: 0,
            selectconten: [],
            productUrl: '/xe-route/xe-mis',
//            productUrl: '',
            deleUrl: '/manager/type/deleteType'
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        setNormalFlag(typeId) {
            let params = {};
            params.typeId = typeId;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/type/setNormalFlag`,
                data: params
            }).then((res) => {
                if (res.data.remote.status !== '0000') {
                    window.$wxeMessage.error(res.data.remote.msg);
                } else {
                    window.$wxeMessage.success('设置标准属性成功');
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        queryTable() {
            this.enquiryForm();
        },
        enquiryForm() {
            let params = {};
            this.tableDataLoading = true;
            params = this.formsearch;
            params.pageNum = this.pagelist.currPage;
            params.pageSize = this.pagelist.pageSize;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/type/listProType`,
//                url: '/manager/type/listProType',
                data: params
            }).then((res) => {
                console.log('--666--!!>', res);
                this.pagelist.total = res.data.pageInfo.total;
                this.tableDatas = res.data.list;
                let flag = this.tableDatas.some(item => {
                    return item.normalFlag === 1;
                });
                if (flag) {
                    this.tableDatas.forEach((item, index) => {
                        if (item.normalFlag === 1) {
                            this.radio = index;
                            this.oldradio = index;
                        }
                    });
                } else {
                    this.radio = '';
                }
                this.tableDataLoading = false;
            }).catch((error) => {
                console.log(error);
                this.tableDataLoading = false;
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
        },
        handleSelectionChange(val) {
            this.selectconten = [];
            for (let i in val) {
                this.selectconten.push(val[i].typeId);
            }
        },
        addnewpro() {
            this.$router.push({name: 'addnewAttribute'});
        },
        modify(typeId) {
            this.$router.push({name: 'modifyAttribute', query: {typeId: typeId}});
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.enquiryForm();
        },
        remotePublic(ULR, tishi, line, ids) { // tishi（返回的接口回调的成功或者失败提示）
            let params = {};
            let _this = this;
            if (line) {
                let arry = [];
                arry.push(ids);
                params.typeIds = arry;
            } else {
                params.typeIds = this.selectconten;
            }
            this.$http({
                method: 'post',
                url: `${this.productUrl}${ULR}`,
                data: params
            }).then((res) => {
                console.log('-====->', res);
                this.selectedCollArray = [];
                this.tableDatas = [];
                setTimeout(function() {
                    _this.enquiryForm();
                }, 300);
                console.log('==删除成功====', this.tableDatas);
                window.$wxeMessage({
                    type: 'success',
                    message: `${tishi}成功!`
                });
            }).catch((error) => {
                console.log('--->', error);
            });
        },
        deleline(row) { // 单个删除
            console.log('row', row);
            this.$confirm(`确定要删除${row.typeName}么？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.remotePublic(this.deleUrl, '删除', 'line', row.typeId);
            }).catch(() => {
            });
        },
        batchDelete() {
            if (this.selectconten.length > 0) {
                this.$confirm(`确定要批量删除么？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.remotePublic(this.deleUrl, '批量删除');
                }).catch(() => {
                });
            } else {
                this.$alert(`请勾选需要批量删除的复选框`, {
                    type: 'info'
                });
            }
        },
        radioChange() {
            if (this.radio !== '' && this.radio !== this.oldradio) {
                this.setNormalFlag(this.tableDatas[this.radio].typeId);
            }
        }
    },
    watch: {
//        radio(n) {
//            if (n !== '') {
//                this.postIdex++;
//                console.log('f--->', this.postIdex);
//                if (this.postIdex > 1) {
//                    this.setNormalFlag(this.tableDatas[n].typeId);
//                }
//            }
//        }
    }
};
</script>
