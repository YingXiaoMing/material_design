<template>
    <div :id="elementId" class="table-component">
        <el-table class="XMTable" size="small" border :data="data" style="width: 100%" :row-style="{height: '16px'}" :cell-style="{padding:2+'px'}">
            <el-table-column label="序号" type="index" width="45" v-if="showSection"></el-table-column>
            <el-table-column v-for="item in columns" :prop="item.prop" :label="item.label" :width="item.width"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        showSection: {
            type: Boolean,
            default: true
        },
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
        }
    }
}
</script>

<style lang="scss">
.table-component {
    .XMTable {
        display: inline-block;
    }
}
</style>

