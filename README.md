# Vue Draggable Panel

> v1.0.1

---

**Vue3** based drag panel component, demo: https://

## Demo

## Features

1. Canvas scale
2. Canvas move
3. Chart item scale
4. Chart item resize

## Installation

``` typescript
npm i draggable-panel

yarn add draggable-panel
```

## Document

### Props

* width: Number
    - Description: Panel width (px)
    - Required
    - Example: 1920
* height: Number
    - Description: Panel height (px)
    - Required
    - Example: 1080
* data: Objects in Array
    - Description: Chart data array
    - Required
    - Example:
      ```
      [
        ...
        {
          id    : 1,    // ID (Number / String)
          width : 300,  // Default width (Number)
          height: 200,  // Default height (Number)
          x     : 20,   // Default Y (Number)
          y     : 20    // Default X (Number)
        },
        ...
      ]
      ```
* chartMinWidth: Number
    - Description: Minimum chart width (px)
    - Default: 100
* chartMinHeight: Number
    - Description: Minimum chart height (px)
    - Default: 100
* padding: Number
    - Description: The default spacing between the canvas and the container (px)
    - Example: 32
* scaleMin: Number
    - Description: Canvas minimum scale ratio
    - Example: 0.5
* scaleMax: Number
    - Description: Canvas maximum scale ratio
    - Example: 10
* lock: Boolean
    - Description: Lock scale / move / resize
    - Example: false
* canvasStyle: Object
    - Description: Canvas custom style
    - Example:
      ``` json
      {
        "background": "#FFFFFF"
      }
      ```
* chartStyle: Object
    - Description: Chart custom style
    - Example: false
      ``` json
      {
        "background": "#1976D255"
      }
      ```

### Events

* @canvas-scale -> function(scale)
    - Description: Emitted when canvas scale
    - Parameters:
        - scale: Number
        - Description: Scale ratio

### Slots

* chart
    - Description: Chart default item
    - Required
    - Example:
      ``` html
      <template #chart="{ chart, index }">
          <div>{{ chart }}</div>
      </template>
      ```

* chart-[id]
    - Description: Chart for specified ID
    - Example:
      ``` html
      <template #chart-1="{ chart, index }">
          <div>{{ chart }}</div>
      </template>

      <template #chart-2="{ chart, index }">
          <div>{{ chart }}</div>
      </template>
      ```

## Example

``` vue
<template>
    <div style="height: 100vh">
        <draggable-panel :width="1920"
                         :height="1080"
                         :data="chartList">
            <template #chart="{ chart, index }">
                <div>{{ chart.id }}</div>
            </template>
        </draggable-panel>
    </div>
</template>

<script lang="ts">
import DraggablePanel from 'draggable-panel'

export default defineComponent({
    name      : 'Demo',
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
```

## Thanks For

* [js 实现以鼠标位置为中心滚轮缩放图片](https://juejin.cn/post/7009892447211749406)
* [vite打包lib库](https://juejin.cn/post/7073646687968821256)