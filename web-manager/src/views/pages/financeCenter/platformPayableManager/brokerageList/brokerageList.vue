<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
                <el-form :inline="true" :model="searchform" ref="searchform" class="demo-form-inline">
                    <el-form-item prop="bkgeStatus">
                        <el-select size="small"  v-model="searchform.bkgeStatus" placeholder="当前发起结算状态">
                                <el-option
                                v-for="item in bkgeStatusList"
                                :label="item.name"
                                :key="item.value"
                                :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="startDate" class="marR0">
                        <el-date-picker
                            v-model="value1"
                            class="xe-input-168"
                            type="date"
                            placeholder="当前发起结算开始日期"
                            >
                        </el-date-picker>
                        <span class="data-bor">-</span>
                    </el-form-item>
                    <el-form-item prop="endDate">
                        <el-date-picker
                            v-model="value2"
                            class="xe-input-168"
                            type="date"
                            placeholder="当前发起结算结束日期"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="z-marL20">
                        <el-button class="xe-button-normal" type="primary" @click="listSysFinBkg">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
                        <el-button class="xe-button-normal" @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
                    </el-form-item>
                </el-form>
                <!--高级搜索样式start-->
            <div class="advancedSearch" @click.stop style="width: 555px">
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true"  label-width ='85px' :model="searchform" ref="searchform" class="demo-form-inline">
                        <div class="clearfix">
                            <el-form-item label="结算时间" prop="startDate" class="marR0">
                                <el-date-picker
                                    v-model="value1"
                                    class="xe-input-168"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDate">
                                <el-date-picker
                                    v-model="value2"
                                    class="xe-input-168"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="bkgeStatus" label="结算状态">
                                <el-select size="small" style="width: 168px"  v-model="searchform.bkgeStatus" placeholder="当前发起结算状态">
                                        <el-option
                                        v-for="item in bkgeStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="userCode" label="供应商名称">
                                <el-select size="small" style="width: 168px" v-model="searchform.userCode" :filterable="true" placeholder="供应商名称">
                                        <el-option
                                        v-for="item in venNameList"
                                        :label="item.venName"
                                        :key="item.userCode"
                                        :value="item.userCode">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                             <el-form-item prop="shopName" label="店铺名称">
                                <el-input size="small" style="width: 168px" placeholder="店铺名称" v-model="searchform.shopName" class="">
                                  </el-input>
                            </el-form-item>
                             <el-form-item prop="signWay" label="佣金签订方式">
                                <el-select size="small" style="width: 168px" v-model="searchform.signWay" placeholder="佣金签订方式">
                                        <el-option
                                        v-for="item in signWayList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                         <div  class="clearfix">
                            <el-form-item prop="bkgeSetWay" label="佣金设置方式">
                                <el-select size="small" style="width: 168px" v-model="searchform.bkgeSetWay" placeholder="佣金设置方式">
                                        <el-option
                                        v-for="item in bkgeSetWayList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="settleWay" label="结算方式">
                                <el-select size="small" style="width: 168px" v-model="searchform.settleWay" placeholder="结算方式">
                                        <el-option
                                        v-for="item in settleWayList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="listSysFinBkg">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
             <el-button @click="exportDataMethod"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button>
            <!--<el-button @click="exportPayBillDetail"><i class="iconfont icon-daochu"></i>&nbsp;导出明细</el-button>-->
            <el-button @click="startFinBkgeBatch"><i class="iconfont icon-faqijiesuanzhangdan"></i> 发起结算账单</el-button>
            <span style="color: #ff4949;font-size: 14px;font-weight: 600;">&nbsp;&nbsp;&nbsp;展示已签订，商户性质为”三方“的商户信息，且平台商户下的仓库类型是零采仓和分拨仓的订单可发起结算</span>
        </div>
        <!--<div style="color: #ff4949;font-size: 14px;font-weight: 600;padding: 5px 0 10px">&nbsp;&nbsp;&nbsp;&nbsp;*以下显示所有已签订，商户性质为”三方“的供应商户信息，并且平台商户的仓库类型为零采仓和分拨仓，产生的订单可发起结算</div>-->
        <div>
            <el-table ref="xeFinBkgeList" :data="xeFinBkgeList" border v-loading="dataListloading" @selection-change="handleSelectionChange">
               <el-table-column  min-width="55" fixed="left">
                    <template scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column type="selection" fixed="left" width="50"></el-table-column>
                <el-table-column prop="settleTime" label="当前发起结算时间" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.settleTime">
                            {{scope.row.settleTime, 'ms' | millisecondFormat}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="bkgeStatus" label="当前发起结算状态" min-width="150">
                    <template scope="scope">
                        <div>
                            {{scope.row.bkgeStatus | bkgeStatusfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="venName" label="供应商名称" min-width="130">
                        <template scope="scope">
                            <div v-if="scope.row.bkgeCode && scope.row.bkgeSetWay">
                                <a class="s-blue" @click="getFinBkgeDetail(scope.row.bkgeCode, scope.row.bkgeSetWay, scope.row.userCode, scope.row.bkgeRate, scope.row.signWay)">{{scope.row.venName}}</a>
                            </div>
                            <div v-else>
                                {{scope.row.venName}}
                            </div>
                        </template>
                </el-table-column>
                <el-table-column prop="mobile" label="供应商账号" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.bkgeCode && scope.row.bkgeSetWay">
                            <a class="s-blue" @click="getFinBkgeDetail(scope.row.bkgeCode, scope.row.bkgeSetWay, scope.row.userCode, scope.row.bkgeRate, scope.row.signWay)">{{scope.row.mobile}}</a>
                        </div>
                        <div v-else>
                            {{scope.row.mobile}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="shopName" label="店铺名称" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.bkgeCode && scope.row.bkgeSetWay">
                            <a class="s-blue" @click="getFinBkgeDetail(scope.row.bkgeCode, scope.row.bkgeSetWay, scope.row.userCode, scope.row.bkgeRate, scope.row.signWay)">{{scope.row.shopName}}</a>
                        </div>
                        <div v-else>
                            {{scope.row.shopName}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="signWay" label="佣金签订方式" min-width="150">
                    <template scope="scope">
                        <div>
                            {{scope.row.signWay | signWayfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="settleWay" label="结算方式" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.settleWay | settleWayfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="periodUnit" label="结算周期" min-width="100">
                    <template scope="scope">
                        <div  v-if="scope.row.settleWay == 1">
                            {{scope.row.periodDays}}{{scope.row.periodUnit | periodUnitfiter}}
                        </div>
                        <div  v-if="scope.row.settleWay == 2">
                            {{weekDayfilter(scope.row.weekDay)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="bkgeSetWay" label="佣金设置方式" min-width="150">
                    <template scope="scope">
                        <div>
                            {{scope.row.bkgeSetWay | bkgeSetWayfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="totalBkgeAmount" label="累计佣金总额" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.totalBkgeAmount">
                            ￥{{parseFloat(scope.row.totalBkgeAmount).toFixed(2)}}
                        </div>
                        <div v-else>￥0.00</div>
                    </template>
                </el-table-column>
                <el-table-column prop="actPayAmount" label="已结算佣金总额" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.actPayAmount">
                            ￥{{parseFloat(scope.row.actPayAmount).toFixed(2)}}
                        </div>
                        <div v-else>￥0.00</div>
                    </template>
                </el-table-column>
                <el-table-column prop="unPayAmount" label="剩余应结佣金总额" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.unPayAmount">
                            ￥{{parseFloat(scope.row.unPayAmount).toFixed(2)}}
                        </div>
                        <div v-else>￥0.00</div>
                    </template>
                </el-table-column>
                <el-table-column prop="venType" label="商户类型" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.venType | venTypefiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="130" fixed="right">
                    <template scope="props">
                        <div class="btn-in-table">
                            <a href="javascript:;" class="s-blue" @click="editor(props.row)">编辑</a>
                            <a href="javascript:;" class="s-blue" @click="startFinBkgeRow(props.row)">发起结算</a>
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
        <div class="pub-tabDatadetails" style="margin-top: 30px">
            <el-tabs v-model="tabCard_val" class="noFlot" type="card">
                <el-tab-pane label="佣金明细" name="first" v-if="!bkgeSetWayDatabut">
                    <refund-journal :bkgeDetails = 'bkgeDetails' :unitpro="unitpro" :unitType="unitType"></refund-journal>
                </el-tab-pane>
                <el-tab-pane label="佣金明细" name="first" v-else>
                    <p style="color: #687281">商户佣金比例：{{bkgeSetWayData}}{{signWaySele === 1 ? '%' : '元/吨'}}</p>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--编辑页面弹框-->
        <el-dialog title="编辑页面" :visible.sync="dilogbut" class="reset-dialog dialog_wid800 error-tishi" @close="cancelReject()">
            <el-form ref="editForm" label-width="95px" v-if="editForm" :model="editForm" :rules="editRules" :inline="true">
                <!--<el-form-item label="(只有佣金签订方式为'按实发数量',设置方式才能修改为'按商品SKU设置佣金')" class="editorErrtishi" labelWidth="500px" style="margin-bottom: 0!important;text-align: left">-->
                    <!--<div></div>-->
                <!--</el-form-item>-->
                <div>
                    <el-form-item label="供应商名称" style="margin-bottom: 5px!important;">
                        <div>{{editForm.venName}}</div>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="供应商账号" style="margin-bottom: 5px!important;">
                        <div>{{editForm.mobile}}</div>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="商户类型" style="margin-bottom: 5px!important;">
                        <div>{{editForm.venType | venTypefiter}}</div>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="佣金签订方式" prop="signWay" required>
                        <el-radio-group v-model="editForm.signWay" @change="signWaymethod">
                            <el-radio v-for="(item, index) in signWayList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                        </el-radio-group>
                        <!--(当佣金签订方式为'按实发数量'时,设置方式才能'按商品SKU设置佣金')-->
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="结算方式" prop="settleWay" required>
                        <el-radio-group v-model="editForm.settleWay" @change="settleWaymethod">
                            <el-radio v-for="(item, index) in settleWayList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <!--按固定周期-->
                <div v-if="editForm.settleWay == 1">
                    <el-form-item prop="periodDays" label="结算周期">
                        <el-input style="width: 200px;"  size="small" @input.native="editForm.periodDays = parseInt($event.target.value) >= 0 ? editForm.periodDays = parseInt($event.target.value).toString() : ''" v-model="editForm.periodDays" :maxlength="10" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item prop="periodUnit" label="">
                        <el-select size="small" style="width: 90px" v-model="editForm.periodUnit" placeholder="">
                            <el-option
                            v-for="item in periodUnitList"
                            :label="item.name"
                            :key="item.value"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <!--按固定日-->
                <div v-if="editForm.settleWay == 2">
                    <el-form-item prop="weekDay" label="结算周期">
                        <el-checkbox-group v-model="weekDay" class="checkGroupLet7">
                            <el-checkbox :label="item.value" :key="item.value"  v-for="(item, index) in weekDayList">{{item.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item prop="bkgeSetWay" label="设置方式">
                        <el-select size="small" style="width: 200px;" @change="bkgeSetWaymethod" :disabled="bkgeSetWaydisabled" v-model="editForm.bkgeSetWay" placeholder="设置方式">
                            <el-option
                                v-for="item in bkgeSetWayList"
                                :label="item.name"
                                :key="item.value"
                                :disabled="item.disabled"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--1：按商户设置佣金-->
                    <el-form-item prop="bkgeRate" label="" v-if="editForm.bkgeSetWay === 1">
                        <div v-if="editForm.signWay === 1">
                            <el-input @input.native="editForm.bkgeRate = parseFloat($event.target.value) >= 0 ? editForm.bkgeRate : ''" @blur="bkgeRateCk" size="small" style="width: 90px" v-model="editForm.bkgeRate" :maxlength="5" placeholder=""></el-input>&nbsp;&nbsp;<span v-if="editForm.signWay !== 3">{{editForm.signWay == 1 ? '%' : '元/吨'}}</span>
                        </div>
                        <div v-if="editForm.signWay === 2">
                            <el-input @input.native="editForm.bkgeRate = parseFloat($event.target.value) >= 0 ? editForm.bkgeRate : ''" size="small" style="width: 90px" v-model="editForm.bkgeRate" :maxlength="9" placeholder=""></el-input>&nbsp;&nbsp;<span v-if="editForm.signWay !== 3">{{editForm.signWay == 1 ? '%' : '元/吨'}}</span>
                        </div>
                    </el-form-item>
                </div>
                <div  v-if="editForm.bkgeSetWay === 2">
                    <!--2：按分类设置佣金-->
                    <el-table ref="bkgeCatList" class="tableLineheightNor" v-if="bkgeCatList && bkgeCatList.length" :data="bkgeCatList" border>
                        <el-table-column label="品类" props="catName">
                            <template scope="scope">
                                <div>
                                    {{scope.row.catName}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="佣金" props="">
                            <template scope="scope">
                                <div style="padding-top: 2px" v-if="editForm.signWay === 1">
                                    <el-input  class="xe-input-smal90" style="width: 100px" @input.native="scope.row.bkgeRate = parseFloat($event.target.value) >= 0 ? scope.row.bkgeRate : ''" @blur="bkgeRateTableCk(scope.$index)"  v-model="scope.row.bkgeRate" :maxlength="5" placeholder=""></el-input>&nbsp;&nbsp;&nbsp&nbsp;<span v-if="editForm.signWay == 1">%</span><span v-if="editForm.signWay == 2">元/吨</span>
                                </div>
                                <div style="padding-top: 2px" v-if="editForm.signWay === 2">
                                    <el-input  class="xe-input-smal90" style="width: 100px" @input.native="scope.row.bkgeRate = parseFloat($event.target.value) >= 0 ? scope.row.bkgeRate : ''" @blur="scope.row.bkgeRate = scope.row.bkgeRate ? parseFloat(scope.row.bkgeRate).toFixed(2) : ''" v-model="scope.row.bkgeRate" :maxlength="8" placeholder=""></el-input>&nbsp;&nbsp;&nbsp&nbsp;<span v-if="editForm.signWay == 1">%</span><span v-if="editForm.signWay == 2">元/吨</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div  v-if="editForm.bkgeSetWay === 3">
                    <!--3：按商品SKU设置佣金-->
                    <el-table ref="bkgeProList" v-if="bkgeProList && bkgeProList.length" class="tableLineheightNor" :data="bkgeProList" border>
                        <el-table-column label="商品分类" props="catName" min-width="100">
                            <template scope="scope">
                                <div>{{scope.row.catName}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品名称" props="proName" min-width="100">
                            <template scope="scope">
                                <div>{{scope.row.proName}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="规格" props="specValue" min-width="80">
                            <template scope="scope">
                                <div>{{scope.row.specValue}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="货号" props="proNum" min-width="80">
                            <template scope="scope">
                                <div>{{scope.row.proNum}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="计量方式" props="pricingType" min-width="75">
                            <template scope="scope">
                                <div>{{scope.row.pricingType | pricingTypefiter}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="单位" props="proUnit"  min-width="60">
                            <template scope="scope">
                                <div>{{scope.row.proUnit}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column label="佣金比例" props="bkgeRate"  min-width="130" fixed="right">
                            <template scope="scope">
                                <div style="padding-top: 2px">
                                    <el-input  class="xe-input-smal90" @input.native="scope.row.bkgeRate = parseFloat($event.target.value) >= 0 ? scope.row.bkgeRate : ''" @blur="scope.row.bkgeRate = scope.row.bkgeRate ? parseFloat(scope.row.bkgeRate).toFixed(2) : ''" style="width: 60px" v-model="scope.row.bkgeRate" :maxlength="8" placeholder=""></el-input>&nbsp;&nbsp;&nbsp;<span v-if="scope.row.proUnit">元/{{scope.row.proUnit}}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div style="text-align: center;margin-top: 15px">
                    <el-button type="primary" :loading="saveFinBkgeLoading"  @click="saveModify('editForm')">保存</el-button>
                    <el-button @click.stop="dilogbut = false">关闭</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { bkgeStatus, signWay, bkgeSetWay, settleWay, periodUnit, weekDay } from '@/dataControl';
import { millisecondFormat } from 'utils';
import refundJournal from './refundJournal';
export default {
    data() {
        return {
            tabCard_val: 'first',
            searchform: {
                venProperties: '',
                venType: '',
                bkgeStatus: '',
                bkgeSetWay: '',
                endDate: '',
                mobile: '',
                settleWay: '',
                shopName: '',
                signWay: '',
                startDate: '',
                userCode: '',
                weekDay: ''
            },
            exportData: '',
            weekDay: [],
            unitpro: '', // 明细中元吨、%传值
            unitType: '', // 明细中sku元吨、%传值
            dilogbut: false,
            editForm: { // 编辑页面
                userCode: '',
                signWay: 1, // 佣金签订方式
                settleWay: 1, // 结算方式
                periodDays: '', // 结算周期天数
                periodUnit: 1, // 结算周期单位
                weekDay: '', // 按固定日结算 1：周一 2：周二 3：周三 4：周四 5：周五 6：周六 7：周日
                bkgeSetWay: '', // 佣金设置方式 1：按商户设置佣金 2：按分类设置佣金 3：按商品SKU设置佣金
                bkgeRate: '' // 设置方式为按商户设置佣金时，取这个值，单位为元/吨
            },
            bkgeSetWaydisabled: false, // 设置方式不可点击状态设置
            bkgeCatList: [], // 编辑页面设置方式(2：按分类设置佣金)
            bkgeProList: [], // 编辑页面设置方式(3：按商品SKU设置佣金)
            editRules: {
                periodDays: [
                    { required: true, message: '结算周期不能为空', trigger: 'blur' }
                ],
                weekDay: [
                    { required: true, message: '结算周期不能为空', trigger: 'change' }
                ],
                bkgeRate: [
                    { required: true, message: '佣金不能为空', trigger: 'blur' }
                ],
                bkgeSetWay: [
                    { required: true, type: 'number', message: '设置方式不能为空', trigger: 'change' }
                ]
            },
            finBkgeInfo: {}, // 编辑回显数据
            bkgeDetails: [],
            bkgeSetWayDatabut: false, // 明显按商户设置佣金显示开关
            bkgeSetWayData: '', // 明显按商户设置佣金显示开关
            signWaySele: '', // 明细中元顿、 %显示
            xeFinBkgeList: [],
            venNameList: [],
            value1: '',
            value2: '',
            dataListloading: false,
            saveFinBkgeLoading: false, // 编辑提交
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            selectedArray: [],
            selecRow: '', // 编辑点击获对应的数据
            selecRowIndex: '', // 编辑点击获取对应下标
            loading: false, // 保存loading
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.listSysFinBkg();
        this.getVenInfoByVenName();
    },
    methods: {
        bkgeRateCk() {
            let bkgeRate = this.editForm.bkgeRate;
            if (bkgeRate && bkgeRate > 0 && bkgeRate < 100) {
                this.editForm.bkgeRate = parseFloat(this.editForm.bkgeRate).toFixed(2);
            } else {
                this.editForm.bkgeRate = '';
                window.$wxeMessage.warning('佣金为大于0小于100的数字');
            }
        },
        bkgeRateTableCk(index) {
            let bkgeRate = this.bkgeCatList[index].bkgeRate;
            if (bkgeRate && bkgeRate > 0 && bkgeRate < 100) {
                this.bkgeCatList[index].bkgeRate = parseFloat(this.bkgeCatList[index].bkgeRate).toFixed(2);
            } else {
                this.bkgeCatList[index].bkgeRate = '';
                window.$wxeMessage.warning('佣金为大于0小于100的数字');
            }
        },
        signWaymethod() { // 佣金签订方式切换
            if (this.editForm.signWay === 3) {
                this.editForm.bkgeSetWay = 3;
                this.bkgeSetWaydisabled = true;
            } else {
                this.editForm.bkgeSetWay = 1;
                this.bkgeSetWaydisabled = false;
            }
        },
        settleWaymethod() { // 结算方式方式切换
            this.weekDay = [];
            this.searchform.weekDay = '';
            this.searchform.periodDays = '';
        },
        bkgeSetWaymethod() { // 设置方式方式切换
//            this.editForm.bkgeRate = '';
            if (this.editForm.bkgeSetWay !== 1) {
                this.getFinBkgeDetaileditor();
            }
            if (this.xeSysFinBkgeCatList && this.xeSysFinBkgeCatList.length) {
                this.xeSysFinBkgeCatList.forEach(item => {
                    item.bkgeRate = '';
                });
            }
            if (this.xeSysFinBkgeProList && this.xeSysFinBkgeProList.length) {
                this.xeSysFinBkgeProList.forEach(item => {
                    item.bkgeRate = 1;
                });
            }
        },
        getFinBkgeDetaileditor() { // 编辑查询明细
            let params = {};
            params.bkgeCode = this.editForm.bkgeCode ? this.editForm.bkgeCode : '';
            params.userCode = this.editForm.userCode;
            params.bkgeSetWay = this.editForm.bkgeSetWay;
            if (params.userCode && params.bkgeSetWay) {
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/finBkge/getFinBkgeDetail`,
                    data: params
                }).then((res) => {
                    if (res.data.bkgeCatList && res.data.bkgeCatList.length) {
                        this.bkgeCatList = res.data.bkgeCatList;
                    } else {
                        this.bkgeCatList = [];
                    }
                    if (res.data.bkgeProList && res.data.bkgeProList.length) {
                        this.bkgeProList = res.data.bkgeProList;
                    } else {
                        this.bkgeProList = [];
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        editor(row) {
            this.dilogbut = true;
            this.selecRow = row;
            this.toggleSelection();
            this.toFinBkge(row.userCode);
        },
        startFinBkgeBatch() { // 批量发起结算账单
            if (this.selectedArray.length) {
                this.$confirm(`当前选中${this.selectedArray.length}个商户，是否确认发起结算？`, '发起结算', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let obj = [];
                    this.selectedArray.forEach(item => {
                        obj.push(item.userCode);
                    });
                    this.startFinBkge(obj);
                }).catch(() => {
                });
            } else {
                window.$wxeMessage.warning('请勾选需要批量发起结算的账单');
            }
        },
        startFinBkgeRow(row) { // 单条发起结算账单
            this.toggleSelection();
            let timeTit = '';
            if (row.settleTime) {
                timeTit = `当前账期段为${millisecondFormat(row.settleTime, 'ms')}至${millisecondFormat(new Date().getTime(), 'ms')}，是否确认生成应付账单？`;
            } else {
                timeTit = `是否确认生成应付账单？`;
            }
            this.$confirm(`${timeTit}`, '发起结算', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let obj = [row.userCode];
                this.startFinBkge(obj);
            }).catch(() => {
            });
        },
        startFinBkge(userCodeList) { // 发起结算账单
            let params = {};
            let _this = this;
            params.userCodeList = userCodeList;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/finBkge/startFinBkge`,
                data: params
            }).then((res) => {
                if (res.data.code === '3000') {
                    window.$wxeMessage.success(res.data.msg);
                } else {
                    window.$wxeMessage.warning(res.data.msg);
                }
                setTimeout(() => {
                    _this.listSysFinBkg();
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        },
        toFinBkge(userCode) {
            let params = {};
            params.userCode = userCode;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/finBkge/toFinBkge`,
                data: params
            }).then((res) => {
                this.editorFormreap(res.data.finBkgeInfo); // 编辑回显
            }).catch((error) => {
                console.log(error);
            });
        },
        editorFormreap(finBkgeInfo) {
            if (finBkgeInfo.signWay) {
                this.editForm.signWay = finBkgeInfo.signWay;
            } else {
                this.editForm.signWay = 1;
            }
            if (finBkgeInfo.settleWay) {
                this.editForm.settleWay = finBkgeInfo.settleWay;
            } else {
                this.editForm.settleWay = 1;
            }
            if (finBkgeInfo.periodDays) {
                this.editForm.periodDays = finBkgeInfo.periodDays.toString();
            }
            if (finBkgeInfo.periodUnit) {
                this.editForm.periodUnit = finBkgeInfo.periodUnit;
            } else {
                this.editForm.periodUnit = 1;
            }
            this.editForm.userCode = finBkgeInfo.userCode;
            this.editForm.shopName = finBkgeInfo.shopName;
            this.editForm.venName = finBkgeInfo.venName;
            this.editForm.venProperties = finBkgeInfo.venProperties;
            this.editForm.venType = finBkgeInfo.venType;
            this.editForm.mobile = finBkgeInfo.mobile;
            this.editForm.weekDay = finBkgeInfo.weekDay;
            this.$nextTick(() => {
                if (finBkgeInfo.bkgeSetWay) {
                    this.editForm.bkgeSetWay = finBkgeInfo.bkgeSetWay;
                } else {
                    this.editForm.bkgeSetWay = '';
                }
                this.editForm.bkgeRate = finBkgeInfo.bkgeRate;
                if (finBkgeInfo.weekDay) {
                    this.weekDay = finBkgeInfo.weekDay.split(',');
                    for (let i in this.weekDay) {
                        this.weekDay[i] = parseInt(this.weekDay[i]);
                    }
                }
            });
        },
        cancelReject() {
            let _this = this;
            setTimeout(() => {
                _this.weekDay = [];
                _this.resetFormeditor('editForm');
            }, 300);
        },
        saveModify(formName) { // 编辑页面保存
            if (this.weekDay.length) {
                this.editForm.weekDay = this.weekDay.join(',');
            } else {
                this.editForm.weekDay = '';
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.saveFinBkgepost();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        saveFinBkgepost() { // 编辑保存
            let params = {};
            let _this = this;
            let flag = false;
            params = this.editForm;
            if (this.editForm.bkgeSetWay === 1) {
                flag = true;
            }
            if (this.editForm.bkgeSetWay === 2) {
                this.editForm.bkgeRate = 0;
                params.xeSysFinBkgeCatList = this.bkgeCatList;
                flag = this.bkgeCatList.some(item => {
                    return parseFloat(item.bkgeRate) > 0;
                });
            }
            if (this.editForm.bkgeSetWay === 3) {
                this.editForm.bkgeRate = 0;
                params.xeSysFinBkgeProList = this.bkgeProList;
                flag = this.bkgeProList.every(item => {
                    return parseFloat(item.bkgeRate) > 0;
                });
            }
            if (flag) {
                this.saveFinBkgeLoading = true;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/finBkge/saveFinBkge`,
                    data: params
                }).then(() => {
                    window.$wxeMessage.success('操作成功');
                    this.saveFinBkgeLoading = false;
                    setTimeout(() => {
                        _this.listSysFinBkg();
                    }, 300);
                    this.dilogbut = false;
                }).catch((error) => {
                    console.log(error);
                    this.saveFinBkgeLoading = false;
                });
            } else {
                if (this.editForm.bkgeSetWay === 2) {
                    this.$alert('品类佣金值必须填写一项', {
                        type: 'info'
                    });
                } else if (this.editForm.bkgeSetWay === 3) {
                    this.$alert('商品佣金值不能为空', {
                        type: 'info'
                    });
                }
            }
        },
        resetFormeditor(formName) {
            this.$refs[formName].resetFields();
        },
        getVenInfoByVenName() { // 供应商名称
            let params = {};
            params.venName = '';
            params.venType = 2;
            params.pageFlag = 2;
            params.pageNum = '';
            params.pageSize = '';
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/orderInfo/getVenInfoByVenName`,
                data: params
            }).then((res) => {
                this.venNameList = res.data.venInfoList;
                this.venNameList.unshift({venName: '全部', userCode: ''});
            }).catch((error) => {
                console.log(error);
            });
        },
        getFinBkgeDetail(bkgeCode, bkgeSetWay, userCode, bkgeRate, signWay) { // 查询佣金设定明细信息
            let params = {};
            params.bkgeCode = bkgeCode;
            params.bkgeSetWay = bkgeSetWay;
            params.userCode = userCode;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/finBkge/getFinBkgeDetail`,
                data: params
            }).then((res) => {
                if (bkgeSetWay === 2) {
                    this.bkgeSetWayDatabut = false;
                    if (!res.data || !res.data.bkgeCatList.length) {
                        this.bkgeDetails = [];
                        this.unitpro = '';
                    } else {
                        this.unitpro = signWay;
                        this.bkgeDetails = res.data.bkgeCatList;
                        this.unitType = 'bkgeCatList'; // bkgeCatList 为 按佣金分类设置信息 bkgeSetWay=2
                    }
                } else if (bkgeSetWay === 3) {
                    this.bkgeSetWayDatabut = false;
                    if (!res.data || !res.data.bkgeProList.length) {
                        this.bkgeDetails = [];
                    } else {
                        this.bkgeDetails = res.data.bkgeProList;
                        this.unitType = 'bkgeProList'; // bkgeProList 为 按商品SKU设置佣金 bkgeSetWay=3
                    }
                } else if (bkgeSetWay === 1) {
                    this.bkgeDetails = [];
                    this.signWaySele = signWay;
                    this.bkgeSetWayData = bkgeRate;
                    this.bkgeSetWayDatabut = true;
                }
            }).catch(() => {
            });
        },
        listSysFinBkg() {
            let params = {};
            this.dataListloading = true;
            params = this.searchform;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            if (this.value1) {
                params.startDate = millisecondFormat(this.value1.getTime(), 'ms');
            } else {
                params.startDate = '';
            }
            if (this.value2) {
                params.endDate = millisecondFormat(this.value2.getTime(), 'ms');
            } else {
                params.endDate = '';
            }
            this.exportData = '';
            for (let i in params) {
                if (i !== 'pageNum' && i !== 'pageSize') {
                    if (!params[i] || params[i] === '' || params[i] === null) {
                        this.exportData += `${i}=&`;
                    } else {
                        this.exportData += `${i}=${params[i]}&`;
                    }
                }
            }
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/finBkge/listSysFinBkg`,
                data: params
            }).then((res) => {
                this.dataListloading = false;
                this.xeFinBkgeList = res.data.xeFinBkgeList;
                this.pagelist.total = res.data.pageInfo.total;
                if (this.xeFinBkgeList.length) {
                    if (this.xeFinBkgeList[0].bkgeCode && this.xeFinBkgeList[0].bkgeSetWay && this.xeFinBkgeList[0].userCode) {
                        this.getFinBkgeDetail(this.xeFinBkgeList[0].bkgeCode, this.xeFinBkgeList[0].bkgeSetWay, this.xeFinBkgeList[0].userCode, this.xeFinBkgeList[0].bkgeRate, this.xeFinBkgeList[0].signWay);
                    } else {
                        this.bkgeDetails = [];
                    }
                }
            }).catch((error) => {
                console.log(error);
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
            this.listSysFinBkg();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.listSysFinBkg();
            }
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.xeFinBkgeList.toggleRowSelection(row);
                });
            } else {
                this.$refs.xeFinBkgeList.clearSelection();
            }
        },
        weekDayfilter(row) {
            let weekDay = '';
            if (row.indexOf('1') !== -1) {
                weekDay += '周一 ';
            }
            if (row.indexOf('2') !== -1) {
                weekDay += '周二 ';
            }
            if (row.indexOf('3') !== -1) {
                weekDay += '周三 ';
            }
            if (row.indexOf('4') !== -1) {
                weekDay += '周四 ';
            }
            if (row.indexOf('5') !== -1) {
                weekDay += '周五 ';
            }
            if (row.indexOf('6') !== -1) {
                weekDay += '周六 ';
            }
            if (row.indexOf('7') !== -1) {
                weekDay += '周日';
            }
            return weekDay;
        },
        resetForm(formName) {
            let _this = this;
            this.value1 = '';
            this.value2 = '';
            this.$refs[formName].resetFields();
            setTimeout(() => {
                _this.listSysFinBkg();
            }, 10);
        },
        exportDataMethod() { // 导出
            window.open(`${this.productUrl}//manager/finBkge/exportSysBkg?${this.exportData}`);
        },
        exportPayBillDetail() { // 导出明细
//            window.open(`${this.productUrl}/manager/finPbillPlat/exportPayBillDetail?${this.exportData}`);
        }
    },
    computed: {
        bkgeStatusList() {
            return bkgeStatus;
        },
        signWayList() {
            return signWay;
        },
        bkgeSetWayList() {
            let bkgeSetWayList = bkgeSetWay;
            bkgeSetWayList.forEach(item => {
                if (item.value === 3) {
                    item.disabled = true;
                }
            });
            return bkgeSetWayList;
        },
        settleWayList() {
            return settleWay;
        },
        periodUnitList() {
            return periodUnit;
        },
        weekDayList() {
            return weekDay;
        }
    },
    components: {
        refundJournal
    }
};
</script>
<style lang="scss">
    .el-form-item {
        &.editorErrtishi {
            .el-form-item__label {
                padding-left: 24px!important;
                text-align: left;
                line-height: 18px;
                color: #ff4949!important;
            }
        }
    }
    .el-checkbox-group {
        &.checkGroupLet7 {
            .el-checkbox+ .el-checkbox{
                margin-left: 7px;
            }
        }
    }

</style>
