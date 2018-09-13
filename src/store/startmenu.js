export default {
    state: {
        visible: false,
        items: [
            {
              title: 'Аналитика',
              apiLink: 'http://system35.incom-sr.ru/inner.php/apiusers/api/login?uname=azernov&pword=ad09b5e38346118779e518fa4d4f22f7c54da39f&redirurl=aHR0cDovL3N5c3RlbTM1LmluY29tLXNyLnJ1L2lubmVyLnBocC9zcGVlZGNhbXMvYW5hbGl0aWNzLmh0bWw,',
            },
            {
              title: 'Очередь нарушений',
              apiLink: 'http://system35.incom-sr.ru/inner.php/apiusers/api/login?uname=azernov&pword=ad09b5e38346118779e518fa4d4f22f7c54da39f&redirurl=aHR0cDovL3N5c3RlbTM1LmluY29tLXNyLnJ1L2lubmVyLnBocC9zcGVlZGNhbXMvdmlvbGF0aW9ucy9xdWV1ZS8,',
            },
            {
              title: 'Статусы обработки',
              apiLink: 'http://system35.incom-sr.ru/inner.php/apiusers/api/login?uname=bdd-35&pword=74a1e85c5c1ce97ae538426af15f01edb490caaf&redirurl=aHR0cDovL3N5c3RlbTM1LmluY29tLXNyLnJ1L2lubmVyLnBocC9zcGVlZGNhbXMvdmlvbGF0aW9ucy9zdGF0dXNlcy5odG1s',
            }
          ]
    },
    mutations: {
        toggleVisibleStartMenu (state) {
            state.visible = !state.visible
        }
    },
    actions: {
        actionToggleVisibleStartMenu ({commit}) {
            commit('toggleVisibleStartMenu')
        },
    },
    getters: {
        visibleStartmenu (state) {
            return state.visible
        },

        getItems (state) {
            return state.items
        },

        getItemStartMenu(state) {
            return (index) => state.items[index]
        }
    }
}