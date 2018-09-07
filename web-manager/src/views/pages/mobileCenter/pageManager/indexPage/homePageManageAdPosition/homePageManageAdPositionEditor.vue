<template lang="html">
    <div class="m-router-con">
        <div class="for-itemlis">
            <div class="item-head">
                <div class="item-tit clearfix">
                    <p style="margin-right: 20px" class="fl">当前区域：{{areaName}}</p>
                    <!--<span>状态：{{enabledStatus_s | enabledStatusfilter}}</span>-->
                    <p class="fl">
                        状态：
                         <el-radio-group v-model="enabledStatus_s">
                             <el-radio v-for="(item, index) in enabledStatusList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                         </el-radio-group>
                    </p>
                </div>
            </div>
            <!--<div class="u-opera-btnBox" style="padding: 0">-->
                <!--<el-button class="xe-button-normal"  @click="addNewbanner">-->
                    <!--<span class="iconfont icon-xinzeng"></span> 新增-->
                <!--</el-button>-->
            <!--</div>-->
        </div>
      <div>
            <el-table ref="contentList" :data="contentList" border>
                <el-table-column label="图片" prop="" width="235">
                    <template scope="scope">
                        <div style="padding-top: 8px" v-if="scope.row.imgUrl">
                            <img :src="picServer + scope.row.imgUrl" width="200" height="100">
                        </div>
                        <div style="width: 200px;height: 100px" v-else></div>
                    </template>
                </el-table-column>
                <el-table-column label="建议尺寸" prop="" width="85">
                    <template scope="scope">
                        <div style="color: #f83030">
                            {{sizeBox[scope.$index]}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="contentType" label="类型">
                      <template scope="scope">
                          <div>
                              {{scope.row.contentType | contentTypefilter}}
                          </div>
                      </template>
                </el-table-column>
                <el-table-column label="详细信息" prop="" >
                      <template scope="scope">
                          <div v-if="scope.row.contentType">
                              {{contentTypeConten(scope.$index, scope.row.contentType)}}
                          </div>
                      </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="65" fixed="right">
                    <template scope="scope">
                        <div>
                            <el-button type="text" class="zq-restore" @click="editorRow(scope.$index, scope.row)">编辑</el-button>
                            <!--<el-button type="text" v-if="contentList.length !== 1" class="zq-restore" @click="removeRow(scope.$index)">删除图片</el-button>-->
                        </div>
                    </template>
                </el-table-column>
            </el-table>
      </div>
    <!--适用区域-->
    <div class="for-itemlis" style="margin-top: 35px">
        <div class="item-head clearfix">
            <div class="item-tit">适用区域</div>
        </div>
        <div class="areaBox-content">
            <div class="area-firt">
                <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全国</el-checkbox>
            </div>
            <el-checkbox-group v-model="areaValue" class="checkbox-group_other" @change="handleCheckedCitiesChange">
                <el-checkbox :label="item.areaId" :key="item.areaId"  v-for="(item, index) in areaList">{{item.areaName}}
                </el-checkbox>
            </el-checkbox-group>
        </div>
    </div>
      <div style="padding-top: 20px">
          <el-button type="primary" :loading="loading" @click="saveAllForm">保存</el-button>
          <el-button @click="goBack">取消</el-button>
      </div>
        <!--新增修改弹框-->
        <div>
            <el-dialog class="reset-dialog reset-dialog05" :title="editorTit" :visible.sync="editordialog">
                <div class="editor_body">
                    <el-form :inline="true" :rules="rules" :model="editorForm" ref="editorForm" labelWidth="70px">
                        <el-form-item prop="contentType" label="类型">
                            <el-radio-group v-model="editorForm.contentType" @change="radioChange">
                                <el-radio v-for="(item, index) in contentTypeList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div v-if="editorForm.contentType === 1" class="h-uploadImgBox">
                            <el-form-item prop="" label="商品名称" required>
                                <span @click="selectproNamedialog = true">选择商品</span>
                                <div class="el-form-item__error" style="width: 200px" v-if="error_proName">请先选择商品</div>
                            </el-form-item>
                            <el-form-item prop="proName" label="" class="errtishi_Left70">
                                <div style="padding-left: 70px">
                                    <el-input v-model="editorForm.proName" size="small" :maxlength="40" type="textarea" style="width: 290px;" placeholder="请输入商品名称"></el-input>
                                </div>
                            </el-form-item>
                        </div>
                        <div  v-if="editorForm.contentType === 3">
                            <el-form-item prop="" label="商户名称" required class="h-uploadImgBox">
                                <span @click="selectvenNamedialog = true">选择商户</span>
                                <div class="el-form-item__error"  style="width: 200px" v-if="error_venName">请先选择商户</div>
                            </el-form-item>
                            <el-form-item prop="venName" label="" class="errtishi_Left70">
                                <div style="padding-left: 70px">
                                    <el-input v-model="editorForm.venName" size="small" style="width: 290px;" placeholder="请输入商户名称"></el-input>
                                </div>
                            </el-form-item>
                        </div>
                        <el-form-item prop="contentUrl"  v-if="(editorForm.contentType === 4 || editorForm.contentType === 5) && editorForm.contentType === 4" label="链接">
                            <el-input placeholder="请输入链接" v-model="editorForm.contentUrl" style="width: 290px">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="" required  v-if="(editorForm.contentType === 4 || editorForm.contentType === 5) && editorForm.contentType === 5" label="链接">
                            <el-input placeholder="请输入链接" v-model="editorForm.contentUrl" style="width: 290px">
                            </el-input>
                            <div class="el-form-item__error"  style="width: 200px" v-if="content_error">频道页不能为空</div>
                        </el-form-item>
                        <el-form-item v-if="editorForm.contentType === 4" prop="pageTitle" label="页面标题">
                            <el-input v-model="editorForm.pageTitle" size="small" :maxlength="8" style="width: 290px" placeholder="请输入页面标题"></el-input>
                        </el-form-item>
                        <div  v-if="editorForm.contentType === 2">
                            <el-form-item prop="" required label="分类">
                                <categoryTag v-model='cateIdArray' :width='290' :changeOnSelect="true" :filterable="true"></categoryTag>
                                <div class="el-form-item__error"  style="width: 200px" v-if="error">{{cateIdArrayErrtishi}}</div>
                            </el-form-item>
                        </div>
                        <el-form-item label="图片" prop="imgUrl">
                            <div class="item-uploadImg_box item-uploadImg_box_reset clearfix" v-loading='loadingUploadImg'>
                                <div class="uploadImg-btn h-uploadImgBox">
                                    <span>选择文件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="upload-des">建议上传图片尺寸为750 X254</i>
                                    <form name='form' id='formFile'>
                                        <input type="hidden" name="fileType" v-model="fileType">
                                        <input type="file" name='imgFiles'  class='inputFile2' @change="inputFile2Fn('formFile')" accept="image/gif,image/jpeg,image/jpg,image/png">
                                    </form>
                                </div>
                                <p v-if="uploadImg.length && uploadImg[0].imgName" v-for='item in uploadImg' class="h-brand-img" style="width: 62px">
                                    <img :src="picServer + item.imgName" alt="" style="width: 62px; height: 62px;">
                                    <span style="width: 62px;bottom: 10px" @click.prevent='removeImg()'>删除</span>
                                </p>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog-footer-bor">
                    <el-button type="primary" @click="preservation('editorForm')">确定</el-button>
                    <el-button @click="editordialog = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
        <!--选择商品弹框-->
        <div>
            <el-dialog class="reset-dialog reset-dialog01"  title="选择商品" :visible.sync="selectproNamedialog">
                <div style="padding-top: 5px">
                    <proname-alert :cityId="cityId" :saveproNamebut="saveproNamebut" @saveproNamemErr="saveproNamemErr" @saveproNamemSuc="saveproNamemSuc"></proname-alert>
                </div>
                <div class="dialog-footer-bor">
                    <el-button type="primary" @click="saveproNameForm">确定</el-button>
                    <el-button @click="selectproNamedialog = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
        <!--选择户弹框-->
        <div>
            <el-dialog class="reset-dialog reset-dialog01" title="选择商户" :visible.sync="selectvenNamedialog">
                <div style="padding-top: 5px">
                    <venname-alert :cityId="cityId" :savevenNamebut="savevenNamebut" @savevenNamemErr="savevenNamemErr" @savevenNamemSuc="savevenNamemSuc"></venname-alert>
                </div>
                <div class="dialog-footer-bor">
                    <el-button type="primary" @click="savevenNameForm">确定</el-button>
                    <el-button @click="selectvenNamedialog = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { contentType, enabledStatus } from '@/dataControl';
import categoryTag from '@/components/category/category';
import pronameAlert from './pronameAlert';
import vennameAlert from './vennameAlert';
export default {
    beforeRouteEnter(to, from, next) {
        if (to.params.cityId && to.params.menuType) {
            next(vm => {
                vm.areaName = to.params.areaName;
                vm.cityId = parseInt(to.params.cityId);
                vm.enabledStatus_s = parseInt(to.params.enabledStatus);
                vm.getDetailByMenuType(to.params.cityId, to.params.menuType);
            });
        }
    },
    data() {
        var contentUrlvolid = (rule, value, callback) => {
            if (value) {
                let reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error('链接格式不正确'));
                }
            } else {
                callback(new Error('链接不能为空'));
            }
        };
        return {
            contentList: [],
            editorForm: {
                contentType: 1,
                proName: '',
                venName: '',
                imgUrl: '',
                contentUrl: '',
                pageTitle: ''
            },
            placeholders: '请输入商品名称',
            cateIdArray: [],
            editorTit: '编辑',
            error: false, // 分类错误提示开关
            cateIdArrayErrtishi: '分类不能为空',
            error_proName: false, // 商品提交检验开关
            hasProName: false, // 选择商品提交开关
            proNameDatas: [], // 已选择的商品信息储存
            error_venName: false, // 商户提交检验开关
            hasVenName: false, // 选择商户提交开关
            venNameDatas: [], // 已选择的商户信息储存
            loadingUploadImg: false,
            content_error: false,
            fileType: '2',
            uploadImg: [],
            picServer: '',
            areaName: '',
            cityId: '',
            enabledStatus_s: '',
            selecRowIndex: '', // 编辑点击获取对应下标
            editordialog: false, // 修改弹框开关
            selectproNamedialog: false, // 选择商品弹框开关
            selectvenNamedialog: false, // 选择商户弹框开关
            loading: false, // 保存loading
            selecRowArray: '', // 编辑点击获取对应行数据
            saveproNamebut: false, // 点击新增商品弹框确定（按钮已点击确认）
            savevenNamebut: false, // 点击新增商户弹框确定（按钮已点击确认）
            areaList: [], // 适用区域
            areaValue: [],
            areaAllNum: '',
            checkAll: false,
            citieOption: [],
            checkedCity: false,
            sizeBox: ['288X326', ' 210X160', '210X160', ' 430X156'],
            rules: {
                proName: [
                    { required: true, message: '商品名称不能为空', trigger: 'blur' }
                ],
                venName: [
                    { required: true, message: '商户名称不能为空', trigger: 'blur' }
                ],
                imgUrl: [
                    { required: true, message: '图片不能为空', trigger: 'change' }
                ],
                contentUrl: [
                    { required: true, validator: contentUrlvolid, trigger: 'blur' }
                ],
                pageTitle: [
                    { required: true, message: '页面标题不能为空', trigger: 'blur' }
                ]
            },
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.getAreaList(); // 适用区域
    },
    methods: {
        getAreaList() {
            let params = {};
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/getAllAreaList`,
                data: params
            }).then(res => {
                let areaList = res.data.areaList;
                areaList.forEach(item => {
                    if (item.areaId !== this.cityId) {
                        this.areaList.push(item);
                        this.citieOption.push(item.areaId);
                    }
                });
                this.areaAllNum = this.areaList.length;
            }).catch(error => {
                console.log(error);
            });
        },
        radioChange() {
            this.resetForm(this.editorForm.contentType);
            if (this.editorForm.contentType === this.selecRowArray.contentType) {
                this.echoagin();
            }
        },
        echoagin() { // 二次回显
            this.editorForm.imgUrl = this.selecRowArray.imgUrl;
            this.uploadImg = [{imgName: this.selecRowArray.imgUrl}];
            if (this.editorForm.contentType === 1) {
                this.editorForm.proName = this.selecRowArray.proName;
            }
            if (this.editorForm.contentType === 2) {
                let array = [];
                let orgCodeList = this.selecRowArray.orgCode.split('_');
                for (let i = 0, len = orgCodeList.length; i < len; i++) {
                    if (orgCodeList[i] !== '') {
                        array.push(parseInt(orgCodeList[i]));
                    }
                }
                this.cateIdArray = array;
            }
            if (this.editorForm.contentType === 3) {
                this.editorForm.venName = this.selecRowArray.venName;
            }
            if (this.editorForm.contentType === 4) {
                this.editorForm.contentUrl = this.selecRowArray.contentUrl;
                this.editorForm.pageTitle = this.selecRowArray.pageTitle;
            }
            if (this.editorForm.contentType === 5) {
                this.editorForm.contentUrl = this.selecRowArray.contentUrl;
            }
            console.log('this.editorForm', this.editorForm);
        },
        getDetailByMenuType(cityId, menuType) {
            let params = {};
            params.cityId = cityId;
            params.menuType = menuType;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/getDetailByMenuTypeAndCityId`,
                data: params
            }).then((res) => {
                if (res.data.contentList.length) {
                    this.contentList = res.data.contentList;
                } else {
                    for (let i = 0; i < 4; i++) {
                        this.contentList.push({
                            contentType: 1,
                            proName: '',
                            venName: '',
                            imgUrl: '',
                            contentUrl: '',
                            pageTitle: ''
                        });
                    }
                }
                this.picServer = res.data.picServer;
            }).catch((error) => {
                console.log(error);
            });
        },
