<template>
  <div class="mainboard-startmenu">
    <mainboard-startmenu-settings
      v-bind:categories="categories"
      v-bind:visible="visibleStartmenuSettings"
      v-on:hideDialogWindow="visibleStartmenuSettings = false"
    ></mainboard-startmenu-settings>
    <v-menu
      class="mainboard-startmenu__contextmenu-item"
      v-model="contextMenuItem.visible"
      :position-x="contextMenuItem.x"
      :position-y="contextMenuItem.y"
      absolute
      offset-y
      light
      z-index=1000
    >
      <v-list dense>
        <v-list-tile
          @click="''"
        >
          <v-list-tile-title v-on:click="addShortcutToDesktop">
            {{ 'Добавить ярлык на рабочий стол' }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu
      class="mainboard-startmenu__contextmenu-startbutton"
      v-model="contextMenuStartbutton.visible"
      :position-x="contextMenuStartbutton.x"
      :position-y="contextMenuStartbutton.y"
      absolute
      offset-y
      light
      z-index=1000
    >
      <v-list dense>
        <v-list-tile
          @click="''"
        >
          <v-list-tile-title v-on:click="showStartmenuSettings">
            {{ 'Свойства' }}
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu
      top
      offset-y
      light
      z-index="999"
      close-on-click
      :close-on-content-click="false"
      :close-delay="50"
      v-model="startMenu"
    >
      <v-btn
          color="btnTaskbar"
          slot="activator"
          dark
          v-on:click="onClickBtnStart"
          v-on:contextmenu.prevent.stop="showContextMenuStartbutton($event)"
        >
          <v-icon>home</v-icon>
      </v-btn>
      <v-card class="mainboard-startmenu">
        <v-toolbar color="primary" dark depressed>
          <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->

          <v-toolbar-title>
            {{ user.lastname + ' ' + user.firstname }}
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- <v-btn icon>
            <v-icon>settings</v-icon>
          </v-btn> -->
          <mainboard-user-form v-bind:user="user" v-on:click.native="onClickBtnSettingsUser"></mainboard-user-form>
          <!-- <mainboard-window-settings
            v-bind:user="user"
            v-on:click.native="onClickBtnSettingsUser"
            v-bind:categories="categories"
          ></mainboard-window-settings> -->

        </v-toolbar>
          <v-list
            v-if="!countSearchElements"
            class="mainboard-startmenu__categories"
            :style="{height: heightWorkspace * 0.45 + 'px'}"
          >
            <v-list-group
              class="mainboard-startmenu__category"
              v-for="category in categories"
              v-if="parseInt(category.visible)"
              v-bind:key="category.id"
            >
              <v-list-tile slot="activator">
                <i class="material-icons icon-folder">folder</i>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ category.label }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

                <v-list-tile
                  v-if="parseInt(element.visible)"
                  v-for="element in category.elements"
                  v-bind:key="element.id"
                  v-on:click="createNewWindow(element)"
                  v-on:contextmenu.prevent="showContextMenuItem(element, $event)"
                >
                  <img
                    :src="element.image"
                    v-bind:style="{width: '25px', marginRight: '5px'}"
                  />
                    <v-list-tile-title>
                      {{ element.label }}
                    </v-list-tile-title>
                </v-list-tile>
            </v-list-group>
          </v-list>
          <v-list
            v-else
            class="mainboard-startmenu__categories"
          >
              <v-list-tile

                v-for="element in searchElements"
                v-bind:key="element.id"
                v-on:click="createNewWindow(element)"
                v-on:contextmenu.prevent="showContextMenuItem(element, $event)"
              >
                <img
                  :src="element.image"
                  v-bind:style="{width: '25px', marginRight: '5px'}"
                />
                  <v-list-tile-title>
                    {{ element.label }}
                  </v-list-tile-title>
              </v-list-tile>
          </v-list>

         <v-divider></v-divider>

        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-text-field
                class="mainboard-startmenu__input-search"
                label="Поиск"
                v-model="inputSearch"
                append-icon="search"
              ></v-text-field>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <div class="text-md-center">
          <v-btn
            title="Обновить страницу"
            color="btnReload"
            dark
            v-on:click="reloadApp"
          >
            <i class="material-icons">cached</i>
          </v-btn>
          <v-btn
            title="Выход из системы"
            color="btnLogout"
            dark
            v-on:click="logoutApp"
          >
            <i class="material-icons">power_settings_new</i>
          </v-btn>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import axios from "axios";

