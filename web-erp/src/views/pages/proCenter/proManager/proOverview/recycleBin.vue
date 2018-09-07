<template lang="html">
    <div class="m-router-con recycleBin">
        <div class="u-top-search">
            <el-form ref="formData" :model="formData" :inline="true">
                <div class="refer">
                    <el-form-item prop="nameNum">
                        <el-input size="small" placeholder="输入商品名称／货号查询" class="xe-input-col2" v-model="formData.nameNum"></el-input>
                    </el-form-item>
                    <el-form-item prop="cateIds">
                        <categoryTag v-model='formData.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('formData')">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="statusLotChange(1)"><i class="iconfont icon-huanyuan"></i> 还原</el-button>
            <el-button class="xe-button-normal" @click="statusLotChange(2)"><i class="iconfont icon-shanchu"></i> 删除</el-button>
        </div>
        <!-- {{multipleSelection}} -->
        <el-table 
            ref="multipleTable"
            :data="list" 
            border 
            tooltip-effect="dark" 
            style="width: 100%" 
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="34" class-name="selectionTd"></el-table-column>
            <el-table-column label="图片" width="100">
                 <template scope="scope" class="imgs">
                      <div class="q-img">
                          <img :src="picServer + scope.row.skuList[0].proMainImg" alt="商品图片" width="60" height="60" class="imgs">
                       </div>
                 </template>
            </el-table-column>
            <el-table-column prop="proName" label="商品名称" width=""></el-table-column>
            <el-table-column prop="categoryName" label="商品分类" width="220"></el-table-column>
            <el-table-column prop="priceMethod" label="定价方式" width="160">
                <template scope="props">
                    {{props.row.priceMethod | priceMethods}}
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="150">
                <template scope="scope">
                    <el-button class="xe-button-normal" type="text" @click="statusChange(1, scope)">还原</el-button>
                    <el-button class="xe-button-normal" type="text" @click="statusChange(2, scope)" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-showbox">
            <div class="xe-pagination-panel">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.pageNum"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageInfo.pageSize"
                    layout="total, prev, pager, next, sizes, jumper"
                    :total="pageInfo.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import categoryTag from '@/components/category/category';
export default {
    name: 'recycleBin',
    data() {
        return {
            list: [],
            formData: {
                nameNum: '',
                cateIds: []
            },
            pageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            multipleSelection: [],
            picServer: ''
        };
    },
    created() {
        this.creatInf(1, this.formData);
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        onSubmit() {
            console.log('submit!');
            this.creatInf(1, this.formData);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.creatInf(this.pageInfo.pageNum, this.formData);
        },
        handleCurrentChange(val) {
            this.pageInfo.pageNum = val;
            this.creatInf(this.pageInfo.pageNum, this.formData);
        },
        statusChange(status, list) {
            let _this = this;
            let stautsObj = {};
            if (status === 2) {
                stautsObj.txtTips = '确定删除该条商品数据， 是否继续?';
                stautsObj.ajaxUrl = 'deleteVenProBatchFromRecycle';
            } else {
                stautsObj.txtTips = '确定还原该条商品数据， 是否继续?';
                stautsObj.ajaxUrl = 'restoreRecycleVenSpuBatch';
            }
            console.log('delet' + list.$index);
            this.$confirm(stautsObj.txtTips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proList/' + stautsObj.ajaxUrl,
                    data: {
                        spuArray: [{
                            proSpu: list.row.proSpu
                        }]
                    }
                }).then((res) => {
                    if (res.status === '0000') {
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.creatInf(_this.pageInfo.pageNum, _this.formData);
                        }, 300);
                    } else {
                        this.$xeMessage.warning(res.msg);
                    }
                }).catch((error) => {
                    this.$xeMessage.warning(error.msg);
                    console.log(error);
                });
            });
        },
        // deletLotSpu
        statusLotChange(status) {
            const _this = this;
            if (this.multipleSelection.length === 0) {
                this.$xeMessage.warning('请选择');
                return;
            }
            let stautsObj = {};
            if (status === 2) {
                stautsObj.txtTips = '确定删除选中的商品数据， 是否继续?';
                stautsObj.ajaxUrl = 'deleteVenProBatchFromRecycle';
            } else {
                stautsObj.txtTips = '确定还原选中的商品数据， 是否继续?';
                stautsObj.ajaxUrl = 'restoreRecycleVenSpuBatch';
            }
            this.$confirm(stautsObj.txtTips, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const spuArr = [];
                _this.multipleSelection.forEach(function(value) {
                    spuArr.push({
                        proSpu: value.proSpu
                    });
                });
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proList/' + stautsObj.ajaxUrl,
                    data: {
                        spuArray: spuArr
                    }
                }).then((res) => {
                    if (res.status === '0000') {
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.creatInf(_this.pageInfo.pageNum, _this.formData);
                        }, 300);
                    } else {
                        this.$xeMessage.warning(res.msg);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            });
        },
        creatInf(pageNum, formData) {
            let data = {};
            data = formData;
            data.pageNum = pageNum;
            data.cateId = this.cateId;
            data.pageSize = this.pageInfo.pageSize;
            console.log(this.formData);
            this.$http({ // 查询区域商品列表
                method: 'post',
                url: '/xe-route/xe-pro/ven/proList/listRecyclePro',
                data: formData
            }).then((res) => {
                if (res.data) {
                    this.list = res.data.list;
                    this.pageInfo = res.data.pageInfo;
                    this.picServer = res.data.picServer;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    computed: {
        cateId() {
            if (this.formData.cateIds.length > 0) {
                return this.formData.cateIds[this.formData.cateIds.length - 1];
            } else {
                return '';
            }
        }
    },
    filters: {
        priceMethods(val) {
            let pricesource = 'val';
            switch (val) {
                case 1: {
                    pricesource = '询报价';
                    break;
                }
                case 2: {
                    pricesource = '一口价';
                    break;
                }
                case 3: {
                    pricesource = '面议';
                    break;
                }
            }
            return pricesource;
        }
    },
    components: {
        categoryTag
    }
};
</script>

<style lang="scss">
</style>
