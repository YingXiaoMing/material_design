<template>
  <img ref="img" class="qr-code-warp" alt="qr" draggable="false" :style="getStyle" src>
</template>
<script>
import QrCode from 'qrcode'
export default {
  computed: {
    getStyle() {
      return {
        maxWidth: '100%',
        verticalAlign: 'middle',
        userSelect: 'none'
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    complete() {
      this.$emit('complete')
    },
    init() {
      const that = this
      const $img = this.$refs.img
      that.complete()
      QrCode.toDataURL('https://www.baidu.com', { errorCorrectionLevel: 'H', type: 'image/jpeg', color: {}}, (err, res) => {
        if (err) {
          throw err
        }
        $img.src = res
      })
    }
  }
}
</script>
