<template lang="html">
    <div class="m-router-con">
      <el-table ref="tableDatas" :data="tableDatas" border tooltip-effect="dark" style="width: 100%" >
          <el-table-column prop="channel" label="短信平台"></el-table-column>
          <el-table-column prop="sendTotalCount" label="全部已发送"></el-table-column>
          <el-table-column prop="successCount" label="已发送成功"></el-table-column>
          <el-table-column prop="failCount" label="已发送失败"></el-table-column>
          <!--<el-table-column prop="" label="待发送" min-width="30"></el-table-column>-->
          <el-table-column prop="balanceCount" label="剩余可用短信条数"></el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableDatas: []
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        querylist() {
            this.enquiryForm();
        },
        enquiryForm() {
            let params = {};
            this.$http({
                method: 'post',
                url: `/xe-route/xe-mis/manager/smsSendRecord/querySmsStatistics`,
                data: params
            }).then((res) => {
                console.log('----!!>', res);
                this.tableDatas = res.data.list;
            }).catch((error) => {
                console.log(error);
            });
        }
    }
};
</script>

<style lang="scss">
</style>
