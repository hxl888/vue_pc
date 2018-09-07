<template lang="html">
    <div class="m-router-con">
        <div class="for-itemlis">
            <div class="item-head">
                <div class="item-tit">
                    <span>状态：{{enabledStatus | enabledStatusfilter}}</span>
                </div>
            </div>
        </div>
      <div>
            <el-table ref="contentList" :data="contentList" border>
                <el-table-column label="常规" prop="">
                    <template scope="scope">
                        <div style="padding-top: 8px">
                            <img :src="picServer + scope.row.imgUrl" width="125" height="75">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="选中" prop="">
                    <template scope="scope">
                        <div style="padding-top: 8px">
                            <img :src="picServer + scope.row.focusImgUrl" width="125" height="75">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="70" fixed="right">
                    <template scope="scope">
                        <div>
                            <el-button type="text" class="zq-restore" @click="editorRow(scope.$index, scope.row)">编辑</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
      </div>
      <div style="padding-top: 20px">
          <el-button type="primary" :loading="loading" @click="saveAllForm">保存</el-button>
          <el-button @click="goBack">取消</el-button>
      </div>
        <!--新增修改弹框-->
        <div>
            <el-dialog class="reset-dialog reset-dialog05" title="编辑" :visible.sync="editordialog">
                <div class="editor_body">
                    <el-form :inline="true" :rules="rules" :model="editorForm" ref="editorForm" labelWidth="70px">
                        <el-form-item label="常规图片" prop="imgUrl">
                            <div class="item-uploadImg_box item-uploadImg_box_reset clearfix" v-loading='loadingUploadImg'>
                                <div class="uploadImg-btn h-uploadImgBox">
                                    <span>选择文件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="upload-des">建议上传图片尺寸为46 X46</i>
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
                        <el-form-item label="选中图片" prop="focusImgUrl">
                            <div class="item-uploadImg_box item-uploadImg_box_reset clearfix" v-loading='loadingUploadImg02'>
                                <div class="uploadImg-btn h-uploadImgBox">
                                    <span>选择文件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="upload-des">建议上传图片尺寸为46 X46</i>
                                    <form name='formFile02' id='formFile02'>
                                        <input type="hidden" name="fileType" v-model="fileType">
                                        <input type="file" name='imgFiles'  class='inputFile2' @change="inputFile2Fn('formFile02', 'sec')" accept="image/gif,image/jpeg,image/jpg,image/png">
                                    </form>
                                </div>
                                <p v-if="uploadImg02.length && uploadImg02[0].imgName" v-for='item in uploadImg02' class="h-brand-img" style="width: 62px">
                                    <img :src="picServer + item.imgName" alt="" style="width: 62px; height: 62px;">
                                    <span style="width: 62px;bottom: 10px" @click.prevent="removeImg('sec')">删除</span>
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
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {
        if (to.params.menuType) {
            next(vm => {
                vm.enabledStatus = to.params.enabledStatus;
                vm.getDetailByMenuType(to.params.menuType);
            });
        }
    },
    data() {
        return {
            contentList: [],
            editorForm: {
                imgUrl: '',
                focusImgUrl: ''
            },
            loadingUploadImg: false,
            loadingUploadImg02: false,
            fileType: '2',
            uploadImg: [],
            uploadImg02: [],
            picServer: '',
            cityId: '',
            enabledStatus: '',
            selecRowIndex: '', // 编辑点击获取对应下标
            editordialog: false, // 修改弹框开关
            loading: false, // 保存loading
            rules: {
                imgUrl: [
                    { required: true, message: '常规图片不能为空', trigger: 'change' }
                ],
                focusImgUrl: [
                    { required: true, message: '选中图片不能为空', trigger: 'change' }
                ]
            },
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    methods: {
        getDetailByMenuType(menuType) {
            let params = {};
            params.menuType = menuType;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/getDetailByMenuTypeAndCityId`,
                data: params
            }).then((res) => {
                let contentList = res.data.contentList;
                this.picServer = res.data.picServer;
                if (contentList.length) {
                    this.contentList = contentList;
                } else {
                    for (let i = 0; i < 4; i++) {
                        this.contentList.push({
                            imgUrl: '',
                            focusImgUrl: '',
                            contentType: ''
                        });
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        editorRow(index, row) {
            this.selecRowIndex = index;
            this.selecRowArray = row;
            this.editordialog = true;
            this.editorForm.imgUrl = row.imgUrl;
            this.editorForm.focusImgUrl = row.focusImgUrl;
            this.uploadImg = [{imgName: row.imgUrl}];
            this.uploadImg02 = [{imgName: row.focusImgUrl}];
        },
        preservation(formName) { // 修改保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('提交');
                    this.preservationSucess();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        preservationSucess() {
            this.editordialog = false;
            this.contentList[this.selecRowIndex].contentType = 6;
            this.contentList[this.selecRowIndex].imgUrl = this.editorForm.imgUrl;
            this.contentList[this.selecRowIndex].focusImgUrl = this.editorForm.focusImgUrl;
        },
        inputFile2Fn(id, sec) {
            if (sec) {
                this.loadingUploadImg02 = true;
            } else {
                this.loadingUploadImg = true;
            }
            var formData = new FormData(document.getElementById(id));
            this.$http({
                method: 'post',
                url: `/xe-zuul/${this.productUrl}/manager/uploadImg/manImgUpload`,
                data: formData
            }).then(res => {
                let imgInfoList = res.data.imgInfoList;
                this.picServer = res.data.picServer;
                if (!sec) {
                    // 常规图片路径
                    this.uploadImg = imgInfoList;
                    this.loadingUploadImg = false;
                    this.editorForm.imgUrl = imgInfoList[0].imgName;
                } else {
                    // 选中状态图片路径
                    this.uploadImg02 = imgInfoList;
                    this.loadingUploadImg02 = false;
                    this.editorForm.focusImgUrl = imgInfoList[0].imgName;
                }
            }).catch(error => {
                console.log(error);
            });
        },
        removeImg(sec) {
            if (sec) {
                this.uploadImg02 = '';
                this.editorForm.focusImgUrl = '';
            } else {
                this.uploadImg = '';
                this.editorForm.imgUrl = '';
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        adnewresetForm() {
            this.removeImg();
        },
        saveAllForm() { // 保存
            let flag = this.contentList.every(item => {
                return item.imgUrl !== '' && item.focusImgUrl !== '';
            });
            if (flag) {
                let params = {};
                this.loading = true;
                params.menuGroup = 4;
                params.menuType = 9;
                params.contentData = JSON.stringify(this.contentList);
                params.enabledStatus = this.enabledStatus;
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
                window.$wxeMessage.warning('请先添加图片');
            }
        }
    },
    watch: {
        editordialog(n) {
            let _this = this;
            if (n === false) {
                setTimeout(() => {
                    _this.$refs.editorForm.resetFields();
                }, 300);
            }
        }
    }
};
</script>
