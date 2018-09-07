<template lang="html">
    <div class="recycleBin m-router-con">
        <!--库存监控-->
        <!--{{formData}}-->
        <div class="u-top-search">
            <el-form
                    ref="formData"
                    :model="formData"
                    :inline=true>
                <!--<div class="refer">-->
                <el-form-item prop="storeId">
                    <el-select size="small" v-model="formData.storeId" placeholder="选择仓库" calerable filterable class="xe-input-l40">
                        <el-option
                                v-for = "item in actionList"
                                :key="item.storeId"
                                :label = "item.storeName"
                                :value = "item.storeId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="cateIds">
                    <categoryTag v-model='formData.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
                </el-form-item>
                <!--<el-form-item prop="pro">-->
                    <!--<el-input placeholder="商品货号/SKU编号/商品名称" v-model="formData.pro" class="xe-input-col2"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item prop="proName">
                    <el-input size="small" placeholder="商品货号" v-model="formData.proNum" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item prop="proNum">
                    <el-input size="small" placeholder="商品名称" v-model="formData.proName" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('formData')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="outData"><span class="iconfont icon-daochu"></span> 导出
            </el-button>
            <el-button class="xe-button-normal" @click="editPrice"><span class="iconfont icon-piliangxiugaiyonghuleixing"></span> 批量修改
            </el-button>
        </div>
        <!-- {{tableData}} -->
        <!-- {{multipleSelection}} -->
        <div class="goodsTable">
            <el-table
                    ref="multipleTable"
                    :data="tableData"
                    border
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        label=""
                        class-name="td-index"
                        width="45"
                        fixed="left">
                    <template scope="props">
                        <span>{{props.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column type="selection" fixed="left" width="34" class-name="selectionTd"></el-table-column>
                <el-table-column label="商品图" width="100">
                    <template scope="props">
                        <div class="z-imgbox">
                            <!--{{props.row}}-->
                            <img :src="picServer + props.row.proMainImg" alt="品牌logo" width="60" height="60">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="proSku" label="SKU编码" width="145"></el-table-column>
                <el-table-column prop="proNum" label="商品货号" width="145"></el-table-column>
                <el-table-column prop="proName" label="商品名称" width="150"></el-table-column>
                <el-table-column prop="proCategoryName" label="商品分类" width="168"></el-table-column>
                <el-table-column prop="proPricingType" label="计量方式" width="94">
                    <template scope="props">
                        {{props.row.proPricingType | pricingTypeToText}}
                    </template>
                </el-table-column>
                <el-table-column prop="proUnit" label="单位" width="68"></el-table-column>
                <el-table-column prop="proSepcValue" label="规格" width="86">
                    <template scope="props">
                        {{props.row.proSepcValue | noneToText}}
                    </template>
                </el-table-column>
                <el-table-column prop="averagePrice" label="平均成本价" width="104">
                    <template scope="props">
                        <div v-if="props.row.averagePrice">{{parseFloat(props.row.averagePrice).toFixed(2)}}</div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column prop="storeName" label="仓库" width="100"></el-table-column>
                <el-table-column prop="actualInv" label="实际库存" width="90"></el-table-column>
                <el-table-column prop="invAmount" label="库存金额" width="90">
                    <template scope="props">
                        <div v-if="props.row.invAmount">{{parseFloat(props.row.invAmount).toFixed(2)}}</div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column prop="usableInv" label="可用库存" width="90"></el-table-column>
                <el-table-column prop="lockedInv" label="订单占用" width="90"></el-table-column>
                <el-table-column prop="transitInv" label="采购在途" width="90"></el-table-column>
                <el-table-column prop="invMax" label="库存上限" width="90"></el-table-column>
                <el-table-column prop="invMin" label="库存下限" width="90"></el-table-column>
                <!--<el-table-column label="操作" fixed="right"  width="90">-->
                    <!--<template scope="props">-->
                        <!--<a href="javascript:;" class="s-blue" @click="editPrice">库存警戒</a>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <!--分页-->
            <!--<div class="page-showbox">-->
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
            <!--</div>-->
            <!--分页-->
        </div>
        <div class="add-fromKu reset-dialog">
            <el-dialog title="批量修改库存限制" :visible.sync="dialogVisible">
                <el-form :model="formDataDiolog">
                    <!-- {{formDataDiolog}} -->
                    <el-form-item label="库存下限" :label-width="xeLabelWidth80">
                        <el-input v-model.number="formDataDiolog.invMin" @blur="numberFix($event, 0, 1)" :maxlength='9' placeholder="请输入数字" class="zy-input-normal" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="库存上限" :label-width="xeLabelWidth80">
                        <el-input v-model.number="formDataDiolog.invMax" @blur="numberFix($event, 0, 2)" :maxlength='9' placeholder="请输入数字" class="zy-input-normal" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" :loading="saveLoading" size="small" @click="save">保存</el-button>
                    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import categoryTag from '@/components/category/category';
    export default {
        data() {
            return {
                actionList: [],
                dialogVisible: false,
                value1: '',
                value2: '',
                outerUrl: '',
                formData: {
                    cateIds: [],
                    proName: '',
                    proCategory: '',
//                    pro: '',
                    storeId: '',
                    proNum: ''
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                multipleSelection: [],
                saveLoading: false,
                tableData: [],
                formDataDiolog: {
                    invMax: '',
                    invMin: '',
                    storeInvId: ''
                },
                picServer: ''
            };
        },
        created() {
            this.creatInf(1, this.formData);
            this.pullDown();
            this.classify();
        },
        methods: {
            onSubmit() {
                console.log(this.formData);
                this.creatInf(1, this.formData);
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            shelfLifeFn(event) {
                let value = parseInt(event.target.value);
                if (value > 0) {
                    event.target.value = value;
                } else {
                    event.target.value = '';
                }
            },
            numberFix(event, number, type) {
                let val = parseFloat(event.target.value);
                if (!(val > 0)) {
                    val = '';
                } else {
                    val = val.toFixed(number);
                }
                event.target.value = val;
                if (type === 1) {
                    this.formDataDiolog.invMin = val;
                };
                if (type === 2) {
                    this.formDataDiolog.invMax = val;
                };
            },
            // 仓库下拉调接口
            pullDown() {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                    data: {
                        lcfbFlag: ''
                    }
                }).then((res) => {
                    this.actionList = res.data.actionList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            // 商品分类接口
            classify() {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/venSys/queryProCategory',
                    data: {

                    }
                }).then((res) => {
                }).catch((error) => {
                    console.log(error);
                });
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
            handleClose(done) {
                this.dialogVisible = false;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            editPrice(data) {
                if (this.multipleSelection.length === 0) {
                    this.$xeMessage.warning('请选择一个商品！');
                    return;
                }
                this.formDataDiolog.invMax = '';
                this.formDataDiolog.invMin = '';
                this.dialogVisible = true;
            },
            save() {
                let invMax = this.formDataDiolog.invMax;
                let invMin = this.formDataDiolog.invMin;
                console.log('invMax <= invMin', invMax < invMin);
                if (invMax <= 0 || invMin <= 0 || invMax < invMin) {
                    this.$xeMessage.warning('请认真核对填写内容！');
                    return false;
                }
                let dataObj = {
                    invMin: invMin,
                    invMax: invMax
                };
                let dataArr = [];
                for (var i = 0; i < this.multipleSelection.length; i++) {
                    dataArr.push(this.multipleSelection[i].storeInvId);
                };
                dataObj.storeInvIds = dataArr;
                this.saveLoading = true;
                console.log(dataArr);
                this.$http({ // 批量修改库存上限下限
                    method: 'post',
                    url: '/xe-route/xe-erp/storeInvtory/batchEditStoreInvLimit',
                    data: dataObj
                }).then((res) => {
                    if (res.status === '0000') {
                        this.$xeMessage.success(res.msg);
                        this.dialogVisible = false;
                        for (var i = 0; i < dataArr.length; i++) {
                            for (var j = 0; j < this.tableData.length; j++) {
                                if (dataArr[i] === this.tableData[j].storeInvId) {
                                    this.tableData[j].invMin = this.formDataDiolog.invMin;
                                    this.tableData[j].invMax = this.formDataDiolog.invMax;
                                    break;
                                }
                            }
                        }
                        this.saveLoading = false;
                        console.log('test', 'success');
                    } else {
                        console.log('test', 'success');
                        this.saveLoading = false;
//                        this.$xeMessage.warning(res.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                    this.saveLoading = false;
                });
            },
            creatInf(pageNum, formData) {
                let data = {};
                data = formData;
                data.pageNum = pageNum;
                data.pageSize = this.pageInfo.pageSize;
                data.proCategory = this.cateId;
                this.outerUrl = '/xe-route/xe-erp/storeCenterExport/storeInventoryList?proCategory=' + data.proCategory + '&proName=' + data.proName + '&proNum=' + data.proNum + '&storeId=' + data.storeId;
                this.$http({ // 查询库存监控列表
                    method: 'post',
                    url: '/xe-route/xe-erp/storeInvtory/queryStoreInvList',
                    data: data
                }).then((res) => {
                    if (res.data) {
                        console.log('res=====', res.data);
                        this.tableData = res.data.actionList;
                        this.pageInfo = res.data.xePageInfo;
                        this.picServer = res.data.picServer;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        computed: {
            cateId() {
                if (this.formData.cateIds.length > 0) {
                    return this.formData.cateIds[this.formData.cateIds.length - 1];
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
