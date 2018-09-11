<template>
    <!-- <v-layout row>
    <v-flex xs12 sm6 offset-sm3> -->
      <v-card id="startmenu">
        <v-toolbar color="light-blue" dark>
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

          <v-toolbar-title>My files</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>

         <!--  <v-btn icon>
            <v-icon>view_module</v-icon>
          </v-btn> -->
        </v-toolbar>

        <v-list two-line subheader>
          <v-subheader inset>Рабочие области</v-subheader>

          <v-list-tile
            v-for="(workspace, index) in workspaces"
            :key="index"
            avatar
            @click="''"
          >
            <v-list-tile-avatar>
              <!-- <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon> -->
              <v-icon>view_module</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ workspace.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ workspace.description }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <!-- <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action> -->
          </v-list-tile>

          <v-divider></v-divider>

          <v-list>
          <v-list-group

          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>Все элементы</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              v-for="(item, index) in items"
              :key="index"
              @click="''"
            >
              <v-list-tile-content>
                <v-list-tile-title @click="createNewWindow(index)">{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>

            </v-list-tile>
          </v-list-group>
        </v-list>
        </v-list>
      </v-card>
<!--     </v-flex>
  </v-layout> -->
</template>

<script>
export default {
    data() {
        return {
        }
    },
    props: ['workspaces'],
    methods: {
      createNewWindow(index) {
        const itemStartMenu = this.$store.getters.getItemStartMenu(index)
        this.$store.commit('createNewWindow', itemStartMenu)
        this.$store.dispatch('actionToggleVisibleStartMenu')
      }
    },
    computed: {
      items() {
        return this.$store.getters.getItems
      }
    }
}
</script>

<style scoped>
    #startmenu {
        width: 300px;
        position: absolute;
        left: 5px;
        bottom: 20px;
        z-index: 100;
    }
</style>


