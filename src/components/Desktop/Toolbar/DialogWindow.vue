<template>
<div class="mainboard-dialog-window">
  <slot></slot>
  <v-dialog width="400px" v-model="visible" persistent>
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
             <p>{{ options.text }}</p>
           </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="danger" v-on:click="onCancel">Отмена</v-btn>
              <v-btn class="info" v-on:click="onAccept">Согласен</v-btn>
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
      modal: false
    };
  },
  methods: {
    onCancel() {
      this.$emit("hideDialogWindow", false);
    },
    onAccept() {
      this.$emit("hideDialogWindow", true);
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
