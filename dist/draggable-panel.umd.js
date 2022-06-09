(function(t,l){typeof exports=="object"&&typeof module!="undefined"?module.exports=l(require("vue")):typeof define=="function"&&define.amd?define(["vue"],l):(t=typeof globalThis!="undefined"?globalThis:t||self,t["draggable-panel"]=l(t.Vue))})(this,function(t){"use strict";var V=Object.defineProperty,A=Object.defineProperties;var L=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var U=Object.prototype.hasOwnProperty,O=Object.prototype.propertyIsEnumerable;var X=(t,l,f)=>l in t?V(t,l,{enumerable:!0,configurable:!0,writable:!0,value:f}):t[l]=f,Y=(t,l)=>{for(var f in l||(l={}))U.call(l,f)&&X(t,f,l[f]);if(P)for(var f of P(l))O.call(l,f)&&X(t,f,l[f]);return t},B=(t,l)=>A(t,L(l));var l=(()=>`.draggable-panel[data-v-4ced9f6c]{position:relative;width:100%;height:100%;overflow:hidden;background:#EEEEEE;outline:none;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.draggable-panel *[data-v-4ced9f6c]{outline:none}.draggable-panel.lock .chart-item[data-v-4ced9f6c]:hover{filter:none}.draggable-panel.lock .chart-item .resizable[data-v-4ced9f6c]{display:none}.draggable-panel .canvas[data-v-4ced9f6c]{position:relative;background:#FFFFFF;box-shadow:0 5px 130px #00000026}.draggable-panel .canvas.moving[data-v-4ced9f6c]{cursor:move}.draggable-panel .canvas[data-v-4ced9f6c]:after{content:"";position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(25,118,210,.3);visibility:hidden;opacity:0;transition:all .3s;z-index:10000}.draggable-panel .canvas.out-canvas-dragover[data-v-4ced9f6c]:after{visibility:visible;opacity:1}.draggable-panel .chart-item[data-v-4ced9f6c]{position:absolute;background:rgba(25,118,210,.3);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}.draggable-panel .chart-item .content[data-v-4ced9f6c]{position:relative;width:100%;height:100%;overflow:hidden;z-index:10}.draggable-panel .chart-item[data-v-4ced9f6c]:hover{filter:brightness(1.05)}.draggable-panel .chart-item:hover .resizable[data-v-4ced9f6c]{display:block}.draggable-panel .chart-item.moving .resizable[data-v-4ced9f6c]{display:none}.draggable-panel .chart-item.resizing .resizable[data-v-4ced9f6c]{display:block}.draggable-panel .chart-item .resizable[data-v-4ced9f6c]{display:none}.draggable-panel .chart-item .resizable .resizable-point[data-v-4ced9f6c]{position:absolute;width:16px;height:16px;display:flex;flex-direction:row;justify-content:center;align-items:center;z-index:20}.draggable-panel .chart-item .resizable .resizable-point[data-v-4ced9f6c]:after{content:"";display:block;width:8px;height:8px;border:2px solid #1976D2;background:#FFFFFF}.draggable-panel .chart-item .resizable .resizable-line[data-v-4ced9f6c]{position:absolute;box-sizing:border-box;z-index:10}.draggable-panel .chart-item .resizable .resizable-line[data-v-4ced9f6c]:after{content:"";display:block;width:100%;height:100%;background:#1976D2}.draggable-panel .chart-item .resizable .a[data-v-4ced9f6c]{top:0;left:0;transform:translate(-50%,-50%);cursor:nwse-resize}.draggable-panel .chart-item .resizable .b[data-v-4ced9f6c]{top:0;right:0;transform:translate(50%,-50%);cursor:nesw-resize}.draggable-panel .chart-item .resizable .c[data-v-4ced9f6c]{bottom:0;right:0;transform:translate(50%,50%);cursor:nwse-resize}.draggable-panel .chart-item .resizable .d[data-v-4ced9f6c]{bottom:0;left:0;transform:translate(-50%,50%);cursor:nesw-resize}.draggable-panel .chart-item .resizable .e[data-v-4ced9f6c],.draggable-panel .chart-item .resizable .f[data-v-4ced9f6c],.draggable-panel .chart-item .resizable .g[data-v-4ced9f6c],.draggable-panel .chart-item .resizable .h[data-v-4ced9f6c]{pointer-events:none}.draggable-panel .chart-item .resizable .e[data-v-4ced9f6c]{top:0;left:50%;margin-left:-8px;transform:translateY(-50%)}.draggable-panel .chart-item .resizable .f[data-v-4ced9f6c]{top:50%;right:0;margin-top:-8px;transform:translate(50%)}.draggable-panel .chart-item .resizable .g[data-v-4ced9f6c]{bottom:0;left:50%;margin-left:-8px;transform:translateY(50%)}.draggable-panel .chart-item .resizable .h[data-v-4ced9f6c]{left:0;top:50%;margin-top:-8px;transform:translate(-50%)}.draggable-panel .chart-item .resizable .i[data-v-4ced9f6c]{top:0;left:0;width:100%!important;height:8px;padding-top:3px;padding-bottom:3px;padding-left:0!important;padding-right:0!important;transform:translateY(-50%);cursor:ns-resize}.draggable-panel .chart-item .resizable .j[data-v-4ced9f6c]{right:0;top:0;height:100%!important;width:8px;padding-top:0!important;padding-bottom:0!important;padding-left:3px;padding-right:3px;transform:translate(50%);cursor:ew-resize}.draggable-panel .chart-item .resizable .k[data-v-4ced9f6c]{bottom:0;left:0;width:100%!important;height:8px;padding-top:3px;padding-bottom:3px;padding-left:0!important;padding-right:0!important;transform:translateY(50%);cursor:ns-resize}.draggable-panel .chart-item .resizable .l[data-v-4ced9f6c]{left:0;top:0;height:100%!important;width:8px;padding-top:0!important;padding-bottom:0!important;padding-left:3px;padding-right:3px;transform:translate(-50%);cursor:ew-resize}
`)(),f=(e,a)=>{const r=e.__vccOpts||e;for(const[d,m]of a)r[d]=m;return r};const W=t.defineComponent({name:"draggable-panel",props:{width:{required:!0,type:Number},height:{required:!0,type:Number},data:{required:!0,type:Array},chartMinWidth:{required:!1,type:Number,default:100},chartMinHeight:{required:!1,type:Number,default:100},padding:{required:!1,type:Number,default:32},lock:{required:!1,type:Boolean,default:!1},canvasStyle:{required:!1,type:Object,default:{}},chartStyle:{required:!1,type:Object,default:{}},scaleMin:{required:!1,type:Number,default:.5},scaleMax:{required:!1,type:Number,default:10}},setup(e){const a=t.ref(null),r=t.ref(null),d=t.ref(!1),m=t.ref(!1),p=t.ref(!1),i=t.ref(1),c=t.ref(1),h=t.ref(0),g=t.ref(0),n=t.ref(0),s=t.ref(0),o=t.ref(""),b=t.ref(null),u=t.ref(null),v=t.ref({x:0,y:0}),y=t.ref({x:0,y:0}),z=t.ref({x:0,y:0}),w=t.ref({x:0,y:0}),j=t.computed(()=>B(Y({},e.canvasStyle),{width:e.width+"px",height:e.height+"px",transform:[`translate3d(${n.value}px, ${s.value}px, 0)`,`scale(${c.value})`].join(" ")})),I=t.computed(()=>(C,k)=>{const{width:x,height:M,x:S,y:E}=C;return B(Y({},e.chartStyle),{width:x+"px",height:M+"px",transform:`translateX(${S}px) translateY(${E}px)`,"z-index":100+k})});function D(){const{offsetWidth:C,offsetHeight:k}=a.value,x=C-e.padding,M=k-e.padding,S=C/k,E=e.width/e.height;i.value=S<E?x/e.width:M/e.height,h.value=(C-e.width)/2,g.value=(k-e.height)/2,c.value=i.value,n.value=h.value,s.value=g.value}return t.onMounted(()=>{D(),window.addEventListener("resize",D)}),t.onBeforeUnmount(()=>{window.removeEventListener("resize",D)}),{container:a,canvas:r,defaultX:h,defaultY:g,defaultScale:i,scale:c,point:y,lastPointermove:z,diff:v,movingChart:b,resizingChart:u,resizeDirection:o,chartPosition:w,canvasX:n,canvasY:s,canvasStatusMove:d,pointerPressed:m,outCanvasDragover:p,canvasStyleComputed:j,chartStyleComputed:I}},watch:{scale(e){this.$emit("canvas-scale",e)}},methods:{scaleByWheel(e){if(this.lock)return;let a=1/(1+e.deltaY*.001),r=this.scale*a;r>this.scaleMax&&(a=this.scaleMax/this.scale,r=this.scaleMax),r<this.scaleMin&&(a=this.scaleMin/this.scale,r=this.scaleMin),this.scale=r;const d={x:(a-1)*this.width*.5,y:(a-1)*this.height*.5};this.canvasX-=(a-1)*(e.clientX-this.canvasX)-d.x,this.canvasY-=(a-1)*(e.clientY-this.canvasY)-d.y},scaleByKeyboard(e){const{key:a}=e;if(["=","-"].includes(a)&&this.lock)return e.preventDefault();if(a==="="){e.preventDefault();let r=this.scale+.1;r>this.scaleMax&&(r=this.scaleMax),this.scale=r}if(a==="-"){e.preventDefault();let r=this.scale-.1;r<this.scaleMin&&(r=this.scaleMin),this.scale=r}},resetScale(){this.lock||(this.scale=this.defaultScale,this.canvasX=this.defaultX,this.canvasY=this.defaultY)},realScale(){if(this.lock)return;const{offsetWidth:e,offsetHeight:a}=this.container;this.scale=1,this.canvasX=(e-this.width)/2,this.canvasY=(a-this.height)/2},setChartPosition(e){this.chartPosition={x:e.clientX,y:e.clientY}},dragoverContainer(e){const{clientX:a,clientY:r}=e,d=(a-this.chartPosition.x)/this.scale,m=(r-this.chartPosition.y)/this.scale;if(this.chartPosition={x:a,y:r},this.movingChart){const{width:p,height:i,x:c,y:h}=this.movingChart,g=this.width-p,n=this.height-i;let s=c+d,o=h+m;s<0&&(s=0),o<0&&(o=0),s>g&&(s=g),o>n&&(o=n),this.movingChart.x=s,this.movingChart.y=o}if(this.resizingChart){const{width:p,height:i,x:c,y:h}=this.resizingChart,g=this.width-c,n=this.height-h;let s=p,o=i,b=c,u=h;const v=()=>{s+=d,s<this.chartMinWidth&&(s=p),s>g&&(s=g)},y=()=>{o+=m,o<this.chartMinHeight&&(o=i),o>n&&(o=n)},z=()=>{b=c+d,s=p-d,b<0&&(b=0,s=p+c),s<this.chartMinWidth&&(s=p,b=c)},w=()=>{u=h+m,o=i-m,u<0&&(u=0,o=i+h),o<this.chartMinHeight&&(o=i,u=h)};this.resizeDirection==="a"&&(z(),w()),this.resizeDirection==="b"&&(v(),w()),this.resizeDirection==="c"&&(v(),y()),this.resizeDirection==="d"&&(z(),y()),this.resizeDirection==="i"&&w(),this.resizeDirection==="j"&&v(),this.resizeDirection==="k"&&y(),this.resizeDirection==="l"&&z(),this.resizingChart.width=s,this.resizingChart.x=b,this.resizingChart.height=o,this.resizingChart.y=u}},chartDragstart(e,a){if(!e.dataTransfer)return;const r=document.createElement("canvas");r.setAttribute("data-action","empty"),e.dataTransfer.setDragImage(r,0,0),e.dataTransfer.effectAllowed="move",e.dataTransfer.dropEffect="move",document.body.appendChild(r),this.movingChart=a},chartDragend(){this.container.focus(),this.movingChart=null,this.resizingChart=null,document.querySelectorAll('canvas[data-action="empty"]').forEach(e=>e.remove())},resizeStart(e,a,r){if(!e.dataTransfer)return;const d=document.createElement("canvas");d.setAttribute("data-action","empty"),e.dataTransfer.setDragImage(d,0,0),e.dataTransfer.dropEffect="move",e.dataTransfer.effectAllowed="move",document.body.appendChild(d),this.resizingChart=a,this.resizeDirection=r},pointerDown(e){if(!this.canvasStatusMove||this.lock)return;this.pointerPressed=!0,this.canvas.setPointerCapture(e.pointerId),this.point={x:e.clientX,y:e.clientY},this.lastPointermove={x:e.clientX,y:e.clientY}},pointermove(e){if(!this.pointerPressed)return;e.preventDefault();const a={x:e.clientX,y:e.clientY};this.diff.x=a.x-this.lastPointermove.x,this.diff.y=a.y-this.lastPointermove.y,this.lastPointermove={x:a.x,y:a.y},this.canvasX+=this.diff.x,this.canvasY+=this.diff.y},pointerUp(){this.pointerPressed=!1},pointerCancel(){this.pointerPressed=!1},dragenterCanvas(){this.movingChart||this.resizingChart||(this.outCanvasDragover=!0)},dragleaveCanvas(){this.outCanvasDragover=!1},dropInCanvas(e){this.movingChart||this.resizingChart||(this.outCanvasDragover=!1,this.$emit("canvas-drop",e.offsetX,e.offsetY))}}}),F=["data-id","draggable","onDragstart"],$={class:"content"},q={class:"resizable"},N=["onDragstart"],K=["onDragstart"];function H(e,a,r,d,m,p){return t.openBlock(),t.createElementBlock("div",{class:t.normalizeClass(["draggable-panel",{lock:e.lock}]),tabindex:-1,ref:"container",autofocus:"",onKeydown:[a[9]||(a[9]=t.withKeys(i=>e.canvasStatusMove=!0,["space"])),a[10]||(a[10]=t.withModifiers((...i)=>e.scaleByKeyboard&&e.scaleByKeyboard(...i),["meta"])),a[11]||(a[11]=t.withModifiers((...i)=>e.scaleByKeyboard&&e.scaleByKeyboard(...i),["ctrl"])),a[13]||(a[13]=t.withKeys(t.withModifiers((...i)=>e.resetScale&&e.resetScale(...i),["prevent"]),["0"])),a[14]||(a[14]=t.withKeys(t.withModifiers((...i)=>e.realScale&&e.realScale(...i),["prevent"]),["enter"]))],onKeyup:a[12]||(a[12]=t.withKeys(i=>e.canvasStatusMove=!1,["space"])),onWheel:[a[15]||(a[15]=t.withModifiers((...i)=>e.scaleByWheel&&e.scaleByWheel(...i),["prevent","ctrl"])),a[16]||(a[16]=t.withModifiers((...i)=>e.scaleByWheel&&e.scaleByWheel(...i),["prevent","meta"]))],onDragover:a[17]||(a[17]=t.withModifiers((...i)=>e.dragoverContainer&&e.dragoverContainer(...i),["prevent"]))},[t.createElementVNode("div",{class:t.normalizeClass(["canvas",{"out-canvas-dragover":e.outCanvasDragover,moving:e.canvasStatusMove}]),ref:"canvas",style:t.normalizeStyle(e.canvasStyleComputed),onPointerdown:a[2]||(a[2]=(...i)=>e.pointerDown&&e.pointerDown(...i)),onPointermove:a[3]||(a[3]=(...i)=>e.pointermove&&e.pointermove(...i)),onPointerup:a[4]||(a[4]=(...i)=>e.pointerUp&&e.pointerUp(...i)),onPointercancel:a[5]||(a[5]=(...i)=>e.pointerCancel&&e.pointerCancel(...i)),onDragenter:a[6]||(a[6]=(...i)=>e.dragenterCanvas&&e.dragenterCanvas(...i)),onDragleave:a[7]||(a[7]=(...i)=>e.dragleaveCanvas&&e.dragleaveCanvas(...i)),onDrop:a[8]||(a[8]=(...i)=>e.dropInCanvas&&e.dropInCanvas(...i))},[(t.openBlock(!0),t.createElementBlock(t.Fragment,null,t.renderList(e.data,(i,c)=>{var h,g;return t.openBlock(),t.createElementBlock("div",{class:t.normalizeClass(["chart-item",{moving:((h=e.movingChart)==null?void 0:h.id)===i.id,resizing:((g=e.resizingChart)==null?void 0:g.id)===i.id}]),key:i.id,style:t.normalizeStyle(e.chartStyleComputed(i,c)),"data-id":i.id,tabindex:"-1",draggable:!e.lock,onMousedown:a[0]||(a[0]=(...n)=>e.setChartPosition&&e.setChartPosition(...n)),onDragstart:n=>e.chartDragstart(n,i),onDragend:a[1]||(a[1]=(...n)=>e.chartDragend&&e.chartDragend(...n))},[t.createElementVNode("div",$,[t.renderSlot(e.$slots,"chart-"+i.id,{chart:i,index:c},()=>[t.renderSlot(e.$slots,"chart",{chart:i,index:c},void 0,!0)],!0)]),t.createElementVNode("div",q,[(t.openBlock(),t.createElementBlock(t.Fragment,null,t.renderList(["a","b","c","d"],n=>t.createElementVNode("div",{key:n,class:t.normalizeClass(["resizable-point",n]),tabindex:"-1",draggable:"true",onDragstart:t.withModifiers(s=>e.resizeStart(s,i,n),["stop"])},null,42,N)),64)),(t.openBlock(),t.createElementBlock(t.Fragment,null,t.renderList(["e","f","g","h"],n=>t.createElementVNode("div",{key:n,class:t.normalizeClass([n,"resizable-point"])},null,2)),64)),(t.openBlock(),t.createElementBlock(t.Fragment,null,t.renderList(["i","j","k","l"],n=>t.createElementVNode("div",{key:n,class:t.normalizeClass([n,"resizable-line"]),tabindex:"-1",draggable:"true",onDragstart:t.withModifiers(s=>e.resizeStart(s,i,n),["stop"])},null,42,K)),64))])],46,F)}),128))],38)],34)}var T=f(W,[["render",H],["__scopeId","data-v-4ced9f6c"],["__file","/Users/xingrong/Develop/workspace/draggable-panel/src/components/draggablePanel/index.vue"]]);return T});
//# sourceMappingURL=draggable-panel.umd.js.map
