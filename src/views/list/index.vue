<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchKey" placeholder="输入名字查询模板" style="width: 220px"></el-input>
      <el-button type="primary" style="marginLeft: 10px" @click="searchData">查询</el-button>
      <el-button type="success" style="marginLeft: 10px" @click="addData">新增</el-button>
    </div>
    <div class="filter-container">
      <el-col :span="24">
        <template v-for="item in vList">
          <div class="filte-Box">
            <el-card class="box-card">
              <div class="clearfix" slot="header">
                <span style="font-weight: bold">{{ item.name }}</span>
                <div class="right">
                  <i class="el-icon-edit label_icon" @click="toEdit(item.id)"></i>
                  <i class="el-icon-printer label_icon" @click="toPrint(item.id)"></i>
                  <i class="el-icon-delete label_icon" style="color:red" @click="del(item.id)"></i>
                </div>
              </div>
              <div class="img-div">
                <img src="@/assets/test.png"/>
              </div>
              <div class="text-div">
                <p class="lead"><span>名称:</span> {{ item.name }}</p>
                <p class="lead"><span>大小:</span> {{ item.width }} 厘米 * {{ item.height }} 厘米</p>
              </div>
            </el-card>
          </div>
        </template>
      </el-col>
      <!-- <el-col :span="24" class="pager" v-if="vList.length > 0">
        <el-pagination :page-size="20" :page-count="10" :total="300" layout="prev, pager, next"></el-pagination>
      </el-col> -->
    </div>
    <page-dialog
      :title="dialogInfo.title"
      :b-list="dialogInfo.bList"
      :visible.sync="dialogInfo.visible"
      width="448px"
      @handleClick="handleClick"
    >
      <el-form :model="form" inline>
        <el-form-item label="名称:">
          <el-input v-model="form.name" style="width: 220px"></el-input>
        </el-form-item>
      </el-form>
    </page-dialog>
  </div>
</template>
<script>
import PageDialog from '@/components/PageDialog'
import { mapGetters, mapActions } from 'vuex'
import Drag from '@/components/DragShow'
export default {
  components: {
    Drag,
    PageDialog,
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
      vList: [],
      form: {
        name: ''
      },
      dialogInfo: {
        title: '新增标签',
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
    this.loadData();
  },
  methods: {
    ...mapActions({
      getTagList: 'label/getTagList',
      deleteTagData: 'label/deleteTagData',
      postTagData: 'label/postTagData',
    }),
    searchData() {
      const param = {
        key: this.searchKey
      };
      this.getTagList(param).then(res => {
        this.vList = _.map(res, item => {
          let width, height;
          if (_.isEmpty(item.content)) {
            width = 500;
            height = 500;
          } else {
            const componentData =  JSON.parse(item.content);
            width = componentData.Properties.paperWidth;
            height = componentData.Properties.paperHeight;
          }
          return {
            name: item.name,
            width: width,
            height: height,
            id: item.id,
          }
        });
      })

      console.log('Hello Venus');
      console.log(this.searchKey);
    },
    handleClick(event, data) {
      switch (event) {
        case 'close':
          this.dialogInfo.visible = false
          break
        case 'save':
          const param = {
            name: this.form.name,
            content: ''
          };
          this.postTagData(param).then(res => {
            console.log(res);
            this.dialogInfo.visible = false;
            this.loadData();
          })
          // this.dialogInfo.visible = false
          break
        default:
          break
      }
    },
    loadData() {
      this.getTagList().then(res => {
        this.vList = _.map(res, item => {
          let width, height;
          if (_.isEmpty(item.content)) {
            width = 500;
            height = 500;
          } else {
            const componentData =  JSON.parse(item.content);
            width = componentData.Properties.paperWidth;
            height = componentData.Properties.paperHeight;
          }
          return {
            name: item.name,
            width: width,
            height: height,
            id: item.id,
          }
        });
      });
    },
    addData() {
      this.form.name = '';
      this.dialogInfo.visible = true;
    },
    editData() {
      const routeData = this.$router.resolve({
        name: 'Create'
      })
      window.open(routeData.href, '_blank')
    },
    toEdit(id) {
      this.$router.push({
        name: 'Create',
        query: {
          id
        }
      });
    },
    toPrint(id) {
      this.$router.push({
        name: 'PrintList',
        query: {
          id
        }
      })
    },
    del(id) {
      this.$confirm('请确认是否删除该标签', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '返回',
        type: 'warning'
      }).then(() => {
        this.deleteTagData(id).then(res => {
          this.$message.success('删除成功');
          this.loadData();
        });
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
    height: 180px;
    // border: 1px solid #ccc;
    text-align: center;
    margin: 5px;
    // background-color: #ddd;
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
      // font-weight: 300;
      font-size: 14px;
      // font-weight: bold;
      margin-bottom: 12px;
      span {
        font-weight: 600;
      }
    }
  }
}
.filte-Box {
  width: 438px;
  float: left;
  margin-right: 18px;
}
</style>
