<template>
    <img ref="img" class="barcode" :class="elementId" :style="getStyle" alt="barcode" src draggable="false" />
</template>
<script>
import barcode from 'jsbarcode';
import { mapGetters } from 'vuex';

export default {
    props: {
        elementId: {
            type: String,
            default: ''
        },
        component: {
            type: Object,
            default() {
                return {};
            }
        },
        bodyHeight: {
            type: Number,
            default: 40,
        },
        lineWidth: {
            type: Number,
            default: 2,
        },
        displayValue: {
            type: String,
            default: '1'
        },
        data: {
            type: String,
            default: ''
        }
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['activeComponent', 'storeList']),
        currentComponent() {
            return this.storeList.find((item) => item.id === this.activeComponent)
        },
        getStyle() {
            return {
                maxWidth: '100%',
                verticalAlign: 'middle',
                userSelect: 'none'
            }
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.complete();
        },
        complete() {
            this.$emit('complete');
            const { elementId, bodyHeight, lineWidth, displayValue, format, data } = this;
            barcode(`.${elementId}`, data, {
                format,
                width: lineWidth,
                height: bodyHeight,
                textMargin: 10,
                displayValue: displayValue === '1',
            });
        }
    }
}
</script>
<style lang="scss">
.barcode {
    max-width: 100%;
    vertical-align: middle;
    user-select: none;
}
</style>
