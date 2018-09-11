import * as firebase from 'firebase'

class User {
    constructor (id) {
        this.id = id
    }
}

export default {
    state: {
        user: null
    },
    mutations: {
        setUser (state, data) {
            state.user = data
        }
    },
    actions: {
        async registerUser ({commit}, {email, password}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        },
        /* registerUser ({commit}, {email, password}) {
            commit('clearError')
            commit('setLoading', true)
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then( user => {
                    commit('setUser', new User(user.uid))
                    commit('setLoading', false)
                })
                .catch(error => {
                    commit('setLoading', false)
                    commit('setError', error.message)
                })
        } */
        async loginUser ({commit}, {email, password}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                const user = await firebase.auth().signInWithEmailAndPassword(email, password)
                commit('setUser', new User(user.uid))
                commit('setLoading', false)
            } catch (error) {
                commit('setLoading', false)
                commit('setError', error.message)
                throw error
            }
        }
    },
    getters: {
        user () {
            return state.user
        }
    }
}