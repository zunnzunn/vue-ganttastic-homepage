<template>
  <v-container>
    <v-row justify="center" align-content="center">

      <v-col cols="12" class="d-flex justify-center">
        <img
          alt="Vue-Ganttastic logo"
          src="../assets/vue_ganttastic_logo.png"
          style="width: 80%; max-width: 500px;"
        />
      </v-col>

      <v-col cols="12" class="d-flex justify-center">
        A customizable, interactive and easy-to-use Gantt chart component for Vue.js
      </v-col>

      <v-col cols="12" sm="4" class="d-flex justify-center">
        <v-btn
          width="80%"
          color="primary"
          to="docs"
        >
          <v-icon left>mdi-file-document</v-icon>
          <span>Docs</span>
        </v-btn>
      </v-col>

      <v-col cols="12" sm="4" class="d-flex justify-center">
          <v-btn
            width="80%"
            color="primary"
            to="example"
          >
            <v-icon left>mdi-chart-gantt</v-icon>
            <span>Example</span>
          </v-btn>
      </v-col>

      <v-col cols="12" sm="4" class="d-flex justify-center">
          <v-btn 
            width="80%" 
            color="primary" 
            href="https://github.com/InfectoOne/vue-ganttastic"
            target="blank"
          >
            <v-icon left>mdi-github</v-icon>
            <span>GitHub</span>
          </v-btn>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>
