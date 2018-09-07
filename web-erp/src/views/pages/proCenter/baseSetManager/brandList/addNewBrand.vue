<template lang="html">
    <div class="m-router-con">
        <div class="addNew-box reset-dialog reset-dialog02">
            <!-- {{ruleForm}} -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" id="brandRuleForm">
                <el-form-item label="品牌名称" prop='brandName'>
                  <el-input name='brandName' v-model="ruleForm.brandName" :maxlength="20" class="xe-input-col3 xe-input-col3p" auto-complete="off"></el-input>
                  <span>&nbsp;&nbsp;&nbsp;数字／英文／汉字，限制1-20个字</span>
                </el-form-item>
                <el-form-item label="品牌logo" prop="brandLogo" class="for-itemlis for-itemlis02">
                    <div class="xeUpload">
                        <div class="upload-btn">
                            <span>选择文件</span>
                            <form name='form1' id='formFile1'>
                                <input type="file" title="点击添加或修改图片" name='imgFiles' class='inputFile2' @change='inputFile2Fn("formFile1")' accept="image/gif,image/jpeg,image/jpg,image/png">
                            </form>
                            <!-- <input type="file" title="点击添加或修改图片" name="brandLogo" accept="image/gif,image/jpeg,image/jpg,image/png"> -->
                        </div>
                        <div class="upload-des">Logo图片建议尺寸: 200*100</div>
                    </div>
                    <div v-if="uploadBtnFlag1" class="item-uploadImg_box2 clearfix" v-loading='loadingUploadImg'>
                        <ol class="fl up-active">
                            <li class="up-imgLI">
                                <img :src="picServer + ruleForm.brandLogo" alt="品牌logo">
                                <span @click.prevent='removeImg'>删除</span>
                            </li>
                        </ol>
                    </div>
                </el-form-item>
                <el-form-item label="品牌描述" prop="brandDesc" class="text_area">
                    <el-input
                        name='brandDesc'
                        class="xe-input-col3"
                        type="textarea"
                        autosize
                        :maxlength="500"
                        placeholder="请输入内容"
                        v-model="ruleForm.brandDesc">
                    </el-input>
                    <span class="last-num" :class="{'error': isError}">{{descTextLength}}/500</span>
                </el-form-item>
                <el-form-item label="" class="text_area">
                    <div class="dialog-footer">
                        <el-button type="primary" @click="submitForm()"  :disabled="submitFlag">保存</el-button>
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
                    brandName: '',
                    brandLogo: '',
                    brandDesc: ''
                },
                rules: {
                    brandName: [
                        { required: true, validator: validateName, trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
//                    brandLogo: [
//                        { required: true, message: '请上传Logo', trigger: 'change' }
//                    ],
                    brandDesc: [
                        {
                            validator: validateBrandDesc, trigger: 'blur'
                        }
                    ]
                },
                isError: false,
                productUrl: '/xe-route/xe-pro',
                submitFlag: false,
                loadingUploadImg: false,
                picServer: ''
            };
        },
        watch: {
            'ruleForm.brandDesc'() {
                if (this.descTextLength > 500) {
                    this.isError = true;
                } else {
                    this.isError = false;
                }
            }
        },
        created() {
        },
        methods: {
            validateNameCk(suc, err) { // 校验品牌名称是否重复
                let params = {};
                params.brandName = this.ruleForm.brandName;
                params.brandId = this.$route.query.brandId;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/product/brand/validateName.shtml',
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
            submitForm(fn) {
                this.submitFlag = true;
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {
                        let formData = this.ruleForm;
                        console.log('formD', formData);
                        this.$http({
                            method: 'post',
                            url: '/xe-route/xe-pro/product/brand/addProBrand',
                            data: formData
                        }).then((res) => {
                            console.log('----!!>', res);
                            window.$wxeMessage({
                                type: 'success',
                                message: `新增品牌成功`
                            });
                            if (fn || typeof fn === 'function') {
                                let brandInf = {};
                                brandInf.brandId = res.data.brandId;
                                brandInf.brandName = this.ruleForm.brandName;
                                fn(brandInf);
                            } else {
                                this.cancel();
                            }
                        }).catch((error) => {
                            console.log(error);
                            window.$wxeMessage({
                                type: 'error',
                                message: `${error.msg}`
                            });
                        });
                    } else {
                        this.submitFlag = false;
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            inputFile2Fn(id) {
                this.loadingUploadImg = true;
                var formDatas = new FormData(document.getElementById(id));
                formDatas.append('fileType', 1);
                this.$http({
                    method: 'post',
                    url: '/xe-zuul/xe-route/xe-mis/manager/uploadImg/manImgUpload',
                    data: formDatas
                }).then(res => {
                    console.log(res);
                    this.loadingUploadImg = false;
                    this.picServer = res.data.picServer;
                    this.ruleForm.brandLogo = res.data.imgInfoList[0].imgName;
                }).catch(error => {
                    this.loadingUploadImg = false;
                    console.log(error);
                });
            },
            removeImg() {
                this.ruleForm.brandLogo = '';
                $('.inputFile2').val('');
            },
            cancel() {
                let _this = this;
                setTimeout(function () {
                    _this.$router.go(-1);
                }, 300);
            }
        },
        computed: {
            descTextLength() {
                return getTextLength(this.ruleForm.brandDesc);
            },
            uploadBtnFlag1() {
                let brandLogoFlag = true;
                if (this.ruleForm.brandLogo !== '') {
                    brandLogoFlag = true;
                } else {
                    brandLogoFlag = false;
                }
                return brandLogoFlag;
            }
        }
    };
</script>

<style lang="scss">
    .for-itemlis02 .item-uploadImg_box2 ol{
        padding-bottom: 6px;
        height: auto;
        margin-top: 10px;
        .up-imgLI{
            border-radius: 4px;
            position: relative;
            border: 1px solid #bfcbd9;
            height: 100px;
            span{
                width: 100%;
                height: 18px;
                line-height: 18px;
                text-align: center;
                position: absolute;
                left: 0;
                bottom: 0;
                color: #fff;
                background: rgba(0, 0, 0, 0.5);
            }
        }
    }
</style>
