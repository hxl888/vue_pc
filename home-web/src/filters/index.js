/**
 * 毫秒转换成日期
 *
 */
exports.millisecondFormat = function(time, flag) {
    if (typeof time === 'number') {
        var oDate = new Date(time);
        var year = oDate.getFullYear();
        var month = (oDate.getMonth() + 1) >= 10 ? oDate.getMonth() + 1 : '0' + (oDate.getMonth() + 1);
        var date = oDate.getDate() >= 10 ? oDate.getDate() : '0' + oDate.getDate();
        var hours = oDate.getHours() >= 10 ? oDate.getHours() : '0' + oDate.getHours();
        var minutes = oDate.getMinutes() >= 10 ? oDate.getMinutes() : '0' + oDate.getMinutes();
        var seconds = oDate.getSeconds() >= 10 ? oDate.getSeconds() : '0' + oDate.getSeconds();
        if (flag === 'ms') {
            return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
        } else {
            return `${year}-${month}-${date}`;
        }
    } else {
        return '无';
    }
};
