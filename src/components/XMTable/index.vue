<template>
    <div class="tl-rl">
        <template :table="table">
            <el-table v-loading="listInfo.loading" :data="table.data"  :border="table.border"
            style="width: 100%" ref="XMTable">
                <el-table-column label="序号" type="index" width="50" v-if="table.hasNumber"></el-table-column>
                <template v-for="item,index in trData">
                    <el-table-column v-if="item.show !== false && item.show === 'template'" :label="item.label"
                    :class-name="item.className ? item.className : ''" :width="item.width ? item.width : ''"
                    :min-width="item.minWidth? item.minWidth : ''" >
                        <template slot-scope="scope">
                            <slot :name="item.prop" :obj="scope"></slot>
                        </template>
                    </el-table-column>
                    <el-table-column v-if="item.show !== false && item.dataType == 'Select'"
                    :class-name="item.className ? item.className : ''"  :width="item.width ? item.width : ''"
                    :min-width="item.minWidth? item.minWidth : ''" :prop="item.prop" :label="item.label"
                    >
                    <template slot="header" slot-scope="{ column, $index }">
                        <span :style="{color: (searchMap[item.prop].length != 0? '#409eff' : '')}">{{ column.label }}</span>
                        &nbsp;&nbsp;
                        <el-popover trigger="click" v-if="trData[$index - 1].isSearch">
                            <el-checkbox-group v-model="searchMap[item.prop]" style="width: 60px; margin-bottom: 8px; display: block">
                                <el-checkbox v-for="itm in item.filteValue" :label="itm.value">{{itm.text}}</el-checkbox>
                            </el-checkbox-group>
                            <el-button type="primary" size="mini" @click="filterSelectData(item.prop)">筛选</el-button>
                            <el-button size="mini" @click="resetSelectData(item.prop)">重置</el-button>
                            <span slot="reference" style="cursor:pointer;float: right">
                                <svg-icon icon-class="filter" class-name="filter-icon" :style="{color: (searchMap[item.prop].length === 0? '' : '#409eff')}" />
                            </span>
                        </el-popover>
                    </template>
                    </el-table-column>
                    <el-table-column v-if="item.show !== false && item.show !=='template' && item.dataType !== 'Select'"
                    :class-name="item.className ? item.className : ''"  :width="item.width ? item.width : ''"
                    :min-width="item.minWidth? item.minWidth : ''" :prop="item.prop" :label="item.label">
                        <template slot="header" slot-scope="{ column, $index }">
                            <span :style="{color: (searchMap[item.prop] != ''? '#409eff' : '')}">{{column.label}}</span>
                            &nbsp;&nbsp;
                            <el-popover trigger="click" v-if="trData[$index - 1].isSearch">
                                <el-input  v-model="searchMap[item.prop]"  placeholder="请输入内容"  style="width: 200px; margin-bottom: 8px; display: block"></el-input>
                                <el-button type="primary" size="mini" style="width: 90px; margin-right: 8px" @click="filterData(item.prop)">搜索</el-button>
                                <el-button size="mini" style="width: 90px" @click="resetData(item.prop)">重置</el-button>    
                                <span slot="reference" style="cursor:pointer;float: right">
                                    <svg-icon icon-class="search" :style="{color: (searchMap[item.prop] != ''? '#409eff' : '')}" />
                                </span>
                            </el-popover>
                        </template>
                    </el-table-column>
                </template>
                <el-table-column column-key="operation" :label="table.operation.label"
                :width="table.operation.width ? table.operation.width : ''" v-if="table.hasOperation"
                :min-width="table.operation.minWidth ? table.operation.minWidth : ''">
                    <template slot="header" slot-scope="{ column, $index }">
                        <span>{{ column.label }}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <i class="el-icon-s-tools" style="font-size: 14px;cursor: pointer;" @click.stop="operationSortClick"></i>
                    </template>
                    <template slot-scope="scope">
                        <el-button v-for="item in table.operation.data" :class="item.classname ? item.classname: ''"
                        :key="item.id" @click.stop="handleOperation(item.event, scope.row)">{{ item.label }}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <template v-if="pager">
                <div class="pagination-container">
                    <el-pagination :current-page.sync="listInfo.query.pageIndex" :page-size="listInfo.query.pageSize"
                    :page-sizes="listInfo.pageSizes"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="listInfo.total" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"></el-pagination>
                </div>
            </template>
            <template
        </template>
    </div>
