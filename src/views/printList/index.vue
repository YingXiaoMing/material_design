<template>
    <div class="app-container">
        <div class="filter-container">
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addData">新增产品</el-button>
            <el-button type="el-icon-printer" @click="printAssign">打印选中的产品</el-button>
            <el-button icon="el-icon-printer" @click="printAll">打印全部产品</el-button>
            <el-button @click="backList">返回标签列表</el-button>
        </div>
        <page-table :table="dataTable" @handleEvent="handleEvent"></page-table>
        <hidden-area :printData="printData"></hidden-area>
        <page-dialog
        :title="dialogInfo.title"
        :b-list="dialogInfo.bList"
        :visible.sync="dialogInfo.visible"
        width="448px"
        @handleClick="handleClick"
        >
            <el-form :model="form" inline label-width="88px">
              <el-col :span="24">
                  <el-form-item label="公司名称:">
                      <el-input v-model="form.companyName" style="width: 220px"/>
                  </el-form-item>
              </el-col>
              <el-col :span="24">
                  <el-form-item label="设备名称:">
                      <el-input v-model="form.machineName" style="width: 220px"/>
                  </el-form-item>
              </el-col>
              <el-col :span="24">
                  <el-form-item label="资产编号:">
                      <el-input v-model="form.machineNum" style="width: 220px"/>
                  </el-form-item>
              </el-col>
              <el-col :span="24">
                  <el-form-item label="使用人:">
                      <el-input v-model="form.user" style="width: 220px"/>
                  </el-form-item>
              </el-col>
              <el-col :span="24">
                  <el-form-item label="启用日期:">
                      <el-date-picker v-model="form.date" placeholder="请选择日期" type="date"
                         style="width: 220px" value-format="yyyy-MM-dd"></el-date-picker>
                  </el-form-item>
              </el-col>
            </el-form>
        </page-dialog>
    </div>
