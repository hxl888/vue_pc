<template lang="html">
    <div class="m-router-con">
        <div class="addNew-box reset-dialog reset-dialog02">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" id="brandRuleForm">
                <el-form-item label="品牌名称" prop='brandName'>
                  <el-input name='brandName' v-model="ruleForm.brandName" class="xe-input-col3" auto-complete="off"></el-input>
                  <span>&nbsp;&nbsp;&nbsp;数字／英文／汉字，限制1-20个字</span>
                </el-form-item>
                <el-form-item label="品牌logo" prop="brandUrlImg">
                    <xeImgUpload name='brandUrlImg' @inputFileChange='imgFileChange' v-model='ruleForm.brandUrlImg' ref='uploadInstance'></xeImgUpload>
                    <!-- <input type="file" value="图片上传" name="brandUrlImg1" multiple> -->
                    <div class='brand-img' v-if='fileList.length'>
                        <p v-for='item in fileList'>
                            <img :src="item" alt="" style="width: 120px; height: 120px;">
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
    import xeImgUpload from '@/components/xeImgUpload/xeImgUpload';
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
                    callback();
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
                    brandUrlImg: '',
                    brandDesc: ''
                },
                rules: {
                    brandName: [
                        { required: true, validator: validateName, trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    brandUrlImg: [
                        { required: true, message: '请上传Logo', trigger: 'change' }
                    ],
                    brandDesc: [
                        {
                            validator: validateBrandDesc, trigger: 'blur'
                        }
                    ]
                },
                fileList: [],
                isError: false,
                productUrl: '/xe-route/xe-mis'
//                productUrl: ''
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
                            if (oldData.brandName) {
                                this.ruleForm.brandName = oldData.brandName;
                            }
                            if (oldData.brandLogo) {
                                let pirUrl = res.data.picServer + oldData.brandLogo;
                                this.fileList.push(pirUrl);
                                console.info('pirUrl-->', res.data.picServer);
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
                this.$http({
                    method: 'post',
                    url: `/xe-route/xe-pro/product/brand/validateName.shtml`,
//                    url: '/manager/brand/validateName',
                    data: params
                }).then((res) => {
                    console.log('----!!>', res);
                    suc && suc();
                }).catch((error) => {
                    console.log(error);
                    err && err(error);
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let formData = new FormData(document.getElementById('brandRuleForm'));
                        this.$http({
                            method: 'post',
                            url: `${this.productUrl}/manager/brand/addProBrand`,
                            data: formData
                        }).then((res) => {
                            console.log('----!!>', res);
                            window.$wxeMessage({
                                type: 'success',
                                message: `修改品牌成功`
                            });
                            this.cancel();
                        }).catch((error) => {
                            console.log(error);
                            window.$wxeMessage({
                                type: 'error',
                                message: `${error.msg}`
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            imgFileChange(fileResult) {
                this.fileList = fileResult;
            },
            removeImg() {
                this.fileList = [];
                this.ruleForm.brandUrlImg = '';
                this.$refs.uploadInstance.clear();
            },
            cancel() {
                this.$router.go(-1);
            }
        },
        components: {
            xeImgUpload
        },
        computed: {
            descTextLength() {
                return getTextLength(this.ruleForm.brandDesc);
            }
        }
    };
</script>
