<template>
  <v-container fluid>
    <v-row no-gutters>

      <v-col cols="3">
        <v-navigation-drawer dark
                            color="#34495E"
                            permanent
                            clipped
                            fixed
        >
          <v-card class="pa-8" color="#34495E" flat/>
          <v-list dense nav>
            <v-list-item @click="$vuetify.goTo('#installation')">
              Installation
            </v-list-item>
            <v-list-item @click="$vuetify.goTo('#basicGanttChart')">
              A basic Gantt chart
            </v-list-item>
            <v-list-item @click="$vuetify.goTo('#addingBars')">
              Adding bars
            </v-list-item>
            <v-list-item @click="$vuetify.goTo('#barStyling')">
              Bar styling
            </v-list-item>
            <v-list-item @click="$vuetify.goTo('#barOptions')">
              Bar options
            </v-list-item>
            <v-list-item @click="$vuetify.goTo('#bundles')">
              Bundles
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-col>

    <v-col cols="9">
      <v-container>
        <v-card class="mb-5" id="installation">
          <v-card-title>Installation</v-card-title>
          <v-card-text>
            If you use <kbd>npm</kbd> in your project, you can install Vue-Ganttastic using<br>
            <kbd class="ma-4">npm install vue-ganttastic</kbd> <br>
            in your command line in the root folder of your project. <br> <br>
            If you do not use <kbd>npm</kbd> in your project, the only alternative is to directly copy and paste
            all files from the <code>components</code> folder found in the <a>Vue-Ganttastic GitHub repository</a>
            and import the <code>GGanttChart</code> and <code>GGanttRow</code> components manually wherever you need them
            (or register them globally).
          </v-card-text>
        </v-card>

        <v-card class="mt-5 mb-5" id="basicGanttChart">
          <v-card-title>A basic Gantt chart</v-card-title>
          <v-card-text>
            Get started by adding a <code>g-gantt-chart</code>
            to your template and defining the displayed time range by passing the props <code>chart-start</code>
            and <code>chart-end</code> (ISO 8601 strings). <br><br>
            Add rows to the Gantt chart by adding <code>g-gantt-row</code>
            components to the template <i>(Note that the rows must be children of the <code>g-gantt-chart</code> component)</i>
            <v-card class="pa-2 ma-2" dark>
              Example code coming soon...
            </v-card>
          </v-card-text>
        </v-card>

        <v-card class="mt-5 mb-5" id="addingBars">
          <v-card-title>Adding bars</v-card-title>
          <v-card-text>
            Render bars in a <code>g-gantt-row</code>, by passing it an array of objects representing the bars 
            you want to render in that row using the <code>bars</code> prop. Those object do not need to adhere to some special
            structure, but naturally, they must contain two properties, representing the start and end time of the bar to be drawn in 
            the Gantt chart. To let the row know how those two properties of your objects are called, use the <code>bar-start</code>
            and <code>bar-end</code> props.
            <v-card class="pa-2 ma-2" dark>
              Example code coming soon...
            </v-card>
          </v-card-text>
        </v-card>

        <v-card class="mt-5 mb-5" id="barStyling">
          <v-card-title>Bar styling</v-card-title>
          <v-card-text>
            To define bar-specific stylings and options, you may add a <code>ganttBarConfig</code> nested object 
            to your bar objects. In that object, you may define the appearance of the bar using CSS-like JavaScript objects,
            similarly to how you
            <a href="https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles">bind styles</a>
            in Vue.js generally.
            <v-card class="pa-2 ma-2" dark>
              Example code coming soon...
            </v-card>
          </v-card-text>
        </v-card>

        <v-card class="mt-5 mb-5" id="barOptions">
          <v-card-title>Bar options</v-card-title>
          <v-card-text>
            Coming soon...
          </v-card-text>
        </v-card>

        <v-card class="mt-5 mb-5" id="bundles">
          <v-card-title>Bundles</v-card-title>
          <v-card-text>
            Coming soon...
          </v-card-text>
        </v-card>

      </v-container>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
      exampleCode: `
      <g-gantt-chart>
        <g-gantt-row/>
        <g-gantt-row/>
        <g-gantt-row/>
      </g-gantt-chart>`
    }
  }
}
</script>

<style>

</style>