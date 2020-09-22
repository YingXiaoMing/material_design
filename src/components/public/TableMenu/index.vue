<template>
    <div>
        <el-form label-width="128px" size="mini" label-position="top">
            <el-form-item label="显示序号:">
                <el-checkbox v-model="currentComponent.props.showSection"></el-checkbox>
            </el-form-item>
            <el-form-item label="表格显示行数(行):">
                <el-input-number v-model="currentComponent.props.cols" :min="1" :max="7" @change="colChangeHandle"></el-input-number>
            </el-form-item>
            <!-- <el-form-item label="显示合计金额行:">
                <el-checkbox v-model="currentComponent.props.showTotal"></el-checkbox>
            </el-form-item> -->
            <el-form-item label="表格设计:">
                <el-checkbox-group v-model="currentComponent.props.tableData" @change="handleTableOptionsChange">
                    <draggable :options="{animation: 380}" v-model="currentComponent.props.tableDataOption" 
                    handle=".btn_handle" @end="drageEnd">
                        <template v-for="(item, index) in currentComponent.props.tableDataOption">
                            <el-checkbox :label="item.key">
                                <el-input v-model="item.name" style="width: 160px" @input="((val) =>handleTableOptionValueChange(val,item.key))"></el-input>
                                <el-button icon="el-icon-rank" circle class="btn_handle"></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle @click="delAtr(index, item.key)"></el-button>
                            </el-checkbox>
                        </template>
                    </draggable>
                </el-checkbox-group>
                <el-button type="text" @click="addOption">添加选项</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';
import draggable from 'vuedraggable';
import { getCode } from '@/utils/index.js';
export default {
    props: {
        
    },
    components: {
        draggable
    },
    data() {
        return {
            tableData: [],
            tableDataOption: [],
        }
    },
    computed: {
        ...mapGetters(['activeComponent', 'storeList']),
        currentComponent() {
            const { id = '' } = this.activeComponent;
            return this.storeList.find((item) => item.id === id);
        }
    },
    methods: {
        getMapData() {
            let dd ={};
            for (let i = 0; i < this.currentComponent.props.columns.length; i++) {
                const element = this.currentComponent.props.columns[i];
                dd[element.prop] = '';
            }
            return dd;
        },
        colChangeHandle(currentValue) {
            const inum = this.currentComponent.props.data.length;
            if (currentValue > inum) {
                this.currentComponent.props.data.push(_.cloneDeep(this.getMapData()));
            } else {
                this.currentComponent.props.data.pop();
            }
        },
        addOption() {
            this.currentComponent.props.tableDataOption.push({
                name: '添加选项',
                key: getCode(4)
            });            
        },
        delAtr(i, key) {
            this.currentComponent.props.tableDataOption.splice(i,1);
            const columnIndex = _.findIndex(this.currentComponent.props.columns, { 'prop': key });
            const tableDataIndex = _.findIndex(this.currentComponent.props.tableData, { 'key': key });
            this.currentComponent.props.columns.splice(columnIndex,1);
            this.currentComponent.props.tableData.splice(tableDataIndex,1);
        },
        handleTableOptionsChange(value) {
            this.transferTableHeaderData(value, this.currentComponent.props.tableDataOption);
        },
        handleTableOptionValueChange(value,rowKey) {
            const obj = _.find(this.currentComponent.props.tableDataOption, { 'key': rowKey });
            if (obj) {
                obj.name = value;
            };
            this.transferTableHeaderData(this.currentComponent.props.tableData, this.currentComponent.props.tableDataOption);
        },
        drageEnd() {
            let newArr = [];
            _.forEach(this.currentComponent.props.tableDataOption, (item, index) => {
                if (_.includes(this.currentComponent.props.tableData, item.key)) {
                    newArr.push(item.key);
                }
            });
            this.currentComponent.props.tableData = newArr;
            this.transferTableHeaderData(this.currentComponent.props.tableData, this.currentComponent.props.tableDataOption);
        },
        transferTableHeaderData(fileData, tableData) {
            let arr = [];
            _.forEach(fileData, (item, index) => {
                const obj = _.find(tableData, { 'key': item });
                arr.push({
                    prop: obj.key,
                    label: obj.name
                });
            });
            this.currentComponent.props.columns = arr;
        }
    }
}
</script>

