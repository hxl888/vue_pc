<template lang='html'>
    <el-cascader
        size="small"
        :style="{'width': width + 'px'}"
        v-model='cateIds'
        :options='options'
        :change-on-select='changeOnSelect'
        :filterable='filterable'
        :props='props'
        placeholder="选择商品分类"
        @change='handleChange'>
    </el-cascader>
</template>

<script>
export default {
    name: 'categoryComponent',
    props: {
        value: {},
        width: {
            type: Number
        },
        changeOnSelect: {
            type: Boolean,
            default: false
        },
        filterable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            options: [],
            cateIds: [],
            props: {
                label: 'cateName',
                value: 'cateId',
                children: 'childList'
            }
        };
    },
    created() {
        this.getAllCategory();
    },
    watch: {
        value(val) {
            this.cateIds = this.value;
            console.log('testcateIds', this.cateIds);
        }
    },
    methods: {
        getAllCategory() {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/ven/proSpu/getAllCategory',
                data: {}
            }).then(res => {
                // console.log('分类');
                // console.log(res);
                this.options = res.data.categoryList;
            }).catch(error => {
                console.log(error);
            });
        },
        handleChange(val) {
            // 当绑定值变化时触发的事件
            console.log(val);
            this.$emit('input', val);
        }
    }
};
</script>
