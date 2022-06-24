<template>
    <div class="page">
        <draggable-panel class="draggable-panel"
                         :canvas-style="{ background: '#FFFFFF' }"
                         :chart-style="{ background: '#1976D255' }"
                         :width="canvasWidth"
                         :height="canvasHeight"
                         :padding="32"
                         :data="chartList"
                         :chart-min-width="100"
                         :chart-min-height="100"
                         :scale-min="0.5"
                         :scale-max="10"
                         :lock="false"
                         @canvas-scale="canvasScale"
                         @canvas-drop="dropInCanvas">
            <template #chart="{ chart, index }">
                <div style="padding: 16px">
                    ID: {{ chart.id }} (default)
                </div>
            </template>

            <template #chart-8888="{ chart, index }">
                <div style="padding: 16px; color: #FF0000">
                    <strong>ID: {{ chart.id }} (slot with id)</strong>
                    <div style="margin: 8px 0">Hotkey:</div>
                    <ul>
                        <li>move: space + drag</li>
                        <li>scale: ctrl + mousewheel</li>
                        <li>scale +: ctrl + =</li>
                        <li>scale -: ctrl + -</li>
                        <li>reset -: ctrl + 0</li>
                        <li>real size: ctrl + enter</li>
                    </ul>
                </div>
            </template>
        </draggable-panel>

        <div class="side">
            <div class="box"
                 draggable="true"
                 @dragstart="dragstartOutDP">
                Drag me to the canvas
            </div>
        </div>
    </div>
</template>

<script>
import {defineComponent, ref, reactive} from 'vue'

// Dev draggable-panel
import DraggablePanel from './components/draggablePanel'

// Use in your project
// import DraggablePanel from 'draggable-panel'
// import 'draggable-panel/dist/style.css'

export default defineComponent({
    name: 'App',
    components: {
        DraggablePanel,
    },
    setup() {
        const canvasWidth = ref(1920)
        const canvasHeight = ref(1080)
        const chartList = ref([])
        const offset = reactive({x: 0, y: 0})

        return {
            canvasWidth,
            canvasHeight,
            chartList,
            offset,
        }
    },
    created() {
        this.chartList = [
            {
                id: 1231,
                width: 300,
                height: 200,
                x: 20,
                y: 20,
            }, {
                id: 3213,
                width: 300,
                height: 200,
                x: 20,
                y: 240,
            }, {
                id: 8888,
                width: 400,
                height: 250,
                x: 20,
                y: 460,
            },
        ]
    },
    methods: {
        dragstartOutDP(event) {
            this.offset = {
                x: event.offsetX,
                y: event.offsetY,
            }
        },
        dropInCanvas(event, position) {
            console.info('Event: canvas-drop', event, position)

            this.chartList.push({
                id: Number((Math.random() * 10 ** 4).toFixed(0)),
                width: 300,
                height: 200,
                x: position.x - this.offset.x,
                y: position.y - this.offset.y,
            })
        },
        canvasScale(scale) {
            console.info('Event: canvas-scale:', scale)
        },
    },
})
</script>

<style lang="sass">
body
    margin: 0
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", Arial, sans-serif
</style>

<style lang="sass" scoped>
.page
    height: 100vh
    display: flex
    flex-direction: row
    flex-wrap: nowrap

    .draggable-panel
        width: 100%
        height: 100%

    .side
        min-width: 260px
        height: 100%
        border-left: 1px solid #DDDDDD
        background: #FFFFFF
        padding: 16px
        box-sizing: border-box

        .box
            height: 100px
            background: #EEEEEE
            border-radius: 4px
            padding: 8px
            border: 1px solid #DDDDDD
            display: flex
            justify-content: center
            align-items: center
            box-shadow: 0 5px 20px rgba(#333333, .1)

            &:hover
                filter: brightness(.9)
</style>
