<template>
    <!-- <v-toolbar
      app
      dark
      color="primary"
      height="40"
    > -->
    <v-toolbar
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
        <v-switch
          :label="(isModeGrid) ? 'Режим сетки' : 'Режим сетки'"
          color="warning"
          v-model="isModeGrid"
          @click.stop="toggleModeGrid"
        ></v-switch>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      modeGrid: true
    };
  },
  computed: {
    isModeGrid() {
      return this.$store.getters.isModeGrid;
    },
    titleActiveWorkspace() {
      return this.$store.getters.getTitleActiveWorkspace;
    }
  },
  methods: {
    toggleModeGrid() {
      console.log("toggleModeGrid");
      this.$store.commit("toggleModeGrid");
    }
  }
};
</script>

<style scoped>
</style>
