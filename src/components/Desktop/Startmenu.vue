<template>
    <!-- <v-layout row>
    <v-flex xs12 sm6 offset-sm3> -->
      <v-menu
        top
        offset-y
        light
        z-index="9999"
        close-on-click
        :close-on-content-click="false"
        :close-delay="50"
        v-model="showMenu"
      >
      <v-btn
          color="primary"
          slot="activator"
          v-on:click="onClickBtnStart"
        >
          <v-icon>home</v-icon>
      </v-btn>
      <v-card id="startmenu" class="mainboard-startmenu">
        <v-toolbar color="primary" dark depressed>
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

          <v-toolbar-title>
            Гость
          </v-toolbar-title>
          <!-- <v-spacer></v-spacer> -->

          <!-- <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn> -->

         <!--  <v-btn icon>
            <v-icon>view_module</v-icon>
          </v-btn> -->
        </v-toolbar>

        <v-list>
          <!-- <v-subheader inset>Рабочие области</v-subheader>
          <v-list-tile
            @click="createNewWorkspace"
          >
            <v-list-tile-content>
              <v-list-tile-title>
                Создать новую рабочую область
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(workspace, index) in workspaces"
            :key="index"
            avatar
            v-on:click="setActiveWorkspace(index)"
          >
            <v-list-tile-avatar>
              <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              <v-icon>view_module</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{ workspace.title }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ workspace.description }}</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon ripple>
                <v-icon color="grey lighten-1">info</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider></v-divider> -->

          <v-list class="mainboard-startmenu__categories">
                <v-list-group
                  class="mainboard-startmenu__category"
                  v-for="(item, indexItem) in items"
                  v-bind:key="item.id"
                >
                  <v-list-tile slot="activator">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ item.label }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                    <v-list-tile
                      v-for="(element, indexElement) in item.elements"
                      v-bind:key="element.id"
                      @click="createNewWindow(indexItem, indexElement)"
                    >
                    <img
                      :src="element.image"
                      v-bind:style="{width: '25px', marginRight: '5px'}"
                    />
                      <v-list-tile-content>
                        <v-list-tile-title @click="''">{{ element.label }}</v-list-tile-title>
                      </v-list-tile-content>

                    </v-list-tile>
                </v-list-group>
        </v-list>
        </v-list>
      </v-card>
      </v-menu>

<!--     </v-flex>
  </v-layout> -->
</template>

<script>
export default {
  data() {
    return {
      showMenu: false
    };
  },

  methods: {
    createNewWorkspace() {
      //let activeWorkspace = this.$store.commit('createNewWorkspace')
      this.$store.dispatch("actionCreateNewWorkspace");
      //let windows = this.$store.getters.getWindowsActiveWorkspace;
      //this.$store.commit('setWindows', windows)
      //this.$store.dispatch("actionSetWindows", windows);
      //this.$store.dispatch("actionSetActiveWindow");

      this.$store.dispatch("actionToggleVisibleStartMenu");
    },

    setActiveWorkspace(index) {
      this.$store.dispatch("actionSetActiveWorkspace", index);
      this.$store.dispatch("actionToggleVisibleStartMenu");
    },

    createNewWindow(indexItem, indexElement) {
      this.showMenu = false;
      const itemStartMenu = this.$store.getters.getItemStartMenu(
        indexItem,
        indexElement
      );
      this.$store.commit("createNewWindow", itemStartMenu);
      this.$store.dispatch("actionToggleVisibleStartMenu");
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    onClickBtnStart() {
      this.$store.dispatch("actionSetNotActiveWindows");
      this.$store.dispatch("actionSaveSettingsDesktop");
    }
  },

  computed: {
    workspaces() {
      return this.$store.getters.getWorkspaces;
    },

    items() {
      return this.$store.getters.getItems;
    }
  }
};
</script>

<style scoped>
.mainboard-startmenu {
  width: 300px;
  overflow: hidden;
  /* position: absolute;
  left: 5px;
  bottom: 20px;
  z-index: 100; */
}

.mainboard-startmenu__categories {
  height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 320px;
}

.mainboard-startmenu__category {
  overflow-y: scroll;
  overflow-x: hidden;
  width: 320px;
}
</style>


