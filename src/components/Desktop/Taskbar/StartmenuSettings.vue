<template>
<div class="mainboard-startmenu-settings">
  <v-menu
    v-model="contextMenu.visible"
    :position-x="contextMenu.x"
    :position-y="contextMenu.y"
    absolute
    offset-y
    light
    z-index=2000
  >
    <v-list>
      <v-list-tile
        @click="''"
      >
        <v-list-tile-title
          v-on:click="''"
        >
          {{ 'Переименовать' }}
        </v-list-tile-title>
      </v-list-tile>

      <v-list-tile
        @click="''"
      >
        <v-list-tile-title
          v-on:click="''"
        >
          {{ 'Скрыть' }}
        </v-list-tile-title>
      </v-list-tile>

    </v-list>
  </v-menu>
<v-dialog width="800px" v-model="visible" persistent>
    <v-card light>
      <v-layout row>
          <v-flex xs12>
            <v-card-title class="primary mainboard-userform__title">
              <div class="headline">Настройка меню "Пуск"</div>
            </v-card-title>
          </v-flex>
        </v-layout>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <div class="container-categories" ref="categories">
              <mainboard-panel-elements
                v-for="(category, index) in localCategories"
                v-bind:key="category.id"
                v-bind:title="category.label"
                v-bind:elements="category.elements"
                v-bind:visibleCategory="parseInt(category.visible)"
                v-on:startSortable="startSortable"
                v-on:receiveSortable="receiveSortable"
                v-on:stopSortable="stopSortable"
                v-on:createNewCategory="createNewCategory(index)"
                v-on:updateTitleCategory="updateTitleCategory(index, $event)"
                v-on:toggleVisibityCategory="toggleVisibityCategory(index)"
                v-on:removeCategory="removeCategory(index)"
                v-on:showContextMenuElement="showContextMenuElement(index, $event)"
                v-on:updateTitleElement="updateTitleElement(index, $event)"
                v-on:toggleVisibityElement="toggleVisibityElement(index, $event)"
              >
              </mainboard-panel-elements>
            </div>
            </v-flex>
        </v-layout>
        <v-layout align-center>
          <v-flex text-xs-center>
            <v-btn
              v-on:click="saveCategories"
              color="info"
            >
              Сохранить
            </v-btn>
            <v-btn
              v-on:click="cancel"
              color="error"
            >
              Отмена
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
  </div>

