<style rel="stylesheet/scss" lang="scss">

    .xe-page-content .xe-adduser-radio-item {
        padding-left: 100px;
        margin-bottom: 22px;
    }
    .goodsList {
        .el-form-item__content{
            width: 200px;
        }
        .el-input-group__append{
            border: 0;
            background: none;
            width: 44px;
        }
        .el-input-group--append.xe-input-col2{
            // 添加单位样式reset 暂时2个字
            width:220px!important;
        }
        .xe-input-col2{
            width: 174px!important;
        }
    }
    .goodsDes{
        // border-bottom: 1px solid #c2c2c2;
        .el-form-item__content{
            width: 490px;
        }
    }
    .xe-inputNumber{
        overflow: visible;
        .el-input-group__append{
            position: absolute;
            top: 0;
            right: -44px;
            line-height: 36px;
        }
    }

</style>

<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainCscCustomerGoodsListPage' }">货品档案</el-breadcrumb-item>
                <el-breadcrumb-item>{{typeOprea}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                {{typeOprea}}客户货品档案
            </p>
        </div>
        <div>
            <el-form :model="addForm" :rules="rules" :inline="true"  ref="ruleForm" :label-width="xeLabelWidth">
                <div class="goodsList">
                    <el-form-item label="所属客户" required prop="customerCode">
                        <el-select filterable class="xe-input-col2" v-model="addForm.customerCode" placeholder="请选择">
                            <el-option v-for="item in cunstomerCodes"
                                :label="item.customerName"
                                :value="item.customerCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="货品种类" required prop="goodsTypeId">
                        <el-select filterable class="xe-input-col2" v-model="addForm.goodsTypeId" placeholder="请选择"  @change="loadGoodsTypeList(addForm.goodsTypeId)">
                            <el-option v-for="item in goodsTypeId"
                                :label="item.goodsTypeName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="货品小类" required prop="goodsType">
                        <el-select filterable class="xe-input-col2" v-model="addForm.goodsType" placeholder="请选择">
                            <el-option v-for="item in goodsTypeList"
                                :label="item.goodsTypeName"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="goodsList">
                    <el-form-item label="货品编码" prop="goodsCode" required>
                        <el-input class="xe-input-col2" v-model="addForm.goodsCode" placeholder="请输入货品编码"></el-input>
                    </el-form-item>
                    <el-form-item label="货品名称" prop="goodsName" required>
                        <el-input class="xe-input-col2" v-model="addForm.goodsName" placeholder="请输入货品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌" prop="brand">
                        <el-input class="xe-input-col2" v-model="addForm.brand" placeholder="请输入品牌"></el-input>
                    </el-form-item>
                </div>
                <div class="goodsList">
                    <el-form-item label="规格" prop="specification">
                        <el-input class="xe-input-col2" v-model="addForm.specification" placeholder="请输入规格"></el-input>
                    </el-form-item>
                    <el-form-item label="条形码" prop="barCode">
                        <el-input class="xe-input-col2" v-model="addForm.barCode" placeholder="请输入条形码"></el-input>
                    </el-form-item>
                    <el-form-item label="单位" prop="unit">
                        <el-input class="xe-input-col2" v-model="addForm.unit" placeholder="请输入单位"></el-input>
                    </el-form-item>
                </div>
                <div class="goodsList">
                    <el-form-item label="保质期限" prop="expiryDate">
                        <el-input class="xe-input-col2" type="text" v-model="addForm.expiryDate" placeholder="请输入天数"><template slot="append">天</template></el-input>
                    </el-form-item>
                    <el-form-item label="长" prop="length">
                        <el-input class="xe-input-col2" type="text" v-model="addForm.length" placeholder="请输入长度"><template slot="append">m</template></el-input>
                    </el-form-item>
                    <el-form-item label="宽" prop="width">
                        <el-input class="xe-input-col2" type="text" v-model="addForm.width" placeholder="请输入宽度"><template slot="append">m</template></el-input>
                    </el-form-item>
                </div>
                <div class="goodsList">
                    <el-form-item label="高" prop="height">
                        <el-input class="xe-input-col2" type="text" v-model="addForm.height" placeholder="请输入高度"><template slot="append">m</template></el-input>
                    </el-form-item>
                    <el-form-item label="体积" prop="volume">
                        <el-input class="xe-input-col2" disabled v-model="volume" placeholder=""><template slot="append">m³</template></el-input>
                    </el-form-item>
                    <el-form-item label="重量" prop="weight">
                        <el-input class="xe-input-col2" type="text" v-model="addForm.weight" placeholder="请输入重量"><template slot="append">Kg</template></el-input>
                    </el-form-item>
                </div>
                <div class="goodsList">
                    <el-form-item label="价格" prop="unitPrice">
                        <el-input class="xe-input-col2" type="text" v-model="addForm.unitPrice" placeholder=""><template slot="append">元</template></el-input>
                    </el-form-item>
                    <el-form-item label="温度带">
                        <el-select filterable class="xe-input-col2" v-model="addForm.keeptemperate" placeholder="请选择">
                            <el-option v-for="item in keeptemperate"
                                :label="item.value"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="货品状态">
                        <el-select filterable class="xe-input-col2" v-model="addForm.state" placeholder="请选择">
                            <el-option v-for="item in state"
                                :label="item.value"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="goodsDes">
                    <el-form-item label="货品描述" prop="goodsDes">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 7, maxRows: 10}"
                            resize="none"
                            :maxlength="10"
                            placeholder="请输入内容"
                            v-model="addForm.description">
                        </el-input>
                    </el-form-item>
                </div>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="backBtnClick()">返回</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            var checkNumber = (rule, value, callback) => {
                console.log(value);
                if (isNaN(value)) {
                    callback(new Error('必须输入数字'));
                } else {
                    callback();
                }
            };
            var checkGoodsCode = (rule, value, callback) => { // 货品编码规则
                if (value !== '') {
                    var data = {};
                    var url = '/page/csc/goods/common/checkGoodsCodeWithAdd';
                    data.goodsCode = value;
                    if (this.$route.query.type === 'edit') {
                        data.serialNo = this.addForm.serialNo;
                        url = '/page/csc/goods/common/checkGoodsCodeWithEdit';
                    }
                    this.$http({
                        method: 'POST',
                        url: url,
                        data: data
                    }).then((res) => {
                        if (res.result === false) {
                            callback(new Error('货品编码已存在'));
                        } else {
                            callback();
                        }
                    });
                } else {
                    callback(new Error('请输入货品编码'));
                }
            };
            return {
                typeOprea: '添加',
                addForm: { // 提交对应字段
                    customerCode: '',
                    goodsTypeId: '',
                    goodsType: '',
                    goodsCode: '',
                    goodsName: '',
                    brand: '',
                    specification: '',
                    barCode: '',
                    unit: '',
                    expiryDate: '',
                    width: '',
                    length: '',
                    height: '',
                    weight: '',
                    unitPrice: '',
                    keeptemperate: '',
                    state: '',
                    description: ''
                },
                sourceId: '',
                // customerCode: '', customerName: '请选择'
                cunstomerCodes: [],
                // id: '', goodsTypeName: '请选择'
                goodsTypeId: [],
                goodsTypeList: [],
                keeptemperate: [{
                    key: '',
                    value: '请选择'
                }],
                // key: '',value: '请选择'
                state: [],
                treeData: [],
                rules: {
                    customerCode: [
                        { required: true, message: '请选择所属客户', trigger: 'change' }
                    ],
                    goodsTypeId: [
                        { required: true, message: '请选择货品种类', trigger: 'change' }
                    ],
                    goodsType: [
                        { required: true, message: '请选择货品小类', trigger: 'change' }
                    ],
                    // goodsCode: [
                    //     { required: true, message: '请填写货品编码', trigger: 'blur' }
                    // ],
                    goodsCode: [
                        { validator: checkGoodsCode, trigger: 'blur' }
                    ],
                    goodsName: [
                        { required: true, message: '请填写货品名称', trigger: 'blur' }
                    ],
                    expiryDate: [
                        { validator: checkNumber, trigger: 'blur' }
                    ],
                    width: [
                        { validator: checkNumber, trigger: 'blur' }
                    ],
                    height: [
                        { validator: checkNumber, trigger: 'blur' }
                    ],
                    length: [
                        { validator: checkNumber, trigger: 'blur' }
                    ],
                    weight: [
                        { validator: checkNumber, trigger: 'blur' }
                    ],
                    unitPrice: [
                        { validator: checkNumber, trigger: 'blur' }
                    ]
                }
            };
        },
        created() {
            let _this = this;
            this.loadCustomerName();
            this.loadCompanyType();
            this.loadKeeptemperate();
            this.loadGoodsState();
            // EDITER
            if (this.$route.query.type === 'edit') {
                _this.sourceId = this.$route.query.id;
                _this.typeOprea = '编辑';
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/goods/common/queryGoodsById/' + _this.sourceId,
                    data: {
                        'id': _this.sourceId
                    }
                }).then((res) => {
                    console.log('----addForm====>', res);
//                    for (var i in res.result) {
//                        console.log(i + '==' + res.result[i]);
//                    }
                    if (res.code === 200) {
                        _this.addForm = res.result;
                        // GoodsTypeList
                        _this.loadGoodsTypeList(_this.addForm.goodsTypeId, false);
                    } else {
                        // _this.$xeMessage({
                        //     type: 'error',
                        //     message: res.message
                        // });
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    // _this.$xeMessage({
                    //     type: 'error',
                    //     message: '服务器异常'
                    // });
                    // _this.$alert('服务器异常', '错误', {
                    //     confirmButtonText: '确定',
                    //     type: 'error'
                    // });
                });
            }
        },
        methods: {
            loadCompanyType() { // 加载货品种类类型
                let _this = this;
                console.log('test');
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/goods/common/queryGoodsType'
                }).then((res) => {
                    if (res.code === 200) {
//                        console.log(res.result.list);
                        for (var i = 0; i < res.result.length; i++) {
                            _this.goodsTypeId.push({id: res.result[i].id, goodsTypeName: res.result[i].goodsTypeName});
                        }
                        // console.log(_this.goodsTypeId);
                    } else {
                        // _this.$xeMessage({
                        //     type: 'error',
                        //     message: res.message
                        // });
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    // _this.$xeMessage({
                    //     type: 'error',
                    //     message: '服务器异常'
                    // });
                    // _this.$alert('服务器异常', '错误', {
                    //     confirmButtonText: '确定',
                    //     type: 'error'
                    // });
                });
            },
            loadGoodsTypeList(pid, reset) { // 加载货品小类类型
                let _this = this;
                var tmp = [];
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/goods/common/queryCscGoodsTypeList/' + pid
                }).then((res) => {
                    if (res.code === 200) {
//                        console.log(res.result);
                        for (var i = 0; i < res.result.length; i++) {
                            tmp.push({id: res.result[i].id, goodsTypeName: res.result[i].goodsTypeName});
                        }
                        _this.goodsTypeList = tmp;
                        // 默认选中小类第一条
                        if (reset !== 'false') {
                            _this.addForm.goodsType = tmp[0].id;
                        }
                    } else {
                        // _this.$xeMessage({
                        //     type: 'error',
                        //     message: res.message
                        // });
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    // _this.$xeMessage({
                    //     type: 'error',
                    //     message: '服务器异常'
                    // });
                });
            },
            loadCustomerName() { // 加载所属客户数据
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/cscReceive/common/findAllCustomerInfo'
                }).then((res) => {
                    if (res.code === 200) {
//                        console.log(res.result);
                        for (var i = 0; i < res.result.length; i++) {
                            _this.cunstomerCodes.push({customerCode: res.result[i].customerCode, customerName: res.result[i].customerName});
                        }
                        // console.log(_this.cunstomerCodes);
                    } else {
                        // _this.$xeMessage({
                        //     type: 'error',
                        //     message: res.message
                        // });
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    // _this.$xeMessage({
                    //     type: 'error',
                    //     message: '服务器异常'
                    // });
                });
            },
            loadGoodsState() { // 加载货品状态数据
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/goods/common/queryGoodsState'
                }).then((res) => {
                    if (res.code === 200) {
                        for (var i = 0; i < res.result.length; i++) {
                            _this.state.push({key: res.result[i].key, value: res.result[i].value});
                        }
                        // console.log(_this.state);
                    } else {
                        // _this.$xeMessage({
                        //     type: 'error',
                        //     message: res.message
                        // });
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    // _this.$xeMessage({
                    //     type: 'error',
                    //     message: '服务器异常'
                    // });
                });
            },
            loadKeeptemperate() { // 加载温度带数据
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/goods/common/findCscKeeptemperate'
                }).then((res) => {
                    if (res.code === 200) {
                        for (var i = 0; i < res.result.length; i++) {
                            _this.keeptemperate.push({key: res.result[i].key, value: res.result[i].value});
                        }
                        // console.log(_this.keeptemperate);
                    } else {
                        // _this.$xeMessage({
                        //     type: 'error',
                        //     message: res.message
                        // });
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    // _this.$xeMessage({
                    //     type: 'error',
                    //     message: '服务器异常'
                    // });
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveBtnClick();
                    } else {
                        return false;
                    }
                });
            },
            saveBtnClick() {
                let _this = this;
                // 默认新增ajax  url
                var url = '/page/csc/goods/add/addCscGoods';
                if (this.$route.query.type === 'edit') {
                    url = '/page/csc/goods/update/modifyCscGoodsByKey';
                }
                console.log(_this.addForm);
                _this.$http({
                    method: 'POST',
                    url: url,
                    data: _this.addForm
                }).then((res) => {
                    if (res.code === 200) {
//                        console.log('testwin');
                        _this.$router.go(-1);
                    } else {
                        // _this.$xeMessage({
                        //     type: 'error',
                        //     message: res.message
                        // });
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            backBtnClick() {
                this.$router.go(-1);
            }
        },
        computed: {
            volume() {
                if (!isNaN(this.addForm.width) && !isNaN(this.addForm.height) && !isNaN(this.addForm.length)) {
                    return this.addForm.width * this.addForm.height * this.addForm.length;
                }
            }
        }
    };

</script>
