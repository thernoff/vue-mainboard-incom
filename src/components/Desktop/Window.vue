<template>
<div
    ref="window"
    class="mainboard-window"
    :data-index="index"
    :style="{
        top: options.top * heightWorkspace / 100 + 'px',
        left: options.left * widthWorkspace / 100 + 'px',
        width: options.width + '%',
        height: options.height + '%',
        zIndex: options.zIndex,
    }"
    :class="[{'fullscreen': options.fullscreen}, options.classesCss.join(' ')]"
>
  <v-card
    tile
    class="mainboard-window__card"
  >
    <v-card-title
        class="mainboard-window__header"
        :class = "{'titleWindow': options.active, 'indigo lighten-4': !options.active}"
        v-on:mousedown="setActiveWindow"
        v-on:dblclick="toggleFullscreenWindow"
        primary-title
        :title="options.title"
    >
        <div class="mainboard-window__title">{{ options.title }}</div>
        <v-spacer></v-spacer>
        <div class="mainboard-window__group-buttons">
          <v-btn icon small class="mainboard-window__btn" v-if="showBtnBack" v-on:click="back" title="Назад">
              <v-icon color="white">fas fa-arrow-left</v-icon>
          </v-btn>
          <!-- <v-btn icon small class="mainboard-window__btn" @click="toggleClassWindow('mainboard-window--fullheight')" title="Развернуть по высоте">
              <v-icon color="white">fas fa-arrows-alt-v</v-icon>
          </v-btn>
          <v-btn icon small class="mainboard-window__btn" @click="toggleClassWindow('mainboard-window--fullwidth')" title="Развернуть по ширине">
              <v-icon color="white">fas fa-arrows-alt-h</v-icon>
          </v-btn> -->
          <v-btn icon small class="mainboard-window__btn" @click.stop="reloadWindow" title="Перезагрузить окно">
              <v-icon color="white">refresh</v-icon>
          </v-btn>
          <v-btn icon small class="mainboard-window__btn" @click.stop="minimizeWindow" title="Свернуть">
              <v-icon color="white">minimize</v-icon>
          </v-btn>
          <v-btn icon small class="mainboard-window__btn" @click.stop="toggleFullscreenWindow" title="Развернуть на весь экран">
              <v-icon v-if="!options.fullscreen" color="white">fullscreen</v-icon>
              <v-icon v-if="options.fullscreen" color="white">fullscreen_exit</v-icon>
          </v-btn>
          <v-btn icon small class="mainboard-window__btn" @click.stop="closeWindow" title="Закрыть окно">
              <v-icon color="white">close</v-icon>
          </v-btn>
        </div>
    </v-card-title>

    <v-card-text class="mainboard-window__body">
        <div class="mainboard-window__cover-window"
            v-if="!options.active"
            v-on:click="setActiveWindow"
        ></div>
        <base-mainboard-frame v-on:loadFrame="updateWindow($event)" ref="baseMainboardFrame" :backLink="backLink" :apiLink="options.apiLink"></base-mainboard-frame>
    </v-card-text>

    <v-divider></v-divider>
</v-card>
</div>
</template>

