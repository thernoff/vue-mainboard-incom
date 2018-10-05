<template>
  <div
    class="mainboard-panel"
    :class="{
      'mainboard-panel--noelements': countElements == 0,
      'mainboard-panel--hidden1': !visibleCategory
    }"
  >
    <div
      class="mainboard-panel-elements"
    >
      <v-card
          tile
          class="mainboard-panel__card"
          light
        >
          <v-card-title
            class="mainboard-panel__title title-panel"
            :class="{
              'hidden': !visibleCategory
            }"
            primary-title
          >
            <span v-if="!renameTitleCategory">{{ title }}</span>
            <input
              class="panel-title__input"
              ref="inputRenameTitleCategory"
              v-show="renameTitleCategory && visibleCategory"
              v-bind:value="title"
              v-on:blur="updateTitleCategory"
              v-on:keyup.enter="updateTitleCategory"
            />
            <v-spacer></v-spacer>
            <v-btn
              icon small
              class="mainboard-panel__btn"
              title="Редактировать"
              v-show="!renameTitleCategory && visibleCategory"
              v-on:click="showInputRenameTitleCategory"
            >
                <!-- <v-icon color="white">fas fa-arrow-left</v-icon> -->
                <v-icon color="white">create</v-icon>
            </v-btn>
            <v-btn icon small class="mainboard-panel__btn" title="Сохранить" v-show="renameTitleCategory && visibleCategory" v-on:click="updateTitleCategory">
                <v-icon color="white">save</v-icon>
            </v-btn>
            <v-btn icon small class="mainboard-panel__btn" title="Создать новую категорию" v-show="visibleCategory" v-on:click="createNewCategory">
                <v-icon color="white">add</v-icon>
            </v-btn>
            <v-btn icon small class="mainboard-panel__btn" title="Отображать" v-show="visibleCategory" v-on:click="toggleVisibityCategory">
                <v-icon color="white">visibility_off</v-icon>
            </v-btn>
            <v-btn icon small class="mainboard-panel__btn" title="Скрыть" v-show="!visibleCategory" v-on:click="toggleVisibityCategory">
                <v-icon color="white">visibility</v-icon>
            </v-btn>
            <v-btn icon small class="mainboard-panel__btn" title="Удалить" v-show="!countElements && visibleCategory" v-on:click="removeCategory">
                <v-icon color="white">delete</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="mainboard-panel__body" ref="body">
            <div class="mainboard-panel__element sortable-element"
              v-for="(element, index) in elements"
              v-bind:key="element.id"
              :class="{
                'hidden': !visibleCategory
              }"
              v-on:contextmenu.prevent="showContextMenuElement(index, $event)"
            >
              <img :src="element.image" alt="" :class="{'hidden-image': !parseInt(element.visible)}">
              <div class="sortable-element__caption">
                <span v-if="indexRenameElement !== index">{{element.label}}</span>
                <input
                  class="element-label__input"
                  ref="inputRenameTitleElement"
                  v-show="parseInt(element.visible) && indexRenameElement === index"
                  v-bind:value="element.label"
                  v-on:blur="updateTitleElement(index)"
                  v-on:keyup.enter="updateTitleElement(index)"
                />
              </div>
              <div class="element-buttons">
                <ul class="element-buttons__list" v-show="visibleCategory">
                  <li>
                    <v-btn
                      fab dark small
                      color="primary" class="element-buttons__button"
                      title="Переименовать"
                      v-show="parseInt(element.visible) && indexRenameElement !== index"
                      v-on:click="showInputRenameTitleElement(index)">
                      <v-icon dark class="element-buttons__icon">create</v-icon>
                    </v-btn>
                  </li>
                  <li>
                    <v-btn
                      fab dark small
                      color="primary" class="element-buttons__button"
                      title="Сохранить"
                      v-show="parseInt(element.visible) && indexRenameElement === index"
                      v-on:click="updateTitleElement(index)">
                      <v-icon dark class="element-buttons__icon">save</v-icon>
                    </v-btn>
                  </li>
                  <li v-show="!parseInt(element.visible)">
                    <v-btn fab dark small color="primary" class="element-buttons__button" title="Скрыть" v-on:click="toggleVisibityElement(index)">
                      <v-icon dark class="element-buttons__icon">visibility</v-icon>
                    </v-btn>
                  </li>
                  <li v-show="parseInt(element.visible)">
                    <v-btn fab dark small color="primary" class="element-buttons__button" title="Отображать" v-on:click="toggleVisibityElement(index)">
                      <v-icon dark class="element-buttons__icon">visibility_off</v-icon>
                    </v-btn>
                  </li>
                </ul>
              </div>
            </div>
          </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    elements: {
      type: Array,
      required: true
    },
    visibleCategory: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      titleElement: "",
      indexRenameElement: null,
      renameTitleElement: false,
      renameTitleCategory: false
    };
  },
  computed: {
    countElements() {
      return this.elements.length;
    }
  },
  mounted() {
    const self = this;
    $(this.$refs.body).sortable({
      tolerance: "pointer",
      items: ".sortable-element",
      connectWith: ".mainboard-panel__body",
      distance: 5,
      start: function(event, ui) {
        const $body = $(this);
        const startIndexElement = $(this)
          .find(".sortable-element")
          .index(ui.item);
        //console.log("startIndexElement", startIndexElement);

        const $panel = $body.closest(".mainboard-panel");
        const startIndexCategory = $(".mainboard-panel").index($panel);
        self.$emit("startSortable", {
          startIndexElement,
          startIndexCategory
        });

        //console.log("startIndexCategory", startIndexCategory);
      },
      receive: function(event, ui) {
        //console.log("element receive ui", ui);
        const $body = $(this);
        const stopIndexElement = $(this)
          .find(".sortable-element")
          .index(ui.item);
        //console.log("stopIndexElement", stopIndexElement);

        const $panel = $body.closest(".mainboard-panel");

        const stopIndexCategory = $(".mainboard-panel").index($panel);
        //console.log("stopIndexCategory", stopIndexCategory);

        self.$emit("receiveSortable", {
          stopIndexElement,
          stopIndexCategory
        });
      },
      stop: function(event, ui) {
        //console.log("element stop ui", ui);
        const $body = $(this);
        const stopIndexElement = $(this)
          .find(".sortable-element")
          .index(ui.item);
        if (stopIndexElement >= 0) {
          //console.log("stopIndexElement", stopIndexElement);
          const $panel = $body.closest(".mainboard-panel");
          const stopIndexCategory = $(".mainboard-panel").index($panel);
          //console.log("stopIndexCategory", stopIndexCategory);

          self.$emit("stopSortable", {
            stopIndexElement,
            stopIndexCategory
          });
        }
      }
    });
  },
  methods: {
    showContextMenuElement(indexElement, event) {
      //this.$emit("showContextMenuElement", { indexElement, event });
    },

    createNewCategory() {
      console.log("createNewCategory");
      this.$emit("createNewCategory");
    },

    showInputRenameTitleElement(indexElement) {
      /* console.log("showInputRenameTitleElement this.$refs", this.$refs);
      console.log(
        "showInputRenameTitleElement this.$refs.inputRenameTitleElement[indexElement]",
        this.$refs.inputRenameTitleElement[indexElement]
      ); */
      this.indexRenameElement = indexElement;
      this.renameTitleElement = true;
      this.$nextTick(() => {
        this.$refs.inputRenameTitleElement[indexElement].focus();
      });
    },

    showInputRenameTitleCategory() {
      this.renameTitleCategory = true;
      this.$nextTick(() => this.$refs.inputRenameTitleCategory.focus());
    },

    updateTitleElement(indexElement) {
      const newTitleElement = this.$refs.inputRenameTitleElement[indexElement]
        .value;
      console.log("newTitleElement", newTitleElement);
      //if (this.title !== newTitleCategory) {
      this.$emit("updateTitleElement", { indexElement, newTitleElement });
      //}
      this.indexRenameElement = null;
    },

    updateTitleCategory() {
      const newTitleCategory = this.$refs.inputRenameTitleCategory.value;
      if (this.title !== newTitleCategory) {
        this.$emit("updateTitleCategory", newTitleCategory);
      }
      this.renameTitleCategory = false;
    },

    toggleVisibityElement(indexElement) {
      this.$emit("toggleVisibityElement", indexElement);
    },

    toggleVisibityCategory() {
      this.$emit("toggleVisibityCategory");
    },

    removeCategory() {
      this.$emit("removeCategory");
    }
  }
};
</script>

