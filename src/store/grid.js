export default {
  state: {
    modeGrid: true,
    countRows: 12,
    countColumns: 24,
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

    getHeightGrid(state) {
      return state.heightGrid
    },

    isModeGrid(state) {
      return state.modeGrid
    }
  }
}