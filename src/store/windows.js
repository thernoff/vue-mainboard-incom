import Vue from "vue";

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
        indexActiveWindow: 0,
        activeWindow: null,
        windows: [] // хранится ссылка на массив activeWorkspace.windows
    },
    mutations: {
        setWindows(state, windows) {
            state.windows = windows
        },

        createNewWindow(state, itemStartMenu) {
            const title = itemStartMenu.title || itemStartMenu.label
            const link = itemStartMenu.link
            const apiLink = itemStartMenu.apiLink
            //const id = Math.random()
            const id = getRandomId()
            //console.log('id', id)
            const newWindow = {
                id,
                title,
                link,
                apiLink,
                top: state.topPrevWindow,
                left: state.leftPrevWindow,
                width: 40,
                height: 45,
                zIndex: state.windows.length + 1,
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
            state.indexActiveWindow = length - 1

            state.topPrevWindow += 50
            state.leftPrevWindow += 50
        },

        updateWindowCoords(state, options) {
            let window = state.windows[options.index]
            //window.top += parseInt(options.diffY)
            //window.left += parseInt(options.diffX)
            //Vue.set(window, 'left', +options.left)
            //Vue.set(window, 'top', +options.top)
            //Vue.set(window, 'left', +options.left)
            //Vue.set(window, 'top', +options.top)
            window.top = +options.top
            window.left = +options.left
            //state.obj = { ...state.obj, newProp: 123 };
            //state.windows[options.index] = { ...state.windows[options.index], top: +options.top, left: +options.left };
        },

        updateWindowSize(state, options) {
            const window = state.windows[options.index]
            //window.top = +options.top
            //window.left = +options.left
            //window.width *= parseFloat(options.coefWidth)
            //window.height *= parseFloat(options.coefHeight)
            window.width = +options.width
            window.height = +options.height
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
            if (state.windows.length > 0) {
                if (index === state.indexActiveWindow) {
                    return
                }

                if (index != undefined) {
                    state.activeWindow.active = false
                    state.activeWindow = state.windows[index]
                    state.activeWindow.active = true
                    state.indexActiveWindow = index
                } else {
                    for (let i = 0; i < state.windows.length; i++) {
                        if (state.windows[i].active) {
                            state.activeWindow = state.windows[i]
                            state.indexActiveWindow = i
                            break;
                        }
                    }
                }

            } else {
                state.activeWindow = null
                state.indexActiveWindow = 0
            }

            if (state.activeWindow) {
                state.maxZIndex += 1
                const zIndex = state.activeWindow.zIndex
                state.windows.forEach(function (window) {
                    if (window.zIndex > zIndex) {
                        window.zIndex -= 1
                    }
                })
                state.activeWindow.zIndex = state.windows.length
            }

            console.log('store:setActiveWindow', state.activeWindow.zIndex)
            console.log('store:setActiveWindow', state.windows)
        },

        unsetActiveWindow(state) {
            state.activeWindow.active = false
            state.windows.some((window, index) => {
                if (!window.minimize) {
                    console.log('index', index)
                    state.activeWindow = window
                    state.activeWindow.active = true
                    state.indexActiveWindow = index
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

        actionSetActiveWindow({ commit }) {
            commit('setActiveWindow')
        },

        actionSetWindows({ commit }, windows) {
            commit('setWindows', windows)
        },

        actionToggleWindows({ commit }, windows) {
            commit('toggleWindows', windows)
        },

        actionUpdateWindowCoords({ commit, rootState }, options) {
            commit('updateWindowCoords', options)
            if (rootState.grid.modeGrid) {
                //console.log('old left', options.left, 'old top', options.top)
                const countColumns = rootState.grid.countColumns
                const widthGrid = rootState.grid.widthGrid
                const widthOneColumn = widthGrid / countColumns
                options.left = Math.floor(options.left / widthOneColumn) * widthOneColumn

                const countRows = rootState.grid.countRows
                const heightGrid = rootState.grid.heightGrid
                const heightOneRow = heightGrid / countRows
                options.top = Math.floor(options.top / heightOneRow) * heightOneRow

                options.width = 100 * options.width / widthGrid
                options.height = 100 * options.height / heightGrid

                const widthColumnPercent = 100 / countColumns
                options.width = Math.ceil(options.width / widthColumnPercent) * (widthColumnPercent)

                const heightRowPercent = 100 / countRows
                options.height = Math.ceil(options.height / heightRowPercent) * (heightRowPercent)

                setTimeout(function () {
                    commit('updateWindowSize', options)
                    commit('updateWindowCoords', options)
                }, 1)
            }
        },

        actionUpdateWindowSize({ commit, rootState }, options) {
            const widthGrid = rootState.grid.widthGrid
            const heightGrid = rootState.grid.heightGrid
            options.width = 100 * options.width / widthGrid
            options.height = 100 * options.height / heightGrid
            commit('updateWindowCoords', options)
            commit('updateWindowSize', options)

            if (rootState.grid.modeGrid) {
                //console.log('old left', options.left, 'old top', options.top)
                const countColumns = rootState.grid.countColumns
                const widthGrid = rootState.grid.widthGrid
                const widthOneColumn = widthGrid / countColumns
                options.left = Math.floor(options.left / widthOneColumn) * widthOneColumn

                const countRows = rootState.grid.countRows
                const heightGrid = rootState.grid.heightGrid
                const heightOneRow = heightGrid / countRows
                options.top = Math.floor(options.top / heightOneRow) * heightOneRow

                const widthColumnPercent = 100 / countColumns
                options.width = Math.ceil(options.width / widthColumnPercent) * (widthColumnPercent)

                const heightRowPercent = 100 / countRows
                options.height = Math.ceil(options.height / heightRowPercent) * (heightRowPercent)

                console.log('actionUpdateWindowSize', options.width)
                setTimeout(function () {
                    commit('updateWindowCoords', options)
                    commit('updateWindowSize', options)
                }, 1)
            }
        },
    },
    getters: {
        windows(state) {
            return state.windows
        },

        getMinimizeWindows(state) {
            return state.windows.filter((window) => {
                return window.minimize
            })
        }
    }
}