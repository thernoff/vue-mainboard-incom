<template>
<div class="mainboard">
  <div class="mainboard-cover" v-if="visibleStartmenu" @click="toggleVisibleStartMenu"></div>
  <v-app>
    <v-navigation-drawer app temporary></v-navigation-drawer>

    <mainboard-toolbar></mainboard-toolbar>

    <v-content class="mainboard-workspace">
      <v-container fluid>
        <mainboard-window
          v-for="(window, index) in windows"
          v-if="!window.closed"
          v-show="!window.minimize"
          :key="index"
          :index="index"
          :options="window"
        ></mainboard-window>
        <mainboard-startmenu
          :workspaces="workspaces"
          v-if="visibleStartmenu"
        ></mainboard-startmenu>
        <!-- <router-view></router-view> -->
      </v-container>
    </v-content>

    <!-- <v-footer app dark color="primary"></v-footer> -->
    <mainboard-taskbar></mainboard-taskbar>
  </v-app>
</div>

</template>

<script>
import Taskbar from './components/Desktop/Taskbar'
import Toolbar from './components/Desktop/Toolbar'
import Startmenu from './components/Desktop/Startmenu'
import Window from './components/Desktop/Window'
export default {
  data () {
    return {
      counter: 0,
      workspaces: [
          {
              title: 'Тестовая область 1',
              description: ''
          },
          {
              title: 'Тестовая область 2',
              description: ''
          },
          {
              title: 'Тестовая область 3',
              description: ''
          }
      ],
    }
  },
  components: {
    mainboardTaskbar: Taskbar,
    mainboardToolbar: Toolbar,
    mainboardStartmenu: Startmenu,
    mainboardWindow: Window
  },
  computed: {
    visibleStartmenu() {
      return this.$store.getters.visibleStartmenu
    },
    windows() {
      return this.$store.getters.getWindows
    }
  },
  methods: {
    toggleVisibleStartMenu() {
        this.$store.dispatch('actionToggleVisibleStartMenu')
    }
  },
  name: 'App'
}
</script>

<style scoped>
.mainboard {
  width: 100%;
  height: 100%;
}

  .mainboard-workspace {
    overflow: hidden;
  }

  .mainboard-cover {
    position: absolute;
    width: 100%;
    height: 100vh;
    z-index: 10;
  }
</style>
