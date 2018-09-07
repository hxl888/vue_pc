<template lang="html">
    <div class="m-router-con publicOrderStyle">
        <div class="u-top-search">
            <el-form :inline="true" :model="puboderSerData" ref="puboderSerData" class="demo-form-inline">
                <el-form-item prop="sendStoreId">
                    <el-input v-model="puboderSerData.searchCondition" size="small" placeholder="调拨单号自动生成" :disabled="true" class="xe-input-l40"></el-input>
                </el-form-item>
                <el-form-item prop="sendStoreId">
                    <el-select size="small" v-model="puboderSerData.sendStoreId" placeholder="调出仓库" calerable filterable class="xe-input-l40">
                        <el-option
                                v-for = "item in actionList"
                                :key="item.storeId"
                                :label = "item.storeName"
                                :value = "item.storeId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="receiptStoreId">
                    <el-select size="small" v-model="puboderSerData.receiptStoreId" placeholder="调入仓库" calerable filterable class="xe-input-l40">
                        <el-option
                                v-for = "item in actionList"
                                :key="item.storeId"
                                :label = "item.storeName"
                                :value = "item.storeId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="allotRemark">
                    <el-input v-model="puboderSerData.allotRemark" size="small" placeholder="调拨备注" class="xe-input-l40"></el-input>
                </el-form-item>
            </el-form>
         </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="addAllocation"><i class="iconfont icon-xinzeng"></i>&nbsp;选中调拨商品</el-button>
        </div>
         <div class="pub-dataContent">
            <div class="pub-tabDatacon">
                <el-table
                    :data="pubTabDatacon"allotNums
                    border
                    style="width: 100%"
                    @selection-change="handleSelChange"
                    >
                    <el-table-column
                      type="index"
                      width="62"
                      label=" "
                      fixed
                      >
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label=""
                      width="34"
                      class-name="selectionTd"
                      type="selection"
                      fixed
                      >
                    </el-table-column>
                    <el-table-column
                      prop="allotCode"
                      label="商品图"
                      min-width="150"
                      >
                        <template scope="props">
                        <!-- 商品图片{{props.row.img}} -->
                            <div class="z-imgbox">
                                <img :src="picServer + props.row.proMainImg" alt="商品图片" width="60" height="60">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="proName"
                        label="商品名称"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="proNum"
                        label="商品货号"
                        min-width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="proCategoryName"
                        label="商品分类"
                        min-width="140"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="pricingType"
                        label="计量方式"
                        min-width="90"
                    >
                        <template scope="props">
                            <div>
                                {{props.row.pricingType | pricingTypeToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="proUnit"
                        label="单位"
                        min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="proSpecValue"
                        label="规格"
                        min-width="65"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.proSpecValue">{{scope.row.proSpecValue}}</div>
                            <div v-else>无</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="averagePrice"
                        label="成本价"
                        min-width="80"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.averagePrice">
                                {{(scope.row.averagePrice).toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="actualInv"
                        label="实际库存"
                        min-width="90"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="usableInv"
                        label="可用库存"
                        min-width="90"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allotNums"
                        label="调拨数量"
                        min-width="90"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allotAmount"
                        label="调拨金额"
                        min-width="90"
                    >
                        <template scope="scope">
                            <div v-if="(scope.row.averagePrice * scope.row.allotNums)">
                                {{(scope.row.averagePrice * scope.row.allotNums).toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="allotNums"
                        label="实际出库量"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allotNums"
                        label="实际入库量"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop=""
                        min-width="120"
                        fixed="right"
                        label="操作">
                        <template scope="scope">
                            <div>
                                <a href="javascript:;" class="alinkblu" @click="modifyAllot(scope.row)">修改</a>
                                <a href="javascript:;" class="alinkblu" @click="deletAllot(scope.$index)">删除</a>
                            </div>
                        </template>
                    </el-table-column>
                  </el-table>
            </div>
         </div>
         <div class="u-opera-btnBox">
            <el-button type="primary" class="xe-button-normal" @click="onSubmit">保存</el-button>
            <el-button class="xe-button-normal" @click="cancelS">取消</el-button>
        </div>
         <div class="reset-dialog set-editrequise">
            <el-dialog
                title="选择调拨商品"
                :visible.sync="dialogVisible"
                size="large"
                :before-close="handleClose">
                    <div class="tab-editrequise">
                        <el-form :inline="true" :model="formInline" ref="formInline">
                            <el-form-item prop="searchType">
                                <el-select size="small" class="xe-input-w110" v-model="formInline.searchType" placeholder="请选择">
                                    <el-option label="商品货号" value="2"></el-option>
                                    <el-option label="商品名称" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="proName">
                                <el-input v-model="formInline.proName" size="small" :placeholder="placeholder" class="xe-input-l40"></el-input>
                            </el-form-item>
                            <el-form-item prop="cateIds">
                                <categoryTag :filterable="true" v-model='formInline.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
                            </el-form-item>
                            <el-form-item>
                                <el-checkbox v-model="formInline.type" disabled label="零库存商品" name="type"></el-checkbox>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="xe-button-normal" type="primary" @click="disalogSearch">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <div class="clearfix">
                            <div class="table-editrequise">
                                <el-table
                                    :data="actionLists.actionList"
                                    style="width: 100%"
                                    border
                                    @selection-change="handleSelectionChange"
                                    >
                                    <el-table-column type="selection" min-width="34" class-name="selectionTd">
                                        </el-table-column>
                                        <el-table-column label="商品图" min-width="100">
                                            <!-- 商品图片{{props.row.img}} -->
                                            <template scope="props">
                                                <!-- 商品图片{{props.row.img}} -->
                                                <div class="z-imgbox">
                                                    <img :src="picServer + props.row.proMainImg" alt="商品图片" width="60" height="60">
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="商品名称" prop="proName" min-width="110">
                                        </el-table-column>
                                        <el-table-column label="商品货号" prop="proNum" min-width="85">
                                        </el-table-column>
                                        <el-table-column label="商品分类" prop="proCategoryName" min-width="150">
                                        </el-table-column>
                                        <el-table-column label="计量方式" prop="proPricingType" min-width="85">
                                            <template scope="props">
                                                <div>
                                                    {{props.row.proPricingType | pricingTypeToText}}
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="单位" prop="proUnit" min-width="85">
                                        </el-table-column>
                                        <el-table-column label="规格" prop="proSpecValue" min-width="90">
                                            <template scope="scope">
                                                <div v-if="scope.row.proSpecValue">
                                                    {{scope.row.proSpecValue}}
                                                </div>
                                                <div v-else>无</div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="成本价" prop="averagePrice" min-width="85">
                                            <template scope="scope">
                                                <div v-if="scope.row.averagePrice">
                                                    {{parseFloat(scope.row.averagePrice).toFixed(2)}}
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="实际库存" prop="actualInv" min-width="85">
                                        </el-table-column>
                                        <el-table-column label="可用库存" prop="" min-width="85">
                                            <template scope="scope">
                                                <div>
                                                    {{scope.row.actualInv - scope.row.lockedInv}}
                                                </div>
                                            </template>
                                        </el-table-column>
                                </el-table>
                            </div>
                        </div>
                        <div class="page-showbox">
                            <div class="xe-pagination-panel">
                                <el-pagination
                                    @size-change="handleSizeChangeD"
                                    @current-change="handleCurrentChangeD"
                                    :current-page="pageList.pageNum"
                                    :page-sizes="[10, 20, 50, 100]"
                                    :page-size="pageList.pageSize"
                                    layout="total, prev, pager, next, sizes, jumper"
                                    :total="pageList.total">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="xe-button-normal" type="primary" @click="SelectedShop(seOn)">选中</el-button>
                        <el-button class="xe-button-normal" @click="SelectedShopoff(seOn)">选中并关闭</el-button>
                        <el-button class="xe-button-normal" @click="Selectedoff">关闭</el-button>
                    </span>
            </el-dialog>
        </div>
        <el-dialog title="调拨数量" :visible.sync="branchdilog" class="reset-dialog dialog_wid340 error-tishi">
            <el-form :model="modifyallot" :rules="rule"  label-width="70px" ref="modifyallot">
                <el-form-item prop="allotNums"label="调拨数量">
                    <el-input size="small" v-model="modifyallot.allotNums" type="text" class="xe-input-col2" placeholder=""></el-input>
                </el-form-item>
                <div class="el-dialog__footer">
                    <el-button class="xe-button-normal" type="primary" @click="rejectSubmit('modifyallot')">确定</el-button>
                    <el-button class="xe-button-normal" @click="cacelallot('modifyallot')">取 消</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import categoryTag from '@/components/category/category';
    export default {
        data() {
            let validateallotNums = (rule, value, callback) => {
                if (value) {
                    console.log(this.person);
                    if (this.person.usableInv - value < 0) {
                        callback(new Error('调拨数量不能大于可用库存'));
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('请输入调拨数量'));
                }
            };
            return {
                placeholder: '请输入',
                pindex: -1,
                branchdilog: false,
                dialogVisible: false,
                formInline: {
                    searchType: '',
                    cateIds: [],
                    proName: '',
                    type: true
                },
                pageList: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 20
                },
                tabCard_val: 'first',
                actionList: [],
                actionLists: {},
                puboderSerData: {
                    allotRemark: '',
                    receiptStoreId: '',
                    receiptStoreName: '',
                    sendStoreId: '',
                    sendStoreName: '',
                    allotDetailList: []
                },
                pubTabDatacon: [],
                selectedCollection: [],
                seleCollection: [],
                seOn: true,
                rule: {
                    allotNums: [
                        {
                            required: true, validator: validateallotNums, trigger: 'blur'
                        }
                    ]
                },
                modifyallot: {
                    allotNums: ''
                },
                person: ''
            };
        },
        created() {
            this.Warehouse();
        },
        methods: {
            Warehouse() {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                    data: {
                        lcfbFlag: 1
                    }
                }).then((res) => {
                    this.actionList = res.data.actionList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            resetForm() {},
            onSubmit() {
                if (this.puboderSerData.receiptStoreId === '') {
                    this.$alert('请先选择调入仓库', {
                        type: 'info'
                    });
                } else {
                    if (this.puboderSerData.receiptStoreId === this.puboderSerData.sendStoreId) {
                        this.$alert('调入仓库和调出仓库不能相同', {
                            type: 'info'
                        });
                    } else {
                        if (this.seleCollection.length === 0) {
                            this.$alert('请先勾选需要调拨的商品。', {
                                type: 'info'
                            });
                        } else {
                            let flag = this.pubTabDatacon.every(item => {
                                return item.allotNums !== '';
                            });
                            if (flag) {
                                this.$confirm('您确认保存当前调拨单数据吗？', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.puboderSerData.allotDetailList = this.seleCollection;
                                    console.log(this.puboderSerData);
                                    let data = {};
                                    data = this.puboderSerData;
                                    this.$http({
                                        method: 'post',
                                        url: '/xe-route/xe-erp/allotManager/saveStoreAllot',
                                        data: data
                                    }).then((res) => {
                                        console.log('添加成功');
                                        window.$wxeMessage({
                                            type: 'success',
                                            message: '添加成功!'
                                        });
                                        this.$router.push({name: 'allotOrderList'});
                                    }).catch((error) => {
                                        console.log(error);
                                    });
                                }).catch(() => {
                                    console.log('取消提交');
                                });
                            } else {
                                this.$alert('每条商品的调拨数量不能为空，请先修改再保存', {
                                    type: 'info'
                                });
                            }
                        }
                    }
                }
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            addAllocation() {
                if (this.puboderSerData.sendStoreId) {
                    let data = {};
                    data = this.formInline;
                    data.storeId = this.puboderSerData.sendStoreId;
                    data.pageNum = this.pageList.pageNum;
                    data.pageSize = this.pageList.pageSize;
                    data.proCategory = this.cateId;
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-erp/storeInvtory/queryInvProList',
                        data: data
                    }).then((res) => {
                        if (res.data) {
                            this.actionLists = res.data;
                            this.pageList = res.data.xePageInfo;
                            console.log(res.data);
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                    this.dialogVisible = true;
                } else {
                    this.$alert('请先勾选调出仓库', {
                        type: 'info'
                    });
                }
            },
            handleSizeChangeD(val) {
                this.pageList.pageNum = val;
                this.addAllocation();
                console.log(this.pageList);
            },
            handleCurrentChangeD(val) {
                this.pageList.pageNum = val;
                this.addAllocation();
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
            },
            disalogSearch() {
                this.addAllocation();
            },
            handleSelectionChange(val) {
                this.selectedCollection = val;
            },
            handleSelChange(val) {
                this.seleCollection = val;
            },
            selectionShop(n) {
                console.log(this.selectedCollection.length);
                if (this.selectedCollection.length === 0) {
                    this.$alert('请先勾选需要调拨的商品。', {
                        type: 'info'
                    });
                } else {
                    if (n) {
                        this.pubTabDatacon = this.selectedCollection;
                        this.dialogVisible = false;
                    } else {
                        this.pubTabDatacon = this.selectedCollection;
                    }
                }
                this.pubTabDatacon.forEach((item) => {
                    this.$set(item, 'allotNums', '');
                    this.$set(item, 'allotAmount', '');
                    this.$set(item, 'pricingType', item.proPricingType);
                    this.$set(item, 'proPrice', item.averagePrice);
                    this.$set(item, 'usableInv', item.actualInv - item.lockedInv);
                });
            },
            SelectedShop() {
                this.seOn = false;
                this.selectionShop(this.seOn);
            },
            SelectedShopoff() {
                this.seOn = true;
                this.selectionShop(this.seOn);
            },
            Selectedoff() {
                this.dialogVisible = false;
            },
            modifyAllot(row) {
                this.branchdilog = true;
                this.person = row;
            },
            rejectSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.person.allotNums = this.modifyallot.allotNums;
                        this.branchdilog = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cacelallot(formName) {
                this.branchdilog = false;
                this.$refs[formName].resetFields();
            },
            deletAllot(index) {
                this.$confirm('您确认删除当前调拨商品吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.pubTabDatacon.splice(index, 1);
                    window.$wxeMessage({
                        type: 'success',
                        message: '完成删除!'
                    });
                }).catch(_ => {
                    console.log('取消删除');
                });
            },
            cancelS() {
                this.$confirm('取消后当前页面数据不会保存，您确认取消吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$router.push({name: 'allotOrderList'});
                }).catch(_ => {
                    console.log('取消');
                });
            }
        },
        components: {
            categoryTag
        },
        computed: {
            cateId() {
                if (this.formInline.cateIds.length > 0) {
                    return this.formInline.cateIds[this.formInline.cateIds.length - 1];
                } else {
                    return '';
                }
            },
            picServer() {
                return this.actionLists.picServer;
            }
        },
        watch: {
            dialogVisible(n) {
                if (n === false) {
                    this.$refs['formInline'].resetFields();
                }
            },
            branchdilog(n) {
                if (n === false) {
                    this.$refs['modifyallot'].resetFields();
                }
            },
            'puboderSerData.sendStoreId'(n) {
                if (n) {
                    for (let i in this.actionList) {
                        if (this.puboderSerData.sendStoreId === this.actionList[i].storeId) {
                            this.puboderSerData.sendStoreName = this.actionList[i].storeName;
                        }
                    }
                }
            },
            'puboderSerData.receiptStoreId'(n) {
                if (n) {
                    for (let i in this.actionList) {
                        if (this.puboderSerData.receiptStoreId === this.actionList[i].storeId) {
                            this.puboderSerData.receiptStoreName = this.actionList[i].storeName;
                            console.log(1);
                        }
                    }
                }
            },
            'formInline.searchType'(n) {
                if (n === '1') {
                    this.placeholder = '请输入商品名称';
                } else {
                    this.placeholder = '请输入商品货号';
                }
            }
        }
    };
</script>

<style lang="scss">
    @import "../../../../../assets/styles/views/publicOrderStyle.scss";
</style>
