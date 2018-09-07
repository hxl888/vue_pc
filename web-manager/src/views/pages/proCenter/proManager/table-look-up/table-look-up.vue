<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
        	<el-form :inline="true" :model="searchform" ref="searchform1" class="demo-form-inline">
                <el-form-item prop="nameNum">
                    <el-input size="small" placeholder="商品名称/货号/编号查询"  class="xe-input-l40" v-model="searchform.nameNum"></el-input>
                </el-form-item>
                <el-form-item prop="venAccountShop">
                    <el-input size="small" placeholder="商户名称/商户账号/店铺名称查询"  class="xe-input-l40"  v-model="searchform.venAccountShop"></el-input>
                </el-form-item>
                <el-form-item prop="cateIdArray">
                   <categoryTag v-model='cateIdArray' :width='140' :changeOnSelect="true" :filterable="true"></categoryTag>
                </el-form-item>
                <el-form-item prop="proStatus">
                    <el-select size="small" v-model="searchform.proStatus"  class="xe-input-l40" placeholder="审核状态">
                        <el-option
                          v-for="item in proStatuslist"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="z-marL20">
                    <el-button type="primary" class="xe-button-normal" @click="queryTabData">查询</el-button>
                    <el-button class="xe-button-normal"  @click="resetForm('searchform1')">重置</el-button>
                    <el-button class="xe-button-normal" @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
                </el-form-item>
            </el-form>
             <!--高级搜索样式start-->
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true"  label-width ='73px' :model="searchform" ref="searchform" class="demo-form-inline">
                        <div>
                            <el-form-item prop="proName" label="商品名称">
                                <el-input size="small" class="xe-input-168" v-model="searchform.proName" placeholder="商品名称"></el-input>
                            </el-form-item>
                            <el-form-item prop="venName" label="商户名称">
                                <el-input size="small" class="xe-input-168"  v-model="searchform.venName" placeholder="商户名称"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="proNum" label="商品货号">
                                <el-input size="small" class="xe-input-168"   v-model="searchform.proNum" placeholder="商品货号"></el-input>
                            </el-form-item>
                            <el-form-item prop="venAccount" label="商户账号">
                                <el-input size="small" class="xe-input-168"   v-model="searchform.venAccount" placeholder="商户账号"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="spuSkuNum" label="商品编号">
                                <el-input size="small" class="xe-input-168"   v-model="searchform.spuSkuNum" placeholder="商品编号"></el-input>
                            </el-form-item>
                            <el-form-item prop="shopName" label="店铺名称">
                                <el-input size="small" class="xe-input-168"   v-model="searchform.shopName" placeholder="店铺名称"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="cateIdArray"  label="商品分类">
                                <categoryTag v-model='cateIdArray' :width='168':changeOnSelect="true" :filterable="true"></categoryTag>
                            </el-form-item>
                            <el-form-item prop="priceMethod" label="定价方式">
                                <el-select size="small" v-model="searchform.priceMethod" class="xe-input-168"  placeholder="定价方式">
                                    <el-option
                                      v-for="item in priceMethodlist"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <div>
                                <el-form-item prop="proStatus" label="审核状态">
                                    <el-select size="small" v-model="searchform.proStatus" class="xe-input-168" placeholder="审核状态">
                                        <el-option
                                          v-for="item in proStatuslist"
                                          :key="item.value"
                                          :label="item.name"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="frozenFlag" label="是否冻品">
                                    <el-select size="small" v-model="searchform.frozenFlag" class="xe-input-168" placeholder="是否冻品">
                                        <el-option
                                          v-for="item in frozenFlaglist"
                                          :key="item.value"
                                          :label="item.name"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item prop="upFlag" label="是否上架">
                                    <el-select size="small" v-model="searchform.upFlag" class="xe-input-168" placeholder="是否上架">
                                        <el-option
                                          v-for="item in upFlagStatuslist"
                                          :key="item.value"
                                          :label="item.name"
                                          :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="queryTabData">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button @click="forcedRelease">
                <span class="iconfont icon-xiajia"></span> 强制下架
            </el-button>
            <el-button @click="systemCommodity">
                <span class="iconfont icon-shezhi"></span> 设置为系统商品
            </el-button>
            <el-button @click="exportUserData">
                <span class="iconfont icon-daochu"></span> 导出
            </el-button>
        </div>
        <div class="goodsTable">
                <el-table
                    :data="tableDatas"
                    style="width: 100%"
                    border
                     v-loading="tableDataLoading"
                    :default-expand-all="false"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="expand">
                        <template scope="props">
                            <div class="demo-table-expand"  v-if="props.row.skuList">
                                <ul class="table-in-listUl">
                                    <li v-for="item in props.row.skuList" class="table-in-list">
                                        <div class="clearfix">
                                            <div class="table-detail-box clearfix">
                                                <p style="width:200px;">规格型号：{{item.specValue ? item.specValue : '无'}}</p>
                                                <p style="width:250px;">sku编码：{{item.proSku}}</p>
                                                <p style="width:250px;">货号：{{item.proNum}}</p>
                                                 <p style="width:280px;">重量：{{item.grossWeight}}</p>
                                                <p style="width:280px;">销售库存：{{item.saleQuantity}}</p>
                                                <p style="width:280px;">起订量：{{item.minQuantity}}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column type="selection" width="40" class-name="selectionTd">
                    </el-table-column>
                    <el-table-column label="商品图片" width="100">
                        <template scope="props">
                            <div class="z-imgbox">
                                <img :src=props.row.skuList[0].proMainImg alt="" width="60" height="60">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" prop="proName" min-width="150">
                    </el-table-column>
                    <el-table-column label="商品分类" prop="categoryName" min-width="120">
                    </el-table-column>
                    <el-table-column label="商户名称" prop="venName" min-width="120">
                    </el-table-column>
                    <el-table-column label="商户账号" prop="venAccount" min-width="150">
                    </el-table-column>
                    <el-table-column label="店铺名称" prop="shopName" min-width="150">
                    </el-table-column>
                    <el-table-column label="spu编码" prop="proSpu" min-width="150">
                    </el-table-column>
                    <el-table-column label="是否冻品" prop="frozenFlag" min-width="130">
                        <template scope="scope">
                            <div>{{scope.row.frozenFlag | frozenFlagtypeofiter}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="定价方式" prop="priceMethod" min-width="130">
                        <template scope="scope">
                            <div>{{scope.row.priceMethod | priceMethodfiter}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="审核状态" prop="proStatus" min-width="100">
                        <template scope="scope">
                            <div>{{scope.row.proStatus | venSatatusfiter}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否上架" prop="upFlag" min-width="100">
                        <template scope="scope">
                            <div>{{scope.row.upFlag | upFlagfiter}}</div>
                        </template>
                    </el-table-column>
                    <!-- fixed="right" -->
                    <el-table-column
                        label="操作"
                        width="66"
                        fixed="right">
                        <template scope="props">
                            <div class="btn-in-table">
                                <a href="javascript:;" class="s-blue" @click="editSpu(props.row)">查看</a>
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
import {proStatus, frozenFlag, priceMethod, upFlagStatus} from '@/dataControl';
import categoryTag from '@/components/category/category';
export default {
    mixins: [permission],
    data() {
        return {
            permissionObj: {},
            cateIdArray: null,
            searchform: {
                nameNum: '',
                venAccountShop: '',
                cateId: null,
                proStatus: '',
                priceMethod: '',
                proName: '',
                proNum: '',
                venName: '',
                shopName: '',
                venAccount: '',
                upFlag: '',
                spuSkuNum: '',
                frozenFlag: ''
            },
            exportData: '',
            tableDataLoading: false,
            tableDatas: [],
            pagelist: {
                currPage: 1,
                pageSize: 10,
                total: 0
            },
            selectedCollection: [],
            selectedCollArray: [],
            butopa: false, // 操作项开关
            upFlagUrl: '/xe-route/xe-mis/manager/proList/sheftVenProSpuBatch',
//            upFlagUrl: '/manager/proList/sheftVenProSpuBatch',
            xitong: '/xe-route/xe-mis/manager/proList/managerSetSysSpuBatch'
//            xitong: '/manager/proList/managerSetSysSpuBatch'
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        queryTabData() {
            this.enquiryForm();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.cateIdArray = [];
            this.enquiryForm();
        },
        editSpu(row) {
            this.$router.push({name: 'tableupsauditeddetai', query: {proSpu: row.proSpu}});
        },
        async enquiryForm() {
            let params = {};
            this.tableDataLoading = true;
            params = this.searchform;
            if (this.cateIdArray) {
                let cateId = this.cateIdArray;
                params.cateId = cateId.slice(cateId.length - 1, cateId.length).join(',');
            }
            params.pageNum = this.pagelist.currPage;
            params.pageSize = this.pagelist.pageSize;
            this.exportData = '';
            for (let i in params) {
                if (i !== 'pageNum' && i !== 'pageSize') {
                    if (!params[i] || params[i] === '') {
                        this.exportData += `${i}=&`;
                    } else {
                        this.exportData += `${i}=${params[i]}&`;
                    }
                }
            }
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/proList/listVenProductData',
//                url: '/manager/proList/listVenProductData',
                data: params
            }).then((res) => {
                console.log('--999--!!>', res);
                this.pagelist.total = res.data.pageInfo.total;
                this.tableDatas = res.data.list;
                let picServer = res.data.picServer;
                for (let i in this.tableDatas) {
                    for (let j in this.tableDatas[i].skuList) {
                        this.tableDatas[i].skuList[j].proMainImg = picServer + this.tableDatas[i].skuList[j].proMainImg;
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
        handleSelectionChange(val) {
            this.selectedCollection = val;
            console.log('this.selectedCollection', this.selectedCollection);
        },
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
        selectforeach(call, flag, status, tishi) { // flag 判断对应得状态值
            let _this = this;
            _this.butopa = false;
            this.selectedCollArray = [];
            console.log('selectedCollection', this.selectedCollection.length);
            if (this.selectedCollection.length > 0) {
                this.confimrFun(`确定要对商户进行${tishi}？`, () => {
                    console.log('确定点击');
                    let list = this.selectedCollection;
                    for (let i in list) {
                        if (status === '下架') {
                            if (list[i][flag] !== 3) {
                                this.selectedCollArray.push({proSpu: list[i].proSpu});
                            }
                        } else if (status === '系统') {
                            this.selectedCollArray.push(list[i].proSpu);
                        } else {
                            if (list[i][flag] === status) {
                                this.selectedCollArray.push({proSpu: list[i].proSpu});
                            }
                        }
                    }
                    if (status === '下架') {
                        list.some((item) => {
                            if (item[flag] !== 3) {
                                _this.butopa = true;
                            }
                        });
                    } else if (status === '系统') {
                        _this.butopa = true;
                    } else {
                        list.some((item) => {
                            if (item[flag] === status) {
                                _this.butopa = true;
                            }
                        });
                    }
                    if (_this.butopa) {
                        call && call();
                        console.log('9999_this.butopa', this.butopa);
                    } else {
                        this.$alert('有不符合筛选条件的商品，请仔细筛选', {
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
        async remotePublic(ULR, tishi) { // tishi（返回的接口回调的成功或者失败提示）
            let params = {};
            let _this = this;
            params.spuArray = this.selectedCollArray;
            this.$http({
                method: 'post',
                url: ULR,
                data: params
            }).then((res) => {
                console.log('-====->', res);
                this.butopa = false;
                this.selectedCollection = [];
                this.selectedCollArray = [];
                this.tableDatas = [];
                window.$wxeMessage({
                    type: 'success',
                    message: `${tishi}成功!`
                });
                setTimeout(function() {
                    _this.enquiryForm();
                }, 300);
            }).catch((error) => {
                console.log('error-->', error);
            });
        },
        forcedRelease() {
            this.selectforeach(() => {
                this.remotePublic(this.upFlagUrl, '强制下架');
            }, 'upFlag', '下架', '强制下架');
        },
        systemCommodity() { // 设置为系统商品
            this.selectforeach(() => {
                this.remotePublic(this.xitong, '设置为系统商品');
            }, '系统', '系统', '设置为系统商品');
        },
        exportUserData() { // 导出
//            console.log(this.exportData);
            window.open(`/xe-route/xe-mis/manager/proList/exportVenProductData?${this.exportData}`);
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
        },
        proStatuslist() {
            return proStatus;
        },
        priceMethodlist() {
            return priceMethod;
        },
        frozenFlaglist() {
            return frozenFlag;
        },
        upFlagStatuslist() {
            return upFlagStatus;
        }
    },
    components: {
        categoryTag
    }
};
</script>
