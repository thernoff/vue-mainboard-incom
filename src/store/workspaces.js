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
    ]
  },

  mutations: {
    createNewWorkspace (state) {
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

    setActiveWorkspace (state, index = undefined) {
      console.log('setActiveWorkspace', index)
      if (index != undefined) {
        state.activeWorkspace.active = false
        state.activeWorkspace = state.workspaces[index]
        state.activeWorkspace.active = true
      } else {
        for (let i = 0; i < state.workspaces.length; i++ ) {
          if ( state.workspaces[i].active ) {
            state.activeWorkspace = state.workspaces[i]
            break;
          }
        }
      }
      //return state.activeWorkspace
    },
  },
  actions: {
    actionCreateNewWorkspace ({ commit }) {
      commit('createNewWorkspace')
    },

    actionSetActiveWorkspace ( {commit}, index) {
      commit('setActiveWorkspace', index)
    }
  },
  getters: {
    getWorkspaces (state) {
      return state.workspaces
    },

    getActiveWorkspace (state) {
      /* let activeWorkspace;
      for (let i = 0; i < state.workspaces.length; i++ ) {
        if ( state.workspaces[i].active ) {
          activeWorkspace = state.workspaces[i]
          break;
        }
      } */

      return state.activeWorkspace
    },

    getWindowsActiveWorkspace (state) {
      /* let activeWorkspace;
      for (let i = 0; i < state.workspaces.length; i++ ) {
        if ( state.workspaces[i].active ) {
          activeWorkspace = state.workspaces[i]
          break;
        }
      } */

      return state.activeWorkspace.windows
    },

    getTitleActiveWorkspace (state) {
      return state.activeWorkspace.title
    }
  }
}