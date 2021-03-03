<template>
  <div id="nav-warp">
    <div class="logo-area">
      新感觉设计系统
    </div>
    <div class="handle-area">
      <div class="preview-btn" @click="saveData">
        <span>保存模板</span>
      </div>
      <div class="preview-btn" @click="download">
        <i class="el-icon-reading" />
        <span>打印预览</span>
      </div>
      <div class="preview-btn" @click="clearData">
        <i class="el-icon-magic-stick" />
        <span>清空画布</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import _ from 'lodash'
export default {
  computed: {
    ...mapGetters(['storeList', 'labelVersion', 'components'])
  },
  methods: {
    download() {
      this.$store.dispatch('components/setActive', '')
      this.$nextTick(() => {
        this.$pdf('canvas_board')
      })
    },
    clearData() {
      // clearAllComponent
      this.$store.dispatch('components/clearAllComponent')
    },
    saveData() {
      const newComponentData = _.forEach(this.storeList, (item, key) => {
        _.unset(item, 'isInstance')
      })
      console.log(this.components.maxComponentId)
      const jsonData = {
        Name: this.labelVersion.name,
        Properties: {
          PaperWidth: this.labelVersion.width,
          PaperHeight: this.labelVersion.height,
          TopMargin: this.labelVersion.TopMargin,
          BottomMargin: this.labelVersion.BottomMargin,
          LeftMargin: this.labelVersion.LeftMargin,
          RightMargin: this.labelVersion.RightMargin,
          IsShowBorder: this.labelVersion.isShowBorder
        },
        ViewableControls: newComponentData
      }
      const jsonString = JSON.stringify(jsonData)
      console.log(jsonString)
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
            i {
                margin-right: 5px;
            }
        }
    }
}
</style>

