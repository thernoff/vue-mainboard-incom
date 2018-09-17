function getRandomId() {
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    id += Math.floor(Date.now() / 1000)
    return id;
};

export default {
    state: {
        maxZIndex: 0,
        topPrevWindow: 50,
        leftPrevWindow: 600,
        activeWindow: null,
        windows: []
    },
    mutations: {
        setWindows(state, windows) {
            state.windows = windows
        },

        createNewWindow(state, itemStartMenu) {
            const title = itemStartMenu.title
            const apiLink = itemStartMenu.apiLink
            //const id = Math.random()
            const id = getRandomId()
            console.log('id', id)
            const newWindow = {
                id,
                title,
                apiLink,
                top: state.topPrevWindow,
                left: state.leftPrevWindow,
                width: 40,
                height: 45,
                zIndex: state.maxZIndex + 1,
                minimize: false,
                fullscreen: false,
                closed: false,
                active: true,
                classesCss: [],
            }

            if (state.activeWindow) {
                state.activeWindow.active = false
            }

            const length = state.windows.push(newWindow)
            state.activeWindow = state.windows[length - 1]

            state.topPrevWindow += 50
            state.leftPrevWindow += 50
        },

        updateWindowCoords(state, options) {
            const window = state.windows[options.index]
            //window.top += parseInt(options.diffY)
            //window.left += parseInt(options.diffX)
            window.top = parseFloat(options.top)
            window.left = parseFloat(options.left)
        },

        updateWindowSize(state, options) {
            const window = state.windows[options.index]
            window.top = parseInt(options.top)
            window.left = parseInt(options.left)
            window.width *= parseFloat(options.coefWidth)
            window.height *= parseFloat(options.coefHeight)
        },

        toggleClassWindow(state, data) {
            let classesCss = state.windows[data.index].classesCss
            let i = classesCss.indexOf(data.classCss)
            if (i > -1) {
                classesCss.splice(i, 1)
            } else {
                classesCss.push(data.classCss)
            }
            console.log(i, classesCss)
        },

        closeWindow(state, index) {
            state.windows[index].closed = true
        },

        minimizeWindow(state, index) {
            state.windows[index].minimize = true
        },

        toggleMinimizeWindow(state, index) {
            state.windows[index].minimize = !state.windows[index].minimize
            //state.windows[index] = {...state.windows[index], minimize: !state.windows[index].minimize}
        },

        toggleFullscreenWindow(state, index) {
            state.windows[index].fullscreen = !state.windows[index].fullscreen
        },

        fullscreenWindowOff(state, index) {
            state.windows[index].fullscreen = false
        },

        setActiveWindow(state, index) {
            state.activeWindow.active = false
            state.activeWindow = state.windows[index]
            state.activeWindow.active = true

            state.maxZIndex += 1
            state.activeWindow.zIndex = state.maxZIndex
        },

        unsetActiveWindow(state) {
            state.activeWindow.active = false
            state.windows.some((window, index) => {
                if (!window.minimize) {
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
        actionCloseWindow({ commit }, index) {
            commit('closeWindow', index)
        },

        actionSetWindows({ commit }, windows) {
            commit('setWindows', windows)
        },

        actionUpdateWindowCoords({ commit, rootState }, options) {
            const modeGrid = rootState.grid.modeGrid
            const countColumns = rootState.grid.countColumns
            const countRows = rootState.grid.countRows
            const widthGrid = rootState.grid.widthGrid
            const heightGrid = rootState.grid.heightGrid
            console.log(widthGrid, heightGrid)
            commit('updateWindowCoords', options)
        }
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