<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width"
    :append-to-body="appendToBody"
    :before-close="handleClose"
    :close-on-click-modal="false"
    class="t_dialog"
  >
    <slot />
    <div slot="footer" if="bList" class="dialog-footer">
      <template v-for="(item, index) in getConfigList()">
        <el-button
          v-if="item.show"
          :key="index"
          :type="item.type"
          :icon="item.icon"
          @click="handleClick(item.event)"
        >
          {{ item.label }}
        </el-button>
      </template>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'PageDialog',
  props: {
    // 自定义类名
    className: {
      type: String
    },
    // 标题
    title: {
      type: String
    },
    // 弹窗是否显示
    visible: {
      type: Boolean,
      default: false
    },
    // 弹窗宽度
    width: {
      type: String
    },
    // 操作栏配置
    bList: {
      type: Array
    },
    // 插入到body
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    visible(val) {
      this.$emit('update:visible', val)
    }
  },
  methods: {
    // 获取按钮列表
    getConfigList() {
      return this.bList.filter(item => !item.hasOwnProperty('show') || (item.hasOwnProperty('show') && item.show))
    },
    // 关闭弹窗前的回调
    handleClose(done) {
      this.$emit('update:visible', false)
    },
    handleClick(event, data) {
      this.$emit('handleClick', event, data)
    }
  }
}
</script>

<style lang="scss">
.t_dialog {
  .el-dialog__body {
    padding-top: 10px;
    padding-bottom: 10px;
  }

}
</style>
