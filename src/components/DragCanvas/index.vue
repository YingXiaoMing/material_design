<template>
  <draggable
    id="canvas_board"
    ref="drag-board"
    class="drag-canvas-warp"
    :list="storeList"
    v-bind="getOptions"
    @add="onAdd"
  >
    <template v-for="item in storeList">
      <drag
        ref="distanceComponent"
        :key="item.id"
        :default-x="item.properties.x_position"
        :default-y="item.properties.y_position"
        :is-instance="item.isInstance"
        :aim-id="item.id"
        :component-object="item"
        :attribute="item.properties"
        :default="item.properties"
        @move-end="onMoveEnd"
      />
    </template>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import Drag from '@/components/Drag'
import { on } from '@/utils/dom'
import { debounce } from '@/utils'
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
      // 监听面板的变化
      this.addListener();
    },
    addListener() {
      this.debounceResizeChange = debounce(300, this.onWindowResize);
    },
    onWindowResize() {
      this.initLayoutData();
      const $dragList = this.$refs.distanceComponent;
      if ($dragList && $dragList.length > 0) {
        $dragList.forEach((item) => {
          // 重新渲染数据
          item.init();
        })
      }
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
      const properties = {
        x_position: clientX,
        y_position: clientY
      }
      const xArea = clientX < this.right && clientX > this.left
      const yArea = clientY < this.bottom && clientX > this.top
      if (xArea && yArea) {
        // 添加组件模块
        this.$store.dispatch('components/addComponent', { componentId, properties })
      }
    },
    onMoveEnd(data) {
      const { height, width, x, y, id, instance } = data;
      const update = {
        id,
        update: {
          height,
          width,
          x_position: x,
          y_position: y,
        },
        instance,
      }
      if (update.id) this.$store.dispatch('components/updateComponent', update)
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

