import Vue from 'vue'
import Vuex from 'vuex'
import startmenu from './startmenu'
import windows from './windows'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        startmenu,
        windows
    }
})