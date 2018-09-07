<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
                <el-form :inline="true" :model="searchform" ref="searchform1" class="demo-form-inline">
                    <el-form-item prop="userCode" label="">
                        <el-select size="small" v-model="searchform.userCode" :filterable="true" placeholder="供应商名称">
                                <el-option
                                v-for="item in venNameList"
                                :label="item.venName"
                                :key="item.userCode"
                                :value="item.userCode">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="入账时间" prop="" class="marR0" style="margin-left: 20px">
                        <el-date-picker
                            v-model="value1"
                            class="xe-input-168"
                            type="datetime"
                            placeholder="选择日期"
                            >
                        </el-date-picker>
                        <span class="data-bor">-</span>
                    </el-form-item>
                    <el-form-item prop="endDate">
                        <el-date-picker
                            v-model="value2"
                            class="xe-input-168"
                            type="datetime"
                            placeholder="选择日期"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="z-marL20">
                        <el-button class="xe-button-normal" type="primary" @click="listSysPayBillRecord">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('searchform1')">重置</el-button>
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
                        <div class="clearfix">
                            <el-form-item label="入账时间" prop="startDate" class="marR0">
                                <el-date-picker
                                    v-model="value1"
                                    class="xe-input-168"
                                    type="datetime"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDate">
                                <el-date-picker
                                    v-model="value2"
                                    class="xe-input-168"
                                    type="datetime"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                            <el-form-item prop="userCode" label="供应商名称">
                                <el-select size="small" v-model="searchform.userCode" style="width: 168px" :filterable="true" placeholder="供应商名称">
                                        <el-option
                                        v-for="item in venNameList"
                                        :label="item.venName"
                                        :key="item.userCode"
                                        :value="item.userCode">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="cateIdArray" label="商品分类">
                                <categoryTag v-model='cateIdArray' :width='168' :changeOnSelect="true" :filterable="true"></categoryTag>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                            <el-form-item prop="proName" label="商品名称">
                                <el-input size="small" placeholder="商品名称" style="width: 168px" v-model="searchform.proName" class="">
                                  </el-input>
                            </el-form-item>
                              <el-form-item prop="proNum" label="商品货号">
                                <el-input size="small" placeholder="商品货号" style="width: 168px" v-model="searchform.proNum" class="">
                                  </el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                             <el-form-item prop="mobile" label="供应商账号">
                                <el-input size="small" placeholder="供应商账号" style="width: 168px" v-model="searchform.mobile" class="">
                                  </el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="listSysPayBillRecord">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button @click="exportDataMethod"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button>
            <span style="color: #ff4949;">&nbsp;&nbsp;&nbsp;&nbsp;*以下显示昨天平台供应商的佣金入账。*金额=此商户下此sku符合时间段内产生佣金合计。不含税金额=金额/1.06。税额=金额-不含税金额</span>
        </div>
        <div>
            <el-table ref="xeFinPayRecordList" :summary-method="summaryMethod" :data="xeFinPayRecordList" show-summary border v-loading="dataListloading" @selection-change="handleSelectionChange">
                <el-table-column  min-width="65" >
                    <template scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="50"></el-table-column>
                    <el-table-column prop="createDate" label="生成入账时间" min-width="150">
                        <template scope="scope">
                            <div v-if="scope.row.createDate">
                                {{scope.row.createDate | millisecondFormat('ms')}}
                            </div>
                        </template>
                    </el-table-column>
                <el-table-column prop="venName" label="供应商名称" min-width="150"></el-table-column>
                <el-table-column prop="mobile" label="供应商账号" min-width="150">
                </el-table-column>
                <el-table-column prop="venType" label="商户类型" min-width="160">
                    <template scope="scope">
                        <div>
                            {{scope.row.venType | venTypefiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="orgName" label="商品分类" min-width="100">
                </el-table-column>
                <el-table-column prop="proName" label="商品名称" min-width="150"></el-table-column>
                <el-table-column prop="specValue" label="规格" min-width="100">
                </el-table-column>
                <el-table-column prop="proNum" label="货号" min-width="150">
                </el-table-column>
                <el-table-column prop="sumAmount" label="金额（佣金）" min-width="130">
                    <template scope="scope">
                        <div v-if="scope.row.sumAmount">
                            ￥{{parseFloat(scope.row.sumAmount).toFixed(2)}}
                        </div>
                        <div v-else>￥0.00</div>
                    </template>
                </el-table-column>
                <el-table-column prop="taxFree" label="不含税额" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.taxFree">
                            ￥{{parseFloat(scope.row.taxFree).toFixed(2)}}
                        </div>
                        <div v-else>￥0.00</div>
                    </template>
                </el-table-column>
                <el-table-column prop="tax" label="税额" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.tax">
                            ￥{{parseFloat(scope.row.tax).toFixed(2)}}
                        </div>
                        <div v-else>￥0.00</div>
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
import { millisecondFormat } from 'utils';
import categoryTag from '@/components/category/category';
export default {
    data() {
        return {
            searchform: {
                userCode: '',
                proOrgCode: '',
                createDateStart: '',
                createDateEnd: '',
                proName: '',
                proNum: '',
                mobile: ''
            },
            exportData: '',
            cateIdArray: [],
            venNameList: [],
            xeFinPayRecordList: [],
            value1: '',
            value2: '',
            dataListloading: false,
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            selecRowIndex: '', // 编辑点击获取对应下标
            loading: false, // 保存loading
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.listSysPayBillRecord();
        this.getVenInfoByVenName();
    },
    methods: {
        summaryMethod(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                if (index === 10 || index === 11 || index === 12) {
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return (prev * 10000 + curr * 10000) / 10000;
                            } else {
                                return prev;
                            }
                        }, 0);
                    } else {
                        sums[index] = '';
                    }
                }
            });
            for (let i = 9, len = sums.length; i < len; i++) {
                if (sums[i]) {
                    sums[i] = '￥' + parseFloat(sums[i]).toFixed(2);
                }
            }
            return sums;
        },
        getVenInfoByVenName() { // 供应商名称
            let params = {};
            params.venName = '';
            params.pageFlag = 2;
            params.venType = 2;
            params.pageNum = '';
            params.pageSize = '';
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/orderInfo/getVenInfoByVenName`,
                data: params
            }).then((res) => {
                this.venNameList = res.data.venInfoList;
            }).catch((error) => {
                console.log(error);
            });
        },
        listSysPayBillRecord() {
            let params = {};
            this.dataListloading = true;
            params = this.searchform;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            if (this.value1) {
                params.createDateStart = millisecondFormat(this.value1.getTime(), 'ms');
            } else {
                params.createDateStart = '';
            }
            if (this.value2) {
                params.createDateEnd = millisecondFormat(this.value2.getTime(), 'ms');
            } else {
                params.createDateEnd = '';
            }
            if (this.cateIdArray.length) {
                let cateId = this.cateIdArray;
                params.proOrgCode = cateId.slice(cateId.length - 1, cateId.length).join(',');
            } else {
                params.proOrgCode = '';
            }
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
                url: `${this.productUrl}/manager/payBillRecord/listSysPayBillRecord`,
                data: params
            }).then((res) => {
                this.dataListloading = false;
                this.pagelist.total = res.data.pageInfo.total;
                this.xeFinPayRecordList = res.data.xeFinPayRecordList;
                if (this.xeFinPayRecordList && this.xeFinPayRecordList.length) {
                    this.xeFinPayRecordList.forEach(item => {
                        item.taxFree = parseFloat((item.sumAmount * 10000) / (1.06 * 10000)).toFixed(2);
                        item.tax = parseFloat(item.sumAmount - (item.sumAmount * 10000) / (1.06 * 10000)).toFixed(2);
                    });
                }
            }).catch((error) => {
                console.log(error);
                this.dataListloading = false;
            });
        },
        goBack() {
            this.$router.go(-1);
        },
        handleSelectionChange(val) {
            this.selectedArray = val;
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.listSysPayBillRecord();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.listSysPayBillRecord();
            }
        },
        resetForm(formName) {
            this.value1 = '';
            this.value2 = '';
            this.cateIdArray = [];
            this.$refs[formName].resetFields();
            this.listSysPayBillRecord();
        },
        exportDataMethod() { // 导出
            window.open(`${this.productUrl}/manager/payBillRecord/exportSysPayBillRecord?${this.exportData}`);
        }
    },
    components: {
        categoryTag
    }
};
</script>
