// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './main.css'
// Helpers
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    //primary: colors.indigo.darken1, // #E53935
    primary: '#3b5375',
    titleWindow: '#4a6588',
    //minimizeWindowTaskbar: colors.indigo.darken3,
    minimizeWindowTaskbar: '#293c56',
    btnTaskbar: '#293c56',
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */

jQuery(document).ready(function () {
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})