<style>
.mainboard-panel {
  position: relative;
  min-height: 170px;
}

.mainboard-panel--hidden {
  opacity: 0.4;
}

.mainboard-panel--noelements {
  height: 170px;
}

.mainboard-panel-elements {
  position: relative;
  width: 100%;
  height: 100%;
}

.mainboard-panel__card {
  position: relative;
  width: 100%;
  height: 100%;
}

.mainboard-panel__title {
  padding: 0 8px;
  height: 30px;
  background-color: #3b5375;
  color: #fff;
  font-size: 16px;
  overflow: hidden;
  cursor: move;
}

.mainboard-panel__title--hidden {
  background-color: #5c5c5c;
}

.panel-title__input {
  padding: 0 8px;
  background-color: #fff;
  color: #000;
  font-size: 16px;
  height: 22px;
  border-radius: 2px;
}

.mainboard-panel__btn {
  margin: 0;
  opacity: 1 !important;
}

.mainboard-panel__body {
  height: calc(100% - 30px);
}

.mainboard-panel__element {
  width: 80px;
  position: relative;
  display: inline-block;
  margin-right: 20px;
  /* margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 5px; */
  vertical-align: top;
  text-align: center;
}

.element-label__input {
  width: 95%;
  height: 22px;
  padding: 0 4px;
  background-color: #fff;
  color: #000;
  font-size: 13px;
  text-align: center;
  border: 1px solid rgb(44, 119, 190);
  border-radius: 3px;
}

.element-buttons {
  position: absolute;
  top: 0px;
  right: -20px;
}

.element-buttons__list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.element-buttons__button {
  width: 23px !important;
  height: 23px !important;
  margin: 2px 3px;
}

.element-buttons__icon {
  font-size: 1.2em !important;
}

.sortable-element {
  cursor: move;
}

.mainboard-panel__img {
  margin: 0px auto;
  width: 64px;
  height: 64px;
  display: inline-block;
  max-width: 100%;
  height: auto;
  padding: 4px;
  line-height: 1.42857143;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.sortable-element__caption {
  font-size: 12px;
}

.hidden {
  opacity: 0.4;
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray; /* IE 6-9 */
}

.hidden-image {
  opacity: 0.4;
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: grayscale(100%);
  filter: gray; /* IE 6-9 */
}

.hidden .hidden-image {
  opacity: 1 !important;
}
</style>
