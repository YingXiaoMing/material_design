<template>
    <div class="app-container">
        <template v-if="dataTable.tr.length > 0">
            <div class="filter-container">
                <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addData">新增产品</el-button>
                <el-button type="el-icon-printer" @click="printAssign">打印选中的产品</el-button>
                <el-button icon="el-icon-printer" @click="printAll">打印全部产品</el-button>
                <el-button @click="backList">返回标签列表</el-button>
            </div>
            <page-table :table="dataTable" @handleEvent="handleEvent"></page-table>
        </template>
        <template v-else>
            <div class="filter-container">
                <el-button @click="backList">返回标签列表</el-button>
                <el-button type="el-icon-printer">打印标签</el-button>
            </div>
        </template>
        <hidden-area :printData="printData"></hidden-area>
        <page-dialog
        :title="dialogInfo.title"
        :b-list="dialogInfo.bList"
        :visible.sync="dialogInfo.visible"
        width="448px"
        @handleClick="handleClick"
        >
            <x-m-form :ref-obj.sync="formInfo.ref"
                      :data="formInfo.data" :field-list="formInfo.fieldList"
                      :label-width="formInfo.labelWidth"></x-m-form>
        </page-dialog>
    </div>
</template>
<script>
import PageTable from '@/components/PageTable';
import HiddenArea from '@/layout/printArea/index';
import XMForm from '@/components/XMForm';
import { showLoading, hideLoading } from '@/utils/loading';
import PageDialog from '@/components/PageDialog'
import { mapActions } from 'vuex'
import _ from 'lodash';
export default {
    components: {
        PageTable,
        HiddenArea,
        PageDialog,
        XMForm,
    },
    created() {
        this.loadHeaderData();
        this.loadTableData();
    },
    data() {
        return {
            multipleSelection: [],
            index: 0,
            printData: [],
            form: {
                companyName: '',
                machineName: '',
                machineNum: '',
                user: '',
                date: '',
            },
            dialogInfo: {
                title: '新增产品',
                visible: false,
                type: 0, //  0代表新增  1代表编辑
                bList: [
                    { label: '关闭', show: true, event: 'close' },
                    { label: '保存', show: true, event: 'save' }
                ]
            },
            formInfo: {
                ref: null,
                data: {
                },
                fieldList: [],
                labelWidth: '120px'
            },
            dataTable: {
                border: true,
                query: {},
                loading: false,
                hasOperation: true,
                hasSelection: true,
                hasNumber: true,
                height: 468,
                refresh: 1, // 刷新
                operation: {
                    label: '操作',
                    width: '200',
                    className: '',
                    data: [
                        {
                            label: '编辑',
                            event: 'editData',
                            id: '1'
                        },
                        {
                            label: '删除',
                            event: 'deleteData',
                            id: '2'
                        }
                    ] 
                },
                data: [],
                tr: []
            },
        }
    },
    methods: {
        ...mapActions({
            getTemplateDynamicDataById: 'label/getTemplateDynamicDataById',
            newDynamicMaterial: 'label/newDynamicMaterial',
            getDynamicMaterialById: 'label/getDynamicMaterialById',
            getTagContainById: 'label/getTagContainById',
        }),
        loadAllData() {
            this.loadHeaderData();
            this.loadTableData();
        },
        loadTableData() {
            const ids = this.$route.query.id;
            if (ids) {
                this.getDynamicMaterialById(ids).then(res => {
                    this.dataTable.data = _.map(res, item => {
                        return JSON.parse(item.dynamicData)
                    });
                })
            }
        },
        loadHeaderData() {
            const ids = this.$route.query.id;
            if (ids) {
                this.getTemplateDynamicDataById(ids).then(res => {
                    console.log(res);
                    this.dataTable.tr = _.map(res, item => {
                        return {
                            id: item.id,
                            label: item.name,
                            prop: item.id
                        }
                    });
                    this.formInfo.fieldList = _.map(res, item => {
                        this.$set(this.formInfo.data, item.id, '');
                        return {
                            label: item.name + ':',
                            value: item.id,
                            type: item.type,
                            list: item.content.split('，'),
                            componentId: item.componentId,
                        }
                    })
                });
            }
        },
        handleClick(event, data) {
            switch (event) {
                case 'close':
                    this.dialogInfo.visible = false;
                    break;
                case 'save':
                    const ids = this.$route.query.id;
                    if (ids) {
                        if (this.dialogInfo.type == 0) {
                            console.log(this.formInfo.data);
                            const param = {
                                TemplateId: ids,
                                DynamicData: JSON.stringify(this.formInfo.data),
                            };
                            this.newDynamicMaterial(param).then(res => {
                                this.dialogInfo.visible = false;
                                this.$message.success('新增成功');
                                this.loadAllData();
                            })
                        }
                    }
                    break;
                default:
                    break;
            }
        },
        delData() {
            if (this.checkedSelect()) {
                const index = this.dataTable.data.findIndex(item => {
                    return item.id == this.multipleSelection.id
                });
                this.dataTable.data.splice(index,1);
            }
        },
        backList() {
            this.$router.push({
                name: 'List'
            });
        },
        editData() {
            if (this.checkedSelect()) {
                const index = this.dataTable.data.findIndex(item => {
                    return item.id == this.multipleSelection.id
                });
                this.index = index;
                this.form.machineName = this.multipleSelection.machineName;
                this.form.machineNum = this.multipleSelection.machineNum;
                this.form.companyName = this.multipleSelection.companyName;
                this.form.user = this.multipleSelection.user;
                this.form.date = this.multipleSelection.date;
                this.dialogInfo.type = 1;
                this.dialogInfo.title = '编辑产品';
                this.dialogInfo.visible = true;
            }
        },
        // 打印选中的数据
        printAssign() {
            const ids = this.$route.query.id;
            if (ids) {
                this.getTagContainById(ids).then(res => {
                    const componentStr = res.content;
                    const componentPrintData = JSON.parse(componentStr);
                    let newArr = [];
                    if (this.multipleSelection.length == 0) {
                        this.$message({
                            message: '请选择其中一件产品',
                            type: 'warning'
                        });
                        return
                    } else {
                        showLoading();
                        for (let i = 0; i < this.multipleSelection.length; i++) {
                            const itemModule = this.multipleSelection[i];
                            const elementData = _.cloneDeep(componentPrintData.ViewableControls);
                            for (let j = 0; j < this.formInfo.fieldList.length; j++) {
                                const otem = this.formInfo.fieldList[j];
                                const newObject = _.find(elementData, { 'id': otem.componentId });
                                newObject.properties.text = itemModule[otem.value];
                            }
                            
                            this.$set(this.printData, i, elementData);
                            newArr.push(elementData)
                        }
                        this.printData = newArr;
                        this.$nextTick(() => {
                            hideLoading();
                            this.$pdf();
                        });
                    }
                })
            }         
        },
        addData() {
            const ids = this.$route.query.id;
            if (ids) {
                this.getTemplateDynamicDataById(ids).then(res => {                    
                    this.formInfo.fieldList = _.map(res, item => {
                        this.$set(this.formInfo.data, item.id, '');
                        return {
                            label: item.name + ':',
                            value: item.id,
                            type: item.type,
                            list: item.content.split('，')
                        }
                    });
                    this.dialogInfo.title = '新增产品';
                    this.dialogInfo.visible = true;
                    this.dialogInfo.type = 0; // 新增
                })

                
            }
        },
        checkedSelect() {
            if (!_.isEmpty(this.multipleSelection)) {
                return true;
            }
            this.$message({
                message: '请选择其中一件产品',
                type: 'warning'
            });
            return false;
        },
        handleEvent(event, data) {
            switch (event) {
                case 'list':
                    break;
                case 'selectValue':
                    this.multipleSelection = data;
                    break;
                case 'editData':
                    const index = this.dataTable.data.findIndex(item => {
                        return item.id == data.id
                    });
                    this.index = index;
                    this.form.machineName = data.machineName;
                    this.form.machineNum = data.machineNum;
                    this.form.companyName = data.companyName;
                    this.form.user = data.user;
                    this.form.date = data.date;
                    this.dialogInfo.type = 1;
                    this.dialogInfo.title = '编辑产品';
                    this.dialogInfo.visible = true;
                    break;
                case 'deleteData':
                    const newIndex = this.dataTable.data.findIndex(item => {
                        return item.id == data.id
                    });
                    this.dataTable.data.splice(newIndex,1);
                    break;
                default:
                    break;
            }
        },
        printAll() {
            const ids = this.$route.query.id;
            if (ids) {
                this.getTagContainById(ids).then(res => {
                    const componentStr = res.content;
                    const componentPrintData = JSON.parse(componentStr);
                    let newArr = [];
                    showLoading();
                    for (let i = 0; i < this.dataTable.data.length; i++) {
                        const itemModule = this.dataTable.data[i];
                        const elementData = _.cloneDeep(componentPrintData.ViewableControls);
                        for (let j = 0; j < this.formInfo.fieldList.length; j++) {
                            const otem = this.formInfo.fieldList[j];
                            const newObject = _.find(elementData, { 'id': otem.componentId });
                            newObject.properties.text = itemModule[otem.value];
                        }
                        
                        this.$set(this.printData, i, elementData);
                        newArr.push(elementData)
                    }
                    this.printData = newArr;
                    this.$nextTick(() => {
                        hideLoading();
                        this.$pdf();
                    });
                });
            }

            
        }
    }
}
</script>