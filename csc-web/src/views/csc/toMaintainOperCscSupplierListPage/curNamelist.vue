<template lang="html">
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">客户中心</el-breadcrumb-item>
                <el-breadcrumb-item>供应商档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <!--供应商信息展示-->
            <div style="margin-top: 20px">
                <el-form :inline="true" :model="supplierForm" ref="supplierForm" label-width="100px">
                    <div>
                        <el-form-item label="客户编码" class='colyel' prop="customerCode ">
                            <template>
                                <div class="minLen">
                                     <el-tooltip class="item" effect="dark" v-if="supplierForm.customerCode" :content="supplierForm.customerCode" placement="bottom-start">
                                         <el-button>{{supplierForm.customerCode }}</el-button>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-form-item>
                        <el-form-item label="客户名称" class='colyel' prop="customerName ">
                            <template>
                                <div class="minLen">
                                    <el-tooltip class="item minLen" effect="dark" v-if="supplierForm.customerName" :content="supplierForm.customerName" placement="bottom-start">
                                        <el-button>{{supplierForm.customerName }}</el-button>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-form-item>
                    </div>
                     <div>
                        <el-form-item label="供应商编码" class='colyel' prop="supplierCode">
                            <template>
                                <div class="minLen">
                                    <el-tooltip class="item minLen" effect="dark" v-if="supplierForm.supplierCode" :content="supplierForm.supplierCode" placement="bottom-start">
                                        <el-button>{{supplierForm.supplierCode }}</el-button>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-form-item>
                        <el-form-item label="供应商名称" class='colyel' prop="supplierName">
                            <template>
                                <div class="minLen">
                                    <el-tooltip class="item minLen" effect="dark" v-if="supplierForm.supplierName" :content="supplierForm.supplierName" placement="bottom-start">
                                        <el-button>{{supplierForm.supplierName }}</el-button>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="所属行业" prop="supplierIndustry">
                            <template>
                                <div class="minLen">
                                    <el-tooltip class="item" effect="dark" v-if="supplierForm.supplierIndustry" :content="supplierForm.supplierIndustry" placement="bottom-start">
                                        <el-button>{{supplierForm.supplierIndustry }}</el-button>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-form-item>
                        <el-form-item label="供应产品" prop="supplierProduct">
                            <template>
                                <div class="minLen">
                                    <el-tooltip class="item minLen" effect="dark" v-if="supplierForm.supplierProduct" :content="supplierForm.supplierProduct" placement="bottom-start">
                                        <el-button>{{supplierForm.supplierProduct }}</el-button>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="备注" prop="supplierRemark">
                            <template>
                                <div class="minLen">
                                    <el-tooltip class="item minLen" effect="dark" v-if="supplierForm.supplierRemark" :content="supplierForm.supplierRemark" placement="bottom-start">
                                        <el-button>{{supplierForm.supplierRemark }}</el-button>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label=" " class="xe-input-col2">
                            <el-button type="primary" @click.prevent="goBack">返回</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <div class="xe-page-header">
                <p>
                    供应商联系人列表
                </p>
            </div>
            <div class="addprelis">
                <el-button type="primary" @click="addSupplier">添 加</el-button>
            </div>
            <div class="xe-addbtn-panel">
                <div>
                 <!--prop tableData的属性 -->
                    <el-table :data="tableData" style="width:100%;" border>
                        <el-table-column fixed prop="serialNo" label="序号" min-width="65">
                            <template scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column  prop="contactName" label="联系人" min-width="90">
                            <template scope="scope">
                                {{scope.row.contactName}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="contactPhone" label="联系电话" min-width="90">
                            <template scope="scope">
                                {{scope.row.contactPhone}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="departmentPosition" label="职能部门" min-width="100">
                            <template scope="scope">
                                {{scope.row.departmentPosition}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="fax" label="传真" min-width="200">
                            <template scope="scope">
                                {{scope.row.fax}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="supplierProduct" label="email" min-width="150">
                            <template scope="scope">
                                {{scope.row.email}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="postCode" label="邮编" min-width="150">
                            <template scope="scope">
                                {{scope.row.postCode}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="地址" min-width="150">
                            <template scope="scope">
                                {{scope.row.address}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="100" fixed="right">
                            <template scope="scope">
                                <el-button
                                    class="xe-textBtn"
                                    size="small"
                                    type="text"
                                    @click="handleEdit(scope.row)">编辑</el-button>
                                <el-button
                                    size="small"
                                    type="text"
                                    class="red"
                                    @click="handleDelete(scope.row)">作废</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="xe-pagination-panel">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageInfo.pageNum"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="pageInfo.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="pageInfo.total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                supplierForm: {
                    serialNo: '',
                    customerCode: '',
                    supplierCode: '',
                    supplierName: '',
                    supplierIndustry: '',
                    supplierProduct: '',
                    supplierRemark: '',
                    creator: '',
                    customerName: ''
                },
                oldserialNo: null,
                tableData: [],
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                }
            };
        },
        created() {
            this.getUrlquery();
            this.userFomrget();
        },
        methods: {
            getUrlquery() {
                let _this = this;
                _this.oldserialNo = _this.$route.query.serialNo;
                console.log('_this.oldserialNo', _this.oldserialNo);
                _this.getuseerList(_this.oldserialNo);
            },
            getuseerList(id) {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/supplier/common/querySupplierBySerNo/' + id
                }).then((res) => {
                    console.log('res--->', res);
                    if (res.result) {
                        _this.supplierForm = res.result;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            handleEdit(val) {
                this.$router.push({name: 'ModifySupplierContact', query: {userId: val.id}});
            },
            addSupplier() {
                this.$router.push({name: 'AddSupplierContact', query: {supplierName: this.supplierForm.supplierName, supplierSerialNo: this.oldserialNo}});
            },
            handleDelete(scope) {
                let _this = this;
                this.disableUser(scope.customerName, {
                }, '/page/csc/supplier/main/deleteCscSupplierContactById/' + scope.id, () => {
                    if (_this.tableData.length === 1) {
                        _this.tableData = null;
                    }
                    _this.userFomrget();
                }, '作废');
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.userFomrget();
            },
            handleCurrentChange(val) {
                var _this = this;
                if (_this.pageInfo.pageNum !== 0) {
                    _this.pageInfo.pageNum = val;
                    _this.userFomrget();
                }
            },
            userFomrget() {
                let _this = this;
                let params = {
                    pageNum: _this.pageInfo.pageNum,
                    pageSize: _this.pageInfo.pageSize,
                    param: {
                        supplierSerialNo: _this.oldserialNo
                    }
                };
                _this.getRequestTableData('/page/csc/supplier/main/querySupplierContactListWithPage', params, function(res) {
                    console.log('tabl', res);
                    if (res.result.list) {
                        _this.tableData = res.result.list;
                        _this.pageInfo.total = res.result.total;
                    }
                });
            },
            goBack() {
                this.$router.go(-1);
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .addprelis{
        padding-bottom: 30px;
    }
    .minLen {
        width:250px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        button {
            text-align: left;
            border:none;
        }
    }
    .colyel {
        label {
            color:#DD5A43;
        }
    }
    .bottom {
        clear: both;
        text-align: center;
    }

    .item {
        margin: 4px;
    }
</style>
