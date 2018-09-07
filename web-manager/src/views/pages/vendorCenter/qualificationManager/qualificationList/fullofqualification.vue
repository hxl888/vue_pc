<template lang="html">
    <div class="m-router-con m-router-con-top10">
        <el-form ref = "formSublist" :rules="rules"  :model = "formSublist" label-width="93px" id="formSublistId">
        <div class="u-getInfor">
            <ul class="Ul-infor editUl-infor">
                <li class="clearfix inp-list">
                    <input type="hidden" name="userCode" v-model="formSublist.userCode">
                    <el-form-item label="资质类型" prop="apFlag">
                        <el-select v-model="formSublist.apFlag" @change="selechange" placeholder="请选择" class="xe-input-col2">
                            <el-option
                                v-for="item in qualificationType"
                                :label="item.name"
                                :value="item.value"
                                :key='item.value'>
                            </el-option>
                        </el-select>
                        <input type="hidden" name="apFlag" v-model="formSublist.apFlag">
                    </el-form-item>
                </li>
                <li class="clearfix inp-list">
                    <el-form-item label="证件名称">
                        <el-input name="apName"  v-model="formSublist.apName" :disabled="true" class="xe-input-col2"></el-input>
                    </el-form-item>
                </li>
                <li class="clearfix inp-list">
                    <el-form-item label="证件号码" prop="apNum">
                        <el-input v-if="typeNum == 3" :maxlength="18" name="apNum" v-model="formSublist.apNum" class="xe-input-col2"></el-input>
                        <el-input v-else name="apNum" v-model="formSublist.apNum" class="xe-input-col2"></el-input>
                    </el-form-item>
                </li>
                <li class="clearfix inp-list" v-if="typeNum !==3">
                    <el-form-item label="资质图片" prop="apUrl">
                        <div class="item-uploadImg_box item-uploadImg_box_reset clearfix" v-loading='loadingUploadImg'>
                                <div class="uploadImg-btn h-uploadImgBox">
                                    <span>选择文件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="upload-des">Logo图片建议尺寸:120*120/120*60</i>
                                    <form name='form' id='formFile'>
                                        <input type="hidden" name="fileType" v-model="fileType">
                                        <input type="file" name='imgFiles'  class='inputFile2' @change="inputFile2Fn('formFile')" accept="image/gif,image/jpeg,image/jpg,image/png">
                                    </form>
                                </div>
                                <p v-if="uploadImg.length" v-for='item in uploadImg' class="h-brand-img">
                                    <img :src="picServers + item.imgName" alt="" style="width: 120px; height: 120px;">
                                    <span @click.prevent='removeImg(0)'>删除</span>
                                </p>
                        </div>
                    </el-form-item>
                </li>
                <!--身份证照片上传start-->
                <div v-else>
                    <li class="clearfix inp-list">
                        <el-form-item label="身份证正面照" prop="apUrl1">
                            <div class="item-uploadImg_box item-uploadImg_box_reset clearfix" v-loading='loadingUploadImg1'>
                                    <div class="uploadImg-btn h-uploadImgBox">
                                        <span>选择文件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="upload-des">Logo图片建议尺寸:120*120/120*60</i>
                                        <form name='form1' id='formFile1'>
                                            <input type="hidden" name="fileType" v-model="fileType">
                                            <input type="file" name='imgFiles'  class='inputFile2' @change="inputFile2Fn('formFile1')" accept="image/gif,image/jpeg,image/jpg,image/png">
                                        </form>
                                    </div>
                                    <p v-if="uploadImg1.length" v-for='item in uploadImg1' class="h-brand-img">
                                        <img :src="picServers + item.imgName" alt="" style="width: 120px; height: 120px;">
                                        <span @click.prevent='removeImg(1)'>删除</span>
                                    </p>
                            </div>
                        </el-form-item>
                    </li>
                    <li class="clearfix inp-list">
                        <el-form-item label="身份证反面照" prop="idcardBack">
                            <div class="item-uploadImg_box item-uploadImg_box_reset clearfix" v-loading='loadingUploadImg'>
                                    <div class="uploadImg-btn h-uploadImgBox">
                                        <span>选择文件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="upload-des">Logo图片建议尺寸:120*120/120*60</i>
                                        <form name='form2' id='formFile2'>
                                            <input type="hidden" name="fileType" v-model="fileType">
                                            <input type="file" name='imgFiles'  class='inputFile2' @change="inputFile2Fn('formFile2')" accept="image/gif,image/jpeg,image/jpg,image/png">
                                        </form>
                                    </div>
                                    <p v-if="uploadImg2.length" v-for='item in uploadImg2' class="h-brand-img">
                                        <img :src="picServers + item.imgName" alt="" style="width: 120px; height: 120px;">
                                        <span @click.prevent='removeImg(2)'>删除</span>
                                    </p>
                            </div>
                        </el-form-item>
                    </li>
                </div>
                <!--身份证照片上传end-->
                <li class="clearfix inp-list red-label">
                    <el-form-item label="证件有效期" prop="endDate">
                        <el-date-picker
                            v-model="endDates"
                            type="date"
                            style="width: 210px"
                            @change="datachange"
                            :picker-options="pickernewData"
                            placeholder="选择日期">
                        </el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-checkbox v-model="endDatelong" >长期有效</el-checkbox>
                    </el-form-item>
                </li>
            </ul>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formSublist')">保存</el-button>
                <el-button @click="goBack">返回</el-button>
            </el-form-item>
        </div>
        </el-form>
    </div>
