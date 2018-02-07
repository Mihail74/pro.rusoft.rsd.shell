import { BACKEND, withAuthorization } from 'src/remotes'
import { ProjectModel, ProjectShort, LoadableModel, LoadableListModel, LoadableMapModel } from 'src/models'

export const PROJECTS_LOADING = 'projects/load'
export const PROJECTS_LOADED = 'projects/loaded'

export const PROJECT_DETAILS_LOADING = 'projects/details/load'
export const PROJECT_DETAILS_LOADED = 'projects/details/loaded'
export const PROJECT_DETAILS_REMOVED = 'projects/details/removed'

export default (settings) => ({
  namespaced: true,
  state: {
    list: new LoadableListModel(ProjectShort),
    table: new LoadableMapModel(ProjectModel)
  },
  mutations: {
    [PROJECTS_LOADING]: (state) => {
      state.list = state.list.loading()
    },
    [PROJECTS_LOADED]: (state, projects) => {
      state.list = state.list.loaded(...projects)
    },
    [PROJECT_DETAILS_LOADING]: (state, id) => {
      const model = state.table.get(id) || new LoadableModel(ProjectModel)
      state.table = state.table.put(id, model.loading())
    },
    [PROJECT_DETAILS_LOADED]: (state, project) => {
      const model = state.table.get(project.id) || new LoadableModel(ProjectModel)
      state.table = state.table.put(project.id, model.loaded(project))
    },
    [PROJECT_DETAILS_REMOVED]: (state, id) => {
      state.table = state.table.remove(id)
    }
  },
  actions: {
    async fetchProjects ({ state, commit, rootState }) {
      const { data } = await BACKEND.get('projects', withAuthorization(rootState.account.principal.token))
      return data
    },
    async loadProjects ({ state, commit, dispatch }) {
      commit(PROJECTS_LOADING)
      const { content } = await dispatch('fetchProjects')
      commit(PROJECTS_LOADED, content.map(ProjectShort.fromJS))
    },
    async fetchProjectShortDetails ({ state, commit, rootState }, id) {
      const { data } = await BACKEND.get(`projects/i/${id}/short`, withAuthorization(rootState.account.principal.token))
      return data
    },
    async loadProjectShortDetails ({ state, commit, dispatch }, id) {
      commit(PROJECT_DETAILS_LOADING, id)
      const project = await dispatch('fetchProjectShortDetails', id)
      commit(PROJECT_DETAILS_LOADED, ProjectModel.fromJS(project))
    },
    async loadProjectDetails ({ state, commit, dispatch }, id) {
      commit(PROJECT_DETAILS_LOADING, id)
      const project = await dispatch('fetchProjectDetails', id)
      commit(PROJECT_DETAILS_LOADED, ProjectModel.fromJS(project))
    }
  }
})
