<template lang="html">
    <el-form :model="importData">
        <div class="upload-box">
                <el-button class="xe-button-normal" size="small"><i class="iconfont icon-shangchuan"></i>&nbsp;&nbsp;点击上传</el-button>
                <div class="fileName">PDF文件1号 </div>
                <div>
                    <el-form-item label="" prop="">
                        <el-checkbox v-model="importData.rad">立即更新</el-checkbox>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="" prop="">
                        <el-checkbox v-model="importData.rad2">选择时间</el-checkbox>
                        <el-date-picker
                          v-model="dateone"
                          type="date"
                          placeholder="选择日期"
                          :default-value="new Date()"
                          :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
               </div>
        </div>
    </el-form>
</template>

<script>
    export default {
        name: 'introDalog',
        data() {
            return {
                dateone: '',
                datetwo: '',
                pickerOptions: '',
                importData: {
                    rad: '',
                    rad2: ''
                },
                fileList2: []
            };
        },
        methods: {
            // handlePreview() {},
            // handleRemove() {}
        }
    };
</script>

<style lang="scss">
    @import "../../../../../assets/styles/views/newFreightTemplates.scss";
</style>
