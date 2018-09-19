export default {
    state: {
        visible: false,
        items: []
    },
    mutations: {
        toggleVisibleStartMenu(state) {
            state.visible = !state.visible
        },

        setStartmenuItems(state, items) {
            state.items = items
            console.log(items)
        }
    },
    actions: {
        actionToggleVisibleStartMenu({ commit }) {
            commit('toggleVisibleStartMenu')
        },
    },
    getters: {
        visibleStartmenu(state) {
            return state.visible
        },

        getItems(state) {
            return state.items
        },

        getItemStartMenu(state) {
            return (indexItem, indexElement) => state.items[indexItem].elements[indexElement]
        }
    }
}