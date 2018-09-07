<style rel="stylesheet/scss" lang="scss">

    .xe-menu-icon-panel {
        position: relative;
        li {
            display: inline-block;
            em {
                font-size: 18px !important;
                padding: 5px 10px;
            }
        }
    }

    .xe-input-icon-view {
        display: inline-block;
        position: absolute;
        height: 34px;
        line-height: 34px;
        width: 34px;
        /*text-align: center;*/
        top: 1px;
        left: 1px;
        padding-left: 8px;
        background-color: gainsboro;
        em {
            font-size: 18px !important;
        }
    }

    .xe-input-icon .el-input input {

        padding-left: 38px !important;
    }


</style>

<template>
    <div class="xe-input-icon">
        <!--<el-input-->
            <!--placeholder="请选择icon"-->
            <!--icon="plus"-->
            <!--v-model="iconModel"-->
            <!--@input="handleInput"-->
            <!--:readonly="readonly"-->
            <!--:on-icon-click="handleIconClick">-->
        <!--</el-input>-->
        <div class="el-input">
            <slot name="icon">
                <i class="el-input__icon"
                   :class="[
            'el-icon-' + icon,'is-clickable']"
                   v-if="icon"
                   @click="handleIconClick">
                </i>
            </slot>
            <input
                    class="el-input__inner"
                    :placeholder="placeholder"
                    :readonly="readonly"
                    :form="form"
                    :value="iconModel"
                    ref="input"
                    @focus="handleFocus"
                    @blur="handleBlur"
            >
        </div>
        <div class="xe-input-icon-view">
            <em class="xcms-iconfont" :class="'icon-' + iconModel"></em>
        </div>
        <div class="xe-menu-icon-panel" v-show="isIconPanelShow">
            <ul @click="iconClick">
                <li>
                    <em class="xcms-iconfont icon-fa-cubes"></em>
                </li>
                <li>
                    <em class="xcms-iconfont icon-fa-building"></em>
                </li>
                <li>
                    <em class="xcms-iconfont icon-fa-sliders"></em>
                </li>
                <li>
                    <em class="xcms-iconfont icon-fa-truck"></em>
                </li>
                <li>
                    <em class="xcms-iconfont icon-fa-fax"></em>
                </li>
                <li>
                    <em class="xcms-iconfont icon-fa-envelope"></em>
                </li>
                <li>
                    <em class="xcms-iconfont icon-fa-jsfiddle"></em>
                </li>
            </ul>
        </div>
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
            placeholder: String,
            form: String,
            icon: String,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                iconModel: this.value,
                isIconPanelShow: false,
                currIcon: 'icon-fa-building'
            };
        },
        created() {

        },
        watch: {
            value(val) {
                this.iconModel = val;
            }
        },
        methods: {

            handleIconClick() {
                if (!this.disabled) {
                    this.isIconPanelShow = !this.isIconPanelShow;
                }
            },
            iconClick() {
                this.iconModel = event.target.classList[1];
                this.isIconPanelShow = false;
                this.$emit('input', this.iconModel.slice(5));
            },
            handleBlur(event) {
                this.$emit('blur', event);
            },
            handleFocus(event) {
                this.$emit('focus', event);
            }
        }
    };

</script>
