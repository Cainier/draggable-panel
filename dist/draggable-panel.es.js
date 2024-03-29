var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import { markRaw, defineComponent, ref, computed, watch, onMounted, onBeforeUnmount, h } from "vue";
var index$1 = /* @__PURE__ */ (() => '.draggable-panel{position:relative;width:100%;height:100%;overflow:hidden;background:#EEEEEE;outline:none;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.draggable-panel *{outline:none}.draggable-panel.lock .chart-item:hover{filter:none}.draggable-panel .canvas{position:relative;background:#FFFFFF;box-shadow:0 5px 130px #00000026}.draggable-panel .canvas.moving{cursor:move}.draggable-panel .canvas:after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(25,118,210,.3);visibility:hidden;opacity:0;transition:all .3s;z-index:10000}.draggable-panel .canvas.out-canvas-dragover:after{visibility:visible;opacity:1}.draggable-panel .chart-item{position:absolute;background:rgba(25,118,210,.3);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.draggable-panel .chart-item .content{position:relative;width:100%;height:100%;overflow:hidden;z-index:10}.draggable-panel .chart-item:hover{filter:brightness(1.05)}.draggable-panel .chart-item.moving .resizable-point{display:none!important}.draggable-panel .chart-item .resizable{left:0;top:0;position:absolute}.draggable-panel .chart-item .resizable .resizable-point{position:absolute;width:16px;height:16px;display:flex;flex-direction:row;justify-content:center;align-items:center;z-index:20}.draggable-panel .chart-item .resizable .resizable-point:after{content:"";display:block;width:8px;height:8px;border:2px solid #1976D2;background:#FFFFFF}.draggable-panel .chart-item .resizable .resizable-line{position:absolute;box-sizing:border-box;z-index:10}.draggable-panel .chart-item .resizable .resizable-line:after{content:"";display:block;width:100%;height:100%;background:#1976D2}.draggable-panel .chart-item .resizable .a{top:0;left:0;transform:translate(-50%,-50%);cursor:nwse-resize}.draggable-panel .chart-item .resizable .b{top:0;right:0;transform:translate(50%,-50%);cursor:nesw-resize}.draggable-panel .chart-item .resizable .c{bottom:0;right:0;transform:translate(50%,50%);cursor:nwse-resize}.draggable-panel .chart-item .resizable .d{bottom:0;left:0;transform:translate(-50%,50%);cursor:nesw-resize}.draggable-panel .chart-item .resizable .e,.draggable-panel .chart-item .resizable .f,.draggable-panel .chart-item .resizable .g,.draggable-panel .chart-item .resizable .h{pointer-events:none}.draggable-panel .chart-item .resizable .e{top:0;left:50%;margin-left:-8px;transform:translateY(-50%)}.draggable-panel .chart-item .resizable .f{top:50%;right:0;margin-top:-8px;transform:translate(50%)}.draggable-panel .chart-item .resizable .g{bottom:0;left:50%;margin-left:-8px;transform:translateY(50%)}.draggable-panel .chart-item .resizable .h{left:0;top:50%;margin-top:-8px;transform:translate(-50%)}.draggable-panel .chart-item .resizable .i{top:0;left:0;width:100%!important;height:2px;cursor:ns-resize}.draggable-panel .chart-item .resizable .j{right:0;top:0;height:100%!important;width:2px;cursor:ew-resize}.draggable-panel .chart-item .resizable .k{bottom:0;left:0;width:100%!important;height:2px;cursor:ns-resize}.draggable-panel .chart-item .resizable .l{left:0;top:0;height:100%!important;width:2px;cursor:ew-resize}\n')();
var index = markRaw(defineComponent({
  name: "draggable-panel",
  props: {
    width: {
      required: true,
      type: Number
    },
    height: {
      required: true,
      type: Number
    },
    data: {
      required: true,
      type: Array
    },
    chartMinWidth: {
      required: false,
      type: Number,
      default: 100
    },
    chartMinHeight: {
      required: false,
      type: Number,
      default: 100
    },
    padding: {
      required: false,
      type: Number,
      default: 32
    },
    lock: {
      required: false,
      type: Boolean,
      default: false
    },
    canvasStyle: {
      required: false,
      type: Object,
      default: {}
    },
    chartStyle: {
      required: false,
      type: Object,
      default: {}
    },
    scaleMin: {
      required: false,
      type: Number,
      default: 0.5
    },
    scaleMax: {
      required: false,
      type: Number,
      default: 10
    },
    chartId: {
      required: false,
      type: Number,
      default: 0
    }
  },
  emits: [
    "canvas-scale",
    "canvas-drop",
    "chart-move",
    "chart-scale"
  ],
  setup(props, ctx) {
    const container = ref(null);
    const canvas = ref(null);
    const canvasStatusMove = ref(false);
    const pointerPressed = ref(false);
    const outCanvasDragover = ref(false);
    const defaultScale = ref(1);
    const scale = ref(1);
    const defaultX = ref(0);
    const defaultY = ref(0);
    const canvasX = ref(0);
    const canvasY = ref(0);
    const resizeDirection = ref("");
    const movingChart = ref(null);
    const resizingChart = ref(null);
    const originalChart = ref(null);
    const diff = ref({ x: 0, y: 0 });
    const point = ref({ x: 0, y: 0 });
    const lastPointermove = ref({ x: 0, y: 0 });
    const chartPosition = ref({ x: 0, y: 0 });
    const dragend = ref(false);
    let selectedChart = ref(0);
    const canvasStyleComputed = computed(() => __spreadValues(__spreadValues({}, props.canvasStyle), {
      "width": props.width + "px",
      "height": props.height + "px",
      "transform": [
        `translate3d(${canvasX.value}px, ${canvasY.value}px, 0)`,
        `scale(${scale.value})`
      ].join(" ")
    }));
    const chartStyleComputed = computed(() => {
      return (chartItem, index2) => {
        const { width, height, x, y } = chartItem;
        return __spreadValues(__spreadValues({}, props.chartStyle), {
          "width": width + "px",
          "height": height + "px",
          "transform": `translateX(${x}px) translateY(${y}px)`,
          "z-index": 100 + index2
        });
      };
    });
    const pointStyleComputed = computed(() => {
      return (chartItem) => {
        const { width, height } = chartItem;
        const display = selectedChart.value === chartItem.id && !props.lock ? "block" : "none";
        return __spreadValues({}, {
          "width": width + "px",
          "height": height + "px",
          display
        });
      };
    });
    watch(scale, (newScale) => ctx.emit("canvas-scale", newScale));
    const scaleByWheel = (event) => {
      const { ctrlKey, metaKey } = event;
      if (!ctrlKey && !metaKey)
        return;
      event.preventDefault();
      if (props.lock)
        return;
      let ratio = 1 / (1 + event.deltaY * 1e-3);
      let zoom = scale.value * ratio;
      if (zoom > props.scaleMax) {
        ratio = props.scaleMax / scale.value;
        zoom = props.scaleMax;
      }
      if (zoom < props.scaleMin) {
        ratio = props.scaleMin / scale.value;
        zoom = props.scaleMin;
      }
      scale.value = zoom;
      const origin = {
        x: (ratio - 1) * props.width * 0.5,
        y: (ratio - 1) * props.height * 0.5
      };
      canvasX.value -= (ratio - 1) * (event.clientX - canvasX.value) - origin.x;
      canvasY.value -= (ratio - 1) * (event.clientY - canvasY.value) - origin.y;
    };
    const scaleAddByKeyboard = (event) => {
      event.preventDefault();
      if (props.lock)
        return;
      let zoom = scale.value + 0.1;
      if (zoom > props.scaleMax)
        zoom = props.scaleMax;
      scale.value = zoom;
    };
    const scaleSubByKeyboard = (event) => {
      event.preventDefault();
      if (props.lock)
        return;
      let zoom = scale.value - 0.1;
      if (zoom < props.scaleMin)
        zoom = props.scaleMin;
      scale.value = zoom;
    };
    const resetScale = () => {
      if (props.lock)
        return;
      scale.value = defaultScale.value;
      canvasX.value = defaultX.value;
      canvasY.value = defaultY.value;
    };
    const realScale = () => {
      if (props.lock)
        return;
      const { offsetWidth, offsetHeight } = container.value;
      scale.value = 1;
      canvasX.value = (offsetWidth - props.width) / 2;
      canvasY.value = (offsetHeight - props.height) / 2;
    };
    const panelPointerDown = (event) => {
      if (event.srcElement === container.value || event.srcElement === canvas.value)
        selectedChart.value = 0;
    };
    const pointerDown = (event) => {
      if (!canvasStatusMove.value || props.lock)
        return;
      pointerPressed.value = true;
      canvas.value.setPointerCapture(event.pointerId);
      point.value = { x: event.clientX, y: event.clientY };
      lastPointermove.value = { x: event.clientX, y: event.clientY };
    };
    const pointermove = (event) => {
      if (!pointerPressed.value)
        return;
      event.preventDefault();
      const current = { x: event.clientX, y: event.clientY };
      diff.value = {
        x: current.x - lastPointermove.value.x,
        y: current.y - lastPointermove.value.y
      };
      lastPointermove.value = { x: current.x, y: current.y };
      canvasX.value += diff.value.x;
      canvasY.value += diff.value.y;
    };
    const pointerUp = () => {
      pointerPressed.value = false;
    };
    const pointerCancel = () => {
      pointerPressed.value = false;
    };
    const chartMovePointerDown = (event, chart) => {
      if (canvasStatusMove.value || props.lock)
        return;
      selectedChart.value = chart.id;
      movingChart.value = chart;
      chartPosition.value = {
        x: event.clientX - chart.x * scale.value,
        y: event.clientY - chart.y * scale.value
      };
      originalChart.value = {
        id: chart.id,
        x: chart.x,
        y: chart.y,
        width: chart.width,
        height: chart.height
      };
      document.onpointermove = (ev) => {
        if (!movingChart.value)
          return false;
        ev.preventDefault();
        const { clientX, clientY } = ev;
        const offsetX = (clientX - chartPosition.value.x) / scale.value;
        const offsetY = (clientY - chartPosition.value.y) / scale.value;
        const { width, height } = movingChart.value;
        const maxX = props.width - width;
        const maxY = props.height - height;
        let newX = offsetX;
        let newY = offsetY;
        if (newX < 0)
          newX = 0;
        if (newY < 0)
          newY = 0;
        if (newX > maxX)
          newX = maxX;
        if (newY > maxY)
          newY = maxY;
        movingChart.value.x = newX;
        movingChart.value.y = newY;
      };
    };
    const chartMovePointerUp = (event, item) => {
      document.onpointermove = null;
      movingChart.value = null;
      if (originalChart.value.x !== item.x || originalChart.value.y !== item.y)
        ctx.emit("chart-move", item);
    };
    const chartMoveCancel = () => {
      document.onpointermove = null;
      movingChart.value = null;
    };
    const resizePointerDown = (event, chart, direction) => {
      event.stopPropagation();
      if (canvasStatusMove.value)
        return;
      const chartWidth = chart.width;
      const chartHeight = chart.height;
      const chartX = chart.x;
      const chartY = chart.y;
      resizingChart.value = chart;
      resizeDirection.value = direction;
      chartPosition.value = {
        x: event.clientX,
        y: event.clientY
      };
      originalChart.value = {
        id: chart.id,
        x: chart.x,
        y: chart.y,
        width: chart.width,
        height: chart.height
      };
      document.onpointermove = (ev) => {
        if (!resizingChart.value)
          return false;
        const { clientX, clientY } = ev;
        const offsetX = (clientX - chartPosition.value.x) / scale.value;
        const offsetY = (clientY - chartPosition.value.y) / scale.value;
        const { width, height, x, y } = resizingChart.value;
        const chartMaxWidth = props.width - x;
        const chartMaxHeight = props.height - y;
        const direction2 = resizeDirection.value;
        let newWidth = width;
        let newHeight = height;
        let newX = x;
        let newY = y;
        const resizeWidth = () => {
          newWidth = chartWidth + offsetX;
          if (newWidth < props.chartMinWidth)
            newWidth = width;
          if (newWidth > chartMaxWidth)
            newWidth = chartMaxWidth;
        };
        const resizeHeight = () => {
          newHeight = chartHeight + offsetY;
          if (newHeight < props.chartMinHeight)
            newHeight = height;
          if (newHeight > chartMaxHeight)
            newHeight = chartMaxHeight;
        };
        const resizeWidthWithX = () => {
          newX = chartX + offsetX;
          newWidth = chartWidth - offsetX;
          if (newX < 0) {
            newX = 0;
            newWidth = width + x;
          }
          if (newWidth < props.chartMinWidth) {
            newWidth = width;
            newX = x;
          }
        };
        const resizeHeightWithY = () => {
          newY = chartY + offsetY;
          newHeight = chartHeight - offsetY;
          if (newY < 0) {
            newY = 0;
            newHeight = height + y;
          }
          if (newHeight < props.chartMinHeight) {
            newHeight = height;
            newY = y;
          }
        };
        if (direction2 === "a") {
          resizeWidthWithX();
          resizeHeightWithY();
        }
        if (direction2 === "b") {
          resizeWidth();
          resizeHeightWithY();
        }
        if (direction2 === "c") {
          resizeWidth();
          resizeHeight();
        }
        if (direction2 === "d") {
          resizeWidthWithX();
          resizeHeight();
        }
        if (direction2 === "i")
          resizeHeightWithY();
        if (direction2 === "j")
          resizeWidth();
        if (direction2 === "k")
          resizeHeight();
        if (direction2 === "l")
          resizeWidthWithX();
        resizingChart.value.width = newWidth;
        resizingChart.value.height = newHeight;
        resizingChart.value.x = newX;
        resizingChart.value.y = newY;
      };
    };
    const resizePointerUp = (event, item) => {
      event.stopPropagation();
      document.onpointermove = null;
      resizingChart.value = null;
      if (originalChart.value.x !== item.x || originalChart.value.y !== item.y || originalChart.value.width !== item.width || originalChart.value.height !== item.height)
        ctx.emit("chart-scale", item);
    };
    const dragoverContainer = (event) => {
      event.preventDefault();
      const { clientX, clientY } = event;
      chartPosition.value = { x: clientX, y: clientY };
    };
    const dropInCanvas = (event) => {
      if (movingChart.value || resizingChart.value)
        return;
      dragend.value = true;
      outCanvasDragover.value = false;
      ctx.emit("canvas-drop", event, {
        x: event.offsetX,
        y: event.offsetY
      });
    };
    const dragenterCanvas = () => {
      if (movingChart.value || resizingChart.value)
        return;
      outCanvasDragover.value = true;
    };
    const dragleaveCanvas = (event) => {
      if (canvas.value === event.srcElement)
        outCanvasDragover.value = false;
    };
    function init() {
      const { offsetWidth, offsetHeight } = container.value;
      const defaultMaxWidth = offsetWidth - props.padding;
      const defaultMaxHeight = offsetHeight - props.padding;
      const ratioContainer = offsetWidth / offsetHeight;
      const ratioCanvas = props.width / props.height;
      defaultScale.value = ratioContainer < ratioCanvas ? defaultMaxWidth / props.width : defaultMaxHeight / props.height;
      defaultX.value = (offsetWidth - props.width) / 2;
      defaultY.value = (offsetHeight - props.height) / 2;
      scale.value = defaultScale.value;
      canvasX.value = defaultX.value;
      canvasY.value = defaultY.value;
    }
    function createResizableList(chartItem) {
      const pointDirectionList = ["a", "b", "c", "d"];
      const resizablePointDirectionList = ["e", "f", "g", "h"];
      const lineDirectionList = ["i", "j", "k", "l"];
      const resizableList = [];
      pointDirectionList.forEach((direction) => {
        resizableList.push(h("div", {
          class: [
            "resizable-point",
            direction
          ],
          key: direction,
          onPointerdown: (event) => resizePointerDown(event, chartItem, direction),
          onPointerup: (event) => resizePointerUp(event, chartItem)
        }));
      });
      resizablePointDirectionList.forEach((direction) => {
        resizableList.push(h("div", {
          class: [
            "resizable-point",
            direction
          ],
          key: direction
        }));
      });
      lineDirectionList.forEach((direction) => {
        resizableList.push(h("div", {
          class: [
            "resizable-line",
            direction
          ],
          key: direction,
          onPointerdown: (event) => resizePointerDown(event, chartItem, direction),
          onPointerup: (event) => resizePointerUp(event, chartItem)
        }));
      });
      return resizableList;
    }
    function createChartList() {
      const chartList = [];
      if (dragend.value) {
        selectedChart.value = props.chartId;
        dragend.value = false;
      }
      props.data.forEach((item, index2) => {
        var _a, _b;
        const defaultSlot = ctx.slots.chart({
          chart: item,
          index: index2
        });
        const customSlot = ctx.slots[`chart-${item.id}`] ? ctx.slots[`chart-${item.id}`]({
          chart: item,
          index: index2
        }) : null;
        chartList.push(h("div", {
          class: [
            "chart-item",
            ((_a = movingChart.value) == null ? void 0 : _a.id) === item.id ? "moving" : "",
            ((_b = resizingChart.value) == null ? void 0 : _b.id) === item.id ? "resizing" : ""
          ],
          key: item.id,
          style: chartStyleComputed.value(item, index2),
          ["data-id"]: item.id,
          onPointerdown: (event) => chartMovePointerDown(event, item),
          onPointerup: (event) => chartMovePointerUp(event, item),
          onPointercancel: chartMoveCancel
        }, [
          h("div", {
            class: ["content"]
          }, [
            defaultSlot,
            customSlot
          ]),
          h("div", {
            class: ["resizable"],
            style: pointStyleComputed.value(item)
          }, createResizableList(item))
        ]));
      });
      return chartList;
    }
    function catchMouseup() {
      document.onpointermove = null;
      resizingChart.value = null;
      movingChart.value = null;
    }
    onMounted(() => {
      init();
      window.addEventListener("resize", init);
      window.addEventListener("mouseup", catchMouseup);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mouseup", catchMouseup);
    });
    return () => [
      h("div", {
        class: [
          "draggable-panel",
          props.lock ? "lock" : ""
        ],
        tabindex: -1,
        ref: container,
        autofocus: true,
        onkeydown(event) {
          const { ctrlKey, metaKey } = event;
          const code = event.code.toLowerCase();
          if (code === "space")
            return canvasStatusMove.value = true;
          if (code === "equal" && (ctrlKey || metaKey))
            return scaleAddByKeyboard(event);
          if (code === "minus" && (ctrlKey || metaKey))
            return scaleSubByKeyboard(event);
          if (code === "digit0") {
            event.preventDefault();
            return resetScale();
          }
          if (code === "enter") {
            event.preventDefault();
            return realScale();
          }
        },
        onkeyup(event) {
          const code = event.code.toLowerCase();
          if (code === "space")
            canvasStatusMove.value = false;
        },
        onPointerdown: panelPointerDown,
        onwheel: scaleByWheel,
        onDragover: dragoverContainer
      }, h("div", {
        ref: canvas,
        class: [
          "canvas",
          outCanvasDragover.value ? "out-canvas-dragover" : "",
          canvasStatusMove.value ? "moving" : ""
        ],
        style: canvasStyleComputed.value,
        onPointerdown: pointerDown,
        onPointermove: pointermove,
        onPointerup: pointerUp,
        onPointercancel: pointerCancel,
        onDragenter: dragenterCanvas,
        onDragleave: dragleaveCanvas,
        onDrop: dropInCanvas
      }, createChartList()))
    ];
  }
}));
export { index as default };
//# sourceMappingURL=draggable-panel.es.js.map
