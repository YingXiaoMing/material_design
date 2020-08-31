<template>
    <div class="text-menu-warp">
        <el-form ref="content-form" label-position="top" label-width="80px">
            <el-form-item label="文本内容:">
                <el-input type="textarea" :rows="4" resize="none" size="small" v-model="currentComponent.props.text"></el-input>
            </el-form-item>
            <el-form-item label="对齐方式:">
                <el-select size="small" v-model="currentComponent.props.align" style="width: 100%" placeholder="请选择对齐方式">
                    <el-option v-for="item in alignOptions" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文本行距:">
                <el-select size="small" v-model="currentComponent.props.lineHeight" style="width: 100%" placeholder="请选择文本行距">
                    <el-option v-for="item in lineHeightOptions" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="字体大小:">
                <el-select size="small" v-model="currentComponent.props.fontSize" style="width: 100%" placeholder="请选择字体大小">
                    <el-option v-for="item in fontSizeOptions" :value="item.value" :label="item.label"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="currentComponent.props.isBold">字体加粗</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="currentComponent.props.hasBorder">显示边框</el-checkbox>
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
    }
}
</script>
<style lang="scss">
.text-menu-warp {
    width: 300px;
    padding-left: 10px;
    padding-right: 10px;
}
</style>
