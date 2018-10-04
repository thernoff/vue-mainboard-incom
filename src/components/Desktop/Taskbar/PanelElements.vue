<template>
  <div
    class="mainboard-panel"
    :class="{'mainboard-panel--noelements': countElements == 0}"
  >
    <div
      class="mainboard-panel-elements"
    >
      <v-card
          tile
          class="mainboard-panel-elements__card"
          light
        >
          <v-card-title
            class="mainboard-panel-elements__title"
            primary-title
          >
            <h3 >{{ title }}</h3>
            <v-spacer></v-spacer>
            <v-btn icon small class="mainboard-panel-elements__btn" title="Редактировать">
                <!-- <v-icon color="white">fas fa-arrow-left</v-icon> -->
                <v-icon color="white">create</v-icon>
            </v-btn>
            <v-btn icon small class="mainboard-panel-elements__btn" title="Добавить" v-on:click="createNewCategory">
                <v-icon color="white">add</v-icon>
            </v-btn>
            <v-btn icon small class="mainboard-panel-elements__btn" title="Отображать">
                <v-icon color="white">visibility</v-icon>
            </v-btn>
            <v-btn icon small class="mainboard-panel-elements__btn" title="Скрыть">
                <v-icon color="white">visibility_off</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text class="mainboard-panel-elements__body" ref="body">
            <div class="mainboard-panel-elements__element sortable-element"
              v-for="element in elements"
              v-bind:key="element.id"
            >
              <img :src="element.image" alt="">
              <div class="sortable-element__caption">
                <span>{{element.label}}</span>
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
    }
  },
  data() {
    return {
      orderElement: {
        startIndexElement: null,
        startIndexCategory: null,
        stopIndexElement: null,
        stopIndexCategory: null,
        stopIndexElement: null,
        stopIndexCategory: null
      }
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
      connectWith: ".mainboard-panel-elements__body",
      distance: 5,
      start: function(event, ui) {
        const $body = $(this);
        self.orderElement.startIndexElement = $(this)
          .find(".sortable-element")
          .index(ui.item);
        const startIndexElement = $(this)
          .find(".sortable-element")
          .index(ui.item);
        //console.log("startIndexElement", startIndexElement);

        const $panel = $body.closest(".mainboard-panel");
        self.orderElement.startIndexCategory = $(".mainboard-panel").index(
          $panel
        );
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
        //self.updateOrderElements();

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
          //self.updateOrderElements();
          self.$emit("stopSortable", {
            stopIndexElement,
            stopIndexCategory
          });
        }
      }
    });
  },
  methods: {
    createNewCategory() {
      console.log("createNewCategory");
      this.$emit("createNewCategory");
    },

    updateOrderElements(data) {
      //this.$emit("updateOrderElements", data);
      console.log(this.orderElement);
    }
  }
};
</script>

<style>
.mainboard-panel {
  position: relative;
  min-height: 170px;
}

.mainboard-panel--noelements {
  height: 170px;
}

.mainboard-panel-elements {
  position: relative;
  width: 100%;
  height: 100%;
}

.mainboard-panel-elements__card {
  position: relative;
  width: 100%;
  height: 100%;
}

.mainboard-panel-elements__title {
  height: 30px;
  background-color: #4470e9;
  border-color: #d5b5c4;
  border-bottom-color: rgb(213, 181, 196);
  border-bottom: 1px solid transparent;
  overflow: hidden;
  cursor: move;
}

.mainboard-panel-elements__body {
  height: calc(100% - 30px);
}

.mainboard-panel-elements__element {
  width: 80px;
  position: relative;
  display: inline-block;
  margin: 5px;
  /* margin-top: 5px;
  margin-right: 5px;
  margin-bottom: 5px; */
  vertical-align: top;
  text-align: center;
}

.sortable-element {
  cursor: move;
}

.mainboard-panel-elements__img {
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
</style>
