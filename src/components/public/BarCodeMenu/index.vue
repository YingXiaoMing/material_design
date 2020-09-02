<template>
    <!-- <el-form class="barcode-menu-warp" label-position="top">
        <el-form-item label="线宽:">
            <el-input-number v-model="currentComponent.props.lineWidth" :min="1" :max="10"></el-input-number>
        </el-form-item>
    </el-form> -->
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['activeComponent', 'storeList']),
        currentComponent() {
            const { id = '' } = this.activeComponent;
            return this.storeList.find(item => item.id === id);
        }
    },
    data() {
        return {

        }
    }
}
</script>

