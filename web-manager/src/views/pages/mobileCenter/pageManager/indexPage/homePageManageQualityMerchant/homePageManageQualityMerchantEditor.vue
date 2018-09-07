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
            <div class="u-opera-btnBox" style="padding: 0">
                <el-button class="xe-button-normal"  @click="addNewbanner">
                    <span class="iconfont icon-xinzeng"></span> 新增
                </el-button>
            </div>
        </div>
      <div>
            <el-table ref="contentList" :data="contentList" border v-loading="contentListloading">
                <el-table-column label="图片" prop="" width="165">
                    <template scope="scope">
                        <div style="padding-top: 8px" v-if="scope.row.imgUrl">
                            <img :src="picServer + scope.row.imgUrl" width="130" height="130">
                        </div>
                        <div style="width: 200px;height: 100px" v-else></div>
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
                <el-table-column prop="" label="操作" width="215" fixed="right">
                    <template scope="scope">
                        <div>
                            <el-button type="text" class="zq-restore" @click="editorRow(scope.$index, scope.row)">编辑</el-button>
                            <el-button type="text" class="zq-restore" @click="removeRow(scope.$index)">删除</el-button>
                            <el-button type="text" v-if="contentList.length > 1 && scope.$index !== 0" class="zq-restore" @click="moveUp(scope.$index, scope.row)">上移</el-button>
                            <el-button type="text" v-if="contentList.length > 1 && scope.$index !== (contentList.length - 1)" class="zq-restore" @click="moveDown(scope.$index, scope.row)">下移</el-button>
                            <el-button type="text" v-if="contentList.length > 1 && scope.$index !== 0" class="zq-restore" @click="topHei(scope.$index, scope.row)">置顶</el-button>
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
                    <el-form :inline="true" :rules="rules" :model="editorForm" ref="editorForm" labelWidth="75px">
                        <el-form-item prop="contentType" label="类型">
                            <div>商户</div>
                        </el-form-item>
                        <div>
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
                        <el-form-item label="图片" prop="imgUrl">
                            <div class="item-uploadImg_box item-uploadImg_box_reset clearfix" v-loading='loadingUploadImg'>
                                <div class="uploadImg-btn h-uploadImgBox">
                                    <span>选择文件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="upload-des">建议上传图片尺寸为130X130</i>
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
        <!--选择户弹框-->
        <div>
            <el-dialog class="reset-dialog reset-dialog01"  title="选择商户" :visible.sync="selectvenNamedialog">
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
import { enabledStatus } from '@/dataControl';
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
            contentListloading: false,
            placeholders: '请输入商品名称',
            cateIdArray: [],
            editorTit: '编辑',
            error: false, // 分类错误提示开关
            hasProName: false, // 选择商品提交开关
            proNameDatas: [], // 已选择的商品信息储存
            error_venName: false, // 商户提交检验开关
            hasVenName: false, // 选择商户提交开关
            venNameDatas: [], // 已选择的商户信息储存
            loadingUploadImg: false,
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
            savevenNamebut: false, // 点击新增商户弹框确定（按钮已点击确认）
            areaList: [], // 适用区域
            areaValue: [],
            areaAllNum: '',
            checkAll: false,
            citieOption: [],
            checkedCity: false,
            rules: {
                venName: [
                    { required: true, message: '商户名称不能为空', trigger: 'blur' }
                ]
//                imgUrl: [
//                    { required: true, message: '图片不能为空', trigger: 'change' }
//                ]
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
        },
        getDetailByMenuType(cityId, menuType) {
            let params = {};
            this.contentListloading = true;
            params.cityId = cityId;
            params.menuType = menuType;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/getDetailByMenuTypeAndCityId`,
                data: params
            }).then((res) => {
                this.contentListloading = false;
                this.picServer = res.data.picServer;
                this.contentList = res.data.contentList;
            }).catch((error) => {
                console.log(error);
            });
        },
        removeRow(index) { // 删除
            this.$confirm(`确定要删除该商户吗？`, '确认删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.contentList.splice(index, 1);
            }).catch(() => {
            });
        },
        moveUp(index, row) { // 上移
            this.contentList.splice(index, 1);
            this.contentList.splice(index - 1, 0, row);
        },
        moveDown(index, row) { // 下移
            this.contentList.splice(index, 1);
            this.contentList.splice(index + 1, 0, row);
        },
        topHei(index, row) { // 置顶
            this.contentList.splice(index, 1);
            this.contentList.splice(0, 0, row);
        },
        addNewbanner() { // 新增
            if (this.contentList.length < 3) {
                this.adnewresetForm();
                this.selecRowIndex = '';
                this.selecRowArray = '';
                this.editordialog = true;
                this.editorTit = '新增';
            } else {
                this.$alert('此处通栏最多可添加三张，已达到数量上限，不能再进行新增', '数量上限', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
            }
        },
        editorRow(index, row) {
            this.selecRowIndex = index;
            this.selecRowArray = row;
            this.editorTit = '编辑';
            this.editordialog = true;
            this.editorForm.imgUrl = row.imgUrl;
            this.uploadImg = [{imgName: row.imgUrl}];
            this.editorForm.contentType = 3;
            this.editorForm.venName = this.selecRowArray.venName;
        },
        preservation(formName) { // 修改保存
            if (!this.hasVenName) {
                this.error_venName = true;
            } else {
                this.error_venName = false;
            }
            this.$refs[formName].validate((valid) => {
                if (this.selecRowArray.contentType === 3) {
                    this.hasVenName = true;
                    this.savevenNamebut = false;
                    this.error_venName = false;
                }
                if (valid && !this.error && !this.error_venName) {
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
                this.contentList[this.selecRowIndex].contentType = 3;
                this.contentList[this.selecRowIndex].imgUrl = this.editorForm.imgUrl;
                this.contentList[this.selecRowIndex].venName = this.editorForm.venName;
                if (this.venNameDatas[0]) {
                    this.contentList[this.selecRowIndex].venUserCode = this.venNameDatas[0].userCode;
                } else {
                    this.contentList[this.selecRowIndex].venUserCode = this.selecRowArray.venUserCode;
                }
            } else if (this.editorTit === '新增') {
                let addNewList = {};
                addNewList.contentType = 3;
                addNewList.venName = this.editorForm.venName;
                addNewList.imgUrl = this.editorForm.imgUrl;
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
        resetForm() {
            this.error_venName = false;
            this.hasVenName = false;
            this.proNameDatas = [];
            this.venNameDatas = [];
//            this.removeImg();
        },
        adnewresetForm() {
            this.editorForm.contentType = 1;
            this.editorForm.venName = '';
            this.error_venName = false;
            this.hasVenName = false;
            this.proNameDatas = [];
            this.venNameDatas = [];
            this.removeImg();
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
            let params = {};
            this.loading = true;
            params.cityId = this.cityId;
            params.menuGroup = 1;
            params.menuType = 5;
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
                    _this.error_venName = false;
                    _this.$refs.editorForm.resetFields();
                }, 300);
            }
        }
    },
    computed: {
        enabledStatusList() {
            return enabledStatus;
        }
    },
    components: {
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
