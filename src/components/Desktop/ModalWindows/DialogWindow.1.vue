<template>
  <v-dialog width="400px" v-model="modal" >
    <slot slot="activator" ></slot>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Укажите название рабочей области</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
           <v-card-text>
             <v-text-field
                  name="title"
                  label="Название рабочей области"
                  type="text"
              ></v-text-field>
           </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="warning" v-on:click="onCancel">Отмена</v-btn>
              <v-btn class="success">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      modal: false
    };
  },
  methods: {
    onCancel() {
      this.modal = false;
    },
    onSave() {
      if (this.editedDescription !== "" && this.editedTitle !== "") {
        this.$store.dispatch("updateAd", {
          title: this.editedTitle,
          description: this.editedDescription,
          id: this.ad.id
        });
        this.modal = false;
      }
    }
  }
};
</script>

<style scoped>
</style>
