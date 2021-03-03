<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- <el-button icon="el-icon-plus">创建模板</el-button> -->
      <el-table :data="tableData" border class="mo_table">
        <el-table-column label="模板名称" prop="name" />
        <el-table-column label="操作" width="220px">
          <template slot-scope="props">
            <el-button icon="el-icon-search" @click="searchData">查看</el-button>
            <el-button icon="el-icon-edit" @click="editData">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <page-dialog
      :title="dialogInfo.title"
      :b-list="dialogInfo.bList"
      :visible.sync="dialogInfo.visible"
      width="808px"
      @handleClick="handleClick"
    >
      <el-row :gutter="24">
        <el-col :span="24">
          <el-button icon="el-icon-printer" class="printBtn" @click="printData">打印</el-button>
        </el-col>
        <el-col :span="24">
          <div id="star_moban" ref="moban_board" class="moban_board">
            <template v-for="item in storeList">
              <drag
                :key="item.id"
                :default-x="item.default.x"
                :default-y="item.default.y"
                :aim-id="item.id"
                :component-object="item"
                :is-instance="item.instance"
                :default="item.default"
              />
            </template>
          </div>
        </el-col>
      </el-row>
    </page-dialog>
  </div>
</template>
<script>
import PageDialog from '@/components/PageDialog'
import { mapGetters } from 'vuex'
import Drag from '@/components/DragShow'

export default {
  components: {
    PageDialog,
    Drag
  },
  computed: {
    ...mapGetters(['storeList'])
  },
  data() {
    return {
      left: '',
      right: '',
      right: '',
      top: '',
      bottom: '',
      tableData: [{
        name: '通用模板'
      }],
      dialogInfo: {
        title: '查看模板',
        visible: false,
        type: 0, //  0代表新增  1代表编辑
        bList: [
          { label: '关闭', show: true, event: 'close' },
          { label: '保存', show: true, event: 'save' }
        ]
      }
    }
  },
  created() {
    console.log(this.storeList)
  },
  methods: {
    initLayoutData() {

    },
    handleClick(event, data) {
      switch (event) {
        case 'close':
          this.dialogInfo.visible = false
          break
        case 'save':
          this.dialogInfo.visible = false
          break
        default:
          break
      }
    },
    searchData() {
      this.dialogInfo.visible = true
      this.initLayoutData()
    },
    editData() {
      const routeData = this.$router.resolve({
        name: 'Create'
      })
      window.open(routeData.href, '_blank')
    },
    printData() {
      this.$pdf('star_moban')
    }
  }
}
</script>
<style lang="scss">
.mo_table {
    margin-top: 12px;
}
.moban_board {
    width: 768px;
    height: 460px;
    background-color: #fff;
    border-radius: 2px;
    position: relative;
    border: 1px solid #ddd;
    .item {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        z-index: -1;
    }
}
.printBtn {
    position: relative;
    margin-bottom: 10px;
    float: right;
}

</style>
