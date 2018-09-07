<template lang="html">
    <div class="m-router-con">
        <!-- 7询报价商品 -->
        <div class="u-top-search">
       <!-- {{formInline}} -->
            <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                <el-form-item prop="nameNum">
                    <el-input size="small" v-model="formInline.nameNum" placeholder="输入商品名称 / 编号 / 货号"></el-input>
                </el-form-item>
                <el-form-item prop="cateIds">
                    <categoryTag v-model='formInline.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
                </el-form-item>
                <el-form-item prop="frozenFlag">
                    <el-select size="small" v-model="formInline.frozenFlag" placeholder="是否冻品">
                        <el-option label="是否冻品" value="-1"></el-option>
                        <el-option label="冻品" value="1"></el-option>
                        <el-option label="鲜品" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="upFlag" class="z-mr30">
                    <el-select size="small" v-model="formInline.upFlag" placeholder="是否上架">
                        <el-option label="是否上架" value="-1"></el-option>
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">
                        查询
                    </el-button>
                    <el-button class="xe-button-normal" @click="resetForm('formInline')">
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
                    <el-form :inline="true" :model="formInline" ref="formInline" label-width="60px">
                        <div>
                            <el-form-item prop="nameNum" label="商品名称／货号" label-width="100px">
                                <el-input size="small" v-model="formInline.nameNum" placeholder="输入商品名称／货号" style="width:250px;"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="cateIds" label="商品分类">
                                <categoryTag v-model='formInline.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
                            </el-form-item>
                            <el-form-item prop="upFlag" label="是否上架">
                                <el-select size="small" v-model="formInline.upFlag" placeholder="是否上架">
                                    <el-option label="是否上架" value="-1"></el-option>
                                    <el-option label="是" value="1"></el-option>
                                    <el-option label="否" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <!-- <el-form-item prop="nameNum" label="供货商">
                                <el-input size="small" v-model="formInline.nameNum" placeholder="输入供货商名称"></el-input>
                            </el-form-item> -->
                            <el-form-item prop="frozenFlag" label="是否冻品">
                                <el-select size="small" v-model="formInline.frozenFlag" placeholder="是否冻品">
                                    <el-option label="是否冻品" value="-1"></el-option>
                                    <el-option label="冻品" value="1"></el-option>
                                    <el-option label="鲜品" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item>
                                <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                                <el-button class="xe-button-normal"  @click="resetForm('formInline')">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
            <!--高级搜索样式end-->
        </div>
        <!-- {{multipleSelection}} -->
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="grounding(1)">
                <span class="iconfont icon-shangjia"></span> 上架
            </el-button>
            <el-button class="xe-button-normal" @click="grounding(2)">
                <span class="iconfont icon-xiajia"></span> 下架
            </el-button>
            <!-- <el-button class="xe-button-normal">
                <span class="iconfont icon-daochu"></span> 导出
            </el-button> -->
        </div>
        <div class="goodsTable">
            <el-table
                :data="tableData"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange"
                >
                <el-table-column type="expand">
                    <template scope="props">
                        <div class="demo-table-expand" v-if="props.row">
                            <ul class="table-in-listUl">
                                <li class="table-in-list">
                                    <div class="clearfix">
                                        <div class="table-detail-box clearfix">
                                            <el-tooltip class="item" effect="dark" placement="top">
                                                <div slot="content">{{props.row.specValue}}</div>
                                                <p style="width:180px;">规格型号：{{props.row.specValue | noneToText}}</p>
                                            </el-tooltip>
                                            <p style="width:186px;">sku编码：{{props.row.proSku}}</p>
                                            <p style="width:186px;">货号：{{props.row.proNum}}</p>
                                            <p style="width:110px;">重量：{{props.row.grossWeight}} Kg</p>
                                            <p style="width:210px;">销售库存：{{props.row.saleQuantity}}</p>
                                            <p style="width:150px;">起订量：{{props.row.minQuantity}} </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="34" class-name="selectionTd">
                </el-table-column>
                <el-table-column label="商品图片" prop="venProSpuEntity.proMainImg"  width="100">
                    <!-- 商品图片{{props.row.img}} -->
                    <template scope="props">
                        <!-- 商品图片{{props.row.proMainImg}} -->
                        <div class="z-imgbox">
                            <img :src="picServer + props.row.proMainImg" alt="商品图片" width="60" height="60">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" prop="venProSpuEntity.proName" min-width="260">
                </el-table-column>
                <el-table-column label="商品分类" prop="venProSpuEntity.cateName" min-width="220">
                </el-table-column>
                <el-table-column label="商品品牌" prop="venProSpuEntity.brandName" min-width="150">
                </el-table-column>
                <el-table-column label="建议销售价" min-width="100">
                    <template scope="props">
                        {{props.row.skuPrice | skuPriceFn}}
                    </template>
                </el-table-column>
                <el-table-column label="审核状态" min-width="85">
                    <template scope="props">
                        {{props.row.venProSpuEntity.proStatus | stepFlags}}
                    </template>
                </el-table-column>
                <el-table-column label="是否冻品"  min-width="90">
                    <template scope="props">
                        {{props.row.venProSpuEntity.frozenFlag | frozenFlagToText}}
                    </template>
                </el-table-column>
                <el-table-column label="是否上架"  min-width="90">
                    <template scope="props">
                        {{props.row.venProSpuEntity.upFlag | upFlagFn}}
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="66">
                    <template scope="props">
                        <div class="btn-in-table">
                            <a href="javascript:;" class="s-blue" @click="editSku(props)">修改</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
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
        </div>
        <!-- {{tableData}} -->
        <div class="add-fromKu reset-dialog">
            <el-dialog title="修改商品信息" :visible.sync="dialogVisible">
                <!-- {{formDataDiolog}} -->
                <el-form :model="formDataDiolog">
                    <el-form-item label="价格" :label-width="xeLabelWidth80">
                        <el-input size="small" v-model.number="formDataDiolog.skuPrice" placeholder="请输入数字" @blur="numberFix($event, 2)" :maxlength="7" class="zy-input-normal" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="销售库存" :label-width="xeLabelWidth80">
                        <el-input size="small" v-model="formDataDiolog.saleQuantity" placeholder="请输入数字" @input.native="formDataDiolog.saleQuantity = parseInt($event.target.value) > 0 ? formDataDiolog.saleQuantity = parseInt($event.target.value) : ''" :maxlength='8' class="zy-input-normal" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="起订量" :label-width="xeLabelWidth80">
                        <el-input size="small" v-model="formDataDiolog.minQuantity" placeholder="请输入数字" @input.native="formDataDiolog.minQuantity = parseInt($event.target.value) > 0 ? formDataDiolog.minQuantity = parseInt($event.target.value) : ''" :maxlength='8' class="zy-input-normal" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" @click="dialogVisible = false">取消</el-button>
                    <el-button class="xe-button-normal" type="primary" @click="save">保存</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import categoryTag from 'components/category/category';
    export default {
        data() {
            return {
                dialogVisible: false,
                formInline: {
                    nameNum: '',
                    cateId: '',
                    cateIds: [],
                    frozenFlag: '',
                    proName: '',
                    proNum: '',
                    upFlag: ''
                },
                permissionObj: {},
                formDataDiolog: {
                    proSku: '',
                    proSpu: '',
                    saleQuantity: '',
                    minQuantity: '',
                    skuPrice: ''
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                picServer: 'http://qa-pic.xebest.com/',
                venStatusData: [],
                tableData: [],
                multipleSelection: [],
                auditFlag: 1
            };
        },
        created() {
            this.creatInf(this.pageInfo.pageNum, this.formInline);
            this.ParentIdSeach();
        },
        methods: {
            onSubmit() {
                console.log('submit!');
                this.creatInf(1, this.formInline);
            },
            numberFix(event, number) {
                let val = parseFloat(event.target.value);
                if (!(val > 0)) {
                    val = '';
                } else {
                    val = val.toFixed(number);
                }
                event.target.value = val;
                this.formDataDiolog.skuPrice = val;
            },
            grounding(upFlag) { // 区域商品上下架
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
                if (this.auditFlag === 2) { // 是否审核 1 免审 2 非免审
                    for (var j = 0; j < _this.multipleSelection.length; j++) {
                        let value = _this.multipleSelection[j];
                        if (value.upFlag === 3) {
                            this.$xeMessage.warning('请重新选择商品，强制下架商品请修改商品信息后重新提交');
                            return false;
                        }
                    }
                }
                const updateArr = [];
                if (nextFlag) {
                    let urls = '/xe-route/xe-pro/ven/proInquiry/venProUpOrDownBatch';
                    this.$confirm('确定改变选中商品上下架状态？是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        _this.multipleSelection.forEach(function(value) {
                            updateArr.push({
                                proSku: value.proSku,
                                proSpu: value.proSpu
                            });
                        });
                        this.$http({
                            method: 'post',
                            url: urls,
                            data: {
                                data: updateArr,
                                upFlag: upFlag,
                                auditFlag: this.auditFlag
                            }
                        }).then((res) => {
                            if (res.status === '0000') {
                                this.$xeMessage.success(res.msg);
                                setTimeout(function () {
                                    _this.creatInf(_this.pageInfo.pageNum, _this.formInline);
                                }, 300);
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
            editSku(info) {
                this.formDataDiolog.proSku = info.row.proSku;
                this.formDataDiolog.proSpu = info.row.proSpu;
                this.formDataDiolog.saleQuantity = info.row.saleQuantity;
                this.formDataDiolog.minQuantity = info.row.minQuantity;
                this.formDataDiolog.skuPrice = info.row.skuPrice.toFixed(2);
                this.dialogVisible = true;
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.creatInf(this.pageInfo.pageNum, this.formInline);
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.creatInf(this.pageInfo.pageNum, this.formInline);
            },
            save() {
                let saleQuantityval = this.formDataDiolog.saleQuantity;
                let minQuantityval = this.formDataDiolog.minQuantity;
                let skuPrice = this.formDataDiolog.skuPrice;
                if (saleQuantityval <= 0 || minQuantityval <= 0 || skuPrice <= 0) {
                    this.$xeMessage.warning('请认真核对填写内容！');
                    return false;
                }
                console.log(this.formDataDiolog);
                this.$http({ // 修改sku的销售库存和起订量
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proInquiry/updSkuQuantity',
                    data: this.formDataDiolog
                }).then((res) => {
                    if (res.status === '0000') {
                        this.$xeMessage.success(res.msg);
                        this.dialogVisible = false;
                        for (var i = 0; i < this.tableData.length; i++) {
                            // console.log('test', this.tableData[i].proSpu === this.formDataDiolog.proSpu);
                            if (this.tableData[i].proSpu === this.formDataDiolog.proSpu) {
                                for (var j = 0; j < this.tableData[i].proSkuSpecList.length; j++) {
                                    if (this.tableData[i].proSku === this.formDataDiolog.proSku) {
                                        this.tableData[i].saleQuantity = this.formDataDiolog.saleQuantity;
                                        this.tableData[i].minQuantity = this.formDataDiolog.minQuantity;
                                        this.tableData[i].skuPrice = this.formDataDiolog.skuPrice;
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        this.$xeMessage.warning(res.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            ParentIdSeach() {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proSpu/queryCategoryListByParentId',
                    data: {
                        nameNum: ''
                    }
                }).then((res) => {
                    console.log('test---->', res);
                    this.venStatusData = res.data.categoryList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            remove(store, data) {
                store.remove(data);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            creatInf(pageNum, formData) {
                console.log('查询');
                let data = {};
                data = formData;
                data.pageNum = pageNum;
                data.cateId = this.cateId;
                data.pageSize = this.pageInfo.pageSize;
                this.$http({ // 查询询报价商品
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proInquiry/listVenProInquiryData',
                    data: data
                }).then((res) => {
                    console.log(res.data);
                    this.tableData = res.data.list;
                    this.pageInfo = res.data.pageInfo;
                    this.picServer = res.data.picServer;
                    // this.auditFlag = 2;
                    this.auditFlag = res.data.auditFlag;
                }).catch((error) => {
                    console.log('====>', error);
                });
            }
        },
        filters: {
            stepFlags(val) {
                let stepsource = '';
                switch (val) {
                    case 1: {
                        stepsource = '待审核';
                        break;
                    }
                    case 2: {
                        stepsource = '审核通过';
                        break;
                    }
                    case 3: {
                        stepsource = '审核驳回';
                        break;
                    }
                }
                return stepsource;
            },
            upFlagFn(val) {
                let upFlagstepsource = '';
                switch (val) {
                    case 1: {
                        upFlagstepsource = '上架  ';
                        break;
                    }
                    case 2: {
                        upFlagstepsource = '下架';
                        break;
                    }
                    case 3: {
                        upFlagstepsource = '强制下架';
                        break;
                    }
                }
                return upFlagstepsource;
            },
            skuPriceFn(val) {
                return val.toFixed(2);
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
