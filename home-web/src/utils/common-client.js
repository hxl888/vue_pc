import Bus from 'src/vueBus.js';
export default class CommonClient {
    queryDataFn(type, url, param, _this) {
        _this.isDisabled = true;
        _this.loading = true;
        _this.$http({
            method: type,
            url: url,
            data: param
        }).then(function (res) {
            _this.isDisabled = false;
            _this.loading = false;
            if (!res.result.list.length) {
                _this.emptyText = '暂无数据';
            }
            _this.tableData = res.result.list;
            _this.pageInfo.pageNum = res.result.pageNum;
            _this.pageInfo.total = res.result.total;
            _this.pageInfo.pageSize = res.result.pageSize;
        }).catch(function (error) {
            console.log(error);
            _this.loading = false;
            _this.isDisabled = false;
            _this.emptyText = '请求失败,请重新刷新页面...';
        });
    }

    initPage(_this) {
        Bus.$on('pageStatus', function() {
            _this.pageInfo.total--;
            if (_this.pageInfo.pageNum > 1 && _this.pageInfo.pageNum <= _this.pageInfo.total) {
                _this.pageInfo.pageNum -= 1;
            } else {
                _this.pageInfo.pageNum = 1;
            }
            _this.queryDataFn();
        });
    }
    ajax(type, url, param, _this, successFunction) {
        if (!_this.isLoading) {
            _this.isLoading = true;
        }
        if (!_this.isDisabled) {
            _this.isDisabled = false;
        }
        _this.$http({
            method: type,
            url: url,
            data: param
        }).then(function (res) {
            _this.isDisabled = false;
            _this.loading = false;
            successFunction(res);
        }).catch(function (error) {
            console.log(error);
            _this.loading = false;
            _this.isDisabled = false;
            _this.emptyText = '请求失败,请重新刷新页面...';
        });
    };

    /**
     * 用于table删除某行
     * @param {Object} nav 提交url
     * @param callback
     */
    delModel(parameters) {
        let _this = this;
        let {param, index, rows, url, messages, iconType, confirmButtonText, cancelButtonText, title} = parameters;
        if (!messages) {
            messages = '你确定要删除吗?(删除后不可恢复!)';
        }
        if (!iconType) {
            iconType = 'warning';
        }
        if (!title) {
            title = '消息';
        }
        if (!confirmButtonText) {
            confirmButtonText = '确定';
        }
        if (!cancelButtonText) {
            cancelButtonText = '取消';
        }
        this.$xeMessageBox({
            title: title,
            message: messages,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            type: iconType,
            closeOnPressEscape: true,
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = '执行中...';
                    _this.$http.post(url, param)
                        .then(function(res) {
                            done();
                            setTimeout(() => {
                                instance.confirmButtonLoading = false;
                                rows.splice(index, 1);
                                if (!rows.length) {
                                    Bus.$emit('pageStatus');
                                }
                            }, 300);
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                } else {
                    done();
                }
            }
        }).then(action => {
            if (action === 'confirm') {
                _this.$xeMessage({
                    type: 'info',
                    message: '操作成功!'
                });
            }

            if (action === 'cancel') {
                _this.$xeMessage({
                    type: 'warning',
                    message: '取消操作!'
                });
            }
        });
    }
}
