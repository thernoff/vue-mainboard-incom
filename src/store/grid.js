export default {
  state: {
    modeGrid: true,
    countRows: 24,
    countColumns: 48,
    grid: [10, 5],
    widthGrid: 0,
    heightGrid: 0,
  },
  mutations: {
    setWidthGrid(state, widthGrid) {
      state.widthGrid = widthGrid
    },

    setHeightGrid(state, heightGrid) {
      state.heightGrid = heightGrid
    },

    toggleModeGrid(state) {
      state.modeGrid = !state.modeGrid
    }
  },
  actions: {

  },
  getters: {
    getGrid() {
      return state.grid
    },

    getCountColumns(state) {
      return state.countColumns
    },

    getCountRows(state) {
      return state.countRows
    },

    getWidthGrid(state) {
      return state.widthGrid
    },

    widthGrid(state) {
      return state.widthGrid
    },

    getHeightGrid(state) {
      return state.heightGrid
    },

    isModeGrid(state) {
      return state.modeGrid
    }
  }
}