import { BACKEND, withAuthorization } from 'src/remotes'
import { AddressModel, LoadableModel, LoadableMapModel } from 'src/models'

export const ADDRESS_DETAILS_LOADING = 'addresses/details/load'
export const ADDRESS_DETAILS_LOADED = 'addresses/details/loaded'
export const ADDRESS_DETAILS_REMOVED = 'addresses/details/removed'

export default (settings) => ({
  namespaced: true,
  state: {
    table: new LoadableMapModel(AddressModel),
    subscribers: {}
  },
  mutations: {
    [ADDRESS_DETAILS_LOADING]: (state, address) => {
      const model = state.table.get(address) || new LoadableModel(AddressModel)
      state.table = state.table.put(address, model.loading())
    },
    [ADDRESS_DETAILS_LOADED]: (state, addressDetails) => {
      const model = state.table.get(addressDetails.address) || new LoadableModel(AddressModel)
      state.table = state.table.put(addressDetails.address, model.loaded(addressDetails))
    },
    [ADDRESS_DETAILS_REMOVED]: (state, address) => {
      state.table = state.table.remove(address)
    }
  },
  actions: {
    async fetchAddressDetails ({ state, commit, rootState, dispatch }, address) {
      const { data } = await BACKEND.get(`address/${address}`, withAuthorization(rootState.account.principal.token))
      return data
    },

    async loadAddressDetails ({ state, commit, dispatch }, address) {
      commit(ADDRESS_DETAILS_LOADING, address)
      const addressDetails = await dispatch('fetchAddressDetails', address)
      commit(ADDRESS_DETAILS_LOADED, AddressModel.fromJS(addressDetails))
    }
  }
})
