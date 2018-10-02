<template>
  <!-- <v-footer app dark color="primary"> -->
    <v-footer
      class="mainboard-taskbar"
      dark
      color="primary"
    >
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <!-- <v-btn
          color="primary"
          @click="toggleVisibleStartMenu"
        >
          <v-icon>home</v-icon>
      </v-btn> -->
      <mainboard-startmenu></mainboard-startmenu>
      <v-btn
        v-for="(window, index) in windows"
        :key="index"
        v-if="!window.closed"
        :color="(!window.minimize) ? 'primary' : 'minimizeWindowTaskbar'"
        class="mainboard-taskbar__btn-minimize-window"
        :style="{minWidth: widthBtnMinimizeWindows + '%', width: widthBtnMinimizeWindows + '%'}"
        v-on:click="toggleMinimizedWindow(index, window.minimize)"
      >
        <i class="material-icons" small v-if="window.minimize">
            expand_less
        </i>
        <span class="mainboard-taskbar__minimize-window" :title="window.title">
            {{ titleMinimizeWindow(window.title) }}
        </span>
      </v-btn>
      <v-spacer></v-spacer>
      <!-- <v-btn
          color="primary"
      >
          <v-icon>expand_more</v-icon>
      </v-btn> -->
  </v-footer>
</template>

<script>
import StartMenu from "@/components/Desktop/Taskbar/Startmenu.vue";
export default {
  data() {
    return {
      visibleTaskbar: true
      //windows: this.getWindows()
    };
  },
  components: {
    mainboardStartmenu: StartMenu
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
    }
  },

  computed: {
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
</style>


