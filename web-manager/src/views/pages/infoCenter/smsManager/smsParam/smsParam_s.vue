<template lang="html">
  <div class="m-router-con">
        <div class="u-top-search">
            <el-form ref="searchform" class="" :model="searchform" :inline=true>
                <el-form-item prop="paramCode">
                  <el-input placeholder="请输入参数编码" class="xe-input-col2" v-model="searchform.paramCode"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="enquiryForm">查询</el-button>
                  <el-button @click="resetForm('searchform')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
      <div class="u-opera-btnBox">
        <el-button @click="addnewBtn()"><i class="iconfont icon-xinzeng"></i>&nbsp;新增参数</el-button>
      </div>
    <el-table ref="tableDatas" :data="tableDatas" border tooltip-effect="dark" style="width: 100%" >
      <el-table-column prop="paramCode" label="参数编码" ></el-table-column>
      <el-table-column prop="paramName" label="参数名称" ></el-table-column>
      <el-table-column prop="paramValue" label="参数值" ></el-table-column>
      <el-table-column label="操作" width="65" fixed="right">
        <template scope="props">
          <div class="btn-in-table">
            <a href="javascript:;" class="s-blue" @click="editBtn(props.row, props.$index)">编辑</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="xe-pagination-panel">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagelist.pageNum"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pagelist.pageSize"
            layout="total, prev, pager, next, sizes, jumper"
            :total="pagelist.total">
        </el-pagination>
    </div>

    <!--新增短信参数弹框-->
    <el-dialog :title="alertTit" :visible.sync="dilogbut" class="reset-dialog dialog_wid340 error-tishi">
      <el-form ref="alertForm" :model="alertForm" :rules = rules label-width="70px">
        <el-form-item label="参数编码" prop="paramCode">
          <el-input class="xe-input-col2" :maxlength="30" v-model="alertForm.paramCode" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="参数名称" prop="paramName">
          <el-input class="xe-input-col2"  :maxlength="30" v-model="alertForm.paramName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="参数值" prop="paramValue">
          <el-input class="xe-input-col2"  :maxlength="30" v-model="alertForm.paramValue" placeholder=""></el-input>
        </el-form-item>
        <div class="el-dialog__footer">
          <el-button type="primary"  @click="addsubmit('alertForm')">保存</el-button>
          <el-button @click.stop="cancelReject">取 消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

  export default {
      data() {
          return {
              tableDatas: [],
              alertTit: '新增短信参数',
              dilogbut: false,
              editorBut: false, // 判断是否为编辑状态开关
              searchform: {
                  paramCode: ''
              },
              alertForm: {
                  paramCode: '',
                  paramName: '',
                  paramValue: ''
              },
              selectRow: {},
              selectIndex: '',
              pagelist: {
                  pageNum: 1,
                  pageSize: 10,
                  total: 0
              },
              rules: {
                  paramCode: [
                      { required: true, message: '参数编码不能为空', trigger: 'blur' }
                  ],
                  paramName: [
                      { required: true, message: '参数名称不能为空', trigger: 'blur' }
                  ],
                  paramValue: [
                      { required: true, message: '参数值不能为空', trigger: 'blur' }
                  ]
              },
              productUrl: '/xe-route/xe-mis'
//                productUrl: ''
          };
      },
      created() {
          this.enquiryForm();
      },
      methods: {
          resetForm(formName) {
              this.$refs[formName].resetFields();
              this.enquiryForm();
          },
          addnewBtn() {
              this.alertTit = '新增短信参数';
              this.dilogbut = true;
              this.editorBut = false;
              this.alertForm.paramCode = '';
              this.alertForm.paramName = '';
              this.alertForm.paramValue = '';
          },
          editBtn(row, index) {
              this.alertTit = '编辑短信参数';
              this.selectRow = row;
              this.dilogbut = true;
              this.editorBut = true;
              this.selectIndex = index;
              this.alertForm.paramCode = this.selectRow.paramCode;
              this.alertForm.paramName = this.selectRow.paramName;
              this.alertForm.paramValue = this.selectRow.paramValue;
          },
          preservation() {
              let params = {};
              let _this = this;
              params = this.alertForm;
              if (this.editorBut) {
                  params.paramId = this.selectRow.paramId;
              }
              this.$http({
                  method: 'post',
                  url: `${this.productUrl}/manager/smsTemplet/insertOrUpdateSmsParam`,
                  data: params
              }).then((res) => {
                  console.log('----!!>', res);
                  let tishi = '';
                  if (this.editorBut) {
                      tishi = '修改';
                      this.tableDatas[this.selectIndex].paramCode = this.alertForm.paramCode;
                      this.tableDatas[this.selectIndex].paramName = this.alertForm.paramName;
                      this.tableDatas[this.selectIndex].paramValue = this.alertForm.paramValue;
                      this.selectRow = null;
                  } else {
                      tishi = '新增';
                      setTimeout(() => {
                          _this.enquiryForm();
                      }, 300);
                  }
                  window.$wxeMessage({
                      type: 'success',
                      message: `${tishi}参数成功`
                  });
                  this.dilogbut = false;
              }).catch((error) => {
                  console.log(error);
              });
          },
          addsubmit(formName) {
              this.$refs[formName].validate((valid) => {
                  if (valid) {
                      this.preservation();
                  } else {
                      console.log('error submit!!');
                      return false;
                  }
              });
          },
          cancelReject() {
              this.dilogbut = false;
          },
          enquiryForm() {
              let params = {};
              params = this.searchform;
              params.pageNum = this.pagelist.pageNum;
              params.pageSize = this.pagelist.pageSize;
              this.$http({
                  method: 'post',
                  url: `${this.productUrl}/manager/smsTemplet/querySmsParamList`,
                  data: params
              }).then((res) => {
                  this.pagelist.total = res.data.pageInfo.total;
                  this.tableDatas = res.data.paramList;
              }).catch((error) => {
                  console.log(error);
              });
          },
          handleSizeChange(val) {
              this.pagelist.pageSize = val;
              this.enquiryForm();
          },
          handleCurrentChange(val) {
              if (val > 0) {
                  this.pagelist.pageNum = val;
                  this.enquiryForm();
              }
          }
      },
      watch: {
          dilogbut(n) {
              if (n === false) {
                  let _this = this;
                  setTimeout(() => {
                      _this.$refs.alertForm.resetFields();
                  }, 300);
              };
          }
      }
  };
</script>

<style lang="scss">
</style>
