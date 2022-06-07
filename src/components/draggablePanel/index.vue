<template>
    <div class="draggable-panel"
         :class="{
             'lock': lock,
         }"
         :tabindex="-1"
         ref="container"
         autofocus
         @keydown.space="canvasStatusMove = true"
         @keydown.meta="scaleByKeyboard"
         @keydown.ctrl="scaleByKeyboard"
         @keyup.space="canvasStatusMove = false"
         @wheel.ctrl.prevent="scaleByWheel"
         @wheel.meta.prevent="scaleByWheel"
         @dragover.prevent="dragoverContainer">
        <div class="canvas"
             ref="canvas"
             :style="canvasStyleComputed"
             @pointerdown="pointerDown"
             @pointermove="pointermove"
             @pointerup="pointerUp"
             @pointercancel="pointerCancel">
            <div class="chart-item"
                 :class="{
                     'moving'  : movingChart?.id   === item.id,
                     'resizing': resizingChart?.id === item.id,
                 }"
                 v-for="(item, index) in data"
                 :key="item.id"
                 :style="chartStyleComputed(item, index)"
                 :data-id="item.id"
                 tabindex="-1"
                 :draggable="!lock"
                 @mousedown="setChartPosition"
                 @dragstart="chartDragstart($event, item)"
                 @dragend="chartDragend">
                <div class="content">
                    <slot :name="'chart-' + item.id" :chart="item" :index="index">
                        <slot name="chart" :chart="item" :index="index"/>
                    </slot>
                </div>
                <div class="resizable">
                    <div v-for="direction in ['a', 'c', 'e', 'g']"
                         :key="direction"
                         class="resizable-point"
                         :class="direction"
                         tabindex="-1"
                         draggable="true"
                         @dragstart.stop="resizeStart($event, item, direction)">
                    </div>

                    <div v-for="direction in ['b', 'd', 'f', 'h']"
                         :key="direction"
                         :class="direction"
                         class="resizable-point">
                    </div>

                    <div v-for="direction in ['i', 'j', 'k', 'l']"
                         :key="direction"
                         :class="direction"
                         class="resizable-line"
                         tabindex="-1"
                         draggable="true"
                         @dragstart.stop="resizeStart($event, item, direction)">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, defineComponent, PropType } from 'vue'

interface ChartItem {
    id: number | string
    width: number
    height: number
    x: number
    y: number
}

interface Position {
    x: number
    y: number
}

interface Style {
    [name: string]: any
}