//        removeRow(index) { // 删除
//            this.$confirm(`确定要删除该图片么吗？`, '确认删除', {
//                confirmButtonText: '确定',
//                cancelButtonText: '取消',
//                type: 'warning'
//            }).then(() => {
//                this.contentList[index].imgUrl = '';
//            }).catch(() => {
//            });
//        },
//        addNewbanner() { // 新增
//            if (this.contentList.length < 6) {
//                this.adnewresetForm();
//                this.selecRowIndex = '';
//                this.selecRowArray = '';
//                this.editordialog = true;
//                this.editorTit = '新增';
//            } else {
//                this.$alert('此处焦点图最多可添加六张，已达到数量上线', '数量上限', {
//                    confirmButtonText: '确定',
//                    type: 'info'
//                });
//            }
//        },
        editorRow(index, row) {
            this.selecRowIndex = index;
            this.selecRowArray = row;
            this.editorTit = '编辑';
            this.editordialog = true;
            this.editorForm.imgUrl = row.imgUrl;
            this.uploadImg = [{imgName: row.imgUrl}];
            this.editorForm.contentType = row.contentType;
            if (row.contentType === 1) {
                this.editorForm.proName = this.selecRowArray.proName;
            }
            if (row.contentType === 2) {
                let array = [];
                let orgCodeList = this.selecRowArray.orgCode.split('_');
                for (let i = 0, len = orgCodeList.length; i < len; i++) {
                    if (orgCodeList[i] !== '') {
                        array.push(parseInt(orgCodeList[i]));
                    }
                }
                this.cateIdArray = array;
            }
            if (row.contentType === 3) {
                this.editorForm.venName = this.selecRowArray.venName;
            }
            if (row.contentType === 4) {
                this.editorForm.contentUrl = this.selecRowArray.contentUrl;
                this.editorForm.pageTitle = this.selecRowArray.pageTitle;
            }
            if (row.contentType === 5) {
                this.editorForm.contentUrl = this.selecRowArray.contentUrl;
            }
            console.log('this.editorForm', this.editorForm);
        },
        preservation(formName) { // 修改保存
            if (this.editorForm.contentType === 1) { // 选择商品校验
                if (!this.hasProName) {
                    this.error_proName = true;
                } else {
                    this.error_proName = false;
                }
            }
            if (this.editorForm.contentType === 2) { // 分类校验
                if (!this.cateIdArray.length) {
                    this.error = true;
                    this.cateIdArrayErrtishi = '分类不能为空';
                } else {
                    if (this.cateIdArray.length !== 1) {
                        this.error = false;
                    } else {
                        this.error = true;
                        this.cateIdArrayErrtishi = '分类必须选择到二级或三级';
                    }
                }
            }
            if (this.editorForm.contentType === 3) { // 选择商品校验
                if (!this.hasVenName) {
                    this.error_venName = true;
                } else {
                    this.error_venName = false;
                }
            }
            this.$refs[formName].validate((valid) => {
                if (this.selecRowArray.contentType === 1) {
                    this.hasProName = true;
                    this.saveproNamebut = false;
                    this.error_proName = false;
                }
                if (this.selecRowArray.contentType === 3) {
                    this.hasVenName = true;
                    this.savevenNamebut = false;
                    this.error_venName = false;
                }
                if (this.editorForm.contentType === 5) {
                    if (this.editorForm.contentUrl) {
                        this.content_error = false;
                    } else {
                        this.content_error = true;
                    }
                }
                if (valid && !this.error && !this.error_proName && !this.error_venName && !this.content_error) {
                    console.log('提交');
                    this.preservationSucess();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        preservationSucess() {
//            let _this = this;
            if (this.editorTit === '编辑') {
                this.contentList[this.selecRowIndex].imgUrl = this.editorForm.imgUrl;
                this.contentList[this.selecRowIndex].contentType = this.editorForm.contentType;
                if (this.editorForm.contentType === 1) {
                    this.contentList[this.selecRowIndex].proName = this.editorForm.proName;
                    if (this.proNameDatas[0]) {
                        this.contentList[this.selecRowIndex].cateId = this.proNameDatas[0].cateId;
                        this.contentList[this.selecRowIndex].venName = this.proNameDatas[0].venName;
                        this.contentList[this.selecRowIndex].proSku = this.proNameDatas[0].proSku;
                        this.contentList[this.selecRowIndex].proSpu = this.proNameDatas[0].proSpu;
                    } else {
                        this.contentList[this.selecRowIndex].cateId = this.selecRowArray.cateId;
                        this.contentList[this.selecRowIndex].venName = this.selecRowArray.venName;
                        this.contentList[this.selecRowIndex].proSku = this.selecRowArray.proSku;
                        this.contentList[this.selecRowIndex].proSpu = this.selecRowArray.proSpu;
                    }
                } else if (this.editorForm.contentType === 2) {
                    if (this.cateIdArray.length) {
                        let cateId = this.cateIdArray;
                        this.contentList[this.selecRowIndex].cateId = cateId.slice(cateId.length - 1, cateId.length).join(',');
                        this.contentList[this.selecRowIndex].orgCode = this.cateIdArray.join('_');
                    }
                } else if (this.editorForm.contentType === 3) {
                    this.contentList[this.selecRowIndex].venName = this.editorForm.venName;
                    if (this.venNameDatas[0]) {
                        this.contentList[this.selecRowIndex].venUserCode = this.venNameDatas[0].userCode;
                    } else {
                        this.contentList[this.selecRowIndex].venUserCode = this.selecRowArray.venUserCode;
                    }
                } else if (this.editorForm.contentType === 4) {
                    this.contentList[this.selecRowIndex].contentUrl = this.editorForm.contentUrl;
                    this.contentList[this.selecRowIndex].pageTitle = this.editorForm.pageTitle;
                } else if (this.editorForm.contentType === 5) {
                    this.contentList[this.selecRowIndex].contentUrl = this.editorForm.contentUrl;
                }
                console.log('this.contentList[this.selecRowIndex]', this.contentList[this.selecRowIndex]);
            } else if (this.editorTit === '新增') {
                let addNewList = {};
                addNewList.contentType = this.editorForm.contentType;
                if (this.cateIdArray.length) {
                    let cateId = this.cateIdArray;
                    addNewList.cateId = cateId.slice(cateId.length - 1, cateId.length).join(',');
                }
                addNewList.proName = this.editorForm.proName;
                addNewList.venName = this.editorForm.venName;
                addNewList.imgUrl = this.editorForm.imgUrl;
                addNewList.contentUrl = this.editorForm.contentUrl;
                addNewList.pageTitle = this.editorForm.pageTitle;
                if (this.proNameDatas.length) {
                    addNewList.cateId = this.proNameDatas[0].cateId;
                    addNewList.venName = this.proNameDatas[0].venName;
                    addNewList.proSku = this.proNameDatas[0].proSku;
                    addNewList.proSpu = this.proNameDatas[0].proSpu;
                }
                if (this.venNameDatas.length) {
                    addNewList.venUserCode = this.venNameDatas[0].userCode;
                }
                this.contentList.push(addNewList);
            }
            console.log('contentList-->', this.contentList);
            this.editordialog = false;
//            setTimeout(() => {
//                _this.adnewresetForm();
//            }, 30);
        },
        inputFile2Fn(id) {
            this.loadingUploadImg = true;
            var formData = new FormData(document.getElementById(id));
            this.$http({
                method: 'post',
                url: `/xe-zuul/${this.productUrl}/manager/uploadImg/manImgUpload`,
                data: formData
            }).then(res => {
                let imgInfoList = res.data.imgInfoList;
                this.picServer = res.data.picServer;
                this.uploadImg = imgInfoList;
                this.loadingUploadImg = false;
                this.editorForm.imgUrl = imgInfoList[0].imgName;
            }).catch(error => {
                console.log(error);
            });
        },
        removeImg() {
            this.uploadImg = '';
            this.editorForm.imgUrl = '';
        },
        goBack() {
            this.$router.go(-1);
        },
        resetForm(contentType) {
            if (contentType === 1) {
                this.cateIdArray = [];
                this.editorForm.venName = '';
                this.editorForm.contentUrl = '';
                this.editorForm.pageTitle = '';
            } else if (contentType === 2) {
                this.editorForm.proName = '';
                this.editorForm.venName = '';
                this.editorForm.contentUrl = '';
                this.editorForm.pageTitle = '';
            } else if (contentType === 3) {
                this.cateIdArray = [];
                this.editorForm.proName = '';
                this.editorForm.contentUrl = '';
                this.editorForm.pageTitle = '';
            } else if (contentType === 4) {
                this.cateIdArray = [];
                this.editorForm.proName = '';
                this.editorForm.venName = '';
            } else if (contentType === 5) {
                this.cateIdArray = [];
                this.editorForm.proName = '';
                this.editorForm.venName = '';
                this.editorForm.pageTitle = '';
            }
            this.error = false;
            this.error_proName = false;
            this.error_venName = false;
            this.hasProName = false;
            this.hasVenName = false;
            this.proNameDatas = [];
            this.venNameDatas = [];
//            this.removeImg();
        },
        adnewresetForm() {
            this.cateIdArray = [];
            this.editorForm.contentType = 1;
            this.editorForm.proName = '';
            this.editorForm.venName = '';
            this.editorForm.contentUrl = '';
            this.editorForm.pageTitle = '';
            this.error = false;
            this.error_proName = false;
            this.error_venName = false;
            this.hasProName = false;
            this.hasVenName = false;
            this.proNameDatas = [];
            this.venNameDatas = [];
            this.removeImg();
        },
        saveproNameForm() { // 选择商品弹框确定按钮
            this.saveproNamebut = true;
        },
        saveproNamemErr() {
            this.hasProName = false;
            this.saveproNamebut = false;
        },
        saveproNamemSuc(val) {
            console.log('val-商品====>', val);
            this.proNameDatas = val;
            this.hasProName = true;
            this.saveproNamebut = false;
            this.selectproNamedialog = false;
            this.editorForm.proName = this.proNameDatas[0].proName;
        },
        savevenNameForm() { // 选择商户弹框确定按钮
            this.savevenNamebut = true;
        },
        savevenNamemErr() {
            this.hasVenName = false;
            this.savevenNamebut = false;
        },
        savevenNamemSuc(val) {
            console.log('val-==商户==>', val);
            this.venNameDatas = val;
            this.hasVenName = true;
            this.savevenNamebut = false;
            this.selectvenNamedialog = false;
            this.editorForm.venName = this.venNameDatas[0].venName;
        },
        handleCheckAllChange() {
            if (this.checkAll) {
                this.areaValue = this.citieOption;
                this.checkedCity = true;
            } else {
                this.areaValue = [];
                this.checkedCity = false;
            }
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            if (checkedCount === this.areaAllNum) {
                this.checkAll = true;
            } else {
                this.checkAll = false;
            }
            if (checkedCount > 0) {
                this.checkedCity = true;
            } else {
                this.checkedCity = false;
            }
        },
        saveAllForm() { // 保存
            let flag = this.contentList.every(item => {
                return item.imgUrl !== '';
            });
            if (flag) {
                let params = {};
                this.loading = true;
                params.cityId = this.cityId;
                params.menuGroup = 1;
                params.menuType = 3;
                params.cityIds = this.areaValue;
                params.contentData = JSON.stringify(this.contentList);
                params.enabledStatus = this.enabledStatus_s;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/cms/insertContent`,
                    data: params
                }).then(res => {
                    if (res.data.remote.status !== '0000') {
                        this.loading = false;
                        window.$wxeMessage.error(res.data.remote.msg);
                    } else {
                        this.loading = false;
                        this.goBack();
                        window.$wxeMessage.success(res.msg);
                    }
                }).catch(error => {
                    this.loading = false;
                    console.log(error);
                });
            } else {
                window.$wxeMessage.warning('此处只支持上传四张图片，请修改后再次提交');
            }
//            if (this.checkedCity) {
//            } else {
//                window.$wxeMessage.warning('请先勾选适用区域');
//            }
        },
        contentTypeConten(index, val) {
            let contentType = '';
            if (val === 1) {
                contentType = this.contentList[index].proName;
            }
            if (val === 2) {
                contentType = this.contentList[index].cateName;
            }
            if (val === 3) {
                contentType = this.contentList[index].venName;
            }
            if (val === 4) {
                contentType = this.contentList[index].pageTitle;
            }
            if (val === 5) {
                contentType = this.contentList[index].contentUrl;
            }
            return contentType;
        }
    },
    watch: {
        editordialog(n) {
            let _this = this;
            if (n === false) {
                setTimeout(() => {
                    _this.error = false;
                    _this.error_venName = false;
                    _this.error_proName = false;
                    _this.content_error = false;
                    _this.$refs.editorForm.resetFields();
                    _this.editorForm.cateIdArray = [];
                }, 300);
            }
        }
    },
    computed: {
        contentTypeList() {
            return contentType;
        },
        enabledStatusList() {
            return enabledStatus;
        }
    },
    components: {
        categoryTag,
        pronameAlert,
        vennameAlert
    }
};
</script>
<style lang="scss">
    .errtishi_Left70 {
        .el-form-item__error {
            left: 70px;
        }
    }
</style>
