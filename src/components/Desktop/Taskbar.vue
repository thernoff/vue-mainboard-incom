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
            color="primary"
            @click="toggleMinimizeWindow(index)"
        >
            <span class="taskbar__minimize-window">{{ titleMinimizeWindow(window.title) }}</span>
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
    methods: {
        toggleMinimizeWindow(index) {
            this.$store.commit('toggleMinimizeWindow', index)
        },
        toggleVisibleStartMenu() {
            this.$store.dispatch('actionToggleVisibleStartMenu')
        },
        titleMinimizeWindow(title) {
            return (title.length < 10) ? title : title.substr(0, 10) + '...'
        },
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


