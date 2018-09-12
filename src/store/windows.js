export default {
    state: {
        maxZIndex: 0,
        topPrevWindow: 50,
        leftPrevWindow: 600,
        activeWindow: null,
        windows: []
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
                closed: false,
                active: true
            }

            if (state.activeWindow) {
                state.activeWindow.active = false
            }

            const length = state.windows.push(newWindow)
            state.activeWindow = state.windows[length - 1]

            state.topPrevWindow += 50
            state.leftPrevWindow += 50

            console.log('create state.windows', newWindow)
        },

        updateWindowCoords (state, options) {
            const window = state.windows[options.index]
            window.top += parseInt(options.diffY)
            window.left += parseInt(options.diffX)
        },

        updateWindowSize (state, options) {
            const window = state.windows[options.index]
            window.top = parseInt(options.top)
            window.left = parseInt(options.left)
            window.width *= parseFloat(options.coefWidth)
            window.height *= parseFloat(options.coefHeight)
        },

        closeWindow (state, index) {
            state.windows[index].closed = true
        },

        minimizeWindow (state, index) {
            state.windows[index].minimize = true
        },

        toggleMinimizeWindow (state, index) {
            state.windows[index].minimize = !state.windows[index].minimize
            //state.windows[index] = {...state.windows[index], minimize: !state.windows[index].minimize}
        },

        toggleFullscreenWindow (state, index) {
            state.windows[index].fullscreen = !state.windows[index].fullscreen
        },

        fullscreenWindowOff (state, index) {
            state.windows[index].fullscreen = false
        },

        setActiveWindow (state, index) {
            state.activeWindow.active = false
            state.activeWindow = state.windows[index]
            state.activeWindow.active = true

            state.maxZIndex += 1
            state.activeWindow.zIndex = state.maxZIndex
        },

        unsetActiveWindow (state) {
            state.activeWindow.active = false
            state.windows.some( (window, index) => {
                if ( !window.minimize ) {
                    console.log('index', index)
                    state.activeWindow = window
                    state.activeWindow.active = true
                    return true
                }
            })

            state.maxZIndex += 1
            state.activeWindow.zIndex = state.maxZIndex
        }
    },
    actions: {
        actionCloseWindow({commit}, index) {
            commit('closeWindow', index)
        },
    },
    getters: {
        getWindows(state) {
            console.log('getWindows')
            return state.windows
        },

        getMinimizeWindows(state) {
            return state.windows.filter((window) => {
                return window.minimize
            })
        }
    }
}