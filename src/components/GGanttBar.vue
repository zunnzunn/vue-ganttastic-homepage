<template>
  <div class="g-gantt-bar" 
      ref="g-gantt-bar"
      :style="barStyle"
      @mousedown.stop="onMousedown($event)"
  >
    <div class="g-gantt-bar-label">
      <slot name="bar-label" :bar="bar">
        {{barConfig.label || ""}}
      </slot>
    </div>
    <template v-if="barConfig.handles">
      <div class="g-gantt-bar-handle-left"/>
      <div class="g-gantt-bar-handle-right"/>
    </template>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: "GGanttBar",

  props:{
    bar: {type: Object},
    barStart: {type: String}, // property name of the bar objects that represents the start datetime
    barEnd: {type: String}, // property name of the bar objects that represents the end datetime,
    barContainer: [Object, DOMRect],
    allBarsInRow: {type: Array}
  },

  inject: ["getHourCount", "ganttChartProps"],

  data(){
    return {
      isDragging: false,
      cursorOffsetX: null,
      mousemoveCallback: null,  // gets initialized when starting to drag
                                // possible values: drag, dragByHandleLeft, dragByHandleRight
    }
  },

  computed:{
    // use these computed moment objects to work with the bar's start/end dates:
    // instead of directly mutating them:
    barStartMoment:{
      get(){
        return moment(this.bar[this.barStart])
      },
      set(value){
        this.bar[this.barStart] = moment(value).format("YYYY-MM-DD HH:mm:ss")
      }
    },

    barEndMoment: {
      get(){
        return moment(this.bar[this.barEnd])
      },
      set(value){
        this.bar[this.barEnd] = moment(value).format("YYYY-MM-DD HH:mm:ss")
      }
    },

    barConfig(){
      return this.bar.ganttBarConfig || {}
    },

    barStyle(){ 
      let xStart = this.mapTimeToPosition(this.barStartMoment)
      let xEnd = this.mapTimeToPosition(this.barEndMoment)
      return {
        ...(this.barConfig || {}),
        left: `${xStart}px`,
        width: `${xEnd - xStart}px`,
        height: `${this.ganttChartProps.rowHeight-6}px`,
        zIndex: this.isDragging ? 2 : 1
      }
    },

    chartStartMoment(){
      return moment(this.ganttChartProps.chartStart)
    },

    chartEndMoment(){
      return moment(this.ganttChartProps.chartEnd)
    }
  },

  methods:{

    onMousedown(e){
      e.preventDefault()
      if(e.button === 2){   // ignore right-click contextmenu
        return
      }
      this.initDrag(e)
    },

    /* --------------------------------------------------------- */
    /* ------------- METHODS FOR DRAGGING THE BAR -------------- */
    /* --------------------------------------------------------- */
    initDrag(mousedownEvent){
      this.isDragging = true
      let barX = this.$refs["g-gantt-bar"].getBoundingClientRect().left
      this.cursorOffsetX = mousedownEvent.clientX - barX
      let mousedownType = mousedownEvent.target.className
      switch(mousedownType){
        case "g-gantt-bar-handle-left":
          document.body.style.cursor = "w-resize"
          this.mousemoveCallback = this.dragByHandleLeft
          break
        case "g-gantt-bar-handle-right":
          document.body.style.cursor = "w-resize"
          this.mousemoveCallback = this.dragByHandleRight
          break
        default: this.mousemoveCallback = this.drag
      }
      window.addEventListener("mousemove", this.mousemoveCallback)
      window.addEventListener("mouseup", this.endDrag)
    },

    drag(e){
      let barWidth = this.$refs["g-gantt-bar"].getBoundingClientRect().width
      let newXStart = (e.clientX-this.barContainer.left) - this.cursorOffsetX
      let newXEnd = newXStart + barWidth
      this.barStartMoment = this.mapPositionToTime(newXStart)
      this.barEndMoment = this.mapPositionToTime(newXEnd)
      this.manageOverlapping()
    },

    dragByHandleLeft(e){
      let newXStart = e.clientX - this.barContainer.left
      let newStartMoment = this.mapPositionToTime(newXStart)
      if(newStartMoment.isSameOrAfter(this.barEndMoment)){
        return
      }
      this.barStartMoment = newStartMoment
      this.manageOverlapping()
    },

    dragByHandleRight(e){
      let newXEnd = e.clientX - this.barContainer.left
      let newEndMoment = this.mapPositionToTime(newXEnd)
      if(newEndMoment.isSameOrBefore(this.barStartMoment)){
        return
      }
      this.barEndMoment = newEndMoment
      this.manageOverlapping()
    },

    endDrag(){
      this.isDragging = false
      document.body.style.cursor = "auto"
      window.removeEventListener("mousemove", this.mousemoveCallback)
      window.removeEventListener("mouseup", this.endDrag)
    },

    manageOverlapping(){
      if(!this.ganttChartProps.pushOnOverlap){
        return
      }
      let currentBar = this.bar
      let {overlapBar, overlapType} = this.getOverlapBarAndType(currentBar)
      while(overlapBar){
        let minuteDiff
        let currentStartMoment = moment(currentBar[this.barStart])
        let currentEndMoment = moment(currentBar[this.barEnd])
        let overlapStartMoment = moment(overlapBar[this.barStart])
        let overlapEndMoment  = moment(overlapBar[this.barEnd])
        switch(overlapType){
          case -1:  // overlapping on the left
            minuteDiff = overlapEndMoment.diff(currentStartMoment, "minutes", true)
            overlapBar[this.barEnd] = currentBar[this.barStart]
            overlapBar[this.barStart] = overlapStartMoment.subtract(minuteDiff, "minutes", true)
            break
          case 1: // overlapping on the right
            minuteDiff = currentEndMoment.diff(overlapStartMoment, "minutes", true)
            overlapBar[this.barStart] = currentBar[this.barEnd]
            overlapBar[this.barEnd] = overlapEndMoment.add(minuteDiff, "minutes", true)
            break
          default:
            console.warn("One bar is inside of the other one! This should never occur while push-on-overlap is active!")
            return
        }
        currentBar = overlapBar;
        ({overlapBar, overlapType} = this.getOverlapBarAndType(overlapBar))
      }
    },

    getOverlapBarAndType(bar){
      let barStartMoment = moment(bar[this.barStart])
      let barEndMoment = moment(bar[this.barEnd])
      let overlapLeft, overlapRight, overlapInBetween
      let overlapBar = this.allBarsInRow.find(otherBar => {
        if(otherBar === bar){
          return false
        }
        let otherBarStart = moment(otherBar[this.barStart])
        let otherBarEnd = moment(otherBar[this.barEnd])
        overlapLeft = barStartMoment.isBetween(otherBarStart, otherBarEnd) 
        overlapRight = barEndMoment.isBetween(otherBarStart, otherBarEnd)
        overlapInBetween = otherBarStart.isBetween(barStartMoment, barEndMoment)
                          || otherBarEnd.isBetween(barStartMoment, barEndMoment)
        return overlapLeft || overlapRight || overlapInBetween
      })
      let overlapType = overlapLeft ? -1 : (overlapRight ? 1 : (overlapInBetween ? 0 : null))
      return {overlapBar, overlapType}
    },

    /* --------------------------------------------------------- */
    /* ------- MAPPING POSITION TO TIME (AND VICE VERSA) ------- */
    /* --------------------------------------------------------- */
    mapTimeToPosition(time){
      let hourDiffFromStart = moment(time).diff(this.chartStartMoment, "hour", true)
      return (hourDiffFromStart / this.getHourCount()) * this.barContainer.width
    },

    mapPositionToTime(xPos){
      let hourDiffFromStart = (xPos/this.barContainer.width)*this.getHourCount()
      return this.chartStartMoment.clone().add(hourDiffFromStart, "hours")
    },
  }

}
</script>

<style scoped>
  .g-gantt-bar {
    position: absolute;
    top: 2px;
    left: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    width: 300px;
    height: 34px;
    border-radius: 15px;
    background: #79869c;
    overflow: hidden;
  }

  .g-gantt-bar-label {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 14px 0 14px;   /* 14px is the width of the handle */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .g-gantt-bar-label > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .g-gantt-bar > .g-gantt-bar-handle-left, .g-gantt-bar > .g-gantt-bar-handle-right {
    position: absolute;
    width: 10px;
    height: 100%;
    background: white;
    opacity: 0.7;
    border-radius: 40px;
    cursor: w-resize;
  }

  .g-gantt-bar-handle-left {
    left: 0;
  }

  .g-gantt-bar-handle-right {
    right: 0;
  }

  .g-gantt-bar-label img {
    pointer-events: none;
  }
</style>