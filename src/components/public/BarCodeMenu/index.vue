<template>
    <div class="text-menu-warp">
        <el-form label-position="top" label-width="88px" size="mini">
            <el-form-item label="显示文本:">
                <el-radio-group v-model="currentComponent.properties.displayValue" @change="debounceUpdate">
                  <el-radio :label="true">显示</el-radio>
                  <el-radio :label="false">隐藏</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文本内容:">
                <el-input type="textarea" :rows="4" resize="none" size="small"
                v-model="currentComponent.properties.text" @input="debounceUpdate"></el-input>
            </el-form-item>
            <el-form-item label="文本方向:">
                <el-select v-model="currentComponent.properties.textPosition" @change="debounceUpdate">
                  <el-option value="top" label="顶部"></el-option>
                  <el-option value="bottom" label="底部"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { debounce } from 'throttle-debounce';
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(['activeComponent', 'storeList']),
        currentComponent() {
            const { id = '' } = this.activeComponent;
            return this.storeList.find(item => item.id === id);
        },
        title() {
            return this.currentComponent.properties.text;
        },
        textPosition() {
            return this.currentComponent.properties.textPosition
        },
        displayValue() {
            return this.currentComponent.properties.displayValue
        },
    },
    
    data() {
        return {
            debounceUpdate: Function,

        }
    },
    mounted() {
        this.debounceUpdate = debounce(300, this.handleUpdateBarcode);
    },
    methods: {
        handleUpdateBarcode() {
            this.$store.dispatch('components/updateBarcode');
        }
    }
}
</script>

