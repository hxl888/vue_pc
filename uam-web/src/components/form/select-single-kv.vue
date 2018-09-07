<template lang="html">
    <el-form-item :label="labelName" :prop="propParam">
        <el-select v-model="model" placeholder="请选择" @change="onChange">
            <el-option
                v-for="item in resultDataList"
                :label="item.value"
                :value="item.key">
            </el-option>
        </el-select>
    </el-form-item>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            labelName: {
                type: String,
                required: true
            },
            ajaxUrl: {
                type: String,
                required: true
            },
            successFunction: {
                type: Function,
                required: true
            },
            dataParam: {
                type: String,
                required: true
            },
            propParam: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                loading: false,
                emptyText: '暂无数据',
                resultDataList: [],
                model: {}
            };
        },
        mounted() {
            this.getResultListFn();
        },
        watch: {
            dataParam: function () {
                this.model = this.dataParam;
            }
        },
        methods: {
            onChange() {
                this.successFunction(this.model);
            },
            getResultListFn() {
                let _this = this;
                this.$http({
                    method: 'post',
                    url: _this.ajaxUrl
                }).then(function (res) {
                    _this.loading = false;
                    if (!res.result.length) {
                        _this.emptyText = '暂无数据';
                    }
                    _this.resultDataList = res.result;
                }).catch(function (error) {
                    console.log(error);
                    _this.loading = false;
                    _this.emptyText = '请求失败,请重新刷新页面...';
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