</template>

<script>
import {apFlag} from '@/dataControl';
export default {
    data() {
        var apNumvalidates = (rule, value, callback) => {
            if (value) {
                if (this.formSublist.apName === '身份证') {
                    let reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error('身份证格式错误'));
                    }
                } else {
                    console.log('不是身份证--');
                    if (value.length > 20) {
                        callback(new Error('证件号码长度过长'));
                    }
                    callback();
                }
            } else {
                callback(new Error('证件号码不能为空'));
            }
        };
        return {
            formSublist: {
                userCode: '',
                apFlag: '',
                apName: '',
                apNum: '',
                apUrl: '',
                apUrl1: '',
                idcardBack: '',
                endDate: ''
            },
            pickernewData: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            fileType: 3,
            uploadImg: [],
            uploadImg1: [],
            uploadImg2: [],
            loadingUploadImg: false,
            loadingUploadImg1: false,
            loadingUploadImg2: false,
            picServer: '',
            qualificationType: [],
            endDates: '',
            endDatelong: false,
            dialogImageUrl: '',
            typeNum: 1, // 资质类型判断
            rules: {
                apFlag: [
                    { required: true, type: 'number', message: '资质类型不能为空', trigger: 'change' }
                ],
                apNum: [
                    { required: true, validator: apNumvalidates, trigger: 'blur' }
                ],
                apUrl: [
                    { required: true, message: '资质图片不能为空', trigger: 'change' }
                ],
                apUrl1: [
                    { required: true, message: '身份证正面照片不能为空', trigger: 'change' }
                ],
                idcardBack: [
                    { required: true, message: '身份证反面照片不能为空', trigger: 'change' }
                ]
            },
//            productRul: '/xe-route/xe-mis-Ljj'
            productRul: '/xe-route/xe-mis'
        };
    },
    created() {
        this.querySlecon();
        this.formSublist.userCode = this.$route.query.userCode;
    },
    methods: {
        selectTime() {
            if (this.endDatelong) {
                this.endDates = '';
            }
        },
        selechange(val) { // 下拉框改动将名称添到对应的证件名称下面
            let qualificationType = this.qualificationType;
            // 下拉框选择时删除所有已经上传的图片数据
            this.formSublist.apUrl = '';
            this.formSublist.apUrl1 = '';
            this.formSublist.idcardBack = '';
            this.uploadImg = '';
            this.uploadImg1 = '';
            this.uploadImg2 = '';
            this.typeNum = val;
            // 回显到对应的证件名称下面
            for (let i in qualificationType) {
                if (qualificationType[i].value === val) {
                    this.formSublist.apName = qualificationType[i].name;
                }
            }
        },
        datachange(val) {
            this.endDates = val;
//            this.endDatelong = false;
        },
        querySlecon() { // 询资质类型根据供应商code、排除此供应商已有类型
            let userCode = this.$route.query.userCode;
            if (userCode) {
                let params = {};
                params.userCode = userCode;
                this.$http({
                    method: 'post',
                    url: `${this.productRul}/manager/aptitudemanager/queryAptitudeTypeByCode`,
                    data: params
                }).then((res) => {
                    console.log('--66999--!!>', res);
                    let seltlist = res.data.AptitudeTypeList;
                    let apFlaglist = this.apFlaglist;
                    let resultIndex = {};
                    let resultData = [];
                    for (let i = 0; i < apFlaglist.length; i++) {
                        for (let j = 0; j < seltlist.length; j++) {
                            if (parseInt(apFlaglist[i].value) === parseInt(seltlist[j].apFlag)) {
                                resultIndex[i] = 1;
                                break;
                            }
                        }
                    };
                    apFlaglist.some((item, index) => {
                        if (!resultIndex[index]) {
                            resultData.push(item);
                            return false;
                        }
                    });
                    this.qualificationType = resultData;
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.goBack();
            }
        },
        handlePreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        endDatevalidate() { // 检验到期时间
            if (this.endDates || this.endDatelong) {
                this.formSublist.endDate = this.endDatelong ? 1 : this.endDates;
                return true;
            } else {
                this.$alert(`请填写到期时间`, {
                    type: 'info'
                });
            }
        },
        informationSubmission() { // 更新资质
            let params = {};
            params = this.formSublist;
            if (this.typeNum === 3) {
                params.apUrl = this.formSublist.apUrl1;
            }
            this.$http({
                method: 'post',
                url: `${this.productRul}/manager/aptitudemanager/insertAptitude`,
                data: params
            }).then((res) => {
                if (res.data.remote && res.data.remote.status !== '0000') {
                } else {
                    window.$wxeMessage('资质完善成功');
                    console.log('--提交成功--!!>', res);
                    this.goBack();
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.endDatevalidate()) {
                        this.informationSubmission();
                    }
                } else {
                    return false;
                }
            });
        },
        inputFile2Fn(id) {
            if (id === 'formFile') {
                this.loadingUploadImg = true;
            } else if (id === 'formFile1') {
                this.loadingUploadImg1 = true;
            } else if (id === 'formFile2') {
                this.loadingUploadImg2 = true;
            }
            var formData = new FormData(document.getElementById(id));
            this.$http({
                method: 'post',
                url: '/xe-zuul/xe-route/xe-mis/manager/uploadImg/manImgUpload',
                data: formData
            }).then(res => {
                console.log('--->', res);
                let imgInfoList = res.data.imgInfoList;
                this.picServers = res.data.picServer;
                if (id === 'formFile') {
                    this.uploadImg = imgInfoList;
                    this.loadingUploadImg = false;
                    this.formSublist.apUrl = imgInfoList[0].imgName;
                    console.log('imgInfoList-1000', imgInfoList);
                } else if (id === 'formFile1') {
                    this.uploadImg1 = imgInfoList;
                    this.loadingUploadImg1 = false;
                    this.formSublist.apUrl1 = imgInfoList[0].imgName;
                    console.log('imgInfoList-1111', imgInfoList);
                } else if (id === 'formFile2') {
                    this.uploadImg2 = imgInfoList;
                    this.loadingUploadImg2 = false;
                    this.formSublist.idcardBack = imgInfoList[0].imgName;
                    console.log('imgInfoList-22222222', imgInfoList);
                }
            }).catch(error => {
                console.log(error);
            });
        },
        removeImg(num) {
            if (num === 0) {
                this.uploadImg = '';
                this.formSublist.apUrl = '';
            } else if (num === 1) {
                this.uploadImg1 = '';
                this.formSublist.apUrl1 = '';
            } else if (num === 2) {
                this.uploadImg2 = '';
                this.formSublist.idcardBack = '';
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    computed: {
        apFlaglist() {
            return apFlag;
        }
    },
    watch: {
        endDates: function(n) {
            if (n) {
                this.endDatelong = false;
            }
        },
        endDatelong: function(n) {
            if (n) {
                this.endDates = '';
            }
        }
    }
};
</script>

<style lang="scss">
    .editUl-infor{
        .el-form-item__label:before {
            content: '*';
            color: #ff4949;
            margin-right: 4px;
        }
        .txt-infor{
            min-width: 84px;
            text-align: right;
            padding-right: 12px;
            box-sizing: border-box;
            float: left;
        }
        .inp-list{
            padding: 5px 0;
            margin-bottom: 0;
        }
        .upload-list{
            .el-upload-list__item-name{
                // display: none;
                opacity: 0;
                position: absolute;
                width: 100%;
                height: 100%;
                background: #fff;
                z-index: 2;
            }
            .el-upload-list--picture .el-upload-list__item{
                padding: 0;
                width: 124px;
                height: 124px;
                float: left;
                margin-right: 20px;
                border-radius: 0;
            }
            .el-upload-list--picture .el-upload-list__item-thumbnail{
                margin: 0;
                width: 100%;
                height: 100%;
                // border-radius: 6px
            }
            .el-upload-list--picture .el-upload-list__item-status-label, .el-upload-list__item .el-icon-close{
                z-index: 2
            }
        }
        .upload-list.u-opera-btnBox{
            padding: 0;
            .el-button, .el-button:focus, .el-button:hover {
                color: #687281;
                background: #f5f5f5;
                border: 1px solid #d1d8e0;
            }
        }
        .el-upload-list--picture .el-progress {
            position: absolute;
            top: 55px;
            width: 80%;
            left: 10px;
        }
        .upload-list .el-upload, .upload-list .el-upload__tip{
            float: left;
            margin: 0 10px 0 0;

        }
        .el-upload-list{
            clear: both;
            .el-upload-list__item{
                margin-top: 20px;
            }
        }
    }
</style>
