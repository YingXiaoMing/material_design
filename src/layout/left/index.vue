<template>
  <div class="component-menu-warp">
    <el-collapse v-model="menu" class="collapse-menu">
      <el-collapse-item v-for="(item, index) in componentList" :key="index" :title="item.title" :name="item.title">
        <template v-if="item.list && item.list.length > 0">
          <draggable class="component-list" v-bind="dragOptions" :component-data="getComponentData">
            <div v-for="(tag, index) in item.list" :key="tag.id" class="item" :data-component-id="tag.id">
              <span class="name">{{ tag.title }}</span>
              <svg-icon :icon-class="tag.icon" />
            </div>
          </draggable>
        </template>
      </el-collapse-item>
      <el-collapse-item name="LabelVersion" title="标签版本">
        <div class="Label_Version">
          <el-form :model="model">
            <el-form-item label="标签版本:">
              <el-select
                v-model="model.version"
                placeholder="请选择标签版本"
                style="width: 176px"
                @click.native="getOptionData"
                @change="handleSelectChange"
              >
                <el-option v-for="item in versionOption" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 140px" type="info" @click="addLabelVersion">新增标签版本</el-button>
              <el-button style="width: 140px" type="info">复制标签版本</el-button>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 140px" type="info" @click="setDefaultLabel">设置默认标签</el-button>
              <el-button style="width: 140px" type="info" @click="addNewField">自定义字段</el-button>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 140px" type="primary" icon="el-icon-check" @click="saveLabelData">保存标签版本</el-button>
              <el-button style="width: 140px" type="danger" icon="el-icon-delete" @click="deleteLabelData">删除标签版本</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <page-dialog
      :title="dialogInfo.title"
      :b-list="dialogInfo.bList"
      :visible.sync="dialogInfo.visible"
      width="808px"
      @handleClick="handleClick"
    >
      <custom-field />
    </page-dialog>
    <page-dialog
      :title="labelDialogInfo.title"
      :b-list="labelDialogInfo.bList"
      :visible.sync="labelDialogInfo.visible"
      width="428px"
      @handleClick="newLabelHandleClick"
    >
      <el-form :model="form" inline>
        <el-col :span="24">
          <el-form-item label="标签版本名称:">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
      </el-form>
    </page-dialog>
  </div>
