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
    <v-row justify="center">
      <v-col xs="12" md="9">
        <v-card v-for="section in docSectionList"
                :key="section.id"
                :id="section.id"
                class="mt-6 mb-6"
        >
          <v-card-title>
            <v-icon left color="teal darken-3"> {{section.titleIcon}}</v-icon>
            <span>{{section.title}}</span>
          </v-card-title>
          <v-card-text>
            <span v-html="section.htmlContent"/>
            <prism-syntax-highlight 
              v-if="section.exampleCode"
              language="javascript"
            >
              {{section.exampleCode}}
            </prism-syntax-highlight>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</v-container>
</template>

<script>
import PrismSyntaxHighlight from '@/components/PrismSyntaxHighlight'

export default {
  components:{
    PrismSyntaxHighlight
  },
  data(){
    return{
      docSectionList: [

        {
          id: "installation-section",
          title: "Installation",
          titleIcon: "mdi-download",
          htmlContent: `
            You can quickly install Vue-Ganttastic using npm: <br>
            <kbd class="ma-4">npm install vue-ganttastic</kbd> <br>
            If you do not use <kbd>npm</kbd> in your project, the only alternative is to directly copy and paste
            all files from the <code>components</code> folder found in the
            <a href="https://github.com/InfectoOne/vue-ganttastic" target="blank">GitHub repository</a>.
            Bear in mind that <a href="https://momentjs.com/" target="blank">Moment.js</a> is a dependency,
            so you will have to install it manually
            if you are installing Vue-Ganttastic this way.  <br> <br>
            After Vue-Ganttastic has been installed, the two primary components <code>GGanttChart</code> and <code>GGanttRow</code>
            may be imported wherever needed. You may register them globally in your <code>main.js</code> 
            so that they're accessible in your entire Vue application or you may import
            them where they're needed. Here's how to import those two components in your Vue SFC (.vue) file:
          `,
          exampleCode: `
            <template>
              ...
            </template>

            <script>
              import {GGanttChart, GGanttRow} from 'vue-ganttastic'

              export default {
                components: {
                  GGanttChart,
                  GGanttRow
                },
                ...
              }
          `
          // eslint-disable-next-line
          + "<\/script>"
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
            components to the template <i>(Note that the rows must be direct 
            children of the <code>g-gantt-chart</code> component)</i>
          `,
          exampleCode: `
            <g-gantt-chart
              chart-start="2020-03-01 00:00"
              chart-end="2020-03-03 00:00"
            >
                  <g-gantt-row label="My row #1"/>
                  <g-gantt-row label="My row #2"/>
                  <g-gantt-row label="My row #3"/>
                  ...
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
          `,
          exampleCode: `
            <template>
              ...
              <g-gantt-chart
                :chart-start="myChartStart"
                :chart-end="myChartEnd"
              >
                    <g-gantt-row 
                      label="My row"
                      :bars="myBars"
                      bar-start="myBarStart"
                      bar-end="myBarEnd"
                    />
              </g-gantt-chart>
            </template>

            `
            +"<script>"
            + `
              ...
              data(){
                return{
                  myChartStart: "2020-03-01 00:00"
                  myChartEnd: "2020-03-02 00:00"
                  myBars: [
                    {
                      myBarStart: "2020-03-01 01:30",
                      myBarEnd: "2020-03-01 06:00"
                    },
                    {
                      myBarStart: "2020-03-01 15:10",
                      myBarEnd: "2020-03-01 20:00"
                    }
                  ]
                }
              }
            `
            // eslint-disable-next-line
            + "<\/script>"
          
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
          `,
          exampleCode: `
            ...
            myBars: [
              {
                myBarStart: "2020-03-01 01:30",
                myBarEnd: "2020-03-01 06:00",
                ganttBarConfig: {
                  background: "#bd3128",
                  borderRadius: "3px"
                }
              },
              {
                myBarStart: "2020-03-01 15:10",
                myBarEnd: "2020-03-01 20:00",
                ganttBarConfig: {
                  background: "#2fad3e",
                  opacity: 0.3
                }
              }
            ]
            ...
          `
        },


        {
          id: "bundles",
          title: "Bundled Bars",
          titleIcon: "mdi-package-variant-closed",
          htmlContent: `
            In some cases, you may want to "bundle" two or more bars from different rows together
            in such a way that when one bar is dragged, the other one is dragged alongside it, too. 
            For such cases, you may add a <code>bundle</code> string property to a bar's
            <code>ganttBarConfig</code> nested object.
            All other bars that have the same value of <code>bundle</code> will move with that bar.
          `,
          exampleCode: `
            <template>
              ...
              <g-gantt-chart
                :chart-start="myChartStart"
                :chart-end="myChartEnd"
              >
                    <g-gantt-row 
                      label="My row #1"
                      :bars="myBars1"
                      bar-start="myBarStart"
                      bar-end="myBarEnd"
                    />
                    <g-gantt-row 
                      label="My row #2"
                      :bars="myBars2"
                      bar-start="myBarStart"
                      bar-end="myBarEnd"
                    />
              </g-gantt-chart>
            </template>

            `
            +"<script>"
            + `
              ...
              data(){
                return{
                  myChartStart: "2020-03-01 00:00"
                  myChartEnd: "2020-03-02 00:00"
                  myBars1: [
                    {
                      myBarStart: "2020-03-01 01:30",
                      myBarEnd: "2020-03-01 06:00",
                      ganttBarConfig: {
                        bundle: "foo"
                      }
                    },
                  ],
                  myBars2: [
                    {
                      myBarStart: "2020-03-01 15:10",
                      myBarEnd: "2020-03-01 20:00",
                      ganttBarConfig: {
                        bundle: "foo" 
                      }
                    }
                  ]
                }
              }
            `// eslint-disable-next-line
            + "<\/script>"
        },


        {
          id: "events",
          title: "Bar Events",
          titleIcon: "mdi-exclamation",
          htmlContent: `
            The <code>g-gantt-chart</code> component emits special events related to the bars it contains. 
            The events follow the naming convention <code>(event name)-bar</code> (e.g. <code>mousedown-bar</code>)
            and the data delivered with is an object in the form <code>{event, bar}</code>. <br>
            <code> event </code> is the native DOM event object that you would usually get. <code> bar </code> is the affected bar object. <br><br>
            The event <code>dragend-bar</code> contains an additional property: <code>movedBars</code>,
            a list (set) of all bars that have been moved since the drag was started. You may use this event if you e.g.
            want to send a back-end call and save the changes after the user has dragged/pushed some of the bars in the Gantt chart.
          `,

          exampleCode: `
            <template>
              ...
              <g-gantt-chart
                ...
                @contextmenu-bar="onContextmenuBar($event)"
                @dragend-bar="onDragendBar($event)"
              >
                ...
              </g-gantt-chart>
            </template>

            `
            +"<script>"+
            `
              export default {
                ...
                methods: {
                  onContextmenuBar(e){
                    console.log("contextmenu bar!")
                  },
                  onDragendBar(e){
                    console.log("dragend bar!")
                  }
                }
                ...
              }
            `
            // eslint-disable-next-line
            + "<\/script>"
          
        },
        {
          id: "advanced",
          title: "Advanced",
          titleIcon: "mdi-star-circle",
          htmlContent: `
            For more details and advanced options, please refer to the API (coming soon).
            To see a more advanced example live in action, please navigate
            to the Example page. You can find the full source code of it 
            <a href="https://github.com/InfectoOne/vue-ganttastic-homepage/blob/master/src/views/Example.vue" target="blank">
            here
            </a>
          `
        }


      ],
      
    }
  }
}
</script>

<style scoped>
  span{
    font-size: 1.15em;
  }
</style>