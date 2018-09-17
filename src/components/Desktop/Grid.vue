<template>
  <div class="mainboard-workspace__grid">
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
          'border': '1px solid #cabcbc',
          'height': '100%'
        }"
      >
        {{y}}, {{x}}
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
</style>
