<template>
    <div :id="elementId">
        <!-- 需要针对图片设置拖拽 否则会出现拖拽错乱的问题 -->
        <img src="@/assets/picture.png" :style="getStyle" draggable="false" v-if="content === ''"/>
        <img v-else :src="content" :style="getStyle" draggable="false"/>
    </div>
</template>
<script>
export default {
    props: {
        elementId: {
            type: String,
            default: ''
        },
        width: {
            type: [String, Number],
            default: 50,
        },
        height: {
            type: [String, Number],
            default: 50
        },
        content: {
            type: String,
            default: ''
        }
    },
    data() {
      return {}
    },
    mounted() {
        this.init();
    },
    computed: {
      getStyle() {
          const { width, height } = this;
          return {
              width: `${width}px`,
              height: `${height}px`
          }
      }  
    },
    methods: {
        init() {
            this.$emit('complete');
        }
    }
}
</script>
<style lang="css">
    .v_img {
        width: 100%;
        height: 100%;
    }
</style>