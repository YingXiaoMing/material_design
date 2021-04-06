<template>
    <div :style="getStyle"></div>
</template>
<script>
export default {
    props: {
        height: {
            type: [String, Number],
            default: 100
        },
        width: {
            type: [String, Number],
            default: 240,
        },
        borderWidth: {
            type: Number,
            default: 1
        },
    },
    data() {
        return {};
    },
    computed: {
        getStyle() {
            const { borderWidth, height, width } = this;
            return {
                minWidth: `${width}px`,
                minHeight: `${height}px`,
                height: '100%',
                border: '1px solid #000',
                borderWidth: `${borderWidth}px`,
            }
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$emit('complete');
        }
    }
}
</script>

