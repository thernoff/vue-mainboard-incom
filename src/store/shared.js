export default {
    state: {
        loading: false,
        error: null,
        openMenu: false
    },
    mutations: {
        setLoading(state, data) {
            state.loading = data
        },

        setError(state, data) {
            state.error = data
        },

        clearError(state) {
            state.error = null
        },

        toggleOpenMenu(state, open = undefined) {
            if (open !== undefined) {
                state.openMenu = !state.openMenu
            } else {
                state.openMenu = open
            }
        }
    },
    actions: {
        actionInit({ commit, state }) {
            commit('setActiveWorkspace')
            commit('setWindows', state.activeWorkspace.windows);
            commit('setActiveWindow');
        },

        setLoading({ commit }, data) {
            commit('setLoading', data)
        },

        actionSetError({ commit }, data) {
            commit('setError', data)
        },

        actionClearError({ commit }) {
            commit('clearError')
        },

        actionToggleOpenMenu({ commit }, open) {
            commit('toggleOpenMenu', open)
        }
    },
    getters: {
        loading(state) {
            return state.loading
        },

        error(state) {
            return state.error
        },

        openMenu(state) {
            return state.openMenu
        }
    }
}