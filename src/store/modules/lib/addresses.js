import { BACKEND, withAuthorization } from 'src/remotes'
import { AddressModel, LoadableModel, LoadableMapModel } from 'src/models'

export const ADDRESS_DETAILS_LOADING = 'addresses/details/load'
export const ADDRESS_DETAILS_LOADED = 'addresses/details/loaded'
export const ADDRESS_DETAILS_REMOVED = 'addresses/details/removed'

export default ({ webSocketService }) => ({
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

      await dispatch('subscribeOnAddress', address)

      return data
    },

    subscribeOnAddress ({ state, commit, rootState }, address) {
      if (!state.subscribers[address]) {
        const subscriber = webSocketService.subscribe('addresses', address, addressDetails => {
          commit(ADDRESS_DETAILS_LOADED, AddressModel.fromJS(JSON.parse(addressDetails)))
        })

        state.subscribers[address] = subscriber
      }
    },

    async unsubscribeFromAddress ({ state, commit, rootState }, address) {
      if (state.subscribers[address]) {
        const subsriber = state.subscribers[address]
        subsriber.unsubscribe()
        delete state.subscribers[address]
      }
    },

    async loadAddressDetails ({ state, commit, dispatch }, address) {
      commit(ADDRESS_DETAILS_LOADING, address)
      const addressDetails = await dispatch('fetchAddressDetails', address)
      commit(ADDRESS_DETAILS_LOADED, AddressModel.fromJS(addressDetails))
    }
  }
})
