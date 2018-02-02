import { BACKEND, withAuthorization } from 'src/remotes'
import { UserModel, LoadableModel, LoadableMapModel } from 'src/models'

export const PROFILE_DETAILS_LOADING = 'profiles/details/load'
export const PROFILE_DETAILS_LOADED = 'profiles/details/loaded'
export const PROFILE_DETAILS_REMOVED = 'profiles/details/removed'

export default (settings) => ({
  namespaced: true,
  state: {
    table: new LoadableMapModel(UserModel)
  },
  mutations: {
    [PROFILE_DETAILS_LOADING]: (state, id) => {
      const model = state.table.get(id) || new LoadableModel(UserModel)
      state.table = state.table.put(id, model.loading())
    },
    [PROFILE_DETAILS_LOADED]: (state, project) => {
      const model = state.table.get(project.id) || new LoadableModel(UserModel)
      state.table = state.table.put(project.id, model.loaded(project))
    },
    [PROFILE_DETAILS_REMOVED]: (state, id) => {
      state.table = state.table.remove(id)
    }
  },
  actions: {
    async fetchProfileDetails ({ state, commit, rootState }, id) {
      const { data } = await BACKEND.get(`profiles/i/${id}`, withAuthorization(rootState.account.principal.token))
      return data
    },
    async loadProfileDetails ({ state, commit, dispatch }, id) {
      commit(PROFILE_DETAILS_LOADING, id)
      const project = await dispatch('fetchProfileDetails', id)
      commit(PROFILE_DETAILS_LOADED, UserModel.fromJS(project))
    }
  }
})
