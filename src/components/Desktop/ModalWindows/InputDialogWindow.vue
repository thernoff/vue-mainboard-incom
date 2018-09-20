<template>
<div class="mainboard-input-dialog-window">
  <!-- <div v-on:click.stop="showDialogWindow"> -->
    <slot></slot>
  <!-- </div> -->

  <v-dialog width="400px" v-model="modal">
    <!-- <slot slot="activator"></slot> -->
    <!-- <slot ></slot> -->
    <v-card light>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">{{title}}</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
           <v-card-text>
             <v-text-field
                  name="title"
                  v-bind:label="label"
                  type="text"
                  v-model="inputValue"
              ></v-text-field>
           </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="warning" v-on:click="onCancel">Отмена</v-btn>
              <v-btn class="success" v-on:click="onSave">Сохранить</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  props: ["title", "label", "value", "visible"],
  data() {
    return {
      modal: false,
      inputValue: this.value || ""
    };
  },
  methods: {
    showDialogWindow() {
      //this.modal = true;
    },
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
