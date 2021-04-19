<template>
  <div class="tl-rl">
    <template :table="table">
      <el-table
        ref="XMTable"
        v-loading="listInfo.loading"
        :data="table.data"
        highlight-current-row
        class="bueatyScroll"
        :height="table.height"
        :border="table.border"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDBClick"
        @selection-change="handleSelectionChange"
        style="width: 99.99%"
      >
        <el-table-column width="55" type="selection" v-if="table.hasSelection"></el-table-column>
        <el-table-column v-if="table.hasNumber" label="序号" type="index" width="50" />
        <template v-for="item,index in trData">
          <el-table-column
            v-if="item.show !== false && item.show === 'template'"
            :label="item.label"
            :class-name="item.className ? item.className : ''"
            :width="item.width ? item.width : ''"
            :min-width="item.minWidth? item.minWidth : ''"
          >
            <template slot-scope="scope">
              <slot :name="item.prop" :obj="scope" />
            </template>
          </el-table-column>
          <el-table-column
            v-if="item.show !== false && item.show !=='template'"
            :class-name="item.className ? item.className : ''"
            :width="item.width ? item.width : ''"
            :min-width="item.minWidth? item.minWidth : ''"
            :prop="item.prop"
            :label="item.label"
          />
        </template>
        <el-table-column
          v-if="table.hasOperation"
          column-key="operation"
          :label="table.operation.label"
          :width="table.operation.width ? table.operation.width : ''"
          :min-width="table.operation.minWidth ? table.operation.minWidth : ''"
        >
          <template slot-scope="scope">
            <el-button
              v-for="item in table.operation.data"
              :key="item.id"
              :class="item.classname ? item.classname: ''"
              @click.stop="handleOperation(item.event, scope.row)"
            >{{ item.label }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template v-if="pager">
        <div class="pagination-container">
          <el-pagination
            :small="true"
            :current-page.sync="listInfo.query.pageIndex"
            :page-size="listInfo.query.pageSize"
            :page-sizes="listInfo.pageSizes"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listInfo.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </template>
    </template></div>
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
    // 获取数据接口
    api: {
      type: Function
    },
    pager: {
      type: Boolean,
      default: true
    },
    // Table列表数据
    table: {
      type: Object,
      default() {
        return {
          refresh: 1,
          loading: false, // 加载中的动画
          height: 360,
          hasSelection: true,
          border: false, // 表格的边框
          hasOperation: false, // 是否具有操作功能
          hasNumber: false, // 是否有序号
          data: [], // 数据源
          tr: [{ // 表头数据
            id: '1',
            label: '名称',
            prop: 'prop',
            className: 'classname',
            minWidth: '80',
            show: true // show有三种值  true 显示   false 隐藏  template  自定义模块
          }],
          operation: {
            label: '操作',
            width: '200',
            className: '', // 类名
            data: [
              {
                label: '编辑',
                event: 'editData',
                id: '1'
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
        total: 0, // 总条数
        pageSizes: [5, 10, 20, 50, 100], // 分页数量
        query: { // 查询参数
          pageIndex: 1,
          pageSize: 10
          // keys: {}
        }
      },
      selectList: [],
      input: ''
    }
  },
  computed: {
    trData: {
      get: function() {
        return this.table.tr
      }
    }
  },
  watch: {
    'table.refresh'(val) {
      if (!this.api) return
      this.resetData();
      this.getList(this.api)
    }

  },
  methods: {
    renderHeader(h, { column, $index }) {
      return h('div', {
        domProps: {
          innerHTML: column.label
        }
      })
    },
    
    // handleSelectionChange(val) {
    //   this.selectList = val;
    // },
    // 实现单选的效果
    handleSelectionChange(val) {
      // val.forEach((row, index) => {
      //   if (index === val.length - 1) return
      //   this.$refs.XMTable.toggleRowSelection(row, false)
      // })
      // if (val.length > 1) {
      //   this.$refs.XMTable.clearSelection();
      //   this.$refs.XMTable.toggleRowSelection(val.pop());
      // } else {
      //   if (val.length > 0) {
      //     this.$emit('handleEvent', 'selectValue', val[0]);
      //   } 
      // }
      this.$emit('handleEvent', 'selectValue', val);
    },
    handleRowClick(row, column, event) {
      this.$emit('handleEvent', 'rowClick', row);
    },
    handleRowDBClick(row) {
      this.$emit('handleEvent','dbClick', row);
    },
    handleOperation(event, data) {
      this.$emit('handleEvent', event, data)
    },
    filterData(prop) {
      const query = this.listInfo.query
      query.pageIndex = 1
      query.pageSize = 10

      this.getList(this.api)
    },
    resetData(prop) {
      const query = this.listInfo.query
      query.pageIndex = 1
      query.pageSize = 10
      // this.getList(this.api)
    },
    // handleInputChange(va)
    handleSizeChange(val) {
      const query = this.listInfo.query
      query.pageSize = val
      query.pageIndex = 1
      this.getList(this.api)
    },
    handleCurrentChange(val) {
      this.listInfo.pageIndex = val // 当前页
      this.getList(this.api)
    },
    // 处理参数
    handleParam() {
      const obj = {}
      for (const key in this.query) {
        obj[key] = this.query[key]
      }
      return this.pager ? { ...this.listInfo.query, ...obj } : obj
    },
    // 得到数据
    getList(api) {
      this.listInfo.loading = true
      return new Promise((resolve, reject) => {
        api(this.handleParam()).then(res => {
          this.listInfo.loading = false
          const arr = Array.isArray(res.data.items) ? res.data.items : []
          if (this.pager) {
            this.listInfo.total = res.data.totalCount
            this.listInfo.pageIndex = res.data.pageIndex - 0
            this.listInfo.pageSize = res.data.pageSize - 0
          }
          resolve(res)
          this.$emit('handleEvent', 'list', arr)
        }).catch(() => {
          this.listInfo.loading = false
          resolve([])
        })
      }).catch(() => {
        reject()
        this.listInfo.loading = false
      })
    }

  }
}
</script>

<style lang="scss">
.bueatyScroll .el-table__body-wrapper::-webkit-scrollbar-track-piece {
	background-color:#f8f8f8;
}
.bueatyScroll .el-table__body-wrapper::-webkit-scrollbar {
	width:6px;
  height: 12px;
}
.bueatyScroll .el-table__body-wrapper::-webkit-scrollbar-thumb {
	background-color:#dddddd;
	border-radius: 100px;
}
.bueatyScroll .el-table__body-wrapper::-webkit-scrollbar-thumb:hover {
	background-color:#bbb;
}
</style>