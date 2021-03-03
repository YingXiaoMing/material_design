<template>
    <div class="text-menu-warp">
        <el-form label-width="80px" label-position="top">
          <el-form-item label="文本内容:">
              <el-input type="textarea" :rows="4"
              resize="none" size="small" v-model="currentComponent.properties.text">
              </el-input>
          </el-form-item>
          <el-form-item label="字体大小:">
              <el-select size="small" v-model="currentComponent.properties.fontSize" style="width: 100%" placeholder="请选择字体大小">
                    <el-option v-for="item in fontSizeOptions" :value="item.value" :label="item.label"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="字体颜色:">
              <el-color-picker v-model="currentComponent.properties.color"></el-color-picker>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    props: {
        component: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        ...mapGetters(['activeComponent', 'storeList']),
        currentComponent() {
            const { id = '' } = this.activeComponent;
            return this.storeList.find((item) => item.id === id);
        },
    },
    data() {
        return {
            fontSizeOptions: [
                {
                    label: '12px',
                    value: '12px'
                },
                {
                    label: '14px',
                    value: '14px'
                },
                {
                    label: '16px',
                    value: '16px'
                },
                {
                    label: '18px',
                    value: '18px'
                },
                {
                    label: '24px',
                    value: '24px'
                },
                {
                    label: '36px',
                    value: '36px'
                },
                {
                    label: '48px',
                    value: '48px'
                },
                {
                    label: '60px',
                    value: '60px'
                }
            ],
        }
    }
}
</script>
<style lang="scss">
    .text-menu-warp {
        width: 300px;
        padding-left: 10px;
        padding-right: 10px;
    }
</style>