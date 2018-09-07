<style>

    .city-picker-box{

        width: 100%;
        height: 36px;
        line-height: 34px;
        text-align: left;
        border: 1px solid #bfcbd9;
        font-size: 12px;
        outline: none;
        user-select: none;
        position: relative;
        z-index: 5;
        box-sizing: border-box;
    }

    .city-picker-box ul, .city-picker-box dl, .city-picker-box li{

        margin: 0;
        padding: 0;
        list-style: none;
        font-size: 0;
        text-indent: 0px;
        line-height: normal;
        background-color: #f0f0f0;
    }

    .city-picker-box dl {
        background-color: #ffffff;
    }

    .city-picker-box a{

        display: inline-block;
        text-decoration: none;
        white-space:nowrap;
        color: #333;
        cursor: pointer;
        user-select: none;
        text-indent: 0px;
    }

    .city-picker-box a:hover{

        background-color:  #f1f8ff;
    }

    .city-selected-panel{

        display: inline-block;
        width: 100%;
        text-indent: 10px;
        outline: none;
    }

    .city-selected-panel a{
        display: inline;
        padding: 1px 2px;
        border-radius: 2px;
    }

    .city-selected-placeholder{

        color: #858585;
    }

    .fade-enter-active, .fade-leave-active {

        transition: all .5s;
    }

    .fade-enter, .fade-leave-active {

        opacity: 0;

    }

    .city-list-panel{

        width: 100%;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
        color: #2c3e50 !important;
    }

    .city-list-panel ul{

        border-bottom: 1px solid #ccc;
        position: relative;
    }

    .city-list-panel li{

        display: inline-block;
        padding: 5px 15px;
        font-size: 14px;
        border-left: 1px solid #ccc;
        cursor: pointer;
        color: #4D4D4D;
    }

    .city-list-panel li:nth-child(1){

        border-left: none;
    }

    .city-tabitem-selected{

        background-color: #fff !important;
        color: #46A4FF !important;
        position: relative;
        top: 1px;
    }

    .city-list-card{

        background-color: #fff;
        padding: 0 20px;
        position: relative;
    }


    .city-card-title,.city-card-item{

        margin: 0;
        padding: 0;
        text-indent: 0px;
        line-height: normal;
        font-size: 12px;
    }

    .city-card-title{

        position: absolute;
        left: 0px;
        text-align: center;
        padding: 3px 10px;
        color: #999;
        font-weight: 300;
    }

    .city-card-itemfirst{

        padding-left: 35px;
    }

    .city-card-item a{

        padding: 0 5px;
        margin: 3px 4px;
        border-radius: 2px;
        color: #333;

    }

    .city-carditem-selected{

        background-color: #46A4FF!important;
        color: #fff;
    }

    .city-clear-all{

        text-align: center;
    }

    .city-clear-all span{

        cursor: pointer;
    }

    .disabled {

        pointer-events: none;
        background: #eef1f6 !important;
        border-color: #d1dbe5;
        color: #bbb !important;
    }

    .disabled a {

        color: #bbb !important;

    }

    .city-prop-input {
        display: block !important;
    }

    .city-prop-input input{
        height: 0 !important;
        padding: 0;
        margin: 0;
        border: none;
    }

</style>

