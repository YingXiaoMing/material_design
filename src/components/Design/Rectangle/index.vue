<template>
    <div :style="getStyle"></div>
</template>
<script>
export default {
    props: {
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
            const { borderWidth } = this;
            return {
                minWidth: '20px',
                minHeight: '20px',
                height: '100%',
                border: '1px solid #000',
                borderWidth: `${borderWidth}px`
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

