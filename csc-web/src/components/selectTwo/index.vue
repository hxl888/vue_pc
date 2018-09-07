<style rel="stylesheet/scss" lang="scss">

    .xe-select-menu {
        width: 100%;
        max-height: 200px;
        overflow-y: scroll;
        /*overflow-x:hidden !important;*/
        /*position: relative !important;*/
    }

    .xe-select-menu::-webkit-scrollbar {
        display: inline-table;
        width: 5px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
        opacity: 0.1;
    }

    .xe-loading-label {
        text-align: center;
    }

</style>

<template>
    <div class="el-select" v-clickoutside="handleClose">
        <el-input
            ref="reference"
            :icon="iconClass"
            :placeholder="placeholder"
            v-model="selectedLabel"
            @focus="handleFocus"
            @click="handleIconClick"
            @change="handleChange"
            @mousedown.native="handleMouseDown"
        >
        </el-input>
        <div ref="popper"
             class="el-select-dropdown xe-select-menu popperClass"
             v-show="visible"
        >
            <li v-for="(item,index) in options"
                class="el-select-dropdown__item"
                :class="{hover: currentHover == index, selected: currentSelected == item}"
                @mouseenter="hoverItem(index)"
                @click.stop="selectOptionClick(item, index)"
            >
                {{item}}
            </li>
            <div class="xe-loading-label" ref="loadingItem">{{message}}</div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Emitter from 'element-ui/src/mixins/emitter';
    import Clickoutside from 'element-ui/src/utils/clickoutside';
    import { addClass, removeClass, hasClass } from 'element-ui/src/utils/dom';
    export default {
        mixins: [Emitter],
        props: {
            url: String,
            value: {},
            disabled: Boolean,
            filterable: {
                type: Boolean,
                default: true
            },
            placeholder: {
                type: String
            }
        },
        data() {
            return {
                options: [],
                cachedOptions: [],
                selectedLabel: '',
                visible: false,
                currentPage: 0,
                isLoading: false,
                currentHover: -1,
                currentSelected: -1,
                isQuery: false,
                cachedScrollTop: 0,
                queryPage: 0,
                query: '',
                message: '加载中...',
                pageSize: 10,
                isSelected: false
            };
        },
        computed: {
            iconClass() {
                return 'caret-top';
            }
        },
        created() {

        },
        mounted() {
            this.handleScroll();
            this.queryData(this.currentPage);
        },
        directives: { Clickoutside },
        watch: {
            value(val) {
                this.selectedLabel = val;
            },
            visible(val) {
                if (!val) {
                    this.$refs.reference.$el.querySelector('input').blur();
                    this.handleIconHide();
                    this.currentHover = -1;
                    this.currentPage = 0;
                    this.options = [];
                    this.cachedOptions = [];
                    this.isQuery = false;
                    this.cachedScrollTop = 0;
                    this.queryPage = 0;
                    if (this.$refs.input) {
                        this.$refs.input.blur();
                    }
                    if (!this.isSelected) {
                        this.selectedLabel = '';
                        this.$emit('input', '');
                    }
                    this.dispatch('ElFormItem', 'el.form.blur', [this.selectedLabel]);
                } else {
                    this.handleIconShow();
                    this.queryData(this.currentPage);
                }
            },
            query(val) {
                if (val) {
                    this.options = [];
                }
            },
            options(val) {
                if (val.length < this.pageSize) {
                    this.message = '已没有更多数据...';
                };
            }
        },
        methods: {
            handleIconHide() {
                let icon = this.$el.querySelector('.el-input__icon');
                if (icon) {
                    removeClass(icon, 'is-reverse');
                }
            },

            handleIconShow() {
                let icon = this.$el.querySelector('.el-input__icon');
                if (icon && !hasClass(icon, 'el-icon-circle-close')) {
                    addClass(icon, 'is-reverse');
                }
            },
            handleFocus() {
                this.visible = true;
            },
            handleClose() {
                this.visible = false;
            },
            handleMouseDown(event) {
                if (event.target.tagName !== 'INPUT') return;
                if (this.visible) {
                    this.handleClose();
                    event.preventDefault();
                }
            },
            handleIconClick(event) {
                if (this.iconClass.indexOf('circle-close') > -1) {
                    this.deleteSelected(event);
                } else {
                    this.toggleMenu();
                }
            },
            toggleMenu() {
                if (this.filterable && this.query === '' && this.visible) {
                    return;
                }
                if (!this.disabled) {
                    this.visible = !this.visible;
                }
            },
            handleScroll() {
                let el = this.$refs['popper'];
                let loadingItem = this.$refs['loadingItem'];
                el.onscroll = () => {
                    if (el.scrollTop > loadingItem.offsetTop - 180 && !this.isLoading) {
                        this.isLoading = true;
                        if (this.isQuery) {
                            this.queryPage ++;
                            this.queryData(this.queryPage, this.query);
                        } else {
                            this.currentPage ++;
                            this.queryData(this.currentPage);
                        }
                    }
                };
            },
            queryData(page, query) {
                let _this = this;
                query ? this.query = query : '';
                let param = {
                    pageNum: page,
                    pageSize: _this.pageSize,
                    param: query
                };
                _this.message = '加载中...';
                _this.$http({
                    method: 'POST',
                    url: this.url,
                    data: param
                }).then((res) => {
                    if (res.result.list.length === 0) {
                        _this.message = '已没有更多数据...';
                    }
                    this.isLoading = false;
                    _this.options = _this.options.concat(res.result.list);
                    if (!_this.isQuery) {
                        _this.cachedOptions = _this.options;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            hoverItem(index) {
                this.currentHover = index;
            },
            selectOptionClick(option) {
                this.isSelected = true;
                this.selectedLabel = option;
                this.currentSelected = option;
                this.$emit('input', option);
                this.handleClose();
                this.dispatch('ElFormItem', 'el.form.change', option);
            },
            handleChange(val) {
                this.isSelected = false;
                this.currentSelected = -1;
                let el = this.$refs['popper'];
                if (val) {
                    this.isQuery = true;
                    if (this.cachedScrollTop === 0) {
                        this.cachedScrollTop = el.scrollTop;
                    }
                    this.queryData(this.queryPage, val);
                } else {
                    this.isQuery = false;
                    this.queryPage = 0;
                    this.options = this.cachedOptions;
                    this.$nextTick(() => {
                        el.scrollTop = this.cachedScrollTop;
                        this.cachedScrollTop = 0;
                    });
                }
            }
        }
    };

</script>
