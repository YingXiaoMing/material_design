<template>
  <img :id="'barCode-' + elementId" ref="img" class="barcode" :class="elementId" :style="getStyle" alt="barcode" draggable="false">
</template>
<script>
import barcode from 'jsbarcode'
import { mapGetters } from 'vuex'

export default {
  props: {
    elementId: {
      type: String,
      default: ''
    },
    component: {
      type: Object,
      default() {
        return {}
      }
    },
    text: {
      type: String,
      default: ''
    },
    textPosition: {
      type: String,
      default: ''
    },
    bodyHeight: {
      type: Number,
      default: 40
    },
    lineWidth: {
      type: Number,
      default: 2
    },
    displayValue: {
      type: Boolean,
      default: false
    },
    data: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  created() {
    this.$bus.on('BarCode', () => {
      const { elementId, bodyHeight, textPosition, lineWidth, displayValue, format, data, text } = this
      barcode(`#barCode-${elementId}`, data, {
        text,
        displayValue: displayValue,
        textPosition
      })
    })
  },
  computed: {
    ...mapGetters(['activeComponent', 'storeList']),
    currentComponent() {
      return this.storeList.find((item) => item.id === this.activeComponent)
    },
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
    init() {
      this.complete()
    },
    complete() {
      this.$emit('complete')
      const { elementId, bodyHeight, textPosition, lineWidth, displayValue, format, data, text } = this
      barcode(`#barCode-${elementId}`, data, {
        text,
        displayValue,
        textPosition
      })
    }
  }
}
</script>
<style lang="scss">
.barcode {
    max-width: 100%;
    vertical-align: middle;
    user-select: none;
}
</style>
