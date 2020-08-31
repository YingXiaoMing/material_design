<template>
    <div class="line">
        <el-form label-position="top" label-width="80px">
            <el-form-item label="线条宽度:">
                <el-input-number v-if="isXLine" v-model="currentComponent.props.height"
                :min="1" :max="10" label="描述文字"></el-input-number>
                <el-input-number v-else-if="isYLine" v-model="currentComponent.props.width"
                :min="1" :max="10" label="描述文字"></el-input-number>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    computed: {
        ...mapGetters(['activeComponent', 'storeList']),
        currentComponent() {
            const { id = '' }  = this.activeComponent;
            return this.storeList.find((item) => item.id === id);
        },
        isXLine() {
            const { type = '' } = this.currentComponent;
            return type === 'XLineUi';
        },
        isYLine() {
            const { type = '' } = this.currentComponent;
            return type === 'YLineUi';
        },
    },
    

}
</script>
