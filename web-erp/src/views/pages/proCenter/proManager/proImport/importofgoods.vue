<template lang="html">
    <div class="m-router-con">
        <!-- 导入日志&times;1 -->
        <div class="u-top-search u-with-timer">
        	<el-form 
                :inline="true" 
                :model="formData" 
                ref="formData" 
                class="demo-form-inline">
                <el-form-item prop="proName">
                    <el-input size="small" placeholder="商品名称/编号/货号/操作人" v-model="formData.proName"></el-input>
                </el-form-item><el-form-item prop="saleAreaIds">
                    <areaselectTag ajaxUrl='/xe-route/xe-pro/ven/proSpu/querySaleAreaListByUser' v-model='formData.saleAreaIds' :width="170"></areaselectTag>
                </el-form-item><el-form-item prop="modifyDate">
                    <el-date-picker
                        size="small" 
                        v-model="formData.modifyDate"
                        type="date"
                        @change="changemodifyDate"
                        class="search-timer"
                        placeholder="选择更新时间">
                    </el-date-picker>
                </el-form-item><el-form-item class="z-mr30" prop="createDate">
                    <el-date-picker
                        size="small" 
                        v-model="formData.createDate"
                        type="date"
                        class="search-timer"
                        @change="changecreateDate"
                        placeholder="选择上传时间">
                    </el-date-picker>
                </el-form-item><el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="search">
                        查询
                    </el-button>
                    <el-button class="xe-button-normal" @click="resetForm('formData')">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table
                :data="importList"
                border
                style="width: 100%">
                <el-table-column
                    label=""
                    class-name="td-index"
                    width="30">
                    <template scope="props">
                        <span>{{props.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="saleAreaName"
                    label="区域"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="proName"
                    label="商品名称"
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="specName"
                    label="规格"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="proNum"
                    label="货号"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="saleQuantity"
                    label="库存"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="areaPrice"
                    label="销售价／元"
                    width="100">
                    <template scope="props">
                        {{props.row.areaPrice | priceToText2}}
                    </template>
                </el-table-column>

                <el-table-column
                    prop="stepRange1"
                    label="阶梯一"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="stepPrice1"
                    label="价格／元"
                    width="90">
                    <template scope="props">
                        {{props.row.stepPrice1 | priceToText2}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stepRange2"
                    label="阶梯二"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="stepPrice2"
                    label="价格／元"
                    width="90">
                    <template scope="props">
                        {{props.row.stepPrice2 | priceToText2}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="stepRange3"
                    label="阶梯三"
                    width="90">
                </el-table-column>
                <el-table-column
                    prop="stepPrice3"
                    label="价格／元"
                    width="90">
                    <template scope="props">
                        {{props.row.stepPrice3 | priceToText2}}
                    </template>
                </el-table-column>

                <el-table-column
                    prop="modifyDate"
                    label="更新时间"
                    min-width="110"
                    class-name="time-limit"
                    width="">
                    <template scope="props">
                        <span>{{props.row.modifyDate | formatTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="上传时间"
                    min-width="110"
                    class-name="time-limit"
                    width="">
                    <template scope="props">
                        <span>{{props.row.createDate | formatTime}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="导入状态"
                    width="90">
                     <template scope="props">
                        <span>{{props.row.importStatus | importStatusFn}}</span>
                    </template>
                </el-table-column>
                 <el-table-column
                    prop="modifyUser"
                    label="操作人"
                    fix="right"
                    width="90">
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
    name: 'importofgoods',
    data() {
        return {
            formData: {
                proName: '',
                // saleAreaId: '',
                saleAreaIds: [],
                createDate: '',
                modifyDate: ''
            },
            pageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            importList: []
        };
    },
    created() {
        this.creatInf(1, this.formData);
    },
    methods: {
        search() {
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
        changemodifyDate(val) {
            this.formData.modifyDate = val;
        },
        changecreateDate(val) {
            this.formData.createDate = val;
        },
        creatInf(pageNum, formData) {
            let data = {};
            data = formData;
            data.saleAreaId = this.saleAreaId;
            data.pageNum = pageNum;
            data.pageSize = this.pageInfo.pageSize;
            console.log(data);
            this.$http({ // 查询区域商品导入
                method: 'post',
                url: '/xe-route/xe-pro/ven/proimport/getImportList',
                data: data
            }).then((res) => {
                this.importList = res.data.importList;
                this.pageInfo = res.data.pageInfo;
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    filters: {
        formatTime(val) {
            let date = new Date(val);
            let months = date.getMonth() + 1;
            let month = months > 10 ? months : '0' + months;
            let dates = date.getDate() > 10 ? date.getDate() : '0' + date.getDate();
            let hour = date.getHours() > 10 ? date.getHours() : '0' + date.getHours();
            let minute = date.getMinutes() > 10 ? date.getMinutes() : '0' + date.getMinutes();
            let seconds = date.getSeconds() > 10 ? date.getSeconds() : '0' + date.getSeconds();
            return date.getFullYear() + '-' + month + '-' + dates + ' ' + hour + ':' + minute + ':' + seconds;
        },
        importStatusFn(val) {
            let importStasource = 'val';
            switch (val) {
                case 1: {
                    importStasource = '成功';
                    break;
                }
                case 2: {
                    importStasource = '未执行';
                    break;
                }
                case 3: {
                    importStasource = '日志';
                    break;
                }
            }
            return importStasource;
        }
    },
    computed: {
        saleAreaId() {
            if (this.formData.saleAreaIds.length > 0) {
                return this.formData.saleAreaIds[this.formData.saleAreaIds.length - 1];
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
