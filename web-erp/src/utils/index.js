export function doExchange(arrays) {
    var len = arrays.length;
    if (len >= 2) {
        var len1 = arrays[0].length;
        var len2 = arrays[1].length;
        var newlen = len1 * len2;
        var temp = new Array(newlen);
        var index = 0;
        for (let i = 0; i < len1; i++) {
            for (let j = 0; j < len2; j++) {
                temp[index] = arrays[0][i] + ',' + arrays[1][j];
                index++;
            }
        }
        var newArray = new Array(len - 1);
        for (let i = 2; i < len; i++) {
            newArray[i - 1] = arrays[i];
        }
        newArray[0] = temp;
        return doExchange(newArray);
    } else {
        return arrays[0];
    }
};

// 获取输入文字长度
export function getTextLength(str) {
    if (!str) return 0;
    return str && str.replace(/[^\x00-\xff]/g, 'xx').length;
};

// 获取输入文字长度
export function isRepeat(arr) {
    let hash = {};
    for (var i in arr) {
        if (hash[arr[i]]) return true;
        hash[arr[i]] = true;
    }
    return false;
};

// 取出重复的值
export function duplicate(arr, flag = true) {
    let tmp = [];
    let tmp1 = [];
    let hash = {};
    for (var i in arr) {
        if (hash[arr[i]]) {
            tmp.push(arr[i]);
        } else {
            hash[arr[i]] = true;
            tmp1.push(arr[i]);
        }
    }
    if (flag) {
        return tmp;
    } else {
        return tmp1;
    }
};

// 检测对象是否是空对象(不包含任何可读属性)。
// 方法只检测对象本身的属性，不检测从原型继承的属性。
export function isOwnEmpty(obj) {
    for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
            return false; // 返回false，不为空对象
        }
    }
    return true; // 返回true，为空对象
};

// 检测对象内是否有某属性
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
};

function extend(to, _from) {
    for (let key in _from) {
        to[key] = _from[key];
    }
    return to;
};
// 对象合并
export function toObject(arr) {
    var res = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
};

function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
};
// deepCopy
function deepCopy(data) {
    const t = typeOf(data);
    let o;
    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }
    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}
export {deepCopy};

export function millisecondFormat(time, flag) {
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

export function zeroize(num) {
    return parseInt(num) > 10 ? parseInt(num) : '0' + parseInt(num);
}

// 解决js运算中浮点数的问题
/**
 *
 * @param f
 * @param digit
 * @returns {number}
 * 用法 -》formatFloat(141.3 * 100, 2)
 */
export function formatFloat(f, digit) {
    let m = Math.pow(10, digit); // Math.pow(x,y)返回 x 的 y 次幂的值
    return parseInt(f * m, 10) / m;
};
