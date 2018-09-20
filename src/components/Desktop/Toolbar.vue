<template>
<div class="mainboard-toolbar">
    <!-- <v-toolbar
      app
      dark
      color="primary"
      height="40"
    > -->
    <mainboard-dialog-window
      v-bind:title="'Введите название рабочей области'"
      v-bind:label="'Название рабочей области'"
      v-bind:visibleDialogWindow="visibleDialogWindow"

      v-on:input="createNewWorkspace($event)"
      v-on:hideDialogWindow="hideDialogWindow"
    ></mainboard-dialog-window>

    <v-toolbar
      dark
      color="primary"
      height="40"
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Incom</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-menu offset-y light>
        <v-btn
          slot="activator"
          color="primary"
          dark
        >
          {{ titleActiveWorkspace }}
        </v-btn>
        <v-list>
          <!-- <mainboard-dialog-window
            v-bind:title="'Введите название рабочей области'"
            v-bind:label="'Название рабочей области'"
            v-on:input="createNewWorkspace($event)"
          > -->
              <v-list-tile
                v-on:click="showDialogWindow"
              >
                Создать новую рабочую область
            </v-list-tile>
          <!-- </mainboard-dialog-window> -->
          <v-list-tile
            v-for="(workspace, index) in workspaces"
            :key="index"
            v-on:click="setActiveWorkspace(index)"
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
  </div>
</template>

<script>
import DialogWindow from "./ModalWindows/DialogWindow";
export default {
  data() {
    return {
      modeGrid: true,
      visibleDialogWindow: false
    };
  },
  components: {
    mainboardDialogWindow: DialogWindow
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
    showDialogWindow() {
      this.visibleDialogWindow = true;
    },

    hideDialogWindow() {
      this.visibleDialogWindow = false;
    },

    createNewWorkspace(nameWorkspace) {
      this.$store.dispatch("actionCreateNewWorkspace", nameWorkspace);
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
    },

    setActiveWorkspace(index) {
      this.$store.dispatch("actionSetActiveWorkspace", index);
    }
  }
};
</script>

<style scoped>
</style>
