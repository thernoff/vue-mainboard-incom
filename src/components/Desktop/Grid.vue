<template>
  <div
    class="mainboard-workspace__grid"
    v-on:click="setNotActive"
  >
    <div class="mainboard-workspace__grid-container" v-if="isModeGrid">
      <div v-for="y of countRows"
      :key=y
      :style="{
          'height': heightGridRow + '%',
        }"
    >
      <div v-for="x of countColumns"
        :key=x
        :style="{
          'background-color': '#ead8d8',
          'float': 'left',
          'width': widthGridCell + '%',
          'border': '1px dashed #cabcbc',
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
}

.mainboard-workspace__grid-container {
  width: 100%;
  height: 100%;
}
</style>
