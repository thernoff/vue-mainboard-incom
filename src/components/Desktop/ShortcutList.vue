<template>
<div
  class="mainboard-shortcut-list"
  ref="shortcutList"
>
  <div class="mainboard-shortcut-list__container">
    <mainboard-shortcut
      v-for="(shortcut, index) in shortcuts"
      :key="shortcut.title"
      :index="index"
      :shortcut="shortcut"
    >
    </mainboard-shortcut>
  </div>

</div>
</template>

<script>
import Shortcut from "./Shortcut.vue";
export default {
  props: {
    shortcuts: {
      type: Array,
      default: []
    }
  },
  components: {
    mainboardShortcut: Shortcut
  },
  mounted() {
    var self = this;
    var startIndex, stopIndex;
    $(".mainboard-shortcut-list__container").sortable({
      items: ".mainboard-shortcut",
      connectWith: ".mainboard-shortcut-list__container",
      start: function(event, ui) {
        startIndex = $(this)
          .find(".mainboard-shortcut")
          .index(ui.item);
        //console.log("startIndex", startIndex);
      },
      stop: function(event, ui) {
        stopIndex = $(this)
          .find(".mainboard-shortcut")
          .index(ui.item);
        //console.log("stopIndex", stopIndex);

        self.$store.dispatch("actionUpdateOrderShortcuts", {
          startIndex,
          stopIndex
        });

        self.$store.dispatch("actionSaveSettingsDesktop");
      }
    });
  }
};
</script>

<style scoped>
.mainboard-shortcut-list {
  position: absolute;
  width: 120px;
  height: 100%;
  top: 0;
  left: 0;
  padding: 5px;
}

.mainboard-shortcut-list__container {
  position: relative;
}

.mainboard-list-icons {
  position: absolute;
  margin: 0 auto;
  width: 100px;
  height: 100px;
  background-color: #fff;
  border: 2px solid gray;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
}

.mainboard-desktop-icon__img {
  text-align: center;
}

.mainboard-desktop-icon__title {
  text-align: center;
}
</style>


