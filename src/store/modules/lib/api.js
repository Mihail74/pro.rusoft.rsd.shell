import { BACKEND, withAuthorization } from 'src/remotes'

export default (settings) => ({
  namespaced: true,
  actions: {
    async post ({ state, rootState }, {url, data}) {
      const { data: result } = await BACKEND.post(url, data, withAuthorization(rootState.account.principal.token))
      return result
    },
    async get ({ state, rootState }, url) {
      const { data: result } = await BACKEND.get(url, withAuthorization(rootState.account.principal.token))
      return result
    }
  }
})
