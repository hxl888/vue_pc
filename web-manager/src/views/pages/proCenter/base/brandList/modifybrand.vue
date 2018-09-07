<template lang="html">
    <div class="m-router-con">
        <div class="addNew-box reset-dialog reset-dialog02">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" id="brandRuleForm">
                <el-form-item label="品牌名称" prop='brandName'>
                  <el-input name='brandName' v-model="ruleForm.brandName" class="xe-input-col3" auto-complete="off"></el-input>
                  <span>&nbsp;&nbsp;&nbsp;数字／英文／汉字，限制1-20个字</span>
                </el-form-item>
                <el-form-item label="品牌logo" prop="brandLogo">
                    <div class="item-uploadImg_box item-uploadImg_box_reset clearfix" v-loading='loadingUploadImg'>
                            <div class="uploadImg-btn h-uploadImgBox">
                                <span>选择文件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="upload-des">Logo图片建议尺寸:200*100</i>
                                <form name='form2' id='formFile2'>
                                    <input type="hidden" name="fileType" v-model="fileType">
                                    <input type="file" name='imgFiles'  class='inputFile2' @change='inputFile2Fn' accept="image/gif,image/jpeg,image/jpg,image/png">
                                </form>
                            </div>
                            <p v-if="uploadImg.length" v-for='item in uploadImg' class="h-brand-img">
                                <img :src="picServer + item.imgName" alt="" style="width: 120px; height: 120px;">
                                <span @click.prevent='removeImg'>删除</span>
                            </p>
                    </div>
                </el-form-item>
                <el-form-item label="品牌描述" prop="brandDesc" class="text_area">
                    <el-input
                        name='brandDesc'
                        class="xe-input-col3"
                        type="textarea"
                        autosize
                        placeholder="请输入内容"
                        v-model="ruleForm.brandDesc">
                    </el-input>
                    <span class="last-num" :class="{'error': isError}">{{descTextLength}}/500</span>
                </el-form-item>
                <el-form-item label="" class="text_area">
                    <div class="dialog-footer">
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                        <el-button @click.preven='cancel'>取 消</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {getTextLength} from 'utils';
    export default {
        data() {
            var validateName = (rule, value, callback) => {
                if (value) {
                    this.validateNameCk(() => {
                        callback();
                    }, (err) => {
                        callback(new Error(err.msg));
                    });
                } else {
                    callback(new Error('品牌名称不能为空'));
                }
            };
            let validateBrandDesc = (rule, value, callback) => {
                if (value) {
                    if (this.descTextLength > 500) {
                        callback(new Error('输入长度超出500限制'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    brandId: '',
                    brandName: '',
                    brandLogo: '',
                    brandDesc: ''
                },
                loadingUploadImg: false,
                picServer: '',
                uploadImg: [],
                fileType: 1,
                rules: {
                    brandName: [
                        { required: true, validator: validateName, trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在1-20个字', trigger: 'blur' }
                    ],
                    brandLogo: [
                        { message: '请上传Logo', trigger: 'change' }
                    ],
                    brandDesc: [
                        {
                            validator: validateBrandDesc, trigger: 'blur'
                        }
                    ]
                },
                isError: false,
                productUrl: '/xe-route/xe-mis'
//                productUrl: ''
            };
        },
        created() {
            this.echoDatalist();
        },
        methods: {
            echoDatalist() {
                let brandId = this.$route.query.brandId;
                if (brandId) {
                    let params = {};
                    params.brandId = brandId;
                    this.$http({
                        method: 'post',
                        url: `${this.productUrl}/manager/brand/listProBrand`,
                        data: params
                    }).then((res) => {
                        console.log('----!!>', res);
                        if (res.data.list.length > 0) {
                            let oldData = res.data.list[0];
                            this.picServer = res.data.picServer;
                            if (oldData.brandName) {
                                this.ruleForm.brandName = oldData.brandName;
                            }
                            if (oldData.brandLogo) {
                                this.uploadImg = [{imgName: oldData.brandLogo}];
                                this.ruleForm.brandLogo = oldData.brandLogo;
                                console.log('oldData.brandLogo', oldData.brandLogo);
                            }
                            if (oldData.brandDesc) {
                                this.ruleForm.brandDesc = oldData.brandDesc;
                            }
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    this.goBack();
                }
            },
            validateNameCk(suc, err) { // 校验品牌名称是否重复
                let params = {};
                params.brandName = this.ruleForm.brandName;
                params.brandId = this.$route.query.brandId;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/brand/validateName`,
//                    url: '/manager/brand/validateName',
                    data: params
                }).then((res) => {
                    if (res.data.remote && res.data.remote.status !== '0000') {
                        err && err(res.data.remote);
                    } else {
                        suc && suc();
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {};
                        params = this.ruleForm;
                        params.brandId = this.$route.query.brandId;
                        this.$http({
                            method: 'post',
                            url: `${this.productUrl}/manager/brand/updateProBrand`,
                            data: params
                        }).then((res) => {
                            console.log('----!!>', res);
                            window.$wxeMessage({
                                type: 'success',
                                message: `修改品牌成功`
                            });
                            this.cancel();
                        }).catch((error) => {
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancel() {
                this.$router.go(-1);
            },
            inputFile2Fn() {
                this.loadingUploadImg = true;
                var formData = new FormData(document.getElementById('formFile2'));
                this.$http({
                    method: 'post',
                    url: '/xe-zuul/xe-route/xe-mis/manager/uploadImg/manImgUpload',
                    data: formData
                }).then(res => {
                    console.log(res);
                    let imgInfoList = res.data.imgInfoList;
                    this.loadingUploadImg = false;
                    this.picServers = res.data.picServer;
                    this.uploadImg = imgInfoList;
                    this.ruleForm.brandLogo = imgInfoList[0].imgName;
                }).catch(error => {
                    this.loadingUploadImg = false;
                    console.log(error);
                });
            },
            removeImg() {
                this.uploadImg = '';
                this.ruleForm.brandLogo = '';
            }
        },
        computed: {
            descTextLength() {
                return getTextLength(this.ruleForm.brandDesc);
            }
        },
        watch: {
            'ruleForm.brandDesc'() {
                if (this.descTextLength > 500) {
                    this.isError = true;
                } else {
                    this.isError = false;
                }
            }
        }
    };
</script>