import UserForm from "@/components/Desktop/Taskbar/UserForm.vue";
import WindowSettings from "@/components/Desktop/WindowSettings/WindowSettings.vue";
import StartmenuSettings from "@/components/Desktop/Taskbar/StartmenuSettings.vue";

export default {
  props: {
    heightWorkspace: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      startMenu: false,
      visibleStartmenuSettings: false,
      contextMenuItem: {
        visible: false,
        x: 0,
        y: 0,
        indexItem: null,
        indexElement: null
      },
      contextMenuStartbutton: {
        visible: false,
        x: 0,
        y: 0
      },
      inputSearch: ""
    };
  },
  components: {
    mainboardUserForm: UserForm,
    mainboardWindowSettings: WindowSettings,
    mainboardStartmenuSettings: StartmenuSettings
  },
  computed: {
    workspaces() {
      return this.$store.getters.getWorkspaces;
    },

    categories() {
      return this.$store.getters.categories;
    },

    searchElements() {
      let arrElements = [];
      if (this.inputSearch) {
        let regexp = new RegExp(this.inputSearch, "i");
        for (let i = 0; i < this.categories.length; i++) {
          console.log("i", i);
          this.categories[i].elements.forEach(function(element) {
            if (regexp.test(element.label)) {
              arrElements.push(element);
            }
          });
        }
      }
      return arrElements;
    },

    countSearchElements() {
      return this.searchElements.length;
    },

    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    createNewWindow(element) {
      this.startMenu = false;
      this.$store.dispatch("actionCreateNewWindow", element);
      this.$store.dispatch("actionToggleVisibleStartMenu");
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    onClickBtnStart() {
      this.inputSearch = "";
      this.$store.dispatch("actionSetNotActiveWindows");
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    onClickBtnSettingsUser() {
      console.log(this.searchElements);
      console.log("onClickBtnSettingsUser", this.user);
      //this.startMenu = false;
    },

    showContextMenuItem(element, event) {
      event.preventDefault();
      this.contextMenuItem.visible = false;
      this.contextMenuItem.x = event.clientX;
      this.contextMenuItem.y = event.clientY;
      this.contextMenuItem.element = element;
      this.$nextTick(() => {
        this.contextMenuItem.visible = true;
      });
    },

    showContextMenuStartbutton(event) {
      this.startMenu = false;
      event.preventDefault();
      this.contextMenuStartbutton.visible = false;
      this.contextMenuStartbutton.x = event.clientX;
      this.contextMenuStartbutton.y = event.clientY;
      this.$nextTick(() => {
        this.contextMenuStartbutton.visible = true;
      });
    },

    showStartmenuSettings() {
      this.visibleStartmenuSettings = true;
    },

    addShortcutToDesktop() {
      const element = this.contextMenuItem.element;
      this.$store.dispatch("actionCreateNewShortcut", element);
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    reloadApp() {
      window.location.href = "/";
    },

    logoutApp() {
      axios({
        method: "post",
        headers: { "Content-Type": "application/form-data" },
        url: window.location.href + "inner.php/extusers/fpage/logout/"
      })
        .then(() => {
          window.location.href = "/";
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  }
};
</script>

<style scoped>
.mainboard-startmenu {
  /* width: 300px; */
  overflow: hidden;
  /* position: absolute;
  left: 5px;
  bottom: 20px;
  z-index: 100; */
}

.mainboard-startmenu__categories {
  /* height: 500px; */
  overflow-y: auto;
  overflow-x: hidden;
  width: 320px;
}

.mainboard-startmenu__category {
  /* padding-right: 10px;
  overflow-y: scroll;
  overflow-x: hidden; */
  width: 320px;
}

.mainboard-startmenu__input-search {
  width: 100%;
}

.icon-folder {
  margin-right: 3px;
  color: #f58815;
}

.contextmenu-item {
  height: 32px;
}
</style>


