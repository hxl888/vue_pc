<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <!-- {{formData}} -->
            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                <el-form-item prop="nameNum">
                    <el-input size="small" placeholder="输入商品名称／货号查询" v-model="formData.nameNum"></el-input>
                </el-form-item><el-form-item prop="proStatus">
                    <el-select size="small" v-model="formData.proStatus" placeholder="审核状态">
                        <el-option label="审核状态" value="-1"></el-option>
                        <el-option label="待审核" value="1"></el-option>
                        <el-option label="已审核" value="2"></el-option>
                        <el-option label="已驳回" value="3"></el-option>
                    </el-select>
                </el-form-item><el-form-item prop="priceMethod">
                    <el-select size="small" v-model="formData.priceMethod" placeholder="定价方式">
                        <el-option label="全部" value="-1"></el-option>
                        <el-option label="一口价" value="2"></el-option>
                        <el-option label="询报价" value="1"></el-option>
                        <el-option label="面议" value="3"></el-option>
                    </el-select>
                </el-form-item><el-form-item prop="frozenFlag" class="z-mr30">
                    <el-select size="small" v-model="formData.frozenFlag" placeholder="是否冻品">
                        <el-option label="是否冻品" value="-1"></el-option>
                        <el-option label="冻品" value="1"></el-option>
                        <el-option label="鲜品" value="2"></el-option>
                    </el-select>
                </el-form-item><el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">
                        查询
                    </el-button><el-button class="xe-button-normal"  @click="resetForm('formData')">
                        重置
                    </el-button><el-button class="xe-button-normal" @click.stop="searchFormbut = true">
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
                            <el-form-item prop="proStatus" label="审核状态">
                                <el-select size="small" v-model="formData.proStatus" placeholder="审核状态">
                                    <el-option label="审核状态" value="-1"></el-option>
                                    <el-option label="待审核" value="1"></el-option>
                                    <el-option label="审核通过" value="2"></el-option>
                                    <el-option label="审核驳回" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="priceMethod" label="定价方式">
                                <el-select size="small" v-model="formData.priceMethod" placeholder="定价方式">
                                    <el-option label="全部" value="-1"></el-option>
                                    <el-option label="一口价" value="2"></el-option>
                                    <el-option label="询报价" value="1"></el-option>
                                    <el-option label="面议" value="3"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="frozenFlag" label="是否冻品">
                                <el-select size="small" v-model="formData.frozenFlag" placeholder="是否冻品">
                                    <el-option label="是否冻品" value="-1"></el-option>
                                    <el-option label="冻品" value="1"></el-option>
                                    <el-option label="鲜品" value="2"></el-option>
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
        <div class="u-opera-btnBox clearfix">
            <div class="fl">
                <el-button class="xe-button-normal" @click="submitStatus" v-if="auditFlag !== 1">
                    <span class="iconfont icon-shenhe"></span> 提交审核
                </el-button>
                <el-button class="xe-button-normal" @click="copytoAdd">
                    <span class="iconfont icon-fuzhibingxinzeng"></span> 复制并新增
                </el-button>
                <el-button class="xe-button-normal" @click="editCate">
                    <span class="iconfont icon-xiugai"></span> 修改分类
                </el-button>
                <el-button class="xe-button-normal" @click="deletlot">
                    <span class="iconfont icon-shanchu"></span> 删除
                </el-button>
                <!-- <el-button class="xe-button-normal">
                    <span class="iconfont icon-daochu"></span> 导出
                </el-button> -->
            </div>
            <div class="fr">
                <el-button class="xe-button-normal" @click="linktoReleaseIndex">
                    <span class="iconfont icon-querenjieshou"></span> 发布商品
                </el-button>
                <el-button class="xe-button-normal" @click="linktoRecycle">
                    <span class="iconfont icon-huishouzhan"></span> 回收站
                </el-button>
                <el-button class="xe-button-normal" @click="linktodraft">
                    <span class="iconfont icon-dingdan"></span> 草稿箱
                </el-button>
            </div>
        </div>
        <div class="goodsTable goodsTableTree clearfix">
            <div class="goodsTree">
                <!-- {{formData.cateId}} -->
                <h4>商品分类</h4>
                <el-tree
                    :data="treeData"
                    :props="defaultProps"
                    node-key="cateId"
                    show-checkbox
                    ref="tree"
                    :expand-on-click-node="false"
                    @check-change="getCheckedKeys"
                    >
                </el-tree>
            </div>
            <!-- {{multipleSelection}} -->
            <el-table
                :data="list"
                style="width: 100%"
                border
                @selection-change="handleSelectionChange"
                v-loading="tableLoading"
                element-loading-text="拼命加载中..."
                >
                <el-table-column type="expand">
                    <template scope="props">
                        <div class="demo-table-expand"  v-if="props.row.skuList">
                            <ul class="table-in-listUl" style="border-right: none;">
                                <li v-for="item in props.row.skuList" class="table-in-list">
                                    <div class="clearfix">
                                        <div class="table-detail-box clearfix">
                                            <el-tooltip class="item" effect="dark" placement="top">
                                                <div slot="content">{{item.specValue}}</div>
                                                <p style="width:120px;">规格型号：{{item.specValue | noneToText}}</p>
                                            </el-tooltip>
                                            <p style="width:186px;" :title="item.proSku">sku编码：{{item.proSku}}</p>
                                            <p style="width:186px;" :title="item.proNum">货号：{{item.proNum}}</p>
                                            <p style="width:90px;" :title="item.grossWeight">重量：{{item.grossWeight}} Kg</p>
                                            <p style="width:150px;" :title="item.saleQuantity">销售库存：{{item.saleQuantity}}</p>
                                            <p style="width:110px;" :title="item.minQuantity">起订量：{{item.minQuantity}} </p>
                                        </div>
                                        <p class="expand-td-last"><a href="javascript:;" class="s-blue" @click="deletsku(item)">删除</a></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="34" class-name="selectionTd">
                </el-table-column>
                <el-table-column label="商品图片" width="100">
                    <!-- 商品图片{{props.row.img}} -->
                    <template scope="props">
                        <!-- 商品图片{{props.row.img}} -->
                        <div class="z-imgbox">
                            <img :src='picServer + props.row.skuList[0].proMainImg' alt="商品图片" width="60" height="60">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" prop="proName" min-width="150">
                </el-table-column>
                <el-table-column label="商品分类" prop="categoryName" min-width="150">
                </el-table-column>
                <el-table-column label="商品品牌" prop="brandName" min-width="85">
                </el-table-column>
                <el-table-column label="是否冻品" prop="frozenFlag" min-width="85">
                    <template scope="props">
                        {{props.row.frozenFlag | frozenFlagToText}}
                    </template>
                </el-table-column>
                <el-table-column label="是否上架" prop="upFlag" min-width="85">
                    <template scope="props">
                        {{props.row.upFlag | upFlagToText}}
                    </template>
                </el-table-column>
                <el-table-column label="定价方式" prop="priceMethod" min-width="85">
                        <template scope="props">
                            {{props.row.priceMethod | priceMethods}}
                        </template>
                    </el-table-column>
                <el-table-column label="审核状态" prop="proStatus" min-width="85">
                    <template scope="props">
                        {{props.row.proStatus | proStatusToText}}
                        <el-tooltip effect="dark" placement="top" v-if="props.row.proStatus === 3">
                            <div slot="content" class="tips-item">{{props.row.rejectReason}}</div>
                            <a href="javascript:;" class="s-blue">驳回原因</a>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="110">
                    <template scope="props">
                        <div class="btn-in-table">
                            <a href="javascript:;" class="s-blue" @click="editBtn(props.row.proSpu)">修改</a>
                            <a href="javascript:;" class="s-blue" @click="deletSingle(props)">删除</a>
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
        <!-- <el-button class="xe-button-normal" type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="修改分类" :visible.sync="dialogVisible">
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
                        <el-table-column label="商品名称" prop="proName">
                        </el-table-column>
                        <el-table-column label="分类" prop="categoryName">
                        </el-table-column>
                    </el-table>
                    <div>
                        <h5 class="changeCateTitle">商品分类</h5>
                        <categoryTag v-model='formDataDiolog.cateIds' :changeOnSelect="false" :width='270'></categoryTag>
                    </div>
                    </el-form-item>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" @click="save()">保存</el-button>
                    <el-button class="xe-button-normal" @click="dialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import categoryTag from '@/components/category/category';
