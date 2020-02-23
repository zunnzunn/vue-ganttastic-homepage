<template>
  <div id="g-gantt-chart"
      :style="{width: width, background: themeColors.background}"
  >
    <g-gantt-timeaxis v-if="!hideTimeaxis"
                      :chart-start="chartStart"
                      :chart-end="chartEnd"
                      :row-title-width="rowTitleWidth"
                      :timemarker-offset="timemarkerOffset"
                      :theme-colors="themeColors"
                      :locale="locale"
    />

    <g-gantt-grid v-if="grid"
                :chart-start="chartStart"
                :chart-end="chartEnd"
                :row-title-width="rowTitleWidth"
                :highlighted-hours="highlightedHours"
    />
    
    <div id="g-gantt-rows-container">
      <slot/>   <!-- the g-gantt-row components go here -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import GGanttTimeaxis from './GGanttTimeaxis'
import GGanttGrid from './GGanttGrid'

export default {

  name: "GGanttChart",

  components:{
    GGanttTimeaxis,
    GGanttGrid
  },

  props:{
    chartStart: {type: String, default: moment().startOf("day").format("YYYY-MM-DD HH:mm:ss")},
    chartEnd: {type: String, default: moment().startOf("day").add(12,"hours").format("YYYY-MM-DD HH:mm:ss")},
    hideTimeaxis: Boolean,
    rowTitleWidth: {type: String, default: "10%"}, // the width of the row title in %
    rowHeight: {type: Number, default: 40},
    locale: {type: String, default: "en"},
    theme: String,
    grid: Boolean,
    highlightedHours: {type: Array, default: () => []},
    width: {type: String, default: "100%"},   // the total width of the entire ganttastic component in %
    pushOnOverlap: {type: Boolean}
  },

  data(){
    return{
      timemarkerOffset: 0,
    }
  },

  computed:{

    hourCount(){
      let momentChartStart = moment(this.chartStart)
      let momentChartEnd = moment(this.chartEnd)
      return Math.floor(momentChartEnd.diff(momentChartStart, "hour", true))
    },

    themeColors(){
      switch(this.theme){
        case "vue": return {primary:"#258a5d", secondary: "#41B883", ternary:"#35495E", hoverHighlight: "rgba(160, 219, 171, 0.5)", text: "white", background: "white"}
        case "dark": return {primary:"#404040", secondary: "#303030", ternary:"#353535", hoverHighlight: "rgba(159, 160, 161, 0.5)", text: "white", background: "#525252", toast: "#1f1f1f"}
        case "material-blue": return {primary:"#0D47A1", secondary: "#1565C0", ternary:"#42a5f5", hoverHighlight: "rgba(110, 165, 196, 0.5)", text: "white", background: "white"}
        case "creamy": return {primary:"#ffe8d9", secondary: "#fcdcc5", ternary:"#fff6f0", hoverHighlight: "rgba(230, 221, 202, 0.5)", text: "#542d05", background: "white"}
        case "slumber": return {primary:"#2c2e36", secondary: "#2f3447", ternary:"#35394d", hoverHighlight: "rgba(179, 162, 127, 0.5)", text: "#ffe0b3", background: "#38383b", toast:"#1f1f1f"}
        case "sky": return {primary:"#b5e3ff", secondary: "#a1d6f7", ternary:"#d6f7ff", hoverHighlight: "rgba(193, 202, 214, 0.5)", text: "#022c47", background: "white"}
        case "crimson": return {primary:"#a82039", secondary: "#c41238", ternary:"#db4f56", hoverHighlight: "rgba(196, 141, 141, 0.5)", text: "white", background: "white"}
        case "grove": return {primary:"#3d9960", secondary: "#288542", ternary:"#72b585", hoverHighlight: "rgba(160, 219, 171, 0.5)", text: "white", background: "white"}
        case "fuchsia": return {primary:"#de1d5a", secondary: "#b50b41", ternary:"#ff7da6", hoverHighlight: "rgba(196, 141, 141, 0.5)", text: "white", background: "white"}
        case "flare": return {primary:"#e08a38", secondary: "#e67912", ternary:"#5e5145", hoverHighlight: "rgba(196, 141, 141, 0.5)", text: "white", background: "white"}
        default: return {primary: "#eeeeee", secondary: "#E0E0E0", ternary: "#F5F5F5", hoverHighlight: "rgba(204, 216, 219, 0.5)", text: "#262626", background: "white"}
      }
    }

  },
  
  // all child components of GGanttChart may have access to
  // the following values by using Vue's "inject" option:
  provide(){
    return {
      getChartStart: () => this.chartStart,
      getChartEnd: () => this.chartEnd,
      getHourCount: () => this.hourCount,
      ganttChartProps: this.$props
      
    }
  }
}
</script>

<style scoped>
  #g-gantt-chart{
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #g-gantt-rows-container{
    position: relative;
  }
</style>