import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

import * as modules from './modules'
import { WebSocketService } from '@/services'

Vue.use(Vuex)

const applicationContext = {
  webSocketService: new WebSocketService()
}

export default () => new Vuex.Store({
  modules: Object.entries(modules)
  .map(([key, module]) => ({[key]: module(applicationContext)}))
  .reduce((p, c) => ({...p, ...c}), {}),
  plugins: [
    createPersistedState({
      paths: [
        'account'
      ]
    })
  ]
})