<script>
import baseFrame from "@/components/Base/BaseFrame.vue";
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      apiLink: "",
      backLink: "",
      history: [],
      pressBtnReload: false,
      pressBtnBack: false
    };
  },
  computed: {
    showBtnBack() {
      return this.history.length > 1;
    },

    isModeGrid() {
      return this.$store.isModeGrid;
    },

    widthWorkspace() {
      return this.$store.state.desktop.widthWorkspace;
    },

    heightWorkspace() {
      return this.$store.state.desktop.heightWorkspace;
    }
  },
  components: {
    baseMainboardFrame: baseFrame
  },

  methods: {
    minimizeWindow() {
      this.$store.commit("toggleMinimizeWindow", this.index);
      if (this.options.active) {
        this.$store.commit("unsetActiveWindow");
      }
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    toggleClassWindow(classCss) {
      this.$store.commit("toggleClassWindow", {
        index: this.index,
        classCss: classCss
      });
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    reloadWindow() {
      this.$refs.baseMainboardFrame.$refs.baseFrame.src = this.options.apiLink;
    },

    closeWindow() {
      this.$store.dispatch("actionCloseWindow", this.index);
      //this.$store.commit("setActiveWindow");
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    toggleFullscreenWindow() {
      this.$store.commit("toggleFullscreenWindow", this.index);
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    setActiveWindow() {
      this.$store.commit("setActiveWindow", this.index);
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    updateWindow(data) {
      console.log("updateWindow data", data);
      //this.updateHistory(data.apiLink);
      this.updateHistory(data.currentLink);
      let options = Object.assign({}, data, { index: this.index });
      this.$store.dispatch("actionUpdateWindow", options);
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    updateWindowTitle(title) {
      this.$store.commit("updateWindowTitle", { index: this.index, title });
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    updateWindowApiLink(apiLink) {
      this.$store.commit("updateWindowApiLink", { index: this.index, apiLink });
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    updateWindowCurrentLink(currentLink) {
      this.$store.commit("updateWindowApiLink", { index: this.index, apiLink });
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    updateHistory(apiLink) {
      if (!this.pressBtnReload && !this.pressBtnBack) {
        this.history.push(apiLink);
      }

      this.pressBtnReload = false;
      this.pressBtnBack = false;
      this.backLink = "";
      console.log("Window.history", this.history);
    },

    back() {
      if (this.history.length > 1) {
        this.pressBtnBack = true;
        this.backLink = this.history[this.history.length - 2];
        this.history.pop();
      }
    }
  },

  created() {
    this.apiLink = this.options.apiLink;
    this.history.push(this.options.apiLink);
  },

  mounted() {
    var self = this;
    var countRows = self.$store.getters.getCountRows;
    var countColumns = self.$store.getters.getCountColumns;
    $(this.$refs.window)
      .draggable({
        handle: ".mainboard-window__header",
        containment: ".mainboard-workspace",
        snap: !self.isModeGrid ? false : ".mainboard-window",
        start: function(event, ui) {
          var $window = $(this);
          $window.find(".mainboard-frame__cover").show();
          if (self.options.height == 100) {
            //$window.addClass("half-height");
            //$window.css("height", "90%");
          }
          //console.log("drag", self.options.height);

          if ($window.hasClass("fullscreen")) {
            return false;
          }
        },
        stop: function(event, ui) {
          console.log("draggable ui", ui);
          var $window = $(this);
          $window.find(".mainboard-frame__cover").hide();
          console.log("draggable window self.index", self.index);
          console.log("draggable window data-index", $(this).data("index"));
          var options = {
            //index: $(this).data("index"),
            index: self.index,
            top: ui.position.top < 0 ? 0 : ui.position.top,
            left: ui.position.left < 0 ? 0 : ui.position.left,
            width: $window.width(),
            height: $window.height(),
            diffTop: ui.position.top - ui.originalPosition.top,
            diffLeft: ui.position.left - ui.originalPosition.left
          };

          //$window.removeClass("half-height");

          self.$store.dispatch("actionUpdateWindowCoords", options);
          //self.$store.dispatch("actionSaveSettingsDesktop");
        }
      })
      .resizable({
        handles: "se, e, s, n, w",
        containment: ".mainboard-workspace",
        grid: [1, 1],
        iframeFix: true,
        minHeight: 150,
        minWidth: 300,
        //helper: "ui-resizable-helper",
        start: function(event, ui) {
          var $window = $(this);
          //$window.find('.mainboard-frame__cover').css({display: 'block'});
          $window.find(".mainboard-frame__cover").show();
          self.$store.commit("setActiveWindow", self.index);
        },
        stop: function(event, ui) {
          console.log("ui", ui);
          var $window = $(this);
          $window.find(".mainboard-frame__cover").hide();

          //var coefWidth = ui.size.width / ui.originalSize.width;
          //var coefHeight = ui.size.height / ui.originalSize.height;
          //console.log(coefWidth, coefHeight);
          var options = {
            index: self.index,
            //index: $(this).data("index"),
            //coefWidth: coefWidth,
            //coefHeight: coefHeight,
            top: ui.position.top < 0 ? 0 : ui.position.top,
            left: ui.position.left < 0 ? 0 : ui.position.left,
            width: ui.size.width,
            height: ui.size.height,
            diffTop: ui.position.top - ui.originalPosition.top,
            diffLeft: ui.position.left - ui.originalPosition.left
          };
          //self.$store.dispatch("actionUpdateWindowCoords", options);
          self.$store.dispatch("actionUpdateWindowSize", options);
          //self.$store.dispatch("actionSaveSettingsDesktop");
        }
      });
  }
};
</script>

<style scoped>
.mainboard-window {
  position: absolute;
  /* border: 2px solid rgba(92, 107, 192, 0.8); */
  border-radius: 5px;
  box-sizing: border-box;
  webkit-box-shadow: 1px 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 3px 9px rgba(0, 0, 0, 0.5);
  background-color: #fff;
}

.mainboard-window--fullheight {
  top: 0px !important;
  height: 100% !important;
}

.mainboard-window--fullwidth {
  width: 100% !important;
}

.mainboard-window--top-half {
  top: 0px !important;
  left: 0px !important;
  width: 100% !important;
  height: 50% !important;
}

.mainboard-window--bottom-half {
  bottom: 0px !important;
  left: 0px !important;
  width: 100% !important;
  height: 50% !important;
}

.mainboard-window__card {
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid #5b7aa1;
  border-radius: inherit;
}

.mainboard-window__cover-window {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
}

.mainboard-window__header {
  font-size: 16px;
  color: #fff;
  cursor: move;
  padding: 0 5px;
  height: 30px;
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

.mainboard-window__title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.mainboard-window__group-buttons {
  /*   width: 40%;
  float: right; */
}

.mainboard-window__btn {
  margin: 0;
}

.mainboard-window__body {
  height: calc(100% - 40px);
  position: relative;
  padding: 0;
  margin: 0;
  /* border-radius: inherit; */
}

.fullscreen {
  position: absolute !important;
  z-index: 1000;
  width: 100% !important;
  height: 100% !important;
  top: 0 !important;
  left: 0 !important;
  bottom: 0 !important;
  right: 0 !important;
}

.half-height {
  height: 90% !important;
}

.half-width {
  width: 90% !important;
}

@media (max-width: 1200px) {
  .mainboard-window__title {
    width: 55%;
    font-size: 14px;
  }
}

@media (max-width: 800px) {
  .mainboard-window__title {
    display: none;
  }
}
</style>

