<template>
    <div
    ref="printDrag"
    class="drag-warp"
    :style="dragStyle"
    >
        <component :is="componentObject.type" 
        v-bind="componentObject.properties"
        @complete="init"
        ></component>
    </div>
</template>
<script>
export default {
    props: {
        componentObject: {
            type: Object,
            default() {
                return {}
            }
        },
        attribute: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        dragStyle() {
            const { width, height, x, y, isLine } = this;
            return {
                width: `${width}px`,
                height: `${height}px`,
                top: `${y}px`,
                left: `${x}px`,
                padding: isLine ? '0' : '0 10px 0 0',
                overflow: isLine ? 'unset' : 'hidden'
            }
        },
        isLine() {
            return this.componentObject.type === 'H.Line' || this.componentObject.type === 'V.Line' || this.componentObject.type === 'RectangleUi'
        },
    },
    data() {
        return {
            x: '',
            y: '',
            width: '',
            height: ''
        }
    },
    methods: {
        init() {
            this.initLayoutScheme();
        },
        initLayoutScheme() {
            const defaultData = this.attribute;
            this.x = defaultData.x_position;
            this.y = defaultData.y_position;
            this.width = defaultData.width;
            this.height = defaultData.height;
        }

    }
}
</script>
<style lang="scss">
@import '~@/styles/variables.scss';
.drag-warp {
    position: absolute;
    cursor: pointer;
    border: 1px solid transparent;
    color: #000;
    border-radius: 2px;
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
    transition: background-color ease .36s;
}
</style>
