<template>
<div class="mainboard-info-dialog-window">
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
             <p>{{ options.text }}</p>
           </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="info" v-on:click="onAccept">Принять</v-btn>
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
    onAccept() {
      this.$emit("hideInfoDialogWindow");
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
