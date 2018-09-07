<template>
    <div class="m-router-con" v-if="renderFlag">
        <div class="m-store-item">
            <div class="m-title-con clearfix">
                <h3 class="fl">店铺基本信息</h3>
            </div>
            <div class="m-store-con">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="店铺名称">
                        {{venInfoShop.shopName}}
                    </el-form-item>
                    <el-form-item label="登录注册号">
                        {{venInfoShop.loginName}}
                    </el-form-item>
                   <!--  <el-form-item label="店铺域名">
                        <template v-if="!venInfoShop.shopDomain">无</template>
                        <a href="#" v-else class="a-link">{{venInfoShop.shopDomain}}</a>
                    </el-form-item> -->
                    <el-form-item label="店铺LOGO">
                        <div>
                            <div class="shopImgUpload" v-if="!venInfoShop.shopLogo">
                                <form id="shopLogoForm">
                                    <input title="请编辑或者上传图片"
                                           accept="image/gif,image/jpeg,image/jpg,image/png"
                                           type="file"
                                           name='imgFiles'
                                           class='imgFile'
                                           ref="inputFile"
                                           @change="shopLogoUpLoad('inputFile', 'shopLogoForm')"
                                    >
                                </form>
                                <el-button class="xe-button-normal"><i class="iconfont icon-upload2"></i> 上传LOGO</el-button>
                            </div>
                            <div v-else class="store-img">
                                <span class="el-icon-circle-close" @click="clearImg('shopLogo')"></span>
                                <img :src="picServer + venInfoShop.shopLogo">
                            </div>
                            <div class="tips">图片尺寸为660*370，图片大小不超过1024k，仅支持jpg、png、gif格式。</div>
                        </div>
                    </el-form-item>
                    <el-form-item label="店铺店招">
                        <div>
                            <div class="shopImgUpload" v-if="!venInfoShop.shopSigns">
                                <form id="shopSignsForm">
                                    <input title="请编辑或者上传图片"
                                           accept="image/gif,image/jpeg,image/jpg,image/png"
                                           type="file"
                                           name='imgFiles'
                                           class='imgFile'
                                           ref="inputFile2"
                                           @change="shopLogoUpLoad('inputFile2', 'shopSignsForm')"
                                    >
                                </form>
                                <el-button class='xe-button-normal'><i class="iconfont icon-upload2"></i> 上传店招</el-button>
                            </div>
                            <div v-else class="store-img">
                                <span class="el-icon-circle-close" @click="clearImg('shopSigns')"></span>
                                <img :src="picServer + venInfoShop.shopSigns">
                            </div>
                            <div class="tips">图片尺寸为660*370，图片大小不超过1024k，仅支持jpg、png、gif格式。</div>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="m-store-item" v-for="item in venInfoShop.shopContacts" :key="item.contactType">
            <div class="m-title-con clearfix">
                <h3 class="fl">{{item.contactType | contactTypeToText}}</h3>
                <div class="fr">
                    <el-button :loading="item.loading" v-if="item.saveFlag" type="primary" class="xe-button-small" @click="contactSave(item)"><i class="iconfont icon-baocun"></i> 保存</el-button>
                    <el-button v-else class="xe-button-small"  @click="contactEditor(item)"><i class="iconfont icon-xiugai"></i> 修改</el-button>
                </div>
            </div>
            <div class="m-store-con">
                <el-form :model="item" :rules="rules" :ref="'form' + item.contactType" label-width="80px" class="contact-item">
                    <el-form-item label="姓名" prop="contName" :required="item.contactType === 1">
                        <span v-show="!item.saveFlag">{{item.contName ? item.contName : '无'}}</span>
                        <el-input v-show="item.saveFlag" v-model="item.contName" size="small" :maxlength="15" class="xe-input-col3" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮件" prop="contEmail">
                        <span v-show="!item.saveFlag">{{item.contEmail ? item.contEmail : '无'}}</span>
                        <el-input v-show="item.saveFlag" v-model="item.contEmail" size="small" class="xe-input-col3" placeholder="请输入电子邮件"></el-input>
                    </el-form-item>
                    <el-form-item label="座机" prop="landline">
                        <span v-show="!item.saveFlag">{{item.landline ? item.landline : '无'}}</span>
                        <el-input v-show="item.saveFlag" v-model="item.landline" size="small" class="xe-input-col3" placeholder="请输入座机"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="contPhone" :required="item.contactType === 1">
                        <span v-show="!item.saveFlag">{{item.contPhone ? item.contPhone : '无'}}</span>
                        <el-input v-show="item.saveFlag" v-model="item.contPhone" :maxlength="11" size="small" class="xe-input-col3" placeholder="请输入手机"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ" prop="contQq">
                        <span v-show="!item.saveFlag">{{item.contQq ? item.contQq : '无'}}</span>
                        <el-input v-show="item.saveFlag" v-model="item.contQq" size="small" class="xe-input-col3" placeholder="请输入QQ"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            let checkContName = (rule, value, callback) => {
                if (this.requiredFlag) {
                    if (!value) {
                        return callback(new Error('姓名不能为空'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                };
            };
            let checkContPhone = (rule, value, callback) => {
                if (this.requiredFlag) {
                    if (!value) {
                        return callback(new Error('手机号不能为空'));
                    }
                }
                if (value && !(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };
            let checkLandline = (rule, value, callback) => {
                if (value && !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
                    callback(new Error('请输入正确的座机号码'));
                } else {
                    callback();
                }
            };
            let checkContQq = (rule, value, callback) => {
                if (value && !/^[1-9][0-9]{4,9}$/.test(value)) {
                    callback(new Error('请输入正确的QQ号码'));
                } else {
                    callback();
                }
            };
            return {
                requiredFlag: false,
                venInfoShop: {},
                maxSize: 1024 * 1024, // 1M 对应的字节数
                renderFlag: false,
                picServer: '',
                rules: {
                    contName: [
                        { validator: checkContName, trigger: 'blur' }
                    ],
                    contEmail: [
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur, change' }
                    ],
                    landline: [
                        { validator: checkLandline, trigger: 'blur' }
                    ],
                    contPhone: [
                        { validator: checkContPhone, trigger: 'blur, change' }
                    ],
                    contQq: [
                        { validator: checkContQq, trigger: 'blur' }
                    ]
                }
            };
        },
        created() {
            this.getShopInfo();
        },
        methods: {
            getShopInfo() {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/xeveninfoshop/getShopInfo',
                    data: {}
                }).then(res => {
                    console.log(res);
                    this.venInfoShop = res.data.venInfoShop;
                    this.picServer = res.data.picServer;
                    this.renderFlag = true;
                }).catch(error => {
                    console.log(error);
                });
            },
            shopLogoUpLoad(inputFile, id) {
                let _this = this;
                const files = this.$refs[inputFile].files;
                if (files.length > 0) {
                    let file = files[0];
                    // 接受 jpeg, jpg, png 类型的图片
                    // if (!/\/(?:jpeg|jpg|png)/i.test(file.type)) return;

                    // 如果图片大于给定值则不上传
                    console.log(file.size);
                    console.log(_this.maxSize);
                    if (file.size > _this.maxSize) {
                        // toPreviewer(result);
                        _this.$xeMessage.error(`图片大小已超过${_this.maxSize / 1024} KB`);
                        _this.$refs.inputFile.value = '';
                        return;
                    };
                    var formData = new FormData(document.getElementById(id));
                    formData.append('fileType', 3);
                    _this.$http({
                        method: 'post',
                        url: '/xe-zuul/xe-route/xe-mis/manager/uploadImg/manImgUpload',
                        data: formData
                    }).then(res => {
                        console.log(res);
                        if (id === 'shopLogoForm') {
                            _this.venInfoShop.shopLogo = res.data.imgInfoList[0].imgName;
                        } else {
                            _this.venInfoShop.shopSigns = res.data.imgInfoList[0].imgName;
                        }
                        this.updateShopInfo();
                    }).catch(error => {
                        console.log(error);
                    });
                }
            },
            updateShopInfo() {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/xeveninfoshop/updateShopInfo',
                    data: {
                        'shopId': this.venInfoShop.shopId, // 店铺id  必传
                        'shopLogo': this.venInfoShop.shopLogo, // 图片url    调用04图片上传接口，获取返回值imgName
                        'shopSigns': this.venInfoShop.shopSigns // 图片url  调用04图片上传接口，获取返回值imgName
                    }
                });
            },
            clearImg(str) {
                if (str === 'shopLogo') {
                    this.venInfoShop.shopLogo = '';
                } else {
                    this.venInfoShop.shopSigns = '';
                }
            },
            contactEditor(item) {
                // 负责人修改按钮
                if (item.contactType === 1) {
                    this.requiredFlag = true;
                } else {
                    this.requiredFlag = false;
                }
                this.$set(item, 'saveFlag', true);
            },
            contactSave(item) {
                console.log(item);
                // 负责人保存
                this.$refs['form' + item.contactType][0].validate((valid) => {
                    if (valid) {
                        console.log(item);
                        this.$set(item, 'loading', true);
                        // 修改联系人信息
                        this.$http({
                            method: 'post',
                            url: '/xe-route/xe-erp/xeveninfoshop/updateShopContact',
                            data: {
                                'shopId': this.venInfoShop.shopId, // 店铺id  必传
                                'contactType': item.contactType,
                                'contactId': item.contactId,  // 需要修改的联系人id  必传
                                'contName': item.contName,  // 联系人姓名
                                'contPhone': item.contPhone, // 联系人电话
                                'contEmail': item.contEmail, // 联系人email
                                'contQq': item.contQq, // 联系人QQ
                                'landline': item.landline  // 联系人座机
                            }
                        }).then(res => {
                            console.log(res);
                            this.$set(item, 'loading', false);
                            this.$set(item, 'saveFlag', false);
                        }).catch(error => {
                            console.log(error);
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        filters: {
            contactTypeToText(type) {
                var obj = {
                    1: '店铺负责人',
                    2: '运营联系人',
                    3: '售后联系人',
                    4: '财务联系人'
                };
                return obj[type];
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss"></style>
