<template>
    <div class="m-router-con">
        <div v-if="renderFlag">
            <div class="m-store-item">
                <div class="m-title-con clearfix">
                    <h3 class="fl">公司简介</h3>
                    <div class="fr">
                        <el-button :loading="comDescLoading" type="primary" class="xe-button-small" v-if="comDescFlag" @click="updateShopInfo"><i class="iconfont icon-baocun"></i> 保存</el-button>
                        <el-button size="small" @click="comDescFlag = true" class="xe-button-small" v-else><i class="iconfont icon-xiugai"></i> 修改</el-button>
                    </div>
                </div>
                <div class="m-store-con">
                    <div v-if="!comDesc && !comDescFlag">
                        <el-button @click="newAddDesc"><i class="el-icon-plus"></i> 添加公司简介</el-button>
                    </div>
                    <div v-else style="width: 500px;">
                        <div v-if="comDescFlag">
                            <el-input
                                type="textarea"
                                resize="none"
                                :rows="6"
                                :maxlength="200"
                                placeholder="请输入内容"
                                v-model="comDesc">
                            </el-input>
                        </div>
                        <div v-else>{{comDesc}}</div>
                    </div>
                </div>
            </div>
            <div class="m-store-item">
                <div class="m-title-con clearfix">
                    <h3 class="fl">公司营业执照信息（副本）</h3>
                    <div class="fr">
                        <el-button :loading="venInfoLoading" type="primary" class="xe-button-small" @click="updateVenInfo"><i class="iconfont icon-baocun"></i> 保存</el-button>
                    </div>
                </div>
                <div class="m-store-con">
                    <el-form :model="venInfoShop" ref="venInfoForm" :rules="rules" label-width="130px" class="company-item">
                        <el-form-item label="公司名称" prop="venName">
                            <el-input :disabled="true" size="small" class="xe-input-col3" placeholder="请输入公司名称" v-model="venInfoShop.venName"></el-input>
                        </el-form-item>
                        <el-form-item label="成立日期">
                            <el-date-picker type="date" v-model="createValue" placeholder="选择成立日期" style="width: 400px;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="注册所在地">
                            <!--<el-input size="small" class="xe-input-col3" placeholder="请输入注册所在地"></el-input>-->
                            <el-cascader
                                v-if="options2"
                                v-model="selectedOptions2"
                                style="width: 400px"
                                :options="options2"
                                @active-item-change="handleItemChange"
                                :props="{label: 'areaName', value: 'areaId', children: 'cities'}"
                            ></el-cascader>
                        </el-form-item>
                        <el-form-item label="详细地址">
                            <el-input size="small" class="xe-input-col3" v-model="venInfoShop.venAddr" placeholder="请输入详细地址"></el-input>
                        </el-form-item>
                        <el-form-item label="注册资本">
                            <el-input size="small" class="xe-input-col3" placeholder="请输入注册资本" :maxlength="9" v-model="venInfoShop.registCapital" @blur="venInfoShop.registCapital = parseFloat(venInfoShop.registCapital) ? Math.abs(parseFloat(venInfoShop.registCapital)).toFixed(2) : ''"></el-input>
                            <span>万元</span>
                        </el-form-item>
                        <el-form-item label="公司电话" prop="comPhone">
                            <el-input size="small" class="xe-input-col3" :maxlength="11" v-model="venInfoShop.comPhone" placeholder="请输入公司电话"></el-input>
                        </el-form-item>
                        <el-form-item label="主营业务" required prop="businessType">
                            <!--<el-input size="small" class="xe-input-col3" placeholder="请输入QQ"></el-input>-->
                            <el-checkbox-group
                                v-model="checkedLists"
                                :min="1"
                                :max="3">
                                <el-checkbox v-for="(item, index) in categoryList"
                                             :label="item.cateId + ''"
                                             :key="item.cateId"
                                >
                                    {{item.cateName}}
                                </el-checkbox>
                            </el-checkbox-group>
                            <div style="line-height: 20px; color: #c8c8c8;">(主营业务最少选一项,最多选3项)</div>
                        </el-form-item>
                        <el-form-item label="注册号(营业执照号)" prop="apNum">
                            <el-input size="small" :disabled="true" class="xe-input-col3" v-model="venInfoShop.apNum" placeholder="请输入注册号(营业执照号)"></el-input>
                        </el-form-item>
                        <el-form-item label="证件过期时间">
                            <el-date-picker type="date" :disabled="true" v-model="endDate" placeholder="选择证件过期时间" style="width: 400px;"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="法定代表人姓名" prop="legalPerson">
                            <el-input size="small" :disabled="true" v-model="venInfoShop.legalPerson" class="xe-input-col3" placeholder="请输入法定代表人姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="法人身份证电子版">
                            <template v-if="venInfoShop.idcardBackPic || venInfoShop.idcardPic">
                                <a href="#" class="a-link" @click="lookPic(1)">查看</a>
                            </template>
                            <template v-else>无</template>
                        </el-form-item>
                        <el-form-item label="营业执照副本电子版">
                            <template v-if="venInfoShop.business">
                                <a href="#" class="a-link" @click="lookPic(2)">查看</a>
                            </template>
                            <template v-else>无</template>
                        </el-form-item>
                        <el-form-item label="商品销售区域" required prop="areaId">
                            <el-select
                                style="width: 400px; margin-right: 10px;"
                                size="small"
                                v-model="areaIds"
                                multiple
                                filterable
                                allow-create
                                @change="removeTag"
                                placeholder="请选择销售区域"
                                :disabled="allChina === 0"
                            >
                                <el-option
                                    v-if="allChina !== 0"
                                    v-for="item in options2"
                                    :key="item.areaId"
                                    :label="item.areaName"
                                    :value="item.areaId">
                                </el-option>
                            </el-select>
                            <el-checkbox v-model="allChina" :true-label="0" :false-label="1">全国</el-checkbox>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="m-store-item">
                <div class="m-title-con clearfix">
                    <h3 class="fl">结算银行</h3>
                </div>
                <div class="m-store-con">
                    <el-form ref="form" label-width="120px">
                        <el-form-item label="开户行">
                            {{venInfoShop.bankAccName}}
                        </el-form-item>
                        <el-form-item label="开户行支行名称">
                            {{venInfoShop.subAccBank}}
                        </el-form-item>
                        <el-form-item label="银行账号">
                            {{venInfoShop.bankAccCard}}
                        </el-form-item>
                        <el-form-item label="开户行支行联号">
                            {{venInfoShop.branchCode}}
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="m-store-item">
            <div class="m-title-con clearfix">
                <h3 class="fl">企业服务信息</h3>
            </div>
            <div class="m-store-con">
                <el-form ref="form" label-width="80px">
                    <el-form-item label="服务类型">
                        {{venInfoShop.comType}}
                    </el-form-item>
                    <el-form-item label="企业性质">
                        {{venInfoShop.venProperties}}
                    </el-form-item>
                    <el-form-item label="企业类型">
                        {{venInfoShop.comType}}
                    </el-form-item>
                </el-form>
            </div>
        </div>
        </div>
        <el-dialog
            class="el-pic-dialog"
            :visible.sync="idcardPic"
            @close="closeDialog"
        >
            <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in Pics" :key="item">
                    <img :src="picServer + item" alt="">
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import {Carousel, CarouselItem} from 'element-ui';
    import {zeroize} from 'utils';
    export default {
        data() {
            let checkcomPhone = (rule, value, callback) => {
                if (value && !(/^1(3|4|5|7|8)\d{9}$/.test(value))) {
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };
            let checkBusinessType = (rule, value, callback) => {
                if (!this.checkedLists.length) {
                    return callback(new Error('请至少选择一个主营业务'));
                } else {
                    callback();
                }
            };
            let checkAreaId = (rule, value, callback) => {
                if (!value.length) {
                    return callback(new Error('请至少选择一个销售区域'));
                } else {
                    callback();
                }
            };
            return {
                options2: '', // 地址数据
                selectedOptions2: [], // 地址数据
                renderFlag: false,
                venInfoLoading: false,
                picServer: '',
                comDesc: '',
                comDescFlag: false,
                comDescLoading: false,
                idcardPic: false,
                venInfoShop: {},
                createValue: '',
                endDate: '',
                categoryList: [], // 主营业务
                checkedLists: [], // 主营业务默认
                idPics: '',
                businessPic: '',
                Pics: '', // 查看照片
                allChina: 0,
                areaIds: [],
                rules: {
                    venName: [
                        { required: true, message: '请输入公司名称', trigger: 'blur' }
                    ],
                    apNum: [
                        {required: true, message: '请输入注册号(营业执照号)', trigger: 'blur'}
                    ],
                    legalPerson: [
                        {required: true, message: '请输入法定代表人姓名', trigger: 'blur'}
                    ],
                    businessType: [
                        {validator: checkBusinessType, trigger: 'blur'}
                    ],
                    areaId: [
                        {validator: checkAreaId, trigger: 'blur, change'}
                    ],
                    comPhone: [
                        {validator: checkcomPhone, trigger: 'blur'}
                    ]
                }
            };
        },
        created() {
            this.showShopInfo();
        },
        methods: {
            showShopInfo() {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/xeveninfoshop/showShopInfo',
                    data: {}
                }).then(res => {
                    console.log(res);
                    this.picServer = res.data.picServer;
                    this.venInfoShop = res.data.venInfoShop;
                    this.comDesc = this.venInfoShop.comDesc;
                    this.createValue = this.venInfoShop.comEstabDate ? new Date(this.venInfoShop.comEstabDate) : '';
                    this.endDate = this.venInfoShop.endDate ? new Date(this.venInfoShop.endDate) : '';
                    this.idPics = [this.venInfoShop.idcardPic, this.venInfoShop.idcardBackPic];
                    this.businessPic = [this.venInfoShop.business];
                    this.renderFlag = true;
                    this.allChina = this.venInfoShop.areaId[0] === 0 ? 0 : 1;
                    if (this.allChina === 0) {
                        this.areaIds = [];
                    } else {
                        this.areaIds = this.venInfoShop.areaId;
                    }
                    if (this.venInfoShop.provinceId && this.venInfoShop.cityId) {
                        this.selectedOptions2 = [this.venInfoShop.provinceId, this.venInfoShop.cityId];
                        console.log(this.selectedOptions2);
                        this.queryAreaListByParent(0, data => {
                            data.forEach(item => {
                                this.$set(item, 'cities', []);
                            });
                            this.options2 = data;
                            this.options2.some(item => {
                                if (item.areaId === this.venInfoShop.provinceId) {
                                    this.queryAreaListByParent(this.venInfoShop.provinceId, data => {
                                        this.$set(item, 'cities', data);
                                    });
                                    return true;
                                }
                            });
                        });
                    } else {
                        this.queryAreaListByParent(0, data => {
                            data.forEach(item => {
                                this.$set(item, 'cities', []);
                            });
                            this.options2 = data;
                        });
                    }
                    // 主营业务
                    this.queryCategoryListByParentId(0, data => {
                        console.log(data);
                        this.checkedLists = this.venInfoShop.businessType ? this.venInfoShop.businessType.split(',') : [];
                        this.categoryList = data;
                    });
                }).catch(error => {
                    console.log(error);
                });
            },
            lookPic(type) {
                if (type === 1) {
                    this.Pics = this.idPics;
                } else {
                    this.Pics = this.businessPic;
                }
                this.idcardPic = true;
            },
            closeDialog() {
                this.Pics = [];
            },
            newAddDesc() {
                this.comDescFlag = true;
            },
            updateShopInfo() {
                this.comDescLoading = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/xeveninfoshop/updateShopInfo',
                    data: {
                        'shopId': this.venInfoShop.shopId,
                        'comDesc': this.comDesc
                    }
                }).then(res => {
                    console.log(res);
                    this.comDescLoading = false;
                    this.comDescFlag = false;
                }).catch(error => {
                    console.log(error);
                });
            },
            handleItemChange(val) {
                console.log('active item:', val);
                let flag = false;
                console.log(this.options2);
                this.options2.some(item => {
                    if (item.areaId === val[0] && !item.cities.length) {
                        flag = true;
                        return true;
                    }
                });
                if (flag) {
                    this.queryAreaListByParent(val[0], (dataList) => {
                        this.options2.some(item => {
                            if (item.areaId === val[0]) {
                                item.cities = dataList;
                                return true;
                            }
                        });
                    });
                }
            },
            removeTag(val) {
                console.log(val);
                // 判断销售区域是否可删除
//                this.$http({
//                    method: 'post',
//                    url: '/xe-route/xe-erp/xeveninfoshop/checkSpuByArea',
//                    data: {
//                        areaId: val.currentValue
//                    }
//                }).then(res => {
//                    console.log(res);
//                }).catch(error => {
//                    console.log(error);
//                });
            },
            updateVenInfo() {
                // 修改商家信息
                this.$refs['venInfoForm'].validate((valid) => {
                    if (valid) {
                        this.venInfoLoading = true;
                        let params = {
                            'shopId': this.venInfoShop.shopId, // 店铺id  必传
                            'areaId': this.allChina === 0 ? [0] : this.areaIds,  // 销售区域id
                            'businessType': this.checkedLists.join(','),  // 主营类型id
                            'comEstabDate': this.createValueCom,  // 公司成立日期
                            'cityId': this.selectedOptions2.length ? this.selectedOptions2[1] : '',  // 所在地市 id
                            'comPhone': this.venInfoShop.comPhone,  // 公司电话
                            'provinceId': this.selectedOptions2.length ? this.selectedOptions2[0] : '',  // 所在地省  id
                            'venAddr': this.venInfoShop.venAddr,  // 详细地址
                            'registCapital': this.venInfoShop.registCapital   // 注册资本
                        };
                        this.$http({
                            method: 'post',
                            url: '/xe-route/xe-erp/xeveninfoshop/updateVenInfo',
                            data: params
                        }).then(res => {
                            console.log(res);
                            this.venInfoLoading = false;
                            this.$xeMessage.success('商家信息更新成功！');
                        }).catch(error => {
                            console.log(error);
                            this.venInfoLoading = false;
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            queryAreaListByParent(id, fn) {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proSpu/queryAreaListByParent',
                    data: {
                        areaId: id
                    }
                }).then(res => {
                    console.log(res);
                    fn && fn(res.data.areaList);
                }).catch(error => {
                    console.log(error);
                });
            },
            queryCategoryListByParentId(id, fn) {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proSpu/queryCategoryListByParentId',
                    data: {
                        parentId: id
                    }
                }).then(res => {
                    fn && fn(res.data.categoryList);
                }).then(error => {
                    console.log(error);
                });
            }
        },
        computed: {
            createValueCom() {
                if (!this.createValue) {
                    return '';
                } else {
                    let date = new Date(this.createValue);
                    return `${date.getFullYear()}-${zeroize(date.getMonth() + 1)}-${zeroize(date.getDate())}`;
                }
            }
        },
        watch: {
            'allChina'(val) {
                this.copyVal = [...val];
                if (val === 0) {
                    this.areaIds = [];
                }
            }
        },
        components: {
            'el-carousel': Carousel,
            'el-carousel-item': CarouselItem
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss"></style>