</template>
<script>
import PageTable from '@/components/PageTable';
import HiddenArea from '@/layout/printArea/index';
import { showLoading, hideLoading } from '@/utils/loading';
import PageDialog from '@/components/PageDialog'
import { mapActions } from 'vuex'
import _ from 'lodash';
export default {
    components: {
        PageTable,
        HiddenArea,
        PageDialog,
    },
    created() {
        const ids = this.$route.query.id;
        if (ids) {
            this.getTemplateDynamicDataById(ids).then(res => {
                console.log(res);
            });
        }
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
                data: [{
                    id: 1,
                    companyName: '海底捞设备',
                    machineName: 'CX-0020',
                    machineNum: '002000',
                    user: '张晓云',
                    date: '2020-04-28'
                },{
                    id: 2,
                    companyName: '海底捞设备',
                    machineName: 'CX-0021',
                    machineNum: '002001',
                    user: '张晓云',
                    date: '2020-04-28'
                },{
                    id: 3,
                    companyName: '海底捞设备',
                    machineName: 'CX-0022',
                    machineNum: '002002',
                    user: '吴耿平',
                    date: '2020-04-29'
                },{
                    id: 4,
                    companyName: '海底捞设备',
                    machineName: 'CX-0023',
                    machineNum: '002003',
                    user: '吴耿平',
                    date: '2020-04-29'
                }],
                tr: [{
                    id: '1',
                    label: '公司名称',
                    prop: 'companyName',
                    width: 220,
                }, {
                    id: '2',
                    label: '设备名称',
                    prop: 'machineName',
                }, {
                    id: '3',
                    label: '资产编号',
                    prop: 'machineNum',
                }, {
                    id: '4',
                    label: '使用人',
                    prop: 'user',
                }, {
                    id: '5',
                    label: '启用日期',
                    prop: 'date'
                }]
            },
        }
    },
    methods: {
        ...mapActions({
            getTemplateDynamicDataById: 'label/getTemplateDynamicDataById'
        }),
        handleClick(event, data) {
            switch (event) {
                case 'close':
                    this.dialogInfo.visible = false;
                    break;
                case 'save':
                    if (this.dialogInfo.type == 0) {
                        const total = this.dataTable.data.length;
                        this.dataTable.data.push({
                            companyName: this.form.companyName,
                            machineName: this.form.machineName,
                            machineNum: this.form.machineNum,
                            user: this.form.user,
                            date: this.form.date,
                            id: total + 1,
                        })
                    } else {
                        this.dataTable.data[this.index]['companyName'] = this.form.companyName;
                        this.dataTable.data[this.index]['machineName'] = this.form.machineName;
                        this.dataTable.data[this.index]['machineNum'] = this.form.machineNum;
                        this.dataTable.data[this.index]['user'] = this.form.user;
                        this.dataTable.data[this.index]['date'] = this.form.date;
                    }
                    this.dialogInfo.visible = false;
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
        printAssign() {
            const componentStr = '{"Name":"测试版本","Properties":{"paperWidth":500,"paperHeight":500,"topMargin":10,"bottomMargin":10,"leftMargin":10,"rightMargin":10,"isShowBorder":true},"ViewableControls":[{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":134,"height":2,"x_position":12,"y_position":55.5},"id":"1"},{"type":"LabelBox","userControlledProperties":"InputMenu","title":"文本框","properties":{"width":312,"height":51,"x_position":159,"y_position":19.5,"fontSize":"36px","isField":false,"fieldLendge":"","text":"公司固定资产卡片","color":"#000"},"id":"2"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":107,"height":45,"x_position":5,"y_position":89.5,"text":"设备名称","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"3"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":113,"height":45,"x_position":7,"y_position":151.5,"text":"资产编号","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"4"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":117,"y_position":124.5},"id":"5"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":119,"y_position":184.5},"id":"6"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":115,"height":51,"x_position":228,"y_position":89.5,"text":"启用日期","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"7"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":98,"height":39,"x_position":228,"y_position":151.5,"text":"使用人","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"8"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":334,"y_position":124.5},"id":"9"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":335,"y_position":184.5},"id":"10"},{"type":"BarCode","userControlledProperties":"BarCodeMenu","title":"条形码","properties":{"width":428,"height":207,"x_position":7,"y_position":223.5,"text":"GCP-0-002","format":"CODE128","textPosition":"bottom","lineWidth":2,"bodyHeight":40,"fontSize":14,"displayValue":true,"data":" "},"id":"11"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":94,"height":28,"x_position":117,"y_position":93.5,"text":"CX-0021","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"18px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"WebAPI","apiWebData":"employeeName","formular":"","option":""}},"id":"12"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":94,"height":28,"x_position":335,"y_position":93.5,"text":"2021-04-28","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"18px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"13"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":94,"height":28,"x_position":119,"y_position":153.5,"text":"002001","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"18px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"14"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":94,"height":28,"x_position":335,"y_position":153.5,"text":"张小云","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"18px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"15"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":135,"height":49,"x_position":13,"y_position":18.5,"text":"美的","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":true,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"16"}]}';
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
                    elementData[11].properties.text = itemModule.machineName;
                    elementData[12].properties.text = itemModule.date;
                    elementData[13].properties.text = itemModule.machineNum;
                    elementData[14].properties.text = itemModule.user;
                    elementData[15].properties.text = itemModule.companyName;
                    this.$set(this.printData, i, elementData);
                    newArr.push(elementData)
                }
                this.printData = newArr;
                this.$nextTick(() => {
                    hideLoading();
                    this.$pdf();
                })
            }            
        },
        addData() {
            this.dialogInfo.title = '新增产品';
            this.dialogInfo.visible = true;
            this.dialogInfo.type = 0; // 新增
            this.form = {
                companyName: '',
                machineName: '',
                machineNum: '',
                user: '',
                date: ''
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
            showLoading();
            const componentStr = '{"Name":"测试版本","Properties":{"paperWidth":500,"paperHeight":500,"topMargin":10,"bottomMargin":10,"leftMargin":10,"rightMargin":10,"isShowBorder":true},"ViewableControls":[{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":134,"height":2,"x_position":12,"y_position":55.5},"id":"1"},{"type":"LabelBox","userControlledProperties":"InputMenu","title":"文本框","properties":{"width":312,"height":51,"x_position":159,"y_position":19.5,"fontSize":"36px","isField":false,"fieldLendge":"","text":"公司固定资产卡片","color":"#000"},"id":"2"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":107,"height":45,"x_position":5,"y_position":89.5,"text":"设备名称","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"3"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":113,"height":45,"x_position":7,"y_position":151.5,"text":"资产编号","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"4"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":117,"y_position":124.5},"id":"5"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":119,"y_position":184.5},"id":"6"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":115,"height":51,"x_position":228,"y_position":89.5,"text":"启用日期","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"7"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":98,"height":39,"x_position":228,"y_position":151.5,"text":"使用人","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"8"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":334,"y_position":124.5},"id":"9"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":335,"y_position":184.5},"id":"10"},{"type":"BarCode","userControlledProperties":"BarCodeMenu","title":"条形码","properties":{"width":428,"height":207,"x_position":7,"y_position":223.5,"text":"GCP-0-002","format":"CODE128","textPosition":"bottom","lineWidth":2,"bodyHeight":40,"fontSize":14,"displayValue":true,"data":" "},"id":"11"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":94,"height":28,"x_position":117,"y_position":93.5,"text":"CX-0021","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"18px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"WebAPI","apiWebData":"employeeName","formular":"","option":""}},"id":"12"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":94,"height":28,"x_position":335,"y_position":93.5,"text":"2021-04-28","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"18px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"13"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":94,"height":28,"x_position":119,"y_position":153.5,"text":"002001","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"18px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"14"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":94,"height":28,"x_position":335,"y_position":153.5,"text":"张小云","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"18px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"15"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":135,"height":49,"x_position":13,"y_position":18.5,"text":"美的","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":true,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"16"}]}';
            const componentPrintData = JSON.parse(componentStr);
            let newArr = [];
            for (let i = 0; i < this.dataTable.data.length; i++) {
                const itemModule = this.dataTable.data[i];
                const elementData = _.cloneDeep(componentPrintData.ViewableControls);
                elementData[11].properties.text = itemModule.machineName;
                elementData[12].properties.text = itemModule.date;
                elementData[13].properties.text = itemModule.machineNum;
                elementData[14].properties.text = itemModule.user;
                elementData[15].properties.text = itemModule.companyName;
                this.$set(this.printData, i, elementData);
                newArr.push(elementData)
            }
            this.printData = newArr;
            this.$nextTick(() => {
                hideLoading();
                this.$pdf();
            });
        }
    }
}
</script>