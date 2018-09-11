export default {
    state: {
        maxZIndex: 5,
        topPrevWindow: 0,
        leftPrevWindow: 500,
        windows: [
            /* {
              title: 'Аналитика нарушений/потока',
              top: 20,
              left: 100,
              width: 24,
              height: 30,
              zIndex: 2,
              currentUrl: 'http://system35.incom-sr.ru/inner.php/apiusers/api/login?uname=azernov&pword=ad09b5e38346118779e518fa4d4f22f7c54da39f&redirurl=aHR0cDovL3N5c3RlbTM1LmluY29tLXNyLnJ1L2lubmVyLnBocC9zcGVlZGNhbXMvYW5hbGl0aWNzLmh0bWw,',
            },
            {
              title: 'Очередь нарушений',
              top: 220,
              left: 500,
              width: 32,
              height: 41,
              zIndex: 1,
              currentUrl: 'http://system35.incom-sr.ru/inner.php/apiusers/api/login?uname=azernov&pword=ad09b5e38346118779e518fa4d4f22f7c54da39f&redirurl=aHR0cDovL3N5c3RlbTM1LmluY29tLXNyLnJ1L2lubmVyLnBocC9zcGVlZGNhbXMvdmlvbGF0aW9ucy9xdWV1ZS8,',
            } */
          ]
    },
    mutations: {
        createNewWindow (state, itemStartMenu) {
            const title = itemStartMenu.title
            const url = itemStartMenu.url
            const newWindow = {
                title,
                currentUrl: url,
                top: state.topPrevWindow,
                left: state.leftPrevWindow,
                width: 40,
                height: 45,
                zIndex: state.maxZIndex + 1,
                minimize: false,
                fullscreen: false,
                closed: false
            }
            state.windows.push(newWindow)

            state.topPrevWindow += 50
            state.leftPrevWindow += 50

            console.log('create state.windows', newWindow)
        },

        updateWindowCoords (state, options) {
            console.log(options)
            const window = state.windows[options.index]
            //delete(options.index)
            //Object.assign(window, options)
            window.top += parseInt(options.diffY)
            window.left += parseInt(options.diffX)

            console.log('update coords state.windows', window)
        },

        closeWindow (state, index) {
            state.windows[index].closed = true
        },

        minimizeWindow (state, index) {
            state.windows[index].minimize = true
        },

        toggleMinimizeWindow (state, index) {
            state.windows[index].minimize = !state.windows[index].minimize
        },

        toggleFullscreenWindow (state, index) {
            state.windows[index].fullscreen = !state.windows[index].fullscreen
        },

        fullscreenWindowOff (state, index) {
            state.windows[index].fullscreen = false
        }
    },
    actions: {
        actionCloseWindow({commit}, index) {
            commit('closeWindow', index)
        },
    },
    getters: {
        getWindows(state) {
            return state.windows
        },

        getMinimizeWindows(state) {
            return state.windows.filter((window) => {
                return window.minimize
            })
        }
    }
}