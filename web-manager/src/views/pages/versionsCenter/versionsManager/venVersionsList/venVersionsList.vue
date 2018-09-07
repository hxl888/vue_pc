<template lang="html">
  <div class="m-router-con">
    <div class="u-top-search">
        <el-form ref="searchform" :model="searchform" :inline="true">
              <el-form-item prop="venName">
                <el-input placeholder="商户名称" class="xe-input-l40" v-model="searchform.venName"></el-input>
              </el-form-item>
              <!-- <el-form-item prop="versionId">
                <el-input placeholder="版本id" class="xe-input-l40" v-model="searchform.versionId"></el-input>
              </el-form-item> -->
              <el-form-item prop="userCode">
                <el-input placeholder="商户id" class="xe-input-l40" v-model="searchform.userCode"></el-input>
              </el-form-item>
              <el-form-item prop="venAccount">
                <el-input placeholder="商户账号" class="xe-input-l40" v-model="searchform.venAccount"></el-input>
              </el-form-item>
              <div class="form_seachBut">
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                    <el-button @click="resetForm('searchform')">重置</el-button>
                </el-form-item>
              </div>
        </el-form>
     </div>
     <div class="u-opera-btnBox">
          <el-button class="xe-button-normal" @click="saveVenerAlot">
              <span class="iconfont icon-xiugai"></span> 批量修改版本
          </el-button>
          <!--<el-button class="xe-button-normal">-->
              <!--<span class="iconfont icon-daochu"></span> 导出-->
          <!--</el-button>-->
     </div>
     <div class="goodsTable">
          <el-table highlight-current-row style="width: 100%" border :data="venList" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="34" class-name="selectionTd">
              </el-table-column>
              <el-table-column label="商户ID"  min-width="100" prop="userCode">
              </el-table-column>
              <el-table-column label="账号"  min-width="100" prop="venAccount">
              </el-table-column>
              <el-table-column label="商户名称"  min-width="100" prop="venName">
              </el-table-column>
              <el-table-column label="版本状态"  min-width="100" prop="lockStatus">
                <template scope="props">
                    {{props.row.lockStatus | lockStatusToText}}
                </template>
              </el-table-column>
              <el-table-column label="版本名称"  min-width="100" prop="versionName">
              </el-table-column>
              <el-table-column label="操作" min-width="80">
                  <template scope="props">
                    <div class="btn-in-table">
                      <a href="javascript:;" class="s-blue" @click="editUser(props.row)">
                          分配版本
                      </a>
                    </div>
                  </template>
              </el-table-column>
          </el-table>
     </div>
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
    <el-dialog title="分配版本" :visible.sync="dilogbut1" class="reset-dialog dialog_wid700 error-tishi" @close="cancelReject">
        <div style="padding: 10px 20px 20px;">
            <h4 v-if="setVenerFlag === true" style="line-height: 24px;margin-bottom: 4px;font-size: 14px;">商户名称：{{rowTmp.venName}}</h4>
            <el-radio-group v-model="venInfo" style="width: 100%;">
                <el-table highlight-current-row style="width: 100%; margin-bottom: 10px;" ref="versionList" border :data="versionList">
                    <el-table-column
                        width="34"
                        class-name="selectionTd fontSizeHide">
                        <template scope="props">
                            <el-radio class="radio" :label='props.row'></el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column label="版本ID"  min-width="124" prop="versionId">
                    </el-table-column>
                    <el-table-column label="版本名称" min-width="172" prop="versionName">
                    </el-table-column>
                </el-table>
                <div class="el-dialog__footer">
                    <el-button type="primary"  @click="saveVener">保存</el-button>
                    <el-button @click.stop="cancelReject">取 消</el-button>
                </div>
            </el-radio-group>
        </div>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>

export default {
    data() {
        return {
            rowTmp: {},
            venInfo: {},
            dilogbut1: false,
            setVenerFlag: false,
            searchform: {
                venName: '',
                userCode: '',
                versionId: '',
                venAccount: ''
            },
            versionList: [],
            venList: [],
            pageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            multipleSelection: []
        };
    },
    computed: {
    },
    created() {
        this.enquiryForm(1, this.searchform);
    },
    methods: {
        onSubmit() {
            this.enquiryForm(1, this.searchform);
        },
        editUser(row) {
            this.rowTmp = row;
            this.loadVersionList(row, true);
        },
        loadVersionList(data) { // setVenerFlag true 需要回显
            this.$http({
                method: 'post',
                url: '/xe-route/xe-rms/erp/version/queryErpUseableList',
                data: {}
            }).then((res) => {
                console.log('res', res.data);
                this.versionList = res.data.versionList;
                this.setVenerFlag = false;
                if (data) {
                    this.setVenerFlag = true;
                    this.$nextTick(() => {
                        for (let i = 0; i < this.versionList.length; i++) {
                            if (data.versionId === this.versionList[i].versionId) {
                                this.venInfo = this.versionList[i];
                            }
                        };
                    });
                }
                this.dilogbut1 = true;
            }).catch((error) => {
                console.log(error);
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        saveVenerAlot() {
            if (!this.multipleSelection.length) {
                this.$xeMessage.warning('请选择一个商户');
                return false;
            }
            this.loadVersionList();
        },
        saveVener() {
            if (!this.venInfo.versionId) {
                this.$xeMessage.warning('请选择一个分配版本');
                return false;
            }
            let data = {};
            data.versionId = this.venInfo.versionId;
            data.userCodeList = [];
            if (this.setVenerFlag) {
                data.userCodeList = [this.rowTmp.userCode];
            } else {
                this.multipleSelection.forEach(item => {
                    data.userCodeList.push(item.userCode);
                });
            }
            this.$http({ // 查询用户登录历史记录
                method: 'post',
                url: '/xe-route/xe-rms/erp/version/modifyErpVersion',
                data: data
            }).then((res) => {
                let _this = this;
                this.$xeMessage.success(res.msg);
                setTimeout(function () {
                    _this.cancelReject();
                    _this.enquiryForm(_this.pageInfo.pageNum, _this.searchform);
                }, 300);
                // this.picServer = res.data.picServer;
            }).catch((error) => {
                console.log(error);
            });
        },
        cancelReject() {
            this.pageInfo = {};
            this.dilogbut1 = false;
        },
        // startDateFn(val) {
        //     this.startDates = val;
        //     this.value2 = this.value1;
        //     if (!this.value2) {
        //         this.value2 = this.value1;
        //     }
        // },
        // endDateFn(val) {
        //     this.endDates = val;
        //     if (!this.value1) {
        //         this.value1 = this.value2;
        //     }
        // },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.enquiryForm(1, this.searchform);
        },
        enquiryForm(pageNum, searchform) {
            let data = {};
            data = searchform;
            data.pageNum = pageNum;
            data.pageSize = this.pageInfo.pageSize;
            this.$http({ // 查询用户登录历史记录
                method: 'post',
                url: '/xe-route/xe-rms/erp/version/queryVenVerList',
                data: data
            }).then((res) => {
                this.venList = res.data.venList;
                this.pageInfo = res.data.pageInfo;
                // this.picServer = res.data.picServer;
            }).catch((error) => {
                console.log(error);
            });
        },
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.enquiryForm(this.pageInfo.pageNum, this.searchform);
        },
        handleCurrentChange(val) {
            this.pageInfo.pageNum = val;
            this.enquiryForm(this.pageInfo.pageNum, this.searchform);
        }
    }
};
</script>

<style lang="scss">
</style>
