<template>
    <div>
        <el-form label-position="top" label-width="80px" size="small">
          <el-form-item label="图片上传:">
              <el-upload class="avatar-uploader">
                <i v-if="currentComponent.properties.content === ''"
                class="el-icon-plus avatar-uploader-icon"></i>
                <img v-else :src="currentComponent.properties.content" class="uploader-avatar">
              </el-upload>
          </el-form-item>
        </el-form>
    </div>
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
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.uploader-avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>