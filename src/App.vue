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
        <mainboard-grid
          ref="grid"
        ></mainboard-grid>
          <!-- <v-layout row wrap> -->
            <mainboard-window
              v-for="(window, index) in windows"
              v-if="!window.closed"
              v-show="!window.minimize"
              :key="window.id"
              :index="index"
              :options="window"
            ></mainboard-window>
          <!-- </v-layout> -->
        <mainboard-startmenu
          v-if="visibleStartmenu"
        ></mainboard-startmenu>
        <!-- <router-view></router-view> -->
      <!-- </v-container> -->
    </div>
    <mainboard-taskbar class="mainboard-taskbar"></mainboard-taskbar>
  </v-app>


</template>

<script>
import Taskbar from "./components/Desktop/Taskbar";
import Toolbar from "./components/Desktop/Toolbar";
import Startmenu from "./components/Desktop/Startmenu";
import Window from "./components/Desktop/Window";
import Grid from "./components/Desktop/Grid";
import Cover from "./components/Desktop/Cover";
import ResizableBlock from "./components/Desktop/ResizableBlock";

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
    }
  },

  beforeCreate() {
    /* this.$store.commit("setActiveWorkspace");
    let activeWorkspace = this.$store.getters.getActiveWorkspace;
    this.$store.commit("setWindows", activeWorkspace.windows);
    this.$store.commit("setActiveWindow"); */
  },

  mounted() {
    console.log("WINDOWS", this.windows);
    const self = this;

    this.$store.commit("setWidthGrid", this.$refs.grid.$el.clientWidth);
    this.$store.commit("setHeightGrid", this.$refs.grid.$el.clientHeight);
    this.$store.dispatch("actionGetDashboard");

    window.addEventListener("resize", function() {
      const oldWidthGrid = self.$store.getters.getWidthGrid;
      const oldHeightGrid = self.$store.getters.getHeightGrid;
      const newWidthGrid = self.$refs.grid.$el.clientWidth;
      const newHeightGrid = self.$refs.grid.$el.clientHeight;
      console.log("resize window");
      console.log(oldWidthGrid);
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
