<style>

    .xe-show-enter-active {
        transition: all 0.8s ease;
    }
    .xe-show-leave-active {
        transition: all 0.8s ease;
    }
    .xe-show-enter, .xe-show-leave-active {
        transform: translateX(10px);
        opacity: 0;
        /*height: 36px;*/
    }

    .xe-tree {
        border: none !important;
    }

</style>

<template>
    <div>
        <el-input
            placeholder="请选择"
            :readonly="readonly"
            icon="view"
            v-model="treeInputModel"
            :on-icon-click="handleIconClick">
        </el-input>
        <transition name="xe-show">
            <el-tree
                v-if="isShow"
                class="xe-tree"
                :data="newTreeData"
                :props="defaultProps"
                accordion
                :expand-on-click-node=false
                @node-click="handleNodeClick">
            </el-tree>
        </transition>
    </div>
</template>

<script>

    export default {
        props: {
            value: {
                type: String,
                default: ''
            },
            readonly: {
                type: Boolean,
                default: true
            },
            defaultDataId: {
                type: String
            },
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
                selectedData: [],
                defaultProps: {
                    children: 'children',
                    label: 'groupName'
                },
                isShow: false
            };
        },
        computed: {
            treeInputModel: {
                get() {
                    return this.value;
                },
                set(val) {
                    this.$emit('input', val);
                }
            }
        },
        created() {
            this.initSelectedData(this.defaultDataId);
            this.initModel();
            this.newTreeData = this.formatTreeData(this.treeData);
        },
        watch: {
            treeData(newData) {
                this.initSelectedData(this.defaultDataId);
                this.initModel();
                this.newTreeData = this.formatTreeData(this.treeData);
            }
        },
        methods: {
            handleNodeClick(data) {
                this.initSelectedData(data.id);
                this.initModel();
                this.isShow = false;
                if (this.successCallback) {
                    this.successCallback(this.selectedData);
                }
            },
            handleIconClick() {
                this.isShow = !this.isShow;
            },
            initModel() {
                var modelText = '';
                this.selectedData.forEach((item, index) => {
                    modelText += item.groupName;
                    if (index !== this.selectedData.length - 1) {
                        modelText += '>';
                    }
                });
                this.treeInputModel = modelText;
            },
            initSelectedData(groupId) {
                this.treeInputModel = '';
                this.selectedData = [];
                function findSelectedTreeData(treeData, id, selectedData) {
                    var findItem = treeData.find((item, index) => {
                        return item.id === id;
                    });
                    if (findItem) {
                        selectedData.unshift(findItem);
                        findSelectedTreeData(treeData, findItem.pId, selectedData);
                    }
                };

                findSelectedTreeData(this.treeData, groupId, this.selectedData);
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
                eachData(treeData, newTreeData, '');
                return newTreeData;
            }
        }
    };

</script>
