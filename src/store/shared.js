export default {
    state: {
        loading: false,
        error: null
    },
    mutations: {
        setLoading (state, data) {
            state.loading = data
        },
        setError (state, data) {
            state.error = data
        },
        clearError(state) {
            state.error = null
        }
    },
    actions: {
        setLoading ({commit}, data) {
            commit('setLoading', data)
        },
        setError ({commit}, data) {
            commit('setError', data)
        },
        clearError ({commit}) {
            commit('clearError')
        }
    },
    getters: {
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
}