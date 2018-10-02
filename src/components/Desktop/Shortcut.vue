<template>
  <div
    class="mainboard-shortcut"
    ref="shortcut"
    v-on:dblclick="createNewWindow"
    v-on:mousedown="setActive"
    v-on:contextmenu.prevent="showContextMenu"
    :class = "{'mainboard-shortcut--active': shortcut.active}"
  >
    <v-menu
      v-model="contextMenu.visible"
      :position-x="contextMenu.x"
      :position-y="contextMenu.y"
      absolute
      offset-y
    >
      <v-list>
        <v-list-tile
          @click="''"
        >
          <v-list-tile-title
            v-on:click="renameShortcut"
          >
            {{ 'Переименовать' }}
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile
          @click="''"
        >
          <v-list-tile-title
            v-on:click="deleteShortcut"
          >
            {{ 'Удалить' }}
          </v-list-tile-title>
        </v-list-tile>

      </v-list>
    </v-menu>

    <div class="mainboard-shortcut__img">
      <img
        :src="shortcut.image"
        :alt="shortcut.label"
      />
    </div>

    <div class="mainboard-shortcut__title">
      <p v-if="!rename">{{ shortcut.label }}</p>
      <input
        class="mainboard-shortcut__input"
        ref="renameinput"
        v-show="rename"
        v-bind:value="shortcut.label"
        v-on:blur="updateShortcut"
        v-on:keyup.enter="updateShortcut"
      />
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
  data() {
    return {
      contextMenu: {
        visible: false,
        x: 0,
        y: 0,
        indexShortcut: null
      },
      rename: false
    };
  },
  methods: {
    setActive() {
      this.$store.dispatch("actionSetActiveShortcut", this.index);
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    createNewWindow() {
      this.$store.commit("createNewWindow", this.shortcut);
      this.$store.dispatch("actionSaveSettingsDesktop");
    },

    showContextMenu(e) {
      e.preventDefault();
      this.contextMenu.visible = false;
      this.contextMenu.x = e.clientX;
      this.contextMenu.y = e.clientY;
      this.$nextTick(() => {
        this.contextMenu.visible = true;
      });
    },

    renameShortcut() {
      this.rename = true;
      this.$nextTick(() => this.$refs.renameinput.focus());
    },

    updateShortcut() {
      this.rename = false;
      const label = this.$refs.renameinput.value;
      const data = {
        index: this.index,
        options: {
          label
        }
      };
      this.$store.dispatch("actionUpdateShortcut", data);
      this.$store.dispatch("actionSaveSettingsDesktop");
      this.$nextTick(() => this.$refs.renameinput.blur());
    },

    deleteShortcut() {
      this.$store.dispatch("actionSetActiveShortcut", this.index);
      this.$store.dispatch("actionDeleteShortcut", this.index);
      this.$store.dispatch("actionSaveSettingsDesktop");
    }
  }
};
</script>

<style scoped>
.mainboard-shortcut {
  display: inline-block;
  margin: 5px;
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
  color: #fff;
  text-shadow: 1px 1px #000;
  text-align: center;
  font-size: 12px;
  line-height: 1;
}

.mainboard-shortcut__input {
  color: #000;
  width: 90%;
  height: 2em;
  text-align: center;
}

.contextmenu__item-menu {
  height: 32px;
}
</style>


