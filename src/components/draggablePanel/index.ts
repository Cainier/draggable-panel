import {
    markRaw,
    defineComponent,
    PropType,
    ref,
    computed,
    watch,
    h,
    onMounted,
    onBeforeUnmount,
}
    from 'vue'

import {
    ChartItem,
    Position,
    Style,
} from '../../../types/draggable-panel'
import './index.sass'

export default markRaw(defineComponent({
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
        chartId       : {
            required: false,
            type    : Number as PropType<number>,
            default : 0,
        },
    },
    emits: [
        'canvas-scale',
        'canvas-drop',
        'chart-move',
        'chart-scale',
    ],
    setup (props, ctx) {
        const container         = ref<HTMLElement | null>(null)
        const canvas            = ref<HTMLElement | null>(null)
        const canvasStatusMove  = ref<boolean>(false)
        const pointerPressed    = ref<boolean>(false)
        const outCanvasDragover = ref<boolean>(false)
        const defaultScale      = ref<number>(1)
        const scale             = ref<number>(1)
        const defaultX          = ref<number>(0)
        const defaultY          = ref<number>(0)
        const canvasX           = ref<number>(0)
        const canvasY           = ref<number>(0)
        const resizeDirection   = ref<string>('')
        const movingChart       = ref<ChartItem | null>(null)
        const resizingChart     = ref<ChartItem | null>(null)
        const originalChart     = ref<ChartItem | null>(null)
        const diff              = ref<Position>({ x: 0, y: 0 })
        const point             = ref<Position>({ x: 0, y: 0 })
        const lastPointermove   = ref<Position>({ x: 0, y: 0 })
        const chartPosition     = ref<Position>({ x: 0, y: 0 })
        const dragend           = ref<boolean>(false)

        let selectedChart = ref<number>(0)

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
        const chartStyleComputed  = computed(() => {
            return (chartItem: ChartItem, index: number) => {
                const { width, height, x, y } = chartItem
                return {
                    ...props.chartStyle,
                    ...{
                        // translate better than translate3d
                        // translate3d causes blurry content
                        'width'    : width + 'px',
                        'height'   : height + 'px',
                        'transform': `translateX(${x}px) translateY(${y}px)`,
                        'z-index'  : 100 + index,
                    },
                }
            }
        })
        const pointStyleComputed  = computed(() => {
            return (chartItem: ChartItem) => {
                const { width, height } = chartItem
                const display           = (selectedChart.value === chartItem.id && !props.lock) ? 'block' : 'none'
                return {
                    ...{
                        'width' : width + 'px',
                        'height': height + 'px',
                        display,
                    },
                }
            }
        })

        watch(scale, newScale => ctx.emit('canvas-scale', newScale))

        /**
         * Scale canvas by wheel
         * @param event
         */
        const scaleByWheel = (event: WheelEvent) => {
            const { ctrlKey, metaKey } = event

            if (!ctrlKey && !metaKey) return

            event.preventDefault()

            if (props.lock) return

            let ratio = 1 / (1 + event.deltaY * 0.001)
            let zoom  = scale.value * ratio

            if (zoom > props.scaleMax) {
                ratio = props.scaleMax / scale.value
                zoom  = props.scaleMax
            }

            if (zoom < props.scaleMin) {
                ratio = props.scaleMin / scale.value
                zoom  = props.scaleMin
            }

            scale.value = zoom

            const origin = {
                x: (ratio - 1) * props.width * 0.5,
                y: (ratio - 1) * props.height * 0.5,
            }

            canvasX.value -= (ratio - 1) * (event.clientX - canvasX.value) - origin.x
            canvasY.value -= (ratio - 1) * (event.clientY - canvasY.value) - origin.y
        }

        /**
         * Scale canvas add
         * @param event
         */
        const scaleAddByKeyboard = (event: KeyboardEvent) => {
            event.preventDefault()

            if (props.lock) return

            let zoom = scale.value + 0.1

            if (zoom > props.scaleMax) zoom = props.scaleMax

            scale.value = zoom
        }

        /**
         * Scale canvas sub
         * @param event
         */
        const scaleSubByKeyboard = (event: KeyboardEvent) => {
            event.preventDefault()

            if (props.lock) return

            let zoom = scale.value - 0.1

            if (zoom < props.scaleMin) zoom = props.scaleMin

            scale.value = zoom
        }

        /**
         * Reset scale
         */
        const resetScale = () => {
            if (props.lock) return

            scale.value   = defaultScale.value
            canvasX.value = defaultX.value
            canvasY.value = defaultY.value
        }

        /**
         * Real scale
         */
        const realScale = () => {
            if (props.lock) return

            const { offsetWidth, offsetHeight } = container.value

            scale.value   = 1
            canvasX.value = (offsetWidth - props.width) / 2
            canvasY.value = (offsetHeight - props.height) / 2
        }

        /**
         * Panel Pointer Down
         * @param event
         */
        const panelPointerDown = (event: PointerEvent) => {
            if (event.srcElement === container.value || event.srcElement === canvas.value) selectedChart.value = 0
        }

        /**
         * Pointer down
         * @param event
         */
        const pointerDown = (event: PointerEvent) => {
            if (!canvasStatusMove.value || props.lock) return

            pointerPressed.value = true

            canvas.value.setPointerCapture(event.pointerId)

            point.value           = { x: event.clientX, y: event.clientY }
            lastPointermove.value = { x: event.clientX, y: event.clientY }
        }

        /**
         * Pointer move
         * @param event
         */
        const pointermove = (event: PointerEvent) => {
            if (!pointerPressed.value) return

            event.preventDefault()

            const current = { x: event.clientX, y: event.clientY }

            diff.value = {
                x: current.x - lastPointermove.value.x,
                y: current.y - lastPointermove.value.y,
            }

            lastPointermove.value = { x: current.x, y: current.y }
            canvasX.value += diff.value.x
            canvasY.value += diff.value.y
        }

        /**
         * Pointer up
         */
        const pointerUp = () => {
            pointerPressed.value = false
        }

        /**
         * Pointer cancel
         */
        const pointerCancel = () => {
            pointerPressed.value = false
        }

        /**
         * chart move pointer down
         */
        const chartMovePointerDown = (event: PointerEvent, chart: ChartItem) => {
            if (canvasStatusMove.value || props.lock) return

            selectedChart.value = chart.id as number

            movingChart.value   = chart
            chartPosition.value = {
                x: event.clientX - chart.x * scale.value,
                y: event.clientY - chart.y * scale.value,
            }

            originalChart.value = {
                id    : chart.id,
                x     : chart.x,
                y     : chart.y,
                width : chart.width,
                height: chart.height,
            }

            document.onpointermove = (ev: PointerEvent) => {
                if (!movingChart.value) return false
                ev.preventDefault()
                const { clientX, clientY } = ev

                const offsetX = (clientX - chartPosition.value.x) / scale.value
                const offsetY = (clientY - chartPosition.value.y) / scale.value

                const { width, height } = movingChart.value
                const maxX              = props.width - width
                const maxY              = props.height - height
                let newX                = offsetX
                let newY                = offsetY

                if (newX < 0) newX = 0
                if (newY < 0) newY = 0
                if (newX > maxX) newX = maxX
                if (newY > maxY) newY = maxY

                movingChart.value.x = newX
                movingChart.value.y = newY
            }
        }

        /**
         * chart move pointer up
         */
        const chartMovePointerUp = (event, item) => {
            document.onpointermove = null
            movingChart.value      = null

            if (originalChart.value.x !== item.x || originalChart.value.y !== item.y) ctx.emit('chart-move', item)
        }

        /**
         * chart move cancel
         */
        const chartMoveCancel = () => {
            document.onpointermove = null
            movingChart.value      = null
        }

        /**
         * resize pointer down
         */
        const resizePointerDown = (event: DragEvent, chart: ChartItem, direction: string) => {
            event.stopPropagation()

            if (canvasStatusMove.value) return

            const chartWidth      = chart.width
            const chartHeight     = chart.height
            const chartX          = chart.x
            const chartY          = chart.y
            resizingChart.value   = chart
            resizeDirection.value = direction
            chartPosition.value   = {
                x: event.clientX,
                y: event.clientY,
            }

            originalChart.value = {
                id    : chart.id,
                x     : chart.x,
                y     : chart.y,
                width : chart.width,
                height: chart.height,
            }

            document.onpointermove = (ev: PointerEvent) => {
                if (!resizingChart.value) return false

                const { clientX, clientY } = ev
                const offsetX              = (clientX - chartPosition.value.x) / scale.value
                const offsetY              = (clientY - chartPosition.value.y) / scale.value

                const { width, height, x, y } = resizingChart.value
                const chartMaxWidth           = props.width - x
                const chartMaxHeight          = props.height - y
                const direction               = resizeDirection.value

                let newWidth  = width
                let newHeight = height
                let newX      = x
                let newY      = y

                const resizeWidth  = () => {
                    newWidth = chartWidth + offsetX
                    if (newWidth < props.chartMinWidth) newWidth = width
                    if (newWidth > chartMaxWidth) newWidth = chartMaxWidth
                }
                const resizeHeight = () => {
                    newHeight = chartHeight + offsetY
                    if (newHeight < props.chartMinHeight) newHeight = height
                    if (newHeight > chartMaxHeight) newHeight = chartMaxHeight
                }

                const resizeWidthWithX  = () => {
                    newX     = chartX + offsetX
                    newWidth = chartWidth - offsetX

                    if (newX < 0) {
                        newX     = 0
                        newWidth = width + x
                    }

                    if (newWidth < props.chartMinWidth) {
                        newWidth = width
                        newX     = x
                    }
                }
                const resizeHeightWithY = () => {
                    newY      = chartY + offsetY
                    newHeight = chartHeight - offsetY

                    if (newY < 0) {
                        newY      = 0
                        newHeight = height + y
                    }

                    if (newHeight < props.chartMinHeight) {
                        newHeight = height
                        newY      = y
                    }
                }

                if (direction === 'a') {
                    resizeWidthWithX()
                    resizeHeightWithY()
                }

                if (direction === 'b') {
                    resizeWidth()
                    resizeHeightWithY()
                }

                if (direction === 'c') {
                    resizeWidth()
                    resizeHeight()
                }

                if (direction === 'd') {
                    resizeWidthWithX()
                    resizeHeight()
                }

                if (direction === 'i') resizeHeightWithY()
                if (direction === 'j') resizeWidth()
                if (direction === 'k') resizeHeight()
                if (direction === 'l') resizeWidthWithX()

                resizingChart.value.width  = newWidth
                resizingChart.value.height = newHeight
                resizingChart.value.x      = newX
                resizingChart.value.y      = newY
            }
        }

        /**
         * resize pointer up
         */
        const resizePointerUp = (event, item) => {
            event.stopPropagation()

            document.onpointermove = null
            resizingChart.value    = null

            if (originalChart.value.x !== item.x
                || originalChart.value.y !== item.y
                || originalChart.value.width !== item.width
                || originalChart.value.height !== item.height) ctx.emit('chart-scale', item)
        }

        /**
         * Dragover over container (move/resize)
         * @param event
         */
        const dragoverContainer = (event: DragEvent) => {
            event.preventDefault()

            const { clientX, clientY } = event
            chartPosition.value        = { x: clientX, y: clientY }
        }

        /**
         * Drop in canvas
         * @param event
         */
        const dropInCanvas = (event: DragEvent) => {
            if (movingChart.value || resizingChart.value) return

            dragend.value           = true
            outCanvasDragover.value = false

            ctx.emit('canvas-drop', event, {
                x: event.offsetX,
                y: event.offsetY,
            })
        }

        /**
         * Drag in from outside the canvas
         */
        const dragenterCanvas = () => {
            if (movingChart.value || resizingChart.value) return

            outCanvasDragover.value = true
        }

        /**
         * Drag in from outside the canvas cancel
         */
        const dragleaveCanvas = (event) => {
            if (canvas.value === event.srcElement) outCanvasDragover.value = false
        }

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

        /**
         * Create Resizable h Dom
         * @param chartItem
         */
        function createResizableList (chartItem) {
            const pointDirectionList          = ['a', 'b', 'c', 'd']
            const resizablePointDirectionList = ['e', 'f', 'g', 'h']
            const lineDirectionList           = ['i', 'j', 'k', 'l']
            const resizableList               = []

            pointDirectionList.forEach(direction => {
                resizableList.push(h('div', {
                    class        : [
                        'resizable-point',
                        direction,
                    ],
                    key          : direction,
                    onPointerdown: event => resizePointerDown(event, chartItem, direction),
                    onPointerup  : event => resizePointerUp(event, chartItem),
                }))
            })

            resizablePointDirectionList.forEach(direction => {
                resizableList.push(h('div', {
                    class: [
                        'resizable-point',
                        direction,
                    ],
                    key  : direction,
                }))
            })

            lineDirectionList.forEach(direction => {
                resizableList.push(h('div', {
                    class        : [
                        'resizable-line',
                        direction,
                    ],
                    key          : direction,
                    onPointerdown: event => resizePointerDown(event, chartItem, direction),
                    onPointerup  : event => resizePointerUp(event, chartItem),
                }))
            })

            return resizableList
        }

        /**
         * Create Chart h Dom
         */
        function createChartList () {
            const chartList = []

            if (dragend.value) {
                selectedChart.value = props.chartId
                dragend.value       = false
            }

            props.data.forEach((item, index) => {

                const defaultSlot = ctx.slots.chart({
                    chart: item,
                    index,
                })
                const customSlot  = ctx.slots[`chart-${item.id}`]
                    ? ctx.slots[`chart-${item.id}`]({
                        chart: item,
                        index,
                    })
                    : null

                chartList.push(h('div', {
                    class          : [
                        'chart-item',
                        movingChart.value?.id === item.id ? 'moving' : '',
                        resizingChart.value?.id === item.id ? 'resizing' : '',
                    ],
                    key            : item.id,
                    style          : chartStyleComputed.value(item, index),
                    ['data-id']    : item.id,
                    onPointerdown  : event => chartMovePointerDown(event, item),
                    onPointerup    : event => chartMovePointerUp(event, item),
                    onPointercancel: chartMoveCancel,
                }, [
                    h('div', {
                        class: ['content'],
                    }, [
                        defaultSlot,
                        customSlot,
                    ]),
                    h('div', {
                        class: ['resizable'],
                        style: pointStyleComputed.value(item),
                    }, createResizableList(item)),
                ]))
            })

            return chartList
        }

        /**
         * Catch Event mouseup
         */
        function catchMouseup () {
            document.onpointermove = null
            resizingChart.value    = null
            movingChart.value      = null
        }

        onMounted(() => {
            init()
            window.addEventListener('resize', init)
            window.addEventListener('mouseup', catchMouseup)
        })

        onBeforeUnmount(() => {
            window.removeEventListener('resize', init)
            window.removeEventListener('mouseup', catchMouseup)
        })

        return () => [
            h('div', {
                class    : [
                    'draggable-panel',
                    props.lock ? 'lock' : '',
                ],
                tabindex : -1,
                ref      : container,
                autofocus: true,
                onkeydown (event: KeyboardEvent) {
                    const { ctrlKey, metaKey } = event
                    const code                 = event.code.toLowerCase()

                    // TODO: exact
                    if (code === 'space') return canvasStatusMove.value = true
                    if (code === 'equal' && (ctrlKey || metaKey)) return scaleAddByKeyboard(event)
                    if (code === 'minus' && (ctrlKey || metaKey)) return scaleSubByKeyboard(event)
                    if (code === 'digit0') {
                        event.preventDefault()
                        return resetScale()
                    }
                    if (code === 'enter') {
                        event.preventDefault()
                        return realScale()
                    }
                },
                onkeyup (event: KeyboardEvent) {
                    const code = event.code.toLowerCase()

                    if (code === 'space') canvasStatusMove.value = false
                },
                onPointerdown: panelPointerDown,
                onwheel      : scaleByWheel,
                onDragover   : dragoverContainer,
            }, h('div', {
                ref            : canvas,
                class          : [
                    'canvas',
                    outCanvasDragover.value ? 'out-canvas-dragover' : '',
                    canvasStatusMove.value ? 'moving' : '',
                ],
                style          : canvasStyleComputed.value,
                onPointerdown  : pointerDown,
                onPointermove  : pointermove,
                onPointerup    : pointerUp,
                onPointercancel: pointerCancel,
                onDragenter    : dragenterCanvas,
                onDragleave    : dragleaveCanvas,
                onDrop         : dropInCanvas,
            }, createChartList())),
        ]
    },
}))
