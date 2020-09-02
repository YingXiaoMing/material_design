<template>
  <div v-if="activeComponent" class="props-menu-warp" @click.stop>
    <div class="title-area">{{ activeComponent.title }}</div>
    <component :is="activeComponent.classify" ref="menu" :component="activeComponent" class="context_area" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['activeComponent'])
  }
}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';
 .props-menu-warp {
     width: 300px;
     .title-area {
         padding: 15px;
         background-color: $lightBackground;
         font-weight: bold;
     }
     .context_area {
       padding-left: 4px;
     }
 }
</style>

