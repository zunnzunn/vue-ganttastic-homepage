<template>
  <v-app>
    <v-app-bar color="primary" dense app>
      <v-row justify="space-between">

        <v-col cols="4" class="pl-4">
          <v-row align="center">
            <img src="@/assets/vue_ganttastic_logo_no_text.png" height="40" width="40" class="mr-2"/>
            <span class="white--text">
              Vue Ganttastic 
              <v-icon>mdi-arrow-right</v-icon>
              {{$router.currentRoute.name}}
            </span>
          </v-row>
        </v-col>

        <v-col cols="2" class="pr-4">
          <v-row justify="end">
            <v-btn fab small to="/">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-row>
        </v-col>

      </v-row>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
  html {
    overflow-y: auto !important;
  }

  *{
    font-family: "Quicksand"
  }
</style>
