<template>
  <v-footer app dark color="primary">
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-btn
          color="primary"
          @click="toggleVisibleStartMenu"
        >
          <v-icon>home</v-icon>
      </v-btn>
      <v-btn
          v-for="(window, index) in windows"
          :key="index"
          v-if="!window.closed"
          :color="(!window.minimize) ? 'primary' : 'minimizeWindowTaskbar'"
          @click="toggleMinimizedWindow(index, window.minimize)"
      >
            <i class="material-icons" small v-if="window.minimize">
                expand_less
            </i>
            <span class="taskbar__minimize-window" :title="window.title">
                {{ titleMinimizeWindow(window.title) }}
            </span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
      >
          <v-icon>expand_more</v-icon>
      </v-btn>
  </v-footer>
</template>

<script>
export default {
    data() {
        return {
            //windows: this.getWindows()
        }
    },
    methods: {
        toggleMinimizedWindow(index, minimize) {
            console.log('minimize', minimize)
            this.$store.commit('toggleMinimizeWindow', index)
                if (minimize) {
                    this.$store.commit('setActiveWindow', index)
                }
            },
            toggleVisibleStartMenu() {
                this.$store.dispatch('actionToggleVisibleStartMenu')
            },
            titleMinimizeWindow(title) {
                return (title.length < 10) ? title : title.substr(0, 10) + '...'
            },
            getWindows() {
                return this.$store.getters.getWindows
            }
    },
    computed: {
        minimizeWindows() {
            return this.$store.getters.getMinimizeWindows
        },
        windows() {
            return this.$store.getters.getWindows
        }
    }
}
</script>

<style scoped>
    .taskbar__minimize-window {
        max-width: 85px;
        overflow: hidden;
        font-size: 12px;
    }
</style>


