<template lang="html">
    <div class="m-router-con">
    	<div class="u-top-search">
        	<el-form :inline="true" :model="formDataUp" ref="formDataUp" class="demo-form-inline">
                <el-form-item prop="storeId" label="" id="storeName">
                    <el-select size="small" @change="savestoreType" v-model="formDataUp.storeId" placeholder="选择初始化仓库" :filterable="true" :disabled="disStoreNameList">
                        <template v-for="item in actionStoreList">
                            <el-option :label="item.storeName" :value="item.storeId"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="getGoodlist">
                <span class="iconfont icon-shangjia"></span> 选择初始化商品
            </el-button>
            <!-- <el-button class="xe-button-normal" @click="">
                <span class="iconfont icon-daochu"></span> 导出商品
            </el-button>
            <el-button class="xe-button-normal" @click="">
                <span class="iconfont icon-daoru"></span> 导入批量初始化
            </el-button> -->
            <el-button class="xe-button-normal" @click="saveProStore">
                <span class="iconfont icon-wancheng"></span> 完成初始化
            </el-button>
        </div>
        <div class="goodsTable">
            <!-- receiptDetailList: {{receiptDetailList}} -->
        	<el-table
                :data="receiptDetailList"
                border
                style="width: 100%">
                <el-table-column
                    label=""
                    class-name="td-index"
                    fixed="left"
                    width="30">
                    <template scope="props">
                        <span>{{props.$index + 1}}</span>
                    </template>
                </el-table-column>
	            <!-- <el-table-column 
                    type="selection" 
                    width="34"
                    fixed
                    class-name="selectionTd">
                </el-table-column> -->
                <el-table-column label="商品图片" width="100">
                    <template scope="props">
                        <div class="z-imgbox">
                            <img :src="picServer + props.row.proMainImg" alt="商品图片" width="60" height="60">
                        </div>
                    </template>
                </el-table-column>
	            <el-table-column prop="proSku" label="SKU编码" min-width="135"></el-table-column>
	            <el-table-column prop="proNum" label="商品货号" min-width="85"></el-table-column>
	            <el-table-column prop="proName" label="商品名称" min-width="85"></el-table-column>
                <el-table-column prop="proCategoryName" label="商品分类" min-width="120"></el-table-column>
                <el-table-column prop="pricingType" label="计量方式" width="85">
                    <template scope="scope">
                        {{scope.row.pricingType | pricingTypeToText}}
                    </template>
                </el-table-column>
                <el-table-column prop="proUnit" label="单位" width="65"></el-table-column>
                <el-table-column prop="specValue" label="规格" min-width="95">
                    <template scope="scope">
                        {{scope.row.specValue | noneToText}}
                    </template>
                </el-table-column>
                <el-table-column prop="storeName" label="仓库名称" min-width="85"></el-table-column>
                <el-table-column prop="" label="期初成本价" min-width="120">
                    <template scope="props">
                        {{props.row.batchPrice | priceToText}}
                    </template>
                </el-table-column>
                <el-table-column prop="" label="期初库存" min-width="120" fixed="right">
                    <template scope="props">
                        {{props.row.currentInNum}}
                    </template>
                </el-table-column>
	            <el-table-column
                    label="操作"
                    fixed="right"
                    width="110">
                    <template scope="props">
                        <div class="btn-in-table">
                            <a href="javascript:;" class="s-blue" @click="editBtn(props)">修改</a>
                            <a href="javascript:;" class="s-blue" @click="deletSingle(props)">删除</a>
                        </div>
                    </template>
                </el-table-column>
	        </el-table>
            <!-- <div class="page-showbox">
                <div class="xe-pagination-panel">
                    <el-pagination
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :current-page="xePageInfo.pageNum"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="xePageInfo.pageSize"
                        layout="total, prev, pager, next, sizes, jumper"
                        :total="xePageInfo.total">
                    </el-pagination>
                </div>
            </div> -->
        </div>
        <div class="add-fromKu reset-dialog">
            <el-dialog title="设置期初数据" :visible.sync="rowAlertVisible">
                <!-- {{formDataNum}} -->
                <el-form :model="formDataNum">
                    <el-form-item label="期初成本价" :label-width="xeLabelWidth80">
                        <el-input @blur="numberFix($event, 2, 1)" v-model.number="formDataNum.batchPrice" placeholder="请输入数字" class="zy-input-normal" :maxlength="8" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="期初库存" :label-width="xeLabelWidth80">
                        <el-input :disabled="storeType === 3 || storeType === 4" @input.native="numberFix($event, 0, 2)" :maxlength='8' v-model.number="formDataNum.currentInNum" placeholder="请输入数字" class="zy-input-normal" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="save()">保存</el-button>
                    <el-button @click="rowAlertVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 选择初始化库存列表 -->
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="选择初始化库存列表" :visible.sync="dialogVisible" size="">
                <div class="clearfix changeCate">
                    <div class="u-top-search">
                        <!-- {{formData}} -->
                        <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                            <el-form-item prop="proName">
                                <el-input placeholder="商品名称" v-model="formData.proName"></el-input>
                            </el-form-item><el-form-item prop="proNum">
                                <el-input placeholder="货号" v-model="formData.proNum"></el-input>
                            </el-form-item><el-form-item prop="proSku" class="z-mr30">
                                <el-input placeholder="SKU" v-model="formData.proSku"></el-input>
                            </el-form-item><el-form-item>
                                <el-button class="xe-button-normal" type="primary" @click="onSubmit">
                                    查询
                                </el-button><el-button class="xe-button-normal"  @click="resetForm('formData')">
                                    重置
                                </el-button>
                            </el-form-item>
                        </el-form>
                        <el-checkbox :label="true" disabled name="setFlag" v-model="formData.setFlag" style="line-height: 1;">只显示未设置库存数量的商品</el-checkbox>
                    </div>
                    <div class="clearfix">
                        <!-- {{tpmChoose}} -->
                        <div class="">
                            <el-table
                                :data="proSkuList"
                                border
                                style="width: 100%"
                                ref = "proListCoupon"
                                @selection-change="handleSelectionChange">
                                <el-table-column 
                                    type="selection" 
                                    width="34"
                                    class-name="selectionTd">
                                </el-table-column>
                                <el-table-column label="商品图片" width="100">
                                    <template scope="props">
                                        <div class="z-imgbox">
                                            <img :src="picServer + props.row.proMainImg" alt="商品图片" width="60" height="60">
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="proNum" label="商品货号" min-width="110"></el-table-column>
                                <el-table-column prop="proName" label="商品名称" min-width="110"></el-table-column>
                                <el-table-column prop="orgCodeName" label="商品分类" min-width="130"></el-table-column>
                                <el-table-column prop="pricingType" label="计量方式" min-width="85">
                                    <template scope="scope">
                                        {{scope.row.pricingType | pricingTypeToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="costPrice" label="期初成本价" min-width="130">
                                    <template scope="props">
                                        {{props.row.costPrice}}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="page-showbox">
                                <div class="xe-pagination-panel">
                                    <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="xePageInfo.pageNum"
                                        :page-sizes="[10, 20, 50, 100]"
                                        :page-size="xePageInfo.pageSize"
                                        layout="total, prev, pager, next, sizes, jumper"
                                        :total="xePageInfo.total">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="saveChoosed()">选中</el-button>
                    <el-button type="primary" @click="saveChoosed(0)">选中并关闭</el-button>
                    <el-button @click="dialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {deepCopy} from 'utils';
export default {
    data() {
        return {
            dialogVisible: false,
            rowAlertVisible: false,
            picServer: '',
            formDataUp: {
                storeId: ''
            },
            formDataNum: { // 设置期初数据
                proSku: '',
                batchPrice: '',
                currentInNum: '',
                index: ''
            },
            formData: { // 选择初始化库存列表搜索
                proName: '',
                cateIds: [],
                proNum: '',
                proSku: '',
                setFlag: true
            },
            defaultProps: {
                children: 'childList',
                label: 'cateName'
            },
            treeData: [],
            cateId: [],
            xePageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            storeType: '',
            disStoreNameList: false,
            proSkuList: [],
            receiptDetailList: [], // 库存初始化 商品入库
            actionStoreList: [], // 仓库的基本信息
            // tpmCommit: [], // 提交库存初始化选中
            tpmChoose: [] // 提交选中商品
        };
    },
    created() {
        this.loadqueryStore();
        this.creatListCate();
    },
    methods: {
        onSubmit() {
            this.creatInf(1, this.formData);
        },
        saveProStore() {
            if (this.receiptDetailList.length === 0) {
                this.$xeMessage.warning('请选择一个初始化仓库商品');
                return;
            }
            for (var i = 0; i < this.receiptDetailList.length; i++) {
                if (!(this.receiptDetailList[i].currentInNum >= 0)) {
                    this.$xeMessage.warning(this.receiptDetailList[i].proNum + '货号期初库存不能为空,请编辑后提交');
                    return false;
                }
                if (this.receiptDetailList[i].currentInNum === '') {
                    this.$xeMessage.warning(this.receiptDetailList[i].proNum + '货号期初库存不能为空,请编辑后提交');
                    return false;
                }
            }
            let receiptDetailListdata = {};
            receiptDetailListdata.storeId = this.formDataUp.storeId;
            receiptDetailListdata.userCode = this.receiptDetailList[0].userCode;
            receiptDetailListdata.storeName = $('#storeName .el-input__inner').val();
            receiptDetailListdata.receiptDetailList = this.receiptDetailList;
            this.$http({ // 商品入库
                method: 'post',
                url: '/xe-route/xe-erp/xeVenProSku/saveProStoreReceipt',
                data: receiptDetailListdata
            }).then((res) => {
                this.$xeMessage.success(res.msg);
                this.$router.go(0);
            }).catch((error) => {
                console.log(error);
            });
        },
        savestoreType(val) {
            console.log('sss', val);
            this.actionStoreList.forEach(item => {
                if (item.storeId === val) {
                    this.storeType = item.storeType;
                }
            });
        },
        save() {
            let batchPriceval = this.formDataNum.batchPrice;
            let currentInNumval = this.formDataNum.currentInNum;
            let proSkuval = this.formDataNum.proSku;
            if (this.storeType === 3 || this.storeType === 4) {
                if (!(batchPriceval > 0)) {
                    this.$xeMessage.warning('期初成本价不能小于等于0！');
                    return false;
                }
                if (!(currentInNumval >= 0)) {
                    this.$xeMessage.warning('期初库存不能小于0！');
                    return false;
                }
            } else {
                if (!(batchPriceval > 0)) {
                    this.$xeMessage.warning('期初成本价不能小于等于0！');
                    return false;
                }
                if (!(currentInNumval > 0)) {
                    this.$xeMessage.warning('期初库存不能小于等于0！');
                    return false;
                }
            }
            // console.log(this.formDataNum);
            this.$xeMessage.success('修改成功');
            this.rowAlertVisible = false;
            for (var i = 0; i < this.receiptDetailList.length; i++) {
                if (this.receiptDetailList[i].proSku === proSkuval) {
                    this.receiptDetailList[i].batchPrice = this.formDataNum.batchPrice;
                    this.receiptDetailList[i].currentInNum = this.formDataNum.currentInNum;
                    break;
                }
            }
        },
        numberFix(event, number, type) {
            let val = parseFloat(event.target.value);
            if (!(val >= 0)) {
                val = '';
            } else {
                val = val.toFixed(number);
            }
            event.target.value = val;
            if (type === 1) { // type是blur是event 钱没加上双向绑定的bug修复
                this.formDataNum.costPrice = val;
            }
            if (type === 2) {
                this.formDataNum.currentInNum = val;
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleSizeChange(val) {
            this.xePageInfo.pageSize = val;
            this.creatInf(this.xePageInfo.pageNum, this.formData);
        },
        handleCurrentChange(val) {
            this.xePageInfo.pageNum = val;
            this.creatInf(this.xePageInfo.pageNum, this.formData);
        },
        handleSelectionChange(val) {
            this.tpmChoose = deepCopy(val);
        },
        getGoodlist() {
            if (this.formDataUp.storeId === '') {
                this.$xeMessage.warning('请选择一个初始化仓库');
                return;
            }
            this.creatInf(1, this.formData);
            this.dialogVisible = true;
        },
        deletSingle(prop) {
            this.$confirm('确定要对该商品规格进行删除操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.receiptDetailList.splice(prop.$index, 1);
                this.$xeMessage.success('删除成功');
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        saveChoosed(type) {
            // this.dialogVisible = false;
            console.log('testChoose', 'testChoose');
            let saveChoose = this.tpmChoose;
            if (saveChoose.length === 0) {
                this.$xeMessage.warning('请先勾选需要初始化的商品');
                return;
            }
            let uniqObj = {};
            this.receiptDetailList.forEach(item => {
                uniqObj[item.proSku] = 1;
            });
            for (let i = 0; i < saveChoose.length; i++) {
                if (!uniqObj[saveChoose[i].proSku]) {
                    this.$set(saveChoose[i], 'currentInNum', '');
                    // this.$set(saveChoose[i], 'proCategoryId', saveChoose[i].cateId);
                    this.$set(saveChoose[i], 'storeName', $('#storeName .el-input__inner').val());
                    this.$set(saveChoose[i], 'proCategoryName', saveChoose[i].orgCodeName);
                    this.$set(saveChoose[i], 'batchPrice', saveChoose[i].costPrice);
                    this.$set(saveChoose[i], 'proPricingType', saveChoose[i].pricingType);
                    this.$set(saveChoose[i], 'proSepcValue', saveChoose[i].specValue);
                    this.$set(saveChoose[i], 'proCategoryId', saveChoose[i].orgCode);
                    this.$set(saveChoose[i], 'frozenFlag', saveChoose[i].forzenFlag);
                    this.receiptDetailList.push(saveChoose[i]);
                }
            };
            this.$refs.proListCoupon.clearSelection();
            if (type === 0) {
                this.dialogVisible = false;
            }
        },
        editBtn(props) {
            console.log('testprops', props);
            this.formDataNum.proSku = props.row.proSku;
            this.formDataNum.batchPrice = props.row.batchPrice;
            this.formDataNum.currentInNum = this.storeType === 4 || this.storeType === 3 ? 0 : props.row.currentInNum;
            this.formDataNum.index = props.$index;
            this.rowAlertVisible = true;
        },
        loadqueryStore() {
            let params = {
                storeStatus: 2,
                recordInventoryFlag: 1
            };
            this.$http({ // 查询仓库名称列表
                method: 'post',
                url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                data: params
            }).then((res) => {
                this.actionStoreList = res.data.actionList;
                console.log('actionStoreList', this.actionStoreList);
            }).catch((error) => {
                console.log(error);
            });
        },
        creatListCate() {
            this.$http({ // 查询区域商品列表
                method: 'post',
                url: '/xe-route/xe-pro/ven/proList/toListCate',
                data: {}
            }).then((res) => {
                if (res.data) {
                    this.treeData = res.data.list;
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        creatInf(pageNum, formData) {
            let data = {};
            data = formData;
            data.storeId = this.formDataUp.storeId;
            data.cateId = '';
            data.pageNum = pageNum;
            data.pageSize = this.xePageInfo.pageSize;
            console.log(data);
            this.$http({ // 查询仓库列表
                method: 'post',
                url: '/xe-route/xe-erp/xeVenProSku/queryXeVenProSkuList',
                data: data
            }).then((res) => {
                if (res.data) {
                    console.log('res=======', res);
                    this.proSkuList = res.data.proSkuList;
                    this.xePageInfo = res.data.xePageInfo;
                    this.picServer = res.data.picServer;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    watch: {
        receiptDetailList(val) {
            if (val.length > 0) {
                this.disStoreNameList = true;
            } else {
                this.disStoreNameList = false;
            }
        }
    }
};
</script>

<style lang="scss">
.changeCate{
    padding: 0 20px;
    margin: 20px 0;
}
.changeCateTitle{
    line-height: 36px;
    font-size: 14px;
    margin-top: 10px;
}
// .large-diaList{
//     padding: 20px;
// }
// .dialog-stock{
//     .goodsTableTree h4{
//         padding-left: 16px;
//     }
// }
</style>
