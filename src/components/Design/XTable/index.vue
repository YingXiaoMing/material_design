<template>
    <div :id="elementId" class="table-component">
        <el-table  size="small" border :data="data" style="width: 100%" :row-style="{height: '16px'}" :cell-style="{padding:2+'px'}">
            <el-table-column label="序号" type="index" width="45"></el-table-column>
            <el-table-column v-for="item in columns" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        elementId: {
            type: String,
            default: ''
        },
        width: {
            type: [String, Number],
            default: 450
        },
        columns: {
            type: Array,
            default: []
        },
        data: {
            type: Array,
            default: []
        }
    },
    computed: {
        getStyle() {
            const { width } = this;
            return {
                // minWidth: `${width}px`
            }
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.$emit('complete')
            console.log(this.text)
        }
    }
}
</script>

<style lang="scss">
.table-component {
    display: inline-block;
}
</style>

