<template>
  <v-container fluid>
    <v-navigation-drawer 
      dark
      color="#34495E"
      fixed
      expand-on-hover
      permanent
      clipped
      class="d-none d-md-flex"
    >
      <v-card 
        class="pa-8"
        color="#34495E"
        flat
      />
      <v-list dense nav>
        <v-list-item 
          v-for="section in docSectionList"
          :key="section.id"
          @click="$vuetify.goTo(`#${section.id}`)"
        >
          <v-icon left>
            {{section.titleIcon}}
          </v-icon>
          <v-list-item-title>
            {{section.title}}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  <v-container>
    <v-card v-for="section in docSectionList"
            :key="section.id"
            :id="section.id"
            class="mt-4 mb-4"
    >
      <v-card-title>
        <v-icon left color="teal darken-3"> {{section.titleIcon}}</v-icon>
        <span>{{section.title}}</span>
      </v-card-title>
      <v-card-text>
        <span v-html="section.htmlContent"/>
        <v-card dark class="pa-2 mt-2">
          Example code coming soon...
        </v-card>
        
      </v-card-text>
    </v-card>
  </v-container>

</v-container>
</template>

<script>

export default {
  data(){
    return{
      docSectionList: [
        {
          id: "installation-section",
          title: "Installation",
          titleIcon: "mdi-download",
          htmlContent: `
            If you use <kbd>npm</kbd> in your project, you can install Vue-Ganttastic by typing<br>
            <kbd class="ma-4">npm install vue-ganttastic</kbd> <br>
            in the command line in the root folder of your project. <br> <br>
            If you do not use <kbd>npm</kbd> in your project, the only alternative is to directly copy and paste
            all files from the <code>components</code> folder found in the <a>Vue-Ganttastic GitHub repository</a>
            and import the <code>GGanttChart</code> and <code>GGanttRow</code> components manually
            wherever you need them (or register them globally).
          `,
          exampleCode: ``
        }, 
        {
          id: "basic-gantt-chart-section",
          title: "A basic Gantt chart",
          titleIcon: "mdi-chart-gantt",
          htmlContent: `
            Get started by adding a <code>g-gantt-chart</code>
            to your template and defining the displayed time range by passing the props <code>chart-start</code>
            and <code>chart-end</code> (ISO 8601 strings). <br><br>
            Add rows to the Gantt chart by adding <code>g-gantt-row</code>
            components to the template <i>(Note that the rows must be children of the <code>g-gantt-chart</code> 
            component)</i>
          `,
          exampleCode: `
            <g-gantt-chart
              chart-start="2020-03-01 00:00"
              chart-end="2020-03-03 00:00"
            >
                  <g-gantt-row label="My row #1/>
                  <g-gantt-row label="My row #2"/>
                  <g-gantt-row label="My row #3"/>
            </g-gantt-chart>
          `
        },
        {
          id: "adding-bars-section",
          title: "Adding bars",
          titleIcon: "mdi-card-text",
          htmlContent: `
            Render bars in a <code>g-gantt-row</code>, by passing it an array of objects representing the bars 
            you want to render in that row using the <code>bars</code> prop. Those object do not need to adhere to some special
            structure, but naturally, they must contain two properties, representing the start and end time of the bar to be drawn in 
            the Gantt chart. To let the row know how those two properties of your objects are called, use the <code>bar-start</code>
            and <code>bar-end</code> props.
            <highlight-code lang="vue" :inline="false" :code="exampleCode"/>
          `
        },
        {
          id: "styling-bars-section",
          title: "Styling bars",
          titleIcon: "mdi-brush",
          htmlContent: `
            To define bar-specific stylings and options, you may add a <code>ganttBarConfig</code> nested object 
            to your bar objects. In that object, you may define the appearance of the bar using CSS-like JavaScript objects,
            similarly to how you
            <a href="https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles">bind styles</a>
            in Vue.js generally.
          `
        }
      ],
      exampleCode: 
      `
      <g-gantt-chart
            chart-start="2020-03-01 00:00"
            chart-end="2020-03-03 00:00"
      >
        <g-gantt-row/>
        <g-gantt-row/>
        <g-gantt-row/>
      </g-gantt-chart>
      `
    }
  }
}
</script>