<!-- </div> -->
</template>
<script>
import PanelElements from "@/components/Desktop/Taskbar/PanelElements.vue";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localCategories: [],
      startIndexElement: null,
      stopIndexElement: null,
      startIndexCategory: null,
      stopIndexCategory: null,
      contextMenu: {
        visible: false,
        x: 0,
        y: 0
      }
    };
  },
  components: {
    mainboardPanelElements: PanelElements
  },
  created() {
    console.log("this.categories", this.categories);
    this.localCategories = Object.assign([], this.categories);
  },
  watch: {
    categories: {
      handler() {
        //this.localCategories = Object.assign([], this.categories);
        this.localCategories = JSON.parse(JSON.stringify(this.categories));
        console.log(
          "watch categories this.localCategories",
          this.localCategories
        );
      },
      deep: true
    }
  },
  mounted() {
    const self = this;
    $(this.$refs.categories).sortable({
      scroll: false,
      axis: "y",
      tolerance: "pointer",
      items: ".mainboard-panel",
      connectWith: ".container-categories",
      handle: ".mainboard-panel__title",
      //placeholder: "placeholder-row",
      start: function(event, ui) {
        const startIndexCategory = $(this)
          .find(".mainboard-panel")
          .index(ui.item);
        self.startIndexCategory = startIndexCategory;
      },
      stop: function(event, ui) {
        const stopIndexCategory = $(this)
          .find(".mainboard-panel")
          .index(ui.item);
        self.stopIndexCategory = stopIndexCategory;
        self.updateOrderCategoriesToLocalCategories();
      }
    });
  },
  methods: {
    showContextMenuElement(indexCategory, { indexElement, event }) {
      console.log(indexCategory, indexElement, event);
      event.preventDefault();
      this.contextMenu.visible = false;
      this.contextMenu.x = event.clientX;
      this.contextMenu.y = event.clientY;
      this.$nextTick(() => {
        this.contextMenu.visible = true;
      });
    },

    createNewCategory(index) {
      let newCategory = {
        id: 0,
        server_id: 0,
        label: "Новая категория",
        opened: false,
        visible: 1,
        elements: []
      };
      this.localCategories.splice(index + 1, 0, newCategory);
    },

    startSortable({ startIndexElement, startIndexCategory }) {
      console.log("startSortable", startIndexElement, startIndexCategory);
      this.startIndexElement = startIndexElement;
      this.startIndexCategory = startIndexCategory;
    },

    receiveSortable({ stopIndexElement, stopIndexCategory }) {
      console.log("receiveSortable", stopIndexElement, stopIndexCategory);
      this.stopIndexElement = stopIndexElement;
      this.stopIndexCategory = stopIndexCategory;
      this.updateOrderElementsToLocalCategories();
    },

    stopSortable({ stopIndexElement, stopIndexCategory }) {
      console.log("stopSortable", stopIndexElement, stopIndexCategory);
      this.stopIndexElement = stopIndexElement;
      this.stopIndexCategory = stopIndexCategory;
      this.updateOrderElementsToLocalCategories();
    },

    updateOrderElementsToLocalCategories() {
      const startIndexElement = this.startIndexElement;
      const startIndexCategory = this.startIndexCategory;
      const stopIndexElement = this.stopIndexElement;
      const stopIndexCategory = this.stopIndexCategory;
      const element = this.localCategories[startIndexCategory].elements[
        startIndexElement
      ];
      this.localCategories[startIndexCategory].elements.splice(
        startIndexElement,
        1
      );
      this.localCategories[stopIndexCategory].elements.splice(
        stopIndexElement,
        0,
        element
      );

      this.startIndexElement = null;
      this.startIndexCategory = null;
      this.stopIndexElement = null;
      this.stopIndexCategory = null;

      console.log(
        "updateOrderElementsToLocalCategories this.localCategories",
        this.localCategories
      );
    },

    updateOrderCategoriesToLocalCategories() {
      const startIndexCategory = this.startIndexCategory;
      const stopIndexCategory = this.stopIndexCategory;
      const category = this.localCategories[startIndexCategory];

      this.localCategories.splice(startIndexCategory, 1);
      this.localCategories.splice(stopIndexCategory, 0, category);

      this.startIndexCategory = null;
      this.stopIndexCategory = null;
    },

    updateTitleCategory(index, title) {
      this.localCategories[index].label = title;
    },

    updateTitleElement(indexCategory, { indexElement, newTitleElement }) {
      //console.log(indexCategory, indexElement, newTitleElement);
      this.localCategories[indexCategory].elements[
        indexElement
      ].label = newTitleElement;
    },

    toggleVisibityElement(indexCategory, indexElement) {
      console.log(
        "toggleVisibityElement",
        this.localCategories[indexCategory].elements[indexElement].visible
      );
      const value = parseInt(
        this.localCategories[indexCategory].elements[indexElement].visible
      );
      console.log("value", value);
      this.localCategories[indexCategory].elements[indexElement].visible = value
        ? 0
        : 1;

      console.log(
        "toggleVisibityElement",
        this.localCategories[indexCategory].elements[indexElement].visible
      );
    },

    toggleVisibityCategory(index) {
      const value = parseInt(this.localCategories[index].visible);
      this.localCategories[index].visible = value ? 0 : 1;
    },

    removeCategory(index) {
      this.localCategories.splice(index, 1);
    },

    saveCategories() {
      this.$store
        .dispatch("actionSaveCategories", this.localCategories)
        .then(() => {
          this.localCategories = [];
          this.$emit("hideDialogWindow");
        });
    },

    cancel() {
      this.$emit("hideDialogWindow");
    }
  }
};
</script>

<style scoped>
.mainboard-panel-container {
  margin-bottom: 5px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px 15px;
}
</style>