export default {
    name: 'proOverView',
    data() {
        return {
            dialogVisible: false,
            tableLoading: false,
            formData: {
                nameNum: '',
                proStatus: '-1',
                priceMethod: '',
                frozenFlag: '',
                proName: '',
                proNum: '',
                supplierId: '',
                cateId: ''
            },
            pageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            treeData: [],
            defaultProps: {
                children: 'childList',
                label: 'cateName'
            },
            formDataDiolog: {
                cateIds: []
            },
            picServer: '',
            auditFlag: 1,
            list: [],
            multipleSelection: []
        };
    },
    created() {
        this.creatListCate();
        this.creatInf(1, this.formData);
    },
    methods: {
        onSubmit() {
            console.log('submit!');
            this.creatInf(1, this.formData);
        },
        editCate() {
            if (this.multipleSelection.length === 0) {
                this.$xeMessage.warning('请选择一个商品！');
                return;
            }
            this.dialogVisible = true;
        },
        save() {
            let _this = this;
            console.log('test');
            if (!this.cateId) {
                this.$xeMessage.warning('请选择分类');
                return;
            }
            const spuArrayArr = [];
            for (var i = 0; i < _this.multipleSelection.length; i++) {
                let value = _this.multipleSelection[i];
                spuArrayArr.push({
                    proSpu: value.proSpu,
                    cateId: this.cateId
                });
            }
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/ven/proList/updateVenProCategoryBatch',
                data: {
                    spuArray: spuArrayArr
                }
            }).then((res) => {
                if (res.status === '0000') {
                    this.$xeMessage.success(res.msg);
                    setTimeout(function () {
                        _this.creatInf(_this.pageInfo.pageNum, _this.formData);
                    }, 300);
                    this.dialogVisible = false;
                } else {
                    this.$xeMessage.warning(res.msg);
                }
            }).catch((error) => {
                console.log(error);
                this.$xeMessage.error(error.msg);
            });
        },
        submitStatus() {
            console.log('submitStatus');
            const _this = this;
            let nextFlag = true;
            if (this.multipleSelection.length === 0) {
                this.$xeMessage.warning('请选择');
                return;
            }
            const spuArrayArr = [];
            for (var i = 0; i < _this.multipleSelection.length; i++) {
                let value = _this.multipleSelection[i];
                if (value.proStatus !== 3) {
                    _this.$xeMessage.warning('选择项里只能有审核驳回状态的商品！');
                    nextFlag = false;
                    break;
                }
                spuArrayArr.push({
                    proSpu: value.proSpu
                });
            }
            if (nextFlag) {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proList/updateVenProStatusBatch',
                    data: {
                        spuArray: spuArrayArr
                    }
                }).then((res) => {
                    if (res.status === '0000') {
                        this.$xeMessage.success(res.msg);
                        for (var k = 0; k < this.multipleSelection.length; k++) {
                            const proSpu = this.multipleSelection[k].proSpu;
                            for (var j = 0; j < _this.list.length; j++) {
                                if (_this.list[j].proSpu === proSpu) {
                                    this.list[j].proStatus = 1;
                                }
                            }
                        }
                    } else {
                        this.$xeMessage.warning(res.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                    this.$xeMessage.error(error.msg);
                });
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getCheckedKeys() {
            this.formData.cateId = this.$refs.tree.getCheckedKeys().join(',');
            // this.formData.cateId = this.treeList.join(',');
        },
        editBtn(proSpu) {
            this.$router.push({name: 'proReleaseEditor', params: {'type': 'edit', 'proSpu': proSpu}});
        },
        deletsku(list) { // 删除sku
            let _this = this;
            console.log(list.proSku);
            this.$confirm('确定要对该商品规格进行删除操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proList/deleteProSku',
                    data: {
                        proSku: list.proSku
                    }
                }).then((res) => {
                    if (res.status === '0000') {
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.creatInf(_this.pageInfo.pageNum, _this.formData);
                        }, 300);
                    } else {
                        this.$xeMessage.warning(res.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }).catch((cancel) => {
                console.log(cancel);
            });
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
        delet(param) {
            console.log('param', param);
            var _this = this;
            this.$http({ // 删除商品属性 xe-route/xe-pro/
                method: 'post',
                url: '/xe-route/xe-pro/ven/proList/deleteVenProBatch',
                data: {
                    spuArray: param
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
        deletSingle(list) {
            if (list.row.upFlag === 1) {
                this.$xeMessage.warning('上架中的商品不能直接删除，必须下架后才能进行删除');
                return false;
            }
            this.$confirm('确定要对该商品进行删除操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log('data', [{proSpu: list.row.proSpu}]);
                this.delet([list.row.proSpu]);
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        deletlot() {
            const _this = this;
            if (this.multipleSelection.length === 0) {
                this.$xeMessage.warning('请选择删除的商品');
                return;
            }
            for (var i = 0; i < _this.multipleSelection.length; i++) {
                let value = _this.multipleSelection[i];
                if (value.upFlag === 1) {
                    this.$xeMessage.warning('上架中的商品不能直接删除，必须下架后才能进行删除');
                    return false;
                }
            }
            this.$confirm('确定删除选中商品？是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const spuArr = [];
                _this.multipleSelection.forEach(function(value) {
                    spuArr.push(
                        value.proSpu
                    );
                });
                this.delet(spuArr);
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        creatListCate() {
            this.$http({ // 查询区域商品列表
                method: 'post',
                url: '/xe-route/xe-pro/ven/proList/toListCate',
                data: {}
            }).then((res) => {
                if (res.data) {
                    this.treeData = res.data.list;
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        copytoAdd() {
            if (this.multipleSelection.length === 0) {
                this.$xeMessage.error('请选择商品');
                return;
            }
            if (this.multipleSelection.length > 1) {
                this.$xeMessage.error('该操作只能选择一个商品');
                return;
            }
            this.$router.push({name: 'proReleaseEditor', params: {type: 'copy', proSpu: this.multipleSelection[0].proSpu}});
        },
        linktoRecycle() {
            this.$router.push({name: 'recycleBin'});
        },
        linktodraft() {
            this.$router.push({name: 'draft'});
        },
        linktoReleaseIndex() {
            this.$router.push({name: 'proReleaseIndex'});
        },
        creatInf(pageNum, formData) {
            let data = {};
            data = formData;
            data.pageNum = pageNum;
            data.pageSize = this.pageInfo.pageSize;
            console.log(this.formData);
            this.tableLoading = true;
            this.$http({ // 查询区域商品列表
                method: 'post',
                url: '/xe-route/xe-pro/ven/proList/listVenProductData',
                data: formData
            }).then((res) => {
                if (res.data) {
                    this.tableLoading = false;
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
    computed: {
        cateId() {
            if (this.formDataDiolog.cateIds.length > 0) {
                return this.formDataDiolog.cateIds[this.formDataDiolog.cateIds.length - 1];
            } else {
                return '';
            }
        }
    },
    components: {
        categoryTag
    },
    filters: {
        statusFn(val) {
            let statussource = 'val';
            switch (val) {
                case 1: {
                    statussource = '待审核';
                    break;
                }
                case 2: {
                    statussource = '审核通过';
                    break;
                }
                case 3: {
                    statussource = '审核驳回';
                    break;
                }
            }
            return statussource;
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
        },
        priceMethods(val) {
            let pricesource = val;
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
        }
    }
};
</script>

<style lang="scss">
    .expand-td-last{
        border-right: 1px solid #ced5de;
    }
    .changeCate{
        padding: 0 20px;
        margin: 20px 0;
    }
    .changeCateTitle{
        line-height: 36px;
        font-size: 14px;
        margin-top: 10px;
    }
</style>
