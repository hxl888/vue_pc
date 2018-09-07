<style>

    .role-box *{
        box-sizing: border-box;
    }

    .role-search-panel{
        padding-bottom: 5px;
    }

    .role-unbind-numlabel{

        display: block;
        font-size: 12px;
        color: rgb(57, 57, 57);

    }
    .role-search-input{
        width: 100%;
        color: #858585;
        background-color: #fff;
        border: 1px solid #cacaca;
        padding: 5px 4px 6px;
        font-size: 12px;
        font-family: inherit;

    }

    .role-moveall-btn{
        display: inline-block;
        border: 1px solid #CCC;
        cursor: pointer;
        vertical-align: middle;
        font-weight: normal;
        text-align: center;
        touch-action: manipulation;
        white-space: nowrap;
        padding: 6px 12px;
        font-size: 14px;
        color: #444 !important;
        text-shadow: none !important;
        background-color: #FFF !important;
        height: 34px;
        width: 100%;
        border-bottom-width: 2px;
        outline: none;
    }

    .role-moveall-btn:hover{
        background-color: #EBEBEB !important;
        border-color: #CCC;
        color: #3a3434 !important;
    }

    .role-box-left, .role-box-right{
        display: inline-block;
        width: 352px;

    }

    .role-list-select{
        overflow-x: hidden;
        overflow-y: scroll;
        vertical-align: text-bottom;
        user-select: none;
        white-space: nowrap;
        width: 100%;
        background: #FFF;
        height: 323px !important;
        padding: 0;
        color: #858585;
        border: 1px solid #D5D5D5;
        font-size: 14px;
        outline: none;
    }

    .role-list-option{
        padding: 3px 4px 5px;
        outline: 0;
        color: #858585;
    }

    .role-list-option:hover,.role-list-option:active{

        background-color: #EEE;
        color: #444;
    }



</style>

<template>
    <div class="role-box">
        <div class="role-box-left">
            <div class="role-search-panel">
                <label class="role-unbind-numlabel">未绑定用户 共{{leftOptionData.length}}条</label>
                <input class="role-search-input" type="text" placeholder="检索" @input = "leftSearchChange">
            </div>
            <div>
                <button type="button" class="role-moveall-btn" @click="leftAllBtnClick">&gt&gt</button>
            </div>
            <div>
                <select class= "role-list-select" multiple="multiple" @click="leftSelect">
                    <option class="role-list-option" v-for = "item in leftOptionData" :value="item.id">{{item.userName}}({{item.loginName}})</option>
                </select>
            </div>
        </div>
        <div class="role-box-right">
            <div class="role-search-panel">
                <label class="role-unbind-numlabel">已绑定用户 共{{rightOptionData.length}}条</label>
                <input class="role-search-input" type="text" placeholder="检索" @input = "rightSearchChange">
            </div>
            <div>
                <button type="button" class="role-moveall-btn" @click="rightAllBtnClick">&lt&lt</button>
            </div>
            <div>
                <select class= "role-list-select" multiple="multiple" @click="rightSelect">
                    <option class="role-list-option" v-for = "item in rightOptionData" :value="item.id">{{item.userName}}({{item.loginName}})</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>

    export default{
        name: 'role-user-bind',
        props: {
            optionData: {
                type: Object,
                required: true
            },
            successCallback: {
                type: Function,
                required: true
            }
        },
        data() {
            return {
                leftOptionData: [],
                rightOptionData: []
            };
        },
        created() {
//            this.initData();
        },
        watch: {
            optionData(newData) {
                this.leftOptionData = [];
                this.rightOptionData = [];
                this.leftOptionData.viceData = [];
                this.rightOptionData.viceData = [];
                newData['leftData'].forEach((item) => {
                    if (item) {
                        this.leftOptionData.push(item);
                    }
                });

                newData['rightData'].forEach((item) => {
                    if (item) {
                        this.rightOptionData.push(item);
                    }
                });
                this.leftOptionData.viceData = this.leftOptionData.slice(0);
                this.rightOptionData.viceData = this.rightOptionData.slice(0);
            }
        },
        methods: {

            initData() {
                this.optionData['leftData'].forEach(function (item) {
                    this.leftOptionData.push(item);
                });
                this.optionData['rightData'].forEach(function (item) {
                    this.rightOptionData.push(item);
                });
                this.leftOptionData.viceData = this.leftOptionData.slice(0);
                this.rightOptionData.viceData = this.rightOptionData.slice(0);
            },
            leftSelect(event) {
                this.moveOption(event, this.leftOptionData, this.rightOptionData);
                this.successCallback(this.leftOptionData.viceData, this.rightOptionData.viceData);
            },
            rightSelect() {
                this.moveOption(event, this.rightOptionData, this.leftOptionData);
                this.successCallback(this.leftOptionData.viceData, this.rightOptionData.viceData);
            },
            leftAllBtnClick() {
                console.log(this.optionData);
                this.moveAllOption(this.leftOptionData, this.rightOptionData);
                this.successCallback(this.leftOptionData.viceData, this.rightOptionData.viceData);
            },
            rightAllBtnClick() {
                this.moveAllOption(this.rightOptionData, this.leftOptionData);
                this.successCallback(this.leftOptionData.viceData, this.rightOptionData.viceData);
            },
            leftSearchChange(event) {
                this.search(event, this.leftOptionData);
            },
            rightSearchChange(event) {
                this.search(event, this.rightOptionData);
            },
            search(event, searchData) {
                var searchValue = event.target.value;
                var reg = new RegExp(searchValue);
                searchData.splice(0);
                searchData.viceData.forEach((item) => {
                    if (reg.test(item.userName) || reg.test(item.loginName)) {
                        searchData.push(item);
                    }
                });
            },
            moveAllOption(fromArr, toArr) {
                fromArr.forEach((item) => {
                    toArr.push(item);
                    toArr.viceData.push(item);
                    fromArr.viceData = fromArr.viceData.filter((viceItem) => {
                        return viceItem !== item;
                    });
                });
                fromArr.splice(0);
            },
            moveOption(event, fromArr, toArr) {
                var selectArr = [];
                if (event.target.selectedOptions) {
                    selectArr = Array.from(event.target.selectedOptions);
                } else {
                    selectArr.push(event.target);
                }
                selectArr.forEach((selectItem) => {
                    var findItem = fromArr.find((item) => {
                        // debugger;
                        return selectItem.value === item.id;
                    });
                    if (findItem) {
                        fromArr.forEach((item, index) => {
                            // debugger;
                            if (item.id === findItem.id) {
                                fromArr.splice(index, 1);
                            };
                        });
                        fromArr.viceData = fromArr.viceData.filter((item) => {
                            return item !== findItem;
                        });
                        toArr.push(findItem);
                        toArr.viceData.push(findItem);
                    }
                });
//                解决选择后重复选择问题
                var tag = 'selectedIndex' in event.target ? event.target : event.target.parentNode;
                tag.selectedIndex = -1;
            }
        }
    };
</script>
