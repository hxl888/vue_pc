<template lang="html">
    <div class="m-router-con">
        <!-- 4在售商品 -->
        <div class="u-top-search">
            <el-form
                :inline="true"
                :model="formData"
                ref="formData"
                class="demo-form-inline">
                <el-form-item prop="nameNum">
                    <el-input size="small" placeholder="输入商品名称／货号查询" v-model="formData.nameNum"></el-input>
                </el-form-item><el-form-item prop="cateIds">
                    <categoryTag v-model='formData.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
                </el-form-item><el-form-item prop="frozenFlag">
                    <el-select size="small" v-model="formData.frozenFlag" placeholder="是否冻品">
                        <el-option label="是否冻品" value="-1"></el-option>
                        <el-option label="冻品" value="1"></el-option>
                        <el-option label="鲜品" value="2"></el-option>
                    </el-select>
                </el-form-item><el-form-item prop="priceMethod" class="z-mr30">
                    <el-select size="small" v-model="formData.priceMethod" placeholder="定价方式">
                        <el-option label="定价方式" value="-1"></el-option>
                        <el-option label="询报价" value="1"></el-option>
                        <el-option label="一口价" value="2"></el-option>
                        <el-option label="面议" value="3"></el-option>
                    </el-select>
                </el-form-item><el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">
                        查询
                    </el-button>
                    <el-button class="xe-button-normal"  @click="resetForm('formData')">
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
                            <el-form-item prop="nameNum" label="商品名称／货号" label-width="96px">
                                <el-input size="small" v-model="formData.nameNum" placeholder="输入商品名称／货号" style="width:250px;"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="cateIds" label="商品分类">
                                <categoryTag v-model='formData.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
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
                            <el-form-item prop="priceMethod" label="定价方式">
                                <el-select size="small" v-model="formData.priceMethod" placeholder="定价方式">
                                    <el-option label="定价方式" value="-1"></el-option>
                                    <el-option label="询报价" value="1"></el-option>
                                    <el-option label="一口价" value="2"></el-option>
                                    <el-option label="面议" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item>
                                <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                                <el-button class="xe-button-normal"  @click="resetForm('formData')">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
            <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="grounding">
                <span class="iconfont icon-xiajia"></span> 下架
            </el-button>
            <el-button class="xe-button-normal" v-loading="outInloading" @click="outData">
                <span class="iconfont icon-daochu"></span> 导出
            </el-button>
        </div>
        <!-- {{list}} -->
        <div class="goodsTable">
                <el-table
                    :data="list"
                    style="width: 100%"
                    border
                    @selection-change="handleSelectionChange"
                    >
                    <el-table-column type="expand">
                        <template scope="props">
                            <div class="demo-table-expand"  v-if="props.row.skuList">
                                <ul class="table-in-listUl">
                                    <li v-for="item in props.row.skuList" class="table-in-list">
                                        <div class="clearfix">
                                            <div class="table-detail-box clearfix">
                                                <el-tooltip class="item" effect="dark" placement="top">
                                                    <div slot="content">{{item.specValue | noneToText}}</div>
                                                    <p style="width:180px;">规格型号：{{item.specValue | noneToText}}</p>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" placement="top">
                                                    <div slot="content">{{item.proSku}}</div>
                                                    <p style="width:186px;">sku编码：{{item.proSku}}</p>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" placement="top">
                                                    <div slot="content">{{item.proNum}}</div>
                                                    <p style="width:186px;">货号：{{item.proNum}}</p>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" placement="top">
                                                    <div slot="content">{{item.grossWeight}} Kg</div>
                                                    <p style="width:110px;">重量：{{item.grossWeight}} Kg</p>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" placement="top">
                                                    <div slot="content">{{item.saleQuantity}}</div>
                                                    <p style="width:150px;">销售库存：{{item.saleQuantity}}</p>
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" placement="top">
                                                    <div slot="content">{{item.minQuantity}}</div>
                                                    <p style="width:130px;">起订量：{{item.minQuantity}}</p>
                                                </el-tooltip>
                                            </div>
                                            <p class="expand-td-last"><a href="javascript:;" class="s-blue" @click="editSku(item)">修改</a></p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column type="selection" width="34" class-name="selectionTd">
                    </el-table-column>
                    <el-table-column label="商品图片" width="100">
                        <template scope="props">
                            <div class="z-imgbox">
                                <img :src="picServer + props.row.skuList[0].proMainImg" alt="商品图片" width="60" height="60">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" prop="proName" width="">
                    </el-table-column>
                    <el-table-column label="商品分类" prop="cateName" width="">
                    </el-table-column>
                    <el-table-column label="商品品牌" prop="brandName" width="">
                    </el-table-column>
                    <!-- <el-table-column label="供货商" prop="supplierName" width="">
                    </el-table-column> -->
                    <el-table-column label="是否冻品" prop="frozenFlag" width="85">
                        <template scope="props">
                            {{props.row.frozenFlag | frozenFlagToText}}
                        </template>
                    </el-table-column>
                    <el-table-column label="定价方式" prop="priceMethod" width="85">
                        <template scope="props">
                            {{props.row.priceMethod | priceMethods}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"  width="66" fixed="right">
                        <template scope="props">
                                <a href="javascript:;" class="s-blue" @click="editSpu(props.row)">修改</a>
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
        <div class="add-fromKu reset-dialog">
            <el-dialog title="修改商品信息" :visible.sync="dialogVisible">
                <el-form :model="formDataDiolog">
                    <el-form-item label="销售库存" :label-width="xeLabelWidth80">
                        <el-input size="small" :maxlength="8" v-model.number="formDataDiolog.saleQuantity" @blur="numberFix($event, 1)" placeholder="请输入数字" class="zy-input-normal" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="起订量" :label-width="xeLabelWidth80">
                        <el-input size="small" :maxlength="8" v-model.number="formDataDiolog.minQuantity" @blur="numberFix($event, 2)" placeholder="请输入数字" class="zy-input-normal" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" @click="save">保存</el-button>
                    <el-button class="xe-button-normal" @click="dialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import categoryTag from '@/components/category/category';
    export default {
        name: 'saleProList',
        data() {
            return {
                dialogVisible: false,
                outInloading: false,
                outerUrl: '',
                formData: {
                    nameNum: '',
                    proNum: '',
                    cateIds: [],
                    // cateId: '-1',
                    proName: '',
                    priceMethod: '-1',
                    frozenFlag: '-1'
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 1
                },
                formDataDiolog: {
                    proSku: '',
                    saleQuantity: '',
                    minQuantity: '',
                    proSpu: ''
                },
                list: [],
                picServer: '',
                multipleSelection: []
            };
        },
        created() {
            this.creatInf(1, this.formData);
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
            numberFix(event, type) {
                let val = parseInt(event.target.value);
                if (!(val > 0)) {
                    val = '';
                }
                event.target.value = val;
                if (type === 1) {
                    this.formDataDiolog.saleQuantity = val;
                };
                if (type === 2) {
                    this.formDataDiolog.minQuantity = val;
                };
            },
            save() {
                let saleQuantityval = this.formDataDiolog.saleQuantity;
                let minQuantityval = this.formDataDiolog.minQuantity;
                if (!(saleQuantityval > 0) || !(minQuantityval > 0)) {
                    this.$xeMessage.warning('请认真核对填写内容！');
                    return false;
                }
                console.log(this.formDataDiolog);
                this.$http({ // 修改sku的销售库存和起订量
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proOnSale/updSkuQuantity',
                    data: this.formDataDiolog
                }).then((res) => {
                    if (res.status === '0000') {
                        this.$xeMessage.success(res.msg);
                        this.dialogVisible = false;
                        for (var i = 0; i < this.list.length; i++) {
                            if (this.list[i].proSpu === this.formDataDiolog.proSpu) {
                                for (var j = 0; j < this.list[i].skuList.length; j++) {
                                    console.log(this.list[i].skuList[j].saleQuantity);
                                    if (this.list[i].skuList[j].proSku === this.formDataDiolog.proSku) {
                                        this.list[i].skuList[j].saleQuantity = this.formDataDiolog.saleQuantity;
                                        this.list[i].skuList[j].minQuantity = this.formDataDiolog.minQuantity;
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
                    this.$xeMessage.warning(error.msg);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            grounding(spu) { // 批量xia架商品
                const _this = this;
                if (this.multipleSelection.length === 0) {
                    this.$xeMessage.warning('请选择');
                    return;
                }
                const spusArr = [];
                _this.multipleSelection.forEach(function(value) {
                    spusArr.push(value.proSpu);
                });
                this.$confirm('确定下架该商品？该商品下架后所有规格都将下架！', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-pro/ven/proOnSale/venProUpOrDownBatch',
                        data: {
                            spus: spusArr.join('-'),
                            upFlag: 2
                        }
                    }).then((res) => {
                        if (res.status === '0000') {
                            this.$xeMessage.success(res.msg);
                            setTimeout(function () {
                                _this.creatInf(_this.pageInfo.pageNum, _this.formData);
                            }, 300);
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            editSpu(row) {
                console.log(row);
                this.$router.push({name: 'proReleaseEditor', params: {'type': 'edit', 'proSpu': row.proSpu}});
            },
            editSku(info) {
                console.log(info.proSpu);
                this.formDataDiolog.proSku = info.proSku;
                this.formDataDiolog.saleQuantity = info.saleQuantity;
                this.formDataDiolog.minQuantity = info.minQuantity;
                this.formDataDiolog.proSpu = info.proSpu;
                this.dialogVisible = true;
            },
            handleClose(done) {
                this.dialogVisible = false;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.creatInf(this.pageInfo.pageNum, this.formData);
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.creatInf(this.pageInfo.pageNum, this.formData);
            },
            creatInf(pageNum, formData) {
                let data = {};
                data = formData;
                data.cateId = this.cateId;
                data.pageNum = pageNum;
                data.pageSize = this.pageInfo.pageSize;
                console.log(this.formData);
                this.outerUrl = '/xe-route/xe-pro/ven/proOnSale/exportVenProOnSale?nameNum=' + this.formData.nameNum + '&cateId=' + this.cateId + '&priceMethod=' + this.formData.priceMethod + '&frozenFlag=' + this.formData.frozenFlag;
                this.$http({ // 查询在售商品
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proOnSale/listVenProOnSale',
                    data: formData
                }).then((res) => {
                    if (res.data) {
                        this.list = res.data.list;
                        this.pageInfo = res.data.pageInfo;
                        this.picServer = res.data.picServer;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        filters: {
            priceMethods(val) {
                let pricesource = 'val';
                switch (val) {
                    case 1: {
                        pricesource = '询报价';
                        break;
                    }
                    case 2: {
                        pricesource = '一口价';
                        break;
                    }
                    case 3: {
                        pricesource = '面议';
                        break;
                    }
                }
                return pricesource;
            },
            frozenFlagFn(val) {
                let frozenFlagsource = 'val';
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
            }
        },
        components: {
            categoryTag
        }
    };
</script>
<style lang="scss">
</style>
