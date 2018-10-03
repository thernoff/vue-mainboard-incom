<template>
<div class="mainboard-settings-items">
  <div class="mainboard-panel-container"
    v-for="item in items"
    v-bind:key="item.id"
  >
    <mainboard-panel-elements
      v-bind:title="item.label"
      v-bind:elements="item.elements"
    >
    </mainboard-panel-elements>
  </div>

</div>
</template>
<script>
import PanelElements from "@/components/Desktop/WindowSettings/PanelElements.vue";
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: {
    mainboardPanelElements: PanelElements
  },
  mounted: {}
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

