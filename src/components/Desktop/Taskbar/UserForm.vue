<template>
<div class="mainboard-userform">
  <v-layout row justify-center>
      <v-btn icon v-on:click="modal=true">
        <v-icon>settings</v-icon>
      </v-btn>
    <v-dialog width="400px" v-model="modal">
      <!-- <v-btn icon slot="activator">
        <v-icon>settings</v-icon>
      </v-btn> -->
      <v-card light>
        <v-layout row>
            <v-flex xs12>
              <v-card-title class="primary mainboard-userform__title">
                <div class="headline">Настройки пользователя</div>
              </v-card-title>
            </v-flex>
          </v-layout>
        <v-container>
          <v-layout row>
            <v-flex xs12>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  name="firstname"
                  v-bind:value="user.firstname"
                  label="Имя"
                  required
                  readonly
                ></v-text-field>
                <v-text-field
                  name="lastname"
                  v-bind:value="user.lastname"
                  :rules="nameRules"
                  label="Фамилия"
                  required
                  readonly
                ></v-text-field>
                <v-text-field
                  name="email"
                  v-bind:value="user.email"
                  v-on:input="email = $event"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                  name="password"
                  v-model="password"
                  :rules="passwordRules"
                  label="Пароль"
                  v-bind:type="'password'">
                </v-text-field>
                <v-text-field
                  name="repassword"
                  v-model="repassword"
                  :rules="repasswordRules"
                  label="Введите пароль еще раз"
                  v-bind:type="'password'">
                </v-text-field>
                <v-select
                  v-bind:value="user.idActiveInterface"
                  v-on:input="idActiveInterface = $event"
                  :items="interfaces"
                  item-text="name"
                  item-value="id"
                  label="Тип интерфейса"
                ></v-select>
                <v-layout align-center>
                  <v-flex text-xs-center>
                    <v-btn
                      :disabled="!valid"
                      @click="saveUser"
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
  </v-layout>
</div>
</template>

<script>
export default {
  props: {
    /* user: {
      type: Object,
      required: true
    } */
  },
  data() {
    return {
      modal: false,
      valid: false,
      email: "",
      password: "",
      repassword: "",
      idActiveInterface: null,
      //firstname: this.user.firstname,
      nameRules: [
        v => !!v || "Name is required"
        //v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v =>
          v.length === 0 ||
          v.length >= 6 ||
          "Пароль должен состоять минимум из 6 символов"
      ],
      repasswordRules: [
        v =>
          v.length === 0 ||
          v.length >= 6 ||
          "Пароль должен состоять минимум из 6 символов",
        v => v == this.password || "Пароли должны совпадать"
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    interfaces() {
      return this.$store.getters.interfaces;
    }
  },
  methods: {
    saveUser() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        this.modal = false;
        let user = {};
        if (this.password) {
          user.password = this.password;
          user.repassword = this.repassword;
        }
        if (this.email) {
          user.email = this.email;
        }
        if (this.idActiveInterface) {
          user.idActiveInterface = this.idActiveInterface;
        }
        if (this.password || this.email || this.idActiveInterface) {
          this.$store.dispatch("actionSaveUser", user);
        }
        this.password = this.repassword = "";
        location.reload();
      }
    },

    cancel() {
      //this.$refs.form.reset();
      this.modal = false;
      this.idActiveInterface = null;
    }
  },
  mounted() {}
};
</script>

<style scoped>
.mainboard-userform__title {
  color: #fff;
}
</style>
