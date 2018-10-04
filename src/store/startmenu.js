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
            commit('setStartmenuItems', Object.assign([], categories))
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