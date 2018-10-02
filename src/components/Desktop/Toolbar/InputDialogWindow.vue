<template>
<div class="mainboard-input-dialog-window">
  <slot></slot>
  <v-dialog width="400px" v-model="modal">
    <v-card light>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">{{ options.title }}</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
           <v-card-text>
             <v-text-field
                  name="title"
                  v-bind:label="options.label"
                  type="text"
                  v-model="inputValue"
              ></v-text-field>
           </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row align-center>
          <v-flex xs12 text-xs-center>
              <v-btn class="error" v-on:click="onCancel">Отмена</v-btn>
              <v-btn class="info" v-on:click="onSave">Сохранить</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modal: false,
      inputValue: this.value || ""
    };
  },
  methods: {
    onCancel() {
      this.$emit("hideInputDialogWindow");
      //this.modal = false;
    },
    onSave() {
      console.log("this.inputValue", this.inputValue);
      if (this.inputValue !== "") {
        this.$emit("input", this.inputValue);
        this.$emit("hideInputDialogWindow");
        //this.modal = false;
      }
    }
  },
  watch: {
    visible(value) {
      this.modal = value;
    }
  }
};
</script>

<style scoped>
</style>
