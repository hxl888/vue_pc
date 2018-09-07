<template lang="html">
    <div class="m-router-con">
        <div class="addNew-box basenewprop">
            <el-form :model="addformData" ref="addformData" :rules="rules" :label-width="xeLabelWidth66">
                <el-form-item label="属性名称" prop="typeName">
                  <el-input v-model="addformData.typeName" class="xe-input-col3 xe-input-col3p" :maxlength="20" auto-complete="off"></el-input>
                  <span>&nbsp;&nbsp;数字／英文／汉字，限制1-20个字</span>
                </el-form-item>
                <el-form-item label="备注" class="text_area" prop="typeDesc">
                  <el-input
                        name='typeDesc'
                        class="xe-input-col3"
                        type="textarea"
                        autosize
                        placeholder="请输入内容"
                        v-model="addformData.typeDesc">
                    </el-input>
                  <!--<span class="last-num">0/500</span>-->
                  <span class="last-num" :class="{'error': isError}">{{descTextLength}}/500</span>
                </el-form-item>
                <div>
                    <div class="add-extend-atb">
                      <span @click="addextendedAttributes"><i class="iconfont icon-xinzeng"></i>&nbsp;添加扩展属性</span>
                      &nbsp;&nbsp;&nbsp;&nbsp;<i style="color: #687281">填写属性名称和属性值时，不能含有“-”</i>
                    </div>
                    <div class="extendData">
                          <el-table
                            :data="extendData1"
                            border>
                                <el-table-column
                                  label="属性名称"
                                  prop="key1"
                                  width="130">
                                    <template scope="scope">
                                         <el-input :maxlength="20" v-model.trim="scope.row.propertyName"  @blur="propertyNameck(extendData1)" class="xe-input-smal90" auto-complete="off"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                  prop="key2"
                                  label="属性值">
                                     <template scope="scope">
                                        <div class="atribute-val">
                                              <!--<span class="atri_lis" v-for="(item, index) in scope.row.list">{{item.key}} &nbsp;&nbsp;<i class="iconfont">&times;</i></span>
                                              <el-input v-model="scope.row.name" class="xe-input-smal90" auto-complete="off"></el-input>
                                              <span class="add_newAtr"><i class="iconfont icon-zengjia"></i></span>-->
                                            <el-tag
                                                :key="tag"
                                                v-for="tag in scope.row.propertyValue"
                                                :closable="true"
                                                :close-transition="false"
                                                @close="handleClose1(tag, scope.$index)"
                                            >
                                                {{tag}}
                                            </el-tag>
                                            <el-input
                                                class="xe-input-smal90"
                                                v-if="scope.row.inputVisible"
                                                v-model.trim="scope.row.inputValue"
                                                ref="saveTagInput"
                                                auto-complete="off"
                                                size="mini"
                                                :maxlength="20"
                                                @keyup.enter.native="handleInputConfirm1(scope.$index)"
                                                @blur="handleInputConfirm1(scope.$index)"
                                            >
                                            </el-input>
                                            <span v-else class="add_newAtr" @click="showInput1(scope.$index)"><i class="iconfont icon-zengjia"></i></span>
                                        </div>
                                     </template>
                                </el-table-column>
                                <el-table-column
                                    prop=""
                                    label="是否筛选项"
                                    type=""
                                    width="100">
                                    <template scope="scope">
                                        <div style="text-align: center">
                                            <el-checkbox v-model="scope.row.searchFlag"></el-checkbox>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                  prop=""
                                  label="操作"
                                  width="70">
                                      <template scope="scope">
                                          <span class="blue08f" @click="deleteRow(extendData1, scope.$index)">删除</span>
                                      </template>
                                </el-table-column>
                          </el-table>
                    </div>
                    <div class="add-extend-atb">
                      <span @click="addSpecifications"><i class="iconfont icon-xinzeng"></i>&nbsp;添加规格</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;<i style="color: #687281">填写规格名称和规格值时，不能含有“-”</i>
                    </div>
                    <div class="extendData">
                        <el-table
                          :data="extendData2"
                          border>
                              <el-table-column
                                label="规格名称"
                                prop="key1"
                                width="130">
                                  <template scope="scope">
                                      <el-input :maxlength="20" v-model.trim="scope.row.specName" @blur="propertyNameck(extendData2)" class="xe-input-smal90" auto-complete="off"></el-input>
                                  </template>
                              </el-table-column>
                              <el-table-column
                                prop="key2"
                                label="规格值">
                                      <template scope="scope">
                                          <div class="atribute-val">
                                              <!--<span class="atri_lis" v-for="(item, index) in scope.row.list">{{item.key}} &nbsp;&nbsp;<i class="iconfont">&times;</i></span>
                                              <el-input v-model="scope.row.name" class="xe-input-smal90" auto-complete="off"></el-input>
                                              <span class="add_newAtr"><i class="iconfont icon-zengjia"></i></span>-->
                                              <el-tag
                                                  :key="tag"
                                                  v-for="tag in scope.row.specValue"
                                                  :closable="true"
                                                  :close-transition="false"
                                                  @close="handleClose2(tag, scope.$index)"
                                              >
                                                  {{tag}}
                                              </el-tag>
                                              <el-input
                                                  class="xe-input-smal90"
                                                  v-if="scope.row.inputVisible"
                                                  v-model.trim="scope.row.inputValue"
                                                  ref="saveTagInput"
                                                  auto-complete="off"
                                                  size="mini"
                                                  :maxlength="20"
                                                  @keyup.enter.native="handleInputConfirm2(scope.$index)"
                                                  @blur="handleInputConfirm2(scope.$index)"
                                              >
                                              </el-input>
                                              <span v-else class="add_newAtr" @click="showInput2(scope.$index)"><i class="iconfont icon-zengjia"></i></span>
                                          </div>
                                      </template>
                              </el-table-column>
                            <el-table-column
                                prop=""
                                label="操作"
                                width="70">
                                <template scope="scope">
                                    <span class="blue08f" @click="deleteRow(extendData2, scope.$index)">删除</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!--<el-form-item label="" class="checksure" prop="">-->
                     <!--<el-checkbox v-model="addformData.normalFlag">设为标准扩展属性</el-checkbox>-->
                <!--</el-form-item>-->
                <div class="dialog-footer">
                    <el-button type="primary" :loading="saveLoading" @click="Preservation()">保存</el-button>
                    <el-button @click="goBack">取 消</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {getTextLength} from 'utils';
    export default {
        data() {
            var validateName = (rule, value, callback) => {
                if (value) {
                    this.validateNameCk(() => {
                        callback();
                    }, (err) => {
                        callback(new Error(err.msg));
                    });
                } else {
                    callback(new Error('属性名称不能为空'));
                }
            };
            let validateBrandDesc = (rule, value, callback) => {
                if (value) {
                    if (this.descTextLength > 500) {
                        callback(new Error('输入长度超出500限制'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                xeLabelWidth66: '75px',
                addformData: {
                    typeName: '',
                    typeDesc: '',
                    normalFlag: false
                },
                isError: false,
                saveLoading: false, // 保存loading
                rules: {
                    typeName: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ],
                    typeDesc: [
                        { validator: validateBrandDesc, trigger: 'blur' }
                    ]
                },
                extendData1: [
                    {
                        propertyName: '',
                        propertyValue: [],
                        inputValue: '',
                        searchFlag: false,
                        inputVisible: false
                    }
                ],
                extendData2: [
                    {
                        specName: '',
                        specValue: [],
                        inputValue: '',
                        inputVisible: false
                    }
                ],
                productUrl: '/xe-route/xe-pro'
//                productUrl: ''
            };
        },
        methods: {
            validateNameCk(suc, err) {  // 校验属性名称是否重复
                let params = {};
                params.typeName = this.addformData.typeName;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/product/type/changeNameCheck`,
                    data: params
                }).then((res) => {
                    if (res.data.remote && res.data.remote.status !== '0000') {
                        err && err(res.data.remote);
                    } else {
                        suc && suc();
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            propertyNameck(num) { // 判断同一table内是否输入相同的属性名称
                let objectArr = {};
                let list = [];
                if (num === 1) {
                    let extendData1 = this.extendData1;
                    for (let i in extendData1) {
                        list.push(extendData1[i].propertyName);
                    }
                } else if (num === 2) {
                    let extendData2 = this.extendData2;
                    for (let j in extendData2) {
                        list.push(extendData2[j].specName);
                    }
                }
                console.log('list--->', list);
                let flag = false;
                list.some((item) => {
                    if (objectArr[item]) {
                        console.log('重复了');
                        flag = false;
                        return true;
                    } else {
                        objectArr[item] = 1;
                        flag = true;
                    }
                });
                if (num === 1 && flag === false) {
                    this.$alert('添加扩展属性中属性名称不能相同', {
                        type: 'info'
                    });
                }
                if (num === 2 && flag === false) {
                    this.$alert('添加规格中规格名称不能相同', {
                        type: 'info'
                    });
                }
                return flag;
            },
            addextendedAttributes() { // 添加扩展属性
                if (this.extendData1.length <= 6) {
                    this.extendData1.push({
                        propertyName: '',
                        propertyValue: [],
                        inputValue: '',
                        searchFlag: false,
                        inputVisible: false
                    });
                } else {
                    this.$alert('最多添加7条扩展属性', {
                        type: 'info'
                    });
                }
            },
            addSpecifications() { // 添加规格
                if (this.extendData2.length <= 6) {
                    this.extendData2.push(
                        {
                            specName: '',
                            specValue: [],
                            inputValue: '',
                            inputVisible: false
                        }
                    );
                } else {
                    this.$alert('最多添加7条规格', {
                        type: 'info'
                    });
                }
            },
            handleClose1(tag, num) {
                this.extendData1[num].propertyValue.splice(this.extendData1[num].propertyValue.indexOf(tag), 1);
            },
            showInput1(num) {
                if (this.extendData1[num].propertyValue.length <= 6) {
                    if (this.extendData1[num].propertyName) {
                        this.extendData1[num].inputVisible = true;
                    } else {
                        this.$alert('请先填写属性名称', {
                            type: 'info'
                        });
                    }
                } else {
                    this.$alert('最多添加7条属性值', {
                        type: 'info'
                    });
                }
            },
            handleInputConfirm1(num) {
                let inputValue = this.extendData1[num].inputValue;
                let noSame = true;
                let seleArray = this.extendData1[num].propertyValue;
                if (this.extendData1[num].propertyName) {
                    if (inputValue) {
                        for (let i in seleArray) { // 判断同一个属性名称下面是否输入了相同的属性值
                            if (seleArray[i] !== inputValue) {
                                noSame = true;
                            } else {
                                noSame = false;
                                break;
                            }
                        }
                        if (noSame) {
                            if (inputValue.indexOf('-') === -1) {
                                this.extendData1[num].propertyValue.push(inputValue);
                                console.log('this.extendData1[num].propertyValue', this.extendData1[num].propertyValue);
                            } else {
                                this.$alert('属性值不能含有’-‘特殊符号', {
                                    type: 'info'
                                });
                            }
                        }
                    }
                }
                this.extendData1[num].inputValue = '';
                this.extendData1[num].inputVisible = false;
            },
            // 添加规格表单操作---start---
            handleClose2(tag, num) {
                this.extendData2[num].specValue.splice(this.extendData2[num].specValue.indexOf(tag), 1);
            },
            showInput2(num) {
                if (this.extendData2[num].specValue.length <= 6) {
                    if (this.extendData2[num].specName) {
                        this.extendData2[num].inputVisible = true;
                    } else {
                        this.$alert('请先填写属性名称', {
                            type: 'info'
                        });
                    }
                } else {
                    this.$alert('最多添加7条规格值', {
                        type: 'info'
                    });
                }
            },
            handleInputConfirm2(num) {
                let inputValue = this.extendData2[num].inputValue;
                let noSame = true;
                let seleArray = this.extendData2[num].specValue;
                console.log('seleArray--->', seleArray);
                if (this.extendData2[num].specName) {
                    if (inputValue) {
                        for (let i in seleArray) { // 判断同一个属性名称下面是否输入了相同的属性值
                            if (seleArray[i] !== inputValue) {
                                noSame = true;
                            } else {
                                noSame = false;
                                break;
                            }
                        }
                        if (noSame) {
                            if (inputValue.indexOf('-') === -1) {
                                this.extendData2[num].specValue.push(inputValue);
                            } else {
                                this.$alert('属性值不能含有’-‘特殊符号', {
                                    type: 'info'
                                });
                            }
                        }
                    }
                }
                this.extendData2[num].inputValue = '';
                this.extendData2[num].inputVisible = false;
            },
            deleteRow(Tabs, num) { // 删除单行
                Tabs.splice(num, 1);
            },
            // 添加扩展属性检验（数据完成整性）
            extendedattributeCheck() {
                if (this.extendData1) {
//                this.extendData1.every((item) => {
//                    console.log('item-->', item);
//                    return item.propertyValue.length > 0;
//                });
                    let flag = false;
                    let extendData1 = this.extendData1;
                    for (let i in extendData1) {
                        if (!extendData1[i].propertyValue.length) {
                            flag = false;
                            this.$alert('扩展属性每一行都要填写完整，请填写完整再提交', {
                                type: 'info'
                            });
                            break;
                        } else {
                            flag = true;
                        }
                    }
                    return flag;
                }
            },
            // 添加规格检验（数据完成整性）
            specificationCheck() {
                let flag = false;
                let extendData2 = this.extendData2;
                if (this.extendData2 && this.extendData2.length > 1) {
                    for (let i in extendData2) {
                        if (!extendData2[i].specValue.length) {
                            flag = false;
                            this.$alert('添加规格每一行都要填写完整，请填写完整再提交', {
                                type: 'info'
                            });
                            break;
                        } else {
                            flag = true;
                        }
                    }
                } else if (this.extendData2 && this.extendData2.length === 1) {
                    if (!extendData2[0].specName && !extendData2[0].specValue.length) {
                        flag = true;
                    } else if (extendData2[0].specName && !extendData2[0].specValue.length) {
                        this.$alert('添加规格每一行都要填写完整，请填写完整再提交', {
                            type: 'info'
                        });
                    } else if (extendData2[0].specName && extendData2[0].specValue.length > 0) {
                        flag = true;
                    }
                }
                return flag;
            },
            Preservation(fn) { // 提交表单
                this.$refs['addformData'].validate((valid) => {
                    if (valid) {
                        if (this.extendData1 && this.extendData1.length && this.extendData1[0].propertyValue && this.extendData1[0].propertyValue.length > 0) {
//                            if (this.extendedattributeCheck() && this.specificationCheck() && this.propertyNameck(1) && this.propertyNameck(2)) {
//                            }
                            if (this.extendData2 && this.extendData2.length && this.extendData2[0].specValue) {
                                if (this.extendedattributeCheck() && this.specificationCheck() && this.propertyNameck(1) && this.propertyNameck(2)) {
                                    this.submitForm(fn);
                                }
                            } else {
                                if (this.extendedattributeCheck() && this.propertyNameck(1)) {
                                    this.submitForm(fn);
                                }
                            }
                        } else {
                            this.$alert('扩展属性至少填写一条', {
                                type: 'info'
                            });
                        }
                    } else {
                        console.log('submit error');
                        return false;
                    }
                });
            },
            submitForm(fn) {
                let params = {};
                params = this.addformData;
                params.normalFlag = 2;
                params.typePropertyList = JSON.parse(JSON.stringify(this.extendData1));
                for (let i in params.typePropertyList) {
                    if (params.typePropertyList[i].searchFlag === true) {
                        params.typePropertyList[i].searchFlag = 1;
                    } else {
                        params.typePropertyList[i].searchFlag = 2;
                    }
                }
                if (this.extendData1 && this.extendData1.length > 0) {
                    for (let i in params.typePropertyList) {
                        if (params.typePropertyList[i].propertyValue !== '' && params.typePropertyList[i].propertyValue.length > 0) {
                            params.typePropertyList[i].propertyValue = params.typePropertyList[i].propertyValue.join(',');
                        }
                    }
                }
                if (this.extendData2 && this.extendData2.length && this.extendData2[0].specValue.length > 0) {
                    params.typeSpecList = JSON.parse(JSON.stringify(this.extendData2));
                    if (this.extendData2 && this.extendData2.length > 0) {
                        for (let i in params.typeSpecList) {
                            if (params.typeSpecList[i].specValue !== '' && params.typeSpecList[i].specValue.length > 0) {
                                params.typeSpecList[i].specValue = params.typeSpecList[i].specValue.join(',');
                            }
                        }
                    }
                } else {
                    params.typeSpecList = [];
                }
                console.log(params);
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/product/type/addProType`,
                    data: params
                }).then(res => {
                    console.log(res);
                    window.$wxeMessage({
                        type: 'success',
                        message: `属性添加成功`
                    });
                    if (fn || typeof fn === 'function') {
                        fn();
                    } else {
                        this.goBack();
                    }
                }).catch(error => {
                    console.log(error);
                    window.$wxeMessage({
                        type: 'error',
                        message: `${error.msg}`
                    });
                });
            },
            goBack() {
                this.$router.go(-1);
            }
        },
        computed: {
            descTextLength() {
                return getTextLength(this.addformData.typeDesc);
            }
        }
    };
</script>
