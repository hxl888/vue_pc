<style rel="stylesheet/scss" lang="scss">


</style>

<template>
    <el-tree
        :data="newTreeData"
        show-checkbox
        node-key="id"
        ref="tree"
        @check-change = "checkBoxClick"
        :props="defaultProps">
    </el-tree>
</template>

<script>

    export default {
        props: {
            treeData: {
                type: Array,
                required: true
            },
            successCallback: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                newTreeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            };
        },
        created() {

        },
        watch: {
            treeData(newData) {
                this.newTreeData = this.formatTreeData(newData);
            }
        },
        methods: {
            checkBoxClick() {
                if (this.successCallback) {
                    this.successCallback(this.$refs.tree.getCheckedNodes());
                }
            },
            formatTreeData(treeData) {
                var newTreeData = [];
                function eachData(treeData, newTreeData, id) {
                    treeData.forEach((item, index) => {
                        if (item.pId === id) {
                            newTreeData.push(item);
                            item.children = [];
                            eachData(treeData, item.children, item.id);
                        }
                    });
                }
                eachData(treeData, newTreeData, null);
                return newTreeData;
            }
        }
    };

</script>
