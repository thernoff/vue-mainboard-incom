<template>
<div class="mainboard-startmenu-settings">
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
                v-for="category in localCategories"
                v-bind:key="category.id"
                v-bind:title="category.label"
                v-bind:elements="category.elements"
                v-on:createNewCategory="createNewCategory"
                v-on:startSortable="startSortable"
                v-on:receiveSortable="receiveSortable"
                v-on:stopSortable="stopSortable"
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
      stopIndexCategory: null
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
    categories(newVal, oldVal) {
      //this.localCategories = Object.assign([], this.categories);
      this.localCategories = JSON.parse(JSON.stringify(this.categories));
      console.log(
        "watch categories this.localCategories",
        this.localCategories
      );
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
      handle: ".mainboard-panel-elements__title",
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
    createNewCategory() {
      console.log("createNewCategory categories", this.categories);
      let newCategory = {
        id: 0,
        server_id: 0,
        label: "Новая категория",
        opened: false,
        visible: 1,
        elements: []
      };
      this.categories.push(newCategory);
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

