<template>
  <div class="custom_table">
    <el-row :gutter="24">
      <el-button type="success" icon="el-icon-circle-plus-outline" class="add_custom_Btn" @click="addData">新增</el-button>
      <div class="custom_board">
        <el-col v-for="it in dataList" :span="24" style="marginBottom: 6px">
          <el-col :span="6">
            <span class="custom_table_title">{{ it.name }}</span>
          </el-col>
          <el-col :span="12">
            <el-select v-model="it.model">
              <el-option v-for="item in it.option" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-button @click="editData">编辑</el-button>
            <el-button>删除</el-button>
          </el-col>
        </el-col>
      </div>
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
              <el-radio label="basic">基础数据</el-radio>
              <el-radio label="custom">自定义</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <template v-if="form.type == 'basic'">
          <el-col :span="24">
            <el-form-item label="来源方式:">
              <el-select v-model="form.origin">
                <el-option label="生产线" value="生产线" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="显示字段:">
              <el-select v-model="form.field">
                <el-option label="生产线" value="生产线" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="字段内容:">
              <el-select v-model="form.fieldContain">
                <el-option label="生产线" value="生产线" />
              </el-select>
            </el-form-item>
          </el-col>
        </template>
        <template v-else>
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

export default {
  components: {
    PageDialog
  },
  data() {
    return {
      dataList: [{
        name: '生产线',
        model: 'line1',
        option: [{
          label: '一线',
          value: 'line1'
        }, {
          label: '二线',
          value: 'line2'
        }]
      }, {
        name: '负责人',
        model: 'ping1',
        option: [{
          label: '吴耿平',
          value: 'ping1'
        }, {
          label: '吴亦凡',
          value: 'ping2'
        }]
      }],
      form: {
        name: '',
        type: 'basic',
        origin: '生产线',
        field: '生产线',
        fieldContain: '生产线',
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
  methods: {
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
          if (this.form.type === 'custom') {
            const listData = this.form.customFiled.split(',')
            console.log(listData)
            const newData = _.map(listData, (item, i) => {
              return {
                label: item,
                value: i
              }
            })
            this.dataList.push({
              name: '负责人',
              model: newData[0].value,
              option: newData
            })
          }
          this.dialogInfo.visible = false
          break
        default:
          break
      }
    },
    addData() {
      this.form = {
        name: '',
        type: 'basic',
        origin: '生产线',
        field: '生产线',
        fieldContain: '生产线',
        customFiled: ''
      }
      this.dialogInfo.visible = true
    },
    editData() {
      this.dialogInfo.visible = true
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
