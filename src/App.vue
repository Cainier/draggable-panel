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
                         @canvas-scale="">
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
    </div>
</template>

<script lang="ts">
import { defineComponent, App } from 'vue'
// import DraggablePanel      from './components/draggablePanel'

import DraggablePanel           from '../dist/draggable-panel.es'
import '../dist/style.css'

// @ts-ignore
// import DraggablePanel      from 'draggable-panel'
// import 'draggable-panel/dist/style.css'


export default defineComponent({
    name      : 'App',
    components: {
        DraggablePanel,
    },
    data () {
        return {
            chartList: [
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
            ],
        }
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
</style>
