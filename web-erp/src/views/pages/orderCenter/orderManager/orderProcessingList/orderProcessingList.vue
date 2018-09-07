<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form :inline="true" :model="puboderSerData" ref="puboderSerData" class="demo-form-inline">
                 <el-form-item prop="searchType">
                    <el-select size="small" @change="searchTypeSelec" class="xe-input-w110" v-model="puboderSerData.searchType" placeholder="请选择">
                        <el-option
                            v-for="item in searchTypeList"
                            :label="item.name"
                            :key="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="orderId">
                    <el-input size="small" :placeholder="placeholder" v-model.trim="puboderSerData.orderId" class="">
                      </el-input>
                </el-form-item>
                <el-form-item prop="searchTimeType">
                    <el-select size="small" @change="searchTimeTypeSelec" class="xe-input-w110" v-model="puboderSerData.searchTimeType" placeholder="请选择">
                        <el-option
                            v-for="item in searchTimeTypeList"
                            :label="item.name"
                            :key="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="z-mr30">
                    <el-date-picker
                      v-model="value1"
                      type="datetime"
                       size="small"
                       :picker-options="pickerOptionStart"
                       @change="startCreateDateFn"
                      placeholder="开始日期"
                      >
                    </el-date-picker>
                    <span class="Cornet">-</span>
                    <el-date-picker
                      v-model="value2"
                      type="datetime"
                       size="small"
                        :picker-options="pickerOptionEnd"
                       @change="endCreateDateFn"
                      placeholder="结束日期"
                      >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button  class="xe-button-normal" type="primary" @click="enquiryForm">
                        查询
                    </el-button>
                    <el-button   class="xe-button-normal"  @click="resetForm('puboderSerData')">
                        重置
                    </el-button>
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
                    <el-form :inline="true" :model="puboderSerData" label-width ='73px' ref="puboderSerData1" class="demo-form-inline">
                        <div style="clear:both;">
                            <el-form-item prop="searchType">
                                <el-select size="small" @change="searchTypeSelec" class="xe-input-w110" v-model="puboderSerData.searchType" placeholder="请选择">
                                    <el-option
                                        v-for="item in searchTypeList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="orderId">
                                <el-input size="small" :placeholder="placeholder" v-model.trim="puboderSerData.orderId" class=""></el-input>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                           <el-form-item prop="searchTimeType">
                                <el-select size="small" @change="searchTimeTypeSelec" class="xe-input-w110" v-model="puboderSerData.searchTimeType" placeholder="请选择">
                                    <el-option
                                        v-for="item in searchTimeTypeList"
                                        :label="item.name"
                                            :key="item.value"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                           </el-form-item>
                            <el-form-item class="z-mr0">
                                <el-date-picker
                                  v-model="value1"
                                  type="datetime"
                                   size="small"
                                   :picker-options="pickerOptionStart"
                                   @change="startCreateDateFn"
                                  placeholder="开始日期"
                                  >
                                </el-date-picker>
                                <span class="Cornet">-</span>
                            </el-form-item>
                            <el-form-item>
                                    <el-date-picker
                                      v-model="value2"
                                      type="datetime"
                                       size="small"
                                        :picker-options="pickerOptionEnd"
                                       @change="endCreateDateFn"
                                      placeholder="结束日期"
                                      >
                                    </el-date-picker>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                           <el-form-item label="收货地区">
                                <areaselect-tag class="xe-input-w160" v-model='selecarea' :width='160' :changeOnSelect="true"></areaselect-tag>
                            </el-form-item>
                            <el-form-item prop="orderId" label="商品分类">
                                <categoryTag v-model='cateIdArray' class="xe-input-w160" :width='160' :changeOnSelect="true"></categoryTag>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item prop="orderSource" label="订单来源">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.orderSource" placeholder="请选择">
                                    <el-option
                                        v-for="item in orderSourceList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <!--<el-form-item prop="orderStatus" label="订单状态">-->
                                <!--<el-select size="small" class="xe-input-w160" v-model="puboderSerData.orderStatus" placeholder="请选择">-->
                                    <!--<el-option-->
                                        <!--v-for="item in orderStatusList"-->
                                        <!--:label="item.name"-->
                                        <!--:key="item.value"-->
                                        <!--:value="item.value">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                            <el-form-item prop="orderType" label="订单类型">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.orderType" placeholder="请选择">
                                    <el-option
                                        v-for="item in orderTypeList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                            <el-form-item prop="payType" label="支付类型">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.payType" placeholder="请选择">
                                    <el-option
                                        v-for="item in payTypeList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="payStatus" label="支付状态">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.payStatus" placeholder="请选择">
                                    <el-option
                                        v-for="item in payStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        <div style="clear: both">
                            <el-form-item prop="orderStoreId" label="仓库名称">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.orderStoreId" placeholder="请选择">
                                    <el-option
                                        v-for="item in orderStoreIdList"
                                        :label="item.storeName"
                                        :key="item.storeId"
                                        :value="item.storeId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="salesmanName" label="客户经理">
                                <el-input size="small" class="xe-input-w160" placeholder="请输入客户经理姓名"  v-model.trim="puboderSerData.salesmanName"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="enquiryForm">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('puboderSerData1')">重置</el-button>
                    </div>
                </div>
            </div>
         <!--高级搜索样式end-->
         </div>
         <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="batchTovoid"><i class="iconfont icon-zuofei"></i>&nbsp;作废</el-button>
            <!--<el-button class="xe-button-normal"><i class="iconfont icon-xiugai"></i>&nbsp;修改订单 </el-button>-->
            <el-button class="xe-button-normal" @click="batchEditroStorm"><i class="iconfont icon-xiugai"></i>&nbsp;修改仓库 </el-button>
            <el-button class="xe-button-normal" @click="batchSplitOrderFor"><i class="iconfont icon-biaodanchaifen"></i>&nbsp;拆分订单 </el-button>
            <el-button class="xe-button-normal" @click="batchAuditOrder"><i class="iconfont icon-shenhe"></i>&nbsp;审核 </el-button>
            <el-button class="xe-button-normal" @click="batchlockOrder"> <i class="iconfont icon-suo-xianxing"></i>&nbsp;锁单</el-button>
            <el-button class="xe-button-normal" @click="batchunLockOrder"> <i class="iconfont icon-jiesuo-xianxing"></i>&nbsp;解锁</el-button>
            <el-button class="xe-button-normal" @click="outData"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button>
            <el-button class="xe-button-normal" @click="outDataDetail"> <i class="iconfont icon-daochu"></i>&nbsp;导出明细</el-button>
         </div>
         <div class="pub-dataContent">
            <div class="pub-tabDatacon">
                <el-table
                    :data="pubTabDatacon"
                    border
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                      prop=""
                      label=""
                      fixed="left"
                      width="55"
                      >
                      <template scope="scope">
                            {{scope.$index + 1}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label=""
                      width="34"
                      type="selection"
                      fixed="left"
                      class-name="selectionTd"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="orderMark"
                      min-width="140"
                      label="标记">
                        <template scope="scope">
                            <div class="clearfix" v-if="scope.row.orderMark">
                                <span v-if="scope.row.orderMark.indexOf('1') !== -1" class="lock_sp form_lab fl">锁</span>
                                <span v-if="scope.row.orderMark.indexOf('2') !== -1" class="remove_sp form_lab fl">拆</span>
                                <span v-if="scope.row.orderMark.indexOf('3') !== -1" class="special_sp form_lab fl">特</span>
                                <span v-if="scope.row.orderMark.indexOf('4') !== -1" class="transport_sp form_lab fl">运</span>
                                <span v-if="scope.row.orderMark.indexOf('5') !== -1" class="lack_sp form_lab fl">缺</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="orderId"
                      label="订单编号"
                      min-width="150"
                      >
                        <template scope="scope">
                            <div class="btn-in-table" @click="orderIdSelectclick(scope.$index, scope.row.orderId)">
                                <a href="javascript:;" class="s-blue">{{scope.row.orderId}}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createDate"
                        label="下单时间"
                        min-width="150"
                        sortable
                    >
                    </el-table-column>
                    <el-table-column
                        prop="orderStatus"
                        label="订单状态"
                        min-width="100"
                    >
                        <template scope="scope">
                            <div>
                                {{parseFloat(scope.row.orderStatus) | orderStatusToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="orderSource"
                        label="订单来源"
                        min-width="100"
                    >
                        <template scope="scope">
                            <div>
                                {{parseFloat(scope.row.orderSource) | orderSourceToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="loginAccount"
                        label="客户账号"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="caConsignee"
                        label="收货人"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="caArea"
                        label="收货地区"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="caStreet"
                        label="收货地址"
                        min-width="200"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="shipType"
                        label="配送方式"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.shipType | shipTypeToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="orderCodMobile"
                        label="下单业务员"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="salesmanName"
                        label="客户经理"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="storeName"
                        label="仓库名称"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="payNumber"
                        label="支付单号"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="payType"
                        label="支付类型"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.payType | payTypeToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="payStatus"
                        label="支付状态"
                        min-width="100"
                    >
                        <template scope="scope">
                            <div>
                                {{parseFloat(scope.row.payStatus) | payStatusToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="payTime"
                        label="支付时间"
                        min-width="150"
                        sortable
                    >
                    </el-table-column>
                    <el-table-column
                        prop="payAbleAmount"
                        label="订单金额"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.payAbleAmount">
                                {{scope.row.payAbleAmount.toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="freAmount"
                        label="运费总额"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.freAmount">
                                {{parseFloat(scope.row.freAmount).toFixed(2)}}
                            </div>
                            <div v-else>
                                0
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="pmtAmount"
                        label="优惠总额"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.pmtAmount">
                                {{scope.row.pmtAmount.toFixed(2)}}
                            </div>
                            <div v-else>
                                0
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="应收金额"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.payType == 4 && !scope.row.epayReceAmt">
                                <div v-if="scope.row.payAbleAmount">
                                    {{parseFloat(scope.row.payAbleAmount).toFixed(2)}}
                                </div>
                            </div>
                            <div v-if="scope.row.payType == 4 && scope.row.epayReceAmt">
                                <div v-if="scope.row.epayReceAmt">
                                    {{parseFloat(scope.row.epayReceAmt).toFixed(2)}}
                                </div>
                            </div>
                            <div v-if="scope.row.payType == 1 && !scope.row.epayReceAmt">
                                <div v-if="scope.row.payAbleAmount">
                                    {{parseFloat(scope.row.payAbleAmount).toFixed(2)}}
                                </div>
                            </div>
                            <div v-if="scope.row.payType == 1 && scope.row.epayReceAmt">
                                <div v-if="scope.row.epayReceAmt">
                                    {{parseFloat(scope.row.epayReceAmt).toFixed(2)}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="实收金额"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.payType == 4">
                                <div v-if="scope.row.payAbleAmount">
                                    {{scope.row.payAbleAmount.toFixed(2)}}
                                </div>
                            </div>
                            <div v-if="scope.row.payType == 1 && !scope.row.epayReceAmt">
                                0
                            </div>
                            <div v-if="scope.row.payType == 1 && scope.row.orderStatus == 1 && scope.row.epayReceAmt">
                                <div v-if="scope.row.epayReceAmt">
                                    {{scope.row.epayReceAmt.toFixed(2)}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="refundAmount"
                        label="退款金额"
                        min-width="100"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.refundAmount">
                                {{scope.row.refundAmount.toFixed(2)}}
                            </div>
                            <div v-else>
                                0
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="300"
                        fixed="right">
                        <template scope="scope">
                            <div class="btn-in-table" v-if="!scope.row.orderMark || scope.row.orderMark && scope.row.orderMark.indexOf('1') == -1">
                                <a href="javascript:void(0)" class="s-blue" @click="editOrder(scope.$index, scope.row)">修改订单</a>
                                <a href="javascript:void(0)" @click="auditOrderCk(scope.row)" class="s-blue">审核</a>
                                <a href="javascript:void(0)" class="s-blue" v-if="scope.row.payStatus == 2" @click="editFreamount(scope.$index, scope.row)">修改运费</a>
                                <a href="javascript:void(0)" class="s-blue" @click="rowTovoid(scope.$index, scope.row)">作废</a>
                                <a href="javascript:void(0)" @click="splitOrderForWebCk(scope.row)" v-if="scope.row.splitOrderStatus == 1" class="s-blue">拆分订单</a>
                                <a href="javascript:void(0)" @click="unSplitOrder(scope.$index, scope.row)" v-if="scope.row.splitOrderStatus == 2" class="s-blue">取消拆分</a>
                            </div>
                        </template>
                    </el-table-column>
                  </el-table>
                    <div class="tab-foot xe-pagination-panel">
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
            <div class="pub-tabDatadetails">
                <el-tabs v-model="tabCard_val" class="noFlot" type="card" @tab-click="handleClick">
                    <!--退款商品-->
                    <el-tab-pane label="商品信息" name="first">
                        <refund-merchandise :refundMer = 'refundMer' @updateSpecialSuc="updateSpecialSuc"  :selecRowArray = selecRowArray></refund-merchandise>
                    </el-tab-pane>
                    <!--配置管理-->
                    <el-tab-pane label="买家信息" name="second">
                        <buyer-information :buyerInfor = "buyerInfor"></buyer-information>
                    </el-tab-pane>
                    <el-tab-pane label="物流信息" name="third">
                        <logistics-information :logisticsInfor = 'logisticsInfor'></logistics-information>
                    </el-tab-pane>
                    <el-tab-pane label="备注信息" name="fourth">
                        <memo-information :memoInfor = 'memoInfor'></memo-information>
                    </el-tab-pane>
                    <el-tab-pane label="订单日志" name="five">
                        <refund-journal :refundJou = 'refundJou'></refund-journal>
                    </el-tab-pane>
                </el-tabs>
            </div>
         </div>
        <!--修改仓库-->
        <el-dialog title="修改仓库" :visible.sync="stromNamedialog" class="reset-dialog dialog_wid340 error-tishi">
            <el-form :model="stromNameForm" :rules="stromRule" label-width="70px" ref="stromNameForm">
                <div style="text-align: center;padding-bottom: 10px;color:#687281">若该仓库库存不足，缺货订单会流转至异常订单。</div>
                <el-form-item prop="storeId" label="仓库名称">
                    <el-select size="small" class="xe-input-w160" v-model="stromNameForm.storeId" placeholder="请选择">
                        <el-option
                            v-for="item in orderStoreIdListother"
                            :label="item.storeName"
                            :key="item.storeId"
                            :value="item.storeId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <div class="el-dialog__footer">
                    <el-button class="xe-button-normal" type="primary" @click="stromNamesubmit('stromNameForm')">确定</el-button>
                    <el-button class="xe-button-normal" @click="stromNamedialog = false">取 消</el-button>
                </div>
            </el-form>
        </el-dialog>
        <!--修改运费-->
        <el-dialog title="修改运费" :visible.sync="freamountdialog" class="reset-dialog dialog_wid340 error-tishi">
            <el-form :model="freamountForm" :rules="freamountRule" label-width="70px" ref="freamountForm">
                <el-form-item prop="freAmount"label="运费总额">
                    <el-input size="small" @input.native="parseFloatNum($event)" v-model.trim="freamountForm.freAmount" :maxlength="5" type="text" class="xe-input-col2" placeholder=""></el-input>
                </el-form-item>
                <div class="el-dialog__footer">
                    <el-button class="xe-button-normal" type="primary" @click="freamountsubmit('freamountForm')">确定</el-button>
                    <el-button class="xe-button-normal" @click="freamountdialog = false">取 消</el-button>
                </div>
            </el-form>
        </el-dialog>
        <!--修改订单-->
        <el-dialog title="修改订单" :visible.sync="orderdialog" class="reset-dialog dialog_wid500 error-tishi">
            <el-form :model="editorOrderForm" :rules="orderdRule" label-width="85px" ref="editorOrderForm">
                <el-form-item prop="caConsignee" label="收货人姓名">
                    <el-input size="small" v-model.trim="editorOrderForm.caConsignee" :maxlength="10" type="text" class="" placeholder=""></el-input>
                </el-form-item>
                <el-form-item prop="caPhone" label="收货人手机">
                    <el-input size="small" v-model.trim="editorOrderForm.caPhone" :maxlength="11" type="text" class="" placeholder=""></el-input>
                </el-form-item>
                <el-form-item prop="storeName" label="收货店铺">
                    <el-input size="small" v-model.trim="editorOrderForm.storeName" :maxlength="30" type="text" class="" placeholder=""></el-input>
                </el-form-item>
                <el-form-item prop="salesmanId" label="客户经理">
                    <el-select size="small" v-model="editorOrderForm.salesmanId" @change="custMagNameChange" placeholder="请选择" style="width: 100%;">
                        <el-option
                            v-for="item in custMagNameList"
                            :label="item.salesmanName"
                            :key="item.salesmanId"
                            :value="item.salesmanId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="orderselecarea" label="收货地址">
                    <areaselect-tag class="" v-model='editorOrderForm.orderselecarea' :changeOnSelects="false" :width='375' :changeOnSelect="true"></areaselect-tag>
                </el-form-item>
                <el-form-item prop="caStreet" label="详细地址">
                    <el-input size="small" v-model.trim="editorOrderForm.caStreet" :maxlength="30" type="text" class="" placeholder=""></el-input>
                </el-form-item>
                <div class="el-dialog__footer">
                    <el-button class="xe-button-normal" type="primary" @click="ordersubmit('editorOrderForm')">确定</el-button>
                    <el-button class="xe-button-normal" @click="orderdialog = false">取 消</el-button>
                </div>
            </el-form>
        </el-dialog>
        <!--作废驳回弹框-->
        <el-dialog title="作废" :visible.sync="rejectdailog"   class="reset-dialog dialog_wid340 textare_reset300" >
            <div style="text-align: center;padding-bottom: 10px;color:#687281">作废后订单将被取消，您确认将选中的订单作废吗？</div>
            <textarea class="" placeholder="请填写订单的作废原因50字以内" :maxlength="50" v-model="rejectext"></textarea>
            <!--<span class="last-num">{{rejectextNum}}/200</span>-->
            <div slot="footer" class="dialog-footer">
                <el-button  class="xe-button-normal" type="primary" @click="rejectSubmit">确定</el-button>
                <el-button  class="xe-button-normal" @click="rejectdailog = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--锁单弹框-->
        <el-dialog title="锁单" :visible.sync="lockOrderdailog"   class="reset-dialog dialog_wid340 textare_reset300" >
            <textarea class="" placeholder="请填写锁定的订单原因50字以内" :maxlength="50" v-model="lockOrderrejectext"></textarea>
            <!--<span class="last-num">{{rejectextNum}}/200</span>-->
            <div slot="footer" class="dialog-footer">
                <el-button  class="xe-button-normal" type="primary" @click="lockOrderSubmit">确定</el-button>
                <el-button  class="xe-button-normal" @click="lockOrderdailog = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--拆分订单弹框-->
        <el-dialog
            class="reset-dialog"
            title="订单拆分"
            :visible.sync="splitOrderdialog"
            size="large"
            custom-class="expand-classs"
            :show-close=true
            >

            <split-orderdialog @startChaifen="startChaifen" @startChaifenErr="startChaifenErr" @startChaifensuces="startChaifensuces" :orderStoreIdListother="orderStoreIdListother" :orderSavebut="orderSavebut"  :splitOrderdialog="splitOrderdialog" :rowtableData="rowtableData" :rowTitlist="rowTitlist"></split-orderdialog>
            <div slot="footer" class="dialog-footer">
                <el-button  class="xe-button-normal" type="primary" :loading="orderSaveloading" @click="splitOrderSave">保存</el-button>
                <el-button  class="xe-button-normal" @click="splitOrderdialog = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import areaselectTag from '@/components/areaSelect/areaSelect';
    import splitOrderdialog from './splitOrderdialog';
    import categoryTag from '@/components/category/category';
    import {orderSource, orderStatus, orderType, payStatus, searchTypeOne, searchTimeTypeOne, payTypeListOne} from '@/dataControl';
    import refundMerchandise from './refundMerchandise';
    import buyerInformation from './buyerInformation';
    import logisticsInformation from './logisticsInformation';
    import memoInformation from './memoInformation';
    import refundJournal from './refundJournal';
    import { millisecondFormat } from 'utils';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            var checkStoreId = (rule, value, callback) => {
                if (value !== '' && value !== null) {
                    let flag = false;
                    if (this.selecteditStorename) {
                        if (this.selecteditStorename === value) {
                            callback(new Error('仓库名称不能和原仓库一样'));
                        } else {
                            flag = true;
                        }
                    } else if (this.selecteditStorename === null) { // 列表中没有仓库名称情况
                        flag = true;
                    } else if (this.selectedArray.length > 0) { // 列表中仓库名称与下拉框选择的数据相同的情况
                        for (let i = 0, len = this.selectedArray.length; i < len; i++) {
                            if (this.selectedArray[i].storeId === value) {
                                callback(new Error('仓库名称不能和原仓库一样'));
                                flag = false;
                                break;
                            } else {
                                flag = true;
                            }
                        }
                    }
                    if (flag) {
                        callback();
                    }
                } else {
                    callback(new Error('仓库名称不能为空'));
                }
            };
            let validatecaPhone = (rule, value, callback) => {
                if (value) {
                    let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error('手机号格式不正确'));
                    }
                } else {
                    callback(new Error('手机号必须填写'));
                }
            };
            return {
                outerDetailUrl: '',
                outerUrl: '',
                pagelist: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                modifyfreamount: {
                    orderId: '',
                    lockStatus: '',
                    payType: '',
                    payStatus: '',
                    freAmount: '',
                    orderMark: ''
                },
                editorOrderForm: { // 修改订单表单数据
                    caAreaId: '',
                    caCityId: '',
                    caConsignee: '',
                    caPhone: '',
                    caPostalCode: '',
                    caProvinceId: '',
                    orderId: '',
                    storeName: '',
                    orderMark: '',
                    caStreet: '',
                    salesmanId: '',
                    salesmanPhone: '',
                    salesmanName: '',
                    orderselecarea: [] // 订单修改地址
                },
                stromNameForm: { // 仓库
                    storeId: ''
                },
                rowTitlist: null, // 拆分订单单行信息存储
                rowtableData: null, // 拆分订单单行商品详情数据存储
                rejectext: '', // 作废(驳回原因)
                lockOrderrejectext: '', // 锁单(锁单原因)
                selecteditStorename: '',
                stromRule: {
                    storeId: [
                        { required: true, validator: checkStoreId, trigger: 'change' }
                    ]
                },
                freamountForm: { // 运费
                    freAmount: ''
                },
                freamountRule: {
                    freAmount: [
                        { required: true, message: '运费总额必填', trigger: 'blur' }
                    ]
                },
                orderdRule: {
                    caConsignee: [
                        { required: true, message: '收货人姓名不能为空', trigger: 'blur' }
                    ],
                    caPhone: [
                        { required: true, validator: validatecaPhone, trigger: 'blur' }
                    ],
                    storeName: [
                        { required: true, message: '收货店铺不能为空', trigger: 'blur' }
                    ],
                    orderselecarea: [
                        { required: true, message: '收货地址不能为空' }
                    ],
                    caStreet: [
                        { required: true, message: '详细地址不能为空', trigger: 'blur' }
                    ]
                },
                orderStoreIdList: [], // 高级搜索的数据
                orderStoreIdListother: [], // 修改仓库（不通于高级搜索的数据）
                splitOrderdialog: false, // 拆分订单弹框开关
                stromNamedialog: false, // 修改仓库弹框开关
                SlectAllRowIndex: [], // 判断多选操作下标
                orderSavebut: false, // 拆分订单保存
                orderSaveloading: false, // 防止保存多次提交
                SlectRowIndex: [], // 判断单选操作下标
                freamountdialog: false, // 修改运费弹框开关
                orderdialog: false, // 修改订单弹框开关
                rejectdailog: false, // 作废弹框开关
                lockOrderdailog: false, // 锁单弹框开关
                editorIndex: '', // 修改运费下标
                cateIdArray: null, // 商品分类
                value1: new Date(new Date().setHours(0, 0, 0, 0)),
                value2: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1),
                pickerOptionStart: {
                    disabledDate(time) {
                        return self.value2 ? time.getTime() < self.value2.getTime() - maxDate || time.getTime() > self.value2.getTime() : false;
                    }
                },
                pickerOptionEnd: {
                    disabledDate(time) {
                        return self.value1 ? time.getTime() > self.value1.getTime() + maxDate || time.getTime() < self.value1.getTime() : false;
                    }
                },
                selecarea: [],
                placeholder: '请输入订单号',
                selec_input: '',
                selec_selec2: '',
                selecRoworderId: '',
                selecteditorRow: '', // 单条信息选中
                selecRowArray: '', // 单选操作（操作数据存储）
                selectedArray: '', // 多选框（批量操作数据存储）
                tabCard_val: 'first',
                refundMer: {}, // 商品信息
                buyerInfor: null, // 买家信息
                logisticsInfor: null, // 物流信息
                memoInfor: null, // 备注信息
                refundJou: null, // 订单日志
                custMagNameList: [],  // 客户经理
                puboderSerData: {
                    searchType: 1,
                    orderId: '',
                    searchTimeType: 1,
                    startCreateDate: '',
                    endCreateDate: '',
                    caProvinceId: '',                         // 收货省id
                    caCityId: '',                         // 收货市id
                    caAreaId: '',                         // 收货区id
                    proOrgCode: '',                         // 商品分类
                    orderSource: '',                         // 订单来源 4 pc  1：android 2：ios 3：微信5：代客下单 6：其它',
                    orderStatus: 6,                         // 订单状态 ：1 已完成 2 已发货 3待发货 4已取消 5 待分配 6待审核',
                    orderType: '',                         // 订单类型 1一口价 2询报价',
                    payType: '',                         // 支付类型  4: 在线支付1：货到付款2：到店自提3：银行汇款',',
                    payStatus: '',                         // 支付状态 1:已支付,2:未支付,
                    orderStoreId: '',                         // 仓库id
                    orderMark: '',                         // 订单标签 1已锁定 2已拆分 3特批优惠 4修改运费5缺货
                    salesmanName: '',                        // 业务员姓名
                    orderException: 1,                               // 是否异常订单 1：无问题 2：有问题
                    orderByCreateTime: '',          // 下单时间排序  升序1降序2
                    orderBySendTime: ''        // 收货时间排序   升序1降序2
                },
                pubTabDatacon: [],
                productUrl: '/xe-route/xe-erp'
//                productUrl: ''
            };
        },
        created() {
            this.enquiryForm();
            this.orderStoreSearch(); // 仓库查询
        },
        methods: {
            updateSpecialSuc() {
                let _this = this;
                setTimeout(() => {
                    _this.enquiryForm();
                }, 300);
            },
            outDataDetail() {
                console.log('test', this.outerDetailUrl);
                window.open(this.outerDetailUrl, '_blank');
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            custMagNameChange() { // 修改订单客户经理选择
                this.custMagNameList.forEach(item => {
                    if (item.salesmanId === this.editorOrderForm.salesmanId) {
                        this.editorOrderForm.salesmanPhone = item.phone;
                        this.editorOrderForm.salesmanName = item.salesmanName;
                    }
                });
            },
            batchunLockOrder() { // 批量解锁
                if (this.selectedArray.length > 0) {
                    if (this.selectedArray.length <= 10) {
                        this.selecteditorRow = '';
                        let flage = false;
                        if (this.selectedArray.length > 0) {
                            this.selectedArray.some(item => {
                                if (item.orderMark) {
                                    if (item.orderMark.indexOf('1') !== -1) {
                                        flage = true;
                                    } else {
                                        flage = false;
                                    }
                                } else {
                                    flage = false;
                                }
                            });
                        }
                        if (!flage && !this.selecteditorRow) {
                            this.$xeMessage.warning('您勾选的订单已经是解锁状态，请重新选择');
                        } else {
                            this.$confirm('您确认解锁选中的订单吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.unLockOrdersubmit();
                            }).catch(() => {
                            });
                        }
                    } else {
                        this.$xeMessage.warning('“最多批量解锁 10 条订单，请重新选择');
                    }
                } else {
                    this.$xeMessage.warning('请选择需要解锁的锁定订单');
                }
            },
            batchlockOrder() { // 批量锁单
                if (this.selectedArray.length > 0) {
                    if (this.selectedArray.length <= 10) {
                        let flage = false;
                        if (this.selectedArray.length > 0) {
                            this.selectedArray.some(item => {
                                if (item.orderMark) {
                                    if (item.orderMark.indexOf('1') === -1) {
                                        flage = true;
                                    }
                                } else {
                                    flage = true;
                                }
                            });
                        }
                        if (!flage && !this.selecteditorRow) {
                            this.$xeMessage.warning('您勾选的订单已锁定，请重新选择');
                        } else {
                            this.selecteditorRow = '';
                            this.lockOrderdailog = true;
                        }
                    } else {
                        this.$xeMessage.warning('最多批量锁定 10 条订单，请重新选择');
                    }
                } else {
                    this.$xeMessage.warning('请选择需要锁定的订单');
                }
            },
            batchAuditOrder() { // 批量审核订单
                if (this.selectedArray.length > 0) {
                    if (this.selectedArray.length <= 10) {
                        this.selecteditorRow = '';
                        let flage = false;
                        if (this.selectedArray.length > 0) {
                            this.selectedArray.some(item => {
                                if (item.orderMark) {
                                    if (item.orderMark.indexOf('1') === -1) {
                                        flage = true;
                                    }
                                } else {
                                    flage = true;
                                }
                            });
                        }
                        if (!flage && !this.selecteditorRow) {
                            this.$xeMessage.warning('请联系锁单人或超级管理员进行解锁操作');
                        } else {
                            this.$confirm('您确认审核选中的订单吗？', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                this.auditOrder();
                            }).catch(() => {
                            });
                        }
                    } else {
                        this.$xeMessage.warning('最多批量审核 10 条订单，请重新选择。');
                    }
                } else {
                    this.$xeMessage.warning('请选择需要审核的订单');
                }
            },
            batchEditroStorm() { // 批量修改仓库名称
                if (this.selectedArray.length > 0) {
                    if (this.selectedArray.length <= 10) {
                        let flage = false;
                        if (this.selectedArray.length > 0) {
                            this.selectedArray.some(item => {
                                if (item.orderMark) {
                                    if (item.orderMark.indexOf('1') === -1) {
                                        flage = true;
                                    }
                                } else {
                                    flage = true;
                                }
                            });
                        }
                        if (!flage && !this.selecteditorRow) {
                            this.$xeMessage.warning('请联系锁单人或超级管理员进行解锁操作');
                        } else {
                            this.selecteditorRow = '';
                            this.stromNamedialog = true;
//                            if (!this.orderStoreIdListother.length) {
//                            }
                            this.orderStoreSearch(2);
                        }
                    } else {
                        this.$xeMessage.warning('最多批量修改 10 条订单的仓库，请重新选择。');
                    }
                } else {
                    this.$xeMessage.warning('请先选择需要修改仓库的订单');
                }
            },
            batchTovoid() { // 批量作废订单
                if (this.selectedArray.length > 0) {
                    if (this.selectedArray.length <= 10) {
                        let flage = false;
                        if (this.selectedArray.length > 0) {
                            this.selectedArray.some(item => {
                                if (item.orderMark) {
                                    if (item.orderMark.indexOf('1') === -1) {
                                        flage = true;
                                    }
                                } else {
                                    flage = true;
                                }
                            });
                        }
                        if (!flage && !this.selecteditorRow) {
                            this.$xeMessage.warning('请联系锁单人或超级管理员进行解锁操作');
                        } else {
                            this.rejectdailog = true;
                            this.selecteditorRow = '';
                        }
                    } else {
                        this.$xeMessage.warning('最多批量作废 10 条订单，请重新选择');
                    }
                } else {
                    this.$xeMessage.warning('请先选择需要作废的订单');
                }
            },
            batchSplitOrderFor() { // 批量拆分订单
                this.selecteditorRow = '';
                if (this.selectedArray.length > 0) {
                    if (this.selectedArray.length === 1) {
                        if (this.selectedArray[0].splitOrderStatus === 1) {
                            console.log(this.selectedArray[0].orderMark);
                            if (this.selectedArray[0].orderMark && this.selectedArray[0].orderMark.indexOf('1') === -1) {
                                if (!this.orderStoreIdListother.length) {
                                    this.orderStoreSearch(2);
                                }
                                this.rowTitlist = this.selectedArray[0];
                                this.splitOrderdialog = true;
                                this.orderInfoDetail(this.selectedArray[0].orderId);
                                console.log('开始拆分');
                            } else if (!this.selectedArray[0].orderMark) {
                                if (!this.orderStoreIdListother.length) {
                                    this.orderStoreSearch(2);
                                }
                                this.rowTitlist = this.selectedArray[0];
                                this.splitOrderdialog = true;
                                this.orderInfoDetail(this.selectedArray[0].orderId);
                                console.log('开始拆分');
                            } else {
                                this.$xeMessage.warning('请联系锁单人或超级管理员进行解锁操作');
                            }
                        } else if (this.selectedArray[0].splitOrderStatus === 2) {
                            this.$xeMessage.warning('当前订单为已拆分订单，不可重复拆分');
                        }
                    } else {
                        this.$xeMessage.warning('仅支持对单条订单进行拆分，请选择单条订单操作');
                    }
                } else {
                    this.$xeMessage.warning('请先选择需要拆分的订单');
                }
            },
            toggleSelection(rows) { // 点击左侧单项修改的时候清空多选项
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            searchTypeSelec() {
                this.puboderSerData.orderId = '';
            },
            searchTimeTypeSelec() {
//                this.value1 = '';
//                this.value2 = '';
            },
            startCreateDateFn(val) {
                this.startCreateDates = val;
            },
            endCreateDateFn(val) {
                this.endCreateDates = val;
            },
            splitOrderForWebCk(row) { // 单条拆分订单
                this.toggleSelection();
                this.splitOrderdialog = true;
                this.rowTitlist = row;
                this.orderInfoDetail(row.orderId);
                if (!this.orderStoreIdListother.length) {
                    this.orderStoreSearch(2);
                }
            },
            auditOrderCk(row) { // 单条数据审核
                this.selecteditorRow = row;
                this.toggleSelection();
                this.$confirm('您确认审核当前订单吗？', '审核', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.auditOrder();
                }).catch(() => {
                });
            },
            rowTovoid(index, row) { // 单条数据作废
                this.rejectdailog = true;
                this.SlectAllRowIndex = index;
                this.selecteditorRow = row;
                this.toggleSelection();
            },
//            editStorename(index, row) { // 修改仓库
//                this.stromNamedialog = true;
//                if (!this.orderStoreIdListother) {
//                    this.orderStoreSearch(2);
//                }
//                this.SlectAllRowIndex = index;
//                this.selecteditStorename = row.storeId;
//                this.stromNameForm.storeId = row.storeId;
//                this.selecteditorRow = row;
//                this.toggleSelection();
//            },
            editFreamount(index, row) { // 修改运费
                this.freamountdialog = true;
                this.selecteditorRow = row;
                this.SlectRowIndex = index;
                if (row.freAmount) {
                    this.freamountForm.freAmount = parseFloat(row.freAmount).toFixed(2);
                } else {
                    this.freamountForm.freAmount = '';
                }
            },
            editOrder(index, row) { // 修改订单
                this.orderdialog = true;
                this.selecteditorRow = row;
                this.SlectRowIndex = index;
                this.editorOrderForm.caConsignee = row.caConsignee;
                this.editorOrderForm.caPhone = row.caPhone;
                this.editorOrderForm.storeName = row.caStoreName;
                this.editorOrderForm.orderselecarea = [parseFloat(row.caProvinceId), parseFloat(row.caCityId), parseFloat(row.caAreaId)];
                this.editorOrderForm.caStreet = row.caStreet;
                this.editorOrderForm.orderId = row.orderId;
                this.editorOrderForm.orderMark = row.orderMark;
                this.editorOrderForm.caProvinceId = row.caProvinceId;
                this.editorOrderForm.caCityId = row.caCityId;
                this.editorOrderForm.caAreaId = row.caAreaId;
                this.editorOrderForm.salesmanId = row.salesmanId;
                this.custMagName(); // 客户经理下拉框数据调取
                if (this.editorOrderForm.salesmanId) {
                    this.custMagNameChange();
                }
            },
            orderStoreSearch(editor) {
                let params = {};
                if (editor) {
                    params.storeStatus = editor;
                }
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/storeManager/queryStoreNameList`,
                    data: params
                }).then((res) => {
                    this.orderStoreIdList = res.data.actionList;
                    if (editor) {
                        this.orderStoreIdListother = res.data.actionList;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            parseFloatNum(event) {
                let value = event.target.value;
//                let value = parseFloat(event.target.value).toFixed(2);
                if (value >= 0) {
                    event.target.value = value;
                } else {
                    event.target.value = '';
                }
            },
            rejectSubmit() {
                if (this.rejectext) {
                    this.cancelOrder();
                } else {
                    this.$xeMessage.warning('请填写订单的作废原因。');
                }
            },
            unLockOrdersubmit() { // 解锁提交
                let flage = false;
                let obj = [];
                for (let i = 0, len = this.selectedArray.length; i < len; i++) {
                    if (this.selectedArray[i].orderMark) {
                        if (this.selectedArray[i].orderMark.indexOf('1') !== -1) {
                            flage = true;
                            break;
                        } else {
                            flage = false;
                        }
                    }
                }
                if (this.selectedArray.length > 0) {
                    this.selectedArray.forEach(item => {
                        if (item.orderMark) {
                            if (item.orderMark.indexOf('1') !== -1) {
                                obj.push({
                                    orderId: item.orderId,
                                    lockStatus: 1,
                                    orderMark: item.orderMark,
                                    modfiyUser: item.modfiyUser
                                });
                            }
                        }
                    });
                }
                if (flage) {
                    this.unLockOrder(obj);
                } else {
                    this.$xeMessage.warning('请选择已经锁定的订单');
                }
            },
            custMagName() { // 客户经理接口掉取
                let params = {};
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/querySalesMan`,
                    data: params
                }).then((res) => {
                    this.custMagNameList = res.data.list;
                }).catch((error) => {
                    console.log(error);
                });
            },
            unLockOrder(obj) { // 解锁接口掉取
                let params = {};
                let _this = this;
                params.xeVenOrderForm = obj;
                console.log('params-unLockOrder->', params);
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/unLockOrder`,
                    data: params
                }).then((res) => {
                    this.$xeMessage.success(`${res.msg}`);
                    setTimeout(() => {
                        _this.enquiryForm();
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            },
            lockOrderSubmit() { // 锁定提交操作
                if (this.lockOrderrejectext) {
                    let flage = false;
                    let obj = [];
                    for (let i = 0, len = this.selectedArray.length; i < len; i++) {
                        if (this.selectedArray[i].orderMark) {
                            if (this.selectedArray[i].orderMark.indexOf('1') === -1) {
                                flage = true;
                                break;
                            } else {
                                flage = false;
                            }
                        } else {
                            flage = true;
                            break;
                        }
                    }
                    if (this.selectedArray.length > 0) {
                        this.selectedArray.forEach(item => {
                            if (item.orderMark) {
                                if (item.orderMark.indexOf('1') === -1) {
                                    obj.push({
                                        orderId: item.orderId,
                                        orderMark: item.orderMark,
                                        lockStatus: 2,
                                        lockRemark: this.lockOrderrejectext
                                    });
                                }
                            } else {
                                obj.push({
                                    orderId: item.orderId,
                                    orderMark: item.orderMark,
                                    lockStatus: 2,
                                    lockRemark: this.lockOrderrejectext
                                });
                            }
                        });
                    }
                    if (flage) {
                        this.lockOrder(obj);
                    } else {
                        this.$xeMessage.warning('您勾选的订单已锁定，请重新选择');
                    }
                } else {
                    this.$xeMessage.warning('请填写锁单原因。');
                }
            },
            lockOrder(obj) { // 锁定订单接口
                let params = {};
                let _this = this;
                params.xeVenOrderForm = obj;
                console.log('params-->', params);
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/lockOrder`,
                    data: params
                }).then((res) => {
                    this.$xeMessage.success(`${res.msg}`);
                    this.lockOrderdailog = false;
                    setTimeout(() => {
                        _this.enquiryForm();
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            },
            unSplitOrder(index, row) { // 取消拆分订单接口
                this.selecteditorRow = row;
                this.SlectRowIndex = index;
                this.$confirm('取消拆分后，当前订单和关联的子订单将还原为原始的主订单，您确认取消拆分吗？(若还原的主订单库存不足，将会流转至异常订单)', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.cancelsplitOrder();
                }).catch(() => {
                });
            },
            cancelsplitOrder() {
                let params = {};
                let _this = this;
                if (this.selecteditorRow) { // 单条取消拆分订单
                    params.orderId = this.selecteditorRow.orderId;
                    params.orderStatus = this.selecteditorRow.orderStatus;
                    params.lockStatus = this.selecteditorRow.lockStatus;
                    params.parentOrderid = this.selecteditorRow.parentOrderid;
                    params.version = this.selecteditorRow.version;
                }
                console.log('params-->', params);
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/split/unSplitOrder`,
                    data: params
                }).then((res) => {
                    if (res.data.code === '3000') {
                        this.$xeMessage.success(`${res.data.msg}`);
                        setTimeout(() => {
                            _this.enquiryForm();
                        }, 300);
//                        this.pubTabDatacon[this.SlectRowIndex].splitOrderStatus = 1;
                    } else {
                        this.$xeMessage.error(`${res.data.msg}`);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            auditOrder() { // 审核订单接口
                let params = {};
                let _this = this;
                let obj = [];
                let flage = false;
                if (this.selectedArray.length > 0) {
                    this.selectedArray.some(item => {
                        if (item.orderMark) {
                            if (item.orderMark.indexOf('1') === -1) {
                                flage = true;
                                obj.push({
                                    lockStatus: item.lockStatus,
                                    orderId: item.orderId,
                                    orderStatus: item.orderStatus,
                                    parentOrderid: item.parentOrderid,
                                    storeId: item.storeId,
                                    version: item.version
                                });
                            }
                        } else {
                            flage = true;
                            if (this.selectedArray.length > 0) { // 批量审核订单
                                obj.push({
                                    lockStatus: item.lockStatus,
                                    orderId: item.orderId,
                                    orderStatus: item.orderStatus,
                                    parentOrderid: item.parentOrderid,
                                    storeId: item.storeId,
                                    version: item.version
                                });
                            }
                        }
                    });
                }
                if (!flage && !this.selecteditorRow) {
                    this.$xeMessage.warning('请联系锁单人或超级管理员进行解锁操作');
                }
                if (this.selecteditorRow || flage) {
                    if (this.selecteditorRow) { // 单条审核订单
                        obj.push({
                            lockStatus: this.selecteditorRow.lockStatus,
                            orderId: this.selecteditorRow.orderId,
                            orderStatus: this.selecteditorRow.orderStatus,
                            parentOrderid: this.selecteditorRow.parentOrderid,
                            storeId: this.selecteditorRow.storeId,
                            version: this.selecteditorRow.version
                        });
                    }
                    params.xeVenOrderForm = obj;
                    this.$http({
                        method: 'post',
                        url: `${this.productUrl}/order/batchAuditOrder`,
                        data: params
                    }).then((res) => {
                        this.$xeMessage.success(`${res.msg}`);
                        setTimeout(() => {
                            _this.enquiryForm();
                        }, 300);
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            },
            cancelOrder() { // 废弃订单接口
                let params = {};
                let _this = this;
                let obj = [];
                let flage = false;
                if (this.selectedArray.length > 0) {
                    this.selectedArray.some(item => {
                        if (item.orderMark) {
                            if (item.orderMark.indexOf('1') === -1) {
                                flage = true;
                                obj.push({
                                    orderId: item.orderId,
                                    storeId: item.storeId,
                                    version: item.version,
                                    lockStatus: item.lockStatus,
                                    parentOrderid: item.parentOrderid,
                                    orderStatus: item.orderStatus,
                                    payType: item.payType,
                                    payStatus: item.payStatus,
                                    cancelRemark: this.rejectext
                                });
                            }
                        } else {
                            flage = true;
                            if (this.selectedArray.length > 0) { // 批量废弃订单
                                console.log('this.selectedArra----y', item);
                                obj.push({
                                    orderId: item.orderId,
                                    storeId: item.storeId,
                                    version: item.version,
                                    lockStatus: item.lockStatus,
                                    parentOrderid: item.parentOrderid,
                                    orderStatus: item.orderStatus,
                                    payType: item.payType,
                                    payStatus: item.payStatus,
                                    cancelRemark: this.rejectext
                                });
                            }
                        }
                    });
                }
                if (!flage && !this.selecteditorRow) {
                    this.$xeMessage.warning('请联系锁单人或超级管理员进行解锁操作');
                }
                if (this.selecteditorRow || flage) {
                    if (this.selecteditorRow) { // 单条废弃订单
                        obj.push({
                            orderId: this.selecteditorRow.orderId,
                            storeId: this.selecteditorRow.storeId,
                            version: this.selecteditorRow.version,
                            lockStatus: this.selecteditorRow.lockStatus,
                            parentOrderid: this.selecteditorRow.parentOrderid,
                            orderStatus: this.selecteditorRow.orderStatus,
                            payType: this.selecteditorRow.payType,
                            payStatus: this.selecteditorRow.payStatus,
                            cancelRemark: this.rejectext
                        });
                    }
                    params.xeVenOrderForm = obj;
                    this.$http({
                        method: 'post',
                        url: `${this.productUrl}/order/cancelOrder`,
                        data: params
                    }).then((res) => {
                        this.rejectdailog = false;
                        this.$xeMessage.success(`${res.msg}`);
                        setTimeout(() => {
                            _this.enquiryForm();
                        }, 300);
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            },
            updateOrderStore() { // 仓库修改接口
                let params = {};
                let obj = [];
                let _this = this;
                let flage = false;
                if (this.selectedArray.length > 0) {
                    this.selectedArray.some(item => {
                        if (item.orderMark) {
                            if (item.orderMark.indexOf('1') === -1) {
                                flage = true;
                                obj.push({orderId: item.orderId, lockStatus: item.lockStatus, storeId: this.stromNameForm.storeId, orderMark: item.orderMark});
                            }
                        } else {
                            flage = true;
                            if (this.selectedArray.length > 0) { // 批量仓库修改
                                obj.push({orderId: item.orderId, lockStatus: item.lockStatus, storeId: this.stromNameForm.storeId, orderMark: item.orderMark});
                            }
                        }
                    });
                }
                if (!flage && !this.selecteditorRow) {
                    this.$xeMessage.warning('请联系锁单人或超级管理员进行解锁操作');
                }
                if (this.selecteditorRow || flage) {
                    if (this.selecteditorRow) { // 单条仓库修改
                        obj.push({
                            orderId: this.selecteditorRow.orderId,
                            lockStatus: this.selecteditorRow.lockStatus,
                            storeId: this.stromNameForm.storeId
                        });
                    }
                    params.xeVenOrderForm = obj;
                    this.$http({
                        method: 'post',
                        url: `${this.productUrl}/order/updateOrderStore`,
                        data: params
                    }).then((res) => {
                        if (res.data.code === '3000') {
                            this.stromNamedialog = false;
                            this.$xeMessage.success(`${res.data.msg}`);
                            setTimeout(() => {
                                _this.enquiryForm();
                            }, 300);
                        } else {
                            this.$xeMessage.warning(`${res.data.msg}`);
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            },
            stromNamesubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updateOrderStore();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            freamountsubmit(formName) { // 修改运费提交
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.freAmountForm();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            ordersubmit(formName) { // 修改订单提交
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updateOrderInfo();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            updateOrderInfo() { // 修改订单接口
                let _this = this;
                let obj = {
                    orderId: this.selecteditorRow.orderId,
                    lockStatus: this.selecteditorRow.lockStatus,
                    payType: this.selecteditorRow.payType,
                    payStatus: this.selecteditorRow.payStatus,
                    orderMark: this.selecteditorRow.orderMark
                };
                if (this.editorOrderForm.orderselecarea) {
                    if (this.editorOrderForm.orderselecarea.length > 0 && this.editorOrderForm.orderselecarea[0]) {
                        obj.caProvinceId = this.editorOrderForm.orderselecarea[0];
                    }
                    if (this.editorOrderForm.orderselecarea.length > 1 && this.editorOrderForm.orderselecarea[1]) {
                        obj.caCityId = this.editorOrderForm.orderselecarea[1];
                    }
                    if (this.editorOrderForm.orderselecarea.length > 2 && this.editorOrderForm.orderselecarea[2]) {
                        obj.caAreaId = this.editorOrderForm.orderselecarea[2];
                    }
                }
                let params = Object.assign(this.editorOrderForm, obj);
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/updateOrderInfo`,
                    data: params
                }).then((res) => {
                    this.orderdialog = false;
                    this.$xeMessage.success(`${res.msg}`);
                    setTimeout(() => {
                        _this.enquiryForm();
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            },
            freAmountForm() { // 修改运费
                let obj = {
                    orderId: this.selecteditorRow.orderId,
                    userId: this.selecteditorRow.userId,
                    lockStatus: this.selecteditorRow.lockStatus,
                    payType: this.selecteditorRow.payType,
                    payStatus: this.selecteditorRow.payStatus,
                    orderMark: this.selecteditorRow.orderMark
                };
                let params = Object.assign(this.freamountForm, obj);
                let _this = this;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/updateFreAmount`,
                    data: params
                }).then((res) => {
                    if (res.data.code === '3000') {
                        this.freamountdialog = false;
                        this.$xeMessage.success(`${res.data.msg}`);
//                        if (this.selecteditorRow) { // 右侧单独操作成功（table表中对应展示成功修改的运费总额）
//                            this.pubTabDatacon[this.SlectRowIndex].freAmount = this.freamountForm.freAmount;
//                        }
                        setTimeout(() => {
                            _this.enquiryForm();
                        }, 300);
                    } else {
                        this.$xeMessage.error(`${res.data.msg}`);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            orderIdSelectclick(index, ids) {
                this.selecRoworderId = ids;
                this.selecRowArray = this.pubTabDatacon[index];
                this.buyerInfor = this.selecRowArray;
                this.memoInfor = this.selecRowArray;
                if (this.tabCard_val === 'first') {
                    this.orderInfoDetail();
                }
                if (this.tabCard_val === 'third') {
                    this.logisticsInforForm();
                }
                if (this.tabCard_val === 'five') {
                    this.refundJouForm();
                }
            },
            enquiryForm() {
                let params = {};
                params = this.puboderSerData;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                if (this.cateIdArray) {
                    let cateId = this.cateIdArray;
                    params.proOrgCode = cateId.slice(cateId.length - 1, cateId.length).join(',');
                }
                if (this.selecarea.length) {
                    if (this.selecarea.length > 0 && this.selecarea[0]) {
                        params.caProvinceId = this.selecarea[0];
                    }
                    if (this.selecarea.length > 1 && this.selecarea[1]) {
                        params.caCityId = this.selecarea[1];
                    }
                    if (this.selecarea.length > 2 && this.selecarea[2]) {
                        params.caAreaId = this.selecarea[2];
                    }
                } else {
                    params.caProvinceId = '';
                    params.caCityId = '';
                    params.caAreaId = '';
                }
                if (!this.startCreateDates) {
                    if (this.value1) {
                        params.startCreateDate = millisecondFormat(this.value1.getTime(), 'ms');
                    }
                }
                if (!this.endCreateDates) {
                    if (this.value2) {
                        params.endCreateDate = millisecondFormat(this.value2.getTime(), 'ms');
                    }
                }
                this.outerUrl = '/xe-route/xe-erp/orderCenterExport/exportHandleOrderList?caAreaId=' + params.caAreaId + '&caCityId=' + params.caCityId + '&caProvinceId=' + params.caProvinceId + '&endCreateDate=' + params.endCreateDate + '&orderByCreateTime=' + params.orderByCreateTime + '&orderBySendTime=' + params.orderBySendTime + '&orderException=' + params.orderException + '&orderId=' + params.orderId + '&orderMark=' + params.orderMark + '&orderSource=' + params.orderSource + '&orderStatus=' + params.orderStatus + '&orderStoreId=' + params.orderStoreId + '&orderType=' + params.orderType + '&payStatus=' + params.payStatus + '&payType=' + params.payType + '&proOrgCode=' + params.proOrgCode + '&salesmanName=' + params.salesmanName + '&searchTimeType=' + params.searchTimeType + '&searchType=' + params.searchType + '&startCreateDate=' + params.startCreateDate;
                this.outerDetailUrl = '/xe-route/xe-erp/orderCenterExport/exportHandleOrderDetail?caAreaId=' + params.caAreaId + '&caCityId=' + params.caCityId + '&caProvinceId=' + params.caProvinceId + '&endCreateDate=' + params.endCreateDate + '&orderByCreateTime=' + params.orderByCreateTime + '&orderBySendTime=' + params.orderBySendTime + '&orderException=' + params.orderException + '&orderId=' + params.orderId + '&orderMark=' + params.orderMark + '&orderSource=' + params.orderSource + '&orderStatus=' + params.orderStatus + '&orderStoreId=' + params.orderStoreId + '&orderType=' + params.orderType + '&payStatus=' + params.payStatus + '&payType=' + params.payType + '&proOrgCode=' + params.proOrgCode + '&salesmanName=' + params.salesmanName + '&searchTimeType=' + params.searchTimeType + '&searchType=' + params.searchType + '&startCreateDate=' + params.startCreateDate;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/queryHandleOrderList`,
                    data: params
                }).then((res) => {
                    this.pagelist.total = res.data.xePageInfo.total;
                    this.pubTabDatacon = res.data.actionList;
                    if (res.data.actionList && res.data.actionList.length > 0) {
                        this.selecRowArray = res.data.actionList[0];
                        this.buyerInfor = res.data.actionList[0]; // 买家信息默认显示第一条
                        this.memoInfor = res.data.actionList[0]; // 备注信息默认显示第一条
                        this.selecRoworderId = res.data.actionList[0].orderId; // 默认展示第一条物流单号
                    } else {
                        this.selecRowArray = {};
                        this.buyerInfor = {}; // 买家信息默认显示第一条
                        this.memoInfor = {}; // 备注信息默认显示第一条
                        if (!res.data.actionList[0]) {
                            this.selecRoworderId = ''; // 默认展示第一条物流单号
                        }
                    }
                    this.orderInfoDetail(); // 默认展示商品信息第一条数据
                }).catch((error) => {
                    console.log(error);
                });
            },
            orderInfoDetail(orderId) { // 查询订单详情信息(tab卡商品信息)
                let params = {};
                if (this.selecRoworderId || orderId) {
                    if (orderId) {
                        this.rowtableData = [];
                        params.orderId = orderId;
                    } else {
                        params.orderId = this.selecRoworderId;
                    }
                    this.$http({
                        method: 'post',
                        url: `${this.productUrl}/order/queryOrderInfoDetail`,
                        data: params
                    }).then((res) => {
                        if (orderId) {
                            this.rowtableData = res.data;
                        } else {
                            this.refundMer = res.data;
                            this.refundMer.orderInfoDetail.forEach((item) => {
                                if (item.specialDisamount) {
                                    item.specialDisamount = parseFloat(item.specialDisamount).toFixed(2);
                                    this.$set(item, 'specialDisamounts', item.specialDisamount);
                                }
                            });
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    this.refundMer = {};
                }
            },
            logisticsInforForm() { // 物流信息(tab选项卡)
                let params = {};
                params.orderId = this.selecRoworderId;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/queryOrderLogistics`,
                    data: params
                }).then((res) => {
                    this.logisticsInfor = res.data.logisticsList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            refundJouForm() { // 订单日志(tab选项卡)
                let params = {};
                params.key = this.selecRoworderId;
                if (params.key) {
                    this.$http({
                        method: 'post',
                        url: `${this.productUrl}/order/queryOrderInfoLog`,
                        data: params
                    }).then((res) => {
                        this.refundJou = res.data.logisticsList;
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.selecarea = [];
                this.cateIdArray = [];
                this.value1 = '';
                this.value2 = '';
                this.enquiryForm();
            },
            handleSelectionChange(val) {
                this.selecRowArray = '';
                this.selecteditStorename = '';
                this.selectedArray = val;
            },
            handleSizeChange(val) {
                this.pagelist.pageSize = val;
                this.enquiryForm();
            },
            handleCurrentChange(val) {
                if (val > 0) {
                    this.pagelist.pageNum = val;
                    this.enquiryForm();
                }
            },
            handleClick(tab, event) {
                if (tab.name === 'first') {
                    this.orderInfoDetail();
                } else if (tab.name === 'second') {
                } else if (tab.name === 'third') {
                    this.logisticsInforForm();
                } else if (tab.name === 'fourth') {
                } else if (tab.name === 'five') {
                    this.refundJouForm();
                }
            },
            startChaifen() { // 拆分订单保存
                this.orderSaveloading = true;
            },
            splitOrderSave() {
                this.orderSavebut = true;
            },
            startChaifenErr() {
                this.orderSaveloading = false;
                this.orderSavebut = false;
            },
            startChaifensuces() { // 拆单成功
                let _this = this;
                this.splitOrderdialog = false;
                setTimeout(() => {
                    _this.enquiryForm();
                }, 300);
            }
        },
        watch: {
            'puboderSerData.searchType'(n) {
                if (n === 1) {
                    this.placeholder = '请输入订单号';
                } else if (n === 2) {
                    this.placeholder = '请输入支付流水账号';
                } else if (n === 3) {
                    this.placeholder = '请输入商品名称';
                } else if (n === 4) {
                    this.placeholder = '请输入商品货号';
                } else if (n === 5) {
                    this.placeholder = '请输入收货人';
                } else if (n === 6) {
                    this.placeholder = '请输入客户账号';
                }
            },
            stromNamedialog(n) { // 仓库
                let _this = this;
                if (n === false) {
                    setTimeout(() => {
                        _this.$refs.stromNameForm.resetFields();
                    }, 300);
                }
            },
            freamountdialog(n) { // 运费
                let _this = this;
                if (n === false) {
                    setTimeout(() => {
                        _this.$refs.freamountForm.resetFields();
                    }, 300);
                }
            },
            orderdialog(n) { // 订单
                let _this = this;
                if (n === false) {
                    setTimeout(() => {
                        _this.$refs.editorOrderForm.resetFields();
                    }, 300);
                }
            },
            rejectdailog(n) {
                let _this = this;
                if (n === false) {
                    setTimeout(() => {
                        _this.rejectext = '';
                    }, 300);
                }
            },
            lockOrderdailog(n) {
                let _this = this;
                if (n === false) {
                    setTimeout(() => {
                        _this.lockOrderrejectext = '';
                    }, 300);
                }
            },
            splitOrderdialog(n) {
//                let _this = this;
                if (n === false) {
                    setTimeout(() => {
//                        _this.lockOrderrejectext = '';
                    }, 300);
                }
            }
        },
        computed: {
            startCreateDates: {
                get() {
                    return this.puboderSerData.startCreateDate;
                },
                set(val) {
                    if (!val) {
                        this.puboderSerData.startCreateDate = '';
                    } else {
                        this.puboderSerData.startCreateDate = val;
                    }
                }
            },
            endCreateDates: {
                get() {
                    return this.puboderSerData.endCreateDate;
                },
                set(val) {
                    if (!val) {
                        this.puboderSerData.endCreateDate = '';
                    } else {
                        this.puboderSerData.endCreateDate = val;
                    }
                }
            },
            orderSourceList() {
                return orderSource;
            },
            orderStatusList() {
                return orderStatus;
            },
            orderTypeList() {
                return orderType;
            },
            payStatusList() {
                return payStatus;
            },
            searchTypeList() {
                return searchTypeOne;
            },
            searchTimeTypeList() {
                let searchTimeTypeOnes = [];
                searchTimeTypeOne.forEach((item) => {
                    if (item.value !== 3) {
                        searchTimeTypeOnes.push(item);
                    }
                });
                return searchTimeTypeOnes;
            },
            payTypeList() {
                return payTypeListOne;
            }
        },
        components: {
            areaselectTag,
            splitOrderdialog,
            categoryTag,
            refundMerchandise,
            buyerInformation,
            logisticsInformation,
            memoInformation,
            refundJournal
        }
    };
</script>
