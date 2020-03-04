<template>
  <v-container>
  <v-row justify="center">

    <v-col cols="6">
      <v-row justify="center">
        <img alt="Vue-Ganttastic logo" src="../assets/vue_ganttastic_logo.png" width="450">
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-row justify="center">
        <span>
          A customizable, interactive and easy-to-use Gantt chart component for Vue.js
        </span>
      </v-row>
    </v-col>

    <v-col cols="3">
      <v-row justify="center">
        <v-btn x-large color="primary" width="170">
          <v-icon left> mdi-file-document </v-icon>
          <span> Docs </span>
        </v-btn>
      </v-row>
    </v-col>

    <v-col cols="3">
      <v-row justify="center" >
        <v-btn x-large color="primary" to="example" width="170">
          <v-icon left> mdi-chart-gantt </v-icon>
          <span>Example</span>
        </v-btn>
      </v-row>
    </v-col>

    <v-col cols="3">
      <v-row justify="center">
        <v-btn x-large color="primary" width="170">
          <v-icon left> mdi-git </v-icon>
          <span> Github</span>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
}
</script>