<template>
    <div class='city-picker-box' :class = '{disabled:readonly}' @blur.self = 'cityPickerBoxBlur' tabindex = '0'>
        <div ref = 'city-picker-box'>
        <span @click = 'selectedPanelClick'
              :class      = "[isPlaceholder ? 'city-selected-placeholder' : '','city-selected-panel']"
              v-html      = 'selectedHtml'
        >
        </span>
        </div>
        <transition name = 'fade'>

            <div class = 'city-list-panel' v-show = 'isListPanelShow' style='position: absolute;'>

                <ul>

                    <li v-for = '(tabItem,index) in tabItemDatas'
                        :class = "[tabItem['isSelected'] ? 'city-tabitem-selected' : '']"
                        :keyword = 'tabItem.keyword'
                        @click = 'tabItemClick'
                    >
                        {{tabItem['title']}}
                    </li>

                </ul>

                <div class='city-list-card'>

                    <dl v-html = 'listCardHtml' @click='cityItemClick'></dl>

                    <div class='city-clear-all'>

                        <span @click='clearAllBtnClick'>清空</span>

                    </div>
                </div>

            </div>

        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    //    import Cookies from 'js-cookie';

    export default {
        name: 'city-picker',
        props: {
            url: {
                type: String,
                required: true
            },
            options: {
                type: Object,
                default: () => {
                    return {
                        province: true,
                        city: true,
                        district: true,
                        street: true
                    };
                }
            },
            successCallback: {
                type: Function,
                required: true
            },
            defaultData: {
                type: Object
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                placeholder: '请选择',
                isPlaceholder: true,
                selectedHtml: '',
                listCardHtml: '',
                isListPanelShow: false,
                selectedDataArr: [],
                tabItemDatas: [
                    {title: '省份', isSelected: true, keyword: 'province', level: '省'},
                    {title: '城市', isSelected: false, keyword: 'city', level: '市'},
                    {title: '区县', isSelected: false, keyword: 'district', level: '区'},
                    {title: '街道', isSelected: false, keyword: 'street', level: '街道'}
                ]
            };
        },
        created() {
            this.tabItemDatas = this.tabItemDatas.filter((item) => {
                if (this.options[item.keyword]) {
                    this.placeholder += /^请选择$/.test(this.placeholder) ? item.level : '/' + item.level;
                    return true;
                }
                return false;
            });
            this.selectedHtml = this.placeholder;
            this.initDefaultSelectedHtml();
            this.requireData(this.tabItemDatas[0].keyword);
        },
        watch: {
            defaultData() {
                this.initDefaultSelectedHtml();
            }
        },
        methods: {
            initDefaultSelectedHtml() {
                if (this.defaultData) {
                    this.selectedDataArr = [];
                    for (var key in this.defaultData) {
                        this.selectedDataArr.push(this.defaultData[key]);
                    }
                    this.joinSelectedHtml();
                } else {
                    this.clearAllBtnClick();
                }
            },
            selectedPanelClick(event) {
                if (event.target.tagName === 'A') {
                    this.switchListPanel(true);
                    this.changeTabItem(event.target.getAttribute('data-keyword'));
                } else {
                    this.switchListPanel();
                }
            },
            cityPickerBoxBlur(event) {
                console.log(event);
                this.switchListPanel(false);
            },
            tabItemClick(event) {
                var selectedItem = event.target;
                this.changeTabItem(selectedItem.getAttribute('keyword'));
            },
            cityItemClick(event) {
                var cityItem = event.target;
                if (cityItem.tagName === 'A') {
                    var currKeyword = cityItem.getAttribute('data-keyword');
                    var currTabItemIndex = this.tabItemDatas.findIndex((item) => {
                        return item.keyword === currKeyword;
                    });
                    var nestTabItemIndex = currTabItemIndex + 1;
                    this.selectedDataArr[currTabItemIndex] = {
                        title: cityItem.getAttribute('data-address'),
                        code: cityItem.getAttribute('data-code'),
                        keyword: currKeyword
                    };
                    this.selectedDataArr.length = nestTabItemIndex;
                    this.isPlaceholder = false;
                    this.joinSelectedHtml();
                    this.tabItemDatas.forEach((item, index) => {
                        if (index > nestTabItemIndex) {
                            item.cardData = undefined;
                        }
                    });
                    if (currKeyword !== this.tabItemDatas[this.tabItemDatas.length - 1].keyword) {
                        var nextKeyword = this.tabItemDatas[nestTabItemIndex].keyword;
                        this.requireData(nextKeyword, cityItem.getAttribute('data-code'), () => {
                        });
                    } else {
                        this.switchListPanel();
                    }
                }
            },
            clearAllBtnClick() {
                this.selectedDataArr.length = 0;
                this.selectedHtml = this.placeholder;
                this.isPlaceholder = true;
                this.switchListPanel(false);
            },
            joinSelectedHtml() {
                this.selectedHtml = '';
                this.selectedDataArr.forEach((item, index) => {
                    if (index !== 0) {
                        this.selectedHtml += ' / ';
                    }
                    this.selectedHtml += `<a data-index = ${index} data-keyword = ${item.keyword}>${item['title']}</a>`;
                });
                if (this.selectedHtml === '') {
                    this.clearAllBtnClick();
                }
            },
            switchListPanel(switchType) {
                switchType === undefined ? this.isListPanelShow = !this.isListPanelShow : this.isListPanelShow = switchType;
                if (this.isListPanelShow) {
                    this.changeTabItem(this.tabItemDatas[0].keyword);
                } else {
                    this.successCallback(this.selectedDataArr);
                }
            },
            changeTabItem(changeKeyword) {
                this.tabItemDatas.forEach(function (item, index) {
                    item.keyword === changeKeyword ? item['isSelected'] = true : item['isSelected'] = false;
                });
                this.createListCardHtml(changeKeyword);
            },
            requireData(keyword, code, callback) {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: _this.url,
                    data: {type: keyword, code: code}
                }).then((res) => {
                    var currTabItemData = _this.tabItemDatas.find((item) => {
                        return item.keyword === keyword;
                    });
                    currTabItemData && (currTabItemData.cardData = res['result']);
                    callback && callback();
                    this.changeTabItem(keyword);
                }).catch((err) => {
                    _this.listCardHtml = err['message'];
                });

//                var xhr = new XMLHttpRequest();
//                xhr.onreadystatechange = () => {
//                    if (xhr.readyState === 4 && xhr.status === 200) {
//                        var responseData = JSON.parse(xhr.responseText);
//                        if (responseData.code === 200) {
//                            var currTabItemData = this.tabItemDatas.find((item) => {
//                                return item.keyword === keyword;
//                            });
//                            currTabItemData && (currTabItemData.cardData = responseData['result']);
//                            callback && callback();
//                            this.changeTabItem(keyword);
//                        } else {
//                            this.listCardHtml = responseData['message'];
//                        }
//                    }
//                };
//                xhr.open('POST', this.url);
//                xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
//                let token = '';
//                switch (process.env.NODE_ENV) {
//                    case 'production':
//                        token = 'Bearer ' + Cookies.get('PASS_TOKEN');
//                        break;
//                    case 'beta':
//                        token = 'Bearer ' + Cookies.get('PASS_TOKEN_BETA');
//                        break;
//                    case 'test':
//                        token = 'Bearer ' + Cookies.get('PASS_TOKEN_TEST');
//                        break;
//                    case 'devend':
//                        token = 'Bearer ' + Cookies.get('PASS_TOKEN_DEV');
//                        break;
//                    default:
//                        token = 'Bearer ' + Cookies.get('token');
//                }
//                xhr.setRequestHeader('Authorization', token);
//                xhr.send(JSON.stringify({type: keyword, code: code}));
            },
            createListCardHtml(switchType) {
                var listCardData = this.tabItemDatas.find((item) => {
                    return item.keyword === switchType;
                });
                var cardHtml = '';
                if (listCardData && listCardData.cardData) {
                    var selectedItem = this.selectedDataArr.find((item) => {
                        return item.keyword === switchType;
                    });
                    var selectedCode = selectedItem ? selectedItem.code : undefined;
                    if (listCardData.keyword === 'province') {
                        for (let key in listCardData.cardData) {
                            cardHtml += `<dt class='city-card-title'>${key}</dt>`;
                            cardHtml += "<dd class='city-card-item city-card-itemfirst'>";
                            listCardData.cardData[key].forEach((item) => {
                                const address = this.simplize(item['address'], listCardData.keyword);
                                const isSelectedClass = selectedCode === item['code'];
                                if (isSelectedClass) {
                                    cardHtml += `<a class = 'city-carditem-selected'
                                                 data-code = '${item['code']}'
                                                 data-address = '${item['address']}'
                                                 data-keyword = '${listCardData.keyword}'>
                                                 ${address}
                                                 </a>`;
                                } else {
                                    cardHtml += `<a data-code = '${item['code']}'
                                                 data-address = '${item['address']}'
                                                 data-keyword = '${listCardData.keyword}'>
                                                 ${address}
                                                 </a>`;
                                }
                            });
                            cardHtml += '</dd>';
                        }
                    } else {
                        cardHtml += "<dd class='city-card-item'>";
                        for (let key in listCardData.cardData) {
                            const address = this.simplize(listCardData.cardData[key], listCardData.keyword);
                            const isSelectedClass = selectedCode === key;
                            if (isSelectedClass) {
                                cardHtml += `<a class = 'city-carditem-selected'
                                             data-code = '${key}'
                                             data-address = '${listCardData.cardData[key]}'
                                             data-keyword = '${listCardData.keyword}'>
                                             ${address}
                                             </a>`;
                            } else {
                                cardHtml += `<a data-code = '${key}'
                                             data-address = '${listCardData.cardData[key]}'
                                             data-keyword = '${listCardData.keyword}'>
                                             ${address}
                                             </a>`;
                            }
                        }
                        cardHtml += '</dd>';
                    }
                } else {
                    let selectedItem = this.selectedDataArr.find((item) => {
                        return item.keyword === switchType;
                    });
                    if (selectedItem) {
                        this.requireData(selectedItem.keyword, selectedItem.code);
                    }
                }
                this.listCardHtml = cardHtml;
            },
            simplize(address, type) {
                address = address || '';
                if (type === 'province') {
                    return address.replace(/[省,市,自治区,壮族,回族,维吾尔]/g, '');
                } else if (type === 'city') {
                    return address.replace(/[市,地区]/g, '')
                        .replace('哈萨克', '').replace('自治州', '').replace(/自治县/, '');
                } else if (type === 'district') {
                    return address.length > 2 ? address.replace(/[市,区,县,旗]/g, '') : address;
                } else if (type === 'street') {
                    return address;
                }
            }
        }
    };
</script>
