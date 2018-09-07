<template lang="html">
    <div class="m-router-con con-salesApply">
        <!--新建优惠券-->
        <el-form :inline="true" :model="formDate" :rules="rules" ref="formDate" label-width="104px">
            <h4 class="tit-salesApply">优惠券基本信息</h4>
            <div class="floor-salesApply">
                <el-form-item label="优惠券名称" prop="couName">
                    <el-input size="small" v-model="formDate.couName" :maxlength="10" class="xe-input-col3" placeholder="请填写优惠券名称"></el-input>
                </el-form-item>
            </div>
            <div class="floor-salesApply">
                <el-form-item label="使用位置" prop="usePlat">
                    <el-radio-group v-model="formDate.usePlat">
                        <el-radio :label="1">全平台</el-radio>
                        <el-radio :label="2">移动专享</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <div class="floor-salesApply floor-areaSelect">
                <!-- {{formData.areaId}} -->
                <el-form-item label="使用区域" prop="useArea">
                    <el-input size="small" :disabled="nationwideValue === 1" class="xe-input-col3" readonly="readonly" placeholder="省/市/区" @focus="dialogTableVisible = true"></el-input>
                    <el-checkbox :true-label="1" :false-label="2" v-model="nationwideValue" @change="nationwideFn" style=" margin-left: 8px; line-height: 36px;">全国</el-checkbox>
                    <div class="salesApply-val" v-show="!(nationwideValue === 1)">
                        <el-tag
                            v-for="(tag, index) in areaTags"
                            :key="tag.areaId"
                            @close="areaTagsClose(tag.areaId, index)"
                            :closable="true">
                            {{tag.areaName}}
                        </el-tag>
                    </div>
                </el-form-item>
            </div>
            <div class="floor-salesApply">
                <el-form-item label="商品范围" prop="useRange">
                    <el-radio-group v-model="formDate.useRange">
                        <el-radio :label="1">全部商品</el-radio>
                        <el-radio :label="2">指定品类</el-radio>
                        <el-radio :label="3">指定商品</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <div class="floor-salesApply" v-if="formDate.useRange === 2">
                <!-- {{formData.areaId}} -->
                <el-form-item label="商品品类"  prop="useCate">
                    <el-input size="small" class="xe-input-col3" readonly="readonly" placeholder="商品分类" @focus="dialogcategoryVisible = true" style="margin-bottom: 5px;"></el-input>
                    <div class="salesApply-val">
                        <el-tag
                            v-for="(tag, index) in cateTags"
                            :key="tag.cateId"
                            @close="cateTagsClose(tag.cateId, index)"
                            :closable="true">
                            {{tag.cateName}}
                        </el-tag>
                    </div>
                </el-form-item>
            </div>
            <div class="floor-salesApply" v-if="formDate.useRange === 3">
                <el-form-item label="选择商品" prop="listProType">
                    <el-button @click="dialogProTable = true" class="btn-gray"><i class="iconfont icon-xinzeng"></i> 添加商品</el-button>
                </el-form-item>
                <el-form-item class="salesApply-table" v-if="formDate.listProType.length">
                    <el-table
                        ref="multipleTable"
                        :data="formDate.listProType"
                        border
                        tooltip-effect="dark"
                        style="width: 100%">
                        <el-table-column
                            class-name="td-index"
                            label=""
                            fixed
                            width="35">
                            <template scope="props">
                                <span>{{props.$index + 1}}</span>
                            </template>
                        </el-table-column>
                        <!--<el-table-column label="商品图" width="116">-->
                            <!--<template scope="scope">-->
                                <!--<img :src="picServer + scope.row.proMainImg" style="width: 80px; height: 80px; vertical-align: top;" alt="">-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column prop="proSku" label="SKU编码" width="140"></el-table-column>-->
                        <el-table-column prop="proName" label="商品名称" min-width="130"></el-table-column>
                        <el-table-column prop="proNum" label="商品货号" width="120"></el-table-column>
                        <el-table-column prop="cateName" label="商品分类" min-width="150"></el-table-column>
                        <el-table-column label="计量方式" width="90">
                            <template scope="scope">
                                {{scope.row.pricingType | pricingTypeToText}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="proUnit" label="单位" width="85"></el-table-column>
                        <el-table-column label="规格" width="120">
                            <template scope="scope">
                                {{scope.row.proSpec ? scope.row.proSpec : '无'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="costPrice" label="成本价" width="85"></el-table-column>
                        <el-table-column prop="skuPrice" label="销售价格" width="85"></el-table-column>
                        <el-table-column
                            label="操作"
                            fixed="right"
                            width="65">
                            <template scope="props">
                                <div class="btn-in-table">
                                    <a href="javascript:;" class="s-blue" @click.navtive.prevent="deleteRow(props.$index)">删除</a>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </div>
            <div class="floor-salesApply floorTwo-salesApply">
                <el-radio-group v-model="formDate.useTimeType">
                    <el-form-item label="优惠券有效时间" prop="activeTimeArrs">
                        <div class="list-floorTwo">
                            <el-radio :label="1" name="typeTime">固定时段</el-radio>
                            &nbsp;
                            <el-date-picker
                                size="small"
                                v-model="formDate.activeTimeArrs"
                                type="datetimerange"
                                :picker-options="timeOptions"
                                @change="activeTimeChange"
                                range-separator=" 至 "
                                placeholder="选择优惠券有效时间范围">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    <el-form-item prop="activeDay" style="display: block; padding-left: 105px;">
                        <div>
                            <el-radio :label="2" name="typeTime">固定天数</el-radio>
                            &nbsp;
                            优惠券到账后 <el-input size="small" v-model.number="formDate.activeDay" @input.native='shelfLifeFn($event)' :maxlength='4' class="xe-input-short"></el-input> 天内有效
                        </div>
                    </el-form-item>
                </el-radio-group>
            </div>
            <div class="floor-salesApply floorTwo-salesApply">
                <el-radio-group v-model="formDate.useRuleType">
                    <el-form-item label="优惠规则" prop="useOrderAmount">
                        <div class="list-floorTwo">
                            <el-radio :label="1" name="typeRules">订单商品金额满</el-radio>
                            &nbsp;
                            <el-input v-model.number="formDate.useOrderAmount" @blur="formDate.useOrderAmount = parseFloat(formDate.useOrderAmount) ? Math.abs(parseFloat(formDate.useOrderAmount)).toFixed(2) : ''" size="small" class="xe-input-short"></el-input>
                            减
                            <el-input v-model.number="formDate.useDisAmount" size="small" class="xe-input-short" @blur="useDisAmountBlur"></el-input> 元
                        </div>
                    </el-form-item>
                    <el-form-item style="display: block; padding-left: 105px;" prop="useDisAmountNum">
                        <div>
                            <el-radio :label="2" name="typeRules">无门槛优惠减免</el-radio>
                            &nbsp;
                            <el-input v-model.number="formDate.useDisAmountNum" @blur="formDate.useDisAmountNum = parseFloat(formDate.useDisAmountNum) ? Math.abs(parseFloat(formDate.useDisAmountNum)).toFixed(2) : ''" size="small" class="xe-input-short"></el-input> 元
                        </div>
                    </el-form-item>
                </el-radio-group>
            </div>
            <h4 class="tit-salesApply tit-ruleTickets">优惠券发放规则</h4>
            <div class="floor-salesApply">
                <el-form-item label="发放方式" prop="sendType">
                    <el-radio-group v-model="formDate.sendType">
                        <el-radio :label="1">买家领取</el-radio>
                        <el-radio :label="2">指定条件发放</el-radio>
                        <el-radio :label="3">指定用户发放</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <div class="floor-salesApply" v-if="formDate.sendType !== 3" >
                <el-form-item label="发放时间" prop="sendTimeArrs" :key="formDate.sendType">
                    <div class="list-floorTwo">
                        <el-date-picker
                            size="small"
                            v-model="formDate.sendTimeArrs"
                            type="datetimerange"
                            :picker-options="timeOptions"
                            @change="sendTimeChange"
                            range-separator=" 至 "
                            placeholder="选择优惠券有效时间范围">
                        </el-date-picker>
                    </div>
                </el-form-item>
            </div>
            <div class="floor-salesApply" v-if="formDate.sendType !== 3">
                <el-form-item label="发行数量" prop="sendNum" :key="formDate.sendType">
                    <div>
                        <el-input size="small" v-model.number="formDate.sendNum" @input.native='shelfLifeFn($event)' :maxlength='4' class="xe-input-short"></el-input>
                        &nbsp; 最多不超过9999张
                    </div>
                </el-form-item>
            </div>
            <div class="floor-salesApply" v-if="formDate.sendType === 1">
                <el-form-item label="每人限领" prop="sendLimitNum" :key="formDate.sendType">
                    <div>
                        <el-select size="small" style="width: 90px;" v-model="formDate.sendLimitNum" placeholder="请选择">
                            <el-option v-for="item in sendLimitNumList" :label="item" :key="item" :value="item"></el-option>
                        </el-select>
                        &nbsp; 张
                    </div>
                </el-form-item>
            </div>
            <div class="floor-salesApply" v-if="formDate.sendType === 2">
                <el-form-item label="发放条件" prop="sendOrderAmount" :key="formDate.sendType">
                    <div>
                        客户在店铺内购物满
                        <el-input size="small" v-model.number="formDate.sendOrderAmount" :maxlength="6" @blur="formDate.sendOrderAmount = parseFloat(formDate.sendOrderAmount) ? parseFloat(formDate.sendOrderAmount).toFixed(2) : ''" class="xe-input-short"></el-input>
                        &nbsp; 元发放优惠券
                    </div>
                </el-form-item>
            </div>
            <template v-if="formDate.sendType === 3">
                <el-form-item label="向每位用户" prop="sendEveryNum" :key="formDate.sendType">
                    <div>
                        发放&nbsp;
                        <el-select size="small" style="width: 90px;" v-model="formDate.sendEveryNum" placeholder="请选择">
                            <el-option v-for="item in sendEveryNumList" :label="item" :key="item" :value="item"></el-option>
                        </el-select>
                        &nbsp; 张优惠券
                    </div>
                </el-form-item>
                <div class="floor-salesApply">
                    <el-form-item label="指定用户" style="margin-bottom: 10px;">
                        <div style="width: 508px;">
                            <el-input size="small" placeholder="请输入用户名" v-model="loginAccount" @keyup.native.enter="getUserInfoByAccount()">
                                <el-button slot="append" icon="search" @click="getUserInfoByAccount()"></el-button>
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item prop="userInfoList" style="padding-left: 104px; display: block;">
                        <el-transfer
                            v-loading="transferLoading"
                            element-loading-text="查询用户中..."
                            v-model="formDate.userInfoList"
                            :data="userData"
                            :left-default-checked="[2, 3]"
                            :right-default-checked="[1]"
                            :render-content="renderFunc"
                            :titles="['未指定', '已指定']"
                            :button-texts="['向左移动', '向右移动']"
                            :props="{key: 'userId', label: 'loginAccount'}"
                            @change="transferChange"
                            :footer-format="{
                              noChecked: '${total}',
                              hasChecked: '${checked}/${total}'
                            }">
                        </el-transfer>
                    </el-form-item>
                </div>
            </template>
            <div class="floor-salesApply-btn">
                <el-form-item>
                    <el-button class="xe-button-large" type="primary" @click="submitForm()" :loading="submitLoading">立即创建</el-button>
                    <el-button class="xe-button-large" @click="back">返回</el-button>
                </el-form-item>
            </div>
        </el-form>

        <!--使用区域选择-->
        <el-dialog class="el-tree-dialog" title="选择使用区域" :visible.sync="dialogTableVisible" ref="useAreaDialog" @open="useAreaOpen">
            <useAreaList ref="useAreaList" ajaxUrl="/xe-route/xe-pro/ven/proSpu/queryAreaListByParent"></useAreaList>
            <div style="margin-top: 20px; text-align: center;">
                <el-button @click="treeSureBtn" type="primary">确定</el-button>
                <el-button @click="dialogTableVisible = false">取消</el-button>
            </div>
        </el-dialog>

        <!--商品分类选择-->
        <el-dialog class="el-tree-dialog" title="选择商品分类" :visible.sync="dialogcategoryVisible" @open="useCategoryOpen">
            <useAreaList
                ref="categoryList"
                ajaxUrl="/xe-route/xe-pro/ven/proSpu/queryCategoryListByParentId"
                :propKeys="{id: 'cateId', name: 'cateName', ajaxParams: 'parentId', responseStr: 'categoryList'}">
            </useAreaList>
            <div style="margin-top: 20px; text-align: center;">
                <el-button @click="categorySureBtn" type="primary">确定</el-button>
                <el-button @click="dialogcategoryVisible = false">取消</el-button>
            </div>
        </el-dialog>

        <!--指定商品选择-->
        <el-dialog title="选择商品" class="el-procoupon" :visible.sync="dialogProTable">
            <ProListCoupon ref="proListCoupon"></ProListCoupon>
            <div style="padding-top: 20px; text-align: center; border-top: 1px solid #ced5de;">
                <el-button @click="choosePro">选中</el-button>
                <el-button @click="choosePro('close')">选中并关闭</el-button>
                <el-button @click="dialogProTable = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {Transfer} from 'element-ui';
    import useAreaList from 'components/useAreaList/useAreaList';
    import ProListCoupon from './ProListFromCoupon';
    import {deepCopy} from 'utils';
    export default {
        name: 'salesApply',
        data() {
            let checkCoupon = (rule, value, callback) => {
                // 发放数量
                if (!value) {
                    return callback(new Error('请填写优惠券名称'));
                } else {
                    callback();
                }
            };
            // 表单校验区域
            let checkUseArea = (rule, value, callback) => {
                console.log(value);
                if (!value && value !== 0) {
                    return callback(new Error('请选择使用区域'));
                } else {
                    callback();
                }
            };
            // 表单校验指定品类
            let checkUseCate = (rule, value, callback) => {
                console.log(value);
                if (this.formDate.useRange === 2) {
                    if (!value && value !== 0) {
                        return callback(new Error('请选择指定品类'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            // 表单校验优惠券有效时间范围
            let checkCouponSendTime = (rule, value, callback) => {
                if (this.formDate.useTimeType === 1) {
                    // 固定时段
                    if (!value.length) {
                        return callback(new Error('请选择优惠券有效时间范围'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            // 表单校验优惠券到账后多少天内有效
            let checkCouponOverDays = (rule, value, callback) => {
                if (this.formDate.useTimeType === 2) {
                    // 固定时段
                    if (!value) {
                        return callback(new Error('请填写天数'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            // 表单优惠规则订单商品金额满xx送xx
            let checkUseOrderAmount = (rule, value, callback) => {
                if (this.formDate.useRuleType === 1) {
                    if (!value || !this.formDate.useDisAmount) {
                        return callback(new Error('请填写金额'));
                    } else {
                        if (parseFloat(this.formDate.useOrderAmount) <= parseFloat(this.formDate.useDisAmount)) {
                            return callback(new Error('请确保减的金额小于满的金额'));
                        } else {
                            callback();
                        }
                    }
                } else {
                    callback();
                }
            };
            // 表单优惠规则订单商品金额满xx送xx
            let checkUseDisAmountNum = (rule, value, callback) => {
                if (this.formDate.useRuleType === 2) {
                    if (!value) {
                        return callback(new Error('请填写金额'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            // 表单校验优惠券有效时间范围
            let checksendTimes = (rule, value, callback) => {
                // 发放时间
                if (this.formDate.sendType !== 3) {
                    if (!value.length) {
                        return callback(new Error('请选择发放时间范围'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            let checkSendNum = (rule, value, callback) => {
                // 发放数量
                if (this.formDate.sendType !== 3) {
                    if (!value) {
                        return callback(new Error('请填写发放数量'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            let checkSendLimitNum = (rule, value, callback) => {
                // 每人限领
                if (this.formDate.sendType === 1) {
                    if (!value) {
                        return callback(new Error('请选择每人限领张数'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            let checklistProType = (rule, value, callback) => {
                // 指定是否选择商品校验
                if (this.formDate.useRange === 3) {
                    if (!this.formDate.listProType.length) {
                        return callback(new Error('请添加商品'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            let checkSendOrderAmount = (rule, value, callback) => {
                if (this.formDate.sendType === 2) {
                    if (!value) {
                        return callback(new Error('请输入金额'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            let checkSendEveryNum = (rule, value, callback) => {
                if (this.formDate.sendType === 3) {
                    if (!value) {
                        return callback(new Error('请选择发放限制张数'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            let checkUserInfoList = (rule, value, callback) => {
                if (this.formDate.sendType === 3) {
                    if (!value.length) {
                        return callback(new Error('请先指定用户'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                dialogcategoryVisible: false,
                transferLoading: false,
                submitLoading: false,
                dialogProTable: false, // 指定商品弹窗
                dialogTableVisible: false,
                areaTags: [],
                cateTags: [],
                userData: [], // 未指定用户数据
                userChooseData: [], // 指定用户数据
                nationwideValue: '', // 全国的值
                renderFunc(h, option) {
                    return <span>{ option.loginAccount }</span>;
                },
                tags: [
                    { name: '河南/郑州', type: '' },
                    { name: '河南/郑州', type: '' },
                    { name: '河南/郑州', type: '' },
                    { name: '河南/郑州', type: '' }
                ],
                timeOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                loginAccount: '', // 指定用户查询
                formDate: {
                    couName: '', // 优惠券名称
                    usePlat: 1, // 使用位置
                    useArea: '', // 区域id,
                    useAreaName: '', // 区域名称
                    useRange: 1, // 使用范围
                    listProType: [],
                    useCate: '', // 品类ID
                    userCateName: '', // 品类ID
                    proList: [], // 品类ID
                    useTimeType: 1, // 有效时间类型
                    activeTimeArrs: [],
                    activeDay: '', // 优惠券领取过期天数（use_time_type =2 固定字段
                    useRuleType: 1, // 优惠规则 1 订单满减 2 无门槛
                    useOrderAmount: '', // 订单满金额 (use_rule_type = 2 可以不传)
                    useDisAmount: '', // 减金额
                    useDisAmountNum: '', // 减金额
                    sendTimeArrs: [],
                    sendType: 1, // 发放方式 1买家领取 2 指定条件发放 3 指定用户发放
                    sendNum: '', // 发行数量(sendType = 3 不传)
                    sendLimitNum: '', // 每人限领( 0 不限制（1~5）张数(只有买家领取才有) )
                    sendOrderAmount: '', // 满多少送 （只有指定条件发放才有 ）
                    sendEveryNum: '', // 向每位用户发放数量（1~3 只有指定用户发放用
                    userInfoList: [] // 指定的用户
                },
                activeTimeArrs: [],
                sendTimeArrs: [],
                rules: {
                    couName: [
                        { validator: checkCoupon, trigger: 'change' }
                    ],
                    useArea: [
                        { validator: checkUseArea, trigger: 'change' }
                    ],
                    useCate: [
                        { validator: checkUseCate, trigger: 'change' }
                    ],
                    activeTimeArrs: [
                        { validator: checkCouponSendTime, trigger: 'change' }
                    ],
                    activeDay: [
                        { validator: checkCouponOverDays, trigger: 'change' }
                    ],
                    useOrderAmount: [
                        { validator: checkUseOrderAmount, trigger: 'blur' }
                    ],
                    useDisAmountNum: [
                        { validator: checkUseDisAmountNum, trigger: 'blur' }
                    ],
                    sendTimeArrs: [
                        { validator: checksendTimes, trigger: 'change' }
                    ],
                    sendNum: [
                        { validator: checkSendNum, trigger: 'change' }
                    ],
                    sendLimitNum: [
                        { validator: checkSendLimitNum, trigger: 'change' }
                    ],
                    listProType: [
                        { validator: checklistProType, trigger: 'change' }
                    ],
                    sendOrderAmount: [
                        {validator: checkSendOrderAmount, trigger: 'change'}
                    ],
                    sendEveryNum: [
                        {validator: checkSendEveryNum, trigger: 'change'}
                    ],
                    userInfoList: [
                        {validator: checkUserInfoList, trigger: 'change'}
                    ]
                }
            };
        },
        methods: {
            deleteRow(index) {
                // 指定商品删除操作
                this.formDate.listProType.splice(index, 1);
            },
            choosePro(flag) {
                // flag 为true时候选中并关闭
                // 选中商品
                let resultDatas = this.$refs.proListCoupon.resultData;
                if (resultDatas.length) {
                    if (!this.formDate.listProType.length) {
                        this.formDate.listProType.push(...resultDatas);
                    } else {
                        // 去重
                        let uniqData = this.proUniq(this.formDate.listProType, deepCopy(resultDatas));
                        uniqData.length && this.formDate.listProType.push(...uniqData);
                    }
                    this.$xeMessage.success('选中成功！');
                    this.$refs.proListCoupon.clearSelection();
                    this.$refs.formDate.validateField('listProType');
                    console.log(flag);
                    if (flag === 'close') {
                        this.dialogProTable = false;
                    }
                } else {
                    this.$xeMessage.warning('请选择商品');
                }
            },
            proUniq(targetData, inData) {
                if (!inData.length) return;
                let obj = {};
                targetData.forEach(item => {
                    obj[item.proSku] = 1;
                });
                // 循环新数据过滤掉重复数据
                let pushData = inData.filter(item => {
                    return obj[item.proSku] !== 1;
                });
                return pushData;
            },
            treeSureBtn() {
                let resultData = this.$refs.useAreaList.getDataResult();
                console.log(resultData);
                this.areaTags = resultData.resultTexts;
                this.formDate.useArea = resultData.resultIds;
                this.useAreaCopy = resultData.resultIds;
                this.$refs.formDate.validateField('useArea');
                this.dialogTableVisible = false;
            },
            useAreaOpen() {
                if (this.$refs.useAreaList && this.areaTags.length) {
                    this.$refs.useAreaList.resetData(this.areaTags);
                }
            },
            areaTagsClose(areaId, index) {
                this.$refs.useAreaList.removeData(areaId, () => {
                    this.areaTags.splice(index, 1);
                    let areaIds = areaId.split('-');
                    let sindex = this.formDate.useArea.indexOf(areaIds[areaIds.length - 1]);
                    this.formDate.useArea.splice(sindex, 1);
                    if (this.areaTags.length <= 0) {
                        this.formDate.useArea = '';
                    }
                });
            },
            categorySureBtn() {
                let resultData = this.$refs.categoryList.getDataResult();
                console.log('categorySureBtn');
                console.log(resultData);
                console.log('categorySureBtn');
                this.cateTags = resultData.resultTexts;
                this.formDate.useCate = resultData.resultIds;
                this.$refs.formDate.validateField('useCate');
                this.dialogcategoryVisible = false;
                console.log(resultData);
            },
            useCategoryOpen() {
                if (this.$refs.categoryList && this.cateTags.length) {
                    console.log(this.cateTags);
                    this.$refs.categoryList.resetData(this.cateTags);
                }
            },
            cateTagsClose(areaId, index) {
                this.$refs.categoryList.removeData(areaId, () => {
                    this.cateTags.splice(index, 1);
                    let areaIds = areaId.split('-');
                    let sindex = this.formDate.useCate.indexOf(areaIds[areaIds.length - 1]);
                    this.formDate.useCate.splice(sindex, 1);
                    if (this.cateTags.length <= 0) {
                        this.formDate.useCate = '';
                    }
                });
            },
            insertTemplet() {
                let params = {
                    couName: this.formDate.couName, // 优惠券名称
                    usePlat: this.formDate.usePlat, // 使用位置
                    useArea: this.useArea, // 区域id
                    useAreaName: '', // 区域名称
                    useRange: this.formDate.useRange, // 使用范围
                    useCate: this.formDate.useRange === 2 ? `,${this.formDate.useCate.join(',')},` : '', // 品类ID
                    userCateName: '', // 品类ID
                    proList: [], // 品类ID
                    useTimeType: this.formDate.useTimeType, // 有效时间类型
                    activeTimeStart: this.formDate.useTimeType === 1 ? this.activeTimeArrs[0] : '', // 有效开始时间(time_type为1 固定字段)
                    activeTimeEnd: this.formDate.useTimeType === 1 ? this.activeTimeArrs[1] : '', // 有效结束时间(time_type为1 固定字段)
                    activeDay: this.formDate.useTimeType === 2 ? this.formDate.activeDay : '', // 优惠券领取过期天数（use_time_type =2 固定字段
                    useRuleType: this.formDate.useRuleType, // 优惠规则 1 订单满减 2 无门槛
                    useOrderAmount: this.formDate.useRuleType === 1 ? parseFloat(this.formDate.useOrderAmount) : '', // 订单满金额 (use_rule_type = 2 可以不传)
                    useDisAmount: this.formDate.useRuleType === 1 ? parseFloat(this.formDate.useDisAmount) : parseFloat(this.formDate.useDisAmountNum), // 减金额
                    sendType: this.formDate.sendType, // 发放方式 1买家领取 2 指定条件发放 3 指定用户发放
                    sendTimeStart: this.sendTimeArrs[0], // 发放方式 1买家领取 2 指定条件发放 3 指定用户发放
                    sendTimeEnd: this.sendTimeArrs[1], // 发放方式 1买家领取 2 指定条件发放 3 指定用户发放
                    sendNum: this.formDate.sendType === 3 ? '' : this.formDate.sendNum, // 发行数量(sendType = 3 不传)
                    sendLimitNum: this.formDate.sendLimitNum, // 每人限领( 0 不限制（1~5）张数(只有买家领取才有) )
                    sendOrderAmount: this.formDate.sendType === 2 ? this.formDate.sendOrderAmount : '', // 满多少送 （只有指定条件发放才有 ）
                    sendEveryNum: this.formDate.sendType === 3 ? this.formDate.sendEveryNum : '', // 向每位用户发放数量（1~3 只有指定用户发放用）
                    userInfoList: this.formDate.sendType === 3 ? this.formDate.userInfoList : [] // 发放方式为3时指定用户数据
                };
                if (this.formDate.useRange === 3) {
                    let reProListSku = [];
                    this.formDate.listProType.forEach(item => {
                        reProListSku.push(item.proSku);
                    });
                    params.proList = reProListSku;
                }
                this.submitLoading = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/coupon/coupTemplet/insertTemplet',
                    data: params
                }).then(res => {
                    console.log(res);
                    this.submitLoading = false;
                    this.$xeMessage.success('优惠券创建成功！');
                    this.$router.push({name: 'couponList'});
                }).catch(error => {
                    console.log(error);
                    this.submitLoading = false;
                });
            },
            submitForm() {
                const h = this.$createElement;
                this.$refs.formDate.validate((valid) => {
                    if (valid) {
                        this.insertTemplet();
                    } else {
                        console.log('error submit!!');
                        this.$xeMessageBox({
                            message: h('div', {class: 'confirm-con'}, [
                                h('div', {class: 'confirm-tips'}, [
                                    h('span', {class: 'el-icon el-icon-circle-cross'}),
                                    h('em', null, '提交错误')
                                ]),
                                h('div', {class: 'confirm-des'}, '有校验项未通过,请检查修改标红项！')
                            ]),
                            showCancelButton: false,
                            closeOnClickModal: false,
                            closeOnPressEscape: false,
                            customClass: 'confirm-style-tip',
                            confirmButtonText: '确定',
                            type: 'error'
                        }).then(() => {
                        }).catch(() => {
                        });
                        return false;
                    }
                });
            },
            activeTimeChange(value) {
                this.activeTimeArrs = value.split(' 至 ');
            },
            sendTimeChange(value) {
                this.sendTimeArrs = value.split(' 至 ');
            },
            nationwideFn(event) {
                console.log(this.nationwideValue);
            },
            shelfLifeFn(event) {
                let value = parseInt(event.target.value);
                if (value > 0) {
                    event.target.value = value;
                } else {
                    event.target.value = '';
                }
            },
            back() {
                this.$router.go(-1);
            },
            useDisAmountBlur() {
                this.formDate.useDisAmount = parseFloat(this.formDate.useDisAmount) ? Math.abs(parseFloat(this.formDate.useDisAmount)).toFixed(2) : '';
                if (this.formDate.useOrderAmount && this.formDate.useDisAmount && parseFloat(this.formDate.useOrderAmount) > parseFloat(this.formDate.useDisAmount)) {
                    this.$refs.formDate.validateField('useOrderAmount');
                }
            },
            getUserInfoByAccount() {
                if (!this.loginAccount) {
                    this.$xeMessage.warning('请输入用户名查询');
                    return;
                }
                this.transferLoading = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/coupon/coupTemplet/getUserInfoByAccount',
                    data: {
                        loginAccount: this.loginAccount
                    }
                }).then(res => {
                    console.log(res);
                    this.loginAccount = '';
                    this.transferLoading = false;
                    if (res.data.userInfo.userId) {
                        let obj = {};
                        let obj2 = {};
                        this.userData.forEach(item => {
                            obj[item.userId] = 1;
                        });
                        this.formDate.userInfoList.forEach(item => {
                            obj2[item] = 1;
                        });
                        if (!obj[res.data.userInfo.userId]) {
                            this.userData.push(res.data.userInfo);
                        };
                        if (obj2[res.data.userInfo.userId]) {
                            this.$xeMessage.warning('此用户已在指定列中');
                        }
                    }
                }).catch(error => {
                    this.transferLoading = false;
                    console.log(error);
                });
            },
            transferChange(val, direction) {
                console.log(val);
                console.log(direction);
            }
        },
        computed: {
            sendLimitNumList() {
                // 每人限领( 0 不限制（1~5）张数(只有买家领取才有) )
                return [1, 2, 3, 4, 5];
            },
            sendEveryNumList() {
                // 向每位用户发放数量（1~3 只有指定用户发放用）
                return [1, 2, 3];
            },
            useArea() {
                if (this.formDate.useArea === 0) {
                    return 0;
                } else {
                    return `,${this.formDate.useArea.join(',')},`;
                }
            }
        },
        watch: {
            nationwideValue(val) {
                if (val === 1) {
                    this.formDate.useArea = 0;
                    this.$refs.formDate.validateField('useArea');
                } else {
                    if (this.useAreaCopy) {
                        this.formDate.useArea = this.useAreaCopy;
                    }
                }
            },
            'formDate.useTimeType'(val) {
                if (val === 1) {
                    this.$refs.formDate.validateField('activeDay');
                } else {
                    this.$refs.formDate.validateField('activeTimeArrs');
                }
            },
            'formDate.useRuleType'(val) {
                if (val === 1) {
                    this.$refs.formDate.validateField('useDisAmountNum');
                } else {
                    this.$refs.formDate.validateField('useOrderAmount');
                }
            }
        },
        components: {
            'el-transfer': Transfer,
            useAreaList,
            ProListCoupon
        }
    };
</script>

<style lang="scss">
</style>
