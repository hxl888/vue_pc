<template lang="html">
    <div class="m-router-con">
        <!-- 新增运费模版 -->
        <!-- insertFareForm: {{insertFareForm}} -->
        <el-form :inline="true"
            class="resetForm"
            ref = "insertFareForm"
            :model = "insertFareForm"
            :rules = "rules"
            :label-width = "xeLabelWidth">
            <div class="newTem-flor">
                <div class="admarbot">
                    <el-form-item label="模版名称" prop="fareName" required>
                        <el-input :maxlength="20" class = "xe-input-col3" v-model="insertFareForm.fareName" placeholder="请输入模版名称"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="" class="text_left">
                        <div class="addnewtype">
                              数字／英文／汉字，限制1-20个字
                        </div>
                    </el-form-item> -->
                </div>
                <div>
                    <el-form-item label="是否包邮" prop="">
                        <el-radio-group v-model.number="insertFareForm.fareMailFlag">
                            <el-radio class="" :label="1">是</el-radio>
                            <el-radio class="" :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                 <div>
                    <el-form-item label="计价方式" prop="">
                        <el-radio-group v-model.number="insertFareForm.pricingType" disabled>
                            <el-radio class="" :label="1">按件</el-radio>
                            <el-radio class="" :label="2">按重量</el-radio>
                         </el-radio-group>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="是否共享" prop="">
                        <el-radio-group v-model.number="insertFareForm.shareFlag">
                            <el-radio class="" :label="1">是</el-radio>
                            <el-radio class="" :label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="" class="text_left">
                        <div class="addnewtype">
                             &nbsp;&nbsp;&nbsp;是否共享指的是商品首件共享； 选择“是”后，当前运费模板下所有商品数量累加后，再计算运费
                        </div>
                    </el-form-item>
                </div>
            </div>
            <!--运费规则-->
            <div v-if="insertFareForm.fareMailFlag === 2">
                <div class="header-tit">
                    运费规则
                </div>
                <div class="newTem-flor02" style="padding-bottom: 0;">
                    <!-- <div class="editor-fist clearfix">
                        <span>默认始发地运费&nbsp;&nbsp;</span>
                        <el-input class = "xe-input-smal90_hei30" v-model.number="insertFareForm.firstPro" placeholder=""></el-input>
                        <span>&nbsp;&nbsp;{{unit}}内，&nbsp;&nbsp;</span>
                        <el-input class = "xe-input-smal90_hei30 f-fixedOne" v-model.number="insertFareForm.firstPrice" placeholder=""></el-input>
                        <span>元，每增加&nbsp;&nbsp;</span>
                        <el-input class = "xe-input-smal90_hei30" v-model.number="insertFareForm.incrPro" placeholder=""></el-input>
                        <span>&nbsp;&nbsp;{{unit}}，增加运费</span>
                        <el-input class = "xe-input-smal90_hei30 f-fixedOne" v-model.number="insertFareForm.incrPrice" placeholder=""></el-input>
                        <span>&nbsp;&nbsp;元</span>
                    </div> -->
                    <!--表格区域-->
                    <div class="editor-content clearfix">
                        <div class="addres-nav fl">
                            <ul>
                                <li v-for="(item, adrIndex) in insertFareForm.fromCityList"  class="adres-lis adres-lisArea" :key="adrIndex">
                                    <i class="iconfont icon-jianshao" @click="deletRow(insertFareForm.fromCityList, adrIndex)"></i>
                                    <p class="active">{{item.fromProvinceName}}-{{item.fromCityName}}</p>
                                    <!-- <span class="bord-radio">&nbsp;&nbsp;</span> -->
                                </li>
                                <li v-if="!insertFareForm.fromCityList.length" class="adres-lis adres-add" @click="addAdr(insertFareForm.fromCityList)">
                                    <i class="iconfont icon-zengjia"></i>
                                    <p>添加地区</p>
                                </li>
                            </ul>
                        </div>
                        <div class="editor-box fl" v-for="(item, adrIndex) in insertFareForm.fromCityList" :key="adrIndex">
                            <div class="editor-fist editor-secon clearfix">
                                <span>默认运费&nbsp;&nbsp;</span>
                                <el-input  class = "freight-txt xe-input-smal90_hei30" @blur="item.firstPro = parseFloat(item.firstPro) ? Math.abs(parseInt(item.firstPro)) : 0" v-model="item.firstPro" placeholder=""></el-input>
                                <span>&nbsp;&nbsp;{{unit}}内，&nbsp;&nbsp;</span>
                                <el-input  class = "freight-txt xe-input-smal90_hei30 f-fixedOne" @blur="item.firstPrice = parseFloat(item.firstPrice) ? Math.abs(parseFloat(item.firstPrice)).toFixed(1) : 0" v-model="item.firstPrice" placeholder=""></el-input>
                                <span>元，每增加&nbsp;&nbsp;</span>
                                <el-input  class = "freight-txt xe-input-smal90_hei30" @blur="item.incrPro = parseFloat(item.incrPro) ? Math.abs(parseInt(item.incrPro)) : 0" v-model="item.incrPro" placeholder=""></el-input>
                                <span>&nbsp;&nbsp;{{unit}}，增加运费</span>
                                <el-input  class = "freight-txt xe-input-smal90_hei30 f-fixedOne" @blur="item.incrPrice = parseFloat(item.incrPrice) ? Math.abs(parseFloat(item.incrPrice)).toFixed(1) : 0" v-model="item.incrPrice" placeholder=""></el-input>
                                <span>&nbsp;&nbsp;元</span>
                            </div>
                            <!-- {{item.fareDetailList}} -->
                            <div class="editor-oper-content">
                                <el-table
                                    :data="item.fareDetailList"
                                    border>
                                    <el-table-column
                                        label="配送到"
                                        min-width="250">
                                        <template scope="scope">
                                            <span class="addres_set" @click.stop="setAreaCell(scope.$index)">设置区域</span> &nbsp;
                                            <el-tag
                                                class="freight-areaTag"
                                                v-if='scope.row.areaTags.length'
                                                v-for="(tag, index) in scope.row.areaTags"
                                                :key="tag.areaId">
                                                <template v-if="index === scope.row.areaTags.length - 1">
                                                    {{tag.areaName}}
                                                </template>
                                                <template v-else>
                                                    {{tag.areaName}},
                                                </template>
                                            </el-tag>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        :label=tableFirstUnit
                                        min-width="120">
                                        <template scope="scope">
                                            <el-input class = "xe-input-smal90" @blur="scope.row.firstPro = parseFloat(scope.row.firstPro) ? Math.abs(parseInt(scope.row.firstPro)) : 0" v-model="scope.row.firstPro" placeholder=""></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="收费（元）"
                                        min-width="120">
                                        <template scope="scope">
                                            <el-input class = "xe-input-smal90 f-fixedOne" @blur="scope.row.firstPrice = parseFloat(scope.row.firstPrice) ? Math.abs(parseFloat(scope.row.firstPrice)).toFixed(1) : 0" v-model="scope.row.firstPrice" placeholder=""></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        :label=tableAndUnit
                                        min-width="120">
                                        <template scope="scope">
                                            <el-input class = "xe-input-smal90" @blur="scope.row.incrPro = parseFloat(scope.row.incrPro) ? Math.abs(parseInt(scope.row.incrPro)) : 0" v-model="scope.row.incrPro" placeholder=""></el-input>
                                                </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="收费（元）"
                                        min-width="120">
                                        <template scope="scope">
                                            <el-input class = "xe-input-smal90 f-fixedOne" @blur="scope.row.incrPrice = parseFloat(scope.row.incrPrice) ? Math.abs(parseFloat(scope.row.incrPrice)).toFixed(1) : 0" v-model="scope.row.incrPrice" placeholder=""></el-input>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="操作"
                                        min-width="80">
                                        <template scope="scope">
                                            <div class="edit_oper" @click="deletRow(item.fareDetailList, scope)">
                                                删除
                                            </div>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div class="add-editorData"><span class="bord-radio" @click="addRules(item.fareDetailList)"><i class="iconfont icon-zengjia"></i></span>&nbsp;添加运费规则</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="u-next f-next">
                <el-button type="primary" @click="saveForm('insertFareForm')">保存</el-button>
                <el-button @click="backPage">返回</el-button>
            </div>
        </el-form>
        <!--弹框-->
        <div class="m-router-con com-address">
            <el-dialog title="添加地区" class="reset-dialog" :visible.sync="subArea">
                <el-form :inline="true"
                    class="addressForm"
                    ref = "areaSelect"
                    :model = "areaSelect"
                    :label-width = "xeLabelWidth">
                    <!-- {{provinceList}} -->
                    <!-- {{areaSelect}} -->
                    <el-form-item label="添加地区" :label-width="xeLabelWidth80">
                        <el-cascader
                            class="xe-input-col1 fl"
                            :options="provinceList"
                            v-model='areaSelect.formProCitys'
                            @active-item-change="areaItemchange"
                            @change="valChange"
                            :props="{label: 'areaName', value: 'areaId', children: 'cities'}">
                        </el-cascader>
                    </el-form-item>
                </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" class="areabtn" @click="savesubArea(insertFareForm.fromCityList)">保存</el-button>
                        <el-button @click="subArea = false">取 消</el-button>
                    </div>
            </el-dialog>
        </div>
        <!--使用区域选择-->
        <el-dialog class="el-tree-dialog" title="选择配送区域" :visible.sync="dialogTableVisible" ref="useAreaDialog">
            <useAreaList
                ref="useAreaList"
                :defaultData="allList"
                :disbaledIds="useAreaDisabledIds"
                ajaxUrl="/xe-route/xe-pro/ven/proSpu/queryAreaListByParent"
            ></useAreaList>
            <div style="margin-top: 20px; text-align: center;">
                <el-button @click="treeSureBtn" type="primary">确定</el-button>
                <el-button @click="dialogTableVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import useAreaList from 'components/useAreaList/useAreaList';
    import {deepCopy} from 'utils';
    $(function() {
        $('body').on('click', '.adres-lisArea', function() {
            $('.adres-lisArea p').removeClass('active').eq($(this).index()).addClass('active');
            $('.editor-box').hide().eq($(this).index()).show();
        }).on('click', '.areabtn', function() {
            $('.adres-lisArea p').removeClass('active').eq($('.adres-lisArea p').length - 1).addClass('active');
            $('.editor-box').hide().eq($('.editor-box').length - 1).show();
        });
    });
    export default {
        data() {
            var checkProCode = (rule, value, callback) => {
                // if (this.insertFareForm.fareName) {
                if (value.trim() !== '') {
                    // var reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
                    // if (!reg.test(value)) {
                    //     callback(new Error('商品名称只能为数字／字母／汉字'));
                    // } else {
                    //     callback();
                    // }
                    callback();
                } else {
                    callback(new Error('请输入模版名称'));
                }
                // }
            };
            return {
                dialogTableVisible: false,
                subArea: false,
                provinceList: [],
                areaTags: [],
                setAreaCellIndex: '',
                useAreaDisabledIds: [],
                insertFareForm: {
                    fareName: '',
                    fareMailFlag: 2,
                    pricingType: 1,
                    shareFlag: 2,
                    firstPro: '',
                    firstPrice: '',
                    incrPro: '',
                    incrPrice: '',
                    fromCityList: []
                },
                areaSelect: {
                    fromProvince: '',
                    fromCity: '',
                    fromProvinceName: '',
                    fromCityName: ''
                },
                allList: [],
                rules: {
                    fareName: [
                        { min: 0, max: 20, message: '角色编码长度不能大于20', trigger: 'blur' },
                        { validator: checkProCode, trigger: 'blur' }
                    ]
                }
            };
        },
        created() {
            this.loadArea(0);
            this.getEditInf();
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.useAreaDialog.$data.rendered = true;
            });
        },
        methods: {
            saveForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var insertForm = this.insertFareForm;
                        if (insertForm.fareMailFlag === 2) { // 包邮状态
                            var r = /^[0-9]*[1-9][0-9]*$/; // 正整数
                            var rp = /^([1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/;
                            // if (!(r.test(insertForm.firstPro) && r.test(insertForm.incrPro) && rp.test(insertForm.firstPrice) && rp.test(insertForm.incrPrice))) { // 默认运费
                            //     this.$xeMessage.warning('认真填写默认运费！');
                            // } else {
                            // 地区运费
                            var fareFrom = this.insertFareForm.fromCityList;
                            if (!fareFrom.length) {
                                this.commitForm(2);
                            } else {
                                for (var i = 0; i < fareFrom.length; i++) {
                                    if (!(r.test(fareFrom[i].firstPro) && r.test(fareFrom[i].incrPro) && rp.test(fareFrom[i].firstPrice) && rp.test(fareFrom[i].incrPrice))) {
                                        this.$xeMessage.warning('认真填写地区运费！');
                                        break;
                                    } else { // row运费rules
                                        var subFromList = fareFrom[i].fareDetailList;
                                        if (!subFromList.length) { // 没有运费rules 进入下一条 最后一个则提交
                                            // if (i === fareFrom.length - 1) {
                                            this.commitForm(2);
                                            //     break;
                                            // }
                                            // i++;
                                        } else {
                                            for (var j = 0; j < subFromList.length; j++) {
                                                if (!(r.test(subFromList[j].firstPro) && r.test(subFromList[j].incrPro) && rp.test(subFromList[j].firstPrice) && rp.test(subFromList[j].incrPrice) && subFromList[j].useArea.length)) {
                                                    this.$xeMessage.warning('认真填写运费规则！');
                                                    return false;
                                                } else {
                                                    console.log(subFromList.length);
                                                    if (j === subFromList.length - 1) {
                                                        console.log('testsucc', 'success');
                                                        this.commitForm(2);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else { // 包邮状态1
                            this.commitForm(1);
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            commitForm() {
                let _this = this;
                let data = {};
                data.fareName = this.insertFareForm.fareName;
                data.fareMailFlag = this.insertFareForm.fareMailFlag;
                data.pricingType = this.insertFareForm.pricingType;
                data.shareFlag = this.insertFareForm.shareFlag;
                data.tempNum = this.insertFareForm.tempNum;
                console.log('testdata', data);
                if (this.insertFareForm.fareMailFlag === 1) {
                    console.log('type' + 1);
                } else {
                    // data.firstPro = this.insertFareForm.firstPro;
                    // data.firstPrice = this.insertFareForm.firstPrice;
                    // data.incrPro = this.insertFareForm.incrPro;
                    // data.incrPrice = this.insertFareForm.incrPrice;
                    data.fromCityList = this.insertFareForm.fromCityList;
                }
                console.log('testdata', data);
                this.$http({ // 添加运费模板
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/fare/updateTemplate',
                    data: data
                }).then((res) => {
                    if (res.status === '0000') {
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.$router.push({name: 'freightTemplateIndex'});
                        }, 1000);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            backPage() {
                this.$router.push({name: 'freightTemplateIndex'});
            },
            addRules(row) { // 添加地区下规则
                let fareObj = {
                    firstPro: '',
                    firstPrice: '',
                    incrPro: '',
                    incrPrice: '',
                    useAreaId: '',
                    useAreaName: '',
                    areaTags: [],
                    useArea: []
                };
                row.push(fareObj);
            },
            addAdr(row) { // 添加地区
                this.subArea = true;
            },
            loadArea(id) {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/xeveninfo/getArea',
                    data: {
                        areaId: id
                    }
                }).then(res => {
                    console.log(res);
                    this.provinceList = res.data.areaList;
                    // console.log('provinceList', this.provinceList);
                    this.provinceList.forEach(item => {
                        this.$set(item, 'cities', []);
                    });
                }).catch(error => {
                    console.log(error);
                });
            },
            valChange(val) {
                this.areaSelect.fromProvince = val[0];
                this.areaSelect.fromCity = val[1];
                this.provinceList.some(item => {
                    if (item.areaId === val[0]) {
                        this.areaSelect.fromProvinceName = item.areaName;
                        item.cities.some(items => {
                            if (items.areaId === val[1]) {
                                this.areaSelect.fromCityName = items.areaName;
                                return true;
                            }
                        });
                    }
                });
            },
            areaItemchange(val) {
                console.log('active item:', val);
                let flag = false;
                this.provinceList.some(item => {
                    if (item.areaId === val[0] && !item.cities.length) {
                        flag = true;
                        return true;
                    }
                });
                if (flag) {
                    this.queryAreaListByParent(val[0], (dataList) => {
                        this.provinceList.some(item => {
                            if (item.areaId === val[0]) {
                                item.cities = dataList;
                                return true;
                            }
                        });
                    });
                }
            },
            queryAreaListByParent(id, fn) {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/xeveninfo/getArea',
                    data: {
                        areaId: id
                    }
                }).then(res => {
                    fn && fn(res.data.areaList);
                }).catch(error => {
                    console.log(error);
                });
            },
            setAreaCell(index) {
                this.dialogTableVisible = true;
                this.setAreaCellIndex = index;
                let thisAreaTags = this.insertFareForm.fromCityList[0].fareDetailList[this.setAreaCellIndex].areaTags;
                this.allList = this.insertFareForm.fromCityList[0].fareDetailList[this.setAreaCellIndex].allList;
                console.log('thisAreaTags');
                console.log(thisAreaTags);
                console.log('thisAreaTags');
                this.insetDisabledId(index);
                this.$nextTick(() => {
                    this.$refs.useAreaList.initData2();
                    this.$refs.useAreaList.resetData(thisAreaTags);
                });
            },
            treeSureBtn() {
                let resultData = this.$refs.useAreaList.getDataResult();
                console.log('this.insertFareForm.fromCityList.fareDetailList', this.insertFareForm);
                let item = this.insertFareForm.fromCityList[0].fareDetailList[this.setAreaCellIndex];
                item.useArea = resultData.resultIds;
                item.areaTags = resultData.resultTexts;
                let areaTagsName = [];
                item.areaTags.forEach(items => {
                    areaTagsName.push(items.areaName);
                });
                item.useAreaId = ',' + resultData.resultIds.join(',') + ',';
                item.useAreaName = ',' + areaTagsName.join(',') + ',';
                this.insetDisabledId();
                this.dialogTableVisible = false;
            },
            insetDisabledId(sindex) {
                let arrs = this.insertFareForm.fromCityList[0].fareDetailList;
                let result = [];
                arrs.some((item, index) => {
                    if (index === sindex) {
                        return false;
                    }
                    item.areaTags.forEach(subitem => {
                        let ids = subitem.areaId.split('-');
                        let obj = {};
                        if (ids.length === 1) {
                            obj.areaId = parseInt(ids[0]);
                            obj.showZk = false;
                            result.push(obj);
                        }
                        if (ids.length === 2) {
                            ids.forEach((twoitem, index) => {
                                let obj = {};
                                obj.areaId = parseInt(ids[index]);
                                if (index === 0) {
                                    obj.showZk = true;
                                } else {
                                    obj.showZk = false;
                                }
                                result.push(obj);
                            });
                        }
                        if (ids.length === 3) {
                            ids.forEach((threeItem, index) => {
                                let obj = {};
                                obj.areaId = parseInt(ids[index]);
                                obj.showZk = true;
                                result.push(obj);
                            });
                        }
                    });
                });
                this.useAreaDisabledIds.length = 0;
                this.useAreaDisabledIds = result;
            },
            savesubArea(row) { // 保存区域
                console.log('row', row);
                let AreaFlag = false;
                if (this.areaSelect.fromProvince === '') {
                    AreaFlag = false;
                    this.$xeMessage.warning('请选择始发地区域');
                    return false;
                }
                if (row.length > 0) {
                    for (var i = 0; i < row.length; i++) {
                        if (row[i].fromCity === this.areaSelect.fromCity) {
                            this.$xeMessage.warning('重复的始发地');
                            AreaFlag = false;
                            break;
                        } else {
                            AreaFlag = true;
                        }
                    }
                } else {
                    AreaFlag = true;
                }
                if (AreaFlag) {
                    let fareObj = {
                        fromProvince: this.areaSelect.fromProvince,
                        fromCity: this.areaSelect.fromCity,
                        fromProvinceName: this.areaSelect.fromProvinceName,
                        fromCityName: this.areaSelect.fromCityName,
                        firstPro: '',
                        firstPrice: '',
                        incrPro: '',
                        incrPrice: '',
                        fareDetailList: [{
                            firstPro: '',
                            firstPrice: '',
                            incrPro: '',
                            incrPrice: '',
                            useAreaId: '',
                            useAreaName: '',
                            areaTags: [],
                            useArea: []
                        }]
                    };
                    this.subArea = false;
                    row.push(fareObj);
                }
            },
            deletRow(obj, row) {
                this.$confirm('确定要对该数据进行删除操作, 是否继续?', '友情提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    obj.splice(row.$index, 1);
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            getEditInf(id) {
                console.log(id);
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/fare/queryFareByTempNum',
                    data: {
                        tempNum: this.$route.query.tempNum
                    }
                }).then((res) => {
                    console.log('res', res);
                    console.log(res.data);
                    this.insertFareForm = res.data.venFare;
                    this.insertFareForm.tempNum = parseInt(this.$route.query.tempNum);
                    if (this.insertFareForm.fromCityList[0].fareDetailList.length) {
                        let fareDetailList = this.insertFareForm.fromCityList[0].fareDetailList;
                        for (var i = 0; i < fareDetailList.length; i++) {
                            let itemDetail = fareDetailList[i];
                            // areaSelect
                            // this.$set(item, 'areaSendList', allList);
                            // this.areaSendList = item;
                            let areaSendList = deepCopy(itemDetail.allList);
                            // console.log('testareaSendList', areaSendList);
                            if (areaSendList !== '' && areaSendList.length > 0) {
                                // 覆盖区域选择组件回显
                                let result = {
                                    resultIds: [],
                                    resultTexts: []
                                };
                                areaSendList.forEach(item => {
                                    if (item.areaCheckBoxFlag === 1) {
                                        result.resultIds.push(item.areaId);
                                        let obj = {
                                            areaId: `${item.areaId}`,
                                            areaName: `${item.areaName}`
                                        };
                                        result.resultTexts.push(obj);
                                    } else {
                                        if (item.areaList.length) {
                                            item.areaList.forEach(citem => {
                                                if (citem.areaCheckBoxFlag === 1) {
                                                    result.resultIds.push(citem.areaId);
                                                    let obj = {
                                                        areaId: `${item.areaId}-${citem.areaId}`,
                                                        areaName: `${item.areaName}-${citem.areaName}`
                                                    };
                                                    result.resultTexts.push(obj);
                                                } else {
                                                    if (citem.areaCheckBoxFlag === 2 && citem.areaList && citem.areaList.length > 0) {
                                                        citem.areaList.forEach(aitem => {
                                                            if (aitem.areaCheckBoxFlag === 1) {
                                                                result.resultIds.push(aitem.areaId);
                                                                let obj = {
                                                                    areaId: `${item.areaId}-${citem.areaId}-${aitem.areaId}`,
                                                                    areaName: `${item.areaName}-${citem.areaName}-${aitem.areaName}`
                                                                };
                                                                result.resultTexts.push(obj);
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                                // console.log('testitemDetail', result);
                                this.$set(itemDetail, 'useArea', result.resultIds);
                                this.$set(itemDetail, 'areaTags', result.resultTexts);
                                // this.areaTags = result.resultTexts;
                                // this.useArea = result.resultIds;
                                console.log(areaSendList);
                            } else {
                                // console.log('test00000', '0000000');
                                this.$set(itemDetail, 'useArea', []);
                                this.$set(itemDetail, 'areaTags', []);
                            }
                            // this.$set(item, 'useArea', item.useAreaId.slice(0, -1).split(',')); // 接口返回‘_1_2_3_,’
                            // item.unusefulAreaName = item.useAreaName.slice(1, -1).split(','); // 接口返回‘,北京-北京市-东城区,’
                            // let areaTagsArr = [];
                            // for (var j = 0; j < item.useArea.length; j++) {
                            //     let shortData = item.useArea[j].slice(1, -1);
                            //     areaTagsArr.push({
                            //         areaId: shortData.replace(/_/g, '-'),
                            //         areaName: item.unusefulAreaName[j]
                            //     });
                            //     item.useArea[j] = parseInt(shortData.split('_')[shortData.split('_').length - 1]);
                            // };
                            // item.useAreaId = ',' + item.useArea.join(',') + ',';
                            // this.$set(item, 'areaTags', areaTagsArr);
                        };
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        computed: {
            unit() {
                if (this.insertFareForm.pricingType === 1) {
                    return '件';
                } else {
                    return 'Kg';
                }
            },
            tableFirstUnit() {
                if (this.insertFareForm.pricingType === 1) {
                    return '首件(件)';
                } else {
                    return '首件(Kg)';
                }
            },
            tableAndUnit() {
                if (this.insertFareForm.pricingType === 1) {
                    return '续件(件)';
                } else {
                    return '续件(Kg)';
                }
            }
        },
        components: {
            useAreaList
        }
    };
</script>

<style lang="scss">
    .freight-txt.xe-input-smal90_hei30{
        width: 90px;
    }
    .xe-input-smal90{
        width: 100%;
    }
    .el-table--fit{
        border-bottom: 1px solid #ced5de;
    }
    .f-next{
        margin-left: 20px;
    }
    .freight-areaTag.el-tag{
        background-color: transparent;
        white-space: normal;
        color: #666;
        padding: 0;
    }
</style>
