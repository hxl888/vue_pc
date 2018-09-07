<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form ref="searchForm" :model="searchForm" :inline=true>
                <el-form-item prop="brandName">
                    <el-input v-model="searchForm.brandName" size="small" placeholder="请输入品牌名称" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item class="z-marL20">
                    <el-button class="xe-button-normal" type="primary" @click="querylist">查询</el-button>
                    <el-button  class="xe-button-normal"  @click="resetForm('searchForm')">重置</el-button>
                </el-form-item>
            </el-form>
         </div>
        <div class="u-opera-btnBox">
            <el-button @click="addnewbrands"><i class="iconfont icon-xinzeng"></i> 新增品牌</el-button>
            <el-button @click="batchDelete"><i class="iconfont icon-shanchu"></i> 批量删除</el-button>
        </div>
        <div>
            <el-table ref="tableDatas" v-loading="tableDataLoading" :data="tableDatas" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="brandName" label="商品名称" min-width="30"></el-table-column>
                <el-table-column label="品牌logo" width="100">
                     <template scope="scope" class="imgs">
                          <div class="q-img">
                              <template v-if="!scope.row.brandLogo">无</template>
                              <img v-else :src="scope.row.brandLogo" alt="品牌logo" width="65" height="65" class="imgs">
                           </div>
                     </template>
                </el-table-column>
                <el-table-column prop="brandDesc" label="品牌描述" ></el-table-column>
                <el-table-column prop="" label="操作" width="105" fixed="right">
                    <template scope="scope">
                        <div  class="btn-in-table">
                            <a class="s-blue" @click="modifyBrand(scope.row)">修改</a>
                            <a class="s-blue" @click="deleline(scope.row)">删除</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="xe-pagination-panel">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagelist.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pagelist.pageSize"
                layout="total, prev, pager, next, sizes, jumper"
                :total="pagelist.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import permission from 'mixins/permission.js';
export default {
    mixins: [permission],
    data() {
        return {
            permissionObj: {},
            tableDatas: [],
            tableDataLoading: false,
            searchForm: {
                brandName: ''
            },
            pagelist: {
                currPage: 1,
                pageSize: 10,
                total: 0
            },
            selectedCollection: [],
            selectedCollArray: [],
            butopa: false, // 操作项开关
            selectcontent: '',
            deleUrl: '/manager/brand/deleteProBrand.shtml',
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        querylist() {
            this.enquiryForm();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.enquiryForm();
        },
        handleSelectionChange(val) {
            this.selectedCollection = val;
            console.log('this.selectedCollection', this.selectedCollection);
        },
        addnewbrands () {
            this.$router.push({name: 'addNewbrand'});
        },
        modifyBrand(row) {
            this.$router.push({name: 'modifybrand', query: {brandId: row.brandId}});
        },
        enquiryForm() {
            let params = {};
            this.tableDataLoading = true;
            params = this.searchForm;
            params.pageNum = this.pagelist.currPage;
            params.pageSize = this.pagelist.pageSize;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/brand/listProBrand.shtml`,
                data: params
            }).then((res) => {
                console.log('----!!>', res);
                this.pagelist.total = res.data.pageInfo.total;
                this.tableDatas = res.data.list;
                if (res.data.picServer) {
                    let picUrl = res.data.picServer;
                    for (let i in this.tableDatas) {
                        this.tableDatas[i].brandLogo = picUrl + this.tableDatas[i].brandLogo;
                    }
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
        batchDeleteFun() {},
        // 操作项公共方法---------------------------
        confimrFun(title, sucesfun, errorfun) {
            this.$confirm(`${title}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                sucesfun && sucesfun();
            }).catch(() => {
                errorfun && errorfun();
            });
        },
        selectforeach(call, tishi) {
            let _this = this;
            _this.butopa = false;
            this.selectedCollArray = [];
            console.log('selectedCollection', this.selectedCollection.length);
            if (this.selectedCollection.length > 0) {
                this.confimrFun(`确定要对商户进行${tishi}？`, () => {
                    console.log('确定点击');
                    let list = this.selectedCollection;
                    for (let i in list) {
                        this.selectedCollArray.push(list[i].brandId);
                        _this.butopa = true;
                    }
                    if (_this.butopa) {
                        call && call();
                        console.log('9999_this.butopa', this.butopa);
                    } else {
                        this.$alert('请选择要删除的列表', {
                            type: 'info'
                        });
                        this.selectedCollArray = [];
                    }
                }, () => {
                    console.log('取消点击');
                });
            } else {
                this.$alert(`请勾选需要${tishi}的复选框`, {
                    type: 'info'
                });
            }
        },
        remotePublic(ULR, tishi, line, ids) { // tishi（返回的接口回调的成功或者失败提示）
            let _this = this;
            let params = {};
            params.proBrands = this.selectedCollArray;
            if (line) {
                let arry = [];
                arry.push(ids);
                params.proBrands = arry;
            }
            this.$http({
                method: 'post',
                url: `${this.productUrl}${ULR}`,
                data: params
            }).then((res) => {
                console.log('-====->', res);
                this.butopa = false;
                this.selectedCollection = [];
                this.selectedCollArray = [];
                this.tableDatas = [];
                setTimeout(function() {
                    _this.enquiryForm();
                }, 300);
                console.log('==this.tableDatas====', this.tableDatas);
                window.$wxeMessage({
                    type: 'success',
                    message: `${tishi}成功!`
                });
            }).catch((error) => {
                console.log('--->', error);
            });
        },
        batchDelete() {
            this.selectforeach(() => {
                this.remotePublic(this.deleUrl, '批量删除');
            }, '批量删除');
        },
        deleline(row) {
            console.log('row', row);
            this.$confirm(`确定要删除${row.brandName}么？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.remotePublic(this.deleUrl, '删除', 'line', row.brandId);
            }).catch(() => {
            });
        }
    },
    computed: {
        permissionFilter: {
            get() {
                return this.permissionDataList;
            },
            set(val) {
                console.log('按钮级别权限keys:' + JSON.stringify(val));
                if (val !== null) {
                    for (var key in val) {
                        this.$set(this.permissionObj, key, val[key].auth);
                    }
                }
            }
        }
    }
};
</script>
