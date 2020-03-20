<template>
  <div>
    <div id="ganttastic-wrapper">
      <g-gantt-chart
        :chart-start="chartStart"
        :chart-end="chartEnd"
        :grid="grid"
        :hide-timeaxis="hideTimeaxis"
        :push-on-overlap="pushOnOverlap"
        :highlighted-hours="highlightedHours"
        :row-label-width="`${rowLabelWidth}%`"
        :row-height="rowHeight"
        :theme="selectedTheme"
        @contextmenu-bar="onContextmenuBar($event)"
        @dragend-bar="stoppedDraggingBar($event)"
      >
        <g-gantt-row 
          v-for="row in rowList"
          :key="row.title"
          :label="row.label"
          :bars="row.barList"
          :highlight-on-hover="highlightOnHover"
          bar-start="myStart"
          bar-end="myEnd"
        >
          <template #bar-label="{bar}">
            <img
              v-if="bar.image"
              :src="require(`@/assets/${bar.image}`)"
              height="20"
              width="20"
              class="mr-1"
            >
            <span>{{bar.label}}</span>
          </template>
        </g-gantt-row>
      </g-gantt-chart>
    </div>

    <v-card class="pa-2" flat>
      <v-row justify="end">
        <v-btn
          dark
          color="primary"
          small 
          class="mr-4"
          href="https://github.com/InfectoOne/vue-ganttastic-homepage/blob/master/src/views/Example.vue"
          target="blank"
        >
          <span>View code</span>
          <v-icon right>mdi-code-tags</v-icon>
        </v-btn>
      </v-row>
    </v-card>

    <v-card 
      width="100%"
      height="28vh"
      color ="#dff2ea"
      class="d-none d-md-flex"
    >
      <v-row class="pa-2">
        <v-col cols="3">
          <v-checkbox
            v-model="hideTimeaxis"
            label="Hide timeaxis"
            hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-checkbox 
            v-model="pushOnOverlap"
            label="Push on overlap"
            hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-checkbox 
            v-model="grid"
            label="Grid"
            hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-checkbox 
            v-model="highlightOnHover"
            label="Highlight on hover"
            hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-select 
            v-model="selectedTheme"
            label="Theme"
            :items="themes"
            outlined
            dense
            hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-slider
            v-model="rowHeight"
            label="Row height"
            :min="20"
            :max="100"
            hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-slider 
            v-model="rowLabelWidth"
            label="Row label width"
            :min="10"
            :max="50"
            hide-details
          />
        </v-col>

        <v-col cols="3">
          <v-select 
            v-model="highlightedHours"
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

    <v-menu 
      v-model="showContextmenu"
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
import {GGanttChart, GGanttRow} from 'vue-ganttastic'

export default {
  components: {
    GGanttChart,
    GGanttRow
  },

  data(){
    return {
      chartStart: "2020-03-02 00:00",
      chartEnd: "2020-03-04 00:00",
      pushOnOverlap: true,
      grid: true,
      rowHeight: 40,
      rowLabelWidth: 15,
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
              myStart: "2020-03-03 18:00",
              myEnd: "2020-03-03 23:00",
              label: "Immobile",
              ganttBarConfig: {color:"white", backgroundColor: "#404040", opacity: 0.5, immobile: true}
            },
            {
              myStart: "2020-03-03 04:00",
              myEnd: "2020-03-03 15:00",
              label: "Bar",
              ganttBarConfig: {color:"white", backgroundColor: "#2e74a3", bundle: "blueBundle"}
            }
          ]
        },

        {
          label: "Row #2",
          barList: [
            {
              myStart: "2020-03-02 09:00",
              myEnd: "2020-03-02 18:00",
              image: "vue_ganttastic_logo_no_text.png",
              label: "I have an image",
              ganttBarConfig: {color:"white", backgroundColor: "#de3b26", bundle:"redBundle"}
            },
            {
              myStart: "2020-03-03 04:00",
              myEnd: "2020-03-03 15:00",
              label: "We belong together ^",
              ganttBarConfig: {color:"white", backgroundColor: "#2e74a3", bundle:"blueBundle"}
            },
            {
              myStart: "2020-03-03 18:00",
              myEnd: "2020-03-03 22:00",
              label: "Bar",
              ganttBarConfig: {color:"white", backgroundColor: "#aa34a3"}
            }
          ]
        },

        {
          label: "Row #3",
          barList: [
            {
              myStart: "2020-03-02 09:00",
              myEnd: "2020-03-02 18:00",
              label: "I am with stupid ^",
              ganttBarConfig: {color:"white", backgroundColor: "#de3b26", bundle: "redBundle"}
            },
            {
              myStart: "2020-03-02 22:30",
              myEnd: "2020-03-03 05:00",
              label: "With handles!",
              ganttBarConfig: {color:"white", backgroundColor: "#a23def", handles: true}
            },
            {
              myStart: "2020-03-02 01:00",
              myEnd: "2020-03-02 07:00",
              label: "Bar",
              ganttBarConfig: {color:"white", backgroundColor: "#5effad"}
            },
            {
              myStart: "2020-03-03 14:00",
              myEnd: "2020-03-03 20:00",
              label: "Woooow!",
              ganttBarConfig: {color:"white", background: "repeating-linear-gradient(45deg,#de7359,#de7359 10px,#ffc803 10px,#ffc803 20px)"}
            }, 
          ]
        },

        {
          label: "Row #4",
          barList: [
            {
              myStart: "2020-03-03 06:30",
              myEnd: "2020-03-03 20:00",
              label: "Bar",
              ganttBarConfig:{color:"white", backgroundColor: "#d18aaf", handles: true}
            },
            {
              myStart: "2020-03-02 00:30",
              myEnd: "2020-03-03 01:00",
              label: "Rectangular",
              ganttBarConfig: {color:"white", backgroundColor: "#f2840f", borderRadius: 0}
            }, 
          ]
        }

      ]
    }
  },


  methods: {

    stoppedDraggingBar(){
    },

    onContextmenuBar(e){
      e.event.preventDefault()
      this.contextmenuY = e.event.clientY
      this.contextmenuX = e.event.clientX
      this.showContextmenu = true
      if(this.contextmenuTimeout){
        clearTimeout(this.contextmenuTimeout)
      }
      this.contextmenuTimeout = setTimeout(() => this.showContextmenu = false, 3000)
    }

  }
}
</script>

<style scoped>
  #ganttastic-wrapper{
    height: 50vh;
    overflow-y: auto;
  }
</style>