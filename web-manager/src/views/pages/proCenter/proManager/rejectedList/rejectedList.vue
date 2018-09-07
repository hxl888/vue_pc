 <template lang="html">
    <div class="m-router-con">
        <!-- 待审核商品 -->
        <div class="u-top-search">
        	<el-form :inline="true" :model="searchform" ref="searchform1" class="demo-form-inline">
                <el-form-item prop="nameNum">
                    <el-input size="small" placeholder="商品名称/货号/编号查询"  class="xe-input-l40" v-model="searchform.nameNum"></el-input>
                </el-form-item>
                <el-form-item prop="venAccountShop">
                    <el-input size="small" placeholder="商户名称/商户账号/店铺名称查询"  class="xe-input-l40" v-model="searchform.venAccountShop"></el-input>
                </el-form-item>
                <el-form-item prop="cateIdArray">
                     <categoryTag v-model='cateIdArray' :width='140' :changeOnSelect="true" :filterable="true"></categoryTag>
                </el-form-item>
                <el-form-item prop="priceMethod">
                    <el-select size="small" v-model="searchform.priceMethod"  class="xe-input-l40" placeholder="定价方式">
                        <el-option
                          v-for="item in priceMethodlist"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="z-marL20">
                    <el-button class="xe-button-normal" type="primary" @click="queryTabData">查询</el-button>
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
                                <categoryTag v-model='cateIdArray' :width='168' :changeOnSelect="true" :filterable="true"></categoryTag>
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
        <!--<div class="u-opera-btnBox" >-->
            <!--<el-button class="xe-button-normal">-->
                <!--<span class="iconfont icon-daochu"></span> 导出-->
            <!--</el-button>-->
        <!--</div>-->
        <div class="goodsTable">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    border
                    v-loading="tableDataLoading"
                    :default-expand-all="false">
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
                    <el-table-column label="商品图片" min-width="95">
                        <template scope="props">
                            <div class="z-imgbox">
                                <img :src="picServer + props.row.skuList[0].proMainImg" width="60" height="60">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" prop="proName" min-width="210">
                    </el-table-column>
                    <el-table-column label="商品分类" prop="cateName" min-width="210">
                    </el-table-column>
                    <el-table-column label="商户名称" prop="venName" min-width="130">
                    </el-table-column>
                    <el-table-column label="商户账号" prop="venAccount" min-width="130">
                    </el-table-column>
                    <el-table-column label="店铺名称" prop="shopName" min-width="130">
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
                    <el-table-column label="审核状态" prop="proStatus" width="104">
                        <template scope="scope">
                            <div>
                                {{scope.row.proStatus | venSatatusfiter}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="驳回原因" prop="rejectReason" width="150">
                        <template scope="scope">
                            <div style="max-height: 66px;overflow: hidden">
                                <el-tooltip effect="dark"  placement="top" v-if="scope.row.rejectReason">
                                    <!--<div slot="content">{{scope.row.rejectReason.substr(0, 50)}}<br/>{{scope.row.rejectReason.substr(50, 50)}}<br/>{{scope.row.rejectReason.substr(100, 50)}}<br/>{{scope.row.rejectReason.substr(150, 50)}}</div>-->
                                    <div slot="content">{{scope.row.rejectReason.substr(0, 50)}}<span v-if="scope.row.rejectReason.substr(50, 50)"><br/>{{scope.row.rejectReason.substr(50, 50)}}</span><span v-if="scope.row.rejectReason.substr(100, 50)"><br/>{{scope.row.rejectReason.substr(100, 50)}}</span> <span v-if="scope.row.rejectReason.substr(150, 50)"><br/>{{scope.row.rejectReason.substr(150, 50)}}</span></div>
                                    <div>{{scope.row.rejectReason}}</div>
                                </el-tooltip>
                            </div>
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
import {priceMethod, frozenFlag} from '@/dataControl.js';
import categoryTag from '@/components/category/category';
export default {
    mixins: [permission],
    data() {
        return {
            permissionObj: {},
            cateIdArray: null,
            picServer: '',
            searchform: {
                nameNum: '',
                venAccountShop: '',
                cateId: null,
                priceMethod: '',
                proStatus: 3,
                proName: '',
                proNum: '',
                venName: '',
                shopName: '',
                venAccount: '',
                frozenFlag: '',
                spuSkuNum: ''
            },
            tableDataLoading: false,
            tableData: [],
            pagelist: {
                currPage: 1,
                pageSize: 10,
                total: 0
            },
            options: [],
            props: {
                label: 'cateName',
                value: 'cateId'
            },
            parentId: 0
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        queryTabData() {
            console.log('submit!');
            this.enquiryForm();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.cateIdArray = [];
            this.enquiryForm();
        },
        editSpu(row) {
            this.$router.push({name: 'rejectuditdetails', query: {proSpu: row.proSpu}});
        },
        enquiryForm() {
            let params = {};
            this.tableDataLoading = true;
            params = this.searchform;
            if (this.cateIdArray) {
                let cateId = this.cateIdArray;
                params.cateId = cateId.slice(cateId.length - 1, cateId.length).join(',');
            }
            params.pageNum = this.pagelist.currPage;
            params.pageSize = this.pagelist.pageSize;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/proAudit/listVenProAuditData',
                data: params
            }).then((res) => {
                console.log('----!!>', res);
                this.pagelist.total = res.data.pageInfo.total;
                this.tableData = res.data.list;
                this.picServer = res.data.picServer;
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
        priceMethodlist() {
            return priceMethod;
        },
        frozenFlaglist() {
            return frozenFlag;
        }
    },
    components: {
        categoryTag
    }
};
</script>
