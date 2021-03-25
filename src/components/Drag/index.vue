<template>
  <div
    :id="aimId"
    ref="drag"
    class="drag-warp"
    :class="activeClass"
    :style="dragStyle"
    @click.stop="handleSetCurrent"
    @mousedown="handleMouseDown"
    @contextmenu="handleContextMenu"
    @contextmenu.prevent="onContextmenu"
  >
    <component
      :is="componentObject.type"
      v-bind="componentObject.properties"
      :element-id="componentObject.id"
      @complete="init"
      @updateInputText="updateInputText"
    />
    <drag-resize v-if="resizeVisible" :component-object="componentObject" @resize-down="handleResizeDown" />
  </div>
</template>

<script>
import { on, off } from '@/utils/dom'
import DragResize from '@/components/DragResize'
import { mapGetters } from 'vuex'
import { debounce } from 'throttle-debounce'

export default {
  name: 'Drag',
  components: {
    DragResize
  },
  props: {
    componentObject: {
      type: Object,
      default() {
        return {}
      }
    },
    attribute: {
      type: Object,
      default() {
        return {}
      }
    },
    isInstance: {
      type: Boolean,
      default: false
    },
    aimId: {
      type: String,
      default: ''
    },
    defaultX: {
      type: Number,
      default: 0
    },
    defaultY: {
      type: Number,
      default: 0
    },
    default: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      x: '',
      y: '',
      downX: '',
      downY: '',
      resizeDownX: '',
      resizeDownY: '',
      downWidth: '',
      downHeight: '',
      offsetLeft: '',
      offsetTop: '',
      resizeOffsetRight: '',
      resizeOffsetBottom: '',
      board: {},
      active: false,
      defaultWidth: '',
      defaultHeight: '',
      width: '',
      height: '',
      debounceUpdateComponent: Function
    }
  },
  destroyed() {
    this.clearAllListener()
  },
  mounted() {
    this.debounceUpdateComponent = debounce(200, this.moveEnd)
    // window.addEventListener('keydown', this.onKeyDown, true)
  },
  computed: {
    ...mapGetters(['activeComponent']),
    dragStyle() {
      const { width, height, y, x, isLine } = this
      return {
        width: `${width}px`,
        height: `${height}px`,
        top: `${y}px`,
        left: `${x}px`,
        padding: isLine ? '0' : '0 10px 0 0',
        overflow: isLine ? 'unset' : 'hidden'
      }
    },
    activeClass() {
      const result = []
      const { id = '' } = this.activeComponent
      if (id === this.componentObject.id) {
        result.push('is-active')
      }
      if (this.componentObject.type === 'BarCode') {
        result.push('barcode-ui')
      }
      if (this.isLine) {
        result.push('line-ui')
      }
      return result
    },
    isLine() {
      return this.componentObject.type === 'H.Line' || this.componentObject.type === 'V.Line' || this.componentObject.type === 'RectangleUi'
    },
    resizeDisabledY() {
      return this.componentObject.type === 'H.Line'
    },
    resizeDisabledX() {
      return this.componentObject.type === 'V.Line'
    },
    resizeVisible() {
      return this.activeClass.includes('is-active')
    }
  },
  methods: {
    onKeyDown(event) {
      switch (event.keyCode) {
        case 37:
          console.log('左箭头')
          break
        case 38:
          console.log('上箭头')
          break
        case 39:
          console.log('右箭头')
          break
        case 40:
          console.log('下箭头')
          break
        default:
          break
      }
    },
    onContextmenu(event) {
      this.$contextmenu({
        items: [
          {
            label: '删除',
            icon: 'el-icon-delete',
            customClass: 'a-de',
            onClick: () => {
              this.$store.dispatch('components/deleteComponent', this.aimId)
            }
          }
        ],
        event,
        zIndex: 99999,
        customClass: 'd_menu',
        minWidth: 18
      })
      return false
    },
    init() {
      setTimeout(() => {
        this.initLayoutScheme();
      });
    },
    updateInputText(text) {
      this.componentObject.properties.text = text
    },
    setLayoutScheme() {
      const $drag = this.$refs.drag
      const isInstance = this.isInstance
      const element = $drag.firstElementChild
      const defaultData = this.attribute
      const canvas = document.querySelector('.drag-canvas-warp.board-canvas')
      // const canvas = document.querySelector('#canvas_board')
      const { width, height } = $drag.getBoundingClientRect()
      const { defaultX, defaultY } = this
      const { top, left } = element.getBoundingClientRect()
      this.board = canvas.getBoundingClientRect()
      this.offsetLeft = left
      this.offsetTop = top
      this.defaultHeight = height
      this.defaultWidth = width
      this.width = width
      this.x = defaultData.x_position
      this.y = defaultData.y_position
      this.width = defaultData.width
      this.height = defaultData.height || ''
      this.$nextTick(() => {
        this.debounceUpdateComponent()
      })
    },
    initLayoutScheme() {
      const $drag = this.$refs.drag
      const isInstance = this.isInstance
      const element = $drag.firstElementChild
      const defaultData = this.attribute
      // const canvas = document.querySelector('.drag-canvas-warp.board-canvas')
      const canvas = document.querySelector('#canvas_board')
      const { width, height } = $drag.getBoundingClientRect()
      const { defaultX, defaultY } = this
      const { top, left } = element.getBoundingClientRect()
      this.board = canvas.getBoundingClientRect()
      this.offsetLeft = this.board.left;
      this.offsetTop = this.board.top;
      // this.defaultHeight = height
      // this.defaultWidth = width
      this.width = width;
      this.height = height;
      if (isInstance) {
        this.x = defaultData.x_position
        this.y = defaultData.y_position
        this.width = defaultData.width
        this.height = defaultData.height || ''
      } else {
        this.x = defaultX - left
        this.y = defaultY - top
      }
      console.log('瓜得要命');
      console.log(isInstance);
      console.log(defaultX);
      console.log(left);
      this.$nextTick(() => {
        this.debounceUpdateComponent()
      })
    },
    clearAllListener() {
      off(document, 'mousemove', this.handleResizeMove)
      off(document, 'mouseup', this.handleResizeUp)
      off(document, 'mousemove', this.handleMouseMove)
      off(document, 'mouseup', this.handleMouseUp)
    },
    handleMouseDown(e) {
      const $drag = e.path.find((item) => item.className.includes('drag-warp'))
      const { top, left } = $drag.getBoundingClientRect()
      this.downX = e.clientX - left
      this.downY = e.clientY - top

      on(document, 'mousemove', this.handleMouseMove)
      on(document, 'mouseup', this.handleMouseUp)
      this.handleSetCurrent()
    },
    handleContextMenu() {
      this.clearAllListener()
    },
    handleSetCurrent() {
      const { id = '' } = this.componentObject
      this.$store.dispatch('components/setActive', id)
    },
    handleMouseMove(e) {
      const aim = this.aimId
      const clientX = e.clientX
      const clientY = e.clientY
      const $drag = this.$refs.drag
      const canvasImg = document.querySelector('#canvas_board')
      const canvasRect = canvasImg.getBoundingClientRect()
      const boardHeight = canvasRect.height
      const boardWidth = canvasRect.width
      // const boardHeight = this.board.height
      // const boardWidth = this.board.width
      const x = clientX - this.offsetLeft - this.downX
      const y = clientY - this.offsetTop - this.downY
      const $element = document.getElementById(aim)
      const { width, height } = $element.getBoundingClientRect()
      if (x <= 0) {
        this.x = 0
      } else if ((width + x) >= boardWidth) {
        this.x = boardWidth - width
      } else {
        this.x = x
      }
      if (y <= 0) {
        this.y = 0
      } else if ((height + y) >= boardHeight) {
        this.y = boardHeight - height
      } else {
        this.y = y
      }
      this.debounceUpdateComponent()
    },
    handleMouseUp() {
      off(document, 'mousemove', this.handleMouseMove)
      off(document, 'mouseup', this.handleMouseUp)
    },
    moveEnd() {
      setTimeout(() => {
        const { x, y } = this
        const dragData = {
          id: this.aimId,
          x,
          y,
          instance: true,
          width: this.width || 0,
          height: this.height || 0
        }
        this.$emit('move-end', dragData)
      })
    },
    handleResizeUp() {
      off(document, 'mousemove', this.handleResizeMove)
      off(document, 'mouseup', this.handleResizeUp)
    },
    handleResizeMove(e) {
      const { clientX, clientY } = e
      const defaultWidth = this.defaultWidth
      const defaultHeight = this.defaultHeight
      const downWidth = this.downWidth
      const downHeight = this.downHeight
      const moveX = clientX - this.resizeDownX
      const moveY = clientY - this.resizeDownY
      const offsetRight = this.resizeOffsetRight
      const offsetBottom = this.resizeOffsetBottom
      const width = downWidth + moveX
      const height = downHeight + moveY
      const heightLimit = height <= defaultHeight
      const widthLimit = width <= defaultWidth
      const xEdge = moveX >= offsetRight
      const yEdge = moveY >= offsetBottom
      if (!this.resizeDisabledX) {
        if (widthLimit) {
          this.width = defaultWidth
        } else if (xEdge) {
          this.width = downWidth + offsetRight
        } else {
          this.width = width
        }
      }
      if (!this.resizeDisabledY) {
        if (heightLimit) {
          this.height = defaultHeight
        } else if (yEdge) {
          this.height = downHeight + offsetBottom
        } else {
          this.height = height
        }
      }
      this.debounceUpdateComponent()
    },
    handleResizeDown(e) {
      const $drag = this.$refs.drag
      const { width, height } = $drag.getBoundingClientRect()
      const canvasImg = document.querySelector('.drag-canvas-warp.board-canvas')
      const canvasRect = canvasImg.getBoundingClientRect()
      const boardHeight = canvasRect.heigth
      const boardWidth = canvasRect.width
      this.resizeOffsetRight = boardWidth - $drag.offsetLeft - width
      this.resizeOffsetBottom = boardHeight - $drag.offsetTop - height
      this.resizeDownX = e.clientX
      this.resizeDownY = e.clientY
      this.downWidth = width
      this.downHeight = height
      on(document, 'mousemove', this.handleResizeMove)
      on(document, 'mouseup', this.handleResizeUp)
      e.stopPropagation()
    }
  }
}
</script>

<style lang="scss">
  @import '~@/styles/variables.scss';
  .drag-warp {
    position: absolute;
    cursor: pointer;
    border: 1px solid transparent;
    color: #000;
    border-radius: 2px;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    transition: background-color ease .36s;
    &.is-active {
      border: 1px solid $skyBlue;
      .rectangle-warp {
        border-color: $skyBlue !important;
      }
    }
    .resize-btn {
      position: absolute;
      right: -3px;
      bottom: -5px;
      font-size: 18px;
      transform: scale(.6);
      color: $skyBlue;
    }
    &:hover {
      background-color: rgba(25,143,255, 0.1);
    }
    &.line-ui {
      border: none;
      .line-resize {
        position: absolute;
        height: 100%;
        width: 10px;
        right: 0;
        top: 0;
        background-color: $skyBlue;
      }
    }
  }
  .d_menu {
    padding: 0 !important;
    .menu_item {
      padding: 0 8px !important;
      line-height: 32px !important;
      .menu_item_expand_icon {
        display: none;
      }
    }
  }

</style>
