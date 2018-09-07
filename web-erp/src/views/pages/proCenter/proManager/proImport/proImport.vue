<template lang="html">
    <div class="m-router-con">
        <div class="product-add">
            <div class="order-listbox">
                <div class="order-lis clearfix">
                    <span class="oder_ty">1</span>
                    <span class="add-cur active" @click.stop="setAreaCell"><i class="iconfont icon-xinzeng"></i>&nbsp;添加区域</span>
                    <span>添加导出商品模板的区域</span>
                </div>
                <div class="order-border"></div>
                <div class="order-lis clearfix">
                        <span class="oder_ty">2</span>
                         <!-- @click="dataExport" -->
                        <span class="add-cur active"><a :href="proPullout" target="_blank" style="color: #2480ff;"><i class="iconfont icon-daochumoban"></i>&nbsp;导出模板</a></span>
                        <span>导出所选区域下的模板</span>
                </div>
                <div class="order-border"></div>
                <div class="order-lis clearfix">
                        <span class="oder_ty">3</span>
                        <span class="add-cur active" @click.stop="showPullIn"><i class="iconfont icon-daorushangpin"></i>&nbsp;导入商品</span>
                        <span>导出修改过价格信息的商品模板</span>
                </div>
            </div>
            <div class="order-addresbox">
                <el-table
                    :data="orderAddresData"
                    border>
                    <el-table-column
                        prop=""
                        label="所选区域">
                        <template scope="scope">
                            <ul class="clearfix addres_content">
                                <li class="addres_lis fl">
                                    <el-tag
                                        class="freight-areaTag"
                                        v-for="(tag, index) in scope.row.areaTags"
                                        :key="tag.areaId">
                                        {{tag.areaName}}
                                    </el-tag>
                                </li>
                            </ul>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        width="250"
                        label="导出模板">
                        <template scope="scope">
                            共导出 <span class="blue08f">{{scope.row.total}}</span>条商品信息
                        </template>
                    </el-table-column>
                </el-table>
            </div>
              <!--查看按钮-->
            <div class="form_sub_btn">
                <el-button class="xe-button-normal" type="primary" @click="linktoList">查看商品导入记录</el-button>
            </div>
                <!--弹框-->
            <div class="m-router-con TemplatDilog reset-dialog">
                <el-dialog title="导入商品" :visible.sync="dialogFormVisible" ref="dialogFormVisible">
                        <!-- <el-form :model="importData"> -->
                        <div class="upload-box" style="position: relative;" v-loading="undataXls">
                                <form name='form1' id='formFile1' class="importXls">
                                    <input type="file" title="点击添加或修改" multiple name='xlsFiles' class='inputFile2' @change='inputFile2Fn("formFile1")' accept="application/msexcel">
                                </form>
                                <el-button class="xe-button-normal" size="small"><i class="iconfont icon-shangchuan"></i>&nbsp;&nbsp;点击上传</el-button>
                                <div class="fileName">{{Upfile}} </div>
                                <el-form :model="importData" style="margin-top: 7px;">
                                    <el-radio-group v-model="importData.radio2">
                                        <div>
                                            <el-form-item label="" prop="">
                                                <el-radio :label="1">立即更新</el-radio>
                                            </el-form-item>
                                        </div>
                                        <!-- {{importData.dateone}} -->
                                        <div>
                                            <el-form-item label="" prop="">
                                                <el-radio :label="0">选择时间</el-radio>
                                                <el-date-picker
                                                    style="width:250px!important"
                                                  v-model="importData.dateone"
                                                  @change="changeImportTime"
                                                  type="datetime"
                                                  placeholder="选择日期"
                                                  :picker-options="pickerOptions">
                                                </el-date-picker>
                                            </el-form-item>
                                       </div>
                                   </el-radio-group>
                               </el-form>
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <el-button class="xe-button-normal" v-loading='loading' type="primary" @click="setPreUpdateTime">保存</el-button>
                            <el-button class="xe-button-normal" @click="dialogFormVisible = false">取 消</el-button>
                        </div>
                </el-dialog>
            </div>
            <el-dialog class="el-tree-dialog" title="选择区域" :visible.sync="dialogTableVisible">
                <useAreaList ref="useAreaList" 
                    ajaxUrl="/xe-route/xe-pro/ven/proSpu/querySaleAreaListByUser"
                    :propKeys="{
                        id: 'areaId',
                        name: 'areaName',
                        ajaxParams: 'areaId', // 接口入参字符串
                        responseStr: 'saleAreaList' // 接口response字符串
                    }"
                ></useAreaList>
                <div style="margin-top: 20px; text-align: center;">
                    <el-button @click="treeSureBtn" type="primary">确定</el-button>
                    <el-button @click="dialogTableVisible = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
