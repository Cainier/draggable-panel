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
import { defineComponent, ref, computed, onMounted, onBeforeUnmount, openBlock, createElementBlock, normalizeClass, withKeys, withModifiers, createElementVNode, normalizeStyle, Fragment, renderList, renderSlot } from "vue";
var index_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => '.draggable-panel[data-v-34a94c50]{position:relative;width:100%;height:100%;overflow:hidden;background:#EEEEEE;outline:none;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.draggable-panel.lock .chart-item[data-v-34a94c50]:hover{filter:none}.draggable-panel.lock .chart-item .resizable[data-v-34a94c50]{display:none}.draggable-panel .canvas[data-v-34a94c50]{background:#FFFFFF;box-shadow:0 5px 130px #00000026}.draggable-panel .chart-item[data-v-34a94c50]{position:absolute;background:rgba(25,118,210,.3);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.draggable-panel .chart-item .content[data-v-34a94c50]{position:relative;width:100%;height:100%;overflow:hidden;z-index:10}.draggable-panel .chart-item[data-v-34a94c50]:hover{filter:brightness(1.05)}.draggable-panel .chart-item:hover .resizable[data-v-34a94c50]{display:block}.draggable-panel .chart-item.moving .resizable[data-v-34a94c50]{display:none}.draggable-panel .chart-item.resizing .resizable[data-v-34a94c50]{display:block}.draggable-panel .chart-item .resizable[data-v-34a94c50]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:100%;height:100%;z-index:1;display:none}.draggable-panel .chart-item .resizable .resizable-point[data-v-34a94c50]{position:absolute;width:16px;height:16px;display:flex;flex-direction:row;justify-content:center;align-items:center;z-index:20}.draggable-panel .chart-item .resizable .resizable-point[data-v-34a94c50]:after{content:"";display:block;width:8px;height:8px;border:1px solid #1976D2;background:#FFFFFF}.draggable-panel .chart-item .resizable .resizable-line[data-v-34a94c50]{position:absolute;z-index:10}.draggable-panel .chart-item .resizable .resizable-line[data-v-34a94c50]:after{content:"";position:absolute;display:block;background:#1976D2}.draggable-panel .chart-item .resizable .b[data-v-34a94c50],.draggable-panel .chart-item .resizable .d[data-v-34a94c50],.draggable-panel .chart-item .resizable .f[data-v-34a94c50],.draggable-panel .chart-item .resizable .h[data-v-34a94c50]{pointer-events:none}.draggable-panel .chart-item .resizable .a[data-v-34a94c50]{top:0;left:0;transform:translate(-50%,-50%);cursor:nwse-resize}.draggable-panel .chart-item .resizable .b[data-v-34a94c50]{top:0;left:50%;margin-left:-8px;transform:translateY(-50%)}.draggable-panel .chart-item .resizable .c[data-v-34a94c50]{top:0;right:0;transform:translate(50%,-50%);cursor:nesw-resize}.draggable-panel .chart-item .resizable .d[data-v-34a94c50]{top:50%;right:0;margin-top:-8px;transform:translate(50%)}.draggable-panel .chart-item .resizable .e[data-v-34a94c50]{bottom:0;right:0;transform:translate(50%,50%);cursor:nwse-resize}.draggable-panel .chart-item .resizable .f[data-v-34a94c50]{bottom:0;left:50%;margin-left:-8px;transform:translateY(50%)}.draggable-panel .chart-item .resizable .g[data-v-34a94c50]{bottom:0;left:0;transform:translate(-50%,50%);cursor:nesw-resize}.draggable-panel .chart-item .resizable .h[data-v-34a94c50]{left:0;top:50%;margin-top:-8px;transform:translate(-50%)}.draggable-panel .chart-item .resizable .i[data-v-34a94c50]{top:0;left:0;width:100%;height:16px;transform:translateY(-16px);cursor:ns-resize}.draggable-panel .chart-item .resizable .i[data-v-34a94c50]:after{bottom:0;left:0;height:1px;width:100%}.draggable-panel .chart-item .resizable .j[data-v-34a94c50]{right:0;top:0;height:100%;width:16px;transform:translate(16px);cursor:ew-resize}.draggable-panel .chart-item .resizable .j[data-v-34a94c50]:after{top:0;left:0;height:100%;width:1px}.draggable-panel .chart-item .resizable .k[data-v-34a94c50]{bottom:0;left:0;width:100%;height:16px;transform:translateY(16px);cursor:ns-resize}.draggable-panel .chart-item .resizable .k[data-v-34a94c50]:after{top:0;left:0;height:1px;width:100%}.draggable-panel .chart-item .resizable .l[data-v-34a94c50]{left:0;top:0;height:100%;width:16px;transform:translate(-16px);cursor:ew-resize}.draggable-panel .chart-item .resizable .l[data-v-34a94c50]:after{top:0;right:0;height:100%;width:1px}\n')();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main = defineComponent({
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
    }
  },
  setup(props) {
    const container = ref(null);
    const canvas = ref(null);
    const canvasStatusMove = ref(false);
    const pointerPressed = ref(false);
    const defaultScale = ref(1);
    const scale = ref(1);
    const defaultX = ref(0);
    const defaultY = ref(0);
    const canvasX = ref(0);
    const canvasY = ref(0);
    const resizeDirection = ref("");
    const movingChart = ref(null);
    const resizingChart = ref(null);
    const diff = ref({ x: 0, y: 0 });
    const point = ref({ x: 0, y: 0 });
    const lastPointermove = ref({ x: 0, y: 0 });
    const chartPosition = ref({ x: 0, y: 0 });
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
    onMounted(() => {
      init();
      window.addEventListener("resize", init);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", init);
    });
    return {
      container,
      canvas,
      defaultX,
      defaultY,
      defaultScale,
      scale,
      point,
      lastPointermove,
      diff,
      movingChart,
      resizingChart,
      resizeDirection,
      chartPosition,
      canvasX,
      canvasY,
      canvasStatusMove,
      pointerPressed,
      canvasStyleComputed,
      chartStyleComputed
    };
  },
  watch: {
    scale(newVal) {
      this.$emit("canvas-scale", newVal);
    }
  },
  methods: {
    scaleByWheel(event) {
      if (this.lock)
        return;
      let ratio = 1 / (1 + event.deltaY * 1e-3);
      let scale = this.scale * ratio;
      if (scale > this.scaleMax) {
        ratio = this.scaleMax / this.scale;
        scale = this.scaleMax;
      }
      if (scale < this.scaleMin) {
        ratio = this.scaleMin / this.scale;
        scale = this.scaleMin;
      }
      this.scale = scale;
      const origin = {
        x: (ratio - 1) * this.width * 0.5,
        y: (ratio - 1) * this.height * 0.5
      };
      this.canvasX -= (ratio - 1) * (event.clientX - this.canvasX) - origin.x;
      this.canvasY -= (ratio - 1) * (event.clientY - this.canvasY) - origin.y;
    },
    scaleByKeyboard(event) {
      const { key } = event;
      if (["=", "-", "0"].includes(key) && this.lock)
        return event.preventDefault();
      if (key === "=") {
        event.preventDefault();
        let scale = this.scale + 0.1;
        if (scale > this.scaleMax)
          scale = this.scaleMax;
        this.scale = scale;
      }
      if (key === "-") {
        event.preventDefault();
        let scale = this.scale - 0.1;
        if (scale < this.scaleMin)
          scale = this.scaleMin;
        this.scale = scale;
      }
      if (key === "0") {
        event.preventDefault();
        this.scale = this.defaultScale;
        this.canvasX = this.defaultX;
        this.canvasY = this.defaultY;
      }
    },
    setChartPosition(event) {
      this.chartPosition = {
        x: event.clientX,
        y: event.clientY
      };
    },
    dragoverContainer(event) {
      const { clientX, clientY } = event;
      const offsetX = (clientX - this.chartPosition.x) / this.scale;
      const offsetY = (clientY - this.chartPosition.y) / this.scale;
      this.chartPosition = { x: clientX, y: clientY };
      if (this.movingChart) {
        const { width, height, x, y } = this.movingChart;
        const maxX = this.width - width;
        const maxY = this.height - height;
        let newX = x + offsetX;
        let newY = y + offsetY;
        if (newX < 0)
          newX = 0;
        if (newY < 0)
          newY = 0;
        if (newX > maxX)
          newX = maxX;
        if (newY > maxY)
          newY = maxY;
        this.movingChart.x = newX;
        this.movingChart.y = newY;
      }
      if (this.resizingChart) {
        const { width, height, x, y } = this.resizingChart;
        const chartMaxWidth = this.width - x;
        const chartMaxHeight = this.height - y;
        let newWidth = width;
        let newHeight = height;
        let newX = x;
        let newY = y;
        const resizeWidth = () => {
          newWidth += offsetX;
          if (newWidth < this.chartMinWidth)
            newWidth = width;
          if (newWidth > chartMaxWidth)
            newWidth = chartMaxWidth;
        };
        const resizeHeight = () => {
          newHeight += offsetY;
          if (newHeight < this.chartMinHeight)
            newHeight = height;
          if (newHeight > chartMaxHeight)
            newHeight = chartMaxHeight;
        };
        const resizeWidthWithX = () => {
          newX = x + offsetX;
          newWidth = width - offsetX;
          if (newX < 0) {
            newX = 0;
            newWidth = width + x;
          }
          if (newWidth < this.chartMinWidth) {
            newWidth = width;
            newX = x;
          }
        };
        const resizeHeightWithY = () => {
          newY = y + offsetY;
          newHeight = height - offsetY;
          if (newY < 0) {
            newY = 0;
            newHeight = height + y;
          }
          if (newHeight < this.chartMinHeight) {
            newHeight = height;
            newY = y;
          }
        };
        if (this.resizeDirection === "a") {
          resizeWidthWithX();
          resizeHeightWithY();
        }
        if (this.resizeDirection === "c") {
          resizeWidth();
          resizeHeightWithY();
        }
        if (this.resizeDirection === "e") {
          resizeWidth();
          resizeHeight();
        }
        if (this.resizeDirection === "g") {
          resizeWidthWithX();
          resizeHeight();
        }
        if (this.resizeDirection === "i")
          resizeHeightWithY();
        if (this.resizeDirection === "j")
          resizeWidth();
        if (this.resizeDirection === "k")
          resizeHeight();
        if (this.resizeDirection === "l")
          resizeWidthWithX();
        this.resizingChart.width = newWidth;
        this.resizingChart.x = newX;
        this.resizingChart.height = newHeight;
        this.resizingChart.y = newY;
      }
    },
    chartDragstart(event, chart) {
      if (!event.dataTransfer)
        return;
      const empty = document.createElement("div");
      event.dataTransfer.setDragImage(empty, 0, 0);
      event.dataTransfer.effectAllowed = "move";
      this.movingChart = chart;
    },
    chartDragend() {
      this.movingChart = null;
      this.resizingChart = null;
    },
    resizeStart(event, chart, direction) {
      if (!event.dataTransfer)
        return;
      const empty = document.createElement("div");
      event.dataTransfer.setDragImage(empty, 0, 0);
      event.dataTransfer.effectAllowed = "move";
      this.resizingChart = chart;
      this.resizeDirection = direction;
    },
    pointerDown(event) {
      if (!this.canvasStatusMove || this.lock)
        return;
      this.pointerPressed = true;
      const canvasEl = this.canvas;
      canvasEl.setPointerCapture(event.pointerId);
      this.point = { x: event.clientX, y: event.clientY };
      this.lastPointermove = { x: event.clientX, y: event.clientY };
    },
    pointermove(event) {
      if (!this.pointerPressed)
        return;
      event.preventDefault();
      const current = { x: event.clientX, y: event.clientY };
      this.diff.x = current.x - this.lastPointermove.x;
      this.diff.y = current.y - this.lastPointermove.y;
      this.lastPointermove = { x: current.x, y: current.y };
      this.canvasX += this.diff.x;
      this.canvasY += this.diff.y;
    },
    pointerUp() {
      this.pointerPressed = false;
    },
    pointerCancel() {
      this.pointerPressed = false;
    }
  }
});
const _hoisted_1 = ["data-id", "draggable", "onDragstart"];
const _hoisted_2 = { class: "content" };
const _hoisted_3 = { class: "resizable" };
const _hoisted_4 = ["onDragstart"];
const _hoisted_5 = ["onDragstart"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["draggable-panel", {
      "lock": _ctx.lock
    }]),
    tabindex: -1,
    ref: "container",
    autofocus: "",
    onKeydown: [
      _cache[6] || (_cache[6] = withKeys(($event) => _ctx.canvasStatusMove = true, ["space"])),
      _cache[7] || (_cache[7] = withModifiers((...args) => _ctx.scaleByKeyboard && _ctx.scaleByKeyboard(...args), ["meta"])),
      _cache[8] || (_cache[8] = withModifiers((...args) => _ctx.scaleByKeyboard && _ctx.scaleByKeyboard(...args), ["ctrl"]))
    ],
    onKeyup: _cache[9] || (_cache[9] = withKeys(($event) => _ctx.canvasStatusMove = false, ["space"])),
    onWheel: [
      _cache[10] || (_cache[10] = withModifiers((...args) => _ctx.scaleByWheel && _ctx.scaleByWheel(...args), ["ctrl", "prevent"])),
      _cache[11] || (_cache[11] = withModifiers((...args) => _ctx.scaleByWheel && _ctx.scaleByWheel(...args), ["meta", "prevent"]))
    ],
    onDragover: _cache[12] || (_cache[12] = withModifiers((...args) => _ctx.dragoverContainer && _ctx.dragoverContainer(...args), ["prevent"]))
  }, [
    createElementVNode("div", {
      class: "canvas",
      ref: "canvas",
      style: normalizeStyle(_ctx.canvasStyleComputed),
      onPointerdown: _cache[2] || (_cache[2] = (...args) => _ctx.pointerDown && _ctx.pointerDown(...args)),
      onPointermove: _cache[3] || (_cache[3] = (...args) => _ctx.pointermove && _ctx.pointermove(...args)),
      onPointerup: _cache[4] || (_cache[4] = (...args) => _ctx.pointerUp && _ctx.pointerUp(...args)),
      onPointercancel: _cache[5] || (_cache[5] = (...args) => _ctx.pointerCancel && _ctx.pointerCancel(...args))
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.data, (item, index2) => {
        var _a, _b;
        return openBlock(), createElementBlock("div", {
          class: normalizeClass(["chart-item", {
            "moving": ((_a = _ctx.movingChart) == null ? void 0 : _a.id) === item.id,
            "resizing": ((_b = _ctx.resizingChart) == null ? void 0 : _b.id) === item.id
          }]),
          key: item.id,
          style: normalizeStyle(_ctx.chartStyleComputed(item, index2)),
          "data-id": item.id,
          tabindex: "-1",
          draggable: !_ctx.lock,
          onMousedown: _cache[0] || (_cache[0] = (...args) => _ctx.setChartPosition && _ctx.setChartPosition(...args)),
          onDragstart: ($event) => _ctx.chartDragstart($event, item),
          onDragend: _cache[1] || (_cache[1] = (...args) => _ctx.chartDragend && _ctx.chartDragend(...args))
        }, [
          createElementVNode("div", _hoisted_2, [
            renderSlot(_ctx.$slots, "chart-" + item.id, {
              chart: item,
              index: index2
            }, () => [
              renderSlot(_ctx.$slots, "chart", {
                chart: item,
                index: index2
              }, void 0, true)
            ], true)
          ]),
          createElementVNode("div", _hoisted_3, [
            (openBlock(), createElementBlock(Fragment, null, renderList(["a", "c", "e", "g"], (direction) => {
              return createElementVNode("div", {
                key: direction,
                class: normalizeClass(["resizable-point", direction]),
                tabindex: "-1",
                draggable: "true",
                onDragstart: withModifiers(($event) => _ctx.resizeStart($event, item, direction), ["stop"])
              }, null, 42, _hoisted_4);
            }), 64)),
            (openBlock(), createElementBlock(Fragment, null, renderList(["b", "d", "f", "h"], (direction) => {
              return createElementVNode("div", {
                key: direction,
                class: normalizeClass([direction, "resizable-point"])
              }, null, 2);
            }), 64)),
            (openBlock(), createElementBlock(Fragment, null, renderList(["i", "j", "k", "l"], (direction) => {
              return createElementVNode("div", {
                key: direction,
                class: normalizeClass([direction, "resizable-line"]),
                tabindex: "-1",
                draggable: "true",
                onDragstart: withModifiers(($event) => _ctx.resizeStart($event, item, direction), ["stop"])
              }, null, 42, _hoisted_5);
            }), 64))
          ])
        ], 46, _hoisted_1);
      }), 128))
    ], 36)
  ], 34);
}
var index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-34a94c50"]]);
export { index as default };
//# sourceMappingURL=draggable-panel.es.js.map
