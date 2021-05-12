<template>
    <el-form ref="form" class="page-form" :model="data" :label-width="labelWidth">
        <el-form-item v-for="(item, index) in getConfigList()" :key="index"
        :prop="item.value" :label="item.label">
            <!-- 普通输入框 -->
            <el-input v-if="item.type === 2"
            v-model="data[item.value]" :disabled="item.disabled" ></el-input>
            <!-- 选择框 -->
            <el-select v-if="item.type === 1"
            v-model="data[item.value]"  :disabled="item.disabled">
                <el-option v-for="(childItem, childIndex) in item.list"
                :key="childIndex" :label="childItem" :value="childItem"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'XMForm',
    props: {
        // 表单数据
        data: {
            type: Object,
        },
        // 相关字段
        fieldList: {
            type: Array
        },
        labelWidth: {
            type: String,
            default: '120px'
        },
        refObj: {
            type: Object
        }
    },
    watch: {
        data: {
            handler: function (val) {
                // 将form实例返回到父级
                this.$emit('update:refObj', this.$refs.form);
            },
            deep: true,
        }
    },
    mounted() {
        this.$emit('update:refObj', this.$refs.form);
    },
    data() {
        return {}
    },
    methods: {
        getConfigList() {
            return this.fieldList.filter(item => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show))
        }
    }
}
</script>
<style lang="scss" scoped>
.page-form {
    .el-form-item {
        // display: inline-block;
        .el-form-item__content {
            .el-input, .el-select, .el-textarea{
                width: 240px;
            }
        }
    }
}
</style>


