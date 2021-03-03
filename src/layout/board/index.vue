<template>
  <div class="board-warp">
    <div class="canvas-wrapper" :style="styleObject">
      <div class="board_container" :style="getBoardStyleObject">
        <drag-canvas class="board-canvas" />
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
    ...mapGetters(['activeComponent', 'vw', 'vh', 'labelVersion']),
    styleObject: function() {
      console.log(this.vw)
      return {
        width: this.vw + 'px',
        height: this.vh + 'px',
        paddingTop: this.labelVersion.TopMargin + 'px',
        paddingBottom: this.labelVersion.BottomMargin + 'px',
        paddingLeft: this.labelVersion.LeftMargin + 'px',
        paddingRight: this.labelVersion.RightMargin + 'px'
      }
    },
    getBoardStyleObject: function() {
      return {
        border: this.labelVersion.isShowBorder ? '1px solid #000' : 'transparent'
      }
    }
  },
  data() {
    return {}
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
        position: absolute;
    }
}
</style>

