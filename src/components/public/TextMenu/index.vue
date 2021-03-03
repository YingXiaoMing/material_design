<template>
    <div class="text-menu-warp">
        <el-form ref="content-form" label-position="top" label-width="80px" size="mini">
            <el-form-item label="文本格式:">
                <el-select size="small" v-model="currentComponent.properties.dataSource.origin" style="width: 100%">
                    <el-option v-for="item in fieldOption" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <template v-if="currentComponent.properties.dataSource.origin === 'EndUserInput'">
                <el-form-item label="文本内容:">
                    <el-input type="textarea" :rows="4" resize="none" size="small" v-model="currentComponent.properties.text"></el-input>
                </el-form-item>
            </template>
            <template v-if="currentComponent.properties.dataSource.origin === 'WebAPI'" >
                <el-form-item label="绑定字段:">
                    <el-select v-model="currentComponent.properties.dataSource.apiWebData" style="width: 100%">
                      <el-option v-for="item in dynamicOption" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </template>
            <template v-if="currentComponent.properties.dataSource.origin === 'Formular'">
                <el-form-item label="计算方式:">
                    <el-input type="textarea" :rows="4" resize="none" size="small" 
                    v-model="currentComponent.properties.dataSource.formular"></el-input>
                </el-form-item>
            </template>
            <template v-if="currentComponent.properties.dataSource.origin === 'DropdownOptions'">
                <el-form-item label="自定义数据:">
                    <el-input v-model="currentComponent.properties.dataSource.option" :rows="4" type="textarea"></el-input>
                    <div style="fontSize: 13px">（数据以逗号形式隔开，例如<span style="color:red">名称，规格，大小</span>）</div>
                </el-form-item>
            </template>
            
            <el-form-item label="对齐方式:">
                <el-select size="small" v-model="currentComponent.properties.align" style="width: 100%" placeholder="请选择对齐方式">
                    <el-option v-for="item in alignOptions" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文本行距:">
                <el-select size="small" v-model="currentComponent.properties.lineHeight" style="width: 100%" placeholder="请选择文本行距">
                    <el-option v-for="item in lineHeightOptions" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="字体大小:">
                <el-select size="small" v-model="currentComponent.properties.fontSize" style="width: 100%" placeholder="请选择字体大小">
                    <el-option v-for="item in fontSizeOptions" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="字体颜色:">
                <el-color-picker v-model="currentComponent.properties.color"></el-color-picker>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="currentComponent.properties.isBold">字体加粗</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="currentComponent.properties.hasBorder">显示边框</el-checkbox>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    props: {
        component: {
            type: Object,
            default() {
                return {}
            },
        }
    },
    computed: {
        ...mapGetters(['activeComponent', 'storeList']),
        currentComponent() {
            const { id = '' } = this.activeComponent;
            return this.storeList.find((item) => item.id === id);
        }
    },
    data() {
        return {
            alignOptions: [
                {
                    label: '左对齐',
                    value: 'left'
                },
                {
                    label: '右对齐',
                    value: 'right'
                },
                {
                    label: '居中',
                    value: 'center'
                }
            ],
            dynamicOption: [{
                value: 'employeeName',
                label: '员工姓名'
            }, {
                value: 'productLine',
                label: '生产线'
            }, {
                value: 'machiner',
                label: '机长'
            }],
            lineHeightOptions: [
                {
                    label: '1倍',
                    value: '1'
                },
                {
                    label: '1.5倍',
                    value: '1.5'
                },
                {
                    label: '2倍',
                    value: '2'
                }
            ],
            // EndUserInput 用户自定义文本  DropdownOptions 自定义选项
            // WebAPI  后台绑定字段  Formular  计算字段
            fieldOption: [{
                label: '自定义字段',
                value: 'EndUserInput'
            }, {
                label: '动态字段',
                value: 'WebAPI'
            }, {
                label: '计算字段',
                value: 'Formular'
            }, {
                label: '自定义选项',
                value: 'DropdownOptions'
            }],
            fontSizeOptions: [
                {
                    label: '12px',
                    value: '12px'
                },
                {
                    label: '14px',
                    value: '14px'
                },
                {
                    label: '16px',
                    value: '16px'
                },
                {
                    label: '18px',
                    value: '18px'
                },
                {
                    label: '24px',
                    value: '24px'
                },
                {
                    label: '36px',
                    value: '36px'
                },
                {
                    label: '48px',
                    value: '48px'
                },
                {
                    label: '60px',
                    value: '60px'
                }
            ],
            fontFamilyOptions: [
                {
                    label: 'Al Bayan',
                    value: 'Al Bayan',
                },
                {
                    label: 'monospace',
                    value: 'monospace',
                },
                {
                    label: 'sans-serif',
                    value: 'sans-serif',
                },
            ]
        }
    },
    methods: {
        handleCustomField(val) {
            if (val) {
                this.currentComponent.properties.text = '自定义字段';
            }
        }
    }
}
</script>
<style lang="scss">
.text-menu-warp {
    width: 300px;
    padding-left: 10px;
    padding-right: 10px;
    .el-form-item {
        margin-bottom: 2px;
    }
}
</style>
