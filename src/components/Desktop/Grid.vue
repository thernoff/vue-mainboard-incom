<template>
  <div
    class="mainboard-workspace__grid"
    v-bind:style="{ backgroundImage: 'url('+ require('@/assets/wallpaper.jpg') +')' }"
    v-on:click="setNotActive"
  >
    <div class="mainboard-workspace__grid-container" v-if="isModeGrid">
      <div class="mainboard-workspace__grid-gradient"
        :style="{backgroundSize: widthGridCell + '%' + ' ' + heightGridRow +'%'}"

      ></div>
      <!-- <div v-for="y of countRows"
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
            'border': '1px dashed rgb(191, 100, 155, 1)',
            'height': '100%'
          }"
        >

        </div>
    </div> -->
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
      return Math.ceil(10000000 / this.$store.getters.getCountColumns) / 100000;
    },

    heightGridRow() {
      return Math.ceil(100000000 / this.$store.getters.getCountRows) / 1000000;
    }
  },
  methods: {
    setNotActive() {
      const isActive =
        this.$store.getters.isActiveWindow ||
        this.$store.getters.isActiveShortcut;

      if (isActive) {
        this.$store.dispatch("actionSetNotActiveWindows");
        this.$store.dispatch("actionSetNotActiveShortcuts");
        this.$store.dispatch("actionSaveSettingsDesktop");
      }
    }
  }
};
</script>

<style scoped>
.mainboard-workspace__grid {
  position: relative;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-position: 50% 50%; */
  background-position: center center;
  -moz-background-size: cover; /* Firefox 3.6+ */
  -webkit-background-size: cover; /* Safari 3.1+ и Chrome 4.0+ */
  -o-background-size: cover; /* Opera 9.6+ */
  background-size: cover;
  background-repeat: no-repeat;
}

.mainboard-workspace__grid-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.mainboard-workspace__grid-gradient {
  /* display: inline-block; */
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  /* background-size: 15px 15px; */
  /* background-position: center center; */
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
