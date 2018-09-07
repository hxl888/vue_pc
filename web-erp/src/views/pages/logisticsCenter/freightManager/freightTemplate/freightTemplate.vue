<template lang="html">
    <div class="m-router-con">
        <!-- 运费模版（物流系统） -->
    <!-- {{formData}} -->
        <div class="u-top-search">
        	<el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                <el-form-item  prop="fareName">
                    <el-input placeholder="输入运费模版名称" v-model="formData.fareName"></el-input>
                </el-form-item><el-form-item prop="fromCitys">
                    <areaselectTag v-model='formData.fromCitys' :width='170'></areaselectTag>
                    <!-- <el-select size="small" v-model="formData.fromCity" placeholder="选择始发地">
                        <el-option label="选择始发地" value=""></el-option>
                        <el-option label="区域一" value="999"></el-option>
                    </el-select> -->
                </el-form-item><el-form-item prop="pricingType">
                    <el-select size="small" v-model="formData.pricingType" placeholder="计价方式">
                        <el-option label="计价方式" value=""></el-option>
                        <el-option label="件" value="1"></el-option>
                        <el-option label="重量" value="2"></el-option>
                    </el-select>
                </el-form-item><el-form-item prop="shareFlag" class="z-mr30">
                    <el-select size="small" v-model="formData.shareFlag" placeholder="是否共享">
                        <el-option label="是否共享" value=""></el-option>
                        <el-option label="共享" value="1"></el-option>
                        <el-option label="不共享" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">
                        查询
                    </el-button><el-button class="xe-button-normal"  @click="resetForm('formData')">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="linktoAdd">
                <span class="iconfont icon-xinzeng"></span> 新增运费模版
            </el-button>
            <el-button class="xe-button-normal" @click="deletlot">
                <span class="iconfont icon-shanchu"></span> 批量删除
            </el-button>
        </div>
        <div>
            <el-table
                :data="listVenFare"
                style="width: 100%"
                @selection-change="handleSelectionChange"
                border>
                <el-table-column type="selection" width="34" class-name="selectionTd">
                </el-table-column>
                <el-table-column label="板块名称" prop="fareName">
                </el-table-column>
                <el-table-column label="始发地" class-name="areaTxt">
                    <template scope="props">
                        <p class="p-text" v-for="(item, index) in props.row.areasList">
                            <template v-if="index === props.row.areasList.length - 1">
                                {{item}}
                            </template>
                            <template v-else>
                                {{item}},
                            </template>
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="计价方式" prop="pricingType">
                    <template scope="props">
                        {{props.row.pricingType | pricingTypes}}
                    </template>
                </el-table-column>
                <el-table-column label="是否包邮" prop="fareMailFlag">
                    <template scope="props">
                        {{props.row.fareMailFlag | fareMailMethods}}
                    </template>
                </el-table-column>
                <el-table-column label="是否共享" prop="shareFlag">
                    <template scope="props">
                        {{props.row.shareFlag | shareMethods}}
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="110">
                    <template scope="props">
                        <div class="btn-in-table">
                            <a href="javascript:;" class="s-blue" @click="linktoEdit(props)">修改</a>
                            <a href="javascript:;" class="s-blue" @click="deletSingle(props.row)">删除</a>
                        </div>
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
    </div>
</template>

<script>
import areaselectTag from '@/components/areaSelect/areaSelect';
export default {
    name: 'shippingtemplates',
    data() {
        return {
            formData: {
                fareName: '',
                fromCitys: [],
                pricingType: '',
                shareFlag: ''
            },
            pageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            listVenFare: [],
            multipleSelection: []
        };
    },
    created() {
        this.creatInf(1, this.formData);
    },
    methods: {
        onSubmit() {
            console.log('submit!');
            this.creatInf(1, this.formData);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        delet(param) {
            var _this = this;
            this.$http({ // 删除运费 xe-route/xe-pro/
                method: 'post',
                url: '/xe-route/xe-pro/ven/fare/deleteFareTemplate',
                data: {
                    tempNums: param
                }
            }).then((res) => {
                if (res.status === '0000') {
                    this.$xeMessage.success(res.msg);
                    setTimeout(function () {
                        _this.creatInf(_this.pageInfo.pageNum, _this.formData);
                    }, 300);
                }
            }).catch((error) => {
                if (error.status === '0001') {
                    this.$xeMessage.warning(error.msg);
                }
            });
        },
        deletSingle(row) {
            this.$confirm('确定删除该条运费信息？是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delet([row.tempNum]);
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        deletlot() {
            const _this = this;
            if (this.multipleSelection.length === 0) {
                this.$xeMessage.warning('请选择');
                return;
            }
            const tempNumsArr = [];
            _this.multipleSelection.forEach(function(value) {
                tempNumsArr.push(value.tempNum);
            });
            this.$confirm('确定删除选中的运费信息？是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.delet(tempNumsArr);
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        toAdd() {
            this.$router.push({name: 'newFreightTemplates'});
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        linktoEdit(val) {
            this.$router.push({name: 'editorFreightTemplates', query: {tempNum: val.row.tempNum}});
        },
        linktoAdd(val) {
            this.$router.push({name: 'newFreightTemplates'});
        },
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.creatInf(this.pageInfo.pageNum, this.formData);
        },
        handleCurrentChange(val) {
            this.pageInfo.pageNum = val;
            this.creatInf(this.pageInfo.pageNum, this.formData);
        },
        creatInf(pageNum, formData) {
            let data = {};
            data = formData;
            data.fromCity = this.fromCity;
            data.pageNum = pageNum;
            data.pageSize = this.pageInfo.pageSize;
            console.log(this.formData);
            this.$http({ // 查询商品运费列表
                method: 'post',
                url: '/xe-route/xe-pro/ven/fare/listVenFare',
                data: data
            }).then((res) => {
                console.log(res);
                if (res.data) {
                    this.listVenFare = res.data.listVenFare;
                    this.pageInfo = res.data.pageInfo;
                    for (var i = 0; i < this.listVenFare.length; i++) { // 处理始发地数据
                        if (this.listVenFare[i].fromCityStr !== null) {
                            this.$set(this.listVenFare[i], 'areasList', this.listVenFare[i].fromCityStr.split(','));
                        }
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    filters: {
        pricingTypes(val) {
            let pricingsource = '';
            switch (val) {
                case 1: {
                    pricingsource = '件';
                    break;
                }
                case 2: {
                    pricingsource = '重量';
                    break;
                }
            }
            return pricingsource;
        },
        fareMailMethods(val) {
            let fareMailsource = '';
            switch (val) {
                case 1: {
                    fareMailsource = '包邮';
                    break;
                }
                case 2: {
                    fareMailsource = '不包邮';
                    break;
                }
            }
            return fareMailsource;
        },
        shareMethods(val) {
            let sharesource = '';
            switch (val) {
                case 1: {
                    sharesource = '共享';
                    break;
                }
                case 2: {
                    sharesource = '不共享';
                    break;
                }
            }
            return sharesource;
        }
    },
    computed: {
        fromCity() {
            if (this.formData.fromCitys.length > 0) {
                return this.formData.fromCitys[this.formData.fromCitys.length - 1];
            } else {
                return '';
            }
        }
    },
    components: {
        areaselectTag
    }
};
</script>

<style lang="scss">
</style>
