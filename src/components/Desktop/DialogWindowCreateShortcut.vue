<template>
<div class="mainboard-dialog-window-create-shortcut">
  <v-dialog width="400px" v-model="visible" hide-overlay persistent>
    <v-card light>
      <v-layout row>
          <v-flex xs12>
            <v-card-title class="primary mainboard-userform__title">
              <div class="headline">Создание ярлыка</div>
            </v-card-title>
          </v-flex>
        </v-layout>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                name="name"
                v-model="name"
                :rules="nameRules"
                label="Имя ярлыка"
                required
              ></v-text-field>
              <v-text-field
                name="url"
                v-bind:value="url"
                v-on:input="url = $event"
                :rules="urlRules"
                label="Url ресурса"
                required
              ></v-text-field>
              <v-layout align-center>
                <v-flex text-xs-center>
                  <v-btn
                    :disabled="!valid"
                    v-on:click="create"
                    color="info"
                  >
                    Сохранить
                  </v-btn>
                  <v-btn
                    v-on:click="cancel"
                    color="error"
                  >
                    Отмена
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
export default {
  name: "DialogWindowCreateShortcut",
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      modal: false,
      valid: false,
      name: "",
      url: "",
      nameRules: [
        v => !!v || "Имя ярлыка обязательно для создания ярлыка"
        //v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      urlRules: [
        v => !!v || "Url ресурса обязательно для создания ярлыка",
        v =>
          /^(ftp|http|https):\/\/[^ "]+$/.test(v) ||
          "Не корректный адрес ресурса"
      ]
    };
  },
  watch: {
    visible(value) {
      this.modal = value;
    }
  },
  methods: {
    cancel() {
      this.$emit("hideDialogWindow", null);
    },
    create() {
      if (this.$refs.form.validate()) {
        const customShortcut = {
          label: this.name,
          url: this.url
        };
        this.name = "";
        this.url = "";
        this.$emit("hideDialogWindow", customShortcut);
      }
    }
  }
};
</script>

<style scoped>
</style>
