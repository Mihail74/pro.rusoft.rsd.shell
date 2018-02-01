import uniqid from 'uniqid'

export const MODALS_OPEN = 'modals/open'
export const MODALS_CLOSE = 'modals/close'

export default (applicationContext) => ({
  namespaced: true,
  state: {
    stack: []
  },
  mutations: {
    [MODALS_OPEN]: (state, modal) => {
      state.stack.push({
        id: uniqid(),
        modal
      })
    },
    [MODALS_CLOSE]: (state) => {
      state.stack.pop()
    }
  },
  actions: {
    open ({ commit }, modal) {
      commit(MODALS_OPEN, modal)
    },
    close ({ commit }) {
      commit(MODALS_CLOSE)
    }
  }
})
