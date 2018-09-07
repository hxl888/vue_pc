<template lang='html'>
    <el-cascader
    :style="{'width': width + 'px'}"
    :value='value'
    :options='options'
    :change-on-select='changeOnSelect'
    :filterable='filterable'
    :props='props'
    placeholder="商品分类"
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
    methods: {
        getAllCategory() {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/ven/proSpu/getAllCategory',
                data: {}
            }).then(res => {
                // console.log('分类');
//                console.log('分类--->', res);
                this.options = res.data.categoryList;
            }).catch(error => {
                console.log(error);
            });
        },
        handleChange(val) {
            // 当绑定值变化时触发的事件
//            console.log(val);
            this.$emit('input', val);
        }
    }
};
</script>

<style lang='scss'>
</style>