</template>
<script>
export default {
    props: {
        // 查询条件
        query: {
            type: Object,
            default: () => {
                return {}
            }
        },
        isFilterSearch: {
            type: Boolean,
            default: false,
        },
        // 获取数据接口
        api: {
            type: Function
        },
        pager: {
            type: Boolean,
            default: true
        },
        data: {
            type: Object,
            default: {}
        },
        // Table列表数据
        table: {
            type: Object,
            default() {
                return {
                    refresh: 1,
                    loading: false,  // 加载中的动画
                    border: false,  // 表格的边框
                    hasOperation: false,  //是否具有操作功能
                    hasNumber: false, // 是否有序号
                    data: [],  // 数据源
                    tr: [{   // 表头数据
                        id: '1',
                        label: '名称',
                        prop: 'prop',
                        className: 'classname',
                        minWidth: '80',
                        show: true   // show有三种值  true 显示   false 隐藏  template  自定义模块
                    }],
                    data: [],
                    operation: {
                        label: '操作',
                        width: '200',
                        className: '', //类名
                        data: [
                            {
                                label: '编辑',
                                Fun: 'editData',
                                id: '1',
                            }
                        ]
                    }
                }
            }
        }
    },
    data() {
        return {
            listInfo: {
                loading: false,
                total: 0, //总条数
                pageSizes: [5, 10, 20, 50, 100],  //分页数量
                query: { //查询参数
                    pageIndex: 1,
                    pageSize: 10,
                    keys: {}
                }
            },
            input: '',
            trData: [],
            
        }
    },
    computed: {
        searchMap: {
            get: function() {
                return this.data;
            },
            set: function(value) {
            }
        },
    },
    watch: {
        'table.refresh' (val) {
            if (!this.api) return;
            this.getList(this.api);
        },
        'table.tr' (val) {
            this.trData = val;
        }
    },
    methods: {
        operationSortClick() {
            this.$emit('sortShow');
        },
        renderHeader(h, { column, $index }) {
          return h('div', {
              domProps: {
                  innerHTML: column.label
              }
          });
        },
        filterSelectData(prop) {
            const query = this.listInfo.query;
            query.pageIndex = 1;
            query.pageSize = this.listInfo.query.pageSize;
            if (this.isFilterSearch) {
                query.keys[prop] = this.searchMap[prop];
            }
            this.getList(this.api);
        },
        resetSelectData(prop) {
            const query = this.listInfo.query;
            query.pageIndex = 1;
            query.pageSize = this.listInfo.query.pageSize;
            if (this.isFilterSearch) {
                this.searchMap[prop] = [];
                query.keys[prop] = [];
            }
            this.getList(this.api);
            
        },
        handleOperation(event, data) {
            this.$emit('handleEvent', event, data);
        },
        filterData(prop) {
            const query = this.listInfo.query;
            query.pageIndex = 1;
            query.pageSize = this.listInfo.query.pageSize;
            if (this.isFilterSearch) {
                query.keys[prop] = this.searchMap[prop];
            }
            this.getList(this.api);
        },
        resetAllData() {
            const query = this.listInfo.query;
            const mapValue = this.searchMap;
            for (let key in mapValue) {
                if (mapValue[key] instanceof Array) {
                    query.keys[key] = [];
                    mapValue[key] = [];
                } else {
                    query.keys[key] = "";
                    mapValue[key] = "";
                }
            }
        },


        resetData(prop) {
            const query = this.listInfo.query;
            query.pageIndex = 1;
            query.pageSize = this.listInfo.query.pageSize;
            if (this.isFilterSearch) {
                this.searchMap[prop] = '';
                query.keys[prop] = '';
            }
            this.getList(this.api);
        },
        // handleInputChange(va)
        handleSizeChange(val) {
            const query = this.listInfo.query;
            query.pageSize = val;
            query.pageIndex = 1;
            this.getList(this.api);
        },
        handleCurrentChange(val) {
            this.listInfo.pageIndex = val;  //当前页
            this.getList(this.api);
        },
        // 处理参数
        handleParam() {
            const obj = {};
            for (const key in this.query) {
                if (this.query[key] || this.query[key] === 0) {
                    obj[key] = this.query[key];
                }
            }
            return this.pager ? { ...this.listInfo.query, ...obj } : obj;
        },
        // 得到数据
        getList(api) {
            this.listInfo.loading = true;
            return new Promise((resolve, reject) => {
                api(this.handleParam()).then(res => {
                    this.listInfo.loading = false;
                    const arr = Array.isArray(res.data) ? res.data : [];
                    if (this.pager) {
                        this.listInfo.total = res.count;
                        this.listInfo.pageIndex = res.pageIndex - 0;
                        this.listInfo.pageSize = res.pageSize - 0;
                    }
                    resolve(res);
                    this.$emit('handleEvent', 'list', arr);
                }).catch(() => {
                    this.listInfo.loading = false;
                    resolve([]);
                })
            }).catch(() => {
                reject();
                this.listInfo.loading = false;
            })
        }

    }
}
</script>
<style lang="scss">
.filter-icon {
    cursor: pointer;
    margin-left: 8px;
    font-size: 14px;
    vertical-align: middle;
}
</style>

