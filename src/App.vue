<template>
  <v-app>
    <v-app-bar color="primary" dense app>
      <v-row justify="space-between" align="center">

        <v-col cols="8" class="pl-4">
          <v-row align="center">
            <img src="@/assets/vue_ganttastic_logo_no_text.png" height="38" width="38" class="mr-2"/>
            <span class="white--text">Vue Ganttastic</span>
            <v-icon class="pl-1 pr-1">mdi-arrow-right</v-icon>
            <span class="white--text">{{$router.currentRoute.name}}</span>
          </v-row>
        </v-col>

        <v-col cols="4" class="pr-4">
          <v-row justify="end" align="center">
            <v-menu offset-y :nudge-left="80">
              <template #activator="{on}">
                <v-btn icon v-on="on">
                  <v-icon color="white">mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item to="docs">
                  <v-icon left>mdi-file-document</v-icon>
                  Docs
                </v-list-item>
                <v-list-item to="example">
                  <v-icon left>mdi-chart-gantt</v-icon>
                  Example
                </v-list-item>
                <v-list-item 
                  href="https://github.com/InfectoOne/vue-ganttastic"
                  target="blank"
                >
                  <v-icon left>mdi-github</v-icon>
                  Github
                </v-list-item>
              </v-list>
            </v-menu>
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
@import url('https://fonts.googleapis.com/css?family=Catamaran&display=swap');
  html {
    overflow-y: auto !important;
  }

  *{
    font-family: "Catamaran"
  }
</style>
