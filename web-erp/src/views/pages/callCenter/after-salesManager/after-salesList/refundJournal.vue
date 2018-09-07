<template lang="html">
    <div class="refundJournal">
       <el-table
        :data="refundJournals"
        border
        style="width: 100%">
            <el-table-column
                prop=""
                label=""
                width="45">
                  <template scope="scope">
                        {{scope.$index + 1}}
                  </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="操作人"
                min-width="90">
            </el-table-column>
            <el-table-column
                prop=""
                label="操作IP"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop=""
                label="操作时间"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop=""
                label="操作类型"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop=""
                label="操作内容"
                min-width="150">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                refundJournals: [{}]
            };
        }
    };
</script>

<style lang="scss">
</style>
