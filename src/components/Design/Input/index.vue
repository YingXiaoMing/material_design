<template>
  <span :style="getTextStyle" class="x_input">{{ text }}</span>
  <!-- <input :style="getTextStyle" :value="text" class="x_input" @input="handleChange($event)"/> -->
</template>
<script>
export default {
  props: {
    elementId: {
      type: String,
      default: ''
    },
    fontSize: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    getTextStyle() {
      const { fontSize, color } = this
      console.log()
      let style = {}
      style = {
        fontSize,
        color,
        height: '100%',
        width: '100%'
      }
      return style
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$emit('complete')
    },
    handleChange(val) {
      const value = val.target.value
      this.$emit('updateInputText', value)
    }
  }
}
</script>
<style lang="scss">
.x_input {
    text-align: left;
}
</style>
