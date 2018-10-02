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
      v-model="startMenu"
    >
      <v-menu
        v-model="contextMenu.visible"
        :position-x="contextMenu.x"
        :position-y="contextMenu.y"
        absolute
        offset-y
      >
        <v-list>
          <v-list-tile
            @click="''"
          >
            <v-list-tile-title v-on:click="addShortcutToDesktop">
              {{ 'Добавить ярлык на рабочий стол' }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

        <v-btn
            color="btnTaskbar"
            slot="activator"
            dark
            v-on:click="onClickBtnStart"
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

         <!--  <v-btn icon>
            <v-icon>view_module</v-icon>
          </v-btn> -->
        </v-toolbar>

        <!-- <v-list> -->
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

          <v-list
            v-if="!countSearchElements"
            class="mainboard-startmenu__categories"
          >
            <v-list-group

              class="mainboard-startmenu__category"
              v-for="item in items"
              v-bind:key="item.id"
            >
              <v-list-tile slot="activator">
                <i class="material-icons icon-folder">folder</i>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.label }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

                <v-list-tile
                  v-for="element in item.elements"
                  v-bind:key="element.id"
                  v-on:click="createNewWindow(element)"
                  v-on:contextmenu.prevent="showContextMenu(element, $event)"
                >
                  <img
                    :src="element.image"
                    v-bind:style="{width: '25px', marginRight: '5px'}"
                  />
                  <!-- <v-list-tile-content> -->
                    <v-list-tile-title>
                      {{ element.label }}
                    </v-list-tile-title>
                  <!-- </v-list-tile-content> -->
                  <!-- <v-btn fab dark small color="primary" v-on:click.stop="showContextMenu(indexItem, indexElement, $event)">
                    <v-icon dark>list</v-icon>
                  </v-btn> -->
                </v-list-tile>
            </v-list-group>
          </v-list>
          <v-list
            v-else
            class="mainboard-startmenu__categories"
          >
            <!-- <v-list-group
              v-else
              class="mainboard-startmenu__category"
            > -->
              <v-list-tile

                v-for="element in searchElements"
                v-bind:key="element.id"
                v-on:click="createNewWindow(element)"
                v-on:contextmenu.prevent="showContextMenu(element, $event)"
              >
                <img
                  :src="element.image"
                  v-bind:style="{width: '25px', marginRight: '5px'}"
                />
                <!-- <v-list-tile-content> -->
                  <v-list-tile-title>
                    {{ element.label }}
                  </v-list-tile-title>
                <!-- </v-list-tile-content> -->
                <!-- <v-btn fab dark small color="primary" v-on:click.stop="showContextMenu(indexItem, indexElement, $event)">
                  <v-icon dark>list</v-icon>
                </v-btn> -->
              </v-list-tile>
            <!-- </v-list-group> -->
          </v-list>

         <v-divider></v-divider>

        <v-list >

          <v-list-tile

          >
            <v-list-tile-content>
              <!-- <v-list-tile-title></v-list-tile-title> -->
              <v-text-field
                class="mainboard-startmenu__input-search"
                label="Поиск"
                v-model="inputSearch"
                append-icon="search"
              ></v-text-field>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
        <!-- </v-list> -->
      </v-card>
    </v-menu>

<!--     </v-flex>
  </v-layout> -->
</template>

<script>
import UserForm from "@/components/Desktop/Taskbar/UserForm.vue";

export default {
  data() {
    return {
      startMenu: false,
      contextMenu: {
        visible: false,
        x: 0,
        y: 0,
        indexItem: null,
        indexElement: null
      },
      inputSearch: ""
    };
  },
  components: {
    mainboardUserForm: UserForm
  },
  computed: {
    workspaces() {
      return this.$store.getters.getWorkspaces;
    },

    items() {
      return this.$store.getters.getItems;
    },

    searchElements() {
      let arrElements = [];
      if (this.inputSearch) {
        let regexp = new RegExp(this.inputSearch, "i");
        for (let i = 0; i < this.items.length; i++) {
          console.log("i", i);
          this.items[i].elements.forEach(function(element) {
            if (regexp.test(element.label)) {
              arrElements.push(element);
              console.log("element", element);
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
      this.$store.commit("createNewWindow", element);
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

    showContextMenu(element, event) {
      event.preventDefault();
      this.contextMenu.visible = false;
      this.contextMenu.x = event.clientX;
      this.contextMenu.y = event.clientY;
      this.contextMenu.element = element;
      this.$nextTick(() => {
        this.contextMenu.visible = true;
      });
    },

    addShortcutToDesktop() {
      const element = this.contextMenu.element;
      this.$store.dispatch("actionCreateNewShortcut", element);
      this.$store.dispatch("actionSaveSettingsDesktop");
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
  height: 500px;
  overflow-y: auto;
  overflow-x: hidden;
  /* width: 320px; */
}

.mainboard-startmenu__category {
  padding-right: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 320px;
}

.mainboard-startmenu__input-search {
  width: 100%;
}

.icon-folder {
  margin-right: 3px;
  color: #f58815;
}
</style>


