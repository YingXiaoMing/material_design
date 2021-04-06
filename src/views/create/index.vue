<template>
  <div class="app-warp">
    <header-nav />
    <div class="body-area">
      <left-menu class="left-menu" />
      <board class="view-box" ref="board"/>
      <right-menu class="right-menu" @page-size-change="onPageSizeChange"/>
    </div>
  </div>
</template>
<script>
import { HeaderNav, LeftMenu, Board, RightMenu } from '@/layout/index.js'
export default {
  components: {
    HeaderNav,
    LeftMenu,
    Board,
    RightMenu
  },
  created() {
    const ids = this.$route.query.id;
    if (ids) {
      const str = '{"Name":"测试版本","Properties":{"paperWidth":480,"paperHeight":480,"topMargin":10,"bottomMargin":10,"leftMargin":10,"rightMargin":10,"isShowBorder":true},"ViewableControls":[{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":2,"x_position":40,"y_position":56.5},"id":"1"},{"type":"LabelBox","userControlledProperties":"InputMenu","title":"文本框","properties":{"width":312,"height":51,"x_position":143,"y_position":22.5,"fontSize":"36px","isField":false,"fieldLendge":"","text":"公司固定资产卡片","color":"#000"},"id":"2"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":107,"height":45,"x_position":5,"y_position":89.5,"text":"设备名称","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"3"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":113,"height":45,"x_position":7,"y_position":157.5,"text":"资产编号","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"4"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":117,"y_position":124.5},"id":"5"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":119,"y_position":184.5},"id":"6"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":115,"height":51,"x_position":229,"y_position":90.5,"text":"启用日期","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"7"},{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":98,"height":39,"x_position":232,"y_position":158.5,"text":"使用人","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"24px","isBold":false,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"8"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":334,"y_position":124.5},"id":"9"},{"type":"H.Line","userControlledProperties":"LineMenu","title":"横线","properties":{"width":100,"height":1,"x_position":335,"y_position":189.5},"id":"10"},{"type":"BarCode","userControlledProperties":"BarCodeMenu","title":"条形码","properties":{"width":428,"height":207,"x_position":7,"y_position":223.5,"text":"GCP-0-002","format":"CODE128","textPosition":"bottom","lineWidth":2,"bodyHeight":40,"fontSize":14,"displayValue":true,"data":" "},"id":"11"}]}';
      // const str = '{"Name":"测试版本","Properties":{"paperWidth":500,"paperHeight":500,"topMargin":10,"bottomMargin":10,"leftMargin":10,"rightMargin":10,"isShowBorder":true},"ViewableControls":[{"type":"TextBox","userControlledProperties":"TextMenu","title":"自定义文本","properties":{"width":248,"height":67,"x_position":13,"y_position":68.5,"text":"固定资产标牌","align":"left","fontFamily":"monospace","lineHeight":"1.5","fontSize":"36px","isBold":true,"hasBorder":false,"color":"#000","dataSource":{"origin":"EndUserInput","apiWebData":"employeeName","formular":"","option":""}},"id":"1"},{"name":"rectangle","type":"RectangleUi","userControlledProperties":"","title":"边框","properties":{"width":456,"height":193,"x_position":13,"y_position":132.5},"id":"2"},{"type":"LabelBox","userControlledProperties":"InputMenu","title":"文本框","properties":{"width":116,"height":42,"x_position":247,"y_position":162.5,"fontSize":"24px","isField":false,"fieldLendge":"","text":"使用日期","color":"#000"},"id":"3"},{"type":"LabelBox","userControlledProperties":"InputMenu","title":"文本框","properties":{"width":114,"height":43,"x_position":29,"y_position":159.5,"fontSize":"24px","isField":false,"fieldLendge":"","text":"设备名称","color":"#000"},"id":"4"},{"type":"LabelBox","userControlledProperties":"InputMenu","title":"文本框","properties":{"width":112,"height":41,"x_position":27,"y_position":246.5,"fontSize":"24px","isField":false,"fieldLendge":"","text":"卡片编号","color":"#000"},"id":"5"},{"type":"LabelBox","userControlledProperties":"InputMenu","title":"文本框","properties":{"width":93,"height":33,"x_position":248,"y_position":248.5,"fontSize":"24px","isField":false,"fieldLendge":"","text":"使用人","color":"#000"},"id":"6"},{"type":"LabelBox","userControlledProperties":"InputMenu","title":"文本框","properties":{"width":91,"height":23,"x_position":139,"y_position":164.5,"fontSize":"18px","isField":false,"fieldLendge":"","text":"XXXXXX","color":"#000"},"id":"7"},{"type":"LabelBox","userControlledProperties":"InputMenu","title":"文本框","properties":{"width":76,"height":20,"x_position":136,"y_position":253.5,"fontSize":"18px","isField":false,"fieldLendge":"","text":"1234567","color":"#000"},"id":"8"},{"type":"LabelBox","userControlledProperties":"InputMenu","title":"文本框","properties":{"width":109,"height":35,"x_position":358,"y_position":167.5,"fontSize":"18px","isField":false,"fieldLendge":"","text":"2021-03-29","color":"#000"},"id":"9"},{"type":"LabelBox","userControlledProperties":"InputMenu","title":"文本框","properties":{"width":76,"height":20,"x_position":358,"y_position":256.5,"fontSize":"18px","isField":false,"fieldLendge":"","text":"李四","color":"#000"},"id":"10"},{"type":"BarCode","userControlledProperties":"BarCodeMenu","title":"条形码","properties":{"width":374,"height":115,"x_position":46,"y_position":344.5,"text":"4562002","format":"CODE128","textPosition":"bottom","lineWidth":2,"bodyHeight":40,"fontSize":14,"displayValue":true,"data":" "},"id":"11"}]}';
      const componentData = JSON.parse(str);
      _.map(componentData.ViewableControls, item => {
        item.isInstance = true
      });
      this.$store.dispatch('components/setComponentsList', componentData.ViewableControls);
      this.$store.dispatch('components/setComponentID', 11);
    } else {
      this.$store.dispatch('components/clearAllComponent');
    }
  },
  methods: {
    onPageSizeChange() {
      this.$refs.board.initDragBasic();
    }
  }
}
</script>

<style lang="scss">
.app-warp {
    .body-area {
        height: calc(100vh - 32px);
        display: flex;
        flex-wrap: nowrap;
        position: relative;
        color: #333;
        .left-menu {
            width: 300px;
            flex-shrink: 0;
            background-color: #fff;
            box-shadow: 2px 0 6px rgba(0, 21, 41, 0.88);
            position: relative;
            z-index: 90;
        }
        .right-menu {
            flex-shrink: 0;
            background-color: #fff;
            box-shadow: -2px 0 6px rgba(0, 21, 41, 0.88);
            position: absolute;
            height: 100%;
            right: 0;
            z-index: 90;
        }
        .view-box {
            // width: calc(100vw - 360px - 300px);
            width: 100%;
            background-color: #e9eef3;
            color: #333;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-image: linear-gradient(45deg,#f5f5f5 25%,rgba(0,0,0,0) 0,rgba(0,0,0,0) 75%,#f5f5f5 0),linear-gradient(45deg,#f5f5f5 25%,rgba(0,0,0,0) 0,rgba(0,0,0,0) 75%,#f5f5f5 0);
            background-size: 20px 20px;
            background-position: 0 0,10px 10px;
        }
    }
}
</style>
