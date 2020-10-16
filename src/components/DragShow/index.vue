<template>
    <div :id="aimId" ref="drag" class="drag-warp"  :style="dragStyle" >
      <component :is="componentObject.type" v-bind="componentObject.props" :element-id="componentObject.id" :update-id="componentObject.updateId" @complete="init" />
    </div>  
</template>

<script>
import { on, off } from '@/utils/dom'
import { mapGetters } from 'vuex'
import { debounce } from 'throttle-debounce';

export default {
  name: 'Drag',
  props: {
    componentObject: {
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
    updateId: {
      type: String,
      default: ''
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
      debounceUpdateComponent: Function,
    }
  },
  destroyed() {
    this.clearAllListener()
  },
  mounted() {
    this.debounceUpdateComponent = debounce(200, this.moveEnd);
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
    isLine() {
      return this.componentObject.type === 'XLineUi' || this.componentObject.type === 'YLineUi' || this.componentObject.type === 'RectangleUi'
    },
    resizeDisabledY() {
      return this.componentObject.type === 'XLineUi'
    },
    resizeDisabledX() {
      return this.componentObject.type === 'YLineUi'
    },
  },
  methods: {
    init() {
      this.initLayoutScheme();
    },
    initLayoutScheme() {
      const $drag = this.$refs.drag
      const isInstance = this.isInstance
      const element = $drag.firstElementChild
      const defaultData = this.default
      const canvas = document.querySelector('.moban_board')
      const { width, height } = $drag.getBoundingClientRect();
      console.log(width);
      console.log(height);
      const { defaultX, defaultY } = this
      const { top, left } = element.getBoundingClientRect()
      this.board = canvas.getBoundingClientRect()
      this.offsetLeft = left
      this.offsetTop = top
      this.defaultHeight = height
      this.defaultWidth = width
      this.width = width
      
      if (isInstance) {
        this.x = defaultData.x
        this.y = defaultData.y
        this.width = defaultData.width
        this.height = defaultData.height || ''
      } else {
        this.x = defaultX - left
        this.y = defaultY - top
        this.width = defaultData.width;
        this.height = defaultData.height;
      }
      this.$nextTick(() => {
        this.debounceUpdateComponent();
      })
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
          height: this.height || 0,
          position: {
            clientX: x,
            clientY: y
          }
        }
        this.$emit('move-end', dragData)
      })
    },
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
