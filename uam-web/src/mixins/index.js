/**
 * Created by lovering on 2017/3/28.
 */
var mixin = {
    data: () => {
        return {
            // input 前面label的宽度
            xeLabelWidth: '100px',
            xePageSizes: [10, 20, 50, 100]
        };
    },
    methods: {
        disableUser(loginName, parm, url, callback) {
            this.$confirm(`确定禁用 ${loginName} 吗？`, {
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
                        this.$xeMessage({
                            type: 'success',
                            message: '禁用成功!'
                        });
                        callback();
                    } else {
                        _this.$message.error(res.message);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }).catch(() => {
                this.$xeMessage({
                    type: 'info',
                    message: '已取消'
                });
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
                        this.$xeMessage({
                            type: 'success',
                            message: '启用成功!'
                        });
                        callback();
                    } else {
                        _this.$message.error(res.message);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }).catch(() => {
                this.$xeMessage({
                    type: 'info',
                    message: '已取消'
                });
            });
        }

    }
};

export default mixin;
