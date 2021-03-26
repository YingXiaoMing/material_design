<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchKey" placeholder="输入名字查询模板" style="width: 220px"></el-input>
      <el-button type="primary" style="marginLeft: 10px">查询</el-button>
    </div>
    <div class="filter-container">
      <el-col :span="24">
        <el-col :span="6">
           <el-card class="box-card">
            <div class="clearfix" slot="header">
              <span>测试标签</span>
              <div class="right">
                <i class="el-icon-edit label_icon" @click="toEdit"></i>
                <i class="el-icon-printer label_icon"></i>
              </div>
            </div>
            <div class="img-div">
              <img src="@/assets/test.png"/>
            </div>
            <div class="text-div">
              <p class="lead">测试标签</p>
              <p><span>大小:</span> 500 厘米 * 500 厘米</p>
            </div>
          </el-card>
        </el-col>
      </el-col>
      <el-col :span="24" class="pager">
        <el-pagination :page-size="20" :page-count="10" :total="300" layout="prev, pager, next"></el-pagination>
      </el-col>
    </div>
    
  </div>
</template>
<script>
import PageDialog from '@/components/PageDialog'
import { mapGetters } from 'vuex'
import Drag from '@/components/DragShow'

export default {
  components: {
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
      searchKey: '',
    }
  },
  created() {
    console.log(this.storeList)
  },
  methods: {
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
    toEdit() {
      this.$router.push({
        name: 'Create',
        query: {
          id: 1
        }
      });
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
.filter-container {
  .right {
    float: right;
  }
  .pager {
    margin-top: 30px;
  }
  .label_icon {
    font-size: 20px;
    margin-right: 6px;
    cursor: pointer;
  }
  .img-div {
    float: left;
    width: 206px;
    height: 266px;
    border: 1px solid #ccc;
    text-align: center;
    margin: 5px;
    background-color: #ddd;
    img {
      max-height: 200px;
      max-width: 200px;
      background-color: #fff;
      margin: 2px;
    }
  }
  .text-div {
    margin: 5px;;
    float: left;
    .lead {
      font-weight: 300;
      font-size: 22px;
      margin-bottom: 12px;
    }
  }
}
</style>
