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
        <v-menu offset-y>
        <v-btn
          slot="activator"
          color="primary"
          dark
        >
          {{ titleActiveWorkspace }}
        </v-btn>
        <v-list>
          <v-list-tile
            v-on:click="createNewWorkspace"
          >
            Создать новую рабочую область
          </v-list-tile>
          <v-list-tile
            v-for="(workspace, index) in workspaces"
            :key="index"
            @click="''"
          >
            <v-list-tile-title>{{ workspace.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
    </v-menu>
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
    workspaces() {
      return this.$store.getters.workspaces;
    },

    isModeGrid() {
      return this.$store.getters.isModeGrid;
    },
    titleActiveWorkspace() {
      return this.$store.getters.getTitleActiveWorkspace;
    }
  },
  methods: {
    createNewWorkspace() {
      this.$store.dispatch("actionCreateNewWorkspace");
    },

    toggleModeGrid() {
      console.log("toggleModeGrid");
      this.$store.commit("toggleModeGrid");
    },

    consoleData() {
      console.log(JSON.stringify(this.$store.getters.workspaces));
    },

    saveSettingsDesktop() {
      this.$store.dispatch("actionSaveSettingsDesktop");
    }
  }
};
</script>

<style scoped>
</style>
