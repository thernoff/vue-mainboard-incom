import axios from 'axios'

export default {
    state: {
        user: {}
    },
    mutations: {
        setUser(state, data) {
            state.user = data
        },

        saveUser(state, user) {
            state.user.email = user.email
        }
    },
    actions: {
        actionSaveUser({ commit }, user) {
            axios({
                method: 'post',
                headers: { 'Content-Type': 'application/form-data' },
                url: 'http://esv.elxis.test/extusers/fpage/saveuser/',
                data: user
            })
                .then(
                    response => {
                        console.log('response', response)
                        commit('saveUser', user)
                    }
                )
                .catch(error => {
                    console.log('error', error)
                    commit('saveUser', user)
                })

        }
    },
    getters: {
        user(state) {
            return state.user
        }
    }
}