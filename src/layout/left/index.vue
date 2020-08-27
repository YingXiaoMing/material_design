<template>
  <div class="component-menu-warp">
    <el-collapse v-model="menu" class="collapse-menu">
      <el-collapse-item v-for="(item, index) in componentList" :key="index" :title="item.title" :name="item.title">
        <draggable class="component-list" v-bind="dragOptions">
          <template v-if="item.list && item.list.length > 0">
            <div v-for="(tag, index) in item.list" :key="tag.id" class="item" :data-component-id="tag.id">
              <span class="name">{{ tag.title }}</span>
              <svg-icon :icon-class="tag.icon" />
            </div>
          </template>
        </draggable>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
export default {
  components: {
    draggable
  },
  data() {
    return {
      menu: ['构图元素']
    }
  },
  computed: {
    ...mapGetters(['componentList']),
    dragOptions() {
      return {
        sort: false,
        group: {
          name: 'component',
          pull: 'clone',
          put: false
        }
      }
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';
.component-menu-warp {
    .collapse-menu {
        .el-collapse-item__header {
            background-color: $lightBackground;
            padding: 0 15px;
            transition: .3s ease all;
            &:hover {
                color: $skyBlue;
                border-color: 1px solid $skyBlue;
            }
        }
        .component-list {
            padding: 15px;
            .item {
                cursor: pointer;
                padding: 8px;
                border: 1px solid $border;
                margin-bottom: 10px;
                border-radius: 2px;
                color: $generalFontColor;
                transition: .3s ease all;
                display: flex;
                align-items: center;
                box-shadow: 0 0 4px rgba(0, 21, 41, .13);
                justify-content: space-between;
                &:hover {
                    color: $skyBlue;
                    border: 1px solid $skyBlue;
                    i {
                        color: $skyBlue;
                    }
                }
                i {
                    font-size: 16px;
                    color: $info;
                }
            }
        }
    }
}
</style>