// import introDalog from './introDalog';
import useAreaList from 'components/useAreaList/useAreaList';
export default {
    data() {
        return {
            loading: false,
            undataXls: false,
            Upfile: '',
            importData: {
                dateone: '',
                radio2: 1
            },
            batch: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            dialogFormVisible: false,
            dialogTableVisible: false,
            proPullout: 'javascript:;',
            useArea: [],
            orderAddresData: [{
                areaTags: [],
                total: 0
            }]
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.dialogFormVisible.$data.rendered = true;
        });
    },
    methods: {
        linktoList(val) {
            this.$router.push({name: 'importofgoods'});
        },
        setAreaCell() {
            this.dialogTableVisible = true;
        },
        changeImportTime(val) {
            this.importData.dateone = val;
            console.log('test', this.importData.dateone);
        },
        setPreUpdateTime() {
            let param = {};
            if (!this.batch) {
                this.$xeMessage.warning('请导入商品');
                return false;
            }
            if (!this.importData.radio2 && !this.importData.dateone) {
                this.$xeMessage.warning('请选择更新时间');
                return false;
            }
            param.batchNo = this.batch;
            param.preUpdateTime = this.importData.radio2 ? 'now' : this.importData.dateone;
            this.loading = true;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/ven/proimport/setPreUpdateTime',
                data: param
            }).then(res => {
                console.log(res);
                this.$xeMessage.info(res.msg);
                this.loading = false;
                this.dialogFormVisible = false;
            }).catch(error => {
                this.loading = false;
                console.log(error);
            });
        },
        showPullIn() {
            this.dialogFormVisible = true;
            this.importData.dateone = new Date(new Date().getTime() + 86400000);
        },
        inputFile2Fn(id) {
            var formDatas = new FormData(document.getElementById(id));
            console.log('formDatas', formDatas);
            this.undataXls = true;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/ven/proimport/importVenProSpu',
                data: formDatas
            }).then(res => {
                console.log(res);
                this.Upfile = res.data.fileName;
                this.batch = res.data.batch;
                this.undataXls = false;
                this.$xeMessage.info('导入成功。');
            }).catch(error => {
                this.undataXls = false;
                console.log(error);
            });
        },
        treeSureBtn() {
            let resultData = this.$refs.useAreaList.getDataResult();
            this.useArea = resultData.resultIds;
            this.orderAddresData[0].areaTags = resultData.resultTexts;
            this.proPullout = '/xe-route/xe-pro/ven/proimport/exportVenProList?saleAreaIds=' + this.useArea.join(',');
            if (!this.useArea.length) {
                this.proPullout = 'javascript:;';
            }
            this.dialogTableVisible = false;
            this.$http({ // 导出商品
                method: 'post',
                url: '/xe-route/xe-pro/ven/proimport/countExportVenPro',
                data: {
                    saleAreaIds: this.useArea
                }
            }).then((res) => {
                console.log('test', res);
                this.orderAddresData[0].total = res.data.totalCount;
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    components: {
        // introDalog,
        useAreaList
    }
};
</script>

<style lang="scss">
      @import "../../../../../assets/styles/views/commodityIntroduction.scss";
</style>
