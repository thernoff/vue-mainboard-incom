<template>
  <div
    class="mainboard-workspace__grid"
    v-bind:style="{ backgroundImage: 'url('+ require('@/assets/wallpaper.jpg') +')' }"
    v-on:click="setNotActive"
  >
    <div class="mainboard-workspace__grid-container" v-if="isModeGrid">
      <!-- <div class="mainboard-workspace__grid-gradient"
        :style="{backgroundSize: widthGridCell + '%' + ' ' + heightGridRow +'%'}"
      ></div> -->
      <div v-for="y of countRows"
      :key=y
      :style="{
          'height': heightGridRow + '%',
        }"
    >
      <div v-for="x of countColumns"
        :key=x
        :style="{

          'float': 'left',
          'width': widthGridCell + '%',
          'border': '1px dashed rgb(226, 238, 255, 0.2)',
          'height': '100%'
        }"
      >

      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  //props: ["widthWorkspace", "heightWorkspace"],
  data() {
    return {};
  },
  computed: {
    isModeGrid() {
      return this.$store.getters.isModeGrid;
    },

    countRows() {
      return this.$store.getters.getCountRows;
    },

    countColumns() {
      return this.$store.getters.getCountColumns;
    },

    widthGridCell() {
      return 100 / this.$store.getters.getCountColumns;
    },

    heightGridRow() {
      return 100 / this.$store.getters.getCountRows;
    }
  },
  methods: {
    setNotActive() {
      this.$store.dispatch("actionSetNotActiveWindows");
      this.$store.dispatch("actionSetNotActiveShortcuts");
      this.$store.dispatch("actionSaveSettingsDesktop");
    }
  }
};
</script>

<style scoped>
.mainboard-workspace__grid {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: 50% 50%;
  -moz-background-size: 100%; /* Firefox 3.6+ */
  -webkit-background-size: 100%; /* Safari 3.1+ и Chrome 4.0+ */
  -o-background-size: 100%; /* Opera 9.6+ */
  background-size: 100%;
}

.mainboard-workspace__grid-container {
  width: 100%;
  height: 100%;
}

.mainboard-workspace__grid-gradient {
  width: 100%;
  height: 100%;
  background: -moz-linear-gradient(rgb(226, 238, 255, 0.3), transparent 1px),
  -moz-linear-gradient(90deg, rgb(226, 238, 255, 0.3), transparent 1px);
  background: -webkit-linear-gradient(rgb(226, 238, 255, 0.3), transparent 1px),
  -webkit-linear-gradient(90deg, rgb(226, 238, 255, 0.3), transparent 1px);
  background: -o-linear-gradient(rgb(226, 238, 255, 0.3), transparent 1px),
  -o-linear-gradient(90deg, rgb(226, 238, 255, 0.3), transparent 1px);
  background: -ms-linear-gradient(rgb(226, 238, 255, 0.3), transparent 1px),
  -ms-linear-gradient(90deg, rgb(226, 238, 255, 0.3), transparent 1px);
  background: linear-gradient(rgb(226, 238, 255, 0.3), transparent 1px),
  linear-gradient(90deg, rgb(226, 238, 255, 0.3), transparent 1px);
  /* linear-gradient(90deg, mediumvioletred, transparent 1px); */

  /* background-position: center center; */
  /* border: 1px solid mediumvioletred; */
}
</style>
