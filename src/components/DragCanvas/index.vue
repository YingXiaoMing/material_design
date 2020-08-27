<template>
  <draggable
    ref="drag-board"
    class="drag-canvas-warp"
    :list="storeList"
    v-bind="getOptions"
    @add="onAdd"
  >
    <template v-for="item in storeList">
      <drag
        :key="item.id"
        :default-x="item.position.clientX"
        :default-y="item.position.clientY"
        :aim-id="item.id"
        :update-id="item.updateId"
        :component-object="item"
        :is-instance="item.instance"
        :default="item.default"
        @move-end="onMoveEnd"
      />
    </template>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import Drag from '@/components/Drag'
export default {
  components: {
    draggable,
    Drag
  },
  data() {
    return {
      list: [],
      left: '',
      right: '',
      top: '',
      bottom: ''
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    ...mapGetters(['storeList', 'activeComponent']),
    getOptions() {
      return {
        group: {
          name: 'component',
          pull: false,
          put: true
        },
        handle: '.handle',
        disabled: false,
        sort: false
      }
    }
  },
  methods: {
    init() {
      this.initLayoutData()
    },
    initLayoutData() {
      const $board = this.$refs['drag-board'].$el
      const { left, right, bottom, top } = $board.getBoundingClientRect()
      this.left = left
      this.right = right
      this.bottom = bottom
      this.top = top
    },
    onAdd(el) {
      const { clientX, clientY } = el.originalEvent
      const componentId = el.item.getAttribute('data-component-id')
      const props = {
        position: {
          clientX,
          clientY
        }
      }
      const xArea = clientX < this.right && clientX > this.left
      const yArea = clientY < this.bottom && clientX > this.top
      if (xArea && yArea) {
        // 添加组件模块
        this.$store.dispatch('components/addComponent', { componentId, props })
      }
    },
    onMoveEnd() {
      console.log('不弄虚作假跟你假的是你同学')
    }
  }
}
</script>
<style lang="scss">
.drag-canvas-warp {
    * {
        user-select: none;
    }
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
</style>

