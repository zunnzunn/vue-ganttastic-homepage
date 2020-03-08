<template>
  <div id="g-gantt-chart"
      :style="{width: width, background: themeColors.background}"
  >
    <g-gantt-timeaxis v-if="!hideTimeaxis"
                      :chart-start="chartStart"
                      :chart-end="chartEnd"
                      :row-label-width="rowLabelWidth"
                      :timemarker-offset="timemarkerOffset"
                      :theme-colors="themeColors"
                      :locale="locale"
    />

    <g-gantt-grid v-if="grid"
                  :chart-start="chartStart"
                  :chart-end="chartEnd"
                  :row-label-width="rowLabelWidth"
                  :highlighted-hours="highlightedHours"
    />
    
    <div id="g-gantt-rows-container">
      <slot/>   <!-- the g-gantt-row components go here -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import GanttasticThemeColors from './GanttasticThemeColors.js'
import GGanttTimeaxis from './GGanttTimeaxis'
import GGanttGrid from './GGanttGrid'
import GGanttRow from './GGanttRow'
import GGanttBar from './GGanttBar'

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
    rowLabelWidth: {type: String, default: "10%"},
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
      return GanttasticThemeColors[this.theme] || GanttasticThemeColors.default
    }

  },

  methods: {
    initDragOfBarsFromBundle(bundleId, e){
      if(bundleId === null || bundleId === undefined){
        return
      }
      let gGanttRowList = this.$children.filter(childComp => childComp.$options.name === GGanttRow.name)
      gGanttRowList.forEach(row => {
        row.$children.forEach(childComp => {
          if(childComp.$options.name === GGanttBar.name && childComp.barConfig.bundle === bundleId){
            childComp.initDrag(e)
          }
        })
      })
    }

  },
  
  // all child components of GGanttChart may have access to
  // the following values by using Vue's "inject" option:
  provide(){
    return {
      getChartStart: () => this.chartStart,
      getChartEnd: () => this.chartEnd,
      getHourCount: () => this.hourCount,
      ganttChartProps: this.$props,
      getThemeColors: () => this.themeColors,
      initDragOfBarsFromBundle: (bundleId, e) => this.initDragOfBarsFromBundle(bundleId, e)
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

  #g-gantt-chart >>> * {
    font-family: Roboto, Verdana;
  }

  #g-gantt-rows-container{
    position: relative;
  }
</style>