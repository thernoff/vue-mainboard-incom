import axios from 'axios'
export default {
    state: {
        visible: false,
        categories: []
    },
    mutations: {
        toggleVisibleStartMenu(state) {
            state.visible = !state.visible
        },

        setStartmenuItems(state, categories) {
            console.log('commit setStartmenuItems')
            state.categories = categories
        }
    },
    actions: {
        actionToggleVisibleStartMenu({ commit }) {
            commit('toggleVisibleStartMenu')
        },

        actionSaveCategories({ commit }, categories) {
            console.log('actionSaveCategories', categories)
            commit('setStartmenuItems', categories)
            axios({
                method: 'post',
                headers: { 'Content-Type': 'application/form-data' },
                //url: 'http://esv.elxis.test/extusers/fpage/saveuser/',
                url: window.location.href + 'extusers/fpage/savedashboard/',
                data: { categories: categories }
            })
                .then(
                    response => {
                        console.log('response', response)
                        //commit('saveUser', user)
                    }
                )
                .catch(error => {
                    console.log('error', error)
                    //commit('saveUser', user)
                })
        }
    },
    getters: {
        visibleStartmenu(state) {
            return state.visible
        },

        getItems(state) {
            return state.categories
        },

        categories(state) {
            return state.categories
        },

        getItemStartMenu(state) {
            return (indexItem, indexElement) => state.categories[indexItem].elements[indexElement]
        }
    }
}