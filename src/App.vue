<template>
  <v-app>
    <v-navigation-drawer app temporary></v-navigation-drawer>

    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Incom</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Link One</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app dark color="primary"></v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  name: 'App'
}
</script>
