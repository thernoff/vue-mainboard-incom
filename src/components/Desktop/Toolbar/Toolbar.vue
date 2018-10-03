<template>
<div class="mainboard-toolbar">
    <mainboard-info-dialog-window
      v-bind:visible="visibleInfoDialogWindow"
      v-bind:options="{
        title: 'Нельзя удалить текущую рабочий стол',
        text: 'Для работы необходима хотя бы один рабочий стол.'
      }"
      v-on:hideInfoDialogWindow="hideInfoDialogWindow"
    ></mainboard-info-dialog-window>

    <mainboard-input-dialog-window
      v-bind:options="{
        title: 'Введите название рабочего стола',
        label: 'Название рабочего стола'
      }"
      v-bind:visible="visibleInputDialogWindow"
      v-on:input="createNewWorkspace($event)"
      v-on:hideInputDialogWindow="hideInputDialogWindow"
    ></mainboard-input-dialog-window>

    <mainboard-dialog-window
      v-bind:options="{
        title: 'Удаление рабочего стола',
        text: 'Вы действительно хотите удалить текущий рабочий стол?'
      }"
      v-bind:visible="visibleDialogWindow"
      v-on:hideDialogWindow="deleteCurrentWorkspace($event)"
    ></mainboard-dialog-window>
    <mainboard-cover
      v-if="visibleCover"
      v-on:click.native="hideCover"
    >
    </mainboard-cover>
    <v-toolbar
      dark
      color="primary"
      height="40"
    >
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title>Incom</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-menu offset-y light z-index="9999">
        <v-btn
          slot="activator"
          color="primary"
          dark
          v-on:click="setNotActiveWindows"
        >
          {{ titleActiveWorkspace }}
        </v-btn>
        <v-list>
          <v-list-tile
            v-on:click="showInputDialogWindow"
          >
            Создать новый рабочий стол
          </v-list-tile>

          <v-list-tile
              v-on:click="showDialogWindow"
            >
              Удалить текущий рабочий стол
          </v-list-tile>
          <v-divider></v-divider>

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
import InputDialogWindow from "@/components/Desktop/Toolbar/InputDialogWindow.vue";
import DialogWindow from "@/components/Desktop/Toolbar/DialogWindow.vue";
import InfoDialogWindow from "@/components/Desktop/Toolbar/InfoDialogWindow.vue";
import Cover from "@/components/Desktop/Cover.vue";
export default {
  data() {
    return {
      modeGrid: true,
      visibleDialogWindow: false,
      visibleInfoDialogWindow: false,
      visibleInputDialogWindow: false,
      visibleCover: false
    };
  },

  components: {
    mainboardInputDialogWindow: InputDialogWindow,
    mainboardDialogWindow: DialogWindow,
    mainboardInfoDialogWindow: InfoDialogWindow,
    mainboardCover: Cover
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
    showCover() {
      this.visibleCover = true;
    },

    hideCover() {
      this.visibleCover = false;
    },

    showDialogWindow() {
      this.hideCover();
      this.visibleDialogWindow = true;
    },

    hideDialogWindow() {
      this.visibleDialogWindow = false;
    },

    showInfoDialogWindow() {
      this.hideCover();
      this.visibleInfoDialogWindow = true;
    },

    hideInfoDialogWindow() {
      this.visibleInfoDialogWindow = false;
    },

    showInputDialogWindow() {
      this.hideCover();
      this.visibleInputDialogWindow = true;
    },

    hideInputDialogWindow() {
      this.visibleInputDialogWindow = false;
    },

    createNewWorkspace(nameWorkspace) {
      this.$store.dispatch("actionCreateNewWorkspace", nameWorkspace);
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    deleteCurrentWorkspace(accept) {
      this.visibleDialogWindow = false;
      console.log("this.countWorkspaces", this.countWorkspaces);
      if (this.countWorkspaces < 2) {
        this.showInfoDialogWindow();
        return;
      }

      if (accept) {
        this.$store.dispatch("actionDeleteCurrentWorkspace");
        this.$store.dispatch("actionSaveSettingsDesktop");
      }
    },

    toggleModeGrid() {
      console.log("toggleModeGrid");
      this.$store.commit("toggleModeGrid");
      if (this.isModeGrid) {
        $(".mainboard-window").draggable("option", "snap", false);
      } else {
        $(".mainboard-window").draggable("option", "snap", ".mainboard-window");
      }
    },

    setActiveWorkspace(index) {
      this.$store.dispatch("actionSetActiveWorkspace", index);
      //this.$store.dispatch("actionSetActiveWindow");
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    setNotActiveWindows() {
      this.$store.dispatch("actionSetNotActiveWindows");
      this.$store.dispatch("actionSaveSettingsDesktop");
    }
  }
};
</script>

<style scoped>
.mainboard-toolbar {
  height: 40px;
}
</style>
