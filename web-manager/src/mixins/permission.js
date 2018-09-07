// import NProgress from 'nprogress'; // Progress 进度条
var permission = {
    data() {
        return {
            permissionDataList: null
        };
    }
    // beforeRouteEnter(to, from, next) {
    //     if (to.meta.level === 3) {
    //         const paramsUrl = to.path.replace('/pages', '');
    //         window.$axios({
    //             method: 'post',
    //             url: '/xe-route/xe-rms/menu/sysPower',
    //             data: {
    //                 url: paramsUrl
    //             }
    //         }).then(res => {
    //             next(vm => {
    //                 vm.permissionDataList = res.data.powerMap;
    //                 vm.permissionFilter = res.data.powerMap;
    //             });
    //         }).catch(error => {
    //             if (error.status !== 'xe404') {
    //                 window.$wxeMessage.error(error.msg);
    //                 next(false);
    //                 NProgress.done();
    //             } else {
    //                 next(false);
    //                 NProgress.done();
    //             }
    //         });
    //     } else {
    //         next();
    //     }
    // }
};
export default permission;
