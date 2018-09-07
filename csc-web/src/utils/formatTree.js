/**
 * Created by lovering on 2017/4/8.
 */

export default (treeData) => {
    var newTreeData = [];
    var defaultExpandedKeys = [];
    var defaultCheckedKeys = [];
    function eachData(treeData, newTreeData, id) {
        treeData.forEach((item, index) => {
            if (item.pId ? item.pId : item.pid === id) {
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
    eachData(treeData, newTreeData, '');
    return {
        treeData: newTreeData,
        defaultExpandedKeys: defaultExpandedKeys,
        defaultCheckedKeys: defaultCheckedKeys
    };
};
