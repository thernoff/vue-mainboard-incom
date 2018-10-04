<template>
<div class="mainboard-window-settings">
  <v-layout row justify-center>
      <v-btn icon v-on:click="visible=true">
        <v-icon>settings</v-icon>
      </v-btn>
    <v-dialog width="800px" light v-model="visible">
      <v-tabs
        v-model="active"
        color="indigo"
        light
        slider-color="red"
      >
      <v-tab
        v-for="(tab, index) in tabs"
        :key="index"
        ripple
      >
        {{tab.title}}
      </v-tab>
      <v-tab-item>
        <v-card flat light>
          <!-- <v-card-text>Text</v-card-text> -->
          <mainboard-user-form v-bind:user="user"></mainboard-user-form>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat light>
          <!-- <v-card-text>Text</v-card-text> -->
          <mainboard-settings-categories v-bind:categories="categories"></mainboard-settings-categories>
          <!-- <mainboard-settings-categories v-bind:categories="localCategories"></mainboard-settings-categories> -->
        </v-card>
      </v-tab-item>
    </v-tabs>
    </v-dialog>
  </v-layout>
</div>
</template>

<script>
import UserForm from "@/components/Desktop/WindowSettings/UserForm.vue";
import SettingsCategories from "@/components/Desktop/WindowSettings/SettingsCategories.vue";

export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      active: null,
      tabs: [{ title: "Пользователь" }, { title: "Меню 'Пуск'" }],
      localCategories: []
    };
  },
  components: {
    mainboardUserForm: UserForm,
    mainboardSettingsCategories: SettingsCategories
  },
  created() {
    console.log("WindowSettings created this.categories", this.categories);
    this.localCategories = Object.assign([], this.categories);
  },
  methods: {
    cancel() {
      //this.$refs.form.reset();
      this.modal = false;
    }
  }
};
</script>

<style scoped>
.mainboard-userform__title {
  color: #fff;
}
</style>
