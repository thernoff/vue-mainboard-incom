<template>
  <!-- <v-footer app dark color="primary"> -->
    <v-footer
      class="mainboard-taskbar"
      dark
      color="primary"
    >
    <v-menu
      v-model="contextMenuMinimizeButton.visible"
      :position-x="contextMenuMinimizeButton.x"
      :position-y="contextMenuMinimizeButton.y"
      absolute
      offset-y
      light
    >
      <v-list>
        <v-list-tile
          v-on:click="closeWindow"
        >
          <v-list-tile-title
            v-on:click="''"
          >
            {{ 'Закрыть окно' }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <!-- <v-btn
          color="primary"
          @click="toggleVisibleStartMenu"
        >
          <v-icon>home</v-icon>
      </v-btn> -->
      <mainboard-startmenu v-bind:heightWorkspace="heightWorkspace"></mainboard-startmenu>
      <v-btn
        v-for="(window, index) in windows"
        :key="index"
        v-if="!window.closed"
        :color="(!window.minimize) ? 'primary' : 'minimizeWindowTaskbar'"
        class="mainboard-taskbar__btn-minimize-window"
        :style="{minWidth: widthBtnMinimizeWindows + '%', width: widthBtnMinimizeWindows + '%'}"
        v-on:click="toggleMinimizedWindow(index, window.minimize)"
        v-on:contextmenu.prevent.stop="showContextMenuMinimizeButton(index, $event)"
      >
        <i class="material-icons" small v-if="window.minimize">
            expand_less
        </i>
        <span class="mainboard-taskbar__minimize-window" :title="window.title">
            {{ titleMinimizeWindow(window.title) }}
        </span>
      </v-btn>
      <v-spacer></v-spacer>
      <mainboard-system-clock></mainboard-system-clock>
      <v-btn
        class="btn-minimize-windows"
        color="primary"
        title="Свернуть все окна"
        v-if="!showBtnRestoreMinimizeWindow"
        v-on:click="minimizeWindows"
      >
          <v-icon>expand_more</v-icon>
      </v-btn>
      <v-btn
        class="btn-restore-windows"
        color="primary"
        title="Восстановить свернутые окна"
        v-if="showBtnRestoreMinimizeWindow"
        v-on:click="restoreMinimizeWindows"
      >
          <v-icon>expand_less</v-icon>
      </v-btn>
  </v-footer>
</template>

<script>
import StartMenu from "@/components/Desktop/Taskbar/Startmenu.vue";
import SystemClock from "@/components/Desktop/Taskbar/SystemClock.vue";
export default {
  data() {
    return {
      visibleTaskbar: true,
      arrIndexesWindowsRestore: [],
      indexCloseWindow: null,
      contextMenuMinimizeButton: {
        visible: false,
        x: 0,
        y: 0
      }
    };
  },
  components: {
    mainboardStartmenu: StartMenu,
    mainboardSystemClock: SystemClock
  },

  computed: {
    showBtnRestoreMinimizeWindow() {
      return this.arrIndexesWindowsRestore.length;
    },

    windows() {
      return this.$store.getters.windows;
    },

    widthBtnMinimizeWindows() {
      const countWindows = this.windows.length + 3;
      const widthGrid = this.$store.getters.widthGrid;
      const widthBtnMinimizeWindows = widthGrid / countWindows;
      return widthBtnMinimizeWindows > 120
        ? Math.floor((1000 * 120) / widthGrid) / 10
        : Math.floor((1000 * widthBtnMinimizeWindows) / widthGrid) / 10;
    },

    heightWorkspace() {
      return this.$store.state.desktop.heightWorkspace;
    }
  },

  methods: {
    toggleVisibleTaskbar() {
      this.visibleTaskbar = !this.visibleTaskbar;
    },

    toggleMinimizedWindow(index, minimize) {
      console.log("minimize", minimize, index);
      this.$store.commit("toggleMinimizeWindow", index);
      if (minimize) {
        this.$store.commit("setActiveWindow", index);
      }
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    toggleVisibleStartMenu() {
      this.$store.dispatch("actionToggleVisibleStartMenu");
    },

    titleMinimizeWindow(title) {
      return title.length < 10 ? title : title.substr(0, 10) + "...";
    },

    minimizeWindows() {
      this.windows.forEach((window, index) => {
        if (!window.minimize) {
          this.arrIndexesWindowsRestore.push(index);
        }
      });
      this.$store.dispatch("actionMinimizeWindows");
    },

    restoreMinimizeWindows() {
      this.$store
        .dispatch("actionRestoreMinimizeWindows", this.arrIndexesWindowsRestore)
        .then((this.arrIndexesWindowsRestore = []));
    },

    showContextMenuMinimizeButton(index, event) {
      event.preventDefault();
      this.indexCloseWindow = index;
      this.contextMenuMinimizeButton.visible = false;
      this.contextMenuMinimizeButton.x = event.clientX;
      this.contextMenuMinimizeButton.y = event.clientY;
      this.$nextTick(() => {
        this.contextMenuMinimizeButton.visible = true;
      });
    },

    closeWindow() {
      this.$store.dispatch("actionCloseWindow", this.indexCloseWindow);
      this.$store.dispatch("actionSaveSettingsDesktop");
    }
  }
};
</script>

<style scoped>
.mainboard-taskbar__minimize-window {
  max-width: 85px;
  overflow: hidden;
  font-size: 12px;
}

.mainboard-taskbar__btn-minimize-window {
  max-width: 120px;
  margin: 8px 3px;
  padding: 5px;
}

.btn-minimize-windows,
.btn-restore-windows {
  min-width: 30px;
  padding: 0 10px;
}
</style>


