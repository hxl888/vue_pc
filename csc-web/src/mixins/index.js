/**
 * Created by lovering on 2017/3/28.
 */
var mixin = {
    data: () => {
        return {
            // input 前面label的宽度
            xeLabelWidth: '100px'
        };
    },
    methods: {
        disableUser(loginName, parm, url, callback, delepre) {
            if (!delepre) {
                delepre = '禁用';
            }
            this.$confirm(`确定 ${delepre} ${loginName} 吗？`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var _this = this;
                _this.$http({
                    method: 'POST',
                    url: url,
                    data: parm
                }).then((res) => {
                    if (res.code === 200) {
                        // this.$xeMessage({
                        //     type: 'success',
                        //     message: `${delepre}成功!`
                        // });
                        callback();
                    } else {
                        // _this.$message.error(res.message);
                        this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$alert(err.message, '错误', {
                        confirmButtonText: '确定',
                        type: 'error'
                    });
                });
            }).catch(() => {
                // this.$xeMessage({
                //     type: 'info',
                //     message: '已取消'
                // });
            });
        },
        enableUser(loginName, parm, url, callback) {
            this.$confirm(`确定启用 ${loginName} 吗？`, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var _this = this;
                _this.$http({
                    method: 'POST',
                    url: url,
                    data: parm
                }).then((res) => {
                    if (res.code === 200) {
                        // this.$xeMessage({
                        //     type: 'success',
                        //     message: '启用成功!'
                        // });
                        callback();
                    } else {
                        // _this.$message.error(res.message);
                        this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }).catch(() => {
                // this.$xeMessage({
                //     type: 'info',
                //     message: '已取消'
                // });
            });
        },
        getcusSeleArr(Url, callback) {  // 公共select 获取数据调用
            let _this = this;
            _this.$http({
                method: 'POST',
                url: Url
            }).then((res) => {
                if (res.code === 200) {
                    callback(res);
                }
            }).catch((error) => {
                console.log('客户下拉列表', error);
            });
        },
        getRequestTableData(url, param, callback) {  // 公共表接口调用
            let _this = this;
            _this.$http({
                method: 'POST',
                url: url,
                data: param
            }).then((res) => {
                if (res.code === 200) {
                    // console.log('表单接口获取成功', res);
                    callback(res);
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
};

export default mixin;
