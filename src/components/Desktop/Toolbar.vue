<template>
<div class="mainboard-toolbar">
    <!-- <v-toolbar
      app
      dark
      color="primary"
      height="40"
    > -->
    <mainboard-info-dialog-window
      v-bind:title="'Нельзя удалить текущую рабочую область'"
      v-bind:text="'Для работы необходима хотя бы одна рабочая область.'"
      v-bind:visible="visibleInfoDialogWindow"

      v-on:hideInfoDialogWindow="hideInfoDialogWindow"
    ></mainboard-info-dialog-window>

    <mainboard-input-dialog-window
      v-bind:title="'Введите название рабочей области'"
      v-bind:label="'Название рабочей области'"
      v-bind:visible="visibleInputDialogWindow"

      v-on:input="createNewWorkspace($event)"
      v-on:hideInputDialogWindow="hideInputDialogWindow"
    ></mainboard-input-dialog-window>

    <mainboard-dialog-window
      v-bind:title="'Удаление рабочей области'"
      v-bind:text="'Вы действительно хотите удалить текущую рабочую область?'"
      v-bind:visible="visibleDialogWindow"

      v-on:hideDialogWindow="deleteCurrentWorkspace($event)"
    ></mainboard-dialog-window>

    <v-toolbar
      dark
      color="primary"
      height="40"
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Incom</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-menu offset-y light z-index="9999">
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
                v-on:click="showInputDialogWindow"
              >
                Создать новую рабочую область
            </v-list-tile>
            <v-list-tile
                v-on:click="showDialogWindow"
              >
                Удалить текущую область
            </v-list-tile>
            <v-divider></v-divider>
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
import InputDialogWindow from "./ModalWindows/InputDialogWindow";
import DialogWindow from "./ModalWindows/DialogWindow";
import InfoDialogWindow from "./ModalWindows/InfoDialogWindow";
export default {
  data() {
    return {
      modeGrid: true,
      visibleDialogWindow: false,
      visibleInfoDialogWindow: false,
      visibleInputDialogWindow: false
    };
  },
  components: {
    mainboardInputDialogWindow: InputDialogWindow,
    mainboardDialogWindow: DialogWindow,
    mainboardInfoDialogWindow: InfoDialogWindow
  },

  computed: {
    workspaces() {
      return this.$store.getters.workspaces;
    },

    countWorkspaces() {
      return this.workspaces.length;
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

    showInfoDialogWindow() {
      this.visibleInfoDialogWindow = true;
    },

    hideInfoDialogWindow() {
      this.visibleInfoDialogWindow = false;
    },

    showInputDialogWindow() {
      this.visibleInputDialogWindow = true;
    },

    hideInputDialogWindow() {
      this.visibleInputDialogWindow = false;
    },

    createNewWorkspace(nameWorkspace) {
      this.$store.dispatch("actionCreateNewWorkspace", nameWorkspace);
    },

    deleteCurrentWorkspace(accept) {
      this.visibleDialogWindow = false;
      console.log("this.countWorkspaces", this.countWorkspaces);
      if (this.countWorkspaces < 2) {
        this.showInfoDialogWindow();
        return;
      }

      if (accept) this.$store.dispatch("actionDeleteCurrentWorkspace");
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
