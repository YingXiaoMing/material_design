<template>
  <div class="board-warp">
    <div class="view-wrapper" ref="view">
    <!-- <div class="view-wrapper" ref="view" :style="viewWrapStyle"> -->
      <div class="canvas-wrapper" :style="styleObject">
        <div class="board_container" :style="getBoardStyleObject">
          <drag-canvas class="board-canvas" ref="canvas"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DragCanvas from '@/components/DragCanvas/index.vue'
export default {
  components: {
    DragCanvas
  },
  computed: {
    ...mapGetters(['activeComponent', 'pageAttribute']),
    viewWrapStyle() {
      const { width, height } = this.view;
      return {
        width: `${width}px`,
        height: `${height}px`
      }
    },
    styleObject: function() {
      return {
        width: `${this.pageAttribute.width}px`,
        height: `${this.pageAttribute.height}px`,
        paddingTop: this.pageAttribute.topMargin + 'px',
        paddingBottom: this.pageAttribute.bottomMargin + 'px',
        paddingLeft: this.pageAttribute.leftMargin + 'px',
        paddingRight: this.pageAttribute.rightMargin + 'px'
      }
    },
    getBoardStyleObject: function() {
      return {
        border: this.pageAttribute.isShowBorder ? '1px solid #000' : 'transparent'
      }
    }
  },
  data() {
    return {
      view: {
        width: '',
        height: ''
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.setViewStyle();
    },
    setViewStyle() {
      this.view.width = window.screen.width;
      this.view.height = window.screen.height;
    },
    initDragBasic() {
      this.$refs.canvas.onWindowResize();
    }
  }
}
</script>

<style lang="scss">
.board-warp {
    position: relative;
    overflow: auto;
    .view-wrapper {
      user-select: none;
      top: 0;
      left: 0;
      touch-action: none;
    }
    .canvas-wrapper {
        background-color: #fff;
        border-radius: 2px;
        position: absolute;
        top: 50%;
        left: 50%;
        overflow: hidden;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 10px rgba(0, 21, 41, 0.08);;
        padding-top: 10px;
        padding-bottom: 30px;
        padding-left: 6px;
        padding-right: 20px;
        .board_container {
          width: 100%;
          height: 100%;
        }
    }
    .board-canvas {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 99999;
    }
}
</style>

