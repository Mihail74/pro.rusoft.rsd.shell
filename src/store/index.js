import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import * as modules from './modules'

Vue.use(Vuex)

export default () => new Vuex.Store({
  modules: Object.entries(modules)
  .map(([key, module]) => ({[key]: module()}))
  .reduce((p, c) => ({...p, ...c}), {}),
  plugins: [
    createPersistedState({
      paths: [
        'account'
      ]
    })
  ]
})
