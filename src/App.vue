<template>
    <div class="page">
        <draggable-panel class="draggable-panel"
                         :canvas-style="{ background: '#FFFFFF' }"
                         :chart-style="{ background: '#1976D255' }"
                         :width="1920"
                         :height="1080"
                         :padding="32"
                         :data="chartList"
                         :chart-min-width="100"
                         :chart-min-height="100"
                         :scale-min="0.5"
                         :scale-max="10"
                         :lock="false"
                         @canvas-scale=""
                         @canvas-drop="dropInCanvas">
            <template #chart="{ chart, index }">
                <div>
                    Chart - {{ chart.id }}
                </div>
            </template>

            <template #chart-3="{ chart, index }">
                <div>
                    <strong>Chart - {{ chart.id }}</strong>
                </div>
            </template>
        </draggable-panel>

        <div class="side">
            <div class="box"
                 draggable="true"
                 @dragstart="dragstartOutDP">
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import DraggablePanel                     from './components/draggablePanel/index.vue'

// import DraggablePanel           from '../dist/draggable-panel.es'
// import '../dist/style.css'

// import DraggablePanel from 'draggable-panel'
// import 'draggable-panel/dist/style.css'

export default defineComponent({
    name      : 'App',
    components: {
        DraggablePanel,
    },
    setup() {
        const chartList = ref([])
        const offset    = reactive({ x: 0, y: 0 })

        return {
            chartList,
            offset,
        }
    },
    created() {
        this.chartList = [
            {
                id    : 1,
                width : 300,
                height: 200,
                x     : 20,
                y     : 20,
            }, {
                id    : 2,
                width : 300,
                height: 200,
                x     : 20,
                y     : 240,
            }, {
                id    : 3,
                width : 300,
                height: 200,
                x     : 20,
                y     : 460,
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
        dropInCanvas(x, y) {
            this.chartList.push({
                id    : 4,
                width : 300,
                height: 200,
                x     : x - this.offset.x,
                y     : y - this.offset.y,
            })
        },
    },
})
</script>

<style lang="sass">
body
    margin: 0
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
            border-right: 4px
</style>
