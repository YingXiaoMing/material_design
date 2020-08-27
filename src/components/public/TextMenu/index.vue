<template>
    <div class="text-menu-warp">
        <el-form ref="content-form" label-position="top" label-width="80px">
            <el-form-item label="文本内容:">
                <el-input type="textarea" :rows="4" resize="none" size="small" v-model="currentComponent.props.text"></el-input>
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
            },
        }
    },
    computed: {
        ...mapGetters(['activeComponent', 'storeList']),
        currentComponent() {
            const { id = '' } = this.activeComponent;
            return this.storeList.find((item) => item.id === id);
        }
    },
    data() {
        return {
            
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
