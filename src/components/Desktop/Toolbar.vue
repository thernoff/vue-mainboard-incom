<template>
    <v-toolbar
      app
      dark
      color="primary"
      height="40"
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Incom</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-list-tile>{{ titleActiveWorkspace }}</v-list-tile>
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- <v-btn flat>Link One</v-btn> -->
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  computed: {
    titleActiveWorkspace () {
      return this.$store.getters.getTitleActiveWorkspace
    }
  }
}
</script>

<style scoped>

</style>
