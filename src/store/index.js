import Vue from 'vue'
import Vuex from 'vuex'
import startmenu from './startmenu'
import windows from './windows'
import workspaces from './workspaces'
import grid from './grid'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        startmenu,
        windows,
        workspaces,
        grid
    }
})