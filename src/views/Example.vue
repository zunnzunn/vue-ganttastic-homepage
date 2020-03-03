<template>
  <div>
    <div id="ganttastic-wrapper">
      <g-gantt-chart :chart-start="chartStart"
                      :chart-end="chartEnd"
                      :grid="grid"
                      :hide-timeaxis="hideTimeaxis"
                      :push-on-overlap="pushOnOverlap"
                      :highlighted-hours="highlightedHours"
                      :row-title-width="`${rowTitleWidth}%`"
                      :row-height="rowHeight"
                      :theme="selectedTheme"
      >
        <g-gantt-row v-for="row in rowList"
                    :key="row.title"
                    :label="row.label"
                    :bars="row.barList"
                    :highlight-on-hover="highlightOnHover"
                    bar-start="myStart"
                    bar-end="myEnd"
        >
          <template #bar-label>
            Test
          </template>
        </g-gantt-row>
      </g-gantt-chart>
    </div>

    <v-card width="100%" height="35vh">
      <v-row class="pa-6">
        <v-col cols="3">
          <v-checkbox v-model="hideTimeaxis"
                      label="Hide timeaxis"
                      hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-checkbox v-model="pushOnOverlap"
                      label="Push on overlap"
                      hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-checkbox v-model="grid"
                      label="Grid"
                      hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-checkbox v-model="highlightOnHover"
                      label="Highlight on hover"
                      hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-select v-model="selectedTheme"
                    label="Theme"
                    :items="themes"
                    outlined
                    dense
                    hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-slider v-model="rowHeight"
                    label="Row height"
                    :min="20"
                    :max="100"
                    hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-slider v-model="rowTitleWidth"
                    label="Row title width"
                    :min="10"
                    :max="50"
                    hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-select v-model="highlightedHours"
                    label="Highlighted hours"
                    :items="hours"
                    multiple
                    outlined
                    dense
                    hide-details
          />
        </v-col>
      </v-row>
      

    </v-card>

    <v-menu v-model="showContextmenu"
            :position-x="contextmenuX"
            :position-y="contextmenuY"
    >
      <v-list>
        <v-list-item>
          It's a context menu!
        </v-list-item>
      </v-list>
    </v-menu>

  </div>
</template>

<script>
import GGanttChart from '@/components/GGanttChart.vue'
import GGanttRow from '@/components/GGanttRow.vue'

export default {
  components: {
    GGanttChart,
    GGanttRow
  },

  data(){
    return {
      chartStart: "2019-03-03 00:00",
      chartEnd: "2019-03-04 00:00",
      pushOnOverlap: true,
      grid: true,
      rowHeight: 40,
      rowTitleWidth: 15,
      hideTimeaxis: false,
      highlightOnHover: false,
      hours: [...Array(24).keys()],
      highlightedHours: [10,12],
      showContextmenu: false,
      contextmenuTimeout: null,
      contextmenuX: 0,
      contextmenuY: 0,
      selectedTheme: "default",
      themes: [
        "default",
        "vue",
        "dark",
        "material-blue",
        "creamy",
        "slumber",
        "sky",
        "crimson",
        "grove",
        "fuchsia",
        "flare"
      ],
      rowList: [
        {
          label: "Row #1",
          barList: [
            {
              myStart: "2019-03-03 06:00",
              myEnd: "2019-03-03 12:00",
              image: "logo_no_text.png",
              ganttBarConfig: {color:"white", backgroundColor: "#de3b26", bundle:"myBundle"}
            },
            {
              myStart: "2019-03-03 13:00",
              myEnd: "2019-03-03 18:00",
              ganttBarConfig: {color:"white", backgroundColor: "#2e74a3",opacity: 0.5, immobile: true}
            }
          ]
          
        },
        {
          label: "Row #2",
          barList: [
            {
              myStart: "2019-03-03 06:00",
              myEnd: "2019-03-03 12:00",
              ganttBarConfig: {color:"white", backgroundColor: "#de3b26", bundle: "myBundle"}
            },
            {
              myStart: "2019-03-03 01:30",
              myEnd: "2019-03-03 05:00",
              ganttBarConfig: {color:"white", backgroundColor: "#a23def", handles: true}
            },
            {
              myStart: "2019-03-02 23:00",
              myEnd: "2019-03-03 01:00",
              ganttBarConfig: {color:"white", backgroundColor: "#5effad"}
            },
            {
              myStart: "2019-03-03 14:00",
              myEnd: "2019-03-03 20:00",
              ganttBarConfig: {color:"white", background: "repeating-linear-gradient(45deg,#de7359,#de7359 10px,#ffc803 10px,#ffc803 20px)"}
            }, 
          ]
        },

        {
          label: "Row #3",
          barList: [
            {
              myStart: "2019-03-03 14:30",
              myEnd: "2019-03-03 20:00",
              ganttBarConfig:{color:"white", backgroundColor: "#d18aaf", handles: true}
            },
            {
              myStart: "2019-03-03 00:30",
              myEnd: "2019-03-03 05:00",
              ganttBarConfig: {color:"white", backgroundColor: "#f2840f", borderRadius: 0}
            }, 
          ]
        }
      ],
    }
  },


  methods: {

    stoppedDraggingBar(e){
      console.log("Stopped dragging a bar:", e)
    },

    onContextmenuBar(e){
      this.contextmenuY = e.DOMEvent.clientY
      this.contextmenuX = e.DOMEvent.clientX
      this.showContextmenu = true
      if(this.contextmenuTimeout){
        clearTimeout(this.contextmenuTimeout)
      }
      this.contextmenuTimeout = setTimeout(() => this.showContextmenu = false, 3000)
    },

    onDropOnRow(e){
      console.log("Dropped on row:", e)
    },

    drag(ev) {
      ev.dataTransfer.setData("Text", ev.target.id);
    }
  }
}
</script>

<style scoped>
  #ganttastic-wrapper{
    height: 60vh;
  }
</style>