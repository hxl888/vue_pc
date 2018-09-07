<template lang="html">
    <div class="refundJournal">
       <el-table
        v-if="refundJou && refundJou.length"
        :data="refundJou"
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
                prop="operator"
                label="操作人"
                min-width="90">
            </el-table-column>
            <el-table-column
                prop="ipAddress"
                label="操作IP"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="operatorTime"
                label="操作时间"
                min-width="120">
                <template scope="scope">
                    {{scope.row.operatorTime | millisecondFormat('ms')}}
                </template>
            </el-table-column>
            <el-table-column
                prop="logType"
                label="操作类型"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="operatorContent"
                show-overflow-tooltip
                label="操作内容"
                min-width="150">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: ['refundJou'],
        data() {
            return {
            };
        }
    };
</script>
