<template>
<div
  class="mainboard-shortcut"
  ref="shortcut"
  v-on:dblclick="createNewWindow"
  v-on:mousedown="setActive"
  :class = "{'mainboard-shortcut--active': shortcut.active}"
>
<div class="mainboard-shortcut__img">
  <img
    :src="shortcut.image"
    :alt="shortcut.label"
  />
</div>
  <div class="mainboard-shortcut__title">
    <p>{{ shortcut.label }}</p>
  </div>
</div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    shortcut: {
      type: Object,
      required: true
    }
  },
  mounted() {
    //$(this.$refs.shortcut).draggable({});
  },
  methods: {
    setActive() {
      this.$store.dispatch("actionSetActiveShortcut", this.index);
    },

    createNewWindow() {
      this.$store.commit("createNewWindow", this.shortcut);
      this.$store.dispatch("actionSaveSettingsDesktop");
    }
  }
};
</script>

<style scoped>
.mainboard-shortcut {
  margin: 5px auto;
  width: 100px;
  height: 100px;
  /* background-color: #fff;
  border: 2px solid #b1a0a0; */
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  /* -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.2); */
  box-sizing: border-box;
}

.mainboard-shortcut--active,
.mainboard-shortcut:hover {
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid #b1a0a0;
  /* -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.2); */
}

.mainboard-shortcut__img {
  padding: 5px;
  text-align: center;
}

.mainboard-shortcut__img img {
  width: 50px;
}

.mainboard-shortcut__title {
  text-align: center;
  font-size: 12px;
  line-height: 1;
}
</style>


