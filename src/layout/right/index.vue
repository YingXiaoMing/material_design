<template>
  <div class="props-menu-warp" @click.stop>
    <div class="title-area">版本设计</div>
    <div class="version_design">
      <el-form :model="form" inline size="mini" label-width="78px">
        <el-col :span="24">
          <el-form-item label="版本名称:">
            <el-input v-model="form.versionName" placeholder="请填写版本名称" @input="handleNameChange" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纸张宽度:">
            <el-input
              v-model="form.width"
              style="width: 60px"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              @input="(val) => handleBoardChange(val, 'width')"
            />
            <span style="marginLeft: 4px">cm</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="纸张高度:">
            <el-input
              v-model="form.height"
              size="small"
              style="width: 60px"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              @input="(val) => handleBoardChange(val, 'height')"
            />
            <span style="marginLeft: 4px">cm</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="左边距:">
            <el-input
              v-model="form.marginLeft"
              size="small"
              style="width: 60px"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              @input="(val) => handleBoardChange(val, 'left')"
            />
            <span style="marginLeft: 4px">cm</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="右边距:">
            <el-input
              v-model="form.marginRight"
              size="small"
              style="width: 60px"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              @input="(val) => handleBoardChange(val, 'right')"
            />
            <span style="marginLeft: 4px">cm</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上边距:">
            <el-input
              v-model="form.marginTop"
              size="small"
              style="width: 60px"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              @input="(val) => handleBoardChange(val, 'top')"
            />
            <span style="marginLeft: 4px">cm</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下边距:">
            <el-input
              v-model="form.marginBottom"
              size="small"
              style="width: 60px"
              onkeyup="value=value.replace(/[^\d]/g,'')"
              @input="(val) => handleBoardChange(val, 'bottom')"
            />
            <span style="marginLeft: 4px">cm</span>
          </el-form-item>
        </el-col>
        <!-- 左边距右边距 -->
        <el-col :span="24">
          <el-form-item label="显示边框:">
            <el-radio-group v-model="form.isBolder" @change="handleBorderChange">
              <el-radio :label="true">是</el-radio>
              <el-radio :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div v-if="activeComponent" class="title-area">{{ activeComponent.title }}</div>
    <component :is="activeComponent.userControlledProperties" ref="menu" :component="activeComponent" class="context_area" />
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['activeComponent', 'pageAttribute']),
    componentData() {
      return this.pageAttribute
    }
  },
  watch: {
    'componentData': {
      handler(val, oval) {
        this.form.versionName = val.name
        this.form.width = val.width;
        this.form.height = val.height;
        this.form.isBolder = val.isShowBorder
        this.form.isProductNum = val.isBatchNo
        this.form.isPackage = val.isPackageNumber
        this.form.isCountMi = val.isCalculatedSquareMeter
        this.form.handleQuan = val.isTotalRollLong
        this.form.isCountWeight = val.isCalculatingTheoreticalWeight
      },
      deep: true
    }
  },
  created() {
    this.form.width = this.pageAttribute.width;
    this.form.height = this.pageAttribute.height;
    this.form.versionName = this.pageAttribute.name;
    this.form.marginLeft = this.pageAttribute.leftMargin;
    this.form.marginRight = this.pageAttribute.rightMargin;
    this.form.marginTop = this.pageAttribute.topMargin;
    this.form.marginBottom = this.pageAttribute.bottomMargin;
    this.form.isBolder = this.pageAttribute.isShowBorder;
  },
  data() {
    return {
      form: {
        versionName: '',
        width: '',
        height: '',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        isBolder: false,
        isProductNum: false,
        isPackage: false,
        isCountMi: false,
        handleQuan: false,
        isCountWeight: false,
        isBaoType: false
      }
    }
  },
  methods: {
    ...mapActions({

    }),
    handleBorderChange(val) {
      this.$store.dispatch('label/setBoardBorder', val)
    },
    handleNameChange(val) {
      this.$store.dispatch('components/setLabelVersion', val);
    },
    handleBoardChange(val, name) {
      const newVal = parseInt(val);
      switch (name) {
        case 'width':
          this.$store.dispatch('components/setBoardWidth', newVal)
          break
        case 'height':
          this.$store.dispatch('components/setBoardHeight', newVal)
          break
        case 'left':
          this.$store.dispatch('components/setBoardLeftMargin', newVal)
          break
        case 'right':
          this.$store.dispatch('components/setBoardRightMargin', newVal)
          break
        case 'top':
          this.$store.dispatch('components/setBoardTopMargin', newVal)
          break
        case 'right':
          this.$store.dispatch('components/setBoardBottomMargin', newVal)
          break
        default:
          break
      }
      this.$emit('page-size-change');
    }
  }
}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';
 .props-menu-warp {
     width: 360px;
     .title-area {
         padding: 5px;
         background-color: $lightBackground;
         font-weight: bold;
     }
     .context_area {
       padding-left: 4px;
     }
 }
 .version_design {
   padding: 8px;
   height: 188px;
   .el-form-item {
     margin-bottom: 2px;
   }
 }
</style>