export default defineComponent({
    name : 'draggable-panel',
    props: {
        width         : {
            required: true,
            type    : Number as PropType<number>,
        },
        height        : {
            required: true,
            type    : Number as PropType<number>,
        },
        data          : {
            required: true,
            type    : Array as PropType<ChartItem[]>,
        },
        chartMinWidth : {
            required: false,
            type    : Number as PropType<number>,
            default : 100,
        },
        chartMinHeight: {
            required: false,
            type    : Number as PropType<number>,
            default : 100,
        },
        padding       : {
            required: false,
            type    : Number as PropType<number>,
            default : 32,
        },
        lock          : {
            required: false,
            type    : Boolean as PropType<boolean>,
            default : false,
        },
        canvasStyle   : {
            required: false,
            type    : Object as PropType<Style>,
            default : {},
        },
        chartStyle    : {
            required: false,
            type    : Object as PropType<Style>,
            default : {},
        },
        scaleMin      : {
            required: false,
            type    : Number as PropType<number>,
            default : 0.5,
        },
        scaleMax      : {
            required: false,
            type    : Number as PropType<number>,
            default : 10,
        },
    },
    setup (props) {
        const container        = ref<HTMLElement | null>(null)
        const canvas           = ref<HTMLElement | null>(null)
        const canvasStatusMove = ref<boolean>(false)
        const pointerPressed   = ref<boolean>(false)
        const defaultScale     = ref<number>(1)
        const scale            = ref<number>(1)
        const defaultX         = ref<number>(0)
        const defaultY         = ref<number>(0)
        const canvasX          = ref<number>(0)
        const canvasY          = ref<number>(0)
        const resizeDirection  = ref<string>('')
        const movingChart      = ref<ChartItem | null>(null)
        const resizingChart    = ref<ChartItem | null>(null)
        const diff             = ref<Position>({ x: 0, y: 0 })
        const point            = ref<Position>({ x: 0, y: 0 })
        const lastPointermove  = ref<Position>({ x: 0, y: 0 })
        const chartPosition    = ref<Position>({ x: 0, y: 0 })

        const canvasStyleComputed = computed(() => ({
            ...props.canvasStyle,
            ...{
                'width'    : props.width + 'px',
                'height'   : props.height + 'px',
                'transform': [
                    // translate3d better than translate
                    `translate3d(${canvasX.value}px, ${canvasY.value}px, 0)`,
                    `scale(${scale.value})`,
                ].join(' '),
            },
        }))

        const chartStyleComputed = computed(() => {
            return (chartItem: ChartItem, index: number) => {
                const { width, height, x, y } = chartItem
                return {
                    ...props.chartStyle,
                    ...{
                        'width' : width + 'px',
                        'height': height + 'px',
                        // translate better than translate3d
                        // translate3d causes blurry content
                        'transform': `translateX(${x}px) translateY(${y}px)`,
                        'z-index'  : 100 + index,
                    },
                }
            }
        })

        /**
         * Canvas init
         */
        function init () {
            const { offsetWidth, offsetHeight } = container.value as HTMLElement
            const defaultMaxWidth               = offsetWidth - props.padding
            const defaultMaxHeight              = offsetHeight - props.padding
            const ratioContainer                = offsetWidth / offsetHeight
            const ratioCanvas                   = props.width / props.height

            defaultScale.value = ratioContainer < ratioCanvas
                ? defaultMaxWidth / props.width
                : defaultMaxHeight / props.height
            defaultX.value     = (offsetWidth - props.width) / 2
            defaultY.value     = (offsetHeight - props.height) / 2
            scale.value        = defaultScale.value
            canvasX.value      = defaultX.value
            canvasY.value      = defaultY.value
        }

        onMounted(() => {
            init()
            window.addEventListener('resize', init)
        })

        onBeforeUnmount(() => {
            window.removeEventListener('resize', init)
        })

        return {
            container,              // Element Container
            canvas,                 // Element Canvas
            defaultX,               // Canvas default X
            defaultY,               // Canvas default Y
            defaultScale,           // Canvas default scale
            scale,                  // Canvas scale value
            point,                  // Canvas move start position
            lastPointermove,        // Canvas move position
            diff,                   // Canvas move position diff
            movingChart,            // Chart in moving state
            resizingChart,          // Chart in resizing state
            resizeDirection,        // Chart resize direction
            chartPosition,          // Chart drag position
            canvasX,                // Canvas translateX
            canvasY,                // Canvas translateY
            canvasStatusMove,       // Keyboard Space press state
            pointerPressed,         // Pointer press state
            canvasStyleComputed,    // Canvas style
            chartStyleComputed,     // Chart style
        }
    },
    watch  : {
        scale (newVal) {
            this.$emit('canvas-scale', newVal)
        },
    },
    methods: {
        /**
         * Scale canvas by wheel
         * @param event
         */
        scaleByWheel (event: WheelEvent) {
            if (this.lock) return

            let ratio = 1 / (1 + event.deltaY * 0.001)
            let scale = this.scale * ratio

            if (scale > this.scaleMax) {
                ratio = this.scaleMax / this.scale
                scale = this.scaleMax
            }

            if (scale < this.scaleMin) {
                ratio = this.scaleMin / this.scale
                scale = this.scaleMin
            }

            this.scale = scale

            const origin = {
                x: (ratio - 1) * this.width * 0.5,
                y: (ratio - 1) * this.height * 0.5,
            }

            this.canvasX -= (ratio - 1) * (event.clientX - this.canvasX) - origin.x
            this.canvasY -= (ratio - 1) * (event.clientY - this.canvasY) - origin.y
        },
        /**
         * Scale canvas by ctrl ++ / ctrl --
         * Scale canvas by command ++ / command --
         * @param event
         */
        scaleByKeyboard (event: KeyboardEvent) {
            const { key } = event

            if (['=', '-', '0'].includes(key) && this.lock) return event.preventDefault()

            if (key === '=') {
                event.preventDefault()

                let scale = this.scale + 0.1

                if (scale > this.scaleMax) scale = this.scaleMax

                this.scale = scale
            }

            if (key === '-') {
                event.preventDefault()

                let scale = this.scale - 0.1

                if (scale < this.scaleMin) scale = this.scaleMin

                this.scale = scale
            }

            if (key === '0') {
                event.preventDefault()

                this.scale   = this.defaultScale
                this.canvasX = this.defaultX
                this.canvasY = this.defaultY
            }
        },
        /**
         * Set chart position
         * @param event
         */
        setChartPosition (event: MouseEvent) {
            this.chartPosition = {
                x: event.clientX,
                y: event.clientY,
            }
        },
        /**
         * Dragover over container (move/resize)
         * @param event
         */
        dragoverContainer (event: DragEvent) {
            const { clientX, clientY } = event
            const offsetX              = (clientX - this.chartPosition.x) / this.scale
            const offsetY              = (clientY - this.chartPosition.y) / this.scale

            this.chartPosition = { x: clientX, y: clientY }

            if (this.movingChart) {
                const { width, height, x, y } = this.movingChart
                const maxX                    = this.width - width
                const maxY                    = this.height - height

                let newX = x + offsetX
                let newY = y + offsetY

                if (newX < 0) newX = 0
                if (newY < 0) newY = 0
                if (newX > maxX) newX = maxX
                if (newY > maxY) newY = maxY

                this.movingChart.x = newX
                this.movingChart.y = newY
            }

            if (this.resizingChart) {
                const { width, height, x, y } = this.resizingChart
                const chartMaxWidth           = this.width - x
                const chartMaxHeight          = this.height - y

                let newWidth  = width
                let newHeight = height
                let newX      = x
                let newY      = y

                const resizeWidth       = () => {
                    newWidth += offsetX
                    if (newWidth < this.chartMinWidth) newWidth = width
                    if (newWidth > chartMaxWidth) newWidth = chartMaxWidth
                }
                const resizeHeight      = () => {
                    newHeight += offsetY
                    if (newHeight < this.chartMinHeight) newHeight = height
                    if (newHeight > chartMaxHeight) newHeight = chartMaxHeight
                }
                const resizeWidthWithX  = () => {
                    newX     = x + offsetX
                    newWidth = width - offsetX

                    if (newX < 0) {
                        newX     = 0
                        newWidth = width + x
                    }

                    if (newWidth < this.chartMinWidth) {
                        newWidth = width
                        newX     = x
                    }
                }
                const resizeHeightWithY = () => {
                    newY      = y + offsetY
                    newHeight = height - offsetY

                    if (newY < 0) {
                        newY      = 0
                        newHeight = height + y
                    }

                    if (newHeight < this.chartMinHeight) {
                        newHeight = height
                        newY      = y
                    }
                }

                if (this.resizeDirection === 'a') {
                    resizeWidthWithX()
                    resizeHeightWithY()
                }

                if (this.resizeDirection === 'c') {
                    resizeWidth()
                    resizeHeightWithY()
                }

                if (this.resizeDirection === 'e') {
                    resizeWidth()
                    resizeHeight()
                }

                if (this.resizeDirection === 'g') {
                    resizeWidthWithX()
                    resizeHeight()
                }

                if (this.resizeDirection === 'i') resizeHeightWithY()
                if (this.resizeDirection === 'j') resizeWidth()
                if (this.resizeDirection === 'k') resizeHeight()
                if (this.resizeDirection === 'l') resizeWidthWithX()

                this.resizingChart.width  = newWidth
                this.resizingChart.x      = newX
                this.resizingChart.height = newHeight
                this.resizingChart.y      = newY
            }
        },
        /**
         * Chart move/resize start
         * @param event
         * @param chart
         */
        chartDragstart (event: DragEvent, chart: ChartItem) {
            if (!event.dataTransfer) return

            const empty = document.createElement('div')
            event.dataTransfer.setDragImage(empty, 0, 0)
            event.dataTransfer.effectAllowed = 'move'

            this.movingChart = chart
        },
        /**
         * Chart move/resize end
         */
        chartDragend () {
            this.movingChart   = null
            this.resizingChart = null
        },
        /**
         * Resize start
         * @param event
         * @param chart
         * @param direction
         */
        resizeStart (event: DragEvent, chart: ChartItem, direction: string) {
            if (!event.dataTransfer) return

            const empty = document.createElement('div')
            event.dataTransfer.setDragImage(empty, 0, 0)
            event.dataTransfer.effectAllowed = 'move'

            this.resizingChart   = chart
            this.resizeDirection = direction
        },
        /**
         * Pointer down
         * @param event
         */
        pointerDown (event: PointerEvent) {
            if (!this.canvasStatusMove || this.lock) return

            this.pointerPressed = true

            const canvasEl = this.canvas!

            canvasEl.setPointerCapture(event.pointerId)

            this.point           = { x: event.clientX, y: event.clientY }
            this.lastPointermove = { x: event.clientX, y: event.clientY }
        },
        /**
         * Pointer move
         * @param event
         */
        pointermove (event: PointerEvent) {
            if (!this.pointerPressed) return

            event.preventDefault()

            const current = { x: event.clientX, y: event.clientY }

            this.diff.x          = current.x - this.lastPointermove.x
            this.diff.y          = current.y - this.lastPointermove.y
            this.lastPointermove = { x: current.x, y: current.y }
            this.canvasX += this.diff.x
            this.canvasY += this.diff.y
        },
        /**
         * Pointer up
         */
        pointerUp () {
            this.pointerPressed = false
        },
        /**
         * Pointer cancel
         */
        pointerCancel () {
            this.pointerPressed = false
        },
    },
})
</script>

<style lang="sass" scoped>
@import "index"
</style>