</template>
<script>
import PageDialog from '@/components/PageDialog'
import draggable from 'vuedraggable'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { showLoading, hideLoading } from '@/utils/loading'
import CustomField from './customField.vue'
import _ from 'lodash'
export default {
  components: {
    draggable,
    PageDialog,
    CustomField
  },
  data() {
    return {
      menu: ['构图元素', 'LabelVersion'],
      model: {
        version: ''
      },
      form: {
        name: ''
      },
      labelDialogInfo: {
        title: '新增标签版本',
        visible: false,
        type: 0, //  0代表新增  1代表编辑
        bList: [
          { label: '关闭', show: true, event: 'close' },
          { label: '保存', show: true, event: 'save' }
        ]
      },
      dialogInfo: {
        title: '自定义字段',
        visible: false,
        type: 0, //  0代表新增  1代表编辑
        bList: [
          { label: '关闭', show: true, event: 'close' },
          { label: '保存', show: true, event: 'save' }
        ]
      },
      versionOption: []
    }
  },
  created() {
    this.loadData()
  },
  computed: {
    ...mapGetters(['componentList', 'storeList', 'labelVersion', 'components', 'pageAttribute']),
    dragOptions() {
      return {
        sort: false,
        group: {
          name: 'component',
          pull: 'clone',
          put: false
        }
      }
    },
    getComponentData() {
      return {}
    }
  },
  methods: {
    ...mapActions({
      getTagList: 'label/getTagList',
      postTagData: 'label/postTagData',
      updateTagData: 'label/updateTagData',
      getTagContainById: 'label/getTagContainById',
      setLabelVersion: 'label/setLabelVersion',
      setLabelName: 'components/setLabelName',
      deleteTagData: 'label/deleteTagData',
      setComponentsList: 'components/setComponentsList',
      clearAllComponent: 'components/clearAllComponent',
      setComponentID: 'components/setComponentID'
    }),
    deleteLabelData() {
      this.$confirm('请确认是否删除该标签版本', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '返回',
        type: 'error'
      }).then(() => {
        const id = this.model.version
        this.deleteTagData(id).then(res => {
          this.$message.success('删除成功')
          this.loadData()
        })
      })
    },
    getOptionData() {
      this.getTagList().then(res => {
        console.log('测试标签的数据');
        console.log(res);
        this.versionOption = _.map(res, item => {
          return {
            label: item.name,
            value: item.id
          }
        })
      })
    },
    handleSelectChange(val) {
      // console.log('越短越有戏');
      this.getContainData(val)
    },
    saveLabelData() {
      const newComponentData = _.forEach(this.storeList, (item, key) => {
        _.unset(item, 'isInstance')
      })
      const jsonData = {
        Name: this.pageAttribute.name,
        Properties: {
          paperWidth: this.pageAttribute.width,
          paperHeight: this.pageAttribute.height,
          topMargin: this.pageAttribute.topMargin,
          bottomMargin: this.pageAttribute.bottomMargin,
          leftMargin: this.pageAttribute.leftMargin,
          rightMargin: this.pageAttribute.rightMargin,
          isShowBorder: this.pageAttribute.isShowBorder
        },
        ViewableControls: newComponentData,
        MaxComponentId: this.components.maxComponentId
      }
      const componentData = JSON.stringify(jsonData)
      const param = {
        id: this.model.version,
        name: this.pageAttribute.name,
        content: componentData
      }
      console.log(param);
      this.updateTagData(param).then(res => {
        this.$message.success('保存成功')
      })
    },
    loadData() {
      this.getTagList().then(res => {
        console.log(res);
        this.versionOption = _.map(res, item => {
          return {
            label: item.name,
            value: item.id
          }
        })
        const firstValue = this.versionOption[0].value
        this.model.version = firstValue
        this.getContainData(firstValue)
      })
    },
    getContainData(id) {
      showLoading()
      this.getTagContainById(id).then(res => {
        hideLoading();
        const componentStr = res.content;
        if (!_.isEmpty(componentStr)) {
          const componentData = JSON.parse(componentStr);
          _.map(componentData.ViewableControls, item => {
            item.isInstance = true
          });
          this.$store.dispatch('components/setComponentsList', componentData.ViewableControls);
          this.$store.dispatch('components/setComponentID', componentData.MaxComponentId);
        } else {
          this.$store.dispatch('components/clearAllComponent');
        }
        // const componentPrintData = JSON.parse(componentStr);
        // const newData = _.assign(this.labelVersion, {
        //   name: res.name
        // })
        // this.setLabelVersion(newData)
        // const content = res.content
        // if (!_.isEmpty(content)) {
        //   const componentData = JSON.parse(content)
        //   this.$store.dispatch('label/setBoardWidth', componentData.Properties.paperWidth)
        //   this.$store.dispatch('label/setBoardHeight', componentData.Properties.paperHeight)
        //   this.$store.dispatch('label/setBoardLeftMargin', componentData.Properties.leftMargin)
        //   this.$store.dispatch('label/setBoardRightMargin', componentData.Properties.rightMargin)
        //   this.$store.dispatch('label/setBoardTopMargin', componentData.Properties.topMargin)
        //   this.$store.dispatch('label/setBoardBottomMargin', componentData.Properties.bottomMargin)
        //   _.map(componentData.ViewableControls, item => {
        //     item.isInstance = true
        //   })
        //   this.setComponentsList(componentData.ViewableControls)
        //   if (componentData.MaxComponentId) {
        //     this.$store.dispatch('components/setComponentID', componentData.MaxComponentId)
        //   } else {
        //     this.$store.dispatch('components/setComponentID', 0)
        //   }
        // } else {
        //   this.clearAllComponent()
        // }
      })
    },
    addNewField() {
      this.dialogInfo.visible = true
    },
    setDefaultLabel() {
      this.$message.success('设置成功')
    },
    addLabelVersion() {
      this.labelDialogInfo.visible = true
    },
    newLabelHandleClick(event, data) {
      switch (event) {
        case 'close':
          this.labelDialogInfo.visible = false
          break
        case 'save':
          if (this.form.name == '') {
            this.$message.warning('名称不能为空')
            return
          }
          const param = {
            name: this.form.name
          }
          this.postTagData(param).then(res => {
            this.labelDialogInfo.visible = false
            this.$message.success('新增标签版本成功')
          })

          break
        default:
          break
      }
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
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';
.component-menu-warp {
    .collapse-menu {
        .el-collapse-item__header {
            background-color: $lightBackground;
            padding: 0 15px;
            transition: .3s ease all;
            &:hover {
                color: $skyBlue;
                border-color: 1px solid $skyBlue;
            }
        }
        .Label_Version {
          padding: 5px;
          .el-form-item {
            margin-bottom: 12px;
          }
        }
        .component-list {
            padding: 15px;
            .item {
                cursor: pointer;
                padding: 8px;
                border: 1px solid $border;
                margin-bottom: 10px;
                border-radius: 2px;
                color: $generalFontColor;
                transition: .3s ease all;
                display: flex;
                align-items: center;
                box-shadow: 0 0 4px rgba(0, 21, 41, .13);
                justify-content: space-between;
                &:hover {
                    color: $skyBlue;
                    border: 1px solid $skyBlue;
                    i {
                        color: $skyBlue;
                    }
                }
                i {
                    font-size: 16px;
                    color: $info;
                }
            }
        }
    }
}
</style>
