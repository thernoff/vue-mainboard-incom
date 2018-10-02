<template>

  <v-app class="mainboard">

    <!-- <v-navigation-drawer app temporary></v-navigation-drawer> -->
    <mainboard-toolbar class="mainboard-toolbar"></mainboard-toolbar>

    <div class="mainboard-workspace">
      <!-- <mainboard-cover
        v-if="visibleStartmenu"
        v-on:click.native="toggleVisibleStartMenu"
      >
      </mainboard-cover> -->
      <!-- <v-container fluid> -->
          <!-- <v-layout row wrap> -->
        <mainboard-shortcut-list :shortcuts="shortcuts"></mainboard-shortcut-list>
        <mainboard-window
          v-for="(window, index) in windows"
          v-if="!window.closed"
          v-show="!window.minimize"
          :key="window.id"
          :index="index"
          :options="window"
        ></mainboard-window>
        <mainboard-grid
          ref="grid"
        ></mainboard-grid>
          <!-- </v-layout> -->
        <mainboard-startmenu
          v-if="visibleStartmenu"
        ></mainboard-startmenu>
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

export default {
  data() {
    return {};
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
    mainboardResizableBlock: ResizableBlock
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

  beforeCreate() {
    /* this.$store.commit("setActiveWorkspace");
    let activeWorkspace = this.$store.getters.getActiveWorkspace;
    this.$store.commit("setWindows", activeWorkspace.windows);
    this.$store.commit("setActiveWindow"); */
  },

  mounted() {
    //console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    const self = this;
    this.$store.dispatch("actionGetDashboard");
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
      console.log("options", options);
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
