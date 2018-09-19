import axios from 'axios'

export default {
  state: {
    indexActiveWorkspace: 0,
    activeWorkspace: null,
    workspaces: [
      {
        title: 'Рабочая область пользователя',
        descripton: '',
        active: true,
        windows: []
      }
    ],
    dashboard: null,
  },

  mutations: {
    createNewWorkspace(state) {
      const title = 'Тестовая область'
      const descripton = ''
      const newWorkspace = {
        title,
        descripton,
        active: true,
        windows: []
      }

      if (state.activeWorkspace) {
        state.activeWorkspace.active = false
      }
      //state.windows = state.activeWorkspace.windows
      const length = state.workspaces.push(newWorkspace)
      state.activeWorkspace = state.workspaces[length - 1]

      //return state.activeWorkspace
    },

    setActiveWorkspace(state, index = undefined) {

      if (index != undefined) {
        state.activeWorkspace.active = false
        state.activeWorkspace = state.workspaces[index]
        state.activeWorkspace.active = true
      } else {
        for (let i = 0; i < state.workspaces.length; i++) {
          if (state.workspaces[i].active) {
            state.activeWorkspace = state.workspaces[i]
            break;
          }
        }
      }
      console.log('setActiveWorkspace', state.activeWorkspace)
      //return state.activeWorkspace
    },

    setWorkspaces(state, workspaces) {
      if (workspaces && workspaces.length > 0) {
        state.workspaces = workspaces
      }
    },

    setDashboard(state, dashboard) {
      state.dashboard = dashboard
    }
  },
  actions: {

    actionInitWorkspaces({ state, commit }, workspaces) {
      if (workspaces && workspaces.length > 0) {
        commit('setWorkspaces', workspaces)
        console.log('actionInitWorkspaces', state.workspaces)
        commit('setActiveWorkspace')
        if (state.activeWorkspace.windows && state.activeWorkspace.windows.length > 0) {
          commit('setWindows', state.activeWorkspace.windows)
          commit('setActiveWindow')
        }
      } else {
        commit('setActiveWorkspace')
        commit('setWindows', state.activeWorkspace.windows)
      }
    },

    actionCreateNewWorkspace({ state, commit, dispatch }) {
      commit('createNewWorkspace')
      commit('setWindows', state.activeWorkspace.windows)
      commit('setActiveWindow')
    },

    actionSetActiveWorkspace({ state, commit }, index) {
      commit('setActiveWorkspace', index)
      commit('setWindows', state.activeWorkspace.windows)
      commit('setActiveWindow')
    },

    actionGetDashboard({ commit, state, dispatch }) {
      axios
        .get('http://esv.elxis.test/extusers/fpage/desktop/')
        .then(
          response => {
            console.log('response', response.data)
            commit('setStartmenuItems', response.data.dashboard)
            dispatch('actionInitWorkspaces', response.data.workspaces)
          }
        )
        .catch(error => {
          console.log(error);
        })
    },

    actionSaveSettingsDesktop({ commit, state, getters }) {
      const workspaces = state.workspaces

      axios({
        method: 'post',
        headers: { 'Content-Type': 'application/form-data' },
        url: 'http://esv.elxis.test/extusers/fpage/savedesktop/',
        data: {
          settings: workspaces
        }
      })
        .then(
          response => {
            console.log('response', response)
          }
        )
        .catch(error => {
          console.log(error);
        })

    }
  },
  getters: {
    getWorkspaces(state) {
      return state.workspaces
    },

    getActiveWorkspace(state) {
      /* let activeWorkspace;
      for (let i = 0; i < state.workspaces.length; i++ ) {
        if ( state.workspaces[i].active ) {
          activeWorkspace = state.workspaces[i]
          break;
        }
      } */

      return state.activeWorkspace
    },

    getWindowsActiveWorkspace(state) {
      /* let activeWorkspace;
      for (let i = 0; i < state.workspaces.length; i++ ) {
        if ( state.workspaces[i].active ) {
          activeWorkspace = state.workspaces[i]
          break;
        }
      } */

      return state.activeWorkspace.windows
    },

    getTitleActiveWorkspace(state) {
      return (state.activeWorkspace) ? state.activeWorkspace.title : ''
    },

    workspaces(state) {
      return state.workspaces
    }
  }
}