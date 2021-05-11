<template>
  <div class="custom_table">
    <el-row :gutter="24">
      <el-button type="success" icon="el-icon-circle-plus-outline" class="add_custom_Btn" @click="addData">新增</el-button>
      <el-table border height="380" highlight-current-row 
      style="width: 99.99%" :data="dataList" :loading="loading">
        <el-table-column label="名称" prop="name" width="120px"></el-table-column>
        <el-table-column label="数据类型" prop="type" width="88px">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 2">自定义</span>
            <span v-if="scope.row.type == 1">基础数据</span>
          </template>
        </el-table-column>
        <el-table-column label="数据" prop="option"></el-table-column>
        <el-table-column label="操作" prop="operation">
          <template slot-scope="scope">
            <el-button @click="editData(scope.row.key)" icon="el-icon-edit" size="small">编辑</el-button>
            <el-button @click="deleteData(scope.row.key)" type="danger" icon="el-icon-delete" size="small">删除</el-button>
          </template>
          
        </el-table-column>
      </el-table>
    </el-row>
    <page-dialog
      :title="dialogInfo.title"
      :b-list="dialogInfo.bList"
      :visible.sync="dialogInfo.visible"
      width="448px"
      @handleClick="handleClick"
    >
      <el-form :model="form" inline class="m_form" label-width="88px">
        <el-col :span="24">
          <el-form-item label="显示名称:">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="绑定类型:">
            <el-radio-group v-model="form.type">
              <el-radio label="2">基础数据</el-radio>
              <el-radio label="1">自定义</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <template v-if="form.type === '1'">
          <e-col :span="24">
            <el-form-item label="自定义数据:">
              <el-input v-model="form.customFiled" :rows="4" type="textarea" />
              <div>（数据以逗号形式隔开，例如<span style="color:red">名称，规格，大小</span>）</div>
            </el-form-item>
          </e-col>
        </template>
      </el-form>
    </page-dialog>
  </div>

</template>
<script>
import PageDialog from '@/components/PageDialog'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    PageDialog
  },
  data() {
    return {
      dataList: [],
      loading: false,
      form: {
        id: '',
        name: '',
        type: '1',
        customFiled: ''
      },
      dialogInfo: {
        title: '自定义绑定字段',
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
      getCustomList: 'label/getCustomList',
      postCustom: 'label/postCustom',
      getCustomById: 'label/getCustomById',
      updateCustom: 'label/updateCustom',
    }),
    loadData() {
      this.loading = true;
      this.getCustomList().then(res => {
        this.loading = false;
        this.dataList = _.map(res, item => {
          return {
            key: item.id,
            name: item.name,
            type: item.type,
            option: item.content,
          }
        })
      })
    },
    handleClick(event, data) {
      switch (event) {
        case 'close':
          this.dialogInfo.visible = false
          break
        case 'save':
          if (_.isEmpty(this.form.name)) {
            this.$message.warning('名称不能为空')
            return
          }
          const param = {
            name: this.form.name,
            type: parseInt(this.form.type),
            content: this.form.type == '1' ? this.form.customFiled : ''
          }
          if (this.dialogInfo.type == 0) {
            this.postCustom(param).then(() => {
              this.dialogInfo.visible = false;
              this.loadData();
            });
          } else if (this.dialogInfo.type == 1) {
            param.id = this.form.id;
            this.updateCustom(param).then(() => {
              this.dialogInfo.visible = false;
              this.loadData();
            });
          }          
          break
        default:
          break
      }
    },
    addData() {
      this.form = {
        name: '',
        type: '2',
        customFiled: '' 
      }
      this.dialogInfo.visible = true;
      this.dialogInfo.type = 0;
      this.dialogInfo.title = '新增自定义字段';
    },
    editData(id) {
      this.getCustomById(id).then(res => {
        this.form = {
          id: res.id,
          name: res.name,
          type: res.type.toString(),
          customFiled: res.type == 1 ? res.content: '',
        }
        this.dialogInfo.visible = true;
        this.dialogInfo.type = 1;
        this.dialogInfo.title = "编辑自定义字段";
      });
      
    }
  }
}
</script>
<style lang="scss">
    .custom_table {
        position: relative;
        .add_custom_Btn {
            margin-bottom: 4px;
        }
        .custom_board {
            padding-top: 4px;
            padding-bottom: 4px;
            border: 1px solid #ccc;
            height: 480px;
            overflow: auto;
        }
        .custom_table_title {
            line-height: 36px;
            height: 36px;
            font-size: 16px;
            font-weight: 200;
        }
    }
    .m_form {
        .el-form-item {
            margin-bottom: 6px;
        }
    }
</style>
