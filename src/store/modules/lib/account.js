import { BACKEND, withAuthorization } from 'src/remotes'

export const PRINCIPAL_SWITCH = 'principal/switch'

export default {
  namespaced: true,
  state: {
    principal: null
  },
  mutations: {
    [PRINCIPAL_SWITCH]: (state, principal) => {
      state.principal = principal
    }
  },
  actions: {
    async signup ({ state, commit }, { email, password }) {
      await BACKEND.post('security/signup', {
        email,
        password
      })
    },
    async forgot ({ state, commit }, { email }) {
      await BACKEND.post('security/forgot', {
        email
      })
    },
    async login ({ state, commit }, { email, password }) {
      const { data } = await BACKEND.post('security/login', {
        email,
        password
      })
      commit(PRINCIPAL_SWITCH, data)
    },
    async passwd ({ state, commit }, { check, password }) {
      await BACKEND.post('security/passwd', {
        check,
        password
      })
    },
    async confirm ({ state, commit }, { check }) {
      const { data } = await BACKEND.get(`security/confirm/${check}`)
      commit(PRINCIPAL_SWITCH, data)
    },
    async recover ({ state, commit }, { check }) {
      const { data } = await BACKEND.get(`security/recover/${check}`)
      commit(PRINCIPAL_SWITCH, {
        token: data.token,
        user: data.user
      })
      return {
        check: data.check,
        user: data.user
      }
    },
    async logout ({ state, commit }) {
      await BACKEND.post('security/logout', null, withAuthorization(state.principal.token))
      commit(PRINCIPAL_SWITCH, null)
      // commit(`ople/${JOBS_LOAD}`, [], { root: true })
    }
  }
}
