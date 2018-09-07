<template lang="html">
    <div class="m-router-con">
        <!-- 5区域商品 -->
        <!-- {{formData}} -->
        <div class="u-top-search">
        	<el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                <el-form-item prop="nameNum">
                    <el-input size="small" placeholder="输入商品名称／货号查询" v-model="formData.nameNum"></el-input>
                </el-form-item>
                <el-form-item prop="saleAreaIds">
                    <areaselectTag ajaxUrl='/xe-route/xe-pro/ven/proSpu/querySaleAreaListByUser' v-model='formData.saleAreaIds' :width='170' :changeOnSelect="true"></areaselectTag>
                </el-form-item>
                <el-form-item prop="cateIds">
                    <categoryTag v-model='formData.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
                </el-form-item>
                <el-form-item prop="upFlag" class="z-mr30">
                    <el-select size="small" v-model="formData.upFlag" placeholder="是否上架">
                        <el-option label="是否上架" value="-1"></el-option>
                        <el-option label="上架" value="1"></el-option>
                        <el-option label="下架" value="2"></el-option>
                        <el-option label="强制下架" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">
                        查询
                    </el-button>
                    <el-button class="xe-button-normal" @click="resetForm('formData')">
                        重置
                    </el-button>
                    <el-button class="xe-button-normal" @click.stop="searchFormbut = true">
                        高级搜索
                    </el-button>
                </el-form-item>
            </el-form>
            <!--高级搜索样式start-->
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true" :model="formData" ref="formData" label-width="60px">
                        <div>
                            <el-form-item prop="nameNum" label="商品名称／货号" label-width="100px">
                                <el-input size="small" v-model="formData.nameNum" placeholder="输入商品名称／货号" style="width:250px;"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="saleAreaIds" label="销售区域">
                                <areaselectTag ajaxUrl='/xe-route/xe-pro/ven/proSpu/querySaleAreaListByUser' v-model='formData.saleAreaIds' :width='170' :changeOnSelect="true"></areaselectTag>
                            </el-form-item>
                            <el-form-item prop="frozenFlag" label="是否冻品">
                                <el-select size="small" v-model="formData.frozenFlag" placeholder="是否冻品">
                                    <el-option label="是否冻品" value="-1"></el-option>
                                    <el-option label="冻品" value="1"></el-option>
                                    <el-option label="鲜品" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="cateIds" label="商品分类">
                                <categoryTag v-model='formData.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
                            </el-form-item>
                            <el-form-item prop="upFlag" label="是否上架">
                                <el-select size="small" v-model="formData.upFlag" placeholder="是否上架">
                                    <el-option label="是否上架" value="-1"></el-option>
                                    <el-option label="上架" value="1"></el-option>
                                    <el-option label="下架" value="2"></el-option>
                                    <el-option label="强制下架" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item>
                                <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                                <el-button class="xe-button-normal" @click="resetForm('formData')">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
            <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="grounding(1)">
                <span class="iconfont icon-shangjia"></span> 上架
            </el-button>
            <el-button class="xe-button-normal" @click="grounding(2)">
                <span class="iconfont icon-xiajia"></span> 下架
            </el-button>
            <el-button class="xe-button-normal" @click="deletlot">
                <span class="iconfont icon-shanchu"></span> 删除
            </el-button>
            <el-button class="xe-button-normal" @click="editPrice">
                <span class="iconfont icon-xiugai"></span> 设置区域阶梯价
            </el-button>
            <!-- <el-button class="xe-button-normal" @click="dataExport">
                <span class="iconfont icon-daochu"></span> 导出
            </el-button> -->
        </div>
        <!-- {{multipleSelection}} -->
        <div class="goodsTable">
            <el-table
                ref="multipleTable"
                :data="list"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange"
                >
                <el-table-column type="expand">
                    <template scope="props">
                        <div class="demo-table-expand">
                            <ul class="table-in-listUl">
                             <!-- v-for="item in props.row.skus" -->
                                <li class="table-in-list">
                                    <div class="clearfix">
                                        <div class="table-detail-box clearfix">
                                            <!-- <p :title=props.row.productName></p> -->
                                            <el-tooltip class="item" effect="dark" placement="top">
                                                <div slot="content">{{props.row.specValue}}</div>
                                                <p style="width:180px;">规格型号：{{props.row.specValue | noneToText}}</p>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" placement="top">
                                                <div slot="content">{{props.row.proSku}}</div>
                                                <p style="width:186px;">sku编码：{{props.row.proSku}}</p>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" placement="top">
                                                <div slot="content">{{props.row.proNum}}</div>
                                                <p style="width:186px;">货号：{{props.row.proNum}}</p>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" placement="top">
                                                <div slot="content">{{props.row.grossWeight}} Kg</div>
                                                <p style="width:110px;">重量：{{props.row.grossWeight}} Kg</p>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" placement="top">
                                                <div slot="content">{{props.row.saleQuantity}}</div>
                                                <p style="width:150px;">销售库存：{{props.row.saleQuantity}}</p>
                                            </el-tooltip>
                                            <el-tooltip class="item" effect="dark" placement="top">
                                                <div slot="content">{{props.row.minQuantity}}</div>
                                                <p style="width:150px;">起订量：{{props.row.minQuantity}}</p>
                                            </el-tooltip>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    type="selection"
                    width="40"
                    class-name="selectionTd">
                    </el-table-column>
                    <el-table-column label="商品图片" width="100">
                        <!-- 商品图片{{props.row.img}} -->
                        <template scope="props">
                            <!-- 商品图片{{props.row.img}} -->
                            <div class="z-imgbox">
                                <img :src="picServer + props.row.imgUrl" alt="商品图片" width="60" height="60">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" prop="productName" min-width="160">
                    </el-table-column>
                    <!-- cateId -->
                    <el-table-column label="商品分类" prop="categoryName" min-width="210">
                    </el-table-column>
                    <!-- saleAreaId -->
                    <el-table-column label="销售区域" prop="saleAreaName" min-width="120">
                    </el-table-column>
                    <el-table-column label="区域价格" prop="areaPrice" min-width="85" class-name="priceget">
                        <template scope="props">
                            {{props.row.areaPrice | priceToText}}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="供货商" prop="supplierName" width="">
                    </el-table-column> -->
                    <el-table-column label="是否冻品" prop="frozenFlag" width="85">
                        <template scope="props">
                            {{props.row.frozenFlag | frozenFlagToText}}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="是否审核" prop="proStatus" width="85">
                        <template scope="props">
                            {{props.row.proStatus | proStatusFlags}}
                        </template>
                    </el-table-column> -->
                    <el-table-column label="阶梯价" width="80">
                        <template scope="props">
                            {{props.row.stepFlag | stepFlags}}
                        </template>
                    </el-table-column>
                    <el-table-column label="审核状态" prop="proStatus" min-width="85">
                        <template scope="props">
                            {{props.row.proStatus | proStatusToText}}
                            <el-tooltip class="item" effect="dark" placement="top" v-if="props.row.proStatus === 3">
                                <div slot="content" class="tips-item">{{props.row.rejectReason}}</div>
                                <a href="javascript:;" class="s-blue">驳回原因</a>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否上架" prop="upFlag" width="85">
                        <template scope="props">
                            {{props.row.upFlag | upFlagTypes}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" width="110">
                        <template scope="props">
                            <div class="btn-in-table">
                                <a href="javascript:;" class="s-blue f-edit" @click="editBtn(props)">
                                    {{props.row.stepFlag === 1 ? '修改阶梯价' : '修改区域价'}}
                                </a>
                                <a href="javascript:;" class="s-blue" style="margin-left: 0;" @click="deletSingle(props)">删除</a>
                            </div>
                        </template>
                    </el-table-column>
            </el-table>
            <div class="page-showbox">
                <div class="xe-pagination-panel">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageInfo.pageNums"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="pageInfo.pageSize"
                        layout="total, prev, pager, next, sizes, jumper"
                        :total="pageInfo.total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="add-fromKu reset-dialog">
            <el-dialog title="修改商品信息" :visible.sync="dialogVisible">
                <el-form :model="formDataDiolog">
                    <el-form-item label="区域价格" :label-width="xeLabelWidth80">
                        <el-input size="small" @blur="numberFix($event, 2)" :maxlength='7' v-model.number="formDataDiolog.areaPrice" placeholder="请输入数字" class="zy-input-normal" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" @click="save()">保存</el-button>
                    <el-button class="xe-button-normal" @click="dialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="设置区域阶梯价" :visible.sync="pricesVisible">
                <div class="changeCate">
                    <el-table
                        :data="multipleSelection"
                        style="width: 100%"
                        border
                        >
                        <el-table-column
                            class-name="td-index"
                            label="序号"
                            width="55">
                            <template scope="props">
                                <span>{{props.$index + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品名称" prop="productName">
                        </el-table-column>
                        <el-table-column label="商品货号" prop="proNum">
                        </el-table-column>
                        <el-table-column label="价格" prop="areaPrice">
                            <template scope="scope">
                                {{scope.row.areaPrice | numberToFixed2}}
                            </template>
                        </el-table-column>
                        <el-table-column label="区域" prop="saleAreaName">
                        </el-table-column>
                    </el-table>
                    <div>
                        <h5 class="changeCateTitle">设置阶梯价</h5>
                        <!-- {{tableData}} -->
                        <setStepPrice ref="stepPriceInstance" :defaultData="stepDefaultData"></setStepPrice>
                    </div>
                    </el-form-item>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" :loading="saveLoading" @click="savePrice()">保存</el-button>
                    <el-button class="xe-button-normal" @click="pricesVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="设置区域阶梯价" :visible.sync="pricesVisible2">
                <div class="changeCate">
                    <setStepPrice ref="stepPriceInstance2" :defaultData="stepDefaultData2"></setStepPrice>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" :loading="saveLoading" @click="savePrice2">保存</el-button>
                    <el-button class="xe-button-normal" @click="pricesVisible2 = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import areaselectTag from '@/components/areaSelect/areaSelect';
import categoryTag from '@/components/category/category';
import setStepPrice from 'components/setStepPrice/stepPrice';
export default {
    name: 'areaProList',
    data() {
        return {
            dialogVisible: false,
            pricesVisible: false,
            pricesVisible2: false,
            formData: {
                nameNum: '',
                productName: '',
                proNum: '',
                saleAreaIds: [],
                cateIds: [],
                upFlag: '-1',
                supplierId: '',
                frozenFlag: ''
            },
            formDataDiolog: {
                areaPrice: '',
                proAreaId: '',
                index: ''
            },
            list: [],
            pageInfo: {
                pageNums: 1,
                total: 0,
                pageSize: 10
            },
            picServer: '',
            multipleSelection: [],
            saveLoading: false,
            auditFlag: 2,
            stepDefaultData: [],
            stepDefaultData2: []
        };
    },
    created() {
        this.creatInf(1, this.formData);
    },
    methods: {
        onSubmit() {
            console.log('submit!');
            this.creatInf(1, this.formData);
        },
        numberFix(event, number) {
            let val = parseFloat(event.target.value);
            if (!(val > 0)) {
                val = '';
            } else {
                val = val.toFixed(number);
            }
            event.target.value = val;
            this.formDataDiolog.areaPrice = val;
        },
        save() {
            let val = this.formDataDiolog.areaPrice;
            if (!(val > 0)) {
                this.$xeMessage.warning('请认真核对填写内容！');
                return;
            }
            this.$http({ // 区域商品更新区域价格
                method: 'post',
                url: '/xe-route/xe-pro/ven/proArea/updateVenProAreaPrice',
                data: this.formDataDiolog
            }).then((res) => {
                if (res.status === '0000') {
                    this.$xeMessage.success(res.msg);
                    this.dialogVisible = false;
                    this.list[this.formDataDiolog.index].areaPrice = parseFloat(this.formDataDiolog.areaPrice);
                } else {
                    this.$xeMessage.warning(res.msg);
                }
            }).catch((error) => {
                this.$xeMessage.warning(error.msg);
                console.log(error);
            });
        },
        editPrice() {
            if (this.multipleSelection.length === 0) {
                this.$xeMessage.warning('请选择一个商品！');
                return;
            }
            this.stepDefaultData = [
                {stepPrice: '', stepSort: 1, endNum: '', startNum: 1},
                {stepPrice: '', stepSort: 2, startNum: '', endNum: 999999}
            ];
            this.pricesVisible = true;
        },
        savePrice() {
            this.$refs.stepPriceInstance.saveJtPop(data => {
                console.log(this.multipleSelection);
                let selectArrs = [];
                this.multipleSelection.forEach(item => {
                    let obj = {
                        saleAreaId: item.saleAreaId,
                        proSpu: item.proSpu,
                        proSku: item.proSku
                    };
                    selectArrs.push(obj);
                });
                this.saveLoading = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proStep/insertStepDataBatch',
                    data: {
                        proArray: JSON.stringify(selectArrs),
                        stepArray: JSON.stringify(data)
                    }
                }).then(res => {
                    let _this = this;
                    console.log(res);
                    this.saveLoading = false;
                    this.pricesVisible = false;
                    // this.multipleSelection.forEach(item => {
                    //     item.stepFlag = 1;
                    // });
                    // this.$refs.multipleTable.clearSelection();
                    this.$xeMessage.success('设置区域阶梯价成功！');
                    setTimeout(function () {
                        _this.creatInf(_this.pageInfo.pageNum, _this.formData);
                    }, 300);
                }).catch(error => {
                    console.log(error);
                    this.saveLoading = false;
                });
            });
        },
        savePrice2() {
            this.$refs.stepPriceInstance2.saveJtPop(data => {
                let selectArrs = [];
                selectArrs.push(this.tpmInf);
                this.saveLoading = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proStep/insertStepDataBatch',
                    data: {
                        proArray: JSON.stringify(selectArrs),
                        stepArray: JSON.stringify(data)
                    }
                }).then(res => {
                    let _this = this;
                    console.log(res);
                    this.saveLoading = false;
                    this.pricesVisible2 = false;
                    // this.multipleSelection.forEach(item => {
                    //     item.stepFlag = 1;
                    // });
                    // this.$refs.multipleTable.clearSelection();
                    this.$xeMessage.success('设置区域阶梯价成功！');
                    setTimeout(function () {
                        _this.creatInf(_this.pageInfo.pageNum, _this.formData);
                    }, 300);
                }).catch(error => {
                    console.log(error);
                    this.saveLoading = false;
                });
            });
        },
        grounding(upFlag) { // 区域商品上下架
            console.log(upFlag);
            const _this = this;
            let nextFlag = true;
            if (this.multipleSelection.length === 0) {
                this.$xeMessage.warning('请选择');
                return;
            } else {
                for (var i = 0; i < _this.multipleSelection.length; i++) {
                    let value = _this.multipleSelection[i];
                    if (value.upFlag === upFlag) {
                        if (upFlag === 2) {
                            this.$xeMessage.warning('请重新选择商品，下架商品不可重复提交');
                        } else {
                            this.$xeMessage.warning('请重新选择商品，上架商品不可重复提交');
                        }
                        return false;
                    }
                    if (value.upFlag !== 1 && upFlag === 2) { // 下架智能操作上价商品
                        this.$xeMessage.warning('请重新选择商品，强制下架商品请修改商品信息后重新提交');
                        return false;
                    }
                }
            }
            console.log('value.auditFlag', this.auditFlag);
            if (this.auditFlag === 2) { // 是否审核 1 免审 2 非免审
                for (var j = 0; j < _this.multipleSelection.length; j++) {
                    let value = _this.multipleSelection[j];
                    console.log('value.upFlag', value.upFlag);
                    if (value.upFlag === 3) {
                        this.$xeMessage.warning('请重新选择商品，强制下架商品请修改商品信息后重新提交');
                        return false;
                    }
                }
            }
            const proAreaIdsArr = [];
            for (var k = 0; k < _this.multipleSelection.length; k++) {
                let value = _this.multipleSelection[k];
                proAreaIdsArr.push({
                    proAreaId: value.proAreaId,
                    proSku: value.proSku,
                    proSpu: value.proSpu
                });
            }
            if (nextFlag) {
                let urls = '';
                if (upFlag === 1) {
                    urls = '/xe-route/xe-pro/ven/proArea/updateVenProAreaUpFlagBatch';
                } else {
                    urls = '/xe-route/xe-pro/ven/proArea/updateVenProAreaDownFlagBatch';
                }
                this.$confirm('确定改变选中商品上下架状态？是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'post',
                        url: urls,
                        data: {
                            data: proAreaIdsArr
                        }
                    }).then((res) => {
                        if (res.status === '0000') {
                            this.$xeMessage.success(res.msg);
                            for (var k = 0; k < this.multipleSelection.length; k++) {
                                const proAreaId = this.multipleSelection[k].proAreaId;
                                for (var j = 0; j < _this.list.length; j++) {
                                    if (_this.list[j].proAreaId === proAreaId) {
                                        this.list[j].upFlag = upFlag;
                                    }
                                }
                            }
                            this.$refs.multipleTable.clearSelection();
                        } else {
                            this.$xeMessage.warning(res.msg);
                        }
                    }).catch((error) => {
                        console.log(error);
                        this.$xeMessage.error(error.msg);
                    });
                }).catch((cancel) => {
                    console.log(cancel);
                });
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        delet(param) {
            var _this = this;
            this.$http({ // 删除商品属性 xe-route/xe-pro/
                method: 'post',
                url: '/xe-route/xe-pro/ven/proArea/updateVenProAreaDelFlagBatch',
                data: {
                    proAreaIds: param
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
        deletSingle(props) {
            if (props.row.upFlag === 1) {
                this.$xeMessage.warning('上架中的商品不能直接删除，必须下架后才能进行删除');
                return false;
            }
            this.$confirm('确定删除该条区域商品？是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delet(props.row.proAreaId);
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
            for (var i = 0; i < _this.multipleSelection.length; i++) {
                let value = _this.multipleSelection[i];
                if (value.upFlag === 1) {
                    this.$xeMessage.warning('上架中的商品不能直接删除，必须下架后才能进行删除');
                    return false;
                }
            }
            this.$confirm('确定删除选中的区域商品？是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const updateArr = [];
                _this.multipleSelection.forEach(function(value) {
                    updateArr.push(value.proAreaId);
                });
                this.delet(updateArr.join(','));
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        editBtn(spu) {
            if (spu.row.stepFlag === 1) {
                // 有阶梯价
                this.tpmInf = {
                    saleAreaId: spu.row.saleAreaId,
                    proSpu: spu.row.proSpu,
                    proSku: spu.row.proSku
                };
                this.stepDefaultData2 = spu.row.areaStepList;
                this.pricesVisible2 = true;
            } else {
                this.formDataDiolog.proAreaId = spu.row.proAreaId;
                this.formDataDiolog.areaPrice = spu.row.areaPrice.toFixed(2);
                this.formDataDiolog.index = spu.$index;
                this.dialogVisible = true;
            }
        },
        handleClose(done) {
            this.dialogVisible = false;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.creatInf(this.pageInfo.PageNum, this.formData);
        },
        handleCurrentChange(val) {
            this.pageInfo.PageNum = val;
            this.creatInf(this.pageInfo.PageNum, this.formData);
        },
        dataExport() {
            // console.log('test');
            // this.$http({ // 导出商品
            //     method: 'post',
            //     url: '/xe-route/xe-pro/ven/proimport/exportVenProList',
            //     data: {
            //         saleAreaIds: [999]
            //     }
            // }).then((res) => {
            this.$xeMessage.info('努力导出中，请耐心等待。');
            // }).catch((error) => {
            //     console.log(error);
            // });
        },
        creatInf(pageNum, formData) {
            let data = {};
            data = formData;
            data.cateId = this.cateId;
            data.saleAreaId = this.saleAreaId;
            data.pageNum = pageNum;
            data.pageSize = this.pageInfo.pageSize;
            console.log(data);
            this.$http({ // 查询区域商品列表
                method: 'post',
                url: '/xe-route/xe-pro/ven/proArea/listProAreaData',
                data: data
            }).then((res) => {
                if (res.data) {
                    this.list = res.data.list;
                    this.pageInfo = res.data.pageInfo;
                    this.picServer = res.data.picServer;
                    this.auditFlag = res.data.auditFlag;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    filters: {
        stepFlags(val) {
            let stepsource = '';
            switch (val) {
                case 1: {
                    stepsource = '有';
                    break;
                }
                case 2: {
                    stepsource = '无';
                    break;
                }
            }
            return stepsource;
        },
        upFlagTypes(val) {
            let upsource = '';
            switch (val) {
                case 1: {
                    upsource = '上架';
                    break;
                }
                case 2: {
                    upsource = '下架';
                    break;
                }
                case 3: {
                    upsource = '强制下架';
                    break;
                }
            }
            return upsource;
        },
        proStatusFlags(val) {
            let proStatussource = '';
            switch (val) {
                case 1: {
                    proStatussource = '已审核';
                    break;
                }
                case 2: {
                    proStatussource = '待审核';
                    break;
                }
            }
            return proStatussource;
        },
        frozenFlagFn(val) {
            let frozenFlagsource = val;
            switch (val) {
                case 1: {
                    frozenFlagsource = '是';
                    break;
                }
                case 2: {
                    frozenFlagsource = '否';
                    break;
                }
            }
            return frozenFlagsource;
        }
    },
    computed: {
        cateId() {
            if (this.formData.cateIds.length > 0) {
                return this.formData.cateIds[this.formData.cateIds.length - 1];
            } else {
                return '';
            }
        },
        saleAreaId() {
            if (this.formData.saleAreaIds.length > 0) {
                return this.formData.saleAreaIds[this.formData.saleAreaIds.length - 1];
            } else {
                return '';
            }
        }
    },
    components: {
        categoryTag,
        areaselectTag,
        setStepPrice
    }
};
</script>
<style lang="scss">
    .changeCate{
        padding: 0 20px;
        margin: 20px 0;
    }
    .changeCateTitle{
        line-height: 36px;
        font-size: 14px;
        margin-top: 10px;
    }
    .jtBox {
        .el-dialog__header {
            padding-bottom: 20px;
            border-bottom: 1px solid #dbe0e6;
        }
        .el-dialog__body {
            padding: 20px;
        }
        .el-dialog__footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #dbe0e6;
        }
        .jt-num-input, .jt-price-input {
            vertical-align: top;
            display: inline-block;
            width: 95px;
            height: 26px;
            border-radius: 4px;
            input {
                height: 26px;
            }
        }
        .jt-endnum-div {
            vertical-align: top;
            display: inline-block;
            width: 95px;
            height: 26px;
            border-radius: 4px;
            background: #f5f5f5;
            border: 1px solid #ced5de;
            line-height: 16px;
            padding: 5px;
            color: #687281;
        }
        .jt-num-stripe {
            display: inline-block;
            vertical-align: top;
            line-height: 26px;
            margin:0 5px;
            font-size: 20px;
        }
        .jt-btn {
            display: inline-block;
            vertical-align: top;
            width: 20px;
            height: 20px;
            font-size: 20px;
            margin:3px 15px;
            text-align: center;
            line-height: 1;
            color: #2a95fd;
            &.disabled {
                color: #d1dbe5;
            }
        }
    }
</style>
