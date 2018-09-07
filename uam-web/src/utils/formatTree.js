/**
 * Created by lovering on 2017/4/8.
 */

export default (treeData) => {
    var newTreeDatas = [];
    var defaultExpandedKeys = [];
    var defaultCheckedKeys = [];
    function eachData(treeData, newTreeData, id) {
        treeData.forEach((item, index) => {
            var pid = item.hasOwnProperty('pId') ? item.pId : item.pid;
            if (pid === id) {
                item.label = item.name;
                newTreeData.push(item);
                if (item.open === true) {
                    defaultExpandedKeys.push(item.id);
                }
                if (item.checked === true) {
                    defaultCheckedKeys.push(item.id);
                }
                item.children = [];
                eachData(treeData, item.children, item.id);
            }
        });
    }

    function testDataType(parm) {
        return /object (\w+)/.exec(Object.prototype.toString.call(parm))[1];
    }

    if (testDataType(treeData) === 'Array') {
        eachData(treeData, newTreeDatas, '');
    } else {
        for (let key in treeData) {
            eachData(treeData[key], newTreeDatas, '');
        }
    }
    return {
        treeData: newTreeDatas,
        defaultExpandedKeys: defaultExpandedKeys,
        defaultCheckedKeys: defaultCheckedKeys
    };
};
