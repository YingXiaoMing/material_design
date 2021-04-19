<template>
    <div class="hidden_area">
        <div id="printContainer">
            <template v-for="(item, i) in printList">
                <div :style="styleObject" class="board_wrap" :id="('printPage') + i">
                    <div class="hidden_board" :style="getBoardStyleObject">
                        <template v-for="itChildren in item">
                            <print-view
                                :component-object="itChildren"
                                :attribute="itChildren.properties"
                                ></print-view>
                        </template>
                    </div>
                </div>
            </template>
        </div>
        
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PrintView from '@/components/PrintView/index';
export default {
    props:{
        printData: {
            type: Array,
            default: () => []
        }
    },
    components: {
        PrintView
    },
    computed: {
        ...mapGetters(['pageAttribute']),
        printList() {
            return this.printData;
        },
        styleObject: function() {
            return {
                width: `${this.pageAttribute.width}px`,
                height: `${this.pageAttribute.height}px`,
                paddingTop: this.pageAttribute.topMargin + 'px',
                paddingBottom: this.pageAttribute.bottomMargin + 'px',
                paddingLeft: this.pageAttribute.leftMargin + 'px',
                paddingRight: this.pageAttribute.rightMargin + 'px'
            }
        },
        getBoardStyleObject: function() {
            return {
                border: this.pageAttribute.isShowBorder ? '1px solid #000' : 'transparent'
            }
        }
    }
}
</script>
<style lang="scss">
.hidden_area {
    position: fixed;
    opacity: 0;
}
.hidden_board {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
</style>