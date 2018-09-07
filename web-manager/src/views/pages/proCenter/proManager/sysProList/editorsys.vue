<template lang="html">
    <div class="m-router-con">
        <el-form :inline="true" ref="filterForm" :model="filterForm" :rules="rules" :label-width="xeLabelWidth">
            <!--基础信息-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">基础信息</div>
                </div>
                <el-form-item label="商品名称" prop="proName">
                    <el-input class = "xe-input-col3" v-model="filterForm.proName" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item class="text_left" v-if='prokuFlag'>
                    <div class="addnewtype no-margin" @click.stop="produlibadd = true">
                        <i class="el-icon-plus">&nbsp;从商品库添加</i>
                    </div>
                </el-form-item>
                <div>
                    <el-form-item label="商品分类" prop="cateIds" :required='true'>
                        <categoryTag v-model='filterForm.cateIds' :width='400'></categoryTag>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="商品品牌" prop="brandId">
                        <el-select class="xe-input-col3" clearable v-model="filterForm.brandId" placeholder="请选择商品品牌">
                            <el-option
                                v-for="(item, index) in brandIdList"
                                :key="index"
                                :label="item.brandName"
                                :value="item.brandId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="" class="text_left">-->
                        <!--<div class="addnewtype no-margin" @click="addBrand = true">-->
                            <!--<i class="el-icon-plus">&nbsp;添加品牌</i>-->
                        <!--</div>-->
                    <!--</el-form-item>-->
                </div>
                <div>
                    <el-form-item label="商品简介" class="textare_reset" prop="">
                        <el-input type="textarea" v-model='filterForm.proIntro' resize="none" :maxlength="100"></el-input>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="是否冻品" prop="">
                        <el-radio-group v-model="filterForm.frozenFlag">
                            <el-radio v-for="(item, index) in frozenFlagList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
            </div>
            <!--基本属性-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">基本属性</div>
                </div>
                <div>
                    <el-form-item label="计量方式" prop="">
                        <el-select :disabled="$route.params.type === 'edit'" class="xe-input-col3" v-model="filterForm.pricingType" filterable placeholder="请选择">
                            <el-option
                                v-for="(item, index) in pricingTypeList"
                                :key="index"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="计量单位" prop="">
                        <el-select class="xe-input-col3" v-model="filterForm.pricingTypeInfo" :disabled='!filterForm.pricingType' filterable placeholder="请选择">
                            <el-option
                                v-if='pricingTypeInfoListArr.length'
                                v-for="(item, index) in pricingTypeInfoListArr"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="贮存条件" prop="">
                        <el-select class="xe-input-col3" v-model="filterForm.reserveCondition" filterable placeholder="请选择">
                            <el-option
                                v-for="(item, index) in reserveConditionList"
                                :key="index"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="售卖方式" prop="">
                        <el-select class = "xe-input-col3" v-model="filterForm.sellType" filterable placeholder="请选择">
                            <el-option
                                v-for="(item, index) in sellTypeList"
                                :key="index"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="保质期" prop="" class="clearfix">
                        <el-input class="xe-input-col1" v-model.number="filterForm.shelfLife" @input.native="filterForm.shelfLife = parseInt($event.target.value) > 0 ? filterForm.shelfLife = parseInt($event.target.value) : ''" :maxlength='8' placeholder="请输入数字"></el-input>
                        <el-select class="xe-input-col1 fr" v-model="filterForm.shelfLifeUnit" filterable placeholder="请选择">
                            <el-option
                                v-for="(item, index) in shelfLifeUnitList"
                                :key="index"
                                :label="item.name"
                                :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="生产日期" prop="">
                        <el-date-picker style='width: 400px'
                                        v-model="filterForm.madeDate"
                                        type="date"
                                        placeholder="见商品包装">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div class="clearfix">
                    <el-form-item label="产地" prop="madeinCountry" class="fl" style='margin-right: 0;'>
                        <el-select class="xe-input-col1 fl" v-model="filterForm.madeinCountry" filterable placeholder="请选择产地">
                            <el-option
                                v-if='madeinCountryList.length'
                                v-for="(item, index) in madeinCountryList"
                                :key="item.areaId"
                                :label="item.areaName"
                                :value="item.areaId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if='madeinProvinceListFlag' label="" prop="selectedOptions" class="fl">
                        <el-cascader
                            v-if='madeinProvinceList.length'
                            class="xe-input-col1 fl"
                            :options="madeinProvinceList"
                            v-model='filterForm.selectedOptions'
                            @active-item-change="madeinItemChange"
                            @change="madeinChange"
                            :props="{label: 'areaName', value: 'areaId', children: 'cities'}">
                        </el-cascader>
                    </el-form-item>
                </div>
                <!--<div>-->
                <!--<el-form-item label="供货商" prop="">-->
                <!--<el-select class="xe-input-col3" v-model="filterForm.supplierId" filterable clearable placeholder="请选择供货商">-->
                <!--<el-option-->
                <!--v-if='venSupplierList.length'-->
                <!--v-for="(item, index) in venSupplierList"-->
                <!--:key="item.code"-->
                <!--:label="item.name"-->
                <!--:value="item.code">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</el-form-item>-->
                <!--</div>-->
            </div>
            <!--扩展属性-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">扩展属性</div>
                    <div class="fl">
                        <el-select class="xe-input-smal" v-model="filterForm.typeId" filterable @change='extendTypeChange'>
                            <el-option
                                v-for="(item, index) in extendSelects"
                                :key="item.typeId"
                                :label="item.typeName"
                                :value="item.typeId">
                            </el-option>
                        </el-select>
                    </div>
                    <!--<div class="fl addnewtype" @click.stop="addnewAttribute = true">-->
                        <!--<i class="el-icon-plus">&nbsp;新增属性</i>-->
                    <!--</div>-->
                </div>
                <div v-if="typePropertyList.length" v-for="(item, index) in typePropertyList" :key='item.propertyId'>
                    <el-form-item :label="item.propertyName">
                        <el-select class="xe-input-col3" v-model="proPropertyValue['value' + item.propertyId]" filterable placeholder="请选择">
                            <el-option
                                key="请选择"
                                label="请选择"
                                value="请选择">
                            </el-option>
                            <el-option
                                v-for="(oItem, oIndex) in item.propertyValue.split(',')"
                                :key="oItem"
                                :label="oItem"
                                :value="oItem">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </div>
            <!--商品规格-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">商品规格</div>
                </div>
                <div class="item-tabbox">
                    <!--规格设置1-->
                    <div class="ditor-01" v-if='typeSpecList.length'>
                        <el-table :data="typeSpecList" border>
                            <el-table-column label="规格名称" prop="">
                                <template scope="scope">
                                    {{scope.row.specName}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="" label="规格值 (选中规格值生成商品SKU)">
                                <template scope="scope">
                                    <ul>
                                        <li
                                            class="typ_lis"
                                            v-for="(item, index) in scope.row.specValue.split(',')"
                                            @click='typeSpecfn($event, scope.row.specName, scope.row.specId, item)'
                                            :class="{'active': typeSpecArr.length && typeSpecArr.indexOf(`${scope.row.specId}-${scope.row.specName}-${item}`) >= 0}"
                                            :key='item'
                                        >
                                            {{item}}
                                        </li>
                                    </ul>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <!--规格设置2-->
                    <el-table class="singleTablecls" ref='singleTable' v-if='typeSpecTableData.length' :data="typeSpecTableData" border v-loading='loadingtable'>
                        <el-table-column
                            label=""
                            prop=""
                            class-name='tdSpecIndex'
                            fixed='left'
                            min-width="60">
                            <template scope="scope">
                                {{scope.$index + 1 }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            :render-header='renderHeader'
                            prop="proMainImg"
                            label="主图"
                            min-width="100">
                            <template scope="scope">
                                <div class="skuImgUpload">
                                    <span class="addIcon iconfont icon-xinzeng"></span>
                                    <form name='formfile' class='formfile'>
                                        <input title="请编辑或者上传图片" accept="image/gif,image/jpeg,image/jpg,image/png" type="file" name='imgFiles' class='skuImgFile' @change='skuImgFileChange(scope.row, $event)'>
                                    </form>
                                    <div class="showImg" v-if="scope.row.proMainImg">
                                        <em class="el-icon-circle-close" @click="skuImgFileRemove(scope.row, $event)"></em>
                                        <img :src="imgUrlPrefix + scope.row.proMainImg" class="spec_pic" alt="">
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column v-if='formThead.length' v-for='(spec,sIndex) in formThead' :key='sIndex' :label="spec">
                            <template scope="scope">
                                {{scope.row.proSkuSpecList && scope.row.proSkuSpecList[sIndex].specValue}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            :render-header='renderHeader'
                            prop=""
                            label="货号"
                            min-width="130">
                            <template scope="scope">
                                <div>
                                    <el-input @blur="proNumBlur($event, scope.row)" class = "xe-input-smal90" v-model="scope.row.proNum" ></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            :render-header='renderHeader'
                            prop=""
                            label="重量(kg)"
                            min-width="130">
                            <template scope="scope">
                                <div>
                                    <el-input class="xe-input-smal90" v-model.number="scope.row.grossWeight" @blur="scope.row.grossWeight = parseFloat(scope.row.grossWeight) ? Math.abs(parseFloat(scope.row.grossWeight)).toFixed(2) : ''"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--prop=""-->
                            <!--label="预计成本价(元)"-->
                            <!--min-width="130">-->
                            <!--<template scope="scope">-->
                                <!--<div>-->
                                    <!--<el-input class="xe-input-smal90" v-model.number="scope.row.costPrice" @blur="scope.row.costPrice = parseFloat(scope.row.costPrice) ? Math.abs(parseFloat(scope.row.costPrice)).toFixed(2) : ''"></el-input>-->
                                <!--</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <el-table-column
                            :render-header='renderHeader'
                            prop=""
                            label="建议销售价(元)"
                            min-width="130">
                            <template scope="scope">
                                <div>
                                    <el-input class="xe-input-smal90" v-model="scope.row.skuPrice" @blur="scope.row.skuPrice = parseFloat(scope.row.skuPrice) ? Math.abs(parseFloat(scope.row.skuPrice)).toFixed(2) : ''"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <!--<el-table-column-->
                            <!--prop=""-->
                            <!--label="实际库存"-->
                            <!--min-width="130">-->
                            <!--<template scope="scope">-->
                                <!--<div>-->
                                    <!--<el-input class="xe-input-smal90" v-model="scope.row.realQuantity" @input.native="scope.row.realQuantity = parseInt($event.target.value) > 0 ? scope.row.realQuantity = parseInt($event.target.value) : ''"></el-input>-->
                                <!--</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                            <!--:render-header='renderHeader'-->
                            <!--label="销售库存"-->
                            <!--prop=""-->
                            <!--min-width="130">-->
                            <!--<template scope="scope">-->
                                <!--<div>-->
                                    <!--<el-input class="xe-input-smal90" :maxlength="8" v-model="scope.row.saleQuantity" @input.native="scope.row.saleQuantity = parseInt($event.target.value) > 0 ? scope.row.saleQuantity = parseInt($event.target.value) : ''"></el-input>-->
                                <!--</div>-->
                            <!--</template>-->
                        <!--</el-table-column>-->
                        <el-table-column
                            :render-header='renderHeader'
                            label="起订量"
                            prop=""
                            min-width="130">
                            <template scope="scope">
                                <div>
                                    <el-input class="xe-input-smal90" :maxlength="8" v-model="scope.row.minQuantity" @input.native="scope.row.minQuantity = parseInt($event.target.value) > 0 ? scope.row.minQuantity = parseInt($event.target.value) : ''"></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="条形码"
                            min-width="130">
                            <template scope="scope">
                                <div>
                                    <el-input class="xe-input-smal90" v-model="scope.row.barCode" ></el-input>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <!--商品图片-->
            <div class="for-itemlis">
                <div class="item-head">
                    <div class="item-tit">商品图片</div>
                </div>
                <div class="item-uploadImg_box clearfix" v-loading='loadingUploadImg'>
                    <ul v-if='uploadImg2.length'>
                        <li v-for='(item, index) in uploadImg2Computed' :key='item' @mouseover.prevent="picindex = index"  @mouseout.prevent="picindex = ''">
                            <img v-if='imgUrlPrefix' :src="imgUrlPrefix + item.proImg" alt="">
                            <p v-show="picindex === index" @click="picRemove(index)"><span class="iconfont icon-shanchu"></span></p>
                        </li>
                    </ul>
                    <div class="uploadImg-btn" v-if='uploadBtnFlag'>
                        <span class="iconfont icon-xinzeng"></span>
                        <form name='form2' id='formFile2'>
                            <input title="请编辑或者上传图片" type="file" multiple name='imgFiles' class='inputFile2' @change='inputFile2Fn' accept="image/gif,image/jpeg,image/jpg,image/png">
                        </form>
                    </div>
                </div>
            </div>
            <!--商品描述-->
            <div class="for-itemlis">
                <div class="item-head">
                    <div class="item-tit">商品描述 <em style="color: #aaa; margin-left: 10px;">此商品描述在移动端展示</em></div>
                </div>
                <div class="text-editor-box">
                    <!--<el-tabs v-model="desTabActive" type="card" class="releaseProDesc">-->
                    <!--<el-tab-pane label="PC端" name="first">-->
                    <!--<div>-->
                    <!--<ueditor ueditorPath="/static/js/lib/ueditor1_4_3_3/" @ready='PcEditorReady'></ueditor>-->
                    <!--</div>-->
                    <!--</el-tab-pane>-->
                    <!--<el-tab-pane label="移动端" name="second">-->
                    <!--<div>-->
                    <!--<ueditor ueditorPath="/static/js/lib/ueditor1_4_3_3/" @ready='AppEditorReady'></ueditor>-->
                    <!--</div>-->
                    <!--</el-tab-pane>-->
                    <!--</el-tabs>-->
                    <div>
                        <ueditor ueditorPath='/xe-ueditor/' @ready='AppEditorReady'></ueditor>
                    </div>
                </div>
                <!--button提交按钮-->
                <div class="form_sub_btn">
                    <el-button type="primary" @click="proReleasebtn('filterForm', 2)">保存</el-button>
                    <el-button @click="back()">返回</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
import categoryTag from '@/components/category/category';
import ueditor from 'vue-ueditor';
import {doExchange, isRepeat, duplicate} from 'utils';
import {pricingType, reserveCondition, pricingTypeInfoMap, sellType, shelfLifeUnit, frozenFlag} from '@/dataControl.js';
export default {
    beforeRouteEnter(to, from, next) {
        if (to.params.proSpu) {
            window.$axios({
                method: 'post',
                url: '/xe-route/xe-mis/manager/sysprospu/getSysProSpuByKey',
                data: {
                    proSpu: to.params.proSpu
                }
            }).then(res => {
                console.log(res);
                let proSpuData = res.data.venProSpu;
                next(vm => {
                    vm.imgUrlPrefix = res.data.picServer;
                    vm.filterForm.proName = proSpuData.proName; // 商品名
                    let cateIds = [];
                    proSpuData.cateOrgCode.split('_').forEach((item) => {
                        cateIds.push(parseInt(item));
                    });
                    vm.filterForm.cateIds = cateIds; // 商品分类
                    // 以有无品牌名做判断
                    proSpuData.brandName ? vm.filterForm.brandId = proSpuData.brandId : vm.filterForm.brandId = ''; // 商品品牌
                    vm.filterForm.proIntro = proSpuData.proIntro; // 商品简介
                    vm.filterForm.frozenFlag = proSpuData.frozenFlag; // 是否冻品
                    vm.filterForm.pricingType = proSpuData.pricingType; // 计价方式
                    vm.pricingTypeFlag = proSpuData.pricingType; // 计价方式
                    vm.filterForm.reserveCondition = proSpuData.reserveCondition; // 贮存条件
                    vm.filterForm.pricingTypeInfo = proSpuData.proUnit; // 计量单位
                    vm.pricingTypeInfoValue = proSpuData.proUnit; // 计量单位
                    vm.filterForm.sellType = proSpuData.sellType; // 售卖方式
                    vm.filterForm.shelfLife = proSpuData.shelfLife; // 保质期
                    vm.filterForm.shelfLifeUnit = proSpuData.shelfLifeUnit; // 保质期单位
                    vm.filterForm.madeinCountry = proSpuData.madeinCountry;
                    vm.filterForm.madeinProvince = proSpuData.madeinProvince;
                    vm.filterForm.madeinCity = proSpuData.madeinCity;
                    vm.filterForm.madeDate = proSpuData.madeDate ? new Date(proSpuData.madeDate) : '';
                    vm.filterForm.supplierId = proSpuData.supplierId;

                    vm.filterForm.typeId = proSpuData.typeId;
                    vm.editorTypeId = proSpuData.typeId;

                    vm.uploadImg2 = proSpuData.imgList;
                    // 扩展属性回显
//                    let proPropertyValueObj = {};
//                    proSpuData.propertyList.forEach(item => {
//                        proPropertyValueObj['value' + item.propertyId] = item.propertyValue;
//                    });
//                    vm.proPropertyValue = proPropertyValueObj;

                    // 定价方式
                    vm.priceMethodFlag = proSpuData.priceMethod;

                    // 配送方式
                    vm.deliveryTypeFlag = proSpuData.deliveryType;

                    // 报价过期时间
                    vm.failureTimeFlag = proSpuData.failureTime;

                    vm.prokuFlag = false;

                    // 富文本信息
                    vm.pcDesc = proSpuData.descEntity.pcDesc;
                    vm.appDesc = proSpuData.descEntity.appDesc;
                });
            }).catch(error => {
                console.log(error);
                next({
                    name: 'index'
                });
            });
        } else {
            next(vm => {
                vm.prokuFlag = true;
            });
        }
    },
    data() {
        let validatorCateId = (rule, value, callback) => {
            if (value.length > 0) {
                callback();
            } else {
                callback(new Error('请选择商品分类'));
            }
        };
        let validatorMadeinCountry = (rule, value, callback) => {
            callback();
        };
        let validatorSelectedOptions = (rule, value, callback) => {
            if (value.length > 0) {
                callback();
            } else {
                callback(new Error('请选译城市'));
            }
        };
        return {
            imgUrlPrefix: '',
            picindex: '',
            filterForm: {
                proName: '', // 商品名称
                cateIds: [],
                brandId: '', // 品牌ID
                proIntro: '', // 商品简介
                frozenFlag: 1, // 是否冻品
                pricingType: 1, // 计价方式
                reserveCondition: '', // 贮存条件
                pricingTypeInfo: '千克', // 计量单位
                sellType: 1, // 售卖方式
                shelfLifeUnit: '天', // 保质期单位
                shelfLife: '', // 保质期
                madeDate: '', // 生产日期
                madeinCountry: 10000, // 产地国家
                madeinProvince: '', // 产地首
                madeinCity: '', // 产地市
                supplierId: '', // 供货商ID
                typeId: '', // 类型ID
                selectedOptions: [] // 产地省市
            },
            rules: {
                proName: [
                    {required: true, message: '请输入商品名称', trigger: 'blur'}
                ],
                cateIds: [
                    {validator: validatorCateId, trigger: 'change'}
                ],
                madeinCountry: [
                    {validator: validatorMadeinCountry, trigger: 'change'}
                ],
                selectedOptions: [
                    {validator: validatorSelectedOptions, trigger: 'change'}
                ]
            },
            brandIdList: [],
            prokuFlag: false, // 是否显示从商品库添加按钮
            auditFlag: '', // 是否免审 1.免审 2.非免审
            produlibadd: false, // 从商品库添加开关
            addBrand: false, // 添加品牌弹框开关
            madeinCountryList: [], // 产地国家列表
            madeinProvinceList: [], // 产国省列表
            selectedOptions: [], // 产地省市选择值
            addnewAttribute: false, // 新添属性开关
            dialogTableVisible: true,
            serchFrom: {},
            serchContentData: [],
            extendType: '', // 扩展属性值
            extendSelects: [],
            typePropertyList: [],
            proPropertyValue: {},
            typeSpecList: [],
            typeSpecTableData: [],
            typeSpecArr: [],
            dialogImageUrl: '',
            dialogVisible: false,
            specNewVal: '',
            specOldVal: '',
            loadingtable: false,
            loadingUploadImg: false,
            uploadImg2: [],
            uploadBtnFlag: true,
            editorTypeId: '', // 编辑时回显的SKUlist标识
            proKuTypeId: '', // 从商品库添加时SKUlists标识
            priceMethodFlag: '', // 编辑时默认选中的定价方式
            deliveryTypeFlag: '',
            failureTimeFlag: '',
            pcEditorInstance: '',
            appEditorInstance: '',
            pcDesc: '',
            appDesc: '',
            desTabActive: 'first',
            pricingTypeFlag: '',
            pricingTypeInfoValue: '',
            venSupplierList: [] // 供应商列表
        };
    },
    created() {
        // 查询商品属性列表
        this.queryProTypeList();
        // 查询商品基本值
        this.queryProBasicProperty();
        // 查询品牌列表数据
        this.queryBrandList();
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        picRemove(index) {
            this.uploadImg2.splice(index, 1);
            this.picindex = '';
            $('.inputFile2').val('');
        },
        queryBrandList() {
            // 查询品牌列表数据
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/sysprospu/queryBrandList',
                data: {}
            }).then(res => {
                this.brandIdList = res.data.proBrandList;
            }).catch(error => {
                console.log(error);
            });
        },
        queryProTypeList() {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/sysprospu/queryProTypeList'
            }).then(res => {
                this.extendSelects = res.data.typeList;
                if (!this.filterForm.typeId) {
                    this.filterForm.typeId = this.extendSelects[0].typeId;
                }
            }).catch(error => {
                console.log(error);
            });
        },
        queryProTypeInfo(id) {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/sysprospu/queryProTypeInfo',
                data: {
                    typeId: id
                }
            }).then(res => {
                this.typeSpecArr = [];
                this.typeSpecTableData = []; // 清除商品规格table
                this.typePropertyListComputed = res.data.propertyList;
                this.typeSpecList = res.data.specList;
                if (!this.typeSpecList.length) {
                    let obj = {
                        proMainImg: '',
                        proSkuSpecList: [{
                            specName: '规格',
                            specValue: '无'
                        }],
                        proNum: '', // 货号
                        grossWeight: '', // 重量
                        costPrice: '', // 预计成本价
                        skuPrice: '', // 建议销售价
                        realQuantity: '', // 真实库存
                        saleQuantity: '', // 销售库存
                        minQuantity: '', // 起订量
                        barCode: '' // 条形码
                    };
                    this.typeSpecTableData.push(obj);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        queryVenProSkuList(id) {
            // 编辑时根据Spu查回显SKU list
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/sysprospu/querySysProSkuList',
                data: {
                    proSpu: this.$route.params.proSpu,
                    typeId: id
                }
            }).then(res => {
                console.log(res);
                this.typeSpecArr = [];
                this.typePropertyListComputed = res.data.typeInfoMap.typePropertyList;
                this.typeSpecList = res.data.typeInfoMap.typeSpecList;
                if (!this.typeSpecList.length) {
                    let data = res.data.proSkuList;
                    data.forEach((item, index) => {
                        item.proSkuSpecList = [{
                            specName: '规格',
                            specValue: '无'
                        }];
                    });
                    this.typeSpecTableData = data;
                } else {
                    this.typeSpecTableData = res.data.proSkuList;
                    this.reShowData(res.data.proSkuList);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        querySysProSkuList(id, proSpu) {
            // 编辑时根据Spu查回显SKU list
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/sysprospu/querySysProSkuList',
                data: {
                    proSpu: proSpu,
                    typeId: id
                }
            }).then(res => {
                console.log(res);
                this.typeSpecArr = [];
                this.typePropertyListComputed = res.data.typeInfoMap.typePropertyList;
                this.typeSpecList = res.data.typeInfoMap.typeSpecList;
                if (!this.typeSpecList.length) {
                    let data = res.data.proSkuList;
                    data.forEach((item, index) => {
                        item.proSkuSpecList = [{
                            specName: '规格',
                            specValue: '无'
                        }];
                    });
                    this.typeSpecTableData = data;
                } else {
                    this.typeSpecTableData = res.data.proSkuList;
                    this.reShowData(res.data.proSkuList);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        reShowData(data) {
            if (data.length) {
                let result = {
                    typeSpecArr: [],
                    specOldVal: []
                };
                let resultObj = {};
                data.forEach(item => {
                    item.proSkuSpecList.forEach(sitem => {
                        let str = `${sitem.specId}-${sitem.specName}-${sitem.specValue}`;
                        if (!resultObj[str]) {
                            resultObj[str] = 1;
                            result.typeSpecArr.push(str);
                        }
                    });
                });
                console.log(result);
                this.typeSpecArr = result.typeSpecArr;
            }
        },
        extendTypeChange(val) {
            // 根据ID查询扩展属性
            if (val === this.editorTypeId) {
                // 编辑时
                this.queryVenProSkuList(val);
            } else {
                console.log(12123123);
                this.queryProTypeInfo(val);
            }
        },
        typeSpecfn(event, specName, specId, specValue) {
            // 选择规格值
            // [['200-颜色-红', '200-颜色-黄'], ['201-形状-正方形', '201-形状-长方形'], ['202-味道-甜']]
            let dom = $(event.target || event.srcElement);
            let strs = `${specId}-${specName}-${specValue}`;
            if (dom.hasClass('active')) {
//                    dom.removeClass('active');
                let index = this.typeSpecArr.indexOf(strs);
                this.typeSpecArr.splice(index, 1);
                console.log('typeSpecArr--删除--start');
                console.log(this.typeSpecArr);
                console.log('typeSpecArr--删除--end');
                this.$nextTick(() => {
                    console.log('删');
                    console.log(this.specNewVal);
                    console.log(this.specOldVal);
                    if (this.specNewVal === undefined) {
                        // 删除至最后一个时清空数据
                        this.typeSpecTableData = [];
                        return;
                    }
                    if (this.specNewVal[0].indexOf(specId + '-') < 0) {
                        console.log('删列');
                        this.typeSpecTableData.forEach((item, index) => {
                            console.log(item);
                            item.proSkuSpecList.some((sitem, sindex) => {
                                console.log(parseInt(sitem.specId) === specId);
                                if (parseInt(sitem.specId) === specId) {
                                    item.proSkuSpecList.splice(sindex, 1);
                                    return true;
                                }
                            });
                        });
                    } else {
                        console.log('删行');
                        let tempArray1 = [];
                        let tempArray2 = [];
                        let indexArr = [];
                        this.specNewVal.some(newitem => {
                            tempArray1[newitem] = true;
                        });
                        this.typeSpecTableData.forEach((item, index) => {
                            let reArr = [];
                            item.proSkuSpecList.forEach(function(sitem) {
                                reArr.push(`${sitem.specId}-${sitem.specName}-${sitem.specValue}`);
                            });
                            let resultStr = reArr.join(',');
                            let obj = {};
                            obj[index] = resultStr;
                            tempArray2.push(obj);
                        });
                        tempArray2.forEach((item, index) => {
                            if (!tempArray1[item[index]]) {
                                indexArr.push(index);
                            }
                        });
                        // 删除操作
                        let copyTableData = [...this.typeSpecTableData];
                        indexArr.forEach(item => {
                            copyTableData.splice(item, 1, undefined);
                        });
                        this.typeSpecTableData = copyTableData.filter(item => {
                            return item !== undefined;
                        });
                    }
                });
            } else {
//                    dom.addClass('active');
                this.typeSpecArr.push(strs);
                console.log('typeSpecArr--选中--start');
                console.log(this.typeSpecArr);
                console.log('typeSpecArr--选中--end');
                if (this.typeSpecTableData.length > 0) {
                    this.$nextTick(() => {
                        console.log(this.specNewVal);
                        console.log(this.specOldVal);
                        if (this.specOldVal[0].indexOf(specId + '-') >= 0) {
                            console.log('有');
                            let tempArray1 = [];
                            let tempArray2 = [];
                            this.specOldVal.forEach(item => {
                                tempArray1[item] = true;
                            });
                            this.specNewVal.forEach(item => {
                                if (!tempArray1[item]) {
                                    tempArray2.push(item);
                                }
                            });
                            console.log('====tempArray2====');
                            console.log(tempArray2);
                            console.log('====tempArray2====');
                            tempArray2.forEach(item => {
                                let obj = {
                                    proMainImg: '',
                                    proSkuSpecList: [],
                                    proNum: '', // 货号
                                    grossWeight: '', // 重量
                                    costPrice: '', // 预计成本价
                                    skuPrice: '', // 建议销售价
                                    realQuantity: '', // 真实库存
                                    saleQuantity: '', // 销售库存
                                    minQuantity: '', // 起订量
                                    barCode: '' // 条形码
                                };
                                let itemarr = item.split(',');
                                let itemResultArr = [];
                                itemarr.forEach(sItem => {
                                    let sobj = {};
                                    let list = sItem.split('-');
                                    sobj.specId = list[0];
                                    sobj.specName = list[1];
                                    sobj.specValue = list[2];
                                    itemResultArr.push(sobj);
                                });
                                obj.proSkuSpecList = itemResultArr;
                                this.typeSpecTableData.push(obj);
                            });
                        } else {
                            console.log('无');
                            this.typeSpecTableData.forEach(item => {
                                let sobj = {};
                                let list = strs.split('-');
                                sobj.specId = list[0];
                                sobj.specName = list[1];
                                sobj.specValue = list[2];
                                item.proSkuSpecList.push(sobj);
                                item.proSkuSpecList = item.proSkuSpecList.sort(function(a, b) {
                                    return a.specId - b.specId;
                                });
                            });
                        }
                    });
                }
            }
            if (!this.typeSpecTableData.length) {
                this.typeSpecTableData = this.typeSpecChooseResult;
            }
        },
        PcEditorReady(editorInstance) {
            this.pcEditorInstance = editorInstance;
            if (this.pcDesc) {
                editorInstance.setContent(this.pcDesc);
            }
        },
        AppEditorReady(editorInstance) {
            this.appEditorInstance = editorInstance;
            if (this.appDesc) {
                editorInstance.setContent(this.appDesc);
            }
        },
        queryProBasicProperty() {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/sysprospu/queryProBasicProperty'
            }).then(res => {
                this.auditFlag = res.data.auditFlag;
                this.madeinCountryList = res.data.madeinCountryList;
                this.venSupplierList = res.data.venSupplierList;
                // 城市回显
                if (this.filterForm.madeinCountry === 10000 && this.filterForm.madeinProvince && this.filterForm.madeinCity) {
                    this.filterForm.selectedOptions = [this.filterForm.madeinProvince, this.filterForm.madeinCity];
                    this.madeinProvinceList = res.data.madeinProvinceList;
                    this.madeinProvinceList.some(item => {
                        if (item.areaId === this.filterForm.madeinProvince) {
                            this.queryAreaListByParent(this.filterForm.madeinProvince, (data) => {
                                this.madeinProvinceList.forEach(item => {
                                    this.$set(item, 'cities', data);
                                });
                            });
                        }
                    });
                } else {
                    this.madeinProvinceList = res.data.madeinProvinceList;
                    this.madeinProvinceList.forEach(item => {
                        this.$set(item, 'cities', []);
                    });
                }
            }).catch(error => {
                console.log(error);
            });
        },
        queryAreaListByParent(id, fn) {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/ven/proSpu/queryAreaListByParent',
                data: {
                    areaId: id
                }
            }).then(res => {
                fn && fn(res.data.areaList);
            }).catch(error => {
                console.log(error);
            });
        },
        madeinItemChange(val) {
            console.log('active item:', val);
            let flag = false;
            this.madeinProvinceList.some(item => {
                if (item.areaId === val[0] && !item.cities.length) {
                    flag = true;
                    return true;
                }
            });
            if (flag) {
                this.queryAreaListByParent(val[0], (dataList) => {
                    this.madeinProvinceList.some(item => {
                        if (item.areaId === val[0]) {
                            item.cities = dataList;
                            return true;
                        }
                    });
                });
            }
        },
        madeinChange(val) {
            this.filterForm.madeinProvince = val[0];
            this.filterForm.madeinCity = val[1];
        },
        skuImgFileChange(item, event) {
            console.log(item);
            this.loadingtable = true;
            var formData = new FormData($(event.target).parent('.formfile')[0]);
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/product/uploadImg/proImgUpload',
                data: formData
            }).then(res => {
                console.log(res);
                this.loadingtable = false;
                item.proMainImg = res.data.imgInfoList[0].proImg;
                $(event.target || event.srcElement).parents('.skuImgUpload').find('.spec_pic').attr('src', res.data.imgInfoList[0].imgUrl);
            }).catch(error => {
                this.loadingtable = false;
                console.log(error);
            });
        },
        skuImgFileRemove(item, event) {
            console.log(item);
            console.log(event);
            item.proMainImg = '';
            $(event.target || event.srcElement).parents('.skuImgUpload').find('.skuImgFile').val('');
        },
        inputFile2Fn() {
            this.loadingUploadImg = true;
            var formData = new FormData(document.getElementById('formFile2'));
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/product/uploadImg/proImgUpload',
                data: formData
            }).then(res => {
                console.log(res);
                this.loadingUploadImg = false;
                this.uploadImg2.push(...res.data.imgInfoList);
            }).catch(error => {
                this.loadingUploadImg = false;
                console.log(error);
            });
        },
        renderHeader(h, {column, $index}) {
            return (<div><span style={{color: 'red'}}>*</span> {column.label}</div>);
        },
        proNumBlur(event, rowData) {
            // 验证货号是否重复
            const value = event.target.value;
            if (!event.target.value) return;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/ven/proSpu/checkProNum',
                data: {
                    proNum: value,
                    proSku: rowData.proSku ? rowData.proSku : ''
                }
            }).then(res => {
                this.$set(rowData, 'proNumFlag', res.data.isExist);
                if (res.data.isExist === 1) {
                    if ($(event.target || event.srcElement).parent().find('.proNumP').length) {
                        $(event.target || event.srcElement).parent().find('.proNumP').remove();
                    }
                    $(event.target || event.srcElement).parent().append('<p class="proNumP" style="color: #ff4949">该货号不唯一</p>');
                } else {
                    if ($(event.target || event.srcElement).parent().find('.proNumP').length) {
                        $(event.target || event.srcElement).parent().find('.proNumP').remove();
                    }
                }
            }).catch(error => {
                console.log(error);
            });
        },
        proReleasebtn(formName, submitFlag) {
            const h = this.$createElement;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let submitFlag1 = true;
                    let submitFlag2 = true;
                    let submitFlag3 = true;
                    let methodType = 1;
                    if (this.$route.params.type === 'edit' || this.$route.params.type === 'draft') {
                        methodType = 2;
                    }
                    let parmas = {
                        'proSpu': this.$route.params.proSpu ? this.$route.params.proSpu : '',
                        'methodType': methodType,
                        'proName': this.filterForm.proName,
                        'cateId': this.cateId, // 分类id
                        'brandId': this.filterForm.brandId, // 品牌id
                        'proIntro': this.filterForm.proIntro, // 商品简介
                        'frozenFlag': this.filterForm.frozenFlag, // 是否是冻品
                        'pricingType': this.filterForm.pricingType, // 计价方式
                        'proUnit': this.filterForm.pricingTypeInfo, // 计量单位
                        'reserveCondition': this.filterForm.reserveCondition, // 贮存条件
                        'sellType': this.filterForm.sellType, // 售卖方式
                        'shelfLife': this.filterForm.shelfLife, // 保质期
                        'shelfLifeUnit': this.filterForm.shelfLifeUnit, // 保质期单位
                        'madeDateStr': this.madeDateStr, // 生产日期
                        'madeinCountry': this.filterForm.madeinCountry, // 产地国家
                        'madeinProvince': this.filterForm.madeinProvince, // 产地省
                        'madeinCity': this.filterForm.madeinCity, // 产地市
                        'supplierId': this.filterForm.supplierId, // 供货商id
                        'typeId': this.filterForm.typeId, // 类型id
                        'proDraft': submitFlag, // 是否草稿商品 1是 2否(传入1时自动保存为草稿商品)
                        'proImgs': this.proImgs,
                        'appDesc': this.appEditorInstance ? this.appEditorInstance.getContent() : '',
//                            'pcDesc': '',
                        'pcDesc': this.pcEditorInstance ? this.pcEditorInstance.getContent() : '',
                        'priceMethod': this.priceMethodFlag,
                        'deliveryTypeFlag': this.deliveryTypeFlag,
                        'failureTimeFlag': this.failureTimeFlag
                    };
                    // 商品属性json字符串
                    parmas.proPropertyList = this.proPropertyList;
                    // 商品sku字符串
                    console.log('======');
                    console.log(this.typeSpecTableData);
                    console.log('======');
                    if (this.typeSpecTableData.length > 0) {
                        // 验证SKU是否有必填项为空
                        this.typeSpecTableData.some(item => {
                            if (!item.proNum || !item.grossWeight || !item.skuPrice || !item.minQuantity || !item.proMainImg) {
                                submitFlag1 = false;
                                if (!item.proMainImg) {
                                    this.$xeMessage.error('请上传商品主图!');
                                    return true;
                                }
                                if (!item.proNum) {
                                    this.$xeMessage.error('请填写货号!');
                                    return true;
                                }
                                if (!item.grossWeight) {
                                    this.$xeMessage.error('请填写重量!');
                                    return true;
                                }
                                if (!item.skuPrice) {
                                    this.$xeMessage.error('请填写建议销售价!');
                                    return true;
                                }
                                if (!item.minQuantity) {
                                    this.$xeMessage.error('请填写起订量!');
                                    return true;
                                }
                            }
                        });
                        if (submitFlag1) {
                            // 验证sku货号是否有不唯一
                            this.typeSpecTableData.some(item => {
                                if (item.proNumFlag && item.proNumFlag === 1) {
                                    submitFlag2 = false;
                                    this.$xeMessage.error('请修改不唯一货号!');
                                    return true;
                                }
                            });
                        }
                        if (submitFlag1 && submitFlag2) {
                            let arrs = [];
                            // 验证sku货号前台是否不唯一
                            this.typeSpecTableData.forEach(item => {
                                arrs.push(item.proNum);
                            });
                            if (isRepeat(arrs)) {
                                submitFlag3 = false;
                                let duplicateValue = duplicate(arrs);
                                this.$xeMessage.error('货号' + duplicateValue.join(',') + '重复');
                            } else {
                                let copyProSkuList = JSON.parse(JSON.stringify(this.typeSpecTableData));
                                console.log(copyProSkuList);
                                copyProSkuList.forEach((item) => {
                                    item.proSkuSpecList.forEach((specItem, index) => {
                                        if (!specItem.specId) {
                                            item.proSkuSpecList.splice(index, 1);
                                        }
                                    });
                                });
                                console.log(copyProSkuList);
                                parmas.proSkuList = JSON.stringify(copyProSkuList);
                            }
                        }
                    } else {
                        this.$xeMessage.error('请选中规格值生成商品SKU');
                    }
                    if (submitFlag1 && submitFlag2 && submitFlag3) {
                        console.log(parmas);
                        console.log('提交。。。。');
                        this.$http({
                            method: 'post',
                            url: '/xe-route/xe-mis/manager/sysprospu/editSysProSpu',
                            data: parmas
                        }).then(res => {
                            console.log(res);
                            if (submitFlag === 1) {
                                // 保存为草稿商品
                                this.$alert('保存为草稿商品成功！').then(() => {
                                    this.$router.push({
                                        name: 'draft'
                                    });
                                });
                            } else {
//                                let methodType = 1;
//                                if (this.$route.params.type === 'edit' || this.$route.params.type === 'draft') {
//                                    methodType = 2;
//                                }
//                                this.$router.push({name: 'methodofprice', query: {'proSpu': res.data.proSpu, 'methodType': methodType, 'auditFlag': this.auditFlag}});
//                                window.localStorage.setItem('proreleasemsg', JSON.stringify(parmas));
                                this.$router.push({name: 'sysProLists'});
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                    }
                } else {
                    console.log('提交失败');
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
                        $('.m-router').scrollTop(0);
                    }).catch(() => {
                    });
                    return false;
                }
            });
        }
    },
    watch: {
        'filterForm.pricingType'(val) {
            console.log('~~~');
            if (this.pricingTypeFlag && val === this.pricingTypeFlag && this.pricingTypeInfoValue) {
                this.filterForm.pricingTypeInfo = this.pricingTypeInfoValue;
            } else {
                if (val === 1) {
                    // 重量
                    this.filterForm.pricingTypeInfo = '千克';
                }
                if (val === 2) {
                    // 数量
                    this.filterForm.pricingTypeInfo = '件';
                }
            }
        },
        'filterForm.madeinCountry'(val) {
            if (val !== 10000) {
                // 选中中国时
                this.filterForm.madeinProvince = '';
                this.filterForm.madeinCity = '';
            }
        },
        typeSpecChoose(newVal, oldVal) {
            this.specNewVal = doExchange(newVal);
            this.specOldVal = doExchange(oldVal);
        },
        uploadImg2(val) {
            if (val.length >= 5) {
                this.uploadBtnFlag = false;
            } else {
                this.uploadBtnFlag = true;
            }
        }
    },
    computed: {
        typePropertyListComputed: {
            get() {
                return this.extendSelects;
            },
            set(val) {
                this.typePropertyList = val;
                if (val.length) {
                    val.forEach((item, index) => {
                        if (!this.proPropertyValue['value' + item.propertyId]) {
                            this.$set(this.proPropertyValue, 'value' + item.propertyId, '请选择');
                        }
                    });
                }
            }
        },
        proPropertyList() {
            // 商品属性JSON字符串
            let result = [];
            this.typePropertyList.forEach(item => {
                result.push({
                    propertyId: item.propertyId,
                    propertyName: item.propertyName,
                    propertyValue: this.proPropertyValue['value' + item.propertyId]
                });
            });
            return JSON.stringify(result);
        },
        typeSpecChoose() {
            let hash = {};
            let result = [];
            this.typeSpecArr.forEach((item, index) => {
                if (hash[item.split('-')[0]]) {
                    hash[item.split('-')[0]].push(item);
                } else {
                    hash[item.split('-')[0]] = [];
                    hash[item.split('-')[0]].push(item);
                }
            });
            for (let key in hash) {
                result.push(hash[key]);
            }
            return result;
        },
        typeSpecChooseResult() {
            let result = doExchange(this.typeSpecChoose);
            let resultArrs = [];
            if (this.typeSpecChoose.length) {
                result.forEach((item, index) => {
                    let obj = {
                        proMainImg: '',
                        proSkuSpecList: [],
                        proNum: '', // 货号
                        grossWeight: '', // 重量
                        costPrice: '', // 预计成本价
                        skuPrice: '', // 建议销售价
                        realQuantity: '', // 真实库存
                        saleQuantity: '', // 销售库存
                        minQuantity: '', // 起订量
                        barCode: '' // 条形码
                    };
                    let itemarr = item.split(',');
                    let itemResultArr = [];
                    itemarr.forEach(sItem => {
                        let sobj = {};
                        let list = sItem.split('-');
                        sobj.specId = list[0];
                        sobj.specName = list[1];
                        sobj.specValue = list[2];
                        itemResultArr.push(sobj);
                    });
                    obj.proSkuSpecList = itemResultArr;
                    resultArrs.push(obj);
                });
            }
            return resultArrs;
        },
        formThead() {
            return this.typeSpecTableData[0].proSkuSpecList && this.typeSpecTableData[0].proSkuSpecList.map(v => { return v.specName; });
        },
        pricingTypeList() {
            return pricingType;
        },
        reserveConditionList() {
            return reserveCondition;
        },
        pricingTypeInfoListArr() {
            return this.pricingTypeInfoList[this.filterForm.pricingType];
        },
        pricingTypeInfoList() {
            return pricingTypeInfoMap;
        },
        sellTypeList() {
            return sellType;
        },
        shelfLifeUnitList() {
            return shelfLifeUnit;
        },
        frozenFlagList() {
            return frozenFlag;
        },
        cateId() {
            if (this.filterForm.cateIds.length > 0) {
                return this.filterForm.cateIds[this.filterForm.cateIds.length - 1];
            } else {
                return '';
            }
        },
        madeDateStr() {
            if (this.filterForm.madeDate && this.filterForm.madeDate.getTime()) {
                return this.filterForm.madeDate.getFullYear() + '-' + (this.filterForm.madeDate.getMonth() + 1) + '-' + this.filterForm.madeDate.getDate();
            } else {
                return '';
            }
        },
        madeinProvinceListFlag() {
            // 产地省市只有在是中国显示
            if (this.filterForm.madeinCountry === 10000) {
                return true;
            } else {
                return false;
            }
        },
        uploadImg2Computed() {
            return this.uploadImg2.slice(0, 5);
        },
        proImgs() {
            let result = [];
            if (this.uploadImg2Computed.length > 0) {
                this.uploadImg2Computed.forEach(item => {
                    result.push(item.proImg);
                });
                return result.join(',');
            } else {
                result = '';
            }
            return result;
        }
    },
    components: {
        ueditor,
        categoryTag
    }
};
</script>
