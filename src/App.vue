<template>
  <v-app class="mainboard">
    <mainboard-dialog-window-create-shortcut
      v-bind:visible="visibleDialogWindowCreateShortcut"
      v-on:hideDialogWindow="createCustomShortcut"
    ></mainboard-dialog-window-create-shortcut>
    <v-menu
      v-model="contextMenu.visible"
      :position-x="contextMenu.x"
      :position-y="contextMenu.y"
      absolute
      offset-y
    >
      <v-list>
        <v-list-tile
          v-on:click="showDialogWindowCreateShortcut"
        >
          <v-list-tile-title
            v-on:click="''"
          >
            {{ 'Создать ярлык' }}
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          @click="''"
        >
          <v-list-tile-title
            v-on:click="''"
          >
            {{ 'Упорядочить ярлыки' }}
          </v-list-tile-title>
        </v-list-tile>

      </v-list>
    </v-menu>
    <!-- <v-navigation-drawer app temporary></v-navigation-drawer> -->
    <mainboard-toolbar class="mainboard-toolbar"></mainboard-toolbar>

    <div
      class="mainboard-workspace"
      v-on:contextmenu.stop.prevent="showContextMenu"
    >
      <!-- <mainboard-cover
        v-if="visibleStartmenu"
        v-on:click.native="toggleVisibleStartMenu"
      >
      </mainboard-cover> -->
      <!-- <v-container fluid> -->
          <!-- <v-layout row wrap> -->
        <mainboard-shortcut-list :shortcuts="shortcuts"></mainboard-shortcut-list>
        <mainboard-window
          :key="window.id"
          :index="index"
          :options="window"
          v-show="!window.minimize"
          v-for="(window, index) in windows"
        ></mainboard-window>
        <mainboard-grid
          ref="grid"
        ></mainboard-grid>
          <!-- </v-layout> -->
        <mainboard-startmenu></mainboard-startmenu>
        <!-- <router-view></router-view> -->
      <!-- </v-container> -->
    </div>
    <mainboard-taskbar class="mainboard-taskbar"></mainboard-taskbar>
    <template v-if="error">
    <v-snackbar
      :multi-line="true"
      :timeout="3000"
      color="error"
      @input="closeError"
      :value="true"
    >
      {{error}}
      <v-btn
        dark
        flat
        @click="closeError"
      >
        Закрыть
      </v-btn>
    </v-snackbar>
  </template>
  </v-app>


</template>

<script>
import Taskbar from "@/components/Desktop/Taskbar/Taskbar.vue";
import Toolbar from "@/components/Desktop/Toolbar/Toolbar.vue";
import Startmenu from "@/components/Desktop/Taskbar/Startmenu.vue";
import Window from "@/components/Desktop/Window.vue";
import Grid from "@/components/Desktop/Grid.vue";
import Cover from "@/components/Desktop/Cover.vue";
import Shortcut from "@/components/Desktop/Shortcut.vue";
import ShortcutList from "@/components/Desktop/ShortcutList.vue";
import ResizableBlock from "@/components/Desktop/ResizableBlock.vue";
import DialogWindowCreateShortcut from "@/components/Desktop/DialogWindowCreateShortcut.vue";

export default {
  data() {
    return {
      visibleDialogWindowCreateShortcut: false,
      contextMenu: {
        visible: false,
        x: 0,
        y: 0
      }
    };
  },

  components: {
    mainboardTaskbar: Taskbar,
    mainboardToolbar: Toolbar,
    mainboardStartmenu: Startmenu,
    mainboardWindow: Window,
    mainboardGrid: Grid,
    mainboardCover: Cover,
    mainboardShortcut: Shortcut,
    mainboardShortcutList: ShortcutList,
    mainboardResizableBlock: ResizableBlock,
    mainboardDialogWindowCreateShortcut: DialogWindowCreateShortcut
  },

  computed: {
    visibleStartmenu() {
      return this.$store.getters.visibleStartmenu;
    },

    isModeGrid() {
      return this.$store.getters.isModeGrid;
    },

    windows() {
      return this.$store.getters.windows;
    },

    shortcuts() {
      return this.$store.getters.shortcuts;
    },

    error() {
      return this.$store.getters.error;
    }
  },

  watch: {
    shortcuts() {
      console.log("watch shortcuts", this.shortcuts);
    }
  },

  created() {
    this.$store.dispatch("actionGetDashboard");
  },

  mounted() {
    //console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    const self = this;
    this.$store.commit("setWidthGrid", this.$refs.grid.$el.clientWidth);
    this.$store.commit("setHeightGrid", this.$refs.grid.$el.clientHeight);

    window.addEventListener("resize", function() {
      const oldWidthGrid = self.$store.getters.getWidthGrid;
      const oldHeightGrid = self.$store.getters.getHeightGrid;
      const newWidthGrid = self.$refs.grid.$el.clientWidth;
      const newHeightGrid = self.$refs.grid.$el.clientHeight;
      const options = {
        coefLeft: newWidthGrid / oldWidthGrid,
        coefTop: newHeightGrid / oldHeightGrid
      };

      self.$store.dispatch("actionRecalcWindowsCoords", options);
      self.$store.commit("setWidthGrid", self.$refs.grid.$el.clientWidth);
      self.$store.commit("setHeightGrid", self.$refs.grid.$el.clientHeight);
    });
  },

  methods: {
    toggleVisibleStartMenu() {
      this.$store.dispatch("actionToggleVisibleStartMenu");
    },

    closeError() {
      this.$store.dispatch("actionClearError");
    },

    showContextMenu(event) {
      event.preventDefault();
      this.contextMenu.visible = false;
      this.contextMenu.x = event.clientX;
      this.contextMenu.y = event.clientY;
      this.$nextTick(() => {
        this.contextMenu.visible = true;
      });
    },

    showDialogWindowCreateShortcut() {
      this.visibleDialogWindowCreateShortcut = true;
    },

    createCustomShortcut(customShortcut) {
      console.log("customShortcut", customShortcut);
      this.visibleDialogWindowCreateShortcut = false;
      this.$store.dispatch("actionCreateNewShortcut", customShortcut);
      this.$store.dispatch("actionSaveSettingsDesktop");
    }
  },

  name: "App"
};
</script>

<style scoped>
.mainboard {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.mainboard-workspace {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* .mainboard-toolbar {
  position: relative;
}

.mainboard-taskbar {
  position: relative;
} */
</style>
