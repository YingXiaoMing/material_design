<template>
  <div id="nav-warp">
    <div class="logo-area">
      设计系统
    </div>
    <div class="handle-area">
      <div class="preview-btn" @click="toList">
        <svg-icon icon-class="return" />
        <span>返回列表</span>
      </div>
      <div class="preview-btn" @click="customData">
        <svg-icon icon-class="customs"></svg-icon>
        <span>自定义字段</span>
      </div>
      <div class="preview-btn" @click="saveData">
        <svg-icon icon-class="save" />
        <span>保存模板</span>
      </div>
      <!-- <div class="preview-btn" @click="download">
        <i class="el-icon-reading" />
        <span>打印预览</span>
      </div> -->
      <div class="preview-btn" @click="clearData">
        <i class="el-icon-magic-stick" />
        <span>清空画布</span>
      </div>
    </div>
    <page-dialog
      :title="dialogInfo.title"
      :b-list="dialogInfo.bList"
      :visible.sync="dialogInfo.visible"
      width="808px"
      @handleClick="handleClick"
    >
      <custom-field />
    </page-dialog>
  </div>
  
</template>
<script>
import PageDialog from '@/components/PageDialog'
import { mapGetters, mapActions } from 'vuex'
import CustomField from '../left/customField'
import Cookies from 'js-cookie'
import _ from 'lodash'
export default {
  computed: {
    ...mapGetters(['storeList', 'pageAttribute', 'components', 'printData'])
  },
  components: {
    PageDialog,
    CustomField
  },
  data() {
    return {
      dialogInfo: {
        title: '自定义字段',
        visible: false,
        type: 0, //  0代表新增  1代表编辑
        bList: [
          { label: '关闭', show: true, event: 'close' },
          { label: '保存', show: true, event: 'save' }
        ]
      },
    }
  },
  methods: {
    ...mapActions({
      setComponentsList: 'components/setComponentsList',
      updateTagData: 'label/updateTagData',
      newTemplateDynamic: 'label/newTemplateDynamic',
    }),
    download() {
      this.$store.dispatch('components/setActive', '')
      this.$nextTick(() => {
        this.$pdf(this.printData.length);
      })
    },
    clearData() {
      // clearAllComponent
      this.$store.dispatch('components/clearAllComponent')
    },
    toList() {
      this.$router.push({
        name: 'List'
      });
    },
    handleClick(event, data) {
      switch (event) {
        case 'close':
          this.dialogInfo.visible = false;
          break;
        case 'save':
          this.dialogInfo.visible = false;
          break;
        default:
          break;
      }
    },
    customData() {
      this.dialogInfo.visible = true;
    },
    readData() {
      const str = '{"Name":"测试版本","Properties":{"paperWidth":480,"paperHeight":480,"topMargin":10,"bottomMargin":10,"leftMargin":10,"rightMargin":10,"isShowBorder":true},"ViewableControls":[{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":2,"x_position":40,"y_position":56.5},"id":"2"},{"type":"LabelBox","userControlledProperties":"InputMenu","title":"文本框","properties":{"width":312,"height":51,"x_position":143,"y_position":22.5,"fontSize":"36px","isField":false,"fieldLendge":"","text":"公司固定资产卡片","color":"#000"},"id":"4"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":107,"height":45,"x_position":5,"y_position":89.5,"text":"设备名称","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"5"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":113,"height":45,"x_position":7,"y_position":157.5,"text":"资产编号","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"7"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":117,"y_position":124.5},"id":"8"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":119,"y_position":184.5},"id":"9"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":115,"height":51,"x_position":229,"y_position":90.5,"text":"启用日期","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"10"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":98,"height":39,"x_position":232,"y_position":158.5,"text":"使用人","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"11"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":334,"y_position":124.5},"id":"12"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":335,"y_position":189.5},"id":"13"},{"type":"BarCode","userControlledProperties":"BarCodeMenu","title":"条形码","properties":{"width":428,"height":207,"x_position":7,"y_position":223.5,"text":"GCP-0-002","format":"CODE128","textPosition":"bottom","lineWidth":2,"bodyHeight":40,"fontSize":14,"displayValue":true,"data":" "},"id":"14"}]}';
      const componentData = JSON.parse(str);
      _.map(componentData.ViewableControls, item => {
        item.isInstance = true
      });
      this.setComponentsList(componentData.ViewableControls);
      this.$store.dispatch('components/setComponentID', 11);
    },
    saveData() {
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
        id: this.components.operateId,
        name: this.pageAttribute.name,
        content: componentData
      };
      this.updateTagData(param).then(res => {
        this.$message.success('保存成功');
      });
      const macthList = _.filter(newComponentData, item => {
        return item.type == 'TextBox' && item.properties.dataSource.origin == 'WebAPI' && !_.isEmpty(item.properties.dataSource.apiWebData)
      });
      const newResult = _.map(macthList, item => {
        return {
          customId: item.properties.dataSource.apiWebData,
          componentId: item.id
        }
      });
      if (newResult.length > 0) {
        const newParam = {
          id: this.components.operateId,
          templateList: newResult
        };
        this.newTemplateDynamic(newParam).then(res => {
          // this.$message.success('新增成功');
        })
      }
    
      // window.localStorage.setItem('app_components', res);
      // this.$message.success('保存成功');
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/variables.scss';
#nav-warp {
    width: 100%;
    height: 32px;
    background-color: #FFF;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-shadow: $shadowBottom;
    position: relative;
    justify-content: space-between;
    z-index: 100;
    .logo-area {
        color: $skyBlue;
        font-weight: 500;
        font-size: 22px;
    }
    .handle-area {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 10px 0;
        .preview-btn {
            font-size: 14px;
            color: $generalFontColor;
            cursor: pointer;
            margin-right: 15px;
            height: 100%;
            display: flex;
            align-items: center;
            padding-right: 15px;
            border-right: 1px solid $border;
            &:last-of-type {
                margin-right: 0;
            }
            &:hover {
                text-decoration: underline;
                color: $skyBlue;
            }
            i,.svg-icon {
                margin-right: 5px;
            }
        }
    }
}
</style>